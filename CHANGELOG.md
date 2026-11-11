# Changelog

## [Unreleased]

### Added
- 2026-11-12: `bundle-audit check` in `scripts/ci-local.sh`, so a gem with a known advisory fails the local check.
- 2026-11-08: `docs/internal/architecture.md` with services, routes, data stores, deploy paths and a diagram.
- 2026-11-07: `scripts/deploy.sh`, a local deploy that builds the site as pages.yml does and pushes the output to the `gh-pages` branch (`DEPLOY_DRY_RUN=1` builds without pushing).

### Fixed
- 2026-11-12: Updated nokogiri to 1.19.7 and addressable to 2.9.2 to pick up their security fixes.

See `.tracking.md` Log for earlier work (dark mode, accessibility tests, PageSpeed, SEO checks).
