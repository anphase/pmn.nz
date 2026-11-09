# Coverage and complexity baselines — 2026-11-09

Measured on master at 1b5e984 with Node v26.13.0, Ruby 4.0.9, ESLint 10.14.0 and RuboCop 1.92.2.
`bash scripts/ci-local.sh` enforces the floors and limits; floors only go up and limits only go
down. When a change raises coverage, raise the floor in the same change. A change that lowers
coverage adds tests or is not done.

## Unit-test coverage

| Code | Tool | Lines | Branches | Functions | Floor, where it lives |
| --- | --- | --- | --- | --- | --- |
| `assets/js/**` as one total, unloaded files included | Node test runner coverage over `tests/unit/` | 33.88% | 93.33% | 50.00% | 33 / 93 / 50, `test:coverage` in package.json |
| `scripts/check-seo.rb` | `scripts/ruby-coverage.rb` (stdlib `Coverage`) over `test/check_seo_test.rb` | 91.78% | 70.00% | — | 91 / 70, its arguments in `scripts/ci-local.sh` |

Per file, `theme-toggle.js` is 52.56% lines / 93.33% branches and `image-modal.js` is 0%. The
uncovered JS is browser wiring (the toggle buttons and `storage` listener, lines 39-75, and all
of the modal), driven in a real browser by `tests/e2e/theme.spec.js` and `tests/e2e/modal.spec.js`,
which these numbers do not count. Raising the JS floor means unit-testing that wiring with a
fake DOM or splitting the pure logic out as `theme-toggle.js` already does. Node reports only
a total, so the floor is on the total.

Not measured: the pre-paint inline script in `_includes/head.html` (the e2e no-flash test covers
it) and the shell scripts under `scripts/`.

## Cyclomatic complexity

Limit per function: 10 (portfolio testing standard). ESLint `complexity` (`eslint.config.js`:
`assets/js`, `tests`, the config files) and RuboCop `Metrics/CyclomaticComplexity`
(`.rubocop.yml`: every `.rb`). Both pass with one scoped exception: `sitemap_errors` in
`scripts/check-seo.rb` is 12 and carries an inline disable until it is split (tests first).

| File | Highest function | Complexity |
| --- | --- | --- |
| `scripts/check-seo.rb` | `sitemap_errors` | 12 |
| `scripts/check-seo.rb` | `page_errors` | 9 |
| `assets/js/image-modal.js` | image-link click handler | 9 |
| `scripts/check-seo.rb` | `post_image_errors` | 7 |
| `assets/js/image-modal.js` | module IIFE | 6 |
| `scripts/check-seo.rb` | `title_errors` | 6 |
| everything else | | 5 or less |

## Re-run

```sh
npm run test:coverage
ruby scripts/ruby-coverage.rb scripts/check-seo.rb test/check_seo_test.rb 0 0
npx eslint --rule 'complexity: ["error", 1]' .   # reports every function's complexity
bundle exec rubocop
```
