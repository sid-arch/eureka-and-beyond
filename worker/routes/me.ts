// Signed-in student features. Every route here acts only on the caller's own data.

import { Hono } from "hono";
import { z } from "zod";
import { can } from "../../shared/permissions";
import type { AppEnv } from "../env";
import { audit } from "../lib/audit";
import { hashPassword, newId, verifyPassword } from "../lib/crypto";
import { PLACEMENT_JOINS, VISIBLE_PLACEMENT } from "../lib/curriculum";
import { ApiHttpError, body, now } from "../lib/http";
import { rateLimit } from "../lib/rate-limit";
import { destroySession, requireUser } from "../lib/session";
import { passwordRule } from "./auth";

export const me = new Hono<AppEnv>();

me.use("*", async (c, next) => {
  await next();
  c.res.headers.set("Cache-Control", "no-store");
});

// ---- Profile and account ---------------------------------------------------

me.get("/me/profile", async (c) => {
  const u = requireUser(c, { verified: false });
  const row = await c.env.DB.prepare(`SELECT email_notifications, created_at FROM users WHERE id = ?`).bind(u.id).first<{
    email_notifications: number; created_at: string;
  }>();
  return c.json({ ...u, emailNotifications: !!row?.email_notifications, createdAt: row?.created_at });
});

me.patch("/me/profile", async (c) => {
  const u = requireUser(c, { verified: false });
  const data = await body(
    c,
    z.object({
      displayName: z.string().trim().min(1, "Enter a display name.").max(60).optional(),
      emailNotifications: z.boolean().optional(),
    }),
  );
  await c.env.DB.prepare(
    `UPDATE users SET display_name = COALESCE(?, display_name), email_notifications = COALESCE(?, email_notifications), updated_at = ? WHERE id = ?`,
  )
    .bind(data.displayName ?? null, data.emailNotifications === undefined ? null : data.emailNotifications ? 1 : 0, now(), u.id)
    .run();
  return c.json({ ok: true });
});

me.post("/me/password", async (c) => {
  const u = requireUser(c, { verified: false });
  await rateLimit(c.env.DB, `chpw:${u.id}`, 5, 900);
  const data = await body(c, z.object({ currentPassword: z.string().min(1).max(200), newPassword: passwordRule }));
  const row = await c.env.DB.prepare(`SELECT password_hash, password_salt, password_iterations FROM users WHERE id = ?`)
    .bind(u.id)
    .first<{ password_hash: string; password_salt: string; password_iterations: number }>();
  if (!row || !(await verifyPassword(data.currentPassword, { hash: row.password_hash, salt: row.password_salt, iterations: row.password_iterations }))) {
    throw new ApiHttpError(400, "validation_failed", "Your current password is incorrect.", { currentPassword: "Incorrect password." });
  }
  const pw = await hashPassword(data.newPassword);
  await c.env.DB.batch([
    c.env.DB.prepare(`UPDATE users SET password_hash = ?, password_salt = ?, password_iterations = ?, updated_at = ? WHERE id = ?`).bind(
      pw.hash, pw.salt, pw.iterations, now(), u.id,
    ),
    // Keep this session, sign out every other device.
    c.env.DB.prepare(`DELETE FROM sessions WHERE user_id = ? AND id <> ?`).bind(u.id, c.get("sessionId")),
  ]);
  await audit(c.env.DB, { actorId: u.id, action: "account.password_change", entityType: "user", entityId: u.id });
  return c.json({ ok: true });
});

me.get("/me/sessions", async (c) => {
  const u = requireUser(c, { verified: false });
  const { results } = await c.env.DB.prepare(
    `SELECT id, user_agent, created_at, last_seen_at FROM sessions WHERE user_id = ? AND expires_at > ? ORDER BY last_seen_at DESC`,
  )
    .bind(u.id, now())
    .all<{ id: string; user_agent: string; created_at: string; last_seen_at: string }>();
  const current = c.get("sessionId");
  // Session ids are hashes; expose only a short handle for revoking.
  return c.json(results.map((r) => ({ handle: r.id.slice(0, 16), userAgent: r.user_agent, createdAt: r.created_at, lastSeenAt: r.last_seen_at, current: r.id === current })));
});

