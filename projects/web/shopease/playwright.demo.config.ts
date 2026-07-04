import baseConfig from './playwright.config';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  ...baseConfig,
  testDir: './tests/demo',
  testIgnore: [],
  fullyParallel: false,
  workers: 1,
  reporter: [['html', { outputFolder: 'evidence/reports/playwright-demo-html', open: 'never' }], ['list']],
  use: {
    ...baseConfig.use,
    video: 'on',
    trace: 'on',
  },
  projects: [
    {
      name: 'chromium-demo',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
