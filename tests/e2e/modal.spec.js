const { test, expect } = require('@playwright/test');
const { newestPost, url } = require('./pages');

async function openFirstImage(page) {
  await page.goto(url(newestPost));
  const link = page.locator('.post a[aria-haspopup="dialog"]').first();
  await link.focus();
  await page.keyboard.press('Enter');
  return link;
}

test('image modal opens by keyboard, moves focus in, Escape closes and focus returns', async ({ page }) => {
  const link = await openFirstImage(page);
  const dialog = page.locator('#image-modal');
  await expect(dialog).toBeVisible();
  await expect(page.locator('.image-modal-close')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(link).toBeFocused();
});

test('image modal closes with the close button by keyboard and focus returns', async ({ page }) => {
  const link = await openFirstImage(page);
  await expect(page.locator('#image-modal')).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('#image-modal')).toBeHidden();
  await expect(link).toBeFocused();
});
