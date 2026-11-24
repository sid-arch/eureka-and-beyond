// Spins up a real local D1 (workerd/Miniflare via wrangler's platform proxy),
// applies every migration in order, and exposes HTTP helpers with cookie jars.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getPlatformProxy } from "wrangler";
import type { Role } from "../../shared/permissions";
import { app, type Env } from "../../worker/index";
import { hashPassword, newId } from "../../worker/lib/crypto";

export const MIGRATIONS_DIR = join(import.meta.dirname, "../../migrations");

export function migrationFiles(): string[] {
  return readdirSync(MIGRATIONS_DIR).filter((f) => /^\d{4}_.+\.sql$/.test(f)).sort();
}

/** Split a migration into statements, keeping trigger bodies (BEGIN … END;) intact. */
export function splitSql(sql: string): string[] {
  const lines = sql.split("\n").filter((l) => !l.trim().startsWith("--"));
  const out: string[] = [];
  let buf = "";
  let inTrigger = false;
  for (const line of lines) {
    buf += line + "\n";
    if (/^\s*CREATE TRIGGER/i.test(line)) inTrigger = true;
    const ends = inTrigger ? /\bEND;\s*$/i.test(line) : /;\s*$/.test(line);
    if (ends) {
      if (buf.trim()) out.push(buf.trim());
      buf = "";
      inTrigger = false;
    }
  }
  if (buf.trim()) out.push(buf.trim());
  return out;
}

export const PASSWORD = "correct horse battery";

export async function createTestEnv(overrides: Partial<Env> = {}) {
  const proxy = await getPlatformProxy<Env>({ configPath: "wrangler.jsonc", persist: false, envFiles: [] });
  const env: Env = {
    ...proxy.env,
    APP_ENV: "test",
    MAIL_DRIVER: "log",
    PUBLIC_SITE_URL: "http://test.local",
    ...overrides,
  };
  for (const file of migrationFiles()) {
    const statements = splitSql(readFileSync(join(MIGRATIONS_DIR, file), "utf8"));
    for (let i = 0; i < statements.length; i += 200) {
      await env.DB.batch(statements.slice(i, i + 200).map((s) => env.DB.prepare(s)));
    }
  }
  const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} } as unknown as ExecutionContext;

  /** A browser-like client with its own cookie jar. */
  function client() {
    let cookie = "";
    async function call(method: string, path: string, body?: unknown, headers: Record<string, string> = {}) {
      const res = await app.fetch(
        new Request(`http://test.local${path}`, {
          method,
          headers: {
            ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
            ...(cookie ? { Cookie: cookie } : {}),
            ...headers,
          },
          body: body !== undefined ? JSON.stringify(body) : undefined,
        }),
        env,
        ctx,
      );
      const set = res.headers.get("Set-Cookie");
      if (set) {
        const m = set.match(/^([^=]+)=([^;]*)/);
        if (m) cookie = m[2] ? `${m[1]}=${m[2]}` : "";
      }
      let json: any = null;
      const text = await res.text();
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        json = text;
      }
      return { status: res.status, body: json, headers: res.headers };
    }
    return {
      get: (p: string) => call("GET", p),
      post: (p: string, b: unknown = {}, h?: Record<string, string>) => call("POST", p, b, h),
      put: (p: string, b: unknown = {}) => call("PUT", p, b),
      patch: (p: string, b: unknown = {}) => call("PATCH", p, b),
      del: (p: string, b?: unknown) => call("DELETE", p, b),
      raw: call,
      get cookie() {
        return cookie;
      },
    };
  }

  /** Inserts a verified user directly and returns a signed-in client. */
  async function userWithRole(role: Role, opts: { verified?: boolean; email?: string } = {}) {
    const email = opts.email ?? `${role}-${Math.random().toString(36).slice(2, 8)}@example.com`;
    const pw = await hashPassword(PASSWORD);
    const id = newId("usr");
    await env.DB.prepare(
      `INSERT INTO users (id, email, display_name, password_hash, password_salt, password_iterations, role, email_verified_at, age_attested_13)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`,
    )
      .bind(id, email, `${role} user`, pw.hash, pw.salt, pw.iterations, role, opts.verified === false ? null : "2026-01-01T00:00:00Z")
      .run();
    const c = client();
    const res = await c.post("/api/auth/login", { email, password: PASSWORD });
    if (res.status !== 200) throw new Error(`login failed: ${JSON.stringify(res.body)}`);
    return Object.assign(c, { id, email });
  }

  /** Latest logged email to an address, with any link token extracted. */
  async function lastEmail(to: string) {
    const row = await env.DB.prepare(`SELECT subject, body FROM email_outbox WHERE to_address = ? ORDER BY rowid DESC LIMIT 1`).bind(to).first<{ subject: string; body: string }>();
    const token = row?.body?.match(/token=([0-9a-f]{64})/)?.[1] ?? null;
    return row ? { ...row, token } : null;
  }

  return { env, client, userWithRole, lastEmail, dispose: () => proxy.dispose() };
}

export type TestEnv = Awaited<ReturnType<typeof createTestEnv>>;
