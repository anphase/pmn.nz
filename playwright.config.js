const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: 'tests/e2e',
  globalSetup: require.resolve('./tests/e2e/global-setup.js'),
  workers: 4,
  retries: 0,
  reporter: 'list',
  use: { browserName: 'chromium' },
});
