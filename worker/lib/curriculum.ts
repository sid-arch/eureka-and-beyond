// Read-only curriculum queries for the public API.
//
// Visibility rules (enforced here, server-side, for every public query):
//   * Units and chapters (the course outline) are public when 'published' and
//     their course isn't archived, so planned courses still show their outline.
//   * A lesson is public only when the lesson, its chapter and its unit are all
//     'published' and its course is 'in_development' or 'published'.

import type {
  ChapterWithLessons,
  CourseDetail,
  CourseLevel,
  CourseSummary,
  Formula,
  LessonBlock,
  LessonDetail,
  PlatformStats,
  PracticeQuestionPublic,
  SearchResult,
  SearchResultType,
  Subject,
  UnitDetail,
  UnitSummary,
} from "../../shared/types";

const VISIBLE_COURSE = `c.status IN ('in_development', 'published')`;
const LISTED_COURSE = `c.status IN ('planned', 'in_development', 'published')`;
export const VISIBLE_PLACEMENT = `u.status = 'published' AND ch.status = 'published' AND l.status = 'published' AND ${VISIBLE_COURSE}`;

export const PLACEMENT_JOINS = `
  FROM chapter_lessons cl
  JOIN lessons  l  ON l.id  = cl.lesson_id
  JOIN chapters ch ON ch.id = cl.chapter_id
  JOIN units    u  ON u.id  = ch.unit_id
  JOIN courses  c  ON c.id  = u.course_id`;

export const COURSE_LEVELS: readonly CourseLevel[] = ["foundational", "on_level", "honors", "ap"];

interface CourseRow {
  id: string;
  slug: string;
  title: string;
  level: CourseLevel;
  summary: string;
  overview: string;
  status: CourseSummary["status"];
  alignment_status: CourseSummary["alignmentStatus"];
  subject_slug: string;
  subject_name: string;
  framework_name: string | null;
  framework_url: string | null;
  published_units: number;
  published_lessons: number;
  planned_lessons: number;
}

const COURSE_SELECT = `
  SELECT c.id, c.slug, c.title, c.level, c.summary, c.overview, c.status, c.alignment_status,
         s.slug AS subject_slug, s.name AS subject_name,
         f.name AS framework_name, f.source_url AS framework_url,
         (SELECT COUNT(*) FROM units u WHERE u.course_id = c.id AND u.status = 'published') AS published_units,
         (SELECT COUNT(DISTINCT l.id)
            FROM units u
            JOIN chapters ch ON ch.unit_id = u.id
            JOIN chapter_lessons cl ON cl.chapter_id = ch.id
            JOIN lessons l ON l.id = cl.lesson_id
            WHERE u.course_id = c.id AND u.status = 'published' AND ch.status = 'published'
              AND l.status = 'published' AND ${VISIBLE_COURSE}) AS published_lessons,
         (SELECT COUNT(*)
            FROM units u
            JOIN chapters ch ON ch.unit_id = u.id
            JOIN lesson_plans lp ON lp.chapter_id = ch.id
            WHERE u.course_id = c.id AND u.status = 'published' AND ch.status = 'published') AS planned_lessons
  FROM courses c
  JOIN subjects s ON s.id = c.subject_id
  LEFT JOIN standards_frameworks f ON f.id = c.framework_id`;

function toCourseSummary(r: CourseRow): CourseSummary {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    level: r.level,
    summary: r.summary,
    status: r.status,
    alignmentStatus: r.alignment_status,
    subject: { slug: r.subject_slug, name: r.subject_name },
    publishedUnitCount: r.published_units,
    publishedLessonCount: r.published_lessons,
    plannedLessonCount: Math.max(r.planned_lessons, r.published_lessons),
  };
}

