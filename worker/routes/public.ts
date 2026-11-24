import { Hono } from "hono";
import { z } from "zod";
import type { CourseLevel, SearchResultType, SiteConfig } from "../../shared/types";
import type { AppEnv } from "../env";
import {
  COURSE_LEVELS,
  getCourse,
  getLesson,
  getStats,
  getUnit,
  listCourses,
  listFormulas,
  listSubjects,
  safeJson,
  search,
} from "../lib/curriculum";
import { ApiHttpError, body, isSlug } from "../lib/http";
import { mailMode } from "../lib/mail";
import { checkAnswer, type AnswerKey } from "../lib/practice";
import { clientIp, rateLimit } from "../lib/rate-limit";
import { newId, sha256Hex } from "../lib/crypto";

const SEARCH_TYPES: readonly SearchResultType[] = ["course", "lesson", "formula", "concept"];

export function slugParam(value: string | undefined, name: string): string {
  if (!value || !isSlug(value)) throw new ApiHttpError(400, "invalid_parameter", `Invalid ${name}.`);
  return value;
}

function optionalSlug(value: string | undefined, name: string): string | undefined {
  if (value === undefined || value === "") return undefined;
  return slugParam(value, name);
}

function optionalLevel(value: string | undefined): CourseLevel | undefined {
  if (value === undefined || value === "") return undefined;
  if (!(COURSE_LEVELS as readonly string[]).includes(value)) throw new ApiHttpError(400, "invalid_parameter", "Invalid level.");
  return value as CourseLevel;
}

export const publicRoutes = new Hono<AppEnv>();

publicRoutes.get("/health", (c) => c.json({ ok: true, env: c.env.APP_ENV }, 200, { "Cache-Control": "no-store" }));

publicRoutes.get("/site", async (c) => {
  const { results } = await c.env.DB.prepare(`SELECT key, value FROM site_settings WHERE key IN ('announcement', 'registration')`).all<{ key: string; value: string }>();
  const map = Object.fromEntries(results.map((r) => [r.key, safeJson<Record<string, unknown>>(r.value, {})]));
  const emailOn = mailMode(c.env) !== "disabled";
  const regOpen = emailOn && (map.registration as { open?: boolean } | undefined)?.open !== false;
  const config: SiteConfig = {
    announcement: { enabled: false, message: "", tone: "info", ...(map.announcement as object) } as SiteConfig["announcement"],
    registrationOpen: regOpen,
    registrationMessage: regOpen
      ? null
      : emailOn
        ? "New sign-ups are paused right now. Every lesson is free to use without an account."
        : "Account sign-up opens once email delivery is set up. Every lesson is free to use without an account.",
    turnstileSiteKey: c.env.TURNSTILE_SITE_KEY ?? null,
  };
  return c.json(config, 200, { "Cache-Control": "no-store" });
});

publicRoutes.get("/stats", async (c) => c.json(await getStats(c.env.DB)));
publicRoutes.get("/subjects", async (c) => c.json(await listSubjects(c.env.DB)));

publicRoutes.get("/courses", async (c) => {
  const subject = optionalSlug(c.req.query("subject"), "subject");
  const level = optionalLevel(c.req.query("level"));
  return c.json(await listCourses(c.env.DB, { subject, level }));
});

publicRoutes.get("/courses/:course", async (c) => {
  const course = await getCourse(c.env.DB, slugParam(c.req.param("course"), "course"));
  if (!course) throw new ApiHttpError(404, "not_found", "Course not found.");
  return c.json(course);
});

publicRoutes.get("/courses/:course/units/:unit", async (c) => {
  const unit = await getUnit(c.env.DB, slugParam(c.req.param("course"), "course"), slugParam(c.req.param("unit"), "unit"));
  if (!unit) throw new ApiHttpError(404, "not_found", "Unit not found.");
  return c.json(unit);
});

publicRoutes.get("/courses/:course/units/:unit/lessons/:lesson", async (c) => {
  const lesson = await getLesson(
    c.env.DB,
    slugParam(c.req.param("course"), "course"),
    slugParam(c.req.param("unit"), "unit"),
    slugParam(c.req.param("lesson"), "lesson"),
  );
  if (!lesson) throw new ApiHttpError(404, "not_found", "Lesson not found.");
  return c.json(lesson);
});

publicRoutes.get("/formulas", async (c) => c.json(await listFormulas(c.env.DB, optionalSlug(c.req.query("subject"), "subject"))));

