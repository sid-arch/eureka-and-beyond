import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTestEnv, type TestEnv } from "./helpers/worker";
import { createPlannedCourse, FIXTURE } from "./helpers/fixtures";

let t: TestEnv;
beforeAll(async () => {
  t = await createTestEnv();
});
afterAll(() => t?.dispose());

describe("admin access control", () => {
  it("blocks anonymous users and students from every admin route", async () => {
    const student = await t.userWithRole("student");
    for (const path of ["/api/admin/overview", "/api/admin/users", "/api/admin/curriculum", "/api/admin/tickets", "/api/admin/audit"]) {
      expect((await t.client().get(path)).status, path).toBe(401);
      expect((await student.get(path)).status, path).toBe(403);
    }
  });

  it("scopes staff roles to their permissions", async () => {
    const mod = await t.userWithRole("moderator");
    const editor = await t.userWithRole("content_editor");
    expect((await mod.get("/api/admin/moderation/posts")).status).toBe(200);
    expect((await mod.get("/api/admin/curriculum")).status).toBe(403);
    expect((await mod.get("/api/admin/audit")).status).toBe(403);
    expect((await editor.get("/api/admin/curriculum")).status).toBe(200);
    expect((await editor.get("/api/admin/moderation/posts")).status).toBe(403);
    expect((await editor.get("/api/admin/users")).status).toBe(403);
  });
});

describe("user management", () => {
  it("prevents self-promotion and limits who can grant administrator", async () => {
    const admin = await t.userWithRole("administrator");
    const owner = await t.userWithRole("owner");
    const student = await t.userWithRole("student");

    expect((await admin.patch(`/api/admin/users/${admin.id}/role`, { role: "owner" })).status).toBe(403);
    expect((await admin.patch(`/api/admin/users/${student.id}/role`, { role: "administrator" })).status).toBe(403);
    expect((await admin.patch(`/api/admin/users/${student.id}/role`, { role: "moderator" })).status).toBe(200);
    expect((await admin.patch(`/api/admin/users/${owner.id}/role`, { role: "student" })).status).toBe(403);
    expect((await owner.patch(`/api/admin/users/${student.id}/role`, { role: "administrator" })).status).toBe(200);
    expect((await owner.patch(`/api/admin/users/${student.id}/role`, { role: "owner" })).status).toBe(403);

    const log = await t.env.DB.prepare(`SELECT COUNT(*) AS n FROM audit_logs WHERE action = 'user.role_change' AND entity_id = ?`).bind(student.id).first<{ n: number }>();
    expect(log!.n).toBe(2);
  });

  it("suspends and reactivates accounts with a recorded reason", async () => {
    const admin = await t.userWithRole("administrator");
    const target = await t.userWithRole("student");
    expect((await admin.post(`/api/admin/users/${target.id}/suspend`, { reason: "" })).status).toBe(400);
    expect((await admin.post(`/api/admin/users/${target.id}/suspend`, { reason: "Spam" })).status).toBe(200);
    expect((await target.get("/api/auth/me")).body.user).toBeNull();
    expect((await admin.post(`/api/admin/users/${target.id}/reactivate`)).status).toBe(200);
    const detail = await admin.get(`/api/admin/users/${target.id}`);
    expect(detail.body).not.toHaveProperty("password_hash");
    expect(detail.body.history.map((h: any) => h.action)).toEqual(expect.arrayContaining(["user.suspend", "user.reactivate"]));
  });
});

