import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  //location of test files
  testDir: './tests',
  //enable parallel test execution
  fullyParallel: true,
  
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'https://staging-esh.aktin.cz/',
       },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
        baseURL: 'https://staging-esh.aktin.cz/',
       },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],
        baseURL: 'https://staging-esh.aktin.cz/',
       },
    },

    /* Test against mobile viewports. */
    {
    name: 'Mobile Chrome',
    use: { ...devices['Pixel 6'] },
    },
    {
    name: 'Mobile Safari',
    use: { ...devices['iPhone 13'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
