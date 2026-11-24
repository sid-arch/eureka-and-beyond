import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTestEnv, type TestEnv } from "./helpers/worker";
import { createPlannedCourse, FIXTURE } from "./helpers/fixtures";

let t: TestEnv;
let anon: ReturnType<TestEnv["client"]>;
beforeAll(async () => {
  t = await createTestEnv();
  anon = t.client();
});
afterAll(() => t?.dispose());

describe("catalog", () => {
  it("lists exactly three subjects with 15 / 6 / 3 pathways", async () => {
    const { body } = await anon.get("/api/subjects");
    expect(body.map((s: any) => [s.slug, s.courseCount])).toEqual([["mathematics", 15], ["physics", 6], ["chemistry", 3]]);
  });

  it("lists all 24 pathways, filters by level, and never claims unverified AP alignment", async () => {
    expect((await anon.get("/api/courses")).body).toHaveLength(24);
    const ap = (await anon.get("/api/courses?level=ap")).body;
    expect(ap).toHaveLength(9);
    expect(ap.every((c: any) => c.alignmentStatus === "unverified")).toBe(true);
  });

  it("reports stats that match the database", async () => {
    const { body } = await anon.get("/api/stats");
    const lessons = await t.env.DB.prepare(`SELECT COUNT(*) AS n FROM lessons WHERE status = 'published'`).first<{ n: number }>();
    expect(body.publishedLessons).toBe(lessons!.n);
    expect(body.courses).toBe(24);
  });

  it("every course has a published outline; only courses with written lessons are in development", async () => {
    const courses = (await anon.get("/api/courses")).body as any[];
    for (const c of courses) {
      expect(c.plannedLessonCount, c.slug).toBeGreaterThan(20);
      expect(c.status === "in_development", c.slug).toBe(c.publishedLessonCount > 0);
    }
  });
});

describe("curriculum navigation", () => {
  it("a planned course shows its outline with no readable lessons", async () => {
    const fx = await createPlannedCourse(t.env.DB as any);
    try {
      const { body } = await anon.get(`/api/courses/${FIXTURE.courseSlug}`);
      expect(body.status).toBe("planned");
      expect(body.publishedLessonCount).toBe(0);
      expect(body.plannedLessonCount).toBe(2);
      expect(body.units.every((u: any) => u.lessonCount === 0 && u.plannedLessonCount > 0)).toBe(true);
    } finally {
      await fx.remove();
    }
  });

  it("unit pages list planned lessons and link the written ones", async () => {
    const { body } = await anon.get("/api/courses/algebra-1/units/linear-equations");
    const items = body.chapters[0].items;
    expect(items.map((i: any) => i.title)).toContain("Literal equations and formulas");
    expect(items.find((i: any) => i.title === "Solving two-step equations").lesson.slug).toBe("solving-two-step-equations");
    expect(items.find((i: any) => i.title === "Literal equations and formulas").lesson.slug).toBe("literal-equations");
    const fx = await createPlannedCourse(t.env.DB as any);
    try {
      const planned = (await anon.get(`/api/courses/${FIXTURE.courseSlug}/units/${FIXTURE.unitSlug}`)).body.chapters[0].items;
      expect(planned.map((i: any) => i.title)).toEqual(FIXTURE.plannedTitles);
      expect(planned.every((i: any) => i.lesson === null)).toBe(true);
    } finally {
      await fx.remove();
    }
  });

  it("the original sample lesson keeps its content and gains objectives and practice", async () => {
    const { body } = await anon.get("/api/courses/algebra-1/units/linear-equations/lessons/solving-two-step-equations");
    expect(body.blocks.filter((b: any) => b.mode === "learn")).toHaveLength(7);
    expect(body.objectives.length).toBe(3);
    expect(body.practice.length).toBeGreaterThanOrEqual(5);
    expect(body.blocks.some((b: any) => b.kind === "activity" && b.mode === "experiment")).toBe(true);
  });

  it("practice questions never include answer keys", async () => {
    const { body } = await anon.get("/api/courses/physics/units/kinematics/lessons/projectile-motion");
    const json = JSON.stringify(body.practice);
    expect(json).not.toMatch(/"answer"|"accept"|"tolerance"|"solution"/);
    expect(body.practice[0].hints.length).toBeGreaterThan(0);
  });

  it("a shared lesson is reachable from every course that places it, with that course's context", async () => {
    const a = await anon.get("/api/courses/algebra-readiness/units/expressions/lessons/variables-and-expressions");
    const b = await anon.get("/api/courses/algebra-1/units/foundations/lessons/variables-and-expressions");
    expect(a.status).toBe(200);
    expect(b.status).toBe(200);
    expect(a.body.id).toBe(b.body.id);
    expect(a.body.context.course.slug).toBe("algebra-readiness");
    expect(b.body.context.course.slug).toBe("algebra-1");
  });

  it("returns 404 for unknown or mismatched paths", async () => {
    expect((await anon.get("/api/courses/nope")).status).toBe(404);
    expect((await anon.get("/api/courses/algebra-1/units/nope")).status).toBe(404);
    expect((await anon.get("/api/courses/geometry/units/linear-equations/lessons/solving-two-step-equations")).status).toBe(404);
    expect((await anon.get("/api/does-not-exist")).status).toBe(404);
  });
});

