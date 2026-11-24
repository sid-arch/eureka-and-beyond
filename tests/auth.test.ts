import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTestEnv, PASSWORD, type TestEnv } from "./helpers/worker";

let t: TestEnv;
beforeAll(async () => {
  t = await createTestEnv();
});
afterAll(() => t?.dispose());

const NEW_PW = "a much better passphrase";

describe("registration and verification", () => {
  it("requires age confirmation and a 10+ character password", async () => {
    const c = t.client();
    const r1 = await c.post("/api/auth/register", { email: "kid@example.com", password: "longenough123", displayName: "Kid", ageConfirmed: false });
    expect(r1.status).toBe(400);
    const r2 = await c.post("/api/auth/register", { email: "short@example.com", password: "short", displayName: "S", ageConfirmed: true });
    expect(r2.status).toBe(400);
    expect(r2.body.error.fields.password).toMatch(/10 characters/);
  });

  it("registers, signs in unverified, and verifies with a single-use emailed token", async () => {
    const c = t.client();
    const r = await c.post("/api/auth/register", { email: "Ada@Example.com", password: PASSWORD, displayName: "Ada", ageConfirmed: true });
    expect(r.status).toBe(201);
    const me = await c.get("/api/auth/me");
    expect(me.body.user).toMatchObject({ email: "ada@example.com", emailVerified: false, role: "student" });

    // Unverified accounts can't use learning features yet.
    expect((await c.put("/api/me/enrollments/algebra-1")).status).toBe(403);

    const mail = await t.lastEmail("ada@example.com");
    expect(mail?.token).toBeTruthy();
    const stored = await t.env.DB.prepare(`SELECT id FROM auth_tokens WHERE purpose = 'verify_email'`).all<{ id: string }>();
    expect(stored.results.some((r) => r.id === mail!.token)).toBe(false); // only the hash is stored

    expect((await c.post("/api/auth/verify-email", { token: mail!.token })).status).toBe(200);
    expect((await c.post("/api/auth/verify-email", { token: mail!.token })).status).toBe(400); // single use
    expect((await c.get("/api/auth/me")).body.user.emailVerified).toBe(true);
    expect((await c.put("/api/me/enrollments/algebra-1")).status).toBe(200);
  });

  it("doesn't reveal whether an email is already registered", async () => {
    const c = t.client();
    const r = await c.post("/api/auth/register", { email: "ada@example.com", password: "another password", displayName: "Imposter", ageConfirmed: true });
    expect(r.status).toBe(201);
    expect(r.body.message).toBe("Check your email to confirm your address.");
    expect((await c.get("/api/auth/me")).body.user).toBeNull();
  });

  it("stores passwords only as salted PBKDF2 hashes", async () => {
    const row = await t.env.DB.prepare(`SELECT password_hash, password_salt, password_iterations FROM users WHERE email = 'ada@example.com'`).first<any>();
    expect(row.password_hash).not.toContain(PASSWORD);
    expect(row.password_hash).toMatch(/^[0-9a-f]{64}$/);
    expect(row.password_iterations).toBe(100000);
  });
});

describe("login, logout and sessions", () => {
  it("rejects wrong passwords with a generic message and logs in with the right one", async () => {
    const c = t.client();
    const bad = await c.post("/api/auth/login", { email: "ada@example.com", password: "wrong password!" });
    expect(bad.status).toBe(401);
    const missing = await c.post("/api/auth/login", { email: "nobody@example.com", password: "wrong password!" });
    expect(missing.body.error.message).toBe(bad.body.error.message);
    expect((await c.post("/api/auth/login", { email: "ada@example.com", password: PASSWORD })).status).toBe(200);
    expect(c.cookie).toMatch(/^eab_session=[0-9a-f]{64}$/);
    expect((await c.get("/api/auth/me")).body.user.email).toBe("ada@example.com");
    await c.post("/api/auth/logout");
    expect((await c.get("/api/auth/me")).body.user).toBeNull();
  });

  it("rate-limits repeated login attempts for one account", async () => {
    const c = t.client();
    let last = 0;
    for (let i = 0; i < 10; i++) last = (await c.post("/api/auth/login", { email: "victim@example.com", password: "guess guess " + i })).status;
    expect(last).toBe(429);
  });

  it("signs suspended users out and blocks login", async () => {
    const u = await t.userWithRole("student");
    await t.env.DB.prepare(`UPDATE users SET status = 'suspended' WHERE id = ?`).bind(u.id).run();
    expect((await u.get("/api/auth/me")).body.user).toBeNull();
    expect((await t.client().post("/api/auth/login", { email: u.email, password: PASSWORD })).status).toBe(403);
  });
});

