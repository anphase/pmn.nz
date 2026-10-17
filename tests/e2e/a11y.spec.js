const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');
const { PAGES, THEMES, VIEWPORTS, url } = require('./pages');

for (const theme of THEMES) {
  for (const width of VIEWPORTS) {
    for (const [name, pagePath] of Object.entries(PAGES)) {
      test(`axe: ${name} at ${width}px (${theme})`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.emulateMedia({ colorScheme: theme });
        await page.goto(url(pagePath));
        const { violations } = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'best-practice'])
          .analyze();
        expect(violations.map(v => `${v.id} (${v.impact}): ${v.nodes.map(n => n.target.join(' ')).join(', ')}`)).toEqual([]);
      });
    }
  }
}