me.delete("/me/sessions/:handle", async (c) => {
  const u = requireUser(c, { verified: false });
  const handle = c.req.param("handle");
  if (!/^[0-9a-f]{16}$/.test(handle)) throw new ApiHttpError(400, "invalid_parameter", "Invalid session.");
  await c.env.DB.prepare(`DELETE FROM sessions WHERE user_id = ? AND substr(id, 1, 16) = ? AND id <> ?`).bind(u.id, handle, c.get("sessionId")).run();
  return c.json({ ok: true });
});

me.delete("/me/account", async (c) => {
  const u = requireUser(c, { verified: false });
  const data = await body(c, z.object({ password: z.string().min(1).max(200) }));
  if (u.role === "owner") throw new ApiHttpError(400, "owner_account", "The Owner account can't be deleted from the app.");
  const row = await c.env.DB.prepare(`SELECT password_hash, password_salt, password_iterations FROM users WHERE id = ?`)
    .bind(u.id)
    .first<{ password_hash: string; password_salt: string; password_iterations: number }>();
  if (!row || !(await verifyPassword(data.password, { hash: row.password_hash, salt: row.password_salt, iterations: row.password_iterations }))) {
    throw new ApiHttpError(400, "validation_failed", "Your password is incorrect.", { password: "Incorrect password." });
  }
  await destroySession(c);
  // The user's own support tickets are deleted with the account; cascades remove
  // sessions, progress, bookmarks, attempts, posts, reports and notifications.
  await c.env.DB.batch([
    c.env.DB.prepare(`DELETE FROM tickets WHERE user_id = ?`).bind(u.id),
    c.env.DB.prepare(`DELETE FROM users WHERE id = ?`).bind(u.id),
  ]);
  await audit(c.env.DB, { actorId: null, action: "account.delete", entityType: "user", entityId: u.id });
  return c.json({ ok: true });
});

me.get("/me/export", async (c) => {
  const u = requireUser(c, { verified: false });
  const q = (sql: string) => c.env.DB.prepare(sql).bind(u.id);
  const [profile, enrollments, progress, bookmarks, attempts, posts, tickets] = await c.env.DB.batch([
    q(`SELECT email, display_name, role, email_verified_at, created_at, last_login_at FROM users WHERE id = ?`),
    q(`SELECT c.title, e.created_at FROM enrollments e JOIN courses c ON c.id = e.course_id WHERE e.user_id = ?`),
    q(`SELECT l.title, p.status, p.started_at, p.completed_at FROM lesson_progress p JOIN lessons l ON l.id = p.lesson_id WHERE p.user_id = ?`),
    q(`SELECT kind, target_id, created_at FROM bookmarks WHERE user_id = ?`),
    q(`SELECT question_id, correct, answer, created_at FROM practice_attempts WHERE user_id = ?`),
    q(`SELECT kind, body, status, created_at FROM discussion_posts WHERE user_id = ?`),
    q(`SELECT category, subject, status, created_at FROM tickets WHERE user_id = ?`),
  ]);
  return c.json({
    exportedAt: now(),
    profile: profile.results[0],
    enrollments: enrollments.results,
    progress: progress.results,
    bookmarks: bookmarks.results,
    practiceAttempts: attempts.results,
    discussionPosts: posts.results,
    supportRequests: tickets.results,
  });
});

// ---- Dashboard ---------------------------------------------------------------

