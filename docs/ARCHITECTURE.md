# Eureka and Beyond: architecture and plan

Discover. Understand. Go Beyond.

This document is the answer to the specification's "first task": risk review, final architecture, repository layout, migration strategy, authentication choice, design system, delivery plan and the external setup you need to do.

---

## 1. Risks and gaps in the specification

| # | Risk or gap | Why it matters | Decision / mitigation |
|---|---|---|---|
| 1 | **Children's privacy (COPPA, FERPA, state student-privacy laws).** High-school pathways mean many users are under 18, and Algebra Readiness users may be under 13. | Collecting personal data from under-13s without verifiable parental consent is unlawful in the US. Schools using the site can bring FERPA obligations. | Registration ships with an **age gate**: under-13 sign-up stays off until a consent flow exists, and the decision to open it is yours (see §9). Minimal data: email, display name, password hash. Privacy policy is marked draft until legal review. |
| 2 | **Content volume.** 24 pathways is several thousand lessons of carefully written material. | The engineering can be finished long before the content is. The spec forbids fabricated curricula. | Catalog shows real status per course (`planned`, `in_development`, `published`). The authoring tools (Delivery 4) are the real bottleneck-breaker. The plan assumes a content team, not generated lessons. |
| 3 | **AP alignment claims.** | College Board CEDs change, and "AP" is a College Board trademark. Claiming alignment without review is misleading. | `alignment_status` per course, default `unverified`. The UI only claims alignment when a person marks it `verified`. Add a trademark notice in the footer before launch. |
| 4 | **Auth on Workers.** Password hashing is CPU-heavy, and Workers have CPU limits. | Slow hashing can hit limits on the free plan; weak hashing is unacceptable. | Better Auth's default scrypt via `@noble/hashes` runs in Workers; verified against the paid plan's CPU allowance in Delivery 2. Workers Paid ($5/month) is recommended for production regardless. |
| 5 | **No email provider chosen.** | Verification and reset are mandatory and need a sender domain with SPF/DKIM. | Recommend **Resend** (simple HTTP API, works from Workers, free tier). Needs your decision and a domain (§9). |
| 6 | **Rate limiting** isn't fully specified. | Login, registration, reset and feedback are abuse targets. | Cloudflare WAF rate-limit rules on auth paths, plus per-IP/per-account counters in D1 or the Workers Rate Limiting binding, plus Turnstile on public forms. |
| 7 | **Moderation load.** Public discussions on a youth platform. | Unmoderated comments from minors are a safety and legal risk. | Public posts are **pre-moderated by default** (held until approved); a feature flag can relax this for trusted accounts later. No direct messaging. |
| 8 | **Backups.** D1 Time Travel only covers the last 30 days. | Content and progress must survive mistakes. | `npm run db:backup:remote` exports SQL; schedule it (Cron Trigger → R2) in Delivery 7. Every remote migration is preceded by an export. |
| 9 | **Search at scale.** | `LIKE` search is fine for hundreds of rows, not tens of thousands. | Delivery 1 uses escaped `LIKE` with the same API contract; swap in D1 FTS5 when content grows, with no client change. |
| 10 | **Bundle size.** KaTeX + Motion + (later) Three.js/JSXGraph. | Slow first load on school Chromebooks. | Route-level code splitting already in place; heavy simulation libraries load only on pages that use them. |

Missing requirements I've assumed: English-only at launch (strings are kept in components so i18n can be added), US time zone neutrality (all timestamps UTC), and that teachers/classes are out of scope for now.

---

## 2. Final architecture

```
Browser ──► Cloudflare edge
             │
             ├─ Static assets (Workers Static Assets): React SPA, fonts, KaTeX CSS
             │    SPA fallback → index.html, security headers from public/_headers
             │
             └─ /api/*  ──► Worker (Hono, TypeScript)
                              ├─ curriculum module   (public reads; published-only filter)
                              ├─ search module
                              ├─ auth module         (Delivery 2: Better Auth)
                              ├─ student module      (Delivery 3)
                              ├─ admin module        (Delivery 4: RBAC-guarded)
                              ├─ community module    (Delivery 5)
                              └─ bindings: D1 (DB), R2 (uploads, D4+), Turnstile, email API
```

