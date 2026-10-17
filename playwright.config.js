const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests/e2e',
  globalSetup: require.resolve('./tests/e2e/global-setup.js'),
  workers: 4,
  retries: 0,
  reporter: 'list',
  timeout: 15000,
  // Workers start after globalSetup, so they see the URL it serves the build on.
  use: { browserName: 'chromium', baseURL: process.env.E2E_BASE_URL, actionTimeout: 5000 },
});
