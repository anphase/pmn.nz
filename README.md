# pmn.nz
PMN.NZ Site
Repo for my blog

## Local checks

`bash scripts/ci-local.sh` is the single local check. It installs gems into `vendor/bundle`,
builds the site in production mode into a temporary directory (the tracked `_site/` is never
touched), then runs html-proofer on that output with external links disabled: internal links,
images, alt text and scripts. It exits non-zero on any failure.