publicRoutes.get("/search", async (c) => {
  const q = (c.req.query("q") ?? "").trim();
  if (q.length < 2) throw new ApiHttpError(400, "query_too_short", "Enter at least 2 characters.");
  if (q.length > 100) throw new ApiHttpError(400, "query_too_long", "Search terms are limited to 100 characters.");
  const typeParam = c.req.query("type") || undefined;
  if (typeParam && !(SEARCH_TYPES as readonly string[]).includes(typeParam)) throw new ApiHttpError(400, "invalid_parameter", "Invalid type.");
  const results = await search(c.env.DB, q, {
    subject: optionalSlug(c.req.query("subject"), "subject"),
    level: optionalLevel(c.req.query("level")),
    type: typeParam as SearchResultType | undefined,
  });
  return c.json({ query: q, results });
});

// ---------------------------------------------------------------------------
// Practice: works for everyone; attempts are recorded for verified accounts.
// ---------------------------------------------------------------------------

publicRoutes.post("/practice/:id/check", async (c) => {
  const id = c.req.param("id");
  if (!/^[a-z]+_[A-Za-z0-9_-]{1,64}$/.test(id)) throw new ApiHttpError(400, "invalid_parameter", "Invalid question.");
  const data = await body(c, z.object({ answer: z.string().max(200), hintsUsed: z.number().int().min(0).max(10).default(0) }));
  const user = c.get("user");
  await rateLimit(c.env.DB, `practice:${user ? user.id : await sha256Hex(clientIp(c.req.raw))}`, 240, 600);

  const q = await c.env.DB.prepare(
    `SELECT q.id, q.kind, q.data, q.solution FROM practice_questions q
     WHERE q.id = ? AND q.status = 'published'
       AND EXISTS (SELECT 1 FROM lessons l WHERE l.id = q.lesson_id AND l.status = 'published')`,
  )
    .bind(id)
    .first<{ id: string; kind: "multiple_choice" | "numeric" | "short_text"; data: string; solution: string }>();
  if (!q) throw new ApiHttpError(404, "not_found", "Question not found.");

  const result = checkAnswer(q.kind, safeJson<AnswerKey>(q.data, { accept: [] }), data.answer);
  if (!result.valid) throw new ApiHttpError(400, "invalid_answer", result.feedback);

  let recorded = false;
  if (user?.emailVerified) {
    await c.env.DB.prepare(`INSERT INTO practice_attempts (id, user_id, question_id, correct, answer, hints_used) VALUES (?, ?, ?, ?, ?, ?)`)
      .bind(newId("att"), user.id, q.id, result.correct ? 1 : 0, data.answer.slice(0, 200), data.hintsUsed)
      .run();
    recorded = true;
  }
  return c.json(
    { correct: result.correct, feedback: result.feedback, solution: q.solution, answerDisplay: result.answerDisplay, recorded },
    200,
    { "Cache-Control": "no-store" },
  );
});

// ---------------------------------------------------------------------------
// Lesson discussions: approved posts are public; your own pending posts are shown to you.
// ---------------------------------------------------------------------------

publicRoutes.get("/lessons/:lessonId/discussion", async (c) => {
  const lessonId = c.req.param("lessonId");
  const user = c.get("user");
  const { results } = await c.env.DB.prepare(
    `SELECT p.id, p.parent_id, p.kind, p.body, p.status, p.is_staff, p.context_label, p.created_at,
            u.display_name AS author, (p.user_id = ?2) AS mine
     FROM discussion_posts p JOIN users u ON u.id = p.user_id
     WHERE p.lesson_id = ?1 AND (p.status = 'approved' OR (p.user_id = ?2 AND p.status = 'pending'))
     ORDER BY p.created_at`,
  )
    .bind(lessonId, user?.id ?? "")
    .all<{
      id: string; parent_id: string | null; kind: string; body: string; status: string; is_staff: number;
      context_label: string; created_at: string; author: string; mine: number;
    }>();
  const posts = results.map((r) => ({
    id: r.id,
    parentId: r.parent_id,
    kind: r.kind,
    body: r.body,
    pending: r.status === "pending",
    isStaff: !!r.is_staff,
    contextLabel: r.context_label,
    createdAt: r.created_at,
    author: r.author,
    mine: !!r.mine,
  }));
  return c.json({ posts }, 200, { "Cache-Control": "no-store" });
});
