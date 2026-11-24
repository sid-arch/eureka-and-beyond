import { Hono } from "hono";
import { z } from "zod";
import type { AppEnv, Env } from "../env";
import { audit } from "../lib/audit";
import { hashPassword, newId, PBKDF2_ITERATIONS, randomHex, sha256Hex, verifyPassword } from "../lib/crypto";
import { ApiHttpError, body, inFuture, now } from "../lib/http";
import { mailMode, sendMail, siteUrl } from "../lib/mail";
import { clientIp, rateLimit } from "../lib/rate-limit";
import { createSession, destroySession, requireUser } from "../lib/session";
import { checkTurnstile } from "../lib/turnstile";

const email = z.string().trim().toLowerCase().email("Enter a valid email address.").max(254);
export const passwordRule = z
  .string()
  .min(10, "Use at least 10 characters.")
  .max(200, "Use at most 200 characters.");
const displayName = z.string().trim().min(1, "Enter a display name.").max(60, "Use at most 60 characters.");

const VERIFY_TTL = 24 * 3600_000;
const RESET_TTL = 60 * 60_000;

async function registrationOpen(env: Env): Promise<{ open: boolean; reason?: string }> {
  if (mailMode(env) === "disabled") {
    return { open: false, reason: "Account sign-up opens once email delivery is set up. Every lesson is free to use without an account." };
  }
  const row = await env.DB.prepare(`SELECT value FROM site_settings WHERE key = 'registration'`).first<{ value: string }>();
  const open = row ? (JSON.parse(row.value) as { open?: boolean }).open !== false : true;
  return open ? { open } : { open, reason: "New sign-ups are paused right now. Every lesson is free to use without an account." };
}

export async function issueToken(env: Env, userId: string, purpose: "verify_email" | "reset_password") {
  const raw = randomHex(32);
  const id = await sha256Hex(raw);
  // Only one live token per purpose: older ones are invalidated.
  await env.DB.batch([
    env.DB.prepare(`UPDATE auth_tokens SET used_at = ? WHERE user_id = ? AND purpose = ? AND used_at IS NULL`).bind(now(), userId, purpose),
    env.DB.prepare(`INSERT INTO auth_tokens (id, user_id, purpose, expires_at) VALUES (?, ?, ?, ?)`).bind(
      id, userId, purpose, inFuture(purpose === "verify_email" ? VERIFY_TTL : RESET_TTL),
    ),
  ]);
  return raw;
}

/** Atomically consumes a token. Returns the user id, or null if invalid, used or expired. */
async function consumeToken(env: Env, raw: string, purpose: "verify_email" | "reset_password") {
  if (!/^[0-9a-f]{64}$/.test(raw)) return null;
  const id = await sha256Hex(raw);
  const row = await env.DB.prepare(
    `UPDATE auth_tokens SET used_at = ?1 WHERE id = ?2 AND purpose = ?3 AND used_at IS NULL AND expires_at > ?1 RETURNING user_id`,
  )
    .bind(now(), id, purpose)
    .first<{ user_id: string }>();
  return row?.user_id ?? null;
}

export async function sendVerification(env: Env, user: { id: string; email: string; displayName: string }) {
  const token = await issueToken(env, user.id, "verify_email");
  return sendMail(env, {
    to: user.email,
    subject: "Confirm your email for Eureka and Beyond",
    text: `Hi ${user.displayName},\n\nConfirm your email address to finish setting up your account:\n${siteUrl(env, `/verify-email?token=${token}`)}\n\nThis link works once and expires in 24 hours. If you didn't create an account, you can ignore this email.\n\nEureka and Beyond`,
  });
}

export async function sendPasswordReset(env: Env, user: { id: string; email: string; displayName: string }) {
  const token = await issueToken(env, user.id, "reset_password");
  return sendMail(env, {
    to: user.email,
    subject: "Reset your Eureka and Beyond password",
    text: `Hi ${user.displayName},\n\nUse this link to choose a new password:\n${siteUrl(env, `/reset-password?token=${token}`)}\n\nThe link works once and expires in 1 hour. If you didn't ask for this, you can ignore this email; your password hasn't changed.\n\nEureka and Beyond`,
  });
}

