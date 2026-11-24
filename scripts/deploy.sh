#!/usr/bin/env bash
# Deploys to Cloudflare Pages.
#   bash scripts/deploy.sh staging      → https://staging.eureka-and-beyond.pages.dev (separate database)
#   bash scripts/deploy.sh production   → https://eureka-and-beyond.pages.dev
# Safe to re-run: databases and the project are created only if missing, remote
# databases are backed up before migrating, and only pending migrations run.
set -euo pipefail
cd "$(dirname "$0")/.."

TARGET="${1:-}"
PROJECT=eureka-and-beyond
case "$TARGET" in
  staging)    DB=eureka-db-staging; ENV_ARGS=(--env preview); BRANCH=staging ;;
  production) DB=eureka-db;         ENV_ARGS=();              BRANCH=main ;;
  *) echo "Usage: bash scripts/deploy.sh staging|production"; exit 1 ;;
esac

echo "› Checking Cloudflare login"
npx wrangler whoami >/dev/null

uuid_of() { npx wrangler d1 list --json | node -e 'const l=JSON.parse(require("fs").readFileSync(0,"utf8"));const d=l.find(x=>x.name===process.argv[1]);process.stdout.write(d?d.uuid:"")' "$1"; }

echo "› Ensuring D1 database '$DB' exists"
DB_ID=$(uuid_of "$DB")
if [ -z "$DB_ID" ]; then
  npx wrangler d1 create "$DB" >/dev/null
  DB_ID=$(uuid_of "$DB")
  echo "  created $DB_ID"
else
  echo "  found $DB_ID"
  mkdir -p backups
  echo "› Backing up $DB"
  npx wrangler d1 export "$DB" --remote --output="backups/$DB-$(date +%Y%m%d-%H%M%S).sql"
fi
# Write the id into wrangler.jsonc next to this database's name.
node -e '
const fs=require("fs");const [name,id]=process.argv.slice(1);
let s=fs.readFileSync("wrangler.jsonc","utf8");
s=s.replace(new RegExp(`("database_name": "${name}",\\s*"database_id": ")[^"]*(")`),`$1${id}$2`);
fs.writeFileSync("wrangler.jsonc",s);' "$DB" "$DB_ID"

echo "› Applying pending migrations to $DB"
npx wrangler d1 migrations apply "$DB" --remote "${ENV_ARGS[@]}"

echo "› Ensuring Pages project '$PROJECT' exists"
if ! npx wrangler pages project list --json 2>/dev/null | grep -q "\"$PROJECT\""; then
  npx wrangler pages project create "$PROJECT" --production-branch main
fi

echo "› Building and deploying ($BRANCH)"
npm run build
npx wrangler pages deploy --project-name "$PROJECT" --branch "$BRANCH" --commit-dirty=true

if [ "$TARGET" = staging ]; then echo "✓ Staging: https://staging.$PROJECT.pages.dev"; else echo "✓ Production: https://$PROJECT.pages.dev"; fi
