# Changelog

## [Unreleased]

### Fixed
- 2026-11-15: Updated addressable 2.9.0 to 2.9.2 in Gemfile.lock to fix five Dependabot advisories (GHSA-9crm-g4mf-wc5j, GHSA-qq38-m9mg-xjj5, GHSA-j82w-28jv-3pmj, GHSA-9f42-57jx-vpp3, GHSA-8gmh-2hhj-2hv9).

### Added
- 2026-11-08: `docs/internal/architecture.md` with services, routes, data stores, deploy paths and a diagram.
- 2026-11-07: `scripts/deploy.sh`, a local deploy that builds the site as pages.yml does and pushes the output to the `gh-pages` branch (`DEPLOY_DRY_RUN=1` builds without pushing).

See `.tracking.md` Log for earlier work (dark mode, accessibility tests, PageSpeed, SEO checks).
