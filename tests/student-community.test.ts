import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createTestEnv, type TestEnv } from "./helpers/worker";

let t: TestEnv;
let lessonId: string;
let questions: any[];
beforeAll(async () => {
  t = await createTestEnv();
  const l = await t.client().get("/api/courses/physics/units/kinematics/lessons/projectile-motion");
  lessonId = l.body.id;
  questions = l.body.practice;
});
afterAll(() => t?.dispose());

describe("practice", () => {
  it("validates answers server-side for everyone but records only for signed-in, verified students", async () => {
    const mcq = questions.find((q) => q.kind === "multiple_choice");
    const anon = await t.client().post(`/api/practice/${mcq.id}/check`, { answer: "1" });
    expect(anon.body).toMatchObject({ correct: true, recorded: false });
    expect(anon.body.solution.length).toBeGreaterThan(0);

    const s = await t.userWithRole("student");
    const wrong = await s.post(`/api/practice/${mcq.id}/check`, { answer: "0" });
    expect(wrong.body).toMatchObject({ correct: false, recorded: true });
    const right = await s.post(`/api/practice/${mcq.id}/check`, { answer: "1", hintsUsed: 1 });
    expect(right.body.correct).toBe(true);

    const numeric = questions.find((q) => q.kind === "numeric");
    expect((await s.post(`/api/practice/${numeric.id}/check`, { answer: "11.49" })).body.correct).toBe(true);
    expect((await s.post(`/api/practice/${numeric.id}/check`, { answer: "-11.49" })).body.feedback).toMatch(/sign/);
    expect((await s.post(`/api/practice/${numeric.id}/check`, { answer: "eleven" })).status).toBe(400);

    const history = await s.get("/api/me/practice");
    expect(history.body.history).toHaveLength(4);
    const mastery = history.body.lessons.find((l: any) => l.id === lessonId);
    expect(mastery.correct).toBe(2);
    expect(mastery.mastery).toBeCloseTo(2 / mastery.total);

    const unverified = await t.userWithRole("student", { verified: false });
    expect((await unverified.post(`/api/practice/${mcq.id}/check`, { answer: "1" })).body.recorded).toBe(false);
  });
});

describe("progress, enrollment and bookmarks", () => {
  it("persists lesson progress and keeps completion sticky", async () => {
    const s = await t.userWithRole("student");
    expect((await s.put(`/api/me/progress/${lessonId}`, { course: "physics", status: "started" })).status).toBe(200);
    expect((await s.put(`/api/me/progress/${lessonId}`, { course: "physics", status: "completed" })).status).toBe(200);
    expect((await s.put(`/api/me/progress/${lessonId}`, { course: "physics", status: "started" })).status).toBe(200);
    expect((await s.get("/api/me/progress/physics")).body).toEqual({ "projectile-motion": "completed" });
    // Progress auto-enrolls, and the dashboard reflects real counts.
    const dash = await s.get("/api/me/dashboard");
    const course = dash.body.enrollments.find((e: any) => e.slug === "physics");
    expect(course.completedLessons).toBe(1);
    expect(course.totalLessons).toBeGreaterThanOrEqual(4);
    expect(dash.body.recent[0].href).toBe("/courses/physics/units/kinematics/lessons/projectile-motion");
    // A lesson can't be recorded against a course that doesn't contain it.
    expect((await s.put(`/api/me/progress/${lessonId}`, { course: "ap-chemistry", status: "started" })).status).toBe(404);
  });

  it("adds and removes bookmarks", async () => {
    const s = await t.userWithRole("student");
    expect((await s.put("/api/me/bookmarks", { kind: "lesson", targetId: lessonId })).status).toBe(200);
    expect((await s.put("/api/me/bookmarks", { kind: "formula", targetId: "frm_nope" })).status).toBe(404);
    const list = await s.get("/api/me/bookmarks");
    expect(list.body.lessons[0].href).toMatch(/projectile-motion$/);
    await s.del(`/api/me/bookmarks/lesson/${lessonId}`);
    expect((await s.get("/api/me/bookmarks")).body.lessons).toHaveLength(0);
  });
});