export function safeJson<T>(text: string | null | undefined, fallback: T): T {
  if (!text) return fallback;
  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

export async function getStats(db: D1Database): Promise<PlatformStats> {
  const row = await db
    .prepare(
      `SELECT
         (SELECT COUNT(*) FROM subjects WHERE status = 'published') AS subjects,
         (SELECT COUNT(*) FROM courses c WHERE ${LISTED_COURSE}) AS courses,
         (SELECT COUNT(DISTINCT c.id) ${PLACEMENT_JOINS} WHERE ${VISIBLE_PLACEMENT}) AS courses_with_content,
         (SELECT COUNT(DISTINCT l.id) ${PLACEMENT_JOINS} WHERE ${VISIBLE_PLACEMENT}) AS lessons,
         (SELECT COUNT(*) FROM formulas WHERE status = 'published') AS formulas`,
    )
    .first<{ subjects: number; courses: number; courses_with_content: number; lessons: number; formulas: number }>();
  return {
    subjects: row?.subjects ?? 0,
    courses: row?.courses ?? 0,
    coursesWithContent: row?.courses_with_content ?? 0,
    publishedLessons: row?.lessons ?? 0,
    publishedFormulas: row?.formulas ?? 0,
  };
}

export async function listSubjects(db: D1Database): Promise<Subject[]> {
  const { results } = await db
    .prepare(
      `SELECT s.id, s.slug, s.name, s.description,
              (SELECT COUNT(*) FROM courses c WHERE c.subject_id = s.id AND ${LISTED_COURSE}) AS course_count,
              (SELECT COUNT(*) FROM courses c WHERE c.subject_id = s.id AND ${VISIBLE_COURSE}) AS with_content
       FROM subjects s WHERE s.status = 'published' ORDER BY s.position`,
    )
    .all<{ id: string; slug: string; name: string; description: string; course_count: number; with_content: number }>();
  return results.map((r) => ({
    id: r.id,
    slug: r.slug,
    name: r.name,
    description: r.description,
    courseCount: r.course_count,
    coursesWithContent: r.with_content,
  }));
}

export async function listCourses(
  db: D1Database,
  filters: { subject?: string; level?: CourseLevel } = {},
): Promise<CourseSummary[]> {
  const where = [LISTED_COURSE, `s.status = 'published'`];
  const binds: string[] = [];
  if (filters.subject) {
    where.push("s.slug = ?");
    binds.push(filters.subject);
  }
  if (filters.level) {
    where.push("c.level = ?");
    binds.push(filters.level);
  }
  const { results } = await db
    .prepare(`${COURSE_SELECT} WHERE ${where.join(" AND ")} ORDER BY s.position, c.position`)
    .bind(...binds)
    .all<CourseRow>();
  return results.map(toCourseSummary);
}

interface OutlineRow {
  unit_slug: string;
  unit_title: string;
  unit_summary: string;
  chapter_slug: string | null;
  chapter_title: string | null;
  chapter_summary: string | null;
  item_title: string | null;
  lesson_slug: string | null;
  lesson_summary: string | null;
  minutes: number | null;
}

/**
 * Outline rows for one course (optionally one unit): every published unit and
 * chapter, each planned lesson, plus published lessons placed without a plan entry.
 * `lesson_slug` is set only for lessons that are publicly readable.
 */
async function outlineRows(db: D1Database, courseId: string, unitSlug?: string): Promise<OutlineRow[]> {
  const lessonVisible = `l.status = 'published' AND EXISTS (SELECT 1 FROM courses c WHERE c.id = u.course_id AND ${VISIBLE_COURSE})`;
  const unitFilter = unitSlug ? "AND u.slug = ?2" : "";
  const { results } = await db
    .prepare(
      `SELECT * FROM (
         SELECT u.slug AS unit_slug, u.title AS unit_title, u.summary AS unit_summary, u.position AS up,
                ch.slug AS chapter_slug, ch.title AS chapter_title, ch.summary AS chapter_summary, ch.position AS cp,
                lp.title AS item_title, lp.position AS ip,
                CASE WHEN ${lessonVisible} THEN l.slug END AS lesson_slug,
                CASE WHEN ${lessonVisible} THEN l.summary END AS lesson_summary,
                CASE WHEN ${lessonVisible} THEN l.estimated_minutes END AS minutes
         FROM units u
         LEFT JOIN chapters ch ON ch.unit_id = u.id AND ch.status = 'published'
         LEFT JOIN lesson_plans lp ON lp.chapter_id = ch.id
         LEFT JOIN lessons l ON l.id = lp.lesson_id
         WHERE u.course_id = ?1 AND u.status = 'published' ${unitFilter}
         UNION ALL
         SELECT u.slug, u.title, u.summary, u.position,
                ch.slug, ch.title, ch.summary, ch.position,
                l.title, 1000 + cl.position,
                l.slug, l.summary, l.estimated_minutes
         FROM chapter_lessons cl
         JOIN lessons l ON l.id = cl.lesson_id
         JOIN chapters ch ON ch.id = cl.chapter_id AND ch.status = 'published'
         JOIN units u ON u.id = ch.unit_id
         WHERE u.course_id = ?1 AND u.status = 'published' ${unitFilter} AND ${lessonVisible}
           AND NOT EXISTS (SELECT 1 FROM lesson_plans p WHERE p.chapter_id = ch.id AND p.lesson_id = l.id)
       ) ORDER BY up, cp, ip`,
    )
    .bind(...(unitSlug ? [courseId, unitSlug] : [courseId]))
    .all<OutlineRow>();
  return results;
}

export async function getCourse(db: D1Database, slug: string): Promise<CourseDetail | null> {
  const row = await db
    .prepare(`${COURSE_SELECT} WHERE c.slug = ? AND ${LISTED_COURSE} AND s.status = 'published'`)
    .bind(slug)
    .first<CourseRow>();
  if (!row) return null;

  const [prereqs, objectives] = await db.batch([
    db
      .prepare(
        `SELECT p.slug, p.title, cp.kind FROM course_prerequisites cp
         JOIN courses p ON p.id = cp.prerequisite_course_id
         WHERE cp.course_id = ? AND p.status <> 'archived' ORDER BY p.position`,
      )
      .bind(row.id),
    db.prepare(`SELECT text FROM course_objectives WHERE course_id = ? ORDER BY position`).bind(row.id),
  ]);

  const units: UnitSummary[] = [];
  for (const r of await outlineRows(db, row.id)) {
    let unit = units.find((u) => u.slug === r.unit_slug);
    if (!unit) {
      unit = { slug: r.unit_slug, title: r.unit_title, summary: r.unit_summary, chapterCount: 0, lessonCount: 0, plannedLessonCount: 0, chapters: [] };
      units.push(unit);
    }
    if (!r.chapter_slug || !r.chapter_title) continue;
    let ch = unit.chapters.find((c) => c.slug === r.chapter_slug);
    if (!ch) {
      ch = { slug: r.chapter_slug, title: r.chapter_title, lessons: [] };
      unit.chapters.push(ch);
      unit.chapterCount++;
    }
    if (r.item_title) {
      ch.lessons.push({ title: r.item_title, slug: r.lesson_slug });
      unit.plannedLessonCount++;
      if (r.lesson_slug) unit.lessonCount++;
    }
  }

  return {
    ...toCourseSummary(row),
    overview: row.overview,
    framework: row.framework_name ? { name: row.framework_name, sourceUrl: row.framework_url } : null,
    prerequisites: (prereqs.results as { slug: string; title: string; kind: "required" | "recommended" }[]).map((p) => ({
      slug: p.slug,
      title: p.title,
      kind: p.kind,
    })),
    objectives: (objectives.results as { text: string }[]).map((o) => o.text),
    units,
  };
}

export async function getUnit(db: D1Database, courseSlug: string, unitSlug: string): Promise<UnitDetail | null> {
  const unit = await db
    .prepare(
      `SELECT u.id, u.slug, u.title, u.summary, u.course_id,
              c.slug AS course_slug, c.title AS course_title, s.slug AS subject_slug, s.name AS subject_name
       FROM units u JOIN courses c ON c.id = u.course_id JOIN subjects s ON s.id = c.subject_id
       WHERE c.slug = ? AND u.slug = ? AND u.status = 'published' AND ${LISTED_COURSE}`,
    )
    .bind(courseSlug, unitSlug)
    .first<{
      id: string; slug: string; title: string; summary: string; course_id: string;
      course_slug: string; course_title: string; subject_slug: string; subject_name: string;
    }>();
  if (!unit) return null;

  const chapters: ChapterWithLessons[] = [];
  for (const r of await outlineRows(db, unit.course_id, unitSlug)) {
    if (!r.chapter_slug || !r.chapter_title) continue;
    let ch = chapters.find((c) => c.slug === r.chapter_slug);
    if (!ch) {
      ch = { slug: r.chapter_slug, title: r.chapter_title, summary: r.chapter_summary ?? "", items: [] };
      chapters.push(ch);
    }
    if (r.item_title) {
      ch.items.push({
        title: r.item_title,
        lesson: r.lesson_slug
          ? { slug: r.lesson_slug, title: r.item_title, summary: r.lesson_summary ?? "", estimatedMinutes: r.minutes }
          : null,
      });
    }
  }

  const { results: sib } = await db
    .prepare(`SELECT slug, title FROM units WHERE course_id = ? AND status = 'published' ORDER BY position`)
    .bind(unit.course_id)
    .all<{ slug: string; title: string }>();
  const idx = sib.findIndex((s) => s.slug === unit.slug);

  return {
    course: { slug: unit.course_slug, title: unit.course_title, subject: { slug: unit.subject_slug, name: unit.subject_name } },
    slug: unit.slug,
    title: unit.title,
    summary: unit.summary,
    position: idx + 1,
    chapters,
    previous: idx > 0 ? { slug: sib[idx - 1].slug, title: sib[idx - 1].title } : null,
    next: idx >= 0 && idx < sib.length - 1 ? { slug: sib[idx + 1].slug, title: sib[idx + 1].title } : null,
  };
}

interface FormulaRow {
  id: string; slug: string; name: string; latex: string; description: string; variables: string;
  subject_slug: string; subject_name: string;
}

function toFormula(r: FormulaRow): Formula {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    latex: r.latex,
    description: r.description,
    variables: safeJson(r.variables, []),
    subject: { slug: r.subject_slug, name: r.subject_name },
  };
}