export const auth = new Hono<AppEnv>();

auth.get("/config", async (c) => {
  const reg = await registrationOpen(c.env);
  return c.json({
    registrationOpen: reg.open,
    registrationMessage: reg.reason ?? null,
    turnstileSiteKey: c.env.TURNSTILE_SITE_KEY ?? null,
  });
});

auth.get("/me", (c) => {
  const user = c.get("user");
  return c.json({ user }, 200, { "Cache-Control": "no-store" });
});

auth.post("/register", async (c) => {
  const ip = clientIp(c.req.raw);
  await rateLimit(c.env.DB, `register:ip:${await sha256Hex(ip)}`, 5, 3600);
  const data = await body(
    c,
    z.object({
      email,
      password: passwordRule,
      displayName,
      ageConfirmed: z.literal(true, { error: "You must be 13 or older to create an account." }),
      turnstileToken: z.string().optional(),
    }),
  );
  await checkTurnstile(c.env, data.turnstileToken, ip);
  const reg = await registrationOpen(c.env);
  if (!reg.open) throw new ApiHttpError(403, "registration_closed", reg.reason ?? "Sign-up is closed.");

  const existing = await c.env.DB.prepare(`SELECT id FROM users WHERE email = ?`).bind(data.email).first();
  if (existing) {
    // Don't reveal whether an address is registered; tell the owner by email instead.
    await sendMail(c.env, {
      to: data.email,
      subject: "Someone tried to create an account with your email",
      text: `An account for this email already exists on Eureka and Beyond. If this was you, sign in or reset your password at ${siteUrl(c.env, "/forgot-password")}.`,
    });
    return c.json({ ok: true, message: "Check your email to confirm your address." }, 201);
  }

  const pw = await hashPassword(data.password);
  const id = newId("usr");
  await c.env.DB.prepare(
    `INSERT INTO users (id, email, display_name, password_hash, password_salt, password_iterations, age_attested_13)
     VALUES (?, ?, ?, ?, ?, ?, 1)`,
  )
    .bind(id, data.email, data.displayName, pw.hash, pw.salt, pw.iterations)
    .run();
  await sendVerification(c.env, { id, email: data.email, displayName: data.displayName });
  await createSession(c, id);
  await audit(c.env.DB, { actorId: id, action: "account.register", entityType: "user", entityId: id });
  return c.json({ ok: true, message: "Check your email to confirm your address." }, 201);
});

auth.post("/verify-email", async (c) => {
  const { token } = await body(c, z.object({ token: z.string().max(128) }));
  const userId = await consumeToken(c.env, token, "verify_email");
  if (!userId) throw new ApiHttpError(400, "invalid_token", "This link is invalid or has expired. Request a new one from your account.");
  await c.env.DB.prepare(`UPDATE users SET email_verified_at = COALESCE(email_verified_at, ?), updated_at = ? WHERE id = ?`)
    .bind(now(), now(), userId)
    .run();
  await audit(c.env.DB, { actorId: userId, action: "account.verify_email", entityType: "user", entityId: userId });
  return c.json({ ok: true });
});

auth.post("/resend-verification", async (c) => {
  const user = requireUser(c, { verified: false });
  await rateLimit(c.env.DB, `verify:user:${user.id}`, 3, 3600);
  if (user.emailVerified) return c.json({ ok: true });
  await sendVerification(c.env, user);
  return c.json({ ok: true });
});