describe("password reset", () => {
  it("resets with a single-use link and signs out every other session", async () => {
    const other = t.client();
    await other.post("/api/auth/login", { email: "ada@example.com", password: PASSWORD });
    expect((await other.get("/api/auth/me")).body.user).not.toBeNull();

    const c = t.client();
    const r = await c.post("/api/auth/forgot-password", { email: "ada@example.com" });
    expect(r.status).toBe(200);
    const mail = await t.lastEmail("ada@example.com");
    expect(mail?.subject).toMatch(/Reset/);

    expect((await c.post("/api/auth/reset-password", { token: mail!.token, password: NEW_PW })).status).toBe(200);
    expect((await c.post("/api/auth/reset-password", { token: mail!.token, password: "yet another pass" })).status).toBe(400);
    expect((await other.get("/api/auth/me")).body.user).toBeNull();
    expect((await t.client().post("/api/auth/login", { email: "ada@example.com", password: PASSWORD })).status).toBe(401);
    expect((await t.client().post("/api/auth/login", { email: "ada@example.com", password: NEW_PW })).status).toBe(200);
  });

  it("rejects expired reset tokens", async () => {
    await t.client().post("/api/auth/forgot-password", { email: "ada@example.com" });
    const mail = await t.lastEmail("ada@example.com");
    await t.env.DB.prepare(`UPDATE auth_tokens SET expires_at = '2000-01-01T00:00:00Z' WHERE purpose = 'reset_password' AND used_at IS NULL`).run();
    expect((await t.client().post("/api/auth/reset-password", { token: mail!.token, password: "whatever password" })).status).toBe(400);
  });

  it("answers the same way for unknown emails", async () => {
    const r = await t.client().post("/api/auth/forgot-password", { email: "ghost@example.com" });
    expect(r.status).toBe(200);
    expect(await t.lastEmail("ghost@example.com")).toBeNull();
  });
});

describe("account settings", () => {
  it("changes password only with the current one, keeping this session", async () => {
    const u = await t.userWithRole("student");
    expect((await u.post("/api/me/password", { currentPassword: "nope nope nope", newPassword: NEW_PW })).status).toBe(400);
    expect((await u.post("/api/me/password", { currentPassword: PASSWORD, newPassword: NEW_PW })).status).toBe(200);
    expect((await u.get("/api/auth/me")).body.user).not.toBeNull();
  });

  it("deletes an account and its data after confirming the password", async () => {
    const u = await t.userWithRole("student");
    await u.put("/api/me/enrollments/physics");
    await u.post("/api/me/tickets", { category: "question", subject: "Hello there", body: "A question before I leave." });
    expect((await u.del("/api/me/account", { password: "wrong password" })).status).toBe(400);
    expect((await u.del("/api/me/account", { password: PASSWORD })).status).toBe(200);
    const left = await t.env.DB.prepare(`SELECT (SELECT COUNT(*) FROM users WHERE id = ?1) + (SELECT COUNT(*) FROM enrollments WHERE user_id = ?1) + (SELECT COUNT(*) FROM tickets WHERE user_id = ?1) AS n`).bind(u.id).first<{ n: number }>();
    expect(left!.n).toBe(0);
  });
});

describe("when email isn't configured", () => {
  let off: TestEnv;
  beforeAll(async () => {
    off = await createTestEnv({ MAIL_DRIVER: "disabled" });
  });
  afterAll(() => off?.dispose());

  it("keeps sign-up closed and says why", async () => {
    const site = await off.client().get("/api/site");
    expect(site.body.registrationOpen).toBe(false);
    const r = await off.client().post("/api/auth/register", { email: "x@example.com", password: PASSWORD, displayName: "X", ageConfirmed: true });
    expect(r.status).toBe(403);
  });

  it("never uses the log driver in production", async () => {
    const prod = await createTestEnv({ MAIL_DRIVER: "log", APP_ENV: "production" });
    expect((await prod.client().get("/api/site")).body.registrationOpen).toBe(false);
    await prod.dispose();
  });
});