interface QuestionRow {
  id: string; purpose: "practice" | "review"; kind: PracticeQuestionPublic["kind"]; difficulty: 1 | 2 | 3;
  prompt: string; data: string; hints: string;
}

/** Strips the answer key: only choices and the expected unit leave the server. */
export function toPublicQuestion(q: QuestionRow): PracticeQuestionPublic {
  const data = safeJson<{ choices?: string[]; unit?: string }>(q.data, {});
  return {
    id: q.id,
    purpose: q.purpose,
    kind: q.kind,
    difficulty: q.difficulty,
    prompt: q.prompt,
    ...(q.kind === "multiple_choice" ? { choices: data.choices ?? [] } : {}),
    ...(q.kind === "numeric" && data.unit ? { unit: data.unit } : {}),
    hints: safeJson<string[]>(q.hints, []),
  };
}

export async function getLesson(
  db: D1Database,
  courseSlug: string,
  unitSlug: string,
  lessonSlug: string,
): Promise<LessonDetail | null> {
  // Ordered list of every public lesson in the course; gives context + prev/next.
  const { results: ordered } = await db
    .prepare(
      `SELECT l.id, l.slug, l.title, l.summary, l.estimated_minutes, l.published_at,
              u.slug AS unit_slug, u.title AS unit_title, ch.slug AS chapter_slug, ch.title AS chapter_title,
              c.id AS course_id, c.slug AS course_slug, c.title AS course_title, s.slug AS subject_slug, s.name AS subject_name
       ${PLACEMENT_JOINS}
       JOIN subjects s ON s.id = c.subject_id
       WHERE c.slug = ? AND ${VISIBLE_PLACEMENT}
       ORDER BY u.position, ch.position, cl.position`,
    )
    .bind(courseSlug)
    .all<{
      id: string; slug: string; title: string; summary: string; estimated_minutes: number | null; published_at: string | null;
      unit_slug: string; unit_title: string; chapter_slug: string; chapter_title: string;
      course_id: string; course_slug: string; course_title: string; subject_slug: string; subject_name: string;
    }>();

  const idx = ordered.findIndex((r) => r.slug === lessonSlug && r.unit_slug === unitSlug);
  if (idx === -1) return null;
  const l = ordered[idx];
  return buildLesson(db, l.id, {
    course: { slug: l.course_slug, title: l.course_title, subject: { slug: l.subject_slug, name: l.subject_name } },
    unit: { slug: l.unit_slug, title: l.unit_title },
    chapter: { slug: l.chapter_slug, title: l.chapter_title },
  }, {
    previous: idx > 0 ? { slug: ordered[idx - 1].slug, title: ordered[idx - 1].title, unitSlug: ordered[idx - 1].unit_slug } : null,
    next: idx < ordered.length - 1 ? { slug: ordered[idx + 1].slug, title: ordered[idx + 1].title, unitSlug: ordered[idx + 1].unit_slug } : null,
  }, { includeDrafts: false });
}

