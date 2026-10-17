const { test, expect } = require("@playwright/test");
const { PAGES } = require("./pages");

const html = (page) => page.locator("html");
const expectTheme = (page, theme) =>
  theme ? expect(html(page)).toHaveAttribute("data-theme", theme) : expect(html(page)).not.toHaveAttribute("data-theme");
const background = (page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

// Mutation testing: Stryker selects its mutant by env var, which the browser cannot read.
test.beforeEach(async ({ context }) => {
  const mutant = process.env.__STRYKER_ACTIVE_MUTANT__;
  if (mutant) await context.addInitScript((id) => { window.__stryker__ = { activeMutant: id }; }, mutant);
});

test("defaults to the OS preference with no data-theme attribute", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expectTheme(page, null);
  await expect(page.getByRole("button", { name: "System" })).toHaveAttribute("aria-pressed", "true");
  const darkBg = await background(page);

  await page.emulateMedia({ colorScheme: "light" });
  expect(await background(page)).not.toBe(darkBg);
});

test("toggle sets data-theme and persists across reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const lightBg = await background(page);

  await page.getByRole("button", { name: "Dark" }).click();
  await expectTheme(page, "dark");
  await expect(page.getByRole("button", { name: "Dark" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Light" })).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByRole("button", { name: "System" })).toHaveAttribute("aria-pressed", "false");
  expect(await background(page)).not.toBe(lightBg);

  await page.reload();
  await expectTheme(page, "dark");
  await expect(page.getByRole("button", { name: "Dark" })).toHaveAttribute("aria-pressed", "true");

  await page.goto("/books/");
  await expectTheme(page, "dark");

  await page.emulateMedia({ colorScheme: "dark" });
  await page.getByRole("button", { name: "Light" }).click();
  await expectTheme(page, "light");
  await page.reload();
  await expectTheme(page, "light");
  expect(await background(page)).toBe(lightBg);

  await page.getByRole("button", { name: "System" }).click();
  await expectTheme(page, null);
  await page.reload();
  await expectTheme(page, null);
  expect(await background(page)).not.toBe(lightBg);
});

test("a choice made in one tab reaches other open tabs", async ({ page, context }) => {
  await page.goto("/");
  const other = await context.newPage();
  await other.goto("/blog/");

  await page.getByRole("button", { name: "Dark" }).click();
  await expectTheme(other, "dark");
  await expect(other.getByRole("button", { name: "Dark" })).toHaveAttribute("aria-pressed", "true");

  await page.getByRole("button", { name: "System" }).click();
  await expectTheme(other, null);
  await expect(other.getByRole("button", { name: "System" })).toHaveAttribute("aria-pressed", "true");
});

test("theme is applied before first paint", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("theme", "dark");
    window.__firstTheme = null;
    new MutationObserver(() => {
      if (document.body && window.__firstTheme === null) {
        window.__firstTheme = document.documentElement.getAttribute("data-theme") || "";
      }
    }).observe(document, { childList: true, subtree: true });
  });
  await page.goto("/");
  expect(await page.evaluate(() => window.__firstTheme)).toBe("dark");
});

test("still renders when localStorage throws", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() { throw new Error("blocked"); },
    });
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e));
  await page.goto("/");
  await page.getByRole("button", { name: "Dark" }).click();
  await expectTheme(page, "dark");
  expect(errors).toEqual([]);
});

for (const path of Object.values(PAGES)) {
  test(`no horizontal overflow at 375px on ${path} in either theme`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto(path);
    for (const theme of ["light", "dark"]) {
      await page.emulateMedia({ colorScheme: theme });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, theme).toBeLessThanOrEqual(0);
    }
  });
}
