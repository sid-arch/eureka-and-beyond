// Admin command center API. Mounted behind staffOnly; each route checks its own permission.

import { Hono } from "hono";
import { z } from "zod";
import { ACTIVITY_IDS } from "../../shared/activities";
import { assignableRoles, canManageRole, ROLES, type Role } from "../../shared/permissions";
import type { AppEnv } from "../env";
import { audit, auditStatement } from "../lib/audit";
import { newId } from "../lib/crypto";
import { buildLesson, safeJson } from "../lib/curriculum";
import { ApiHttpError, body, isSlug, now } from "../lib/http";
import { mailMode, sendMail, siteUrl } from "../lib/mail";
import { requirePermission, staffOnly } from "../lib/session";
import { sendPasswordReset } from "./auth";

export const admin = new Hono<AppEnv>();
admin.use("*", staffOnly);
admin.use("*", async (c, next) => {
  await next();
  c.res.headers.set("Cache-Control", "no-store");
});

const slug = z.string().trim().refine(isSlug, "Use lowercase letters, numbers and single hyphens.");
const pageParam = (v: string | undefined) => Math.max(1, Math.min(1000, Number(v) || 1));

async function notify(db: D1Database, userId: string, title: string, bodyText: string, link: string | null) {
  await db.prepare(`INSERT INTO notifications (id, user_id, title, body, link) VALUES (?, ?, ?, ?, ?)`)
    .bind(newId("ntf"), userId, title, bodyText, link)
    .run();
}

// ===========================================================================
// Overview
// ===========================================================================

admin.get("/overview", async (c) => {
  requirePermission(c, "admin.access");
  const r = await c.env.DB.prepare(
    `SELECT
      (SELECT COUNT(*) FROM users) AS users,
      (SELECT COUNT(*) FROM users WHERE email_verified_at IS NOT NULL) AS verified_users,
      (SELECT COUNT(*) FROM users WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '-7 days')) AS new_users_7d,
      (SELECT COUNT(*) FROM courses WHERE status = 'published') AS courses_published,
      (SELECT COUNT(*) FROM courses WHERE status = 'in_development') AS courses_in_development,
      (SELECT COUNT(*) FROM courses WHERE status = 'planned') AS courses_planned,
      (SELECT COUNT(*) FROM lessons WHERE status = 'published') AS lessons_published,
      (SELECT COUNT(*) FROM lessons WHERE status IN ('draft', 'in_review')) AS lessons_draft,
      (SELECT COUNT(*) FROM lesson_plans WHERE lesson_id IS NULL) AS lessons_unwritten,
      (SELECT COUNT(*) FROM practice_questions WHERE status = 'published') AS questions,
      (SELECT COUNT(*) FROM discussion_posts WHERE status = 'pending') AS pending_posts,
      (SELECT COUNT(*) FROM reports WHERE status = 'open') AS open_reports,
      (SELECT COUNT(*) FROM tickets WHERE status IN ('open', 'in_progress') AND category <> 'password_assistance') AS open_tickets,
      (SELECT COUNT(*) FROM tickets WHERE status IN ('open', 'in_progress') AND category = 'password_assistance') AS open_password_requests,
      (SELECT COUNT(*) FROM practice_attempts WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '-7 days')) AS attempts_7d,
      (SELECT COUNT(DISTINCT user_id) FROM lesson_progress WHERE updated_at >= strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '-7 days')) AS active_learners_7d`,
  ).first();
  return c.json({ ...r, mailMode: mailMode(c.env) });
});

// ===========================================================================
// Users
// ===========================================================================

admin.get("/users", async (c) => {
  requirePermission(c, "users.view");
  const q = (c.req.query("q") ?? "").trim().slice(0, 100);
  const role = c.req.query("role");
  const status = c.req.query("status");
  const page = pageParam(c.req.query("page"));
  const where = ["1 = 1"];
  const binds: (string | number)[] = [];
  if (q) {
    where.push("(email LIKE ? ESCAPE '\\' OR display_name LIKE ? ESCAPE '\\')");
    const p = `%${q.replace(/[\\%_]/g, (m) => `\\${m}`)}%`;
    binds.push(p, p);
  }
  if (role && (ROLES as readonly string[]).includes(role)) {
    where.push("role = ?");
    binds.push(role);
  }
  if (status === "active" || status === "suspended") {
    where.push("status = ?");
    binds.push(status);
  }
  const [rows, total] = await c.env.DB.batch([
    c.env.DB.prepare(
      `SELECT id, email, display_name, role, status, email_verified_at IS NOT NULL AS verified, created_at, last_login_at
       FROM users WHERE ${where.join(" AND ")} ORDER BY created_at DESC LIMIT 25 OFFSET ?`,
    ).bind(...binds, (page - 1) * 25),
    c.env.DB.prepare(`SELECT COUNT(*) AS n FROM users WHERE ${where.join(" AND ")}`).bind(...binds),
  ]);
  return c.json({ users: rows.results, total: (total.results[0] as { n: number }).n, page, pageSize: 25 });
});

admin.get("/users/:id", async (c) => {
  requirePermission(c, "users.view");
  const id = c.req.param("id");
  // Never select password fields.
  const u = await c.env.DB.prepare(
    `SELECT id, email, display_name, role, status, email_verified_at, created_at, last_login_at,
            (SELECT COUNT(*) FROM enrollments WHERE user_id = users.id) AS enrollments,
            (SELECT COUNT(*) FROM lesson_progress WHERE user_id = users.id AND status = 'completed') AS completed_lessons,
            (SELECT COUNT(*) FROM practice_attempts WHERE user_id = users.id) AS attempts,
            (SELECT COUNT(*) FROM discussion_posts WHERE user_id = users.id) AS posts,
            (SELECT COUNT(*) FROM tickets WHERE user_id = users.id) AS tickets,
            (SELECT COUNT(*) FROM sessions WHERE user_id = users.id AND expires_at > strftime('%Y-%m-%dT%H:%M:%SZ', 'now')) AS active_sessions
     FROM users WHERE id = ?`,
  )
    .bind(id)
    .first();
  if (!u) throw new ApiHttpError(404, "not_found", "User not found.");
  const { results: history } = await c.env.DB.prepare(
    `SELECT a.action, a.metadata, a.created_at, actor.display_name AS actor FROM audit_logs a
     LEFT JOIN users actor ON actor.id = a.actor_id WHERE a.entity_type = 'user' AND a.entity_id = ? ORDER BY a.created_at DESC LIMIT 20`,
  )
    .bind(id)
    .all();
  return c.json({ ...u, history });
});

async function targetUser(c: Parameters<typeof requirePermission>[0], id: string) {
  const actor = requirePermission(c, "users.manage");
  if (actor.id === id) throw new ApiHttpError(403, "self_action", "You can't change your own role or status.");
  const target = await c.env.DB.prepare(`SELECT id, role, status, email, display_name FROM users WHERE id = ?`)
    .bind(id)
    .first<{ id: string; role: Role; status: string; email: string; display_name: string }>();
  if (!target) throw new ApiHttpError(404, "not_found", "User not found.");
  if (!canManageRole(actor.role, target.role)) throw new ApiHttpError(403, "forbidden", "You can't manage accounts with this role.");
  return { actor, target };
}

admin.patch("/users/:id/role", async (c) => {
  const { actor, target } = await targetUser(c, c.req.param("id"));
  const { role } = await body(c, z.object({ role: z.enum(ROLES as [Role, ...Role[]]) }));
  if (!assignableRoles(actor.role).includes(role)) throw new ApiHttpError(403, "forbidden", "You can't grant that role.");
  if (role === target.role) return c.json({ ok: true });
  await c.env.DB.batch([
    c.env.DB.prepare(`UPDATE users SET role = ?, updated_at = ? WHERE id = ?`).bind(role, now(), target.id),
    auditStatement(c.env.DB, { actorId: actor.id, action: "user.role_change", entityType: "user", entityId: target.id, metadata: { from: target.role, to: role } }),
  ]);
  return c.json({ ok: true });
});