me.get("/me/dashboard", async (c) => {
  const u = requireUser(c, { verified: false });
  const db = c.env.DB;
  const [enrolled, recent, practice, unread, bookmarks, mastery] = await db.batch([
    db
      .prepare(
        `SELECT c.id, c.slug, c.title, c.level, s.slug AS subject_slug, s.name AS subject_name,
                (SELECT COUNT(DISTINCT l.id) ${PLACEMENT_JOINS} WHERE u.course_id = e.course_id AND ${VISIBLE_PLACEMENT}) AS total,
                (SELECT COUNT(*) FROM lesson_progress p WHERE p.user_id = e.user_id AND p.course_id = e.course_id AND p.status = 'completed') AS completed
         FROM enrollments e JOIN courses c ON c.id = e.course_id JOIN subjects s ON s.id = c.subject_id
         WHERE e.user_id = ? ORDER BY e.created_at DESC`,
      )
      .bind(u.id),
    db
      .prepare(
        `SELECT p.status, p.updated_at, l.slug, l.title, c.slug AS course_slug, c.title AS course_title,
                (SELECT un.slug FROM chapter_lessons cl JOIN chapters ch ON ch.id = cl.chapter_id JOIN units un ON un.id = ch.unit_id
                 WHERE cl.lesson_id = l.id AND un.course_id = c.id LIMIT 1) AS unit_slug
         FROM lesson_progress p JOIN lessons l ON l.id = p.lesson_id JOIN courses c ON c.id = p.course_id
         WHERE p.user_id = ? AND l.status = 'published' ORDER BY p.updated_at DESC LIMIT 6`,
      )
      .bind(u.id),
    db
      .prepare(
        `SELECT COUNT(*) AS attempts, COALESCE(SUM(correct), 0) AS correct,
                COUNT(DISTINCT question_id) AS questions FROM practice_attempts WHERE user_id = ?`,
      )
      .bind(u.id),
    db.prepare(`SELECT COUNT(*) AS n FROM notifications WHERE user_id = ? AND read_at IS NULL`).bind(u.id),
    db.prepare(`SELECT COUNT(*) AS n FROM bookmarks WHERE user_id = ?`).bind(u.id),
    db
      .prepare(
        `SELECT COUNT(*) AS mastered FROM (
           SELECT q.lesson_id,
                  COUNT(DISTINCT q.id) AS total,
                  COUNT(DISTINCT CASE WHEN a.correct = 1 THEN q.id END) AS right
           FROM practice_questions q LEFT JOIN practice_attempts a ON a.question_id = q.id AND a.user_id = ?
           WHERE q.status = 'published' AND q.lesson_id IN (SELECT DISTINCT q2.lesson_id FROM practice_attempts a2 JOIN practice_questions q2 ON q2.id = a2.question_id WHERE a2.user_id = ?)
           GROUP BY q.lesson_id
         ) WHERE total > 0 AND right = total`,
      )
      .bind(u.id, u.id),
  ]);
  const p = practice.results[0] as { attempts: number; correct: number; questions: number };
  return c.json({
    user: u,
    enrollments: (enrolled.results as Record<string, string | number>[]).map((r) => ({
      id: r.id, slug: r.slug, title: r.title, level: r.level,
      subject: { slug: r.subject_slug, name: r.subject_name },
      totalLessons: r.total, completedLessons: r.completed,
    })),
    recent: (recent.results as Record<string, string>[]).map((r) => ({
      status: r.status, updatedAt: r.updated_at, title: r.title, courseTitle: r.course_title,
      href: r.unit_slug ? `/courses/${r.course_slug}/units/${r.unit_slug}/lessons/${r.slug}` : `/courses/${r.course_slug}`,
    })),
    practice: { attempts: p.attempts, correct: p.correct, questions: p.questions },
    masteredLessons: (mastery.results[0] as { mastered: number }).mastered,
    unreadNotifications: (unread.results[0] as { n: number }).n,
    bookmarkCount: (bookmarks.results[0] as { n: number }).n,
  });
});

// ---- Enrollment ---------------------------------------------------------------

async function courseIdFor(db: D1Database, slug: string) {
  const row = await db.prepare(`SELECT id FROM courses WHERE slug = ? AND status <> 'archived'`).bind(slug).first<{ id: string }>();
  if (!row) throw new ApiHttpError(404, "not_found", "Course not found.");
  return row.id;
}

