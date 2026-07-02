import { expect, test } from '@playwright/test';
import { sitePages } from '../data/shopease-data';
import { HomePage } from '../fixtures/pages';
import { collectConsoleErrors } from '../helpers/console-monitor';

test.describe('ShopEase smoke coverage', () => {
  test('@smoke home page presents the core shopping entry points', async ({ page }) => {
    const errors = collectConsoleErrors(page);
    const home = new HomePage(page);

    await home.goto();
    await home.expectLoaded();

    await expect(page.getByRole('link', { name: /shop now/i })).toHaveAttribute('href', /store\.html/);
    await expect(page.getByRole('link', { name: /login/i })).toHaveAttribute('href', /login\.html/);
    await expect(page.getByRole('heading', { name: /free 2-day delivery/i })).toBeVisible();
    expect(errors).toEqual([]);
  });

  for (const target of sitePages) {
    test(`@smoke internal page loads: ${target.path}`, async ({ page }) => {
      const errors = collectConsoleErrors(page);

      await page.goto(target.path);

      await expect(page.getByRole('heading', { name: target.heading })).toBeVisible();
      expect(errors).toEqual([]);
    });
  }
});
