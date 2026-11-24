# Eureka and Beyond

**Discover. Understand. Go Beyond.** Free, interactive mathematics, physics and chemistry for high school and beyond.

- Implementation, verification and curriculum report: [`docs/REPORT.md`](docs/REPORT.md)
- Architecture and decisions: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- Writing lessons and simulations: [`docs/AUTHORING.md`](docs/AUTHORING.md)

Stack: React 19 + TypeScript + Tailwind v4 + React Router 7 on Cloudflare Pages; API in Hono (Pages Functions); Cloudflare D1; KaTeX; Motion.

## Run locally

```bash
npm install
cp .dev.vars.example .dev.vars       # local dev stores emails in the database instead of sending them
npm run db:migrate:local
OWNER_PASSWORD='choose-a-long-password' npm run bootstrap:owner -- --email you@example.com --name "Your name" --local
npm run dev                          # API on :8787 + Vite on :5173
```

To see verification and reset links locally: `npx wrangler d1 execute eureka-db --local --command "SELECT subject, body FROM email_outbox ORDER BY rowid DESC LIMIT 3"`.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | API (local D1) and Vite together |
| `npm test` | 71 tests: API, auth, permissions, student data, moderation, migrations, practice checking, math |
| `npm run typecheck` / `npm run build` | Type-check; production build |
| `npm run content:check` / `content:build` | Validate content sources; regenerate content migrations |
| `npm run bootstrap:owner -- --email … [--local \| --remote] [--env preview]` | Create the single Owner account (refuses if one exists) |
| `npm run deploy:staging` | Deploy to https://staging.eureka-and-beyond.pages.dev with its own database |
| `npm run deploy:prod` | Back up, migrate and deploy production |

## Deploying

```bash
npx wrangler login
npm run deploy:staging        # test here first
npm run deploy:prod           # backs up eureka-db, applies pending migrations, deploys "main"
```

### Production checklist

1. **Email** (needed for sign-up and password resets). Create a Resend account, verify a sending domain, then:
   `npx wrangler pages secret put RESEND_API_KEY --project-name eureka-and-beyond` and the same for `EMAIL_FROM`. Until then, production sign-up stays closed, and the site says so.
2. **Owner account:** `OWNER_PASSWORD='…' npm run bootstrap:owner -- --email you@example.com --remote`.
3. **Optional bot protection:** add `TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` secrets.
4. **Rollback:** in the Cloudflare dashboard, Pages → eureka-and-beyond → Deployments → roll back. Database restore: `npx wrangler d1 time-travel restore eureka-db --timestamp=<ISO time>` (last 30 days) or import a file from `backups/`.

## Environment

| Name | Where | Purpose |
|---|---|---|
| `APP_ENV` | `wrangler.jsonc` vars | `production`, `staging` or `development` |
| `PUBLIC_SITE_URL` | vars | Base URL used in email links |
| `MAIL_DRIVER` | vars | `resend`, `log` (non-production only) or `disabled`; defaults to `resend` when a key is set |
| `RESEND_API_KEY`, `EMAIL_FROM` | secrets | Transactional email |
| `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | secrets | Optional bot protection |