/** Assembles a lesson's content. Also used by the admin preview (includeDrafts). */
export async function buildLesson(
  db: D1Database,
  lessonId: string,
  context: LessonDetail["context"],
  nav: Pick<LessonDetail, "previous" | "next">,
  opts: { includeDrafts: boolean },
): Promise<LessonDetail | null> {
  const lesson = await db
    .prepare(`SELECT id, slug, title, summary, estimated_minutes, published_at FROM lessons WHERE id = ?`)
    .bind(lessonId)
    .first<{ id: string; slug: string; title: string; summary: string; estimated_minutes: number | null; published_at: string | null }>();
  if (!lesson) return null;
  const qStatus = opts.includeDrafts ? `status <> 'archived'` : `status = 'published'`;
  const [objectives, blocks, concepts, formulas, refs, questions] = await db.batch([
    db.prepare(`SELECT text FROM lesson_objectives WHERE lesson_id = ? ORDER BY position`).bind(lessonId),
    db
      .prepare(
        `SELECT id, mode, kind, data FROM lesson_blocks WHERE lesson_id = ?
         ORDER BY CASE mode WHEN 'learn' THEN 1 WHEN 'watch' THEN 2 WHEN 'experiment' THEN 3 ELSE 4 END, position`,
      )
      .bind(lessonId),
    db
      .prepare(`SELECT k.slug, k.name FROM lesson_concepts lc JOIN concepts k ON k.id = lc.concept_id WHERE lc.lesson_id = ? ORDER BY k.name`)
      .bind(lessonId),
    db
      .prepare(
        `SELECT f.id, f.slug, f.name, f.latex, f.description, f.variables, s.slug AS subject_slug, s.name AS subject_name
         FROM lesson_formulas lf JOIN formulas f ON f.id = lf.formula_id JOIN subjects s ON s.id = f.subject_id
         WHERE lf.lesson_id = ? AND f.status = 'published' ORDER BY lf.position`,
      )
      .bind(lessonId),
    db.prepare(`SELECT citation, url FROM lesson_references WHERE lesson_id = ? ORDER BY position`).bind(lessonId),
    db
      .prepare(
        `SELECT id, purpose, kind, difficulty, prompt, data, hints FROM practice_questions
         WHERE lesson_id = ? AND ${qStatus} ORDER BY purpose, position`,
      )
      .bind(lessonId),
  ]);

  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    summary: lesson.summary,
    estimatedMinutes: lesson.estimated_minutes,
    publishedAt: lesson.published_at,
    context,
    objectives: (objectives.results as { text: string }[]).map((o) => o.text),
    blocks: (blocks.results as { id: string; mode: string; kind: string; data: string }[]).map(
      (b) => ({ id: b.id, mode: b.mode, kind: b.kind, data: safeJson(b.data, {}) }) as LessonBlock,
    ),
    practice: (questions.results as unknown as QuestionRow[]).map(toPublicQuestion),
    concepts: concepts.results as { slug: string; name: string }[],
    formulas: (formulas.results as unknown as FormulaRow[]).map(toFormula),
    references: refs.results as { citation: string; url: string | null }[],
    ...nav,
  };
}

