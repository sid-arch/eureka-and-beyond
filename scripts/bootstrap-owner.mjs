#!/usr/bin/env node
// Creates the single Owner account. Not reachable from the web: run it from a
// trusted machine with wrangler access to the database.
//
//   OWNER_PASSWORD='…' node scripts/bootstrap-owner.mjs --email you@example.com --name "Your Name" [--local | --remote] [--env preview]
//
// It refuses to run if an Owner already exists. The password is read from the
// OWNER_PASSWORD environment variable (or prompted for) and only its PBKDF2 hash
// is sent to the database.
import { execFileSync } from "node:child_process";
import { webcrypto as crypto } from "node:crypto";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline/promises";

const args = process.argv.slice(2);
const arg = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
const email = arg("--email")?.trim().toLowerCase();
const name = arg("--name")?.trim() ?? "Owner";
const target = args.includes("--remote") ? "--remote" : "--local";
const env = arg("--env");
if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
  console.error("Usage: OWNER_PASSWORD=… node scripts/bootstrap-owner.mjs --email you@example.com --name \"Name\" [--local|--remote] [--env preview]");
  process.exit(1);
}

let password = process.env.OWNER_PASSWORD;
if (!password) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  password = await rl.question("Owner password (10+ characters): ");
  rl.close();
}
if (!password || password.length < 10) { console.error("Password must be at least 10 characters."); process.exit(1); }

const toHex = (b) => Buffer.from(b).toString("hex");
const salt = crypto.getRandomValues(new Uint8Array(16));
const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password.normalize("NFKC")), "PBKDF2", false, ["deriveBits"]);
const hash = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations: 100000 }, key, 256);
const id = `usr_${crypto.randomUUID().replace(/-/g, "")}`;
const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

// Insert only if no Owner exists; the audit entry is written in the same file.
const sql = `
INSERT INTO users (id, email, display_name, password_hash, password_salt, password_iterations, role, email_verified_at, age_attested_13)
SELECT ${q(id)}, ${q(email)}, ${q(name)}, ${q(toHex(hash))}, ${q(toHex(salt))}, 100000, 'owner', ${q(now)}, 1
WHERE NOT EXISTS (SELECT 1 FROM users WHERE role = 'owner') AND NOT EXISTS (SELECT 1 FROM users WHERE email = ${q(email)});
INSERT INTO audit_logs (id, actor_id, action, entity_type, entity_id, metadata)
SELECT ${q(`aud_${crypto.randomUUID().replace(/-/g, "")}`)}, NULL, 'owner.bootstrap', 'user', ${q(id)}, '{"via":"cli"}'
WHERE EXISTS (SELECT 1 FROM users WHERE id = ${q(id)});
`;
const dir = mkdtempSync(join(tmpdir(), "eab-"));
const file = join(dir, "owner.sql");
writeFileSync(file, sql, { mode: 0o600 });
// Use the database that belongs to the chosen environment. (Passing "eureka-db"
// with --env preview made wrangler target the production database.)
const DATABASES = { preview: "eureka-db-staging" };
if (env && !DATABASES[env]) { console.error(`Unknown --env "${env}". Known: ${Object.keys(DATABASES).join(", ")}.`); process.exit(1); }
const dbName = env ? DATABASES[env] : "eureka-db";
console.log(`Target database: ${dbName}`);
const base = ["wrangler", "d1", "execute", dbName, target, ...(env ? ["--env", env] : [])];
execFileSync("npx", [...base, `--file=${file}`], { stdio: "inherit" });
const out = execFileSync("npx", [...base, "--json", "--command", `SELECT email FROM users WHERE id = ${q(id)}`]).toString();
if (out.includes(email)) console.log(`\n✓ Owner account created for ${email}. Sign in at /login.`);
else { console.error("\n✗ No account was created: an Owner already exists, or that email is taken."); process.exit(1); }