admin.post("/users/:id/suspend", async (c) => {
  const { actor, target } = await targetUser(c, c.req.param("id"));
  const { reason } = await body(c, z.object({ reason: z.string().trim().min(3, "Record a reason.").max(500) }));
  await c.env.DB.batch([
    c.env.DB.prepare(`UPDATE users SET status = 'suspended', updated_at = ? WHERE id = ?`).bind(now(), target.id),
    c.env.DB.prepare(`DELETE FROM sessions WHERE user_id = ?`).bind(target.id),
    auditStatement(c.env.DB, { actorId: actor.id, action: "user.suspend", entityType: "user", entityId: target.id, metadata: { reason } }),
  ]);
  return c.json({ ok: true });
});

admin.post("/users/:id/reactivate", async (c) => {
  const { actor, target } = await targetUser(c, c.req.param("id"));
  await c.env.DB.batch([
    c.env.DB.prepare(`UPDATE users SET status = 'active', updated_at = ? WHERE id = ?`).bind(now(), target.id),
    auditStatement(c.env.DB, { actorId: actor.id, action: "user.reactivate", entityType: "user", entityId: target.id }),
  ]);
  return c.json({ ok: true });
});

/** Sends the standard reset email to the address on file. The admin never sees the link. */
admin.post("/users/:id/send-reset", async (c) => {
  const actor = requirePermission(c, "support.password");
  const target = await c.env.DB.prepare(`SELECT id, email, display_name, role FROM users WHERE id = ? AND status = 'active'`)
    .bind(c.req.param("id"))
    .first<{ id: string; email: string; display_name: string; role: Role }>();
  if (!target) throw new ApiHttpError(404, "not_found", "Active user not found.");
  if (target.role === "owner" && actor.id !== target.id) throw new ApiHttpError(403, "forbidden", "The Owner account can't be reset by others.");
  if (mailMode(c.env) === "disabled") throw new ApiHttpError(503, "email_disabled", "Email delivery isn't configured, so no reset link can be sent.");
  await sendPasswordReset(c.env, { id: target.id, email: target.email, displayName: target.display_name });
  await audit(c.env.DB, { actorId: actor.id, action: "user.password_reset_sent", entityType: "user", entityId: target.id });
  return c.json({ ok: true });
});

// ===========================================================================
// Curriculum structure
// ===========================================================================

const contentStatus = z.enum(["draft", "in_review", "published", "archived"]);
const courseStatus = z.enum(["planned", "in_development", "published", "archived"]);

admin.get("/curriculum", async (c) => {
  requirePermission(c, "content.edit");
  const [subjects, courses] = await c.env.DB.batch([
    c.env.DB.prepare(`SELECT id, slug, name FROM subjects ORDER BY position`),
    c.env.DB.prepare(
      `SELECT c.id, c.subject_id, c.slug, c.title, c.level, c.status, c.alignment_status,
              (SELECT COUNT(*) FROM units WHERE course_id = c.id) AS units,
              (SELECT COUNT(*) FROM units u JOIN chapters ch ON ch.unit_id = u.id JOIN lesson_plans lp ON lp.chapter_id = ch.id WHERE u.course_id = c.id) AS planned,
              (SELECT COUNT(DISTINCT cl.lesson_id) FROM units u JOIN chapters ch ON ch.unit_id = u.id JOIN chapter_lessons cl ON cl.chapter_id = ch.id
                 JOIN lessons l ON l.id = cl.lesson_id WHERE u.course_id = c.id AND l.status = 'published') AS published
       FROM courses c ORDER BY c.position`,
    ),
  ]);
  return c.json({ subjects: subjects.results, courses: courses.results });
});

admin.get("/courses/:id", async (c) => {
  requirePermission(c, "content.edit");
  const id = c.req.param("id");
  const course = await c.env.DB.prepare(`SELECT * FROM courses WHERE id = ?`).bind(id).first();
  if (!course) throw new ApiHttpError(404, "not_found", "Course not found.");
  const [units, chapters, plans, placements, objectives] = await c.env.DB.batch([
    c.env.DB.prepare(`SELECT id, slug, title, summary, position, status FROM units WHERE course_id = ? ORDER BY position`).bind(id),
    c.env.DB.prepare(
      `SELECT ch.id, ch.unit_id, ch.slug, ch.title, ch.summary, ch.position, ch.status FROM chapters ch JOIN units u ON u.id = ch.unit_id
       WHERE u.course_id = ? ORDER BY ch.position`,
    ).bind(id),
    c.env.DB.prepare(
      `SELECT lp.id, lp.chapter_id, lp.title, lp.position, lp.lesson_id FROM lesson_plans lp JOIN chapters ch ON ch.id = lp.chapter_id
       JOIN units u ON u.id = ch.unit_id WHERE u.course_id = ? ORDER BY lp.position`,
    ).bind(id),
    c.env.DB.prepare(
      `SELECT cl.chapter_id, cl.position, l.id, l.slug, l.title, l.status, l.updated_at FROM chapter_lessons cl JOIN lessons l ON l.id = cl.lesson_id
       JOIN chapters ch ON ch.id = cl.chapter_id JOIN units u ON u.id = ch.unit_id WHERE u.course_id = ? ORDER BY cl.position`,
    ).bind(id),
    c.env.DB.prepare(`SELECT id, text FROM course_objectives WHERE course_id = ? ORDER BY position`).bind(id),
  ]);
  return c.json({
    course,
    objectives: objectives.results,
    units: units.results,
    chapters: chapters.results,
    plans: plans.results,
    lessons: placements.results,
  });
});

const courseSchema = z.object({
  subjectId: z.string().min(1).max(40),
  slug,
  title: z.string().trim().min(2).max(120),
  level: z.enum(["foundational", "on_level", "honors", "ap"]),
  summary: z.string().trim().max(400).default(""),
  overview: z.string().trim().max(4000).default(""),
});

admin.post("/courses", async (c) => {
  const u = requirePermission(c, "content.edit");
  const d = await body(c, courseSchema);
  const id = newId("crs");
  try {
    await c.env.DB.prepare(
      `INSERT INTO courses (id, subject_id, slug, title, level, summary, overview, status, alignment_status, framework_id, position)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'planned', ?, ?, (SELECT COALESCE(MAX(position), 0) + 1 FROM courses WHERE subject_id = ?))`,
    )
      .bind(id, d.subjectId, d.slug, d.title, d.level, d.summary, d.overview, d.level === "ap" ? "unverified" : "not_applicable",
        d.level === "ap" ? "fw_ap_ced" : null, d.subjectId)
      .run();
  } catch (e) {
    throw conflict(e, "A course with that address already exists.");
  }
  await audit(c.env.DB, { actorId: u.id, action: "course.create", entityType: "course", entityId: id });
  return c.json({ id }, 201);
});

admin.patch("/courses/:id", async (c) => {
  const u = requirePermission(c, "content.edit");
  const d = await body(
    c,
    courseSchema.partial().extend({
      alignmentStatus: z.enum(["not_applicable", "unverified", "in_review", "verified"]).optional(),
      objectives: z.array(z.string().trim().min(1).max(300)).max(30).optional(),
    }),
  );
  const id = c.req.param("id");
  if (d.alignmentStatus === "verified") requirePermission(c, "settings.manage");
  const stmts: D1PreparedStatement[] = [
    c.env.DB.prepare(
      `UPDATE courses SET title = COALESCE(?, title), slug = COALESCE(?, slug), level = COALESCE(?, level), summary = COALESCE(?, summary),
              overview = COALESCE(?, overview), alignment_status = COALESCE(?, alignment_status), updated_at = ? WHERE id = ?`,
    ).bind(d.title ?? null, d.slug ?? null, d.level ?? null, d.summary ?? null, d.overview ?? null, d.alignmentStatus ?? null, now(), id),
  ];
  if (d.objectives) {
    stmts.push(c.env.DB.prepare(`DELETE FROM course_objectives WHERE course_id = ?`).bind(id));
    d.objectives.forEach((t, i) => stmts.push(c.env.DB.prepare(`INSERT INTO course_objectives (id, course_id, position, text) VALUES (?, ?, ?, ?)`).bind(newId("obj"), id, i + 1, t)));
  }
  stmts.push(auditStatement(c.env.DB, { actorId: u.id, action: "course.update", entityType: "course", entityId: id, metadata: { fields: Object.keys(d) } }));
  try {
    await c.env.DB.batch(stmts);
  } catch (e) {
    throw conflict(e, "A course with that address already exists.");
  }
  return c.json({ ok: true });
});

