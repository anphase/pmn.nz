// WCAG AA (4.5:1) for the colour tokens in assets/css/site.css, in both themes.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const css = fs.readFileSync(path.join(__dirname, "../../assets/css/site.css"), "utf8");

function block(selector) {
  const start = css.indexOf(`${selector} {`);
  assert.notEqual(start, -1, `missing ${selector}`);
  const body = css.slice(start + selector.length + 2, css.indexOf("}", start));
  return Object.fromEntries([...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
}

const light = block(":root");
const dark = block(':root[data-theme="dark"]');
const darkByOs = block(':root:not([data-theme="light"])');

function parse(value) {
  const hex = value.match(/^#([0-9a-f]{6})$/i);
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16)).concat(1);
  const rgba = value.match(/^rgba\(([^)]+)\)$/);
  assert.ok(rgba, `unsupported colour ${value}`);
  return rgba[1].split(",").map(Number);
}

function over([r, g, b, a], [br, bg, bb]) {
  return [r * a + br * (1 - a), g * a + bg * (1 - a), b * a + bb * (1 - a), 1];
}

function luminance([r, g, b]) {
  const [R, G, B] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const TEXT_ON = {
  "--paper": ["--ink", "--muted", "--teal", "--rust"],
  "--surface": ["--ink", "--muted", "--teal", "--rust"],
  glass: ["--ink", "--muted", "--teal", "--rust"],
  "--tint": ["--ink", "--muted", "--rust"],
  "--chip": ["--muted"],
  "--code-bg": ["--ink", "--code-ink", "--hl-comment", "--hl-keyword", "--hl-string", "--hl-number",
    "--hl-function", "--hl-tag", "--hl-attr", "--hl-builtin", "--hl-variable", "--hl-operator", "--hl-error"],
  "--teal": ["--on-teal"],
  "--teal-dark": ["--paper-soft"],
  "--sidebar-top": ["--paper-soft", "--sidebar-accent"],
  "--sidebar-bottom": ["--paper-soft", "--sidebar-accent"],
};

function background(theme, name) {
  if (name === "glass") return over(parse(theme["--surface-glass"]), parse(theme["--paper"]));
  return parse(theme[name]);
}

// Dark blocks override :root, so unset dark tokens inherit the light value.
for (const [label, theme] of [["light", light], ["dark", { ...light, ...dark }]]) {
  test(`${label} theme text tokens meet WCAG AA`, () => {
    const failures = [];
    for (const [bgName, texts] of Object.entries(TEXT_ON)) {
      const bg = background(theme, bgName);
      for (const text of texts) {
        const r = ratio(over(parse(theme[text]), bg), bg);
        if (r < 4.5) failures.push(`${text} on ${bgName}: ${r.toFixed(2)}`);
      }
    }
    assert.deepEqual(failures, []);
  });
}

test("the OS-preference dark block matches the explicit dark block", () => {
  assert.deepEqual(darkByOs, dark);
});

test("every dark token has a light default", () => {
  assert.deepEqual(Object.keys(dark).filter((k) => !(k in light)), []);
});

test("ratio matches known WCAG values", () => {
  assert.equal(ratio([0, 0, 0, 1], [255, 255, 255, 1]).toFixed(1), "21.0");
  assert.equal(ratio([118, 118, 118, 1], [255, 255, 255, 1]).toFixed(2), "4.54");
});
