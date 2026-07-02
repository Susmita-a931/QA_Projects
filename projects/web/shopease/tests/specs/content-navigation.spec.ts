import { expect, test } from '@playwright/test';
import { knownDefects } from '../data/shopease-data';
import { AboutPage, HomePage } from '../fixtures/pages';

test.describe('ShopEase content and navigation', () => {
  test('about page founding year matches the site footer year', async ({ page }) => {
    test.fail(true, knownDefects.foundingYear);
    const about = new AboutPage(page);

    await about.goto();

    expect(await about.foundingYear()).toBeTruthy();
    expect(await about.footerYear()).toBeTruthy();
    expect(await about.foundingYear()).toBe(await about.footerYear());
  });

  test('about menu Meet the Team link opens the team page', async ({ page }) => {
    test.fail(true, knownDefects.teamNavigation);
    const home = new HomePage(page);

    await home.goto();
    await home.openTeamFromAboutMenu();

    await expect(page).toHaveURL(/team\.html$/);
    await expect(page.getByRole('heading', { name: /our team/i })).toBeVisible();
  });
});