function conflict(e: unknown, message: string) {
  return String(e).includes("UNIQUE") ? new ApiHttpError(409, "conflict", message) : e;
}

// Units, chapters
const nodeSchema = z.object({ slug, title: z.string().trim().min(2).max(160), summary: z.string().trim().max(600).default("") });

admin.post("/courses/:id/units", async (c) => {
  const u = requirePermission(c, "content.edit");
  const d = await body(c, nodeSchema);
  const id = newId("unit");
  try {
    await c.env.DB.prepare(
      `INSERT INTO units (id, course_id, slug, title, summary, position) VALUES (?, ?, ?, ?, ?, (SELECT COALESCE(MAX(position), 0) + 1 FROM units WHERE course_id = ?))`,
    ).bind(id, c.req.param("id"), d.slug, d.title, d.summary, c.req.param("id")).run();
  } catch (e) {
    throw conflict(e, "That unit address is already used in this course.");
  }
  await audit(c.env.DB, { actorId: u.id, action: "unit.create", entityType: "unit", entityId: id });
  return c.json({ id }, 201);
});

admin.post("/units/:id/chapters", async (c) => {
  const u = requirePermission(c, "content.edit");
  const d = await body(c, nodeSchema);
  const id = newId("chap");
  try {
    await c.env.DB.prepare(
      `INSERT INTO chapters (id, unit_id, slug, title, summary, position) VALUES (?, ?, ?, ?, ?, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE unit_id = ?))`,
    ).bind(id, c.req.param("id"), d.slug, d.title, d.summary, c.req.param("id")).run();
  } catch (e) {
    throw conflict(e, "That chapter address is already used in this unit.");
  }
  await audit(c.env.DB, { actorId: u.id, action: "chapter.create", entityType: "chapter", entityId: id });
  return c.json({ id }, 201);
});

for (const [entity, table] of [["units", "units"], ["chapters", "chapters"]] as const) {
  admin.patch(`/${entity}/:id`, async (c) => {
    const u = requirePermission(c, "content.edit");
    const d = await body(c, nodeSchema.partial());
    try {
      await c.env.DB.prepare(`UPDATE ${table} SET slug = COALESCE(?, slug), title = COALESCE(?, title), summary = COALESCE(?, summary), updated_at = ? WHERE id = ?`)
        .bind(d.slug ?? null, d.title ?? null, d.summary ?? null, now(), c.req.param("id"))
        .run();
    } catch (e) {
      throw conflict(e, "That address is already used.");
    }
    await audit(c.env.DB, { actorId: u.id, action: `${entity.slice(0, -1)}.update`, entityType: entity.slice(0, -1), entityId: c.req.param("id") });
    return c.json({ ok: true });
  });
}

// Status changes (publish / unpublish / archive) for every content type.
const STATUS_TABLES = {
  courses: { table: "courses", schema: courseStatus, entity: "course" },
  units: { table: "units", schema: contentStatus, entity: "unit" },
  chapters: { table: "chapters", schema: contentStatus, entity: "chapter" },
  lessons: { table: "lessons", schema: contentStatus, entity: "lesson" },
  formulas: { table: "formulas", schema: contentStatus, entity: "formula" },
} as const;

admin.patch("/:kind{courses|units|chapters|lessons|formulas}/:id/status", async (c) => {
  const kind = c.req.param("kind") as keyof typeof STATUS_TABLES;
  const cfg = STATUS_TABLES[kind];
  const { status } = await body(c, z.object({ status: cfg.schema }));
  const u = requirePermission(c, status === "published" || status === "archived" ? "content.publish" : "content.edit");
  const id = c.req.param("id");
  const stmts: D1PreparedStatement[] = [];
  if (kind === "lessons") {
    stmts.push(
      c.env.DB.prepare(`UPDATE lessons SET status = ?, published_at = CASE WHEN ? = 'published' THEN COALESCE(published_at, ?) ELSE published_at END, updated_at = ? WHERE id = ?`)
        .bind(status, status, now(), now(), id),
    );
    if (status === "published") {
      // A course with a published lesson is no longer just "planned".
      stmts.push(
        c.env.DB.prepare(
          `UPDATE courses SET status = 'in_development', updated_at = ? WHERE status = 'planned' AND id IN (
             SELECT u.course_id FROM chapter_lessons cl JOIN chapters ch ON ch.id = cl.chapter_id JOIN units u ON u.id = ch.unit_id WHERE cl.lesson_id = ?)`,
        ).bind(now(), id),
      );
    }
  } else {
    stmts.push(c.env.DB.prepare(`UPDATE ${cfg.table} SET status = ?, updated_at = ? WHERE id = ?`).bind(status, now(), id));
  }
  stmts.push(auditStatement(c.env.DB, { actorId: u.id, action: `${cfg.entity}.status`, entityType: cfg.entity, entityId: id, metadata: { status } }));
  const [res] = await c.env.DB.batch(stmts);
  if (!res.meta.changes) throw new ApiHttpError(404, "not_found", "Item not found.");
  return c.json({ ok: true });
});

admin.post("/reorder", async (c) => {
  const u = requirePermission(c, "content.edit");
  const d = await body(
    c,
    z.object({ kind: z.enum(["units", "chapters", "plans", "placements"]), parentId: z.string().max(80), ids: z.array(z.string().max(80)).min(1).max(200) }),
  );
  const sql = {
    units: `UPDATE units SET position = ? WHERE id = ? AND course_id = ?`,
    chapters: `UPDATE chapters SET position = ? WHERE id = ? AND unit_id = ?`,
    plans: `UPDATE lesson_plans SET position = ? WHERE id = ? AND chapter_id = ?`,
    placements: `UPDATE chapter_lessons SET position = ? WHERE lesson_id = ? AND chapter_id = ?`,
  }[d.kind];
  await c.env.DB.batch([
    ...d.ids.map((id, i) => c.env.DB.prepare(sql).bind(i + 1, id, d.parentId)),
    auditStatement(c.env.DB, { actorId: u.id, action: "curriculum.reorder", entityType: d.kind, entityId: d.parentId }),
  ]);
  return c.json({ ok: true });
});

// Lesson plans (outline entries)
admin.post("/chapters/:id/plans", async (c) => {
  requirePermission(c, "content.edit");
  const d = await body(c, z.object({ title: z.string().trim().min(2).max(160) }));
  const id = newId("plan");
  await c.env.DB.prepare(
    `INSERT INTO lesson_plans (id, chapter_id, title, position) VALUES (?, ?, ?, (SELECT COALESCE(MAX(position), 0) + 1 FROM lesson_plans WHERE chapter_id = ?))`,
  ).bind(id, c.req.param("id"), d.title, c.req.param("id")).run();
  return c.json({ id }, 201);
});

admin.patch("/plans/:id", async (c) => {
  requirePermission(c, "content.edit");
  const d = await body(c, z.object({ title: z.string().trim().min(2).max(160) }));
  await c.env.DB.prepare(`UPDATE lesson_plans SET title = ? WHERE id = ?`).bind(d.title, c.req.param("id")).run();
  return c.json({ ok: true });
});

admin.delete("/plans/:id", async (c) => {
  const u = requirePermission(c, "content.edit");
  const plan = await c.env.DB.prepare(`SELECT lesson_id FROM lesson_plans WHERE id = ?`).bind(c.req.param("id")).first<{ lesson_id: string | null }>();
  if (!plan) throw new ApiHttpError(404, "not_found", "Outline entry not found.");
  if (plan.lesson_id) throw new ApiHttpError(400, "has_lesson", "This entry has a written lesson. Archive the lesson instead.");
  await c.env.DB.prepare(`DELETE FROM lesson_plans WHERE id = ?`).bind(c.req.param("id")).run();
  await audit(c.env.DB, { actorId: u.id, action: "plan.delete", entityType: "plan", entityId: c.req.param("id") });
  return c.json({ ok: true });
});

