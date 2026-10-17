# pmn.nz
PMN.NZ Site
Repo for my blog

## Local checks

`bash scripts/ci-local.sh` is the single local check. It installs gems into `vendor/bundle`,
builds the site in production mode into a temporary directory (the tracked `_site/` is never
touched), then runs html-proofer on that output with external links disabled: internal links,
images, alt text and scripts, and finally `scripts/check-seo.rb` (titles, descriptions, canonical
and Open Graph tags, sitemap and robots.txt) with its unit tests, then the Playwright accessibility tests (`npm run test:e2e`, see
`docs/quality/a11y.md`) against the same build. It exits non-zero on any failure.