- **Hosting: Cloudflare Pages** (`eureka-and-beyond.pages.dev`), chosen over `*.workers.dev` so the account name never appears in the URL and existing workers.dev sites are untouched. Static files serve the SPA; `functions/api/[[path]].ts` runs the Hono API. The same `worker/index.ts` can still be deployed as a standalone Worker later if needed.
- **One origin** for the SPA and the API. No CORS surface, cookies can be `SameSite=Strict`, one deploy.
- **Hono** for routing: small, typed, Workers-native.
- **D1** is the source of truth; **raw SQL migrations** are authoritative. Queries are hand-written and parameterized. No ORM yet; if the admin CRUD grows large, Drizzle can be layered over the existing schema without changing it.
- **Visibility is enforced on the server.** Every public query includes the published-only predicate (`worker/lib/curriculum.ts`), so a client bug can never reveal drafts.
- **Shared types** in `shared/types.ts` define the API contract for both sides.

## 3. Repository structure

```
content/            curriculum sources: outlines/*.txt, lessons/*.ts, formulas.ts, lib.ts
docs/               ARCHITECTURE, REPORT (implementation + curriculum status), AUTHORING
functions/api/      Pages Function that mounts the API at /api/*
migrations/         numbered D1 migrations (0005/0006 generated from content/)
public/             _headers (CSP etc.), favicon, theme bootstrap
scripts/            build-content.ts, bootstrap-owner.mjs, deploy.sh
shared/             types, permissions and the activity registry shared by API and UI
src/
  components/ui     component library
  components/layout site layout, account and admin shells
  components/sims   15 simulations + SimShell + walkthrough player
  components/lesson block renderer, practice, discussion, feedback
  pages/public      home, catalog, subjects, course, unit, lesson, labs, formulas, search, static
  pages/auth        sign-in, register, verify, forgot/reset, password help
  pages/account     dashboard, courses, saved, practice, notifications, settings, support
  pages/admin       overview, users, analytics, settings, audit, curriculum, studio, formulas,
                    activities, feedback inbox, moderation
tests/              Vitest suites run against a real local D1
worker/             Hono API: routes (public, auth, me, admin) and lib (session, crypto, practice…)
```

## 4. Database and migration strategy

- **Forward-only, numbered SQL files** in `migrations/`, applied with `wrangler d1 migrations apply` (D1 records what has run in `d1_migrations`).
- A migration is **never edited after it has been applied to a shared database**. Fixes are new migrations. (Delivery 1's files haven't been applied anywhere shared yet.)
- **Destructive changes** (drop/rename) use expand-and-contract: add the new shape, backfill, switch code, remove the old shape in a later release.
- **Before every remote migration:** `npm run db:backup:remote` (SQL export to `backups/`). D1 Time Travel gives point-in-time restore for 30 days: `wrangler d1 time-travel restore eureka-db --timestamp=<ISO>`.
- **Seed data is data, not fixtures.** `0002` seeds the real catalog. Test-only rows are inserted inside tests, never in migrations.
- **Tests run every migration** against a fresh local D1 (`tests/migrations.test.ts`), so a broken migration fails CI before it reaches Cloudflare.

### Content model highlights

- `Subject → Course → Unit → Chapter → (chapter_lessons) → Lesson → lesson_blocks`
- **Lessons are reusable.** A lesson is written once and placed in any number of chapters through `chapter_lessons`; On-level and Honors pathways can share lessons without copies.
- **Concepts** and **formulas** are shared across courses; `concept_relations` powers "related concepts".
- **Standards are configurable**: `standards_frameworks` (AP CED, state, district, custom) → `standards` → `lesson_standards`.
- **Status everywhere** (`draft`, `in_review`, `published`, `archived`), plus course-level `planned`/`in_development`.
- **`content_revisions`** stores JSON snapshots for version history; **`audit_logs`** is append-only, enforced by triggers.

## 5. Authentication (updated)

The first plan chose Better Auth. It was replaced with a small in-house implementation on the Web Crypto API, because the free Workers plan's ~10 ms CPU limit can't accommodate Better Auth's scrypt hashing. Details:

- Passwords: PBKDF2-SHA256, 100,000 iterations (the Workers maximum), 16-byte per-user salt; parameters stored per user and upgraded on next login if raised.
- Sessions: 256-bit random token in an `HttpOnly`, `Secure`, `SameSite=Lax`, `__Host-` cookie; only its SHA-256 is stored; 30-day expiry; suspension or password reset revokes sessions.
- Verification and reset tokens: 256-bit, stored hashed, single-use (atomic `UPDATE … RETURNING`), 24 h and 1 h expiry.
- CSRF: state-changing requests must be JSON and same-origin.
- Rate limits on registration, login (per IP and per account), reset, posting, tickets and practice checks.
- Roles: Student, Content Editor, Moderator, Administrator, Owner (`shared/permissions.ts`), checked on every admin route. Nobody can change their own role; only the Owner grants Administrator; Owner exists only via `scripts/bootstrap-owner.mjs`.

## 6. Design system (v2)

Replaced in the redesign. Light-first, with dark mode. Tokens are in `src/styles/index.css`: canvas #F7F9FC, ink #17233B, primary #4169E1, Mathematics #6654E8, Physics #0E9F9A, Chemistry #F08B43, success #20A477. Bricolage Grotesque is used for headings and Figtree for body text, both self-hosted. Subject colors are used for marks and fills; text stays in ink for contrast. Components: `src/components/ui` (buttons, badges, fields, tabs, dialogs, alerts, tables, progress, empty, loading and error states). Simulations share `SimShell` (visual, controls, live readouts, assumptions panel).

## 7. Delivery plan

| Delivery | Scope | Done when |
|---|---|---|
| **1. Core platform** | Design system, routing, homepage, catalog, subject/course/unit/lesson navigation, formula library, search, D1 schema + seed, lesson block engine, first interactive activity | ✅ see delivery report |
| **2. Authentication** | Better Auth on D1; register, verify, login/logout, forgot/reset, change password, sessions, delete account; roles + RBAC middleware; Owner bootstrap CLI; Turnstile; rate limits; age gate | Auth test suite green, including unauthorized-admin tests |
| **3. Student experience** | Dashboard, enrollments, lesson progress, bookmarks (lessons, formulas), continue-learning, settings, private-by-default profile, data export | Progress persists across sessions/devices |
| **4. Admin command center** | Protected `/admin`; overview with real counts; user search, roles, suspend; curriculum CRUD with reorder, draft/preview/publish/archive, revisions; content studio (block editor, KaTeX preview, R2 images, activity placement); audit log viewer; settings & feature flags | Every action authorized server-side and audit-logged |
| **5. Community and feedback** | Contextual feedback on every lesson/block/activity; questions/comments with pre-moderation; reports; private tickets with status; password-assistance tickets; moderator inbox, assignment, replies | Moderation permission tests green |
| **6. Learning engine** | Practice engine (validation, hints, solutions, attempts, mastery); Watch mode player; unit circle (JSXGraph), projectile motion, ideal gas law; Three.js only where 3D adds understanding | Simulation math covered by unit tests |
| **7. Integration and deployment** | Full E2E (Playwright), axe accessibility audit, security review, FTS5 search, scheduled backups to R2, performance budget, production deploy | Verified on production URL |

## 8. Status

Deliveries 1–6 are implemented at platform level; see `docs/REPORT.md` for what is verified and how much curriculum is written. Delivery 7 is partly done: staging deployment and verification are complete; production promotion, axe/screen-reader audit and scheduled backups remain.

## 9. What I need from you

| Item | When | Cost | Notes |
|---|---|---|---|
| Cloudflare account + `wrangler login` | Before first deploy | Free; **Workers Paid $5/mo recommended** for auth CPU and higher D1 limits | I can't log in to your account from here |
| D1 database (`wrangler d1 create eureka-db`) and paste its ID into `wrangler.jsonc` | Before first deploy | Free tier available | |
| Domain name | Before Delivery 2 goes live | ~$10–15/yr | Needed for email sending and a stable URL |
| Email provider account + verified sending domain | Delivery 2 | Resend has a free tier (check current limits) | Or name another provider |
| Turnstile site key + secret | Delivery 2 | Free | |
| **Decision: minimum age for accounts** | Before Delivery 2 | n/a | Recommend 13+ at launch; under-13 needs a parental-consent design and legal review |
| Legal review of privacy policy and terms | Before accounts open | Varies | Drafts are in place and labeled as drafts |
| Content authors / reviewers | Ongoing | n/a | Determines how fast courses move out of "planned" |
