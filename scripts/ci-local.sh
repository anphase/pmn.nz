#!/usr/bin/env bash
# The repo's single local check: production build into a temp dir, then html-proofer
# on that output (internal links, images, alt text, scripts; external links off).
set -euo pipefail
export BUNDLE_VERSION=system  # don't auto-switch to the bundler version recorded in the lockfile; use the installed one
export LC_ALL=en_US.UTF-8  # html-proofer silently skips non-ASCII pages under the C locale
cd "$(dirname "$0")/.."

dest="$(mktemp -d)"
trap 'rm -rf "$dest"' EXIT

bundle config set --local path vendor/bundle
bundle install
JEKYLL_ENV=production bundle exec jekyll build --destination "$dest"
bundle exec htmlproofer "$dest" --disable-external
ruby test/check_seo_test.rb
ruby scripts/check-seo.rb "$dest"

npm ci --no-audit --no-fund
npx playwright install chromium
npm test
bash scripts/check-perf-assets.sh "$dest"
SITE_DIR="$dest" npm run test:e2e