me.get("/me/enrollments", async (c) => {
  const u = requireUser(c, { verified: false });
  const { results } = await c.env.DB.prepare(`SELECT c.slug FROM enrollments e JOIN courses c ON c.id = e.course_id WHERE e.user_id = ?`)
    .bind(u.id)
    .all<{ slug: string }>();
  return c.json(results.map((r) => r.slug));
});

me.put("/me/enrollments/:course", async (c) => {
  const u = requireUser(c);
  const id = await courseIdFor(c.env.DB, c.req.param("course"));
  await c.env.DB.prepare(`INSERT OR IGNORE INTO enrollments (user_id, course_id) VALUES (?, ?)`).bind(u.id, id).run();
  return c.json({ ok: true });
});

me.delete("/me/enrollments/:course", async (c) => {
  const u = requireUser(c);
  const id = await courseIdFor(c.env.DB, c.req.param("course"));
  await c.env.DB.prepare(`DELETE FROM enrollments WHERE user_id = ? AND course_id = ?`).bind(u.id, id).run();
  return c.json({ ok: true });
});

// ---- Progress -----------------------------------------------------------------

me.get("/me/progress/:course", async (c) => {
  const u = requireUser(c, { verified: false });
  const { results } = await c.env.DB.prepare(
    `SELECT l.slug, p.status FROM lesson_progress p JOIN lessons l ON l.id = p.lesson_id
     JOIN courses c ON c.id = p.course_id WHERE p.user_id = ? AND c.slug = ?`,
  )
    .bind(u.id, c.req.param("course"))
    .all<{ slug: string; status: string }>();
  return c.json(Object.fromEntries(results.map((r) => [r.slug, r.status])));
});

me.put("/me/progress/:lessonId", async (c) => {
  const u = requireUser(c);
  const data = await body(c, z.object({ course: z.string().max(120), status: z.enum(["started", "completed"]) }));
  const lessonId = c.req.param("lessonId");
  // The lesson must be publicly placed in that course.
  const ok = await c.env.DB.prepare(`SELECT c.id ${PLACEMENT_JOINS} WHERE l.id = ? AND c.slug = ? AND ${VISIBLE_PLACEMENT} LIMIT 1`)
    .bind(lessonId, data.course)
    .first<{ id: string }>();
  if (!ok) throw new ApiHttpError(404, "not_found", "Lesson not found in that course.");
  const t = now();
  // 'completed' is sticky: revisiting a finished lesson doesn't un-complete it.
  await c.env.DB.prepare(
    `INSERT INTO lesson_progress (user_id, lesson_id, course_id, status, completed_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)
     ON CONFLICT(user_id, lesson_id) DO UPDATE SET
       status = CASE WHEN lesson_progress.status = 'completed' THEN 'completed' ELSE excluded.status END,
       completed_at = COALESCE(lesson_progress.completed_at, excluded.completed_at),
       updated_at = excluded.updated_at`,
  )
    .bind(u.id, lessonId, ok.id, data.status, data.status === "completed" ? t : null, t)
    .run();
  await c.env.DB.prepare(`INSERT OR IGNORE INTO enrollments (user_id, course_id) VALUES (?, ?)`).bind(u.id, ok.id).run();
  return c.json({ ok: true });
});

// ---- Bookmarks ----------------------------------------------------------------

me.get("/me/bookmarks", async (c) => {
  const u = requireUser(c, { verified: false });
  const [lessons, formulas] = await c.env.DB.batch([
    c.env.DB.prepare(
      `SELECT b.target_id AS id, l.title, l.summary, b.created_at,
              (SELECT '/courses/' || c.slug || '/units/' || u.slug || '/lessons/' || l.slug ${PLACEMENT_JOINS.replace("JOIN lessons  l  ON l.id  = cl.lesson_id", "JOIN lessons l2 ON l2.id = cl.lesson_id")}
               WHERE l2.id = l.id AND u.status = 'published' AND ch.status = 'published' AND c.status IN ('in_development','published') LIMIT 1) AS href
       FROM bookmarks b JOIN lessons l ON l.id = b.target_id
       WHERE b.user_id = ? AND b.kind = 'lesson' AND l.status = 'published' ORDER BY b.created_at DESC`,
    ).bind(u.id),
    c.env.DB.prepare(
      `SELECT b.target_id AS id, f.name AS title, f.latex, f.slug, b.created_at FROM bookmarks b JOIN formulas f ON f.id = b.target_id
       WHERE b.user_id = ? AND b.kind = 'formula' AND f.status = 'published' ORDER BY b.created_at DESC`,
    ).bind(u.id),
  ]);
  return c.json({ lessons: lessons.results, formulas: formulas.results });
});

