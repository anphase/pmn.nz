# Link audit — 2026-10-17

Status: **incomplete**. The external html-proofer acceptance checks could not run in this sandbox. No external URLs changed.

## Links changed

| Source | Old | New | Evidence |
| --- | --- | --- | --- |
| `_posts/2019-09-12-I-have-no-idea.md` | `/books/#ultra-learning` | `/books/#ultralearning` | The built books page has `id="ultralearning"`. The old fragment is absent. This pre-existing internal failure was fixed to meet the internal-check requirement. |

Only this link target changed; post wording and link titles are unchanged.

## Verification

- A fresh production Jekyll build passes with Ruby 3.3.0 and the existing lockfile, using `.bundle/link-audit/after` as the destination. Tracked `_site/` files are untouched.
- A temporary, offline HTML parser checks same-site link targets and fragments, stylesheet/image/script references, and the presence of image alt attributes. Before the fix it failed on the fragment above. After the fix it passes: **39 HTML files, 745 same-site references, zero failures**. This is a supplementary check, not an html-proofer pass.
- Scoped mutation: restoring the old fragment in the source and rebuilding reproduces the failure; the corrected source is restored afterwards. A comparison against the original post confirms there are no other content changes.
- html-proofer is absent from the installed gems and the Gemfile. The initial `bundle exec htmlproofer` attempt exits 127. Installing a separate copy into this repository fails because `rubygems.org` cannot resolve. Therefore neither an external baseline nor the required second external run nor the internal-only html-proofer run is available. This was established before changing source content.
- Runtime browser/server verification is sandbox-blocked: serving the unchanged build on `127.0.0.1` at port `0` fails with `EPERM`; headless Chromium exits with signal 5 before rendering the affected post in both the unchanged and corrected builds. The browser connector also refuses navigation under the current approval policy. Runtime verdict: **FAIL (sandbox-blocked)**.

## External evidence

The web fetch tool returned page content for [Saccader](https://saccader.com/), [AnswerFit](https://answerfit.ai/), [Wolfram's introduction](https://www.stephenwolfram.com/publications/introduction-to-a-new-kind-of-science/), [Brain Drain](https://www.journals.uchicago.edu/doi/10.1086/691462), and the [ProductHunters post](https://www.reddit.com/r/ProductHunters/comments/1wcdu17/selfime_is_on_product_hunt_guided_practices/). The [GitHub repository API](https://api.github.com/repos/anphase/go_quiz) confirms that `anphase/go_quiz` exists and is public. These supplemental results do not replace the fresh external audit.

Two original links redirect successfully: [Raspberry Pi software](https://www.raspberrypi.org/software/) to `https://www.raspberrypi.com/software/`, and [I, Pencil](https://fee.org/resources/i-pencil/) to `https://fee.org/ebooks/i-pencil`. They are working links and remain unchanged.

Other sampled URLs, including the Amazon links, AIReader, AIWriter, Doculate, memory.bike, Selfime privacy, the IMadeThis post, and the Panashe client-work fragment, could not be verified by the web fetch tool. Cache misses and tool access errors do not establish that a URL is dead, rate-limited, or bot-blocked. No host exclusions have been justified or added. The external audit remains outstanding, including Goodreads links rendered from `_data/books.yml`.

## Resume the audit

Run where Ruby 3.3.0 has an html-proofer 5 executable on `PATH` and outbound DNS/HTTPS access. The separate local-check Next entry owns adding html-proofer to the Gemfile. These commands keep generated files and the cache inside the ignored `.bundle/` directory. The flags follow [html-proofer's configuration](https://github.com/gjtorikian/html-proofer/blob/main/lib/html_proofer/configuration.rb) and [cache implementation](https://github.com/gjtorikian/html-proofer/blob/main/lib/html_proofer/cache.rb).

```sh
JEKYLL_ENV=production bundle exec jekyll build \
  --destination .bundle/link-audit/site --disable-disk-cache

PARALLEL_PROCESSOR_COUNT=4 htmlproofer .bundle/link-audit/site \
  --hydra '{"max_concurrency":4}' \
  --typhoeus '{"timeout":20,"connecttimeout":20}' \
  --cache '{"storage_dir":".bundle/link-audit/cache","timeframe":{"external":"1d"}}'
```

Confirm each failure before editing: use a moved URL, otherwise a verified archive.org snapshot, otherwise retain the text without the link. Add every change to the table above. Rebuild and repeat the external command; cached failures are rechecked. Record any demonstrated rate limits or bot blocks individually, then run:

```sh
PARALLEL_PROCESSOR_COUNT=4 htmlproofer .bundle/link-audit/site --disable-external \
  --hydra '{"max_concurrency":4}' \
  --typhoeus '{"timeout":20,"connecttimeout":20}'
```

Keep the tracking entry open until the two external passes and internal-only html-proofer check are complete.