export async function listFormulas(db: D1Database, subject?: string): Promise<Formula[]> {
  const where = [`f.status = 'published'`, `s.status = 'published'`];
  const binds: string[] = [];
  if (subject) {
    where.push("s.slug = ?");
    binds.push(subject);
  }
  const { results } = await db
    .prepare(
      `SELECT f.id, f.slug, f.name, f.latex, f.description, f.variables, s.slug AS subject_slug, s.name AS subject_name
       FROM formulas f JOIN subjects s ON s.id = f.subject_id
       WHERE ${where.join(" AND ")} ORDER BY s.position, f.name`,
    )
    .bind(...binds)
    .all<FormulaRow>();
  return results.map(toFormula);
}

/** Escape LIKE wildcards so user input is matched literally. */
export function likePattern(q: string): string {
  return `%${q.replace(/[\\%_]/g, (m) => `\\${m}`)}%`;
}

export async function search(
  db: D1Database,
  q: string,
  filters: { subject?: string; level?: CourseLevel; type?: SearchResultType } = {},
): Promise<SearchResult[]> {
  const pattern = likePattern(q);
  const want = (t: SearchResultType) => !filters.type || filters.type === t;

  /** Builds optional subject/level clauses and their bind values, in order. */
  const scope = (withLevel: boolean) => {
    let sql = "";
    const binds: string[] = [];
    if (filters.subject) {
      sql += " AND s.slug = ?";
      binds.push(filters.subject);
    }
    if (withLevel && filters.level) {
      sql += " AND c.level = ?";
      binds.push(filters.level);
    }
    return { sql, binds };
  };
  const match = (a: string, b: string) => `(${a} LIKE ? ESCAPE '\\' OR ${b} LIKE ? ESCAPE '\\')`;

  const statements: { type: SearchResultType; stmt: D1PreparedStatement }[] = [];

  if (want("course")) {
    const sc = scope(true);
    statements.push({
      type: "course",
      stmt: db
        .prepare(
          `SELECT c.title, c.summary, c.slug, c.level, s.slug AS subject_slug, s.name AS subject_name
           FROM courses c JOIN subjects s ON s.id = c.subject_id
           WHERE ${LISTED_COURSE} AND ${match("c.title", "c.summary")}${sc.sql}
           ORDER BY s.position, c.position LIMIT 20`,
        )
        .bind(pattern, pattern, ...sc.binds),
    });
  }
  if (want("lesson")) {
    const sc = scope(true);
    statements.push({
      type: "lesson",
      stmt: db
        .prepare(
          `SELECT * FROM (
             SELECT l.title, l.summary, l.slug, u.slug AS unit_slug, c.slug AS course_slug, c.level,
                    s.slug AS subject_slug, s.name AS subject_name,
                    ROW_NUMBER() OVER (PARTITION BY l.id ORDER BY s.position, c.position) AS rn
             ${PLACEMENT_JOINS} JOIN subjects s ON s.id = c.subject_id
             WHERE ${VISIBLE_PLACEMENT} AND ${match("l.title", "l.summary")}${sc.sql}
           ) WHERE rn = 1 LIMIT 20`,
        )
        .bind(pattern, pattern, ...sc.binds),
    });
  }
  // Formulas and concepts are not tied to one course level, so a level filter excludes them.
  if (want("formula") && !filters.level) {
    const sc = scope(false);
    statements.push({
      type: "formula",
      stmt: db
        .prepare(
          `SELECT f.name AS title, f.description AS summary, f.slug, s.slug AS subject_slug, s.name AS subject_name
           FROM formulas f JOIN subjects s ON s.id = f.subject_id
           WHERE f.status = 'published' AND ${match("f.name", "f.description")}${sc.sql}
           ORDER BY f.name LIMIT 20`,
        )
        .bind(pattern, pattern, ...sc.binds),
    });
  }
  if (want("concept") && !filters.level) {
    // A concept appears only if a public lesson teaches it; the result links to that lesson.
    const sc = scope(false);
    statements.push({
      type: "concept",
      stmt: db
        .prepare(
          `SELECT * FROM (
             SELECT k.name AS title, k.description AS summary, k.slug, s.slug AS subject_slug, s.name AS subject_name,
                    (SELECT '/courses/' || c.slug || '/units/' || u.slug || '/lessons/' || l.slug
                     ${PLACEMENT_JOINS} JOIN lesson_concepts lc ON lc.lesson_id = l.id
                     WHERE lc.concept_id = k.id AND ${VISIBLE_PLACEMENT}
                     ORDER BY c.position, u.position, ch.position, cl.position LIMIT 1) AS href
             FROM concepts k JOIN subjects s ON s.id = k.subject_id
             WHERE ${match("k.name", "k.description")}${sc.sql}
           ) WHERE href IS NOT NULL ORDER BY title LIMIT 20`,
        )
        .bind(pattern, pattern, ...sc.binds),
    });
  }

  if (statements.length === 0) return [];
  const batches = await db.batch(statements.map((s) => s.stmt));
  const out: SearchResult[] = [];
  batches.forEach((res, i) => {
    const type = statements[i].type;
    for (const r of res.results as Record<string, string>[]) {
      const subject = { slug: r.subject_slug, name: r.subject_name };
      switch (type) {
        case "course":
          out.push({ type, title: r.title, summary: r.summary, href: `/courses/${r.slug}`, subject, level: r.level as CourseLevel });
          break;
        case "lesson":
          out.push({
            type,
            title: r.title,
            summary: r.summary,
            href: `/courses/${r.course_slug}/units/${r.unit_slug}/lessons/${r.slug}`,
            subject,
            level: r.level as CourseLevel,
          });
          break;
        case "formula":
          out.push({ type, title: r.title, summary: r.summary, href: `/formulas#${r.slug}`, subject });
          break;
        case "concept":
          out.push({ type, title: r.title, summary: r.summary, href: r.href, subject });
          break;
      }
    }
  });
  return out;
}
