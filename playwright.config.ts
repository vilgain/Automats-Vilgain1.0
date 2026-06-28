import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  //location of test files
  testDir: './tests',
  //enable parallel test execution
  fullyParallel: true,

  timeout: 60000,
  
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    //loginy pro prostředí - změnit pro jiné prostředí
    httpCredentials: {
      username: 'Vilgain',
      password: 'goabroad',
    },

    //base url měnit dle prostředí 
    baseURL: 'https://staging-esh.aktin.cz/',

    //allows to bypass anti-bot detection for automated tests
    launchOptions: {
    args: ['--disable-blink-features=AutomationControlled']
  }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
       },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
       },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],
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

});