const bookmarkSchema = z.object({ kind: z.enum(["lesson", "formula"]), targetId: z.string().min(1).max(80) });

me.put("/me/bookmarks", async (c) => {
  const u = requireUser(c);
  const data = await body(c, bookmarkSchema);
  const table = data.kind === "lesson" ? "lessons" : "formulas";
  const exists = await c.env.DB.prepare(`SELECT 1 FROM ${table} WHERE id = ? AND status = 'published'`).bind(data.targetId).first();
  if (!exists) throw new ApiHttpError(404, "not_found", "Nothing to bookmark there.");
  await c.env.DB.prepare(`INSERT OR IGNORE INTO bookmarks (user_id, kind, target_id) VALUES (?, ?, ?)`).bind(u.id, data.kind, data.targetId).run();
  return c.json({ ok: true });
});

me.delete("/me/bookmarks/:kind/:id", async (c) => {
  const u = requireUser(c);
  await c.env.DB.prepare(`DELETE FROM bookmarks WHERE user_id = ? AND kind = ? AND target_id = ?`)
    .bind(u.id, c.req.param("kind"), c.req.param("id"))
    .run();
  return c.json({ ok: true });
});

// ---- Practice history & mastery -----------------------------------------------

me.get("/me/practice", async (c) => {
  const u = requireUser(c, { verified: false });
  const [history, perLesson] = await c.env.DB.batch([
    c.env.DB.prepare(
      `SELECT a.id, a.correct, a.answer, a.created_at, q.prompt, q.difficulty, l.title AS lesson_title
       FROM practice_attempts a JOIN practice_questions q ON q.id = a.question_id JOIN lessons l ON l.id = q.lesson_id
       WHERE a.user_id = ? ORDER BY a.created_at DESC LIMIT 50`,
    ).bind(u.id),
    c.env.DB.prepare(
      `SELECT l.id, l.title,
              COUNT(DISTINCT q.id) AS total,
              COUNT(DISTINCT CASE WHEN a.correct = 1 THEN q.id END) AS correct,
              COUNT(a.id) AS attempts
       FROM practice_questions q JOIN lessons l ON l.id = q.lesson_id
       LEFT JOIN practice_attempts a ON a.question_id = q.id AND a.user_id = ?1
       WHERE q.status = 'published' AND l.id IN (SELECT q2.lesson_id FROM practice_attempts a2 JOIN practice_questions q2 ON q2.id = a2.question_id WHERE a2.user_id = ?1)
       GROUP BY l.id ORDER BY MAX(a.created_at) DESC`,
    ).bind(u.id),
  ]);
  return c.json({
    history: history.results,
    lessons: (perLesson.results as { id: string; title: string; total: number; correct: number; attempts: number }[]).map((r) => ({
      ...r,
      mastery: r.total ? r.correct / r.total : 0,
    })),
  });
});

me.get("/me/lessons/:lessonId/practice", async (c) => {
  const u = requireUser(c, { verified: false });
  const { results } = await c.env.DB.prepare(
    `SELECT q.id, MAX(a.correct) AS solved, COUNT(a.id) AS attempts FROM practice_questions q
     LEFT JOIN practice_attempts a ON a.question_id = q.id AND a.user_id = ?
     WHERE q.lesson_id = ? AND q.status = 'published' GROUP BY q.id`,
  )
    .bind(u.id, c.req.param("lessonId"))
    .all<{ id: string; solved: number | null; attempts: number }>();
  return c.json(Object.fromEntries(results.map((r) => [r.id, { solved: !!r.solved, attempts: r.attempts }])));
});

