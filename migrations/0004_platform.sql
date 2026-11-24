-- Eureka and Beyond — Migration 0004: accounts, learning records, practice,
-- community, support and curriculum outlines.
--
-- Additive only: no existing table is altered or dropped, so data created by
-- migrations 0001–0003 is preserved.

-- ---------------------------------------------------------------------------
-- Accounts
-- ---------------------------------------------------------------------------

CREATE TABLE users (
  id                  TEXT PRIMARY KEY,
  email               TEXT NOT NULL UNIQUE COLLATE NOCASE,
  email_verified_at   TEXT,
  display_name        TEXT NOT NULL,
  -- PBKDF2-SHA256; parameters stored per user so they can be raised later.
  password_hash       TEXT NOT NULL,
  password_salt       TEXT NOT NULL,
  password_iterations INTEGER NOT NULL,
  role                TEXT NOT NULL DEFAULT 'student'
                      CHECK (role IN ('student', 'content_editor', 'moderator', 'administrator', 'owner')),
  status              TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
  -- The user confirmed they are 13 or older at sign-up. No birth date is stored.
  age_attested_13     INTEGER NOT NULL DEFAULT 0 CHECK (age_attested_13 IN (0, 1)),
  email_notifications INTEGER NOT NULL DEFAULT 1 CHECK (email_notifications IN (0, 1)),
  last_login_at       TEXT,
  created_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at          TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created ON users(created_at);

-- Session id is the SHA-256 of the cookie token; the raw token is never stored.
CREATE TABLE sessions (
  id           TEXT PRIMARY KEY,
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_agent   TEXT NOT NULL DEFAULT '',
  created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  last_seen_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  expires_at   TEXT NOT NULL
);
CREATE INDEX idx_sessions_user ON sessions(user_id);

-- Email verification and password reset. Stored hashed, single use, expiring.
CREATE TABLE auth_tokens (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  purpose    TEXT NOT NULL CHECK (purpose IN ('verify_email', 'reset_password')),
  expires_at TEXT NOT NULL,
  used_at    TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX idx_auth_tokens_user ON auth_tokens(user_id, purpose);

CREATE TABLE rate_limits (
  key          TEXT PRIMARY KEY,
  window_start INTEGER NOT NULL,
  count        INTEGER NOT NULL
);

-- Record of outgoing email. Bodies are kept only outside production
-- (local development and tests) so verification links can be followed there.
CREATE TABLE email_outbox (
  id         TEXT PRIMARY KEY,
  to_address TEXT NOT NULL,
  subject    TEXT NOT NULL,
  body       TEXT,
  status     TEXT NOT NULL CHECK (status IN ('sent', 'logged', 'failed')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- ---------------------------------------------------------------------------
-- Curriculum additions
-- ---------------------------------------------------------------------------

-- Planned lessons in a chapter. When the lesson is written, lesson_id links it.
CREATE TABLE lesson_plans (
  id         TEXT PRIMARY KEY,
  chapter_id TEXT NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  position   INTEGER NOT NULL DEFAULT 0,
  title      TEXT NOT NULL,
  lesson_id  TEXT REFERENCES lessons(id) ON DELETE SET NULL
);
CREATE INDEX idx_lesson_plans_chapter ON lesson_plans(chapter_id, position);
CREATE INDEX idx_lesson_plans_lesson ON lesson_plans(lesson_id);

CREATE TABLE lesson_objectives (
  id        TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  position  INTEGER NOT NULL DEFAULT 0,
  text      TEXT NOT NULL
);
CREATE INDEX idx_lesson_objectives ON lesson_objectives(lesson_id, position);

-- ---------------------------------------------------------------------------
-- Practice
-- ---------------------------------------------------------------------------

-- `data` holds the answer key and is never sent to clients as-is.
--   multiple_choice: {"choices": ["…"], "answer": 2}
--   numeric:         {"answer": 9.8, "tolerance": 0.05, "relative": false, "unit": "m/s²"}
--   short_text:      {"accept": ["x = 5", "5"]}
CREATE TABLE practice_questions (
  id         TEXT PRIMARY KEY,
  lesson_id  TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  position   INTEGER NOT NULL DEFAULT 0,
  purpose    TEXT NOT NULL DEFAULT 'practice' CHECK (purpose IN ('practice', 'review')),
  kind       TEXT NOT NULL CHECK (kind IN ('multiple_choice', 'numeric', 'short_text')),
  difficulty INTEGER NOT NULL DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 3),
  prompt     TEXT NOT NULL,
  data       TEXT NOT NULL CHECK (json_valid(data)),
  hints      TEXT NOT NULL DEFAULT '[]' CHECK (json_valid(hints)),
  solution   TEXT NOT NULL DEFAULT '',
  status     TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX idx_practice_questions_lesson ON practice_questions(lesson_id, purpose, position);

CREATE TABLE practice_attempts (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL REFERENCES practice_questions(id) ON DELETE CASCADE,
  correct     INTEGER NOT NULL CHECK (correct IN (0, 1)),
  answer      TEXT NOT NULL,
  hints_used  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX idx_practice_attempts_user ON practice_attempts(user_id, created_at);
CREATE INDEX idx_practice_attempts_question ON practice_attempts(question_id);

-- ---------------------------------------------------------------------------
-- Student records
-- ---------------------------------------------------------------------------

CREATE TABLE enrollments (
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  course_id  TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  PRIMARY KEY (user_id, course_id)
);

CREATE TABLE lesson_progress (
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id    TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  course_id    TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status       TEXT NOT NULL CHECK (status IN ('started', 'completed')),
  started_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  completed_at TEXT,
  updated_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  PRIMARY KEY (user_id, lesson_id)
);
CREATE INDEX idx_lesson_progress_recent ON lesson_progress(user_id, updated_at);

CREATE TABLE bookmarks (
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind       TEXT NOT NULL CHECK (kind IN ('lesson', 'formula')),
  target_id  TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  PRIMARY KEY (user_id, kind, target_id)
);

CREATE TABLE notifications (
  id         TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  body       TEXT NOT NULL DEFAULT '',
  link       TEXT,
  read_at    TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX idx_notifications_user ON notifications(user_id, read_at, created_at);

-- ---------------------------------------------------------------------------
-- Community: lesson discussions (pre-moderated) and reports
-- ---------------------------------------------------------------------------

CREATE TABLE discussion_posts (
  id            TEXT PRIMARY KEY,
  lesson_id     TEXT NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  parent_id     TEXT REFERENCES discussion_posts(id) ON DELETE CASCADE,
  user_id       TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind          TEXT NOT NULL CHECK (kind IN ('question', 'comment')),
  context_label TEXT NOT NULL DEFAULT '',
  body          TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'removed')),
  is_staff      INTEGER NOT NULL DEFAULT 0 CHECK (is_staff IN (0, 1)),
  moderated_by  TEXT REFERENCES users(id) ON DELETE SET NULL,
  moderated_at  TEXT,
  created_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX idx_discussion_lesson ON discussion_posts(lesson_id, status, created_at);
CREATE INDEX idx_discussion_status ON discussion_posts(status, created_at);

CREATE TABLE reports (
  id          TEXT PRIMARY KEY,
  post_id     TEXT NOT NULL REFERENCES discussion_posts(id) ON DELETE CASCADE,
  reporter_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  reason      TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'dismissed')),
  resolved_by TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  UNIQUE (post_id, reporter_id)
);
CREATE INDEX idx_reports_status ON reports(status, created_at);

-- ---------------------------------------------------------------------------
-- Private feedback and support tickets (incl. password assistance)
-- ---------------------------------------------------------------------------

CREATE TABLE tickets (
  id            TEXT PRIMARY KEY,
  user_id       TEXT REFERENCES users(id) ON DELETE SET NULL,
  -- Only for password-assistance requests from people who can't sign in.
  contact_email TEXT,
  category      TEXT NOT NULL CHECK (category IN ('question', 'bug', 'concern', 'suggestion', 'account', 'password_assistance', 'other')),
  subject       TEXT NOT NULL,
  context_type  TEXT NOT NULL DEFAULT 'general'
                CHECK (context_type IN ('general', 'course', 'lesson', 'block', 'activity', 'formula', 'practice')),
  context_id    TEXT,
  context_label TEXT NOT NULL DEFAULT '',
  status        TEXT NOT NULL DEFAULT 'open'
                CHECK (status IN ('open', 'in_progress', 'waiting_on_user', 'resolved', 'closed')),
  assigned_to   TEXT REFERENCES users(id) ON DELETE SET NULL,
  created_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  CHECK (user_id IS NOT NULL OR (category = 'password_assistance' AND contact_email IS NOT NULL))
);
CREATE INDEX idx_tickets_user ON tickets(user_id, updated_at);
CREATE INDEX idx_tickets_status ON tickets(status, category, updated_at);

CREATE TABLE ticket_messages (
  id         TEXT PRIMARY KEY,
  ticket_id  TEXT NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  author_id  TEXT REFERENCES users(id) ON DELETE SET NULL,
  is_staff   INTEGER NOT NULL DEFAULT 0 CHECK (is_staff IN (0, 1)),
  body       TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);
CREATE INDEX idx_ticket_messages ON ticket_messages(ticket_id, created_at);

-- Administrators can pause sign-up from the admin console. Sign-up is also
-- unavailable whenever no email provider is configured, because accounts
-- must verify their address.
INSERT OR IGNORE INTO site_settings (key, value) VALUES
  ('registration', '{"open": true}');
