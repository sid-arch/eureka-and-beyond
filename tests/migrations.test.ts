import { readFileSync } from "node:fs";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTestEnv, migrationFiles, MIGRATIONS_DIR, splitSql, type TestEnv } from "./helpers/worker";

let t: TestEnv;
beforeAll(async () => {
  t = await createTestEnv();
});
afterAll(() => t?.dispose());

describe("migrations", () => {
  it("are numbered sequentially without gaps", () => {
    const nums = migrationFiles().map((f) => Number(f.slice(0, 4)));
    expect(nums).toEqual(nums.map((_, i) => i + 1));
  });

  it("never drop or recreate existing tables after 0001", () => {
    for (const f of migrationFiles().slice(1)) {
      const sql = readFileSync(join(MIGRATIONS_DIR, f), "utf8");
      expect(sql, f).not.toMatch(/\bDROP\s+TABLE\b|\bDELETE\s+FROM\b/i);
    }
  });

  it("content migrations are idempotent (re-running changes nothing)", async () => {
    const count = async () => (await t.env.DB.prepare(`SELECT (SELECT COUNT(*) FROM lesson_plans) + (SELECT COUNT(*) FROM lesson_blocks) + (SELECT COUNT(*) FROM practice_questions) + (SELECT COUNT(*) FROM units) AS n`).first<{ n: number }>())!.n;
    const before = await count();
    for (const f of migrationFiles().filter((f) => Number(f.slice(0, 4)) >= 5)) {
      const statements = splitSql(readFileSync(join(MIGRATIONS_DIR, f), "utf8"));
      for (let i = 0; i < statements.length; i += 200) await t.env.DB.batch(statements.slice(i, i + 200).map((s) => t.env.DB.prepare(s)));
    }
    expect(await count()).toBe(before);
  });

  it("preserve the original sample lesson and its id", async () => {
    const row = await t.env.DB.prepare(`SELECT id, status FROM lessons WHERE slug = 'solving-two-step-equations'`).first<{ id: string; status: string }>();
    expect(row).toEqual({ id: "les_two_step_eq", status: "published" });
  });

  it("enforce foreign keys, CHECK and JSON constraints", async () => {
    await expect(t.env.DB.prepare(`INSERT INTO units (id, course_id, slug, title) VALUES ('x', 'no_such_course', 'x', 'x')`).run()).rejects.toThrow(/FOREIGN KEY/i);
    await expect(t.env.DB.prepare(`UPDATE users SET role = 'superuser'`).run()).resolves.toBeTruthy(); // no rows yet
    await expect(t.env.DB.prepare(`INSERT INTO users (id, email, display_name, password_hash, password_salt, password_iterations, role) VALUES ('u', 'a@b.c', 'a', 'h', 's', 1, 'superuser')`).run()).rejects.toThrow(/CHECK/i);
    await expect(t.env.DB.prepare(`INSERT INTO practice_questions (id, lesson_id, kind, prompt, data) VALUES ('qq', 'les_two_step_eq', 'numeric', 'p', 'not json')`).run()).rejects.toThrow(/CHECK/i);
  });

  it("keep the audit log append-only", async () => {
    const db = t.env.DB;
    await db.prepare(`INSERT INTO audit_logs (id, action) VALUES ('a1', 'test.event')`).run();
    await expect(db.prepare(`UPDATE audit_logs SET action = 'changed' WHERE id = 'a1'`).run()).rejects.toThrow(/append-only/);
    await expect(db.prepare(`DELETE FROM audit_logs WHERE id = 'a1'`).run()).rejects.toThrow(/append-only/);
  });
});
