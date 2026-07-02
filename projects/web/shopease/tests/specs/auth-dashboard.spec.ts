import { expect, test } from '@playwright/test';
import { knownDefects, loginUsers } from '../data/shopease-data';
import { DashboardPage, LoginPage } from '../fixtures/pages';

test.describe('ShopEase login and dashboard', () => {
  test('login and registration panels expose the correct fields', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.expectLoginPanel();
    await login.openRegisterPanel();
    await login.expectRegisterPanel();
    await login.openLoginPanel();
    await login.expectLoginPanel();
  });

  test('login requires email before accepting credentials', async ({ page }) => {
    test.fail(true, knownDefects.emptyLoginEmail);
    const login = new LoginPage(page);

    await login.goto();
    await login.login({ password: loginUsers.emptyEmail.password });

    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/welcome back!/i)).toBeHidden();
  });

  test('login shows safe error message for invalid password', async ({ page }) => {
    test.fail(true, knownDefects.unsafeLoginError);
    const login = new LoginPage(page);

    await login.goto();
    await login.login(loginUsers.invalidPassword);

    await expect(page.getByText(/invalid email or password/i)).toBeVisible();
    await expect(page.getByText(/server error|500/i)).toBeHidden();
  });

  test('dashboard delete removes the selected order row', async ({ page }) => {
    test.fail(true, knownDefects.dashboardDelete);
    const dashboard = new DashboardPage(page);

    await dashboard.goto();
    await dashboard.expectLoaded();
    await dashboard.deleteOrder('1001');

    await expect(page.getByText(/order deleted successfully/i)).toBeVisible();
    await expect(dashboard.orderRow('1001')).toBeHidden();
  });
});