describe("content publishing", () => {
  it("creates, edits, versions, validates and publishes a lesson", async () => {
    const editor = await t.userWithRole("content_editor");
    // A fixture course with no written lessons, so draft visibility and the planned→in_development
    // transition can be checked however much real content exists.
    const fx = await createPlannedCourse(t.env.DB as any);
    const chapter = { id: fx.chapterId };
    const plan = await t.env.DB.prepare(`SELECT id, title FROM lesson_plans WHERE chapter_id = ? ORDER BY position LIMIT 1`).bind(chapter!.id).first<{ id: string; title: string }>();

    const created = await editor.post(`/api/admin/chapters/${chapter!.id}/lessons`, { slug: "em-fields-test", title: plan!.title, planId: plan!.id });
    expect(created.status).toBe(201);
    const id = created.body.id;

    // Drafts are invisible to the public.
    const course = await t.client().get(`/api/courses/${FIXTURE.courseSlug}`);
    expect(course.body.publishedLessonCount).toBe(0);

    const bad = await editor.put(`/api/admin/lessons/${id}`, { title: "X", summary: "", estimatedMinutes: 10, objectives: [], blocks: [{ kind: "activity", mode: "learn", data: { activity: "not-real" } }] });
    expect(bad.status).toBe(400);

    const content = {
      title: plan!.title,
      summary: "Velocity and acceleration as derivatives of position.",
      estimatedMinutes: 30,
      objectives: ["Differentiate position to find velocity."],
      blocks: [
        { kind: "text", mode: "learn", data: { body: "Velocity is $v = \\frac{dx}{dt}$." } },
        { kind: "worked_example", mode: "learn", data: { title: "Example", steps: [{ latex: "x = t^2", explanation: "Given" }] } },
      ],
      note: "first draft",
    };
    expect((await editor.put(`/api/admin/lessons/${id}`, content)).body.revision).toBe(2);
    expect((await editor.put(`/api/admin/lessons/${id}`, { ...content, summary: "Second version." })).body.revision).toBe(3);
    const revs = await editor.get(`/api/admin/lessons/${id}/revisions`);
    expect(revs.body.map((r: any) => r.revision)).toEqual([3, 2]);
    expect((await editor.get(`/api/admin/lessons/${id}/revisions/2`)).body.summary).toBe(content.summary);

    const q = await editor.post(`/api/admin/lessons/${id}/questions`, { kind: "multiple_choice", difficulty: 1, prompt: "Pick one", data: { choices: ["a"], answer: 3 } });
    expect(q.status).toBe(400);
    expect((await editor.post(`/api/admin/lessons/${id}/questions`, { kind: "numeric", difficulty: 1, prompt: "x'(2) for x = t²?", data: { answer: 4 }, solution: "2t = 4" })).status).toBe(201);

    const v = await editor.get(`/api/admin/lessons/${id}/validate`);
    expect(v.body.ok).toBe(true);

    const preview = await editor.get(`/api/admin/lessons/${id}/preview`);
    expect(preview.body.blocks).toHaveLength(2);

    expect((await editor.patch(`/api/admin/lessons/${id}/status`, { status: "published" })).status).toBe(200);
    const after = await t.client().get(`/api/courses/${FIXTURE.courseSlug}`);
    expect(after.body.status).toBe("in_development");
    expect(after.body.publishedLessonCount).toBe(1);
    const unitSlug = after.body.units.find((u: any) => u.lessonCount === 1).slug;
    expect((await t.client().get(`/api/courses/${FIXTURE.courseSlug}/units/${unitSlug}/lessons/em-fields-test`)).status).toBe(200);

    expect((await editor.patch(`/api/admin/lessons/${id}/status`, { status: "draft" })).status).toBe(200);
    expect((await t.client().get(`/api/courses/${FIXTURE.courseSlug}/units/${unitSlug}/lessons/em-fields-test`)).status).toBe(404);

    const audit = await t.env.DB.prepare(`SELECT action FROM audit_logs WHERE entity_id = ? ORDER BY created_at`).bind(id).all<{ action: string }>();
    expect(audit.results.map((a) => a.action)).toEqual(expect.arrayContaining(["lesson.create", "lesson.save", "lesson.status"]));
    await fx.remove();
  });

  it("only staff with content.publish can publish; moderators can't edit content", async () => {
    const mod = await t.userWithRole("moderator");
    expect((await mod.patch(`/api/admin/lessons/les_two_step_eq/status`, { status: "archived" })).status).toBe(403);
    expect((await mod.put(`/api/admin/lessons/les_two_step_eq`, { title: "Hacked", summary: "", estimatedMinutes: 1, objectives: [], blocks: [] })).status).toBe(403);
  });
});

describe("settings", () => {
  it("lets administrators post an announcement and pause sign-up", async () => {
    const admin = await t.userWithRole("administrator");
    await admin.put("/api/admin/settings", { announcement: { enabled: true, message: "New lessons this week", tone: "info" }, registration: { open: false } });
    const site = await t.client().get("/api/site");
    expect(site.body.announcement.message).toBe("New lessons this week");
    expect(site.body.registrationOpen).toBe(false);
    await admin.put("/api/admin/settings", { registration: { open: true } });
  });
});