// ===========================================================================
// Lessons: create, edit content, revisions, preview, validation
// ===========================================================================

const blockSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("text"), mode: z.enum(["learn", "watch", "experiment", "practice"]), data: z.object({ body: z.string().min(1).max(8000) }) }),
  z.object({ kind: z.literal("definition"), mode: z.enum(["learn", "watch", "experiment", "practice"]), data: z.object({ term: z.string().min(1).max(200), body: z.string().min(1).max(3000) }) }),
  z.object({
    kind: z.literal("formula"),
    mode: z.enum(["learn", "watch", "experiment", "practice"]),
    data: z.object({ title: z.string().max(200).optional(), latex: z.string().min(1).max(2000), note: z.string().max(2000).optional() }),
  }),
  z.object({
    kind: z.literal("worked_example"),
    mode: z.enum(["learn", "watch", "experiment", "practice"]),
    data: z.object({
      title: z.string().min(1).max(300),
      steps: z.array(z.object({ latex: z.string().min(1).max(1000), explanation: z.string().max(1000) })).min(1).max(20),
      check: z.string().max(2000).optional(),
    }),
  }),
  z.object({
    kind: z.literal("callout"),
    mode: z.enum(["learn", "watch", "experiment", "practice"]),
    data: z.object({ tone: z.enum(["tip", "warning", "application", "note"]), title: z.string().max(200).optional(), body: z.string().min(1).max(3000) }),
  }),
  z.object({
    kind: z.literal("figure"),
    mode: z.enum(["learn", "watch", "experiment", "practice"]),
    data: z.object({ src: z.string().max(500).refine((s) => s.startsWith("/") || s.startsWith("https://"), "Use an https:// or site-relative image URL."), alt: z.string().min(1, "Describe the image for screen readers.").max(500), caption: z.string().max(500).optional() }),
  }),
  z.object({
    kind: z.literal("activity"),
    mode: z.enum(["learn", "watch", "experiment", "practice"]),
    data: z.object({
      activity: z.string().refine((a) => ACTIVITY_IDS.includes(a), "Choose a supported activity."),
      title: z.string().max(200).optional(),
      params: z.record(z.string(), z.union([z.number(), z.boolean(), z.string().max(40)])).optional(),
      steps: z.array(z.object({ title: z.string().max(120), body: z.string().max(1000) })).max(10).optional(),
    }),
  }),
  z.object({
    kind: z.literal("references"),
    mode: z.enum(["learn", "watch", "experiment", "practice"]),
    data: z.object({ items: z.array(z.object({ citation: z.string().min(1).max(500), url: z.string().url().optional() })).max(30) }),
  }),
]);

const lessonContentSchema = z.object({
  title: z.string().trim().min(2).max(160),
  summary: z.string().trim().max(600),
  estimatedMinutes: z.number().int().min(1).max(240).nullable(),
  objectives: z.array(z.string().trim().min(1).max(300)).max(15),
  blocks: z.array(blockSchema).max(80),
  note: z.string().max(300).default(""),
});

admin.post("/chapters/:id/lessons", async (c) => {
  const u = requirePermission(c, "content.edit");
  const d = await body(c, z.object({ slug, title: z.string().trim().min(2).max(160), summary: z.string().trim().max(600).default(""), planId: z.string().max(80).optional(), existingLessonId: z.string().max(80).optional() }));
  const chapterId = c.req.param("id");
  const lessonId = d.existingLessonId ?? newId("les");
  const stmts: D1PreparedStatement[] = [];
  if (!d.existingLessonId) {
    stmts.push(c.env.DB.prepare(`INSERT INTO lessons (id, slug, title, summary, status) VALUES (?, ?, ?, ?, 'draft')`).bind(lessonId, d.slug, d.title, d.summary));
  }
  // Reusing an existing lesson places it in this chapter without copying it.
  stmts.push(
    c.env.DB.prepare(
      `INSERT INTO chapter_lessons (chapter_id, lesson_id, position) VALUES (?, ?, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapter_lessons WHERE chapter_id = ?))`,
    ).bind(chapterId, lessonId, chapterId),
  );
  if (d.planId) stmts.push(c.env.DB.prepare(`UPDATE lesson_plans SET lesson_id = ? WHERE id = ? AND chapter_id = ?`).bind(lessonId, d.planId, chapterId));
  stmts.push(auditStatement(c.env.DB, { actorId: u.id, action: d.existingLessonId ? "lesson.place" : "lesson.create", entityType: "lesson", entityId: lessonId, metadata: { chapterId } }));
  try {
    await c.env.DB.batch(stmts);
  } catch (e) {
    throw conflict(e, "A lesson with that address already exists. To reuse it here, choose it as an existing lesson.");
  }
  return c.json({ id: lessonId }, 201);
});

admin.get("/lessons", async (c) => {
  requirePermission(c, "content.edit");
  const q = (c.req.query("q") ?? "").trim().slice(0, 100);
  const { results } = await c.env.DB.prepare(
    `SELECT id, slug, title, status, updated_at FROM lessons WHERE title LIKE ? OR slug LIKE ? ORDER BY updated_at DESC LIMIT 30`,
  )
    .bind(`%${q}%`, `%${q}%`)
    .all();
  return c.json(results);
});

admin.get("/lessons/:id", async (c) => {
  requirePermission(c, "content.edit");
  const id = c.req.param("id");
  const lesson = await c.env.DB.prepare(`SELECT * FROM lessons WHERE id = ?`).bind(id).first();
  if (!lesson) throw new ApiHttpError(404, "not_found", "Lesson not found.");
  const [objectives, blocks, questions, placements] = await c.env.DB.batch([
    c.env.DB.prepare(`SELECT text FROM lesson_objectives WHERE lesson_id = ? ORDER BY position`).bind(id),
    c.env.DB.prepare(`SELECT id, mode, kind, data FROM lesson_blocks WHERE lesson_id = ? ORDER BY CASE mode WHEN 'learn' THEN 1 WHEN 'watch' THEN 2 WHEN 'experiment' THEN 3 ELSE 4 END, position`).bind(id),
    c.env.DB.prepare(`SELECT * FROM practice_questions WHERE lesson_id = ? AND status <> 'archived' ORDER BY purpose, position`).bind(id),
    c.env.DB.prepare(
      `SELECT c.id AS course_id, c.slug AS course_slug, c.title AS course_title, u.slug AS unit_slug, u.title AS unit_title, u.status AS unit_status,
              ch.title AS chapter_title, ch.status AS chapter_status
       FROM chapter_lessons cl JOIN chapters ch ON ch.id = cl.chapter_id JOIN units u ON u.id = ch.unit_id JOIN courses c ON c.id = u.course_id
       WHERE cl.lesson_id = ?`,
    ).bind(id),
  ]);
  return c.json({
    lesson,
    objectives: (objectives.results as { text: string }[]).map((o) => o.text),
    blocks: (blocks.results as { id: string; mode: string; kind: string; data: string }[]).map((b) => ({ ...b, data: safeJson(b.data, {}) })),
    questions: (questions.results as Record<string, unknown>[]).map((q) => ({ ...q, data: safeJson(q.data as string, {}), hints: safeJson(q.hints as string, []) })),
    placements: placements.results,
  });
});

