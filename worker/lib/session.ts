import type { Context, MiddlewareHandler } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { can, type Permission, type Role } from "../../shared/permissions";
import type { AppEnv, SessionUser } from "../env";
import { randomHex, sha256Hex } from "./crypto";
import { ApiHttpError, inFuture, now } from "./http";

const SESSION_DAYS = 30;
const TOUCH_INTERVAL_MS = 60 * 60 * 1000;

function cookieName(c: Context) {
  // __Host- requires Secure + Path=/ and no Domain: strongest scoping on HTTPS.
  return new URL(c.req.url).protocol === "https:" ? "__Host-eab_session" : "eab_session";
}

export async function createSession(c: Context<AppEnv>, userId: string) {
  const token = randomHex(32);
  const id = await sha256Hex(token);
  const ua = (c.req.header("User-Agent") ?? "").slice(0, 200);
  await c.env.DB.prepare(`INSERT INTO sessions (id, user_id, user_agent, expires_at) VALUES (?, ?, ?, ?)`)
    .bind(id, userId, ua, inFuture(SESSION_DAYS * 86400_000))
    .run();
  setCookie(c, cookieName(c), token, {
    httpOnly: true,
    secure: new URL(c.req.url).protocol === "https:",
    sameSite: "Lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
  return id;
}

export async function destroySession(c: Context<AppEnv>) {
  const sid = c.get("sessionId");
  if (sid) await c.env.DB.prepare(`DELETE FROM sessions WHERE id = ?`).bind(sid).run();
  deleteCookie(c, cookieName(c), { path: "/", secure: new URL(c.req.url).protocol === "https:" });
}

interface SessionRow {
  sid: string;
  expires_at: string;
  last_seen_at: string;
  id: string;
  email: string;
  display_name: string;
  role: Role;
  email_verified_at: string | null;
  status: "active" | "suspended";
}

/** Resolves the session cookie (if any) into c.var.user. Never throws for anonymous requests. */
export const loadSession: MiddlewareHandler<AppEnv> = async (c, next) => {
  c.set("user", null);
  c.set("sessionId", null);
  const token = getCookie(c, cookieName(c));
  if (token && /^[0-9a-f]{64}$/.test(token)) {
    const sid = await sha256Hex(token);
    const row = await c.env.DB.prepare(
      `SELECT s.id AS sid, s.expires_at, s.last_seen_at, u.id, u.email, u.display_name, u.role, u.email_verified_at, u.status
       FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.id = ?`,
    )
      .bind(sid)
      .first<SessionRow>();
    if (row && row.expires_at > now() && row.status === "active") {
      c.set("sessionId", row.sid);
      c.set("user", {
        id: row.id,
        email: row.email,
        displayName: row.display_name,
        role: row.role,
        emailVerified: !!row.email_verified_at,
        status: row.status,
      });
      if (Date.now() - Date.parse(row.last_seen_at) > TOUCH_INTERVAL_MS) {
        c.executionCtx?.waitUntil?.(
          c.env.DB.prepare(`UPDATE sessions SET last_seen_at = ? WHERE id = ?`).bind(now(), row.sid).run(),
        );
      }
    } else if (row) {
      // Expired session, or a suspended account: remove it.
      await c.env.DB.prepare(`DELETE FROM sessions WHERE id = ?`).bind(row.sid).run();
    }
  }
  await next();
};

export function requireUser(c: Context<AppEnv>, opts: { verified?: boolean } = {}): SessionUser {
  const user = c.get("user");
  if (!user) throw new ApiHttpError(401, "unauthenticated", "Sign in to continue.");
  if (opts.verified !== false && !user.emailVerified) {
    throw new ApiHttpError(403, "email_unverified", "Verify your email address to use this feature.");
  }
  return user;
}

export function requirePermission(c: Context<AppEnv>, permission: Permission): SessionUser {
  const user = requireUser(c);
  if (!can(user.role, permission)) throw new ApiHttpError(403, "forbidden", "You don't have permission to do that.");
  return user;
}

/** Middleware form for whole route groups. */
export const staffOnly: MiddlewareHandler<AppEnv> = async (c, next) => {
  requirePermission(c, "admin.access");
  await next();
};