// ---- Notifications --------------------------------------------------------------

me.get("/me/notifications", async (c) => {
  const u = requireUser(c, { verified: false });
  const { results } = await c.env.DB.prepare(
    `SELECT id, title, body, link, read_at, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50`,
  )
    .bind(u.id)
    .all();
  return c.json(results);
});

me.post("/me/notifications/read", async (c) => {
  const u = requireUser(c, { verified: false });
  const data = await body(c, z.object({ ids: z.array(z.string().max(80)).max(100).optional() }));
  if (data.ids?.length) {
    await c.env.DB.batch(
      data.ids.map((id) => c.env.DB.prepare(`UPDATE notifications SET read_at = ? WHERE id = ? AND user_id = ? AND read_at IS NULL`).bind(now(), id, u.id)),
    );
  } else {
    await c.env.DB.prepare(`UPDATE notifications SET read_at = ? WHERE user_id = ? AND read_at IS NULL`).bind(now(), u.id).run();
  }
  return c.json({ ok: true });
});

// ---- Private feedback & support tickets ---------------------------------------------

const ticketSchema = z.object({
  category: z.enum(["question", "bug", "concern", "suggestion", "account", "other"]),
  subject: z.string().trim().min(3, "Add a short subject.").max(140),
  body: z.string().trim().min(10, "Add a few more details.").max(5000),
  contextType: z.enum(["general", "course", "lesson", "block", "activity", "formula", "practice"]).default("general"),
  contextId: z.string().max(120).optional(),
  contextLabel: z.string().max(200).default(""),
});

me.get("/me/tickets", async (c) => {
  const u = requireUser(c, { verified: false });
  const { results } = await c.env.DB.prepare(
    `SELECT t.id, t.category, t.subject, t.status, t.context_label, t.created_at, t.updated_at,
            (SELECT COUNT(*) FROM ticket_messages m WHERE m.ticket_id = t.id AND m.is_staff = 1) AS staff_replies
     FROM tickets t WHERE t.user_id = ? ORDER BY t.updated_at DESC`,
  )
    .bind(u.id)
    .all();
  return c.json(results);
});

me.post("/me/tickets", async (c) => {
  const u = requireUser(c);
  await rateLimit(c.env.DB, `ticket:${u.id}`, 10, 3600);
  const data = await body(c, ticketSchema);
  const id = newId("tkt");
  await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO tickets (id, user_id, category, subject, context_type, context_id, context_label) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ).bind(id, u.id, data.category, data.subject, data.contextType, data.contextId ?? null, data.contextLabel),
    c.env.DB.prepare(`INSERT INTO ticket_messages (id, ticket_id, author_id, body) VALUES (?, ?, ?, ?)`).bind(newId("msg"), id, u.id, data.body),
  ]);
  return c.json({ id }, 201);
});

me.get("/me/tickets/:id", async (c) => {
  const u = requireUser(c, { verified: false });
  const t = await c.env.DB.prepare(
    `SELECT id, category, subject, status, context_type, context_label, created_at, updated_at FROM tickets WHERE id = ? AND user_id = ?`,
  )
    .bind(c.req.param("id"), u.id)
    .first();
  if (!t) throw new ApiHttpError(404, "not_found", "Request not found.");
  const { results } = await c.env.DB.prepare(
    `SELECT m.id, m.body, m.is_staff, m.created_at, CASE WHEN m.is_staff = 1 THEN 'Eureka and Beyond team' ELSE u.display_name END AS author
     FROM ticket_messages m LEFT JOIN users u ON u.id = m.author_id WHERE m.ticket_id = ? ORDER BY m.created_at`,
  )
    .bind(t.id)
    .all();
  return c.json({ ...t, messages: results });
});

