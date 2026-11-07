#!/usr/bin/env bash
# Local deploy: build the site (same step as pages.yml) and push the output to
# the gh-pages branch of origin, which GitHub Pages serves when the Pages
# source is "Deploy from a branch: gh-pages". Uses your git credentials; no
# secrets are read. Set DEPLOY_DRY_RUN=1 to build and stage without pushing.
set -euo pipefail
cd "$(dirname "$0")/.."
export LC_ALL=en_US.UTF-8 JEKYLL_ENV=production
REMOTE=$(git remote get-url origin)
OUT=$(mktemp -d)
trap 'rm -rf "$OUT"' EXIT

bundle config set --local path vendor/bundle >/dev/null
bundle install --quiet
bundle exec jekyll build --destination "$OUT/site"

[ -f "$OUT/site/CNAME" ] || { echo "build has no CNAME, refusing to deploy" >&2; exit 1; }
cd "$OUT/site"
touch .nojekyll
git init -q -b gh-pages
git add -A
git -c user.name=fleet-deploy -c user.email=deploy@pmn.nz commit -q -m "Deploy $(git -C "$OLDPWD" rev-parse --short HEAD 2>/dev/null || echo build)"
if [ "${DEPLOY_DRY_RUN:-}" = 1 ]; then
  echo "dry run: built $(git ls-files | wc -l | tr -d ' ') files, not pushing"
  exit 0
fi
git push -f "$REMOTE" gh-pages
echo "pushed gh-pages to $REMOTE"
