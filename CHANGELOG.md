# Changelog

## [Unreleased]

### Added
- 2026-11-07: `scripts/deploy.sh`, a local deploy that builds the site as pages.yml does and pushes the output to the `gh-pages` branch (`DEPLOY_DRY_RUN=1` builds without pushing).

### Changed
- 2026-11-10: Making small changes post: joined two clipped sentences so it passes the prose check; the Google Fonts 404 was a bare preconnect origin in a stale `_site` build, and the layouts already self-host fonts.