auth.post("/login", async (c) => {
  const ip = clientIp(c.req.raw);
  const data = await body(c, z.object({ email, password: z.string().min(1).max(200), turnstileToken: z.string().optional() }));
  await rateLimit(c.env.DB, `login:ip:${await sha256Hex(ip)}`, 20, 900);
  await rateLimit(c.env.DB, `login:email:${await sha256Hex(data.email)}`, 8, 900);

  const row = await c.env.DB.prepare(
    `SELECT id, password_hash, password_salt, password_iterations, status FROM users WHERE email = ?`,
  )
    .bind(data.email)
    .first<{ id: string; password_hash: string; password_salt: string; password_iterations: number; status: string }>();

  // Always run a hash so timing doesn't reveal whether the account exists.
  const ok = row
    ? await verifyPassword(data.password, { hash: row.password_hash, salt: row.password_salt, iterations: row.password_iterations })
    : (await hashPassword(data.password), false);
  if (!row || !ok) throw new ApiHttpError(401, "invalid_credentials", "That email and password don't match.");
  if (row.status !== "active") throw new ApiHttpError(403, "account_suspended", "This account is suspended. Contact support for help.");

  if (row.password_iterations < PBKDF2_ITERATIONS) {
    const pw = await hashPassword(data.password);
    await c.env.DB.prepare(`UPDATE users SET password_hash = ?, password_salt = ?, password_iterations = ? WHERE id = ?`)
      .bind(pw.hash, pw.salt, pw.iterations, row.id)
      .run();
  }
  await c.env.DB.prepare(`UPDATE users SET last_login_at = ? WHERE id = ?`).bind(now(), row.id).run();
  await createSession(c, row.id);
  return c.json({ ok: true });
});

auth.post("/logout", async (c) => {
  await destroySession(c);
  return c.json({ ok: true });
});

auth.post("/forgot-password", async (c) => {
  const ip = clientIp(c.req.raw);
  await rateLimit(c.env.DB, `forgot:ip:${await sha256Hex(ip)}`, 5, 3600);
  const data = await body(c, z.object({ email, turnstileToken: z.string().optional() }));
  await checkTurnstile(c.env, data.turnstileToken, ip);
  await rateLimit(c.env.DB, `forgot:email:${await sha256Hex(data.email)}`, 3, 3600);
  const user = await c.env.DB.prepare(`SELECT id, email, display_name FROM users WHERE email = ? AND status = 'active'`)
    .bind(data.email)
    .first<{ id: string; email: string; display_name: string }>();
  if (user) {
    await sendPasswordReset(c.env, { id: user.id, email: user.email, displayName: user.display_name });
    await audit(c.env.DB, { actorId: null, action: "account.password_reset_requested", entityType: "user", entityId: user.id });
  }
  // Same response either way, so the form can't be used to test which emails exist.
  return c.json({ ok: true, emailEnabled: mailMode(c.env) !== "disabled" });
});

auth.post("/reset-password", async (c) => {
  const data = await body(c, z.object({ token: z.string().max(128), password: passwordRule }));
  const userId = await consumeToken(c.env, data.token, "reset_password");
  if (!userId) throw new ApiHttpError(400, "invalid_token", "This reset link is invalid, already used, or expired. Request a new one.");
  const pw = await hashPassword(data.password);
  await c.env.DB.batch([
    c.env.DB.prepare(
      `UPDATE users SET password_hash = ?, password_salt = ?, password_iterations = ?, updated_at = ?,
              email_verified_at = COALESCE(email_verified_at, ?) WHERE id = ?`,
    ).bind(pw.hash, pw.salt, pw.iterations, now(), now(), userId),
    // Resetting a password signs out every existing session.
    c.env.DB.prepare(`DELETE FROM sessions WHERE user_id = ?`).bind(userId),
  ]);
  await audit(c.env.DB, { actorId: userId, action: "account.password_reset", entityType: "user", entityId: userId });
  return c.json({ ok: true });
});

/** For people who can't complete email recovery. Creates a ticket; never changes the account. */
auth.post("/password-assistance", async (c) => {
  const ip = clientIp(c.req.raw);
  await rateLimit(c.env.DB, `pwassist:ip:${await sha256Hex(ip)}`, 3, 3600);
  const data = await body(
    c,
    z.object({
      email,
      details: z.string().trim().min(10, "Describe what happened in a sentence or two.").max(2000),
      turnstileToken: z.string().optional(),
    }),
  );
  await checkTurnstile(c.env, data.turnstileToken, ip);
  const id = newId("tkt");
  await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO tickets (id, contact_email, category, subject) VALUES (?, ?, 'password_assistance', 'Password assistance request')`,
    ).bind(id, data.email),
    c.env.DB.prepare(`INSERT INTO ticket_messages (id, ticket_id, body) VALUES (?, ?, ?)`).bind(newId("msg"), id, data.details),
  ]);
  return c.json({ ok: true }, 201);
});
