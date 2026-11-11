# Changelog

## [Unreleased]

### Changed
- 2026-11-11: Raspberry Pi Python install post reworded in two places so it passes the prose check; the Google Fonts 404 came from a stale `_site` build, as the source already self-hosts fonts.

### Added
- 2026-11-07: `scripts/deploy.sh`, a local deploy that builds the site as pages.yml does and pushes the output to the `gh-pages` branch (`DEPLOY_DRY_RUN=1` builds without pushing).

