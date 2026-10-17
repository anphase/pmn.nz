#!/bin/bash
# Fast guard for the PageSpeed work: checks a built site directory (default _site).
# Fails on third-party font requests, more than one stylesheet, images without
# width/height, a missing preloaded font, or oversized raster images.
set -u
site="${1:-_site}"
fail=0
bad() { echo "FAIL: $1"; fail=1; }

pages=$(find "$site" -name '*.html')
[ -n "$pages" ] || { echo "FAIL: no html under $site"; exit 1; }

for f in $pages; do
  grep -q 'fonts.googleapis.com\|fonts.gstatic.com' "$f" && bad "$f loads Google Fonts"
  [ "$(grep -o '<link rel="stylesheet"' "$f" | wc -l)" -le 1 ] || bad "$f has more than one stylesheet"
  grep -o '<img [^>]*>' "$f" | grep -v 'class="image-modal-image"' | grep -v 'width=.* height=\|height=.* width=' | grep -q . && bad "$f has an img without width and height"
  preload=$(grep -o 'rel="preload"[^>]*href="[^"]*woff2"' "$f" | sed 's/.*href="\([^"]*\)"/\1/' | head -1)
  [ -z "$preload" ] || [ -f "$site$preload" ] || bad "$f preloads a missing font $preload"
done

find "$site/assets" \( -name '*.png' -o -name '*.jpg' \) -size +100k | grep . && bad "raster image over 100 KB (convert to WebP)"
find "$site/assets" -name '*.woff2' | grep -q . || bad "no self-hosted woff2 fonts"
[ "$fail" = 0 ] && echo "ok: perf asset checks passed for $site"
exit "$fail"
