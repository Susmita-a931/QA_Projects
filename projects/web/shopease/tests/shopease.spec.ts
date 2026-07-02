import { expect, test } from '@playwright/test';
import { collectConsoleErrors } from './helpers/console-monitor';
import { ContactPage, HomePage, ProductPage, StorePage } from './fixtures/pages';

const internalPages = [
  { path: './', heading: /quality products/i },
  { path: './store.html', heading: /all products/i },
  { path: './about.html', heading: /our story/i },
  { path: './contact.html', heading: /get in touch/i },
  { path: './login.html', heading: /welcome back/i },
  { path: './product.html', heading: /laptop pro/i },
];

test.describe('ShopEase public website', () => {
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

  for (const target of internalPages) {
    test(`@smoke internal page loads: ${target.path}`, async ({ page }) => {
      const errors = collectConsoleErrors(page);

      await page.goto(target.path);

      await expect(page.getByRole('heading', { name: target.heading })).toBeVisible();
      expect(errors).toEqual([]);
    });
  }

  test('store search narrows products by keyword', async ({ page }) => {
    test.fail(true, 'Known defect: searching for Laptop hides laptop products instead of returning them.');
    const store = new StorePage(page);

    await store.goto();
    await store.expectLoaded();
    await store.searchInput.fill('Laptop');

    await expect(page.getByText(/laptop pro/i)).toBeVisible();
    await expect(page.getByText(/wireless headphones/i)).toBeHidden();
  });

  test('store category filter and sort controls are usable', async ({ page }) => {
    const store = new StorePage(page);

    await store.goto();
    await store.expectLoaded();

    const categoryOptions = await store.categoryFilter.locator('option').allTextContents();
    expect(categoryOptions.join(' ')).toMatch(/electronics|accessories|all/i);

    await store.sortSelect.selectOption({ index: 1 });
    await expect(store.sortSelect).not.toHaveValue('');
  });

  test('product quantity cannot be reduced below one and cart action gives feedback', async ({ page }) => {
    test.fail(true, 'Known defect: Add to Cart currently shows a wishlist confirmation message.');
    const product = new ProductPage(page);

    await product.goto();

    await expect(page.getByRole('heading', { name: /laptop pro/i })).toBeVisible();
    await expect(page.getByText(/\$1,299/)).toBeVisible();

    await product.decrementButton.click();
    await expect(product.quantityValue()).toHaveText('1');

    await product.incrementButton.click();
    await expect(product.quantityValue()).toHaveText('2');

    await product.addToCartButton.click();
    await expect(page.locator('#toast')).toContainText(/cart/i);
  });

  test('contact page validates required fields and accepts a complete message', async ({ page }) => {
    const contact = new ContactPage(page);

    await contact.goto();
    await expect(page.getByRole('heading', { name: /get in touch/i })).toBeVisible();

    await page.getByRole('button', { name: /send message/i }).click();
    await expect(page.getByText(/email is required/i)).toBeVisible();

    await contact.fillMessage();
    await page.getByRole('button', { name: /send message/i }).click();
    await expect(page.getByText(/your message has been sent/i)).toBeVisible();
  });

  test('login and registration panels expose the correct fields', async ({ page }) => {
    await page.goto('./login.html');

    await expect(page.locator('#login-email')).toBeVisible();
    await expect(page.locator('#login-password')).toBeVisible();

    await page.getByRole('button', { name: /^register$/i }).first().click();
    await expect(page.getByPlaceholder('John')).toBeVisible();
    await expect(page.getByPlaceholder('Doe')).toBeVisible();
    await expect(page.getByPlaceholder('Min. 8 characters')).toBeVisible();

    await page.getByRole('button', { name: /^login$/i }).first().click();
    await expect(page.locator('#login-email')).toBeVisible();
  });
});
