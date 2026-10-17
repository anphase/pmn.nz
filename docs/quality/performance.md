# Performance (PageSpeed)

Local Lighthouse 13 (performance category only), headless Chrome, median of 3 runs, against the production Jekyll build served from a local static server (no CDN, no compression). Mobile uses Lighthouse's default throttled profile; desktop uses `--preset=desktop`. Newest post is `/blog/2026/09/20/the-long-game/`.

## Before / after

| Page | Form | Perf before | Perf after | LCP before | LCP after | CLS before | CLS after | Transfer before | Transfer after | Requests |
|---|---|---|---|---|---|---|---|---|---|---|
| Home | mobile | 99 | 100 | 1638 ms | 1505 ms | 0.006 | 0.005 | 156 KB | 121 KB | 9 → 5 |
| Home | desktop | 97 | 100 | 943 ms | 363 ms | 0.025 | 0.002 | 156 KB | 121 KB | 9 → 5 |
| Newest post | mobile | 74 | 99 | 4581 ms | 2029 ms | 0.043 | 0.042 | 952 KB | 226 KB | 13 → 9 |
| Newest post | desktop | 85 | 99 | 1026 ms | 456 ms | 0.247 | 0.079 | 1494 KB | 275 KB | 14 → 10 |
| Books | mobile | 98 | 98 | 1925 ms | 2402 ms | 0.002 | 0.001 | 456 KB | 422 KB | 13 → 9 |
| Books | desktop | 100 | 100 | 684 ms | 524 ms | 0.034 | 0.000 | 1006 KB | 972 KB | 20 → 16 |

Individual runs before (mobile): post 63/74/89, books 82/98/98, home 88/99/99. After (mobile): post 99/99/99, books 98/98/98, home 100/100/100. Mobile Performance is 95 or above on all three pages. Books mobile LCP moved up (1925 → 2402 ms) while the score held at 98.

## What changed

- **Fonts**: Google Fonts (two cross-origin hosts, render-blocking CSS) replaced by self-hosted latin subsets of the Fraunces and Inter variable fonts, `font-display: swap`, in `assets/fonts/` (Fraunces 55 KB, Inter 25 KB; weight axes limited to the 500-800 and 400-800 the site uses, opsz axis kept). Fraunces (headings, above the fold) is preloaded.
- **CSS**: `poole.css`, `syntax.css`, `hyde.css` and `custom.css` (29,063 B, 4 requests) merged into `assets/css/site.css` (29,482 B including the `@font-face` rules, 1 request), same cascade order. Regenerated after the dark-mode tokens landed, so edit site.css directly now; there are no separate source files.
- **Post images**: the four Selfime PNGs (1,361,262 B) are now WebP at their natural pixel size (148,142 B), saving 1,213,120 B (89%). The `width`/`height` attributes were already present and are unchanged; the two below-the-fold figures already had `loading="lazy"`, and the two figures at the top stay eager because they are in the first viewport. The image modal opens the same WebP file, so nothing is downscaled.
- **Social card**: the post front matter `image` points at a 1132 px JPEG (`phone-experience-social.jpg`, under 100 KB) so og:image and the Twitter card stay in a format every crawler renders; it is not loaded by the page itself.
- **Book covers**: already had `width="512" height="768"` and `loading="lazy"` on books.md and the book layout, so no change was needed.

## Visual check

Top 2400 px of each page at 375 and 1280 px, before and after, in `docs/quality/performance/` (`{home,post,books}-{375,1280}-{before,after}.webp`). Full-page height is identical in all six pairs, so there is no layout shift; remaining pixel differences are text anti-aliasing from the re-subset fonts and WebP image encoding.

## Guard

`scripts/check-perf-assets.sh [built-site-dir]` fails on Google Fonts requests, more than one stylesheet, images without width and height, a missing preloaded font and rasters over 100 KB. It fails on the pre-change build and passes on the current one.

## Reproducing

Build with `JEKYLL_ENV=production bundle exec jekyll build --destination <dir>`, serve the directory on a free port, then run `lighthouse <url> --only-categories=performance [--preset=desktop]` three times per page and take the median.

Final re-run after the social-card change (median of 3): post mobile 99 (LCP 2029 ms, CLS 0.042), books mobile 98, home mobile 100; desktop 99, 100, 100. Post CLS (0.042 mobile, 0.079 desktop) is the font-swap shift on the heading and is within the "good" threshold of 0.1.