admin.put("/lessons/:id", async (c) => {
  const u = requirePermission(c, "content.edit");
  const id = c.req.param("id");
  const d = await body(c, lessonContentSchema);
  const current = await c.env.DB.prepare(`SELECT revision FROM lessons WHERE id = ?`).bind(id).first<{ revision: number }>();
  if (!current) throw new ApiHttpError(404, "not_found", "Lesson not found.");
  const rev = current.revision + 1;
  const stmts: D1PreparedStatement[] = [
    c.env.DB.prepare(`UPDATE lessons SET title = ?, summary = ?, estimated_minutes = ?, revision = ?, updated_at = ? WHERE id = ?`).bind(
      d.title, d.summary, d.estimatedMinutes, rev, now(), id,
    ),
    c.env.DB.prepare(`DELETE FROM lesson_objectives WHERE lesson_id = ?`).bind(id),
    c.env.DB.prepare(`DELETE FROM lesson_blocks WHERE lesson_id = ?`).bind(id),
    ...d.objectives.map((t, i) => c.env.DB.prepare(`INSERT INTO lesson_objectives (id, lesson_id, position, text) VALUES (?, ?, ?, ?)`).bind(newId("lobj"), id, i + 1, t)),
    ...d.blocks.map((b, i) =>
      c.env.DB.prepare(`INSERT INTO lesson_blocks (id, lesson_id, mode, position, kind, data) VALUES (?, ?, ?, ?, ?, ?)`).bind(
        newId("blk"), id, b.mode, i + 1, b.kind, JSON.stringify(b.data),
      ),
    ),
    c.env.DB.prepare(`INSERT INTO content_revisions (id, entity_type, entity_id, revision, snapshot, author_id, note) VALUES (?, 'lesson', ?, ?, ?, ?, ?)`).bind(
      newId("rev"), id, rev, JSON.stringify({ title: d.title, summary: d.summary, estimatedMinutes: d.estimatedMinutes, objectives: d.objectives, blocks: d.blocks }), u.id, d.note,
    ),
    auditStatement(c.env.DB, { actorId: u.id, action: "lesson.save", entityType: "lesson", entityId: id, metadata: { revision: rev } }),
  ];
  await c.env.DB.batch(stmts);
  return c.json({ ok: true, revision: rev });
});

admin.get("/lessons/:id/revisions", async (c) => {
  requirePermission(c, "content.edit");
  const { results } = await c.env.DB.prepare(
    `SELECT r.revision, r.note, r.created_at, u.display_name AS author FROM content_revisions r LEFT JOIN users u ON u.id = r.author_id
     WHERE r.entity_type = 'lesson' AND r.entity_id = ? ORDER BY r.revision DESC LIMIT 100`,
  )
    .bind(c.req.param("id"))
    .all();
  return c.json(results);
});

admin.get("/lessons/:id/revisions/:rev", async (c) => {
  requirePermission(c, "content.edit");
  const r = await c.env.DB.prepare(`SELECT snapshot FROM content_revisions WHERE entity_type = 'lesson' AND entity_id = ? AND revision = ?`)
    .bind(c.req.param("id"), Number(c.req.param("rev")))
    .first<{ snapshot: string }>();
  if (!r) throw new ApiHttpError(404, "not_found", "Revision not found.");
  return c.json(JSON.parse(r.snapshot));
});

admin.get("/lessons/:id/preview", async (c) => {
  requirePermission(c, "content.edit");
  const id = c.req.param("id");
  const ctx = await c.env.DB.prepare(
    `SELECT c.slug AS course_slug, c.title AS course_title, s.slug AS subject_slug, s.name AS subject_name, u.slug AS unit_slug, u.title AS unit_title,
            ch.slug AS chapter_slug, ch.title AS chapter_title
     FROM chapter_lessons cl JOIN chapters ch ON ch.id = cl.chapter_id JOIN units u ON u.id = ch.unit_id JOIN courses c ON c.id = u.course_id
     JOIN subjects s ON s.id = c.subject_id WHERE cl.lesson_id = ? LIMIT 1`,
  )
    .bind(id)
    .first<Record<string, string>>();
  const lesson = await buildLesson(
    c.env.DB,
    id,
    {
      course: { slug: ctx?.course_slug ?? "", title: ctx?.course_title ?? "Unplaced", subject: { slug: ctx?.subject_slug ?? "", name: ctx?.subject_name ?? "" } },
      unit: { slug: ctx?.unit_slug ?? "", title: ctx?.unit_title ?? "" },
      chapter: { slug: ctx?.chapter_slug ?? "", title: ctx?.chapter_title ?? "" },
    },
    { previous: null, next: null },
    { includeDrafts: true },
  );
  if (!lesson) throw new ApiHttpError(404, "not_found", "Lesson not found.");
  return c.json(lesson);
});

/** Structural checks before publishing. Returns problems; does not block saving drafts. */
admin.get("/lessons/:id/validate", async (c) => {
  requirePermission(c, "content.edit");
  const id = c.req.param("id");
  const [l, objectives, blocks, questions, placements] = await c.env.DB.batch([
    c.env.DB.prepare(`SELECT title, summary FROM lessons WHERE id = ?`).bind(id),
    c.env.DB.prepare(`SELECT COUNT(*) AS n FROM lesson_objectives WHERE lesson_id = ?`).bind(id),
    c.env.DB.prepare(`SELECT mode, kind, data FROM lesson_blocks WHERE lesson_id = ?`).bind(id),
    c.env.DB.prepare(`SELECT kind, data, solution FROM practice_questions WHERE lesson_id = ? AND status = 'published'`).bind(id),
    c.env.DB.prepare(
      `SELECT u.status AS us, ch.status AS cs, c.title FROM chapter_lessons cl JOIN chapters ch ON ch.id = cl.chapter_id JOIN units u ON u.id = ch.unit_id
       JOIN courses c ON c.id = u.course_id WHERE cl.lesson_id = ?`,
    ).bind(id),
  ]);
  const lesson = l.results[0] as { title: string; summary: string } | undefined;
  if (!lesson) throw new ApiHttpError(404, "not_found", "Lesson not found.");
  const problems: { level: "error" | "warning"; message: string }[] = [];
  if (!lesson.summary) problems.push({ level: "warning", message: "Add a summary; it appears in unit pages and search." });
  if ((objectives.results[0] as { n: number }).n === 0) problems.push({ level: "warning", message: "Add at least one learning objective." });
  const bl = blocks.results as { mode: string; kind: string; data: string }[];
  if (!bl.some((b) => b.mode === "learn")) problems.push({ level: "error", message: "The Learn mode has no content." });
  if (!bl.some((b) => b.kind === "worked_example")) problems.push({ level: "warning", message: "No worked example yet." });
  for (const b of bl.filter((b) => b.kind === "activity")) {
    const a = safeJson<{ activity?: string }>(b.data, {}).activity;
    if (!a || !ACTIVITY_IDS.includes(a)) problems.push({ level: "error", message: `Unknown activity "${a}".` });
  }
  const qs = questions.results as { kind: string; data: string; solution: string }[];
  if (qs.length === 0) problems.push({ level: "warning", message: "No published practice questions." });
  qs.forEach((q, i) => {
    const d = safeJson<{ choices?: string[]; answer?: number; accept?: string[] }>(q.data, {});
    if (q.kind === "multiple_choice" && (!d.choices || d.answer === undefined || d.answer < 0 || d.answer >= d.choices.length)) {
      problems.push({ level: "error", message: `Question ${i + 1}: the correct choice is out of range.` });
    }
    if (q.kind === "short_text" && !d.accept?.length) problems.push({ level: "error", message: `Question ${i + 1}: add at least one accepted answer.` });
    if (!q.solution) problems.push({ level: "warning", message: `Question ${i + 1}: add a worked solution.` });
  });
  const pl = placements.results as { us: string; cs: string; title: string }[];
  if (pl.length === 0) problems.push({ level: "error", message: "The lesson isn't placed in any chapter." });
  for (const p of pl) {
    if (p.us !== "published" || p.cs !== "published") problems.push({ level: "warning", message: `In ${p.title}, its unit or chapter isn't published, so readers won't see it there.` });
  }
  return c.json({ problems, ok: !problems.some((p) => p.level === "error") });
});

// ===========================================================================
// Practice questions
// ===========================================================================