describe("visibility of unpublished content", () => {
  beforeAll(async () => {
    const db = t.env.DB;
    await db.batch([
      db.prepare(`INSERT INTO lessons (id, slug, title, summary, status) VALUES ('les_draft', 'secret-draft-lesson', 'Secret zebra lesson', 'zebra', 'draft')`),
      db.prepare(`INSERT INTO chapter_lessons (chapter_id, lesson_id, position) VALUES ('chap_alg1_solving', 'les_draft', 50)`),
      db.prepare(`INSERT INTO formulas (id, subject_id, slug, name, latex, status) VALUES ('frm_draft', 'subj_math', 'draft-formula', 'Zebra formula', 'z', 'draft')`),
      db.prepare(`INSERT INTO practice_questions (id, lesson_id, kind, prompt, data, status) VALUES ('q_draftq', 'les_two_step_eq', 'numeric', 'Draft zebra question', '{"answer":1}', 'draft')`),
    ]);
  });

  it("hides draft lessons, formulas and questions everywhere", async () => {
    expect((await anon.get("/api/courses/algebra-1/units/linear-equations/lessons/secret-draft-lesson")).status).toBe(404);
    expect((await anon.get("/api/search?q=zebra")).body.results).toEqual([]);
    const lesson = await anon.get("/api/courses/algebra-1/units/linear-equations/lessons/solving-two-step-equations");
    expect(lesson.body.practice.some((q: any) => q.id === "q_draftq")).toBe(false);
    expect((await anon.post("/api/practice/q_draftq/check", { answer: "1" })).status).toBe(404);
    const formulas = (await anon.get("/api/formulas")).body;
    expect(formulas.some((f: any) => f.slug === "draft-formula")).toBe(false);
  });
});

describe("search", () => {
  it("finds courses, lessons, formulas and concepts, and links lessons correctly", async () => {
    const { body } = await anon.get("/api/search?q=equation");
    const types = new Set(body.results.map((r: any) => r.type));
    expect(types.has("course")).toBe(true);
    expect(types.has("lesson")).toBe(true);
    for (const r of body.results.filter((r: any) => r.type === "lesson")) {
      expect((await anon.get(`/api${r.href}`.replace("/api/courses", "/api/courses"))).status).toBe(200);
    }
  });

  it("treats LIKE wildcards literally and validates input", async () => {
    expect((await anon.get("/api/search?q=%25%25")).body.results).toEqual([]);
    expect((await anon.get("/api/search?q=a")).status).toBe(400);
    expect((await anon.get(`/api/search?q=${"x".repeat(101)}`)).status).toBe(400);
  });
});

describe("http behaviour", () => {
  it("sets security headers and short public caching on anonymous reads", async () => {
    const res = await anon.get("/api/subjects");
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
    expect(res.headers.get("cache-control")).toBe("public, max-age=60");
  });

  it("rejects cross-origin and non-JSON state-changing requests", async () => {
    const cross = await anon.post("/api/auth/login", { email: "a@b.co", password: "x" }, { Origin: "https://evil.example" });
    expect(cross.status).toBe(403);
    const form = await anon.raw("POST", "/api/auth/logout", undefined, { "Content-Type": "application/x-www-form-urlencoded", "Content-Length": "3" });
    expect(form.status).toBe(415);
  });
});
