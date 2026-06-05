import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  use: {
    baseURL: 'https://myezra-staging.ezra.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
});