// Builds SQL migrations from content/outlines/*.txt and content/lessons/*.ts.
//
//   node scripts/build-content.ts            # writes the migrations
//   node scripts/build-content.ts --check    # validates only
//
// Output is idempotent SQL (INSERT OR IGNORE with deterministic ids), so the
// migrations never overwrite rows that already exist, including edits made in
// the admin console.

import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { LessonSource } from "../content/lib.ts";
import { FORMULAS } from "../content/formulas.ts";

const ROOT = join(import.meta.dirname, "..");
// Generated migrations that are already applied somewhere. They are frozen:
// this script never rewrites them. Each run writes only the statements they
// don't already contain into TARGET. When a batch ships, move TARGET into
// FROZEN and name the next batch.
const FROZEN = ["0005_curriculum_outlines.sql", "0006_lessons_batch_1.sql", "0007_lessons_batch_2.sql", "0008_lessons_batch_3.sql", "0009_lessons_batch_4.sql", "0010_lessons_batch_5.sql", "0011_lessons_batch_6.sql", "0012_lessons_batch_7.sql", "0013_lessons_batch_8.sql", "0014_lessons_batch_9.sql", "0015_lessons_batch_10.sql", "0016_lessons_batch_11.sql", "0017_lessons_batch_12.sql", "0018_lessons_batch_13.sql", "0019_lessons_batch_14.sql", "0020_lessons_batch_15.sql", "0021_lessons_batch_16.sql", "0022_lessons_batch_17.sql", "0023_lessons_batch_18.sql", "0024_lessons_batch_19.sql", "0025_lessons_batch_20.sql", "0026_lessons_batch_21.sql", "0027_lessons_batch_22.sql", "0028_lessons_batch_23.sql", "0029_lessons_batch_24.sql", "0030_lessons_batch_25.sql", "0031_lessons_batch_26.sql", "0032_lessons_batch_27.sql"];
const TARGET = "0033_lessons_batch_28.sql";
const ACTIVITY_IDS = (await import("../shared/activities.ts")).ACTIVITY_IDS as string[];

// Formulas that were seeded by migration 0003.
const EXISTING_FORMULAS = ["slope", "quadratic-formula", "pythagorean-theorem", "velocity-constant-acceleration", "newtons-second-law", "ideal-gas-law"];

const h = (s: string) => createHash("sha1").update(s).digest("hex").slice(0, 14);
const q = (s: string | number | null | undefined) =>
  s === null || s === undefined ? "NULL" : typeof s === "number" ? String(s) : `'${String(s).replace(/'/g, "''")}'`;
const courseId = (slug: string) => `(SELECT id FROM courses WHERE slug = ${q(slug)})`;
const unitId = (c: string, u: string) => `(SELECT id FROM units WHERE course_id = ${courseId(c)} AND slug = ${q(u)})`;
const chapterId = (c: string, u: string, ch: string) => `(SELECT id FROM chapters WHERE unit_id = ${unitId(c, u)} AND slug = ${q(ch)})`;

// ---------------------------------------------------------------------------
// Outlines
// ---------------------------------------------------------------------------

interface Item { title: string; lesson?: string }
interface Chapter { slug: string; title: string; items: Item[] }
interface Unit { slug: string; title: string; summary: string; chapters: Chapter[] }

const courses = new Map<string, Unit[]>();
const errors: string[] = [];