me.post("/me/tickets/:id/messages", async (c) => {
  const u = requireUser(c);
  await rateLimit(c.env.DB, `ticketmsg:${u.id}`, 30, 3600);
  const data = await body(c, z.object({ body: z.string().trim().min(1).max(5000) }));
  const t = await c.env.DB.prepare(`SELECT id, status FROM tickets WHERE id = ? AND user_id = ?`).bind(c.req.param("id"), u.id).first<{ id: string; status: string }>();
  if (!t) throw new ApiHttpError(404, "not_found", "Request not found.");
  if (t.status === "closed") throw new ApiHttpError(400, "ticket_closed", "This request is closed. Open a new one if you still need help.");
  await c.env.DB.batch([
    c.env.DB.prepare(`INSERT INTO ticket_messages (id, ticket_id, author_id, body) VALUES (?, ?, ?, ?)`).bind(newId("msg"), t.id, u.id, data.body),
    c.env.DB.prepare(`UPDATE tickets SET status = CASE WHEN status IN ('waiting_on_user', 'resolved') THEN 'open' ELSE status END, updated_at = ? WHERE id = ?`).bind(now(), t.id),
  ]);
  return c.json({ ok: true }, 201);
});

// ---- Public discussions (pre-moderated) ---------------------------------------------

me.post("/discussions", async (c) => {
  const u = requireUser(c);
  await rateLimit(c.env.DB, `post:${u.id}`, 10, 3600);
  const data = await body(
    c,
    z.object({
      lessonId: z.string().min(1).max(80),
      parentId: z.string().max(80).optional(),
      kind: z.enum(["question", "comment"]),
      body: z.string().trim().min(5, "Write a little more.").max(3000),
      contextLabel: z.string().max(200).default(""),
    }),
  );
  const lesson = await c.env.DB.prepare(`SELECT id FROM lessons WHERE id = ? AND status = 'published'`).bind(data.lessonId).first();
  if (!lesson) throw new ApiHttpError(404, "not_found", "Lesson not found.");
  if (data.parentId) {
    const parent = await c.env.DB.prepare(`SELECT id FROM discussion_posts WHERE id = ? AND lesson_id = ? AND status = 'approved' AND parent_id IS NULL`)
      .bind(data.parentId, data.lessonId)
      .first();
    if (!parent) throw new ApiHttpError(400, "invalid_parent", "You can only reply to a published post.");
  }
  // Staff posts skip the queue; everyone else's wait for a moderator.
  const staff = can(u.role, "community.moderate");
  const id = newId("pst");
  await c.env.DB.prepare(
    `INSERT INTO discussion_posts (id, lesson_id, parent_id, user_id, kind, context_label, body, status, is_staff, moderated_by, moderated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(id, data.lessonId, data.parentId ?? null, u.id, data.kind, data.contextLabel, data.body,
      staff ? "approved" : "pending", staff ? 1 : 0, staff ? u.id : null, staff ? now() : null)
    .run();
  return c.json({ id, status: staff ? "approved" : "pending" }, 201);
});

me.post("/discussions/:id/report", async (c) => {
  const u = requireUser(c);
  await rateLimit(c.env.DB, `report:${u.id}`, 20, 3600);
  const data = await body(c, z.object({ reason: z.string().trim().min(3, "Say briefly what's wrong.").max(500) }));
  const post = await c.env.DB.prepare(`SELECT id FROM discussion_posts WHERE id = ? AND status = 'approved'`).bind(c.req.param("id")).first<{ id: string }>();
  if (!post) throw new ApiHttpError(404, "not_found", "Post not found.");
  await c.env.DB.prepare(`INSERT OR IGNORE INTO reports (id, post_id, reporter_id, reason) VALUES (?, ?, ?, ?)`)
    .bind(newId("rep"), post.id, u.id, data.reason)
    .run();
  return c.json({ ok: true }, 201);
});

me.get("/me/discussions", async (c) => {
  const u = requireUser(c, { verified: false });
  const { results } = await c.env.DB.prepare(
    `SELECT p.id, p.kind, p.body, p.status, p.created_at, l.title AS lesson_title
     FROM discussion_posts p JOIN lessons l ON l.id = p.lesson_id WHERE p.user_id = ? ORDER BY p.created_at DESC LIMIT 50`,
  )
    .bind(u.id)
    .all();
  return c.json(results);
});
