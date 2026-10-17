// Refreshes docs/quality/dark-mode/: SCREENSHOTS=1 npm run test:e2e -- screenshots
const { test } = require("@playwright/test");

const { PAGES } = require("./pages");
const OUT = process.env.SHOTS_DIR || "docs/quality/dark-mode";

test.skip(!process.env.SCREENSHOTS, "set SCREENSHOTS=1 to refresh the screenshots");

for (const [name, path] of Object.entries(PAGES)) {
  test(name, async ({ page }) => {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    for (const theme of ["light", "dark"]) {
      await page.emulateMedia({ colorScheme: theme });
      for (const width of [375, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        await page.screenshot({ path: `${OUT}/${name}-${theme}-${width}.jpg`, type: "jpeg", quality: 80, fullPage: true });
      }
    }
  });
}