const questionSchema = z
  .object({
    purpose: z.enum(["practice", "review"]).default("practice"),
    kind: z.enum(["multiple_choice", "numeric", "short_text"]),
    difficulty: z.number().int().min(1).max(3),
    prompt: z.string().trim().min(3).max(3000),
    data: z.record(z.string(), z.unknown()),
    hints: z.array(z.string().trim().min(1).max(1000)).max(5).default([]),
    solution: z.string().trim().max(5000).default(""),
    status: z.enum(["draft", "published"]).default("published"),
  })
  .superRefine((q, ctx) => {
    const d = q.data as Record<string, unknown>;
    if (q.kind === "multiple_choice") {
      const ok = Array.isArray(d.choices) && d.choices.length >= 2 && d.choices.every((x) => typeof x === "string" && x.length > 0)
        && Number.isInteger(d.answer) && (d.answer as number) >= 0 && (d.answer as number) < (d.choices as string[]).length;
      if (!ok) ctx.addIssue({ code: "custom", path: ["data"], message: "Give at least two choices and mark the correct one." });
    } else if (q.kind === "numeric") {
      if (typeof d.answer !== "number" || !Number.isFinite(d.answer)) ctx.addIssue({ code: "custom", path: ["data"], message: "Enter the numeric answer." });
      if (d.tolerance !== undefined && (typeof d.tolerance !== "number" || d.tolerance < 0)) ctx.addIssue({ code: "custom", path: ["data"], message: "Tolerance must be zero or more." });
    } else if (!Array.isArray(d.accept) || d.accept.length === 0 || !d.accept.every((x) => typeof x === "string" && x.trim())) {
      ctx.addIssue({ code: "custom", path: ["data"], message: "List at least one accepted answer." });
    }
  });

