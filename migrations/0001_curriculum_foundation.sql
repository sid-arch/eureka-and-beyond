-- Eureka and Beyond — Migration 0001: curriculum and platform foundation
--
-- Forward-only. Never edit this file after it has been applied to any shared
-- database; add a new numbered migration instead. Applied with:
--   wrangler d1 migrations apply eureka-db --local | --remote
--
-- Conventions
--   * Primary keys are TEXT (prefixed, e.g. 'crs_…') so IDs are safe to expose
--     and stable across environments.
--   * Timestamps are ISO-8601 UTC strings.
--   * JSON columns are guarded with json_valid().
--   * Authentication/user tables arrive in Delivery 2. Columns that will
--     reference users (author_id, actor_id) are plain TEXT until then; a later
--     migration adds the foreign keys once the users table exists.

-- ---------------------------------------------------------------------------
-- Subjects → Courses (pathways)
-- ---------------------------------------------------------------------------

CREATE TABLE subjects (
  id          TEXT PRIMARY KEY,
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  position    INTEGER NOT NULL DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'published'
              CHECK (status IN ('draft', 'published', 'archived')),
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE TABLE courses (
  id               TEXT PRIMARY KEY,
  subject_id       TEXT NOT NULL REFERENCES subjects(id) ON DELETE RESTRICT,
  slug             TEXT NOT NULL UNIQUE,
  title            TEXT NOT NULL,
  level            TEXT NOT NULL
                   CHECK (level IN ('foundational', 'on_level', 'honors', 'ap')),
  summary          TEXT NOT NULL DEFAULT '',
  overview         TEXT NOT NULL DEFAULT '',
  -- planned: listed in the catalog, no published lessons
  -- in_development: some lessons published, course not complete
  -- published: course content complete and reviewed
  status           TEXT NOT NULL DEFAULT 'planned'
                   CHECK (status IN ('planned', 'in_development', 'published', 'archived')),
  -- Whether alignment to an external framework (e.g. College Board CED) has
  -- been verified by a person. The UI never claims alignment unless 'verified'.
  alignment_status TEXT NOT NULL DEFAULT 'unverified'
                   CHECK (alignment_status IN ('not_applicable', 'unverified', 'in_review', 'verified')),
  framework_id     TEXT REFERENCES standards_frameworks(id) ON DELETE SET NULL,
  position         INTEGER NOT NULL DEFAULT 0,
  created_at       TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at       TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX idx_courses_subject ON courses(subject_id, position);
CREATE INDEX idx_courses_status ON courses(status);

CREATE TABLE course_prerequisites (
  course_id              TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  prerequisite_course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  kind                   TEXT NOT NULL DEFAULT 'recommended'
                         CHECK (kind IN ('required', 'recommended')),
  PRIMARY KEY (course_id, prerequisite_course_id),
  CHECK (course_id <> prerequisite_course_id)
);

CREATE TABLE course_objectives (
  id        TEXT PRIMARY KEY,
  course_id TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  position  INTEGER NOT NULL DEFAULT 0,
  text      TEXT NOT NULL
);
CREATE INDEX idx_course_objectives ON course_objectives(course_id, position);

-- ---------------------------------------------------------------------------
-- Course → Unit → Chapter → (placement) → Lesson
--
-- Lessons are reusable content. A lesson is written once and *placed* into any
-- number of chapters through chapter_lessons, so Algebra I On-Level and
-- Algebra I Honors can share a lesson without duplicating it.
-- ---------------------------------------------------------------------------

CREATE TABLE units (
  id         TEXT PRIMARY KEY,
  course_id  TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  slug       TEXT NOT NULL,
  title      TEXT NOT NULL,
  summary    TEXT NOT NULL DEFAULT '',
  position   INTEGER NOT NULL DEFAULT 0,
  status     TEXT NOT NULL DEFAULT 'draft'
             CHECK (status IN ('draft', 'in_review', 'published', 'archived')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  UNIQUE (course_id, slug)
);
CREATE INDEX idx_units_course ON units(course_id, position);

CREATE TABLE chapters (
  id         TEXT PRIMARY KEY,
  unit_id    TEXT NOT NULL REFERENCES units(id) ON DELETE CASCADE,
  slug       TEXT NOT NULL,
  title      TEXT NOT NULL,
  summary    TEXT NOT NULL DEFAULT '',
  position   INTEGER NOT NULL DEFAULT 0,
  status     TEXT NOT NULL DEFAULT 'draft'
             CHECK (status IN ('draft', 'in_review', 'published', 'archived')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  UNIQUE (unit_id, slug)
);
CREATE INDEX idx_chapters_unit ON chapters(unit_id, position);

CREATE TABLE lessons (
  id                TEXT PRIMARY KEY,
  slug              TEXT NOT NULL UNIQUE,
  title             TEXT NOT NULL,
  summary           TEXT NOT NULL DEFAULT '',
  estimated_minutes INTEGER CHECK (estimated_minutes IS NULL OR estimated_minutes > 0),
  status            TEXT NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'in_review', 'published', 'archived')),
  revision          INTEGER NOT NULL DEFAULT 1,
  published_at      TEXT,
  created_at        TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at        TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX idx_lessons_status ON lessons(status);

CREATE TABLE chapter_lessons (
  chapter_id TEXT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  lesson_id  TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  position   INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (chapter_id, lesson_id)
);
CREATE INDEX idx_chapter_lessons_lesson ON chapter_lessons(lesson_id);
CREATE INDEX idx_chapter_lessons_order ON chapter_lessons(chapter_id, position);

-- Ordered content blocks rendered by the lesson engine. `kind` selects the
-- renderer; `data` is that renderer's JSON payload (validated in the app).
CREATE TABLE lesson_blocks (
  id         TEXT PRIMARY KEY,
  lesson_id  TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  mode       TEXT NOT NULL CHECK (mode IN ('learn', 'watch', 'experiment', 'practice')),
  position   INTEGER NOT NULL DEFAULT 0,
  kind       TEXT NOT NULL
             CHECK (kind IN ('text', 'definition', 'formula', 'worked_example',
                             'callout', 'figure', 'activity', 'references')),
  data       TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(data)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX idx_lesson_blocks ON lesson_blocks(lesson_id, mode, position);

-- ---------------------------------------------------------------------------
-- Concepts and formulas (shared across courses)
-- ---------------------------------------------------------------------------

CREATE TABLE concepts (
  id          TEXT PRIMARY KEY,
  subject_id  TEXT NOT NULL REFERENCES subjects(id) ON DELETE RESTRICT,
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT ''
);

CREATE TABLE lesson_concepts (
  lesson_id  TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  concept_id TEXT NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  PRIMARY KEY (lesson_id, concept_id)
);
CREATE INDEX idx_lesson_concepts_concept ON lesson_concepts(concept_id);

CREATE TABLE concept_relations (
  concept_id         TEXT NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  related_concept_id TEXT NOT NULL REFERENCES concepts(id) ON DELETE CASCADE,
  PRIMARY KEY (concept_id, related_concept_id),
  CHECK (concept_id <> related_concept_id)
);

CREATE TABLE formulas (
  id          TEXT PRIMARY KEY,
  subject_id  TEXT NOT NULL REFERENCES subjects(id) ON DELETE RESTRICT,
  slug        TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL,
  latex       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  -- [{ "symbol": "P", "meaning": "pressure", "unit": "Pa" }, …]
  variables   TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(variables)),
  status      TEXT NOT NULL DEFAULT 'draft'
              CHECK (status IN ('draft', 'in_review', 'published', 'archived')),
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX idx_formulas_subject ON formulas(subject_id, status);

CREATE TABLE lesson_formulas (
  lesson_id  TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  formula_id TEXT NOT NULL REFERENCES formulas(id) ON DELETE CASCADE,
  position   INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (lesson_id, formula_id)
);

-- ---------------------------------------------------------------------------
-- Standards (configurable: AP CEDs, state standards, district variations)
-- ---------------------------------------------------------------------------

CREATE TABLE standards_frameworks (
  id         TEXT PRIMARY KEY,
  slug       TEXT NOT NULL UNIQUE,
  name       TEXT NOT NULL,
  kind       TEXT NOT NULL CHECK (kind IN ('ap_ced', 'state', 'district', 'custom')),
  source_url TEXT,
  notes      TEXT NOT NULL DEFAULT ''
);

CREATE TABLE standards (
  id           TEXT PRIMARY KEY,
  framework_id TEXT NOT NULL REFERENCES standards_frameworks(id) ON DELETE CASCADE,
  code         TEXT NOT NULL,
  description  TEXT NOT NULL,
  UNIQUE (framework_id, code)
);

CREATE TABLE lesson_standards (
  lesson_id   TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  standard_id TEXT NOT NULL REFERENCES standards(id) ON DELETE CASCADE,
  PRIMARY KEY (lesson_id, standard_id)
);

CREATE TABLE lesson_references (
  id        TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  position  INTEGER NOT NULL DEFAULT 0,
  citation  TEXT NOT NULL,
  url       TEXT
);

-- ---------------------------------------------------------------------------
-- Revisions, audit log, settings
-- ---------------------------------------------------------------------------

CREATE TABLE content_revisions (
  id          TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('subject', 'course', 'unit', 'chapter', 'lesson', 'formula')),
  entity_id   TEXT NOT NULL,
  revision    INTEGER NOT NULL,
  snapshot    TEXT NOT NULL CHECK (json_valid(snapshot)),
  author_id   TEXT,
  note        TEXT NOT NULL DEFAULT '',
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  UNIQUE (entity_type, entity_id, revision)
);

-- Append-only. The application never issues UPDATE or DELETE against this table.
CREATE TABLE audit_logs (
  id          TEXT PRIMARY KEY,
  actor_id    TEXT,
  action      TEXT NOT NULL,
  entity_type TEXT,
  entity_id   TEXT,
  metadata    TEXT NOT NULL DEFAULT '{}' CHECK (json_valid(metadata)),
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);

CREATE TRIGGER audit_logs_no_update BEFORE UPDATE ON audit_logs
BEGIN SELECT RAISE(ABORT, 'audit_logs is append-only'); END;
CREATE TRIGGER audit_logs_no_delete BEFORE DELETE ON audit_logs
BEGIN SELECT RAISE(ABORT, 'audit_logs is append-only'); END;

CREATE TABLE site_settings (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL CHECK (json_valid(value)),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
