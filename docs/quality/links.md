# Link audit — 2026-10-17

html-proofer 5.2.3 over a fresh production build, external links on (concurrency 4, 20s timeout, redirects followed, browser User-Agent): 105 external and 51 internal links on 39 pages.

## Links changed

| Source | Old | New | Evidence |
| --- | --- | --- | --- |
| `_posts/2019-09-12-I-have-no-idea.md` | `/books/#ultra-learning` | `/books/#ultralearning` | The books page has `id="ultralearning"`; the old fragment does not exist. |
| `about.md` (redirect and body link) | `https://panashe.nz/about` | `https://panashe.nz/` | `/about` and `/about/` return 404 on panashe.nz; the home page is the profile. |
| `_posts/2021-06-02-How to install the latest Python on the Raspberry Pi.md` | `https://www.raspberrypi.org/software/` | `https://www.raspberrypi.com/software/` | The .org URL redirects to the .com one (the site moved domains). |

Post wording and link titles are unchanged.

## Known failures that are not dead links

- `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (every page): `<link rel="preconnect">` origins, which return 404 at the bare origin by design.
- `https://www.journals.uchicago.edu/doi/10.1086/691462`: 403 to non-browser clients (bot protection); the article loads in a browser.
- `https://www.raspberrypi.com/software/`: 403 to non-browser clients (bot protection); the page loads in a browser.

## Re-run

```sh
JEKYLL_ENV=production bundle exec jekyll build --destination /tmp/pmn-site
bundle exec htmlproofer /tmp/pmn-site --hydra '{"max_concurrency":4}' \
  --typhoeus '{"timeout":20,"connecttimeout":20,"followlocation":true}'
```

The internal-only check runs in `bash scripts/ci-local.sh`.
