const { test, expect } = require('@playwright/test');
const { url } = require('./pages');

test('skip link is first, becomes visible and moves focus to main content', async ({ page }) => {
  await page.goto(url('/'));
  await page.keyboard.press('Tab');
  const skip = page.locator('.skip-link');
  await expect(skip).toBeFocused();
  await expect.poll(async () => (await skip.boundingBox()).y).toBeGreaterThanOrEqual(0);
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator('#main-content')).toBeFocused();
});

test('every sidebar link is keyboard reachable with a visible focus ring', async ({ page }) => {
  await page.goto(url('/'));
  const links = page.locator('.sidebar a');
  const expected = new Set(await links.evaluateAll(els => els.map(el => el.getAttribute('href'))));
  const count = expected.size;
  expect(count).toBeGreaterThan(3);
  const seen = new Set();
  for (let i = 0; i < count + 8 && seen.size < count; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      const cs = getComputedStyle(el);
      const outline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
      return { href: el.closest('.sidebar') ? el.getAttribute('href') : null, ring: outline || cs.boxShadow !== 'none' };
    });
    if (info.href === null) continue;
    expect(info.ring, `focus ring on ${info.href}`).toBe(true);
    seen.add(info.href);
  }
  expect([...seen].sort()).toEqual([...expected].sort());
});