for (const file of readdirSync(join(ROOT, "content/outlines")).filter((f) => f.endsWith(".txt")).sort()) {
  let units: Unit[] | null = null;
  let unit: Unit | null = null;
  let chapter: Chapter | null = null;
  readFileSync(join(ROOT, "content/outlines", file), "utf8").split("\n").forEach((raw, i) => {
    const line = raw.trimEnd();
    const where = `${file}:${i + 1}`;
    if (!line || line.startsWith("#") && !line.startsWith("##")) return;
    let m: RegExpMatchArray | null;
    if ((m = line.match(/^@course ([a-z0-9-]+)(?: extends ([a-z0-9-]+))?$/))) {
      if (courses.has(m[1])) errors.push(`${where}: course ${m[1]} defined twice`);
      const parent = m[2] ? courses.get(m[2]) : undefined;
      if (m[2] && !parent) errors.push(`${where}: ${m[1]} extends unknown course ${m[2]}`);
      units = parent ? structuredClone(parent) : [];
      courses.set(m[1], units);
      unit = chapter = null;
    } else if ((m = line.match(/^## ([a-z0-9-]+) \| ([^|]+) \| (.+)$/))) {
      if (!units) return void errors.push(`${where}: unit outside course`);
      unit = units.find((u) => u.slug === m![1]) ?? null;
      if (!unit) units.push((unit = { slug: m[1], title: m[2].trim(), summary: m[3].trim(), chapters: [] }));
      chapter = null;
    } else if ((m = line.match(/^### ([a-z0-9-]+) \| (.+)$/))) {
      if (!unit) return void errors.push(`${where}: chapter outside unit`);
      chapter = unit.chapters.find((c) => c.slug === m![1]) ?? null;
      if (!chapter) unit.chapters.push((chapter = { slug: m[1], title: m[2].trim(), items: [] }));
    } else if ((m = line.match(/^- (.+?)(?: => ([a-z0-9-]+))?$/))) {
      if (!chapter) return void errors.push(`${where}: lesson outside chapter`);
      chapter.items.push({ title: m[1].trim(), ...(m[2] ? { lesson: m[2] } : {}) });
    } else {
      errors.push(`${where}: unrecognized line: ${line}`);
    }
  });
}

// ---------------------------------------------------------------------------
// Lessons
// ---------------------------------------------------------------------------

const lessons = new Map<string, LessonSource>();
for (const file of readdirSync(join(ROOT, "content/lessons")).filter((f) => f.endsWith(".ts")).sort()) {
  const mod = (await import(join(ROOT, "content/lessons", file))) as { default: LessonSource };
  const l = mod.default;
  if (lessons.has(l.slug)) errors.push(`${file}: duplicate lesson slug ${l.slug}`);
  if (file !== `${l.slug}.ts`) errors.push(`${file}: file name must match slug ${l.slug}`);
  lessons.set(l.slug, l);
  for (const b of l.blocks) {
    if (b.kind === "activity" && !ACTIVITY_IDS.includes(String(b.data.activity))) errors.push(`${file}: unknown activity ${b.data.activity}`);
    if (b.kind === "figure") {
      const src = String(b.data.src ?? "");
      if (!/^\/figures\/[a-z0-9-]+\.svg$/.test(src)) errors.push(`${file}: figure src must look like /figures/name.svg (got ${src})`);
      else if (!existsSync(join(ROOT, "public", src))) errors.push(`${file}: figure file public${src} is missing`);
      if (String(b.data.alt ?? "").trim().length < 20) errors.push(`${file}: figure ${src} needs descriptive alt text`);
    }
  }
  l.questions.forEach((qq, i) => {
    const d = qq.data as Record<string, unknown>;
    if (qq.kind === "multiple_choice" && !(Array.isArray(d.choices) && Number.isInteger(d.answer) && (d.answer as number) < (d.choices as unknown[]).length)) {
      errors.push(`${file}: question ${i + 1} has an invalid answer index`);
    }
    if (!qq.solution) errors.push(`${file}: question ${i + 1} needs a solution`);
  });
  for (const f of l.formulas ?? []) if (!FORMULAS.some((x) => x.slug === f) && !EXISTING_FORMULAS.includes(f)) errors.push(`${file}: unknown formula ${f}`);
}


const linked = new Set<string>();
for (const [c, units] of courses) {
  for (const u of units) for (const ch of u.chapters) for (const it of ch.items) {
    if (it.lesson) {
      linked.add(it.lesson);
      if (!lessons.has(it.lesson)) errors.push(`outline ${c}/${u.slug}/${ch.slug}: lesson ${it.lesson} has no source file`);
    }
  }
}
for (const slug of lessons.keys()) if (!linked.has(slug)) errors.push(`lesson ${slug} is not placed in any outline`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

let planCount = 0;
let unitCount = 0;
for (const units of courses.values()) for (const u of units) {
  unitCount++;
  for (const ch of u.chapters) planCount += ch.items.length;
}
console.log(`Outlines: ${courses.size} courses, ${unitCount} units, ${planCount} planned lessons. Lesson sources: ${lessons.size}.`);
if (process.argv.includes("--check")) process.exit(0);

// ---------------------------------------------------------------------------
// Build every statement, then emit only those not shipped in a frozen migration
// ---------------------------------------------------------------------------

const shipped = new Set<string>();
for (const f of FROZEN) for (const line of readFileSync(join(ROOT, "migrations", f), "utf8").split("\n")) shipped.add(line);

const outline: string[] = [];
for (const [c, units] of courses) {
  units.forEach((u, ui) => {
    outline.push(
      `INSERT OR IGNORE INTO units (id, course_id, slug, title, summary, position, status) VALUES (${q(`unit_${h(`${c}/${u.slug}`)}`)}, ${courseId(c)}, ${q(u.slug)}, ${q(u.title)}, ${q(u.summary)}, ${ui + 1}, 'published');`,
      `UPDATE units SET position = ${ui + 1}, status = 'published' WHERE course_id = ${courseId(c)} AND slug = ${q(u.slug)};`,
    );
    u.chapters.forEach((ch, ci) => {
      outline.push(
        `INSERT OR IGNORE INTO chapters (id, unit_id, slug, title, position, status) VALUES (${q(`chap_${h(`${c}/${u.slug}/${ch.slug}`)}`)}, ${unitId(c, u.slug)}, ${q(ch.slug)}, ${q(ch.title)}, ${ci + 1}, 'published');`,
      );
      ch.items.forEach((it, ii) => {
        outline.push(
          `INSERT OR IGNORE INTO lesson_plans (id, chapter_id, position, title) VALUES (${q(`plan_${h(`${c}/${u.slug}/${ch.slug}/${it.title}`)}`)}, ${chapterId(c, u.slug, ch.slug)}, ${ii + 1}, ${q(it.title)});`,
        );
      });
    });
  });
}

const formulas = FORMULAS.map(
  (f) =>
    `INSERT OR IGNORE INTO formulas (id, subject_id, slug, name, latex, description, variables, status) VALUES (${q(`frm_${h(f.slug)}`)}, ${q(f.subject)}, ${q(f.slug)}, ${q(f.name)}, ${q(f.latex)}, ${q(f.description)}, ${q(JSON.stringify(f.variables))}, 'published');`,
);

const lessonIdOf = (l: LessonSource) => l.existingId ?? `les_${h(l.slug)}`;
const lessonStmts = new Map<string, string[]>();
for (const l of lessons.values()) {
  const id = lessonIdOf(l);
  const L: string[] = [];
  if (!l.existingId) {
    L.push(
      `INSERT OR IGNORE INTO lessons (id, slug, title, summary, estimated_minutes, status, published_at) VALUES (${q(id)}, ${q(l.slug)}, ${q(l.title)}, ${q(l.summary)}, ${l.minutes}, 'published', strftime('%Y-%m-%dT%H:%M:%SZ', 'now'));`,
    );
  }
  l.objectives.forEach((o, i) =>
    L.push(`INSERT OR IGNORE INTO lesson_objectives (id, lesson_id, position, text) VALUES (${q(`lobj_${h(`${l.slug}/${i}`)}`)}, ${q(id)}, ${i + 1}, ${q(o)});`),
  );
  const offset = l.existingId ? 100 : 0;
  l.blocks.forEach((b, i) =>
    L.push(
      `INSERT OR IGNORE INTO lesson_blocks (id, lesson_id, mode, position, kind, data) VALUES (${q(`blk_${h(`${l.slug}/${i}`)}`)}, ${q(id)}, ${q(b.mode)}, ${offset + i + 1}, ${q(b.kind)}, ${q(JSON.stringify(b.data))});`,
    ),
  );
  l.questions.forEach((qq, i) =>
    L.push(
      `INSERT OR IGNORE INTO practice_questions (id, lesson_id, position, purpose, kind, difficulty, prompt, data, hints, solution) VALUES (${q(`q_${h(`${l.slug}/${i}`)}`)}, ${q(id)}, ${i + 1}, ${q(qq.purpose ?? "practice")}, ${q(qq.kind)}, ${qq.difficulty}, ${q(qq.prompt)}, ${q(JSON.stringify(qq.data))}, ${q(JSON.stringify(qq.hints))}, ${q(qq.solution)});`,
    ),
  );
  for (const k of l.concepts ?? []) {
    L.push(
      `INSERT OR IGNORE INTO concepts (id, subject_id, slug, name, description) VALUES (${q(`cpt_${h(k.slug)}`)}, ${q(k.subject)}, ${q(k.slug)}, ${q(k.name)}, ${q(k.description)});`,
      `INSERT OR IGNORE INTO lesson_concepts (lesson_id, concept_id) VALUES (${q(id)}, (SELECT id FROM concepts WHERE slug = ${q(k.slug)}));`,
    );
  }
  (l.formulas ?? []).forEach((f, i) =>
    L.push(`INSERT OR IGNORE INTO lesson_formulas (lesson_id, formula_id, position) VALUES (${q(id)}, (SELECT id FROM formulas WHERE slug = ${q(f)}), ${i + 1});`),
  );
  (l.references ?? []).forEach((r, i) =>
    L.push(`INSERT OR IGNORE INTO lesson_references (id, lesson_id, position, citation, url) VALUES (${q(`ref_${h(`${l.slug}/${i}`)}`)}, ${q(id)}, ${i + 1}, ${q(r.citation)}, ${q(r.url ?? null)});`),
  );
  lessonStmts.set(l.slug, L);
}

const placements: string[] = [];
for (const [c, units] of courses) for (const u of units) for (const ch of u.chapters) ch.items.forEach((it, ii) => {
  if (!it.lesson) return;
  const lid = lessonIdOf(lessons.get(it.lesson)!);
  placements.push(
    `INSERT OR IGNORE INTO chapter_lessons (chapter_id, lesson_id, position) VALUES (${chapterId(c, u.slug, ch.slug)}, ${q(lid)}, ${ii + 1});`,
    `UPDATE lesson_plans SET lesson_id = ${q(lid)} WHERE id = ${q(`plan_${h(`${c}/${u.slug}/${ch.slug}/${it.title}`)}`)} AND lesson_id IS NULL;`,
  );
});

// A row that already shipped with different content can't be changed by
// INSERT OR IGNORE. Emit a guarded UPDATE instead: it only applies if the row
// still holds exactly the shipped value, so edits made in the admin console win.
const shippedById = new Map<string, string>();
const rowRe = /^INSERT OR IGNORE INTO (lessons|lesson_blocks|practice_questions|lesson_objectives) \(([^)]*)\) VALUES \((.*)\);$/;
const splitValues = (v: string) => {
  const out: string[] = [];
  let cur = "", inStr = false;
  for (let i = 0; i < v.length; i++) {
    const c = v[i];
    if (inStr) {
      cur += c;
      if (c === "'") { if (v[i + 1] === "'") { cur += "'"; i++; } else inStr = false; }
    } else if (c === "'") { inStr = true; cur += c; }
    else if (c === ",") { out.push(cur.trim()); cur = ""; }
    else cur += c;
  }
  out.push(cur.trim());
  return out;
};
// Track each shipped row's latest value: its INSERT, then any guarded
// corrections shipped in later frozen batches (in file order).
const updRe = /^UPDATE (lessons|lesson_blocks|practice_questions|lesson_objectives) SET (.*) WHERE id = ('(?:[^']|'')*') AND (.*);$/;
// Split "a = 'x' AND b = 'y'" on top-level " AND " (outside quoted strings).
const splitAnd = (v: string) => {
  const out: string[] = [];
  let cur = "", inStr = false;
  for (let i = 0; i < v.length; i++) {
    const c = v[i];
    if (inStr) {
      cur += c;
      if (c === "'") { if (v[i + 1] === "'") { cur += "'"; i++; } else inStr = false; }
    } else if (c === "'") { inStr = true; cur += c; }
    else if (v.startsWith(" AND ", i)) { out.push(cur); cur = ""; i += 4; }
    else cur += c;
  }
  out.push(cur);
  return out;
};
for (const line of shipped) {
  const m = rowRe.exec(line);
  if (m) { shippedById.set(`${m[1]}:${splitValues(m[3])[0]}`, line); continue; }
  const u = updRe.exec(line);
  if (!u) continue;
  const key = `${u[1]}:${u[3]}`;
  const prev = shippedById.get(key);
  if (!prev) continue;
  const pm = rowRe.exec(prev)!;
  const cols = pm[2].split(", ");
  const vals = splitValues(pm[3]);
  // Like D1: the correction only applied if every guard matched the value at that time.
  const guardsMatch = splitAnd(u[4]).every((g) => {
    const eq = g.indexOf(" = ");
    const ci = cols.indexOf(g.slice(0, eq));
    return ci >= 0 && vals[ci] === g.slice(eq + 3);
  });
  if (!guardsMatch) continue;
  for (const assign of splitValues(u[2])) {
    const eq = assign.indexOf(" = ");
    const ci = cols.indexOf(assign.slice(0, eq));
    if (ci >= 0) vals[ci] = assign.slice(eq + 3);
  }
  shippedById.set(key, `INSERT OR IGNORE INTO ${pm[1]} (${pm[2]}) VALUES (${vals.join(", ")});`);
}
const corrections: string[] = [];
const fresh = (xs: string[]) => xs.filter((x) => {
  if (shipped.has(x)) return false;
  const m = rowRe.exec(x);
  if (!m) return true;
  const prev = shippedById.get(`${m[1]}:${splitValues(m[3])[0]}`);
  if (!prev) return true;
  const cols = m[2].split(", ");
  const nv = splitValues(m[3]);
  const ov = splitValues(rowRe.exec(prev)![3]);
  const changed = cols.map((c, i) => [c, ov[i], nv[i]] as const).filter(([, a, b]) => a !== b);
  if (changed.length) {
    corrections.push(`UPDATE ${m[1]} SET ${changed.map(([c, , b]) => `${c} = ${b}`).join(", ")} WHERE id = ${nv[0]} AND ${changed.map(([c, a]) => `${c} = ${a}`).join(" AND ")};`);
  }
  return false;
});
const out: string[] = [
  `-- Eureka and Beyond — Migration ${TARGET.slice(0, 4)}: next batch of full lessons and their placements.`,
  "-- GENERATED by scripts/build-content.ts. Do not edit by hand.",
  `-- Contains only statements not already in ${FROZEN.join(", ")}.`,
  "-- Idempotent: rows are inserted only if absent; existing content and admin edits are preserved.",
];
const section = (title: string, xs: string[]) => {
  const f = fresh(xs);
  if (f.length) out.push("", `-- ${title}`, ...f);
  return f.length;
};
section("Outline additions", outline);
section("Formulas", formulas);
const newLessons: string[] = [];
for (const [slug, xs] of lessonStmts) if (section(`Lesson: ${slug}`, xs)) newLessons.push(slug);
section("Placements: each linked outline entry places its lesson in that chapter.", placements);
if (corrections.length) out.push("", "-- Corrections to rows that already shipped (skipped if edited since)", ...corrections);
out.push(
  "",
  "-- Courses that now have published lessons are in development, not planned.",
  `UPDATE courses SET status = 'in_development', updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now')
   WHERE status = 'planned' AND id IN (
     SELECT u.course_id FROM chapter_lessons cl JOIN lessons l ON l.id = cl.lesson_id
     JOIN chapters ch ON ch.id = cl.chapter_id JOIN units u ON u.id = ch.unit_id WHERE l.status = 'published');`,
);
writeFileSync(join(ROOT, "migrations", TARGET), out.join("\n") + "\n");
console.log(`Wrote migrations/${TARGET}: ${newLessons.length} new or extended lessons.`);