describe("support tickets", () => {
  it("lets students see only their own requests, with staff replies and notifications", async () => {
    const a = await t.userWithRole("student");
    const b = await t.userWithRole("student");
    const created = await a.post("/api/me/tickets", {
      category: "bug", subject: "Graph doesn't reset", body: "Pressing reset in the projectile lab keeps the old angle.",
      contextType: "activity", contextId: "projectile", contextLabel: "Projectile motion · Experiment",
    });
    expect(created.status).toBe(201);
    expect((await b.get(`/api/me/tickets/${created.body.id}`)).status).toBe(404);

    const mod = await t.userWithRole("moderator");
    const inbox = await mod.get("/api/admin/tickets?status=active&category=bug");
    expect(inbox.body.some((x: any) => x.id === created.body.id)).toBe(true);
    await mod.post(`/api/admin/tickets/${created.body.id}/messages`, { body: "Thanks, we've reproduced it.", status: "in_progress" });

    const mine = await a.get(`/api/me/tickets/${created.body.id}`);
    expect(mine.body.status).toBe("in_progress");
    expect(mine.body.messages.map((m: any) => m.is_staff)).toEqual([0, 1]);
    expect(mine.body.messages[1].author).toBe("Eureka and Beyond team");
    expect((await a.get("/api/me/notifications")).body[0].link).toBe(`/support/${created.body.id}`);
  });

  it("routes password-assistance requests to administrators only and never exposes reset tokens", async () => {
    const victim = await t.userWithRole("student");
    expect((await t.client().post("/api/auth/password-assistance", { email: victim.email, details: "My email provider shut down." })).status).toBe(201);
    const ticket = await t.env.DB.prepare(`SELECT id FROM tickets WHERE contact_email = ?`).bind(victim.email).first<{ id: string }>();

    const mod = await t.userWithRole("moderator");
    expect((await mod.get(`/api/admin/tickets/${ticket!.id}`)).status).toBe(403);
    expect((await mod.get("/api/admin/tickets")).body.some((x: any) => x.id === ticket!.id)).toBe(false);

    const admin = await t.userWithRole("administrator");
    const detail = await admin.get(`/api/admin/tickets/${ticket!.id}`);
    expect(detail.body.matchedAccount.id).toBe(victim.id);
    const sent = await admin.post(`/api/admin/tickets/${ticket!.id}/send-reset`);
    expect(sent.status).toBe(200);
    expect(JSON.stringify(sent.body)).not.toMatch(/[0-9a-f]{64}/);
    expect((await t.lastEmail(victim.email))?.subject).toMatch(/Reset/);
  });
});

describe("discussions and moderation", () => {
  it("holds student posts for moderation, then publishes approved ones", async () => {
    const s = await t.userWithRole("student");
    const other = await t.userWithRole("student");
    const post = await s.post("/api/discussions", { lessonId, kind: "question", body: "Why is 45° the best angle?", contextLabel: "Learn" });
    expect(post.body.status).toBe("pending");

    expect((await other.get(`/api/lessons/${lessonId}/discussion`)).body.posts).toHaveLength(0);
    const own = (await s.get(`/api/lessons/${lessonId}/discussion`)).body.posts;
    expect(own[0]).toMatchObject({ pending: true, mine: true });

    expect((await other.post(`/api/discussions/${post.body.id}/report`, { reason: "spam" })).status).toBe(404); // can't report pending posts

    const mod = await t.userWithRole("moderator");
    const queue = await mod.get("/api/admin/moderation/posts?status=pending");
    expect(queue.body.map((p: any) => p.id)).toContain(post.body.id);
    expect((await mod.post(`/api/admin/moderation/posts/${post.body.id}`, { action: "approve" })).status).toBe(200);
    await mod.post(`/api/admin/moderation/posts/${post.body.id}/reply`, { body: "Because sin 2θ peaks at 90°." });

    const pub = (await t.client().get(`/api/lessons/${lessonId}/discussion`)).body.posts;
    expect(pub).toHaveLength(2);
    expect(pub[1]).toMatchObject({ isStaff: true, parentId: post.body.id });

    expect((await other.post(`/api/discussions/${post.body.id}/report`, { reason: "Off topic" })).status).toBe(201);
    const reports = await mod.get("/api/admin/moderation/reports");
    expect(reports.body[0].post_id).toBe(post.body.id);
    await mod.post(`/api/admin/moderation/posts/${post.body.id}`, { action: "remove", note: "Removed after review" });
    expect((await t.client().get(`/api/lessons/${lessonId}/discussion`)).body.posts.some((p: any) => p.id === post.body.id)).toBe(false);
    expect((await mod.get("/api/admin/moderation/reports")).body).toHaveLength(0);
  });

  it("does not offer direct messaging between students", async () => {
    const s = await t.userWithRole("student");
    expect((await s.post("/api/messages", { to: "x", body: "hi" })).status).toBe(404);
  });
});