admin.post("/lessons/:id/questions", async (c) => {
  const u = requirePermission(c, "content.edit");
  const d = await body(c, questionSchema);
  const id = newId("q");
  await c.env.DB.prepare(
    `INSERT INTO practice_questions (id, lesson_id, position, purpose, kind, difficulty, prompt, data, hints, solution, status)
     VALUES (?, ?, (SELECT COALESCE(MAX(position), 0) + 1 FROM practice_questions WHERE lesson_id = ?), ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(id, c.req.param("id"), c.req.param("id"), d.purpose, d.kind, d.difficulty, d.prompt, JSON.stringify(d.data), JSON.stringify(d.hints), d.solution, d.status)
    .run();
  await audit(c.env.DB, { actorId: u.id, action: "question.create", entityType: "question", entityId: id });
  return c.json({ id }, 201);
});

admin.put("/questions/:id", async (c) => {
  const u = requirePermission(c, "content.edit");
  const d = await body(c, questionSchema);
  const res = await c.env.DB.prepare(
    `UPDATE practice_questions SET purpose = ?, kind = ?, difficulty = ?, prompt = ?, data = ?, hints = ?, solution = ?, status = ?, updated_at = ? WHERE id = ?`,
  )
    .bind(d.purpose, d.kind, d.difficulty, d.prompt, JSON.stringify(d.data), JSON.stringify(d.hints), d.solution, d.status, now(), c.req.param("id"))
    .run();
  if (!res.meta.changes) throw new ApiHttpError(404, "not_found", "Question not found.");
  await audit(c.env.DB, { actorId: u.id, action: "question.update", entityType: "question", entityId: c.req.param("id") });
  return c.json({ ok: true });
});

admin.delete("/questions/:id", async (c) => {
  const u = requirePermission(c, "content.edit");
  // Archived, not deleted, so students' practice history still makes sense.
  await c.env.DB.prepare(`UPDATE practice_questions SET status = 'archived', updated_at = ? WHERE id = ?`).bind(now(), c.req.param("id")).run();
  await audit(c.env.DB, { actorId: u.id, action: "question.archive", entityType: "question", entityId: c.req.param("id") });
  return c.json({ ok: true });
});

// ===========================================================================
// Formulas
// ===========================================================================

const formulaSchema = z.object({
  subjectId: z.string().min(1).max(40),
  slug,
  name: z.string().trim().min(2).max(160),
  latex: z.string().trim().min(1).max(2000),
  description: z.string().trim().max(2000).default(""),
  variables: z.array(z.object({ symbol: z.string().min(1).max(100), meaning: z.string().min(1).max(200), unit: z.string().max(40).optional() })).max(20).default([]),
});

admin.get("/formulas", async (c) => {
  requirePermission(c, "content.edit");
  const { results } = await c.env.DB.prepare(
    `SELECT f.id, f.subject_id, f.slug, f.name, f.latex, f.description, f.variables, f.status, s.name AS subject_name
     FROM formulas f JOIN subjects s ON s.id = f.subject_id ORDER BY s.position, f.name`,
  ).all<Record<string, string>>();
  return c.json(results.map((r) => ({ ...r, variables: safeJson(r.variables, []) })));
});

admin.post("/formulas", async (c) => {
  const u = requirePermission(c, "content.edit");
  const d = await body(c, formulaSchema);
  const id = newId("frm");
  try {
    await c.env.DB.prepare(`INSERT INTO formulas (id, subject_id, slug, name, latex, description, variables, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'draft')`)
      .bind(id, d.subjectId, d.slug, d.name, d.latex, d.description, JSON.stringify(d.variables))
      .run();
  } catch (e) {
    throw conflict(e, "A formula with that address already exists.");
  }
  await audit(c.env.DB, { actorId: u.id, action: "formula.create", entityType: "formula", entityId: id });
  return c.json({ id }, 201);
});

admin.put("/formulas/:id", async (c) => {
  const u = requirePermission(c, "content.edit");
  const d = await body(c, formulaSchema);
  try {
    await c.env.DB.prepare(`UPDATE formulas SET subject_id = ?, slug = ?, name = ?, latex = ?, description = ?, variables = ?, updated_at = ? WHERE id = ?`)
      .bind(d.subjectId, d.slug, d.name, d.latex, d.description, JSON.stringify(d.variables), now(), c.req.param("id"))
      .run();
  } catch (e) {
    throw conflict(e, "A formula with that address already exists.");
  }
  await audit(c.env.DB, { actorId: u.id, action: "formula.update", entityType: "formula", entityId: c.req.param("id") });
  return c.json({ ok: true });
});

// ===========================================================================
// Feedback inbox, support and password assistance
// ===========================================================================

admin.get("/tickets", async (c) => {
  const user = requirePermission(c, "feedback.manage");
  const category = c.req.query("category");
  const status = c.req.query("status");
  const q = (c.req.query("q") ?? "").trim().slice(0, 100);
  const context = (c.req.query("context") ?? "").trim().slice(0, 120);
  const where = ["1 = 1"];
  const binds: string[] = [];
  if (category) {
    where.push("t.category = ?");
    binds.push(category);
  }
  // Password-assistance tickets are visible to staff with support.password only.
  if (!user.role || !["administrator", "owner"].includes(user.role)) where.push("t.category <> 'password_assistance'");
  if (status === "active") where.push("t.status IN ('open', 'in_progress', 'waiting_on_user')");
  else if (status) {
    where.push("t.status = ?");
    binds.push(status);
  }
  if (q) {
    where.push("(t.subject LIKE ? OR EXISTS (SELECT 1 FROM ticket_messages m WHERE m.ticket_id = t.id AND m.body LIKE ?))");
    binds.push(`%${q}%`, `%${q}%`);
  }
  if (context) {
    where.push("t.context_label LIKE ?");
    binds.push(`%${context}%`);
  }
  const { results } = await c.env.DB.prepare(
    `SELECT t.id, t.category, t.subject, t.status, t.context_type, t.context_label, t.created_at, t.updated_at,
            COALESCE(u.display_name, t.contact_email) AS requester, a.display_name AS assignee
     FROM tickets t LEFT JOIN users u ON u.id = t.user_id LEFT JOIN users a ON a.id = t.assigned_to
     WHERE ${where.join(" AND ")} ORDER BY t.updated_at DESC LIMIT 100`,
  )
    .bind(...binds)
    .all();
  return c.json(results);
});

async function loadTicket(c: Parameters<typeof requirePermission>[0], id: string) {
  const user = requirePermission(c, "feedback.manage");
  const t = await c.env.DB.prepare(
    `SELECT t.*, u.display_name AS requester_name, u.email AS requester_email FROM tickets t LEFT JOIN users u ON u.id = t.user_id WHERE t.id = ?`,
  )
    .bind(id)
    .first<Record<string, string | null>>();
  if (!t) throw new ApiHttpError(404, "not_found", "Ticket not found.");
  if (t.category === "password_assistance") requirePermission(c, "support.password");
  return { user, t };
}

admin.get("/tickets/:id", async (c) => {
  const { t } = await loadTicket(c, c.req.param("id"));
  const { results } = await c.env.DB.prepare(
    `SELECT m.id, m.body, m.is_staff, m.created_at, u.display_name AS author FROM ticket_messages m LEFT JOIN users u ON u.id = m.author_id
     WHERE m.ticket_id = ? ORDER BY m.created_at`,
  )
    .bind(t.id)
    .all();
  let matchedAccount: { id: string; status: string; verified: boolean } | null = null;
  if (t.category === "password_assistance" && t.contact_email) {
    const acct = await c.env.DB.prepare(`SELECT id, status, email_verified_at FROM users WHERE email = ?`).bind(t.contact_email).first<{ id: string; status: string; email_verified_at: string | null }>();
    matchedAccount = acct ? { id: acct.id, status: acct.status, verified: !!acct.email_verified_at } : null;
  }
  const { results: staff } = await c.env.DB.prepare(`SELECT id, display_name FROM users WHERE role IN ('moderator', 'administrator', 'owner') ORDER BY display_name`).all();
  return c.json({ ticket: t, messages: results, matchedAccount, staff });
});

admin.post("/tickets/:id/messages", async (c) => {
  const { user, t } = await loadTicket(c, c.req.param("id"));
  const d = await body(c, z.object({ body: z.string().trim().min(1).max(5000), status: z.enum(["open", "in_progress", "waiting_on_user", "resolved", "closed"]).optional() }));
  await c.env.DB.batch([
    c.env.DB.prepare(`INSERT INTO ticket_messages (id, ticket_id, author_id, is_staff, body) VALUES (?, ?, ?, 1, ?)`).bind(newId("msg"), t.id, user.id, d.body),
    c.env.DB.prepare(`UPDATE tickets SET status = COALESCE(?, CASE WHEN status = 'open' THEN 'waiting_on_user' ELSE status END), updated_at = ? WHERE id = ?`).bind(d.status ?? null, now(), t.id),
    auditStatement(c.env.DB, { actorId: user.id, action: "ticket.reply", entityType: "ticket", entityId: t.id as string }),
  ]);
  if (t.user_id) {
    await notify(c.env.DB, t.user_id, "New reply to your request", t.subject as string, `/support/${t.id}`);
  } else if (t.contact_email) {
    // Password-assistance requester without a session: reply by email (no account details included).
    await sendMail(c.env, {
      to: t.contact_email,
      subject: "Reply to your Eureka and Beyond password request",
      text: `${d.body}\n\nEureka and Beyond support`,
    });
  }
  return c.json({ ok: true }, 201);
});

admin.patch("/tickets/:id", async (c) => {
  const { user, t } = await loadTicket(c, c.req.param("id"));
  const d = await body(c, z.object({ status: z.enum(["open", "in_progress", "waiting_on_user", "resolved", "closed"]).optional(), assignedTo: z.string().max(80).nullable().optional() }));
  await c.env.DB.batch([
    c.env.DB.prepare(`UPDATE tickets SET status = COALESCE(?, status), assigned_to = CASE WHEN ? THEN ? ELSE assigned_to END, updated_at = ? WHERE id = ?`).bind(
      d.status ?? null, d.assignedTo !== undefined ? 1 : 0, d.assignedTo ?? null, now(), t.id,
    ),
    auditStatement(c.env.DB, { actorId: user.id, action: "ticket.update", entityType: "ticket", entityId: t.id as string, metadata: d }),
  ]);
  if (d.status && t.user_id && d.status !== t.status) {
    await notify(c.env.DB, t.user_id, `Your request is now ${d.status.replace(/_/g, " ")}`, t.subject as string, `/support/${t.id}`);
  }
  return c.json({ ok: true });
});

/**
 * Approved recovery for password-assistance tickets: emails the standard
 * single-use reset link to the address on file. Staff never see the link,
 * and nothing is sent to any address other than the account's own.
 */
admin.post("/tickets/:id/send-reset", async (c) => {
  const { user, t } = await loadTicket(c, c.req.param("id"));
  requirePermission(c, "support.password");
  const email = (t.requester_email ?? t.contact_email) as string | null;
  const acct = email
    ? await c.env.DB.prepare(`SELECT id, email, display_name, role FROM users WHERE email = ? AND status = 'active'`).bind(email).first<{ id: string; email: string; display_name: string; role: Role }>()
    : null;
  if (!acct) throw new ApiHttpError(404, "no_account", "No active account uses this email address, so no link was sent.");
  if (acct.role === "owner") throw new ApiHttpError(403, "forbidden", "Owner recovery must use the bootstrap process.");
  if (mailMode(c.env) === "disabled") throw new ApiHttpError(503, "email_disabled", "Email delivery isn't configured, so no reset link can be sent.");
  await sendPasswordReset(c.env, { id: acct.id, email: acct.email, displayName: acct.display_name });
  await c.env.DB.batch([
    c.env.DB.prepare(`INSERT INTO ticket_messages (id, ticket_id, author_id, is_staff, body) VALUES (?, ?, ?, 1, ?)`).bind(
      newId("msg"), t.id, user.id, "A password reset link was sent to the email address on the account.",
    ),
    c.env.DB.prepare(`UPDATE tickets SET status = 'waiting_on_user', updated_at = ? WHERE id = ?`).bind(now(), t.id),
    auditStatement(c.env.DB, { actorId: user.id, action: "ticket.password_reset_sent", entityType: "user", entityId: acct.id, metadata: { ticket: t.id } }),
  ]);
  return c.json({ ok: true });
});

// ===========================================================================
// Discussion moderation
// ===========================================================================

admin.get("/moderation/posts", async (c) => {
  requirePermission(c, "community.moderate");
  const status = c.req.query("status") ?? "pending";
  if (!["pending", "approved", "rejected", "removed"].includes(status)) throw new ApiHttpError(400, "invalid_parameter", "Invalid status.");
  const { results } = await c.env.DB.prepare(
    `SELECT p.id, p.kind, p.body, p.status, p.context_label, p.created_at, p.parent_id, u.display_name AS author, u.id AS author_id,
            l.title AS lesson_title, l.id AS lesson_id, (SELECT COUNT(*) FROM reports r WHERE r.post_id = p.id AND r.status = 'open') AS open_reports
     FROM discussion_posts p JOIN users u ON u.id = p.user_id JOIN lessons l ON l.id = p.lesson_id
     WHERE p.status = ? ORDER BY p.created_at ${status === "pending" ? "ASC" : "DESC"} LIMIT 100`,
  )
    .bind(status)
    .all();
  return c.json(results);
});

admin.post("/moderation/posts/:id", async (c) => {
  const u = requirePermission(c, "community.moderate");
  const d = await body(c, z.object({ action: z.enum(["approve", "reject", "remove"]), note: z.string().max(500).optional() }));
  const status = { approve: "approved", reject: "rejected", remove: "removed" }[d.action];
  const post = await c.env.DB.prepare(`SELECT id, user_id, lesson_id FROM discussion_posts WHERE id = ?`).bind(c.req.param("id")).first<{ id: string; user_id: string; lesson_id: string }>();
  if (!post) throw new ApiHttpError(404, "not_found", "Post not found.");
  await c.env.DB.batch([
    c.env.DB.prepare(`UPDATE discussion_posts SET status = ?, moderated_by = ?, moderated_at = ? WHERE id = ?`).bind(status, u.id, now(), post.id),
    c.env.DB.prepare(`UPDATE reports SET status = 'resolved', resolved_by = ? WHERE post_id = ? AND status = 'open'`).bind(u.id, post.id),
    auditStatement(c.env.DB, { actorId: u.id, action: `post.${d.action}`, entityType: "post", entityId: post.id, metadata: d.note ? { note: d.note } : {} }),
  ]);
  if (d.action !== "approve") {
    await notify(c.env.DB, post.user_id, d.action === "reject" ? "Your post wasn't published" : "Your post was removed",
      d.note ?? "It didn't meet the community guidelines.", null);
  } else {
    await notify(c.env.DB, post.user_id, "Your post is now public", "A moderator approved your post.", null);
  }
  return c.json({ ok: true });
});

admin.post("/moderation/posts/:id/reply", async (c) => {
  const u = requirePermission(c, "community.moderate");
  const d = await body(c, z.object({ body: z.string().trim().min(2).max(3000) }));
  const parent = await c.env.DB.prepare(`SELECT id, lesson_id, user_id, parent_id FROM discussion_posts WHERE id = ? AND status = 'approved'`)
    .bind(c.req.param("id"))
    .first<{ id: string; lesson_id: string; user_id: string; parent_id: string | null }>();
  if (!parent) throw new ApiHttpError(404, "not_found", "Approve the post before replying.");
  const id = newId("pst");
  await c.env.DB.batch([
    c.env.DB.prepare(
      `INSERT INTO discussion_posts (id, lesson_id, parent_id, user_id, kind, body, status, is_staff, moderated_by, moderated_at)
       VALUES (?, ?, ?, ?, 'comment', ?, 'approved', 1, ?, ?)`,
    ).bind(id, parent.lesson_id, parent.parent_id ?? parent.id, u.id, d.body, u.id, now()),
    auditStatement(c.env.DB, { actorId: u.id, action: "post.staff_reply", entityType: "post", entityId: parent.id }),
  ]);
  await notify(c.env.DB, parent.user_id, "A moderator answered your post", d.body.slice(0, 140), null);
  return c.json({ id }, 201);
});

admin.get("/moderation/reports", async (c) => {
  requirePermission(c, "community.moderate");
  const { results } = await c.env.DB.prepare(
    `SELECT r.id, r.reason, r.status, r.created_at, p.id AS post_id, p.body AS post_body, p.status AS post_status,
            reporter.display_name AS reporter, author.display_name AS author, l.title AS lesson_title
     FROM reports r JOIN discussion_posts p ON p.id = r.post_id JOIN users reporter ON reporter.id = r.reporter_id
     JOIN users author ON author.id = p.user_id JOIN lessons l ON l.id = p.lesson_id
     WHERE r.status = COALESCE(?, r.status) ORDER BY r.created_at DESC LIMIT 100`,
  )
    .bind(c.req.query("status") || "open")
    .all();
  return c.json(results);
});

admin.post("/moderation/reports/:id", async (c) => {
  const u = requirePermission(c, "community.moderate");
  const d = await body(c, z.object({ action: z.enum(["resolve", "dismiss"]) }));
  await c.env.DB.batch([
    c.env.DB.prepare(`UPDATE reports SET status = ?, resolved_by = ? WHERE id = ?`).bind(d.action === "resolve" ? "resolved" : "dismissed", u.id, c.req.param("id")),
    auditStatement(c.env.DB, { actorId: u.id, action: `report.${d.action}`, entityType: "report", entityId: c.req.param("id") }),
  ]);
  return c.json({ ok: true });
});

admin.get("/moderation/history", async (c) => {
  requirePermission(c, "community.moderate");
  const { results } = await c.env.DB.prepare(
    `SELECT a.action, a.entity_id, a.metadata, a.created_at, u.display_name AS actor FROM audit_logs a LEFT JOIN users u ON u.id = a.actor_id
     WHERE a.action LIKE 'post.%' OR a.action LIKE 'report.%' ORDER BY a.created_at DESC LIMIT 100`,
  ).all();
  return c.json(results);
});

// ===========================================================================
// Analytics (aggregates only; no per-student data)
// ===========================================================================

admin.get("/analytics", async (c) => {
  requirePermission(c, "analytics.view");
  const db = c.env.DB;
  const [engagement, completion, practice, difficulties, trends] = await db.batch([
    db.prepare(
      `SELECT c.title, c.slug, (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id) AS enrollments,
              (SELECT COUNT(DISTINCT p.user_id) FROM lesson_progress p WHERE p.course_id = c.id AND p.updated_at >= strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '-30 days')) AS active_30d
       FROM courses c WHERE c.status IN ('in_development', 'published') ORDER BY enrollments DESC, c.position LIMIT 30`,
    ),
    db.prepare(
      `SELECT l.title, SUM(p.status = 'started') AS started, SUM(p.status = 'completed') AS completed
       FROM lesson_progress p JOIN lessons l ON l.id = p.lesson_id GROUP BY l.id ORDER BY completed + started DESC LIMIT 30`,
    ),
    db.prepare(
      `SELECT l.title, COUNT(a.id) AS attempts, ROUND(AVG(a.correct) * 100) AS accuracy, COUNT(DISTINCT a.user_id) AS learners
       FROM practice_attempts a JOIN practice_questions q ON q.id = a.question_id JOIN lessons l ON l.id = q.lesson_id
       GROUP BY l.id HAVING COUNT(a.id) >= 1 ORDER BY accuracy ASC LIMIT 30`,
    ),
    db.prepare(
      `SELECT context_label AS label, category, COUNT(*) AS n FROM tickets WHERE context_label <> '' AND category IN ('question', 'bug', 'concern')
       GROUP BY context_label, category ORDER BY n DESC LIMIT 20`,
    ),
    db.prepare(
      `SELECT strftime('%Y-%W', created_at) AS week, category, COUNT(*) AS n FROM tickets
       WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%SZ', 'now', '-56 days') GROUP BY week, category ORDER BY week`,
    ),
  ]);
  return c.json({
    engagement: engagement.results,
    completion: completion.results,
    practice: practice.results,
    difficulties: difficulties.results,
    feedbackTrends: trends.results,
  });
});

