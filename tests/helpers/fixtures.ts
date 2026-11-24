// A self-contained "planned" course for tests that need a course with an outline but
// no written lessons. Real courses fill up as content is written, so tests create
// this fixture instead of depending on one staying empty. Call remove() when done
// (the inserts cascade from the course row).

type DB = { prepare: (sql: string) => { bind: (...v: unknown[]) => any }; batch: (s: any[]) => Promise<unknown> };

export const FIXTURE = {
  courseSlug: "fixture-planned-course",
  unitSlug: "fixture-unit",
  plannedTitles: ["Fixture topic one", "Fixture topic two"],
};

export async function createPlannedCourse(db: DB) {
  const subject = await db.prepare(`SELECT id FROM subjects WHERE slug = 'chemistry'`).bind().first();
  const s = (sql: string, ...v: unknown[]) => db.prepare(sql).bind(...v);
  await db.batch([
    s(`INSERT INTO courses (id, subject_id, slug, title, level, summary, status, position) VALUES ('crs_fixture', ?, ?, 'Fixture planned course', 'on_level', 'Test fixture', 'planned', 999)`, subject.id, FIXTURE.courseSlug),
    s(`INSERT INTO units (id, course_id, slug, title, summary, position, status) VALUES ('unit_fixture', 'crs_fixture', ?, 'Fixture unit', 'Test fixture', 1, 'published')`, FIXTURE.unitSlug),
    s(`INSERT INTO chapters (id, unit_id, slug, title, summary, position, status) VALUES ('chap_fixture', 'unit_fixture', 'fixture-chapter', 'Fixture chapter', '', 1, 'published')`),
    s(`INSERT INTO lesson_plans (id, chapter_id, position, title) VALUES ('plan_fixture_1', 'chap_fixture', 1, ?)`, FIXTURE.plannedTitles[0]),
    s(`INSERT INTO lesson_plans (id, chapter_id, position, title) VALUES ('plan_fixture_2', 'chap_fixture', 2, ?)`, FIXTURE.plannedTitles[1]),
  ]);
  return {
    chapterId: "chap_fixture",
    remove: async () => {
      await db.batch([
        s(`DELETE FROM lesson_plans WHERE chapter_id = 'chap_fixture'`),
        s(`DELETE FROM chapters WHERE id = 'chap_fixture'`),
        s(`DELETE FROM units WHERE id = 'unit_fixture'`),
        s(`DELETE FROM courses WHERE id = 'crs_fixture'`),
      ]);
    },
  };
}