// ===========================================================================
// Settings and audit log
// ===========================================================================

admin.get("/settings", async (c) => {
  requirePermission(c, "settings.manage");
  const { results } = await c.env.DB.prepare(`SELECT key, value, updated_at FROM site_settings`).all<{ key: string; value: string; updated_at: string }>();
  return c.json({ settings: Object.fromEntries(results.map((r) => [r.key, safeJson(r.value, {})])), mailMode: mailMode(c.env), siteUrl: siteUrl(c.env, "") });
});

admin.put("/settings", async (c) => {
  const u = requirePermission(c, "settings.manage");
  const d = await body(
    c,
    z.object({
      announcement: z.object({ enabled: z.boolean(), message: z.string().max(300), tone: z.enum(["info", "success", "warning"]) }).optional(),
      registration: z.object({ open: z.boolean() }).optional(),
    }),
  );
  const stmts = Object.entries(d)
    .filter(([, v]) => v !== undefined)
    .map(([k, v]) =>
      c.env.DB.prepare(`INSERT INTO site_settings (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`).bind(
        k, JSON.stringify(v), now(),
      ),
    );
  stmts.push(auditStatement(c.env.DB, { actorId: u.id, action: "settings.update", entityType: "settings", metadata: d }));
  await c.env.DB.batch(stmts);
  return c.json({ ok: true });
});

admin.get("/audit", async (c) => {
  requirePermission(c, "audit.view");
  const page = pageParam(c.req.query("page"));
  const action = (c.req.query("action") ?? "").trim().slice(0, 60);
  const { results } = await c.env.DB.prepare(
    `SELECT a.id, a.action, a.entity_type, a.entity_id, a.metadata, a.created_at, u.display_name AS actor, u.email AS actor_email
     FROM audit_logs a LEFT JOIN users u ON u.id = a.actor_id WHERE a.action LIKE ? ORDER BY a.created_at DESC LIMIT 50 OFFSET ?`,
  )
    .bind(`${action}%`, (page - 1) * 50)
    .all();
  return c.json({ entries: results, page });
});
