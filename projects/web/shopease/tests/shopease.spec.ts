import { expect, test, type Page } from '@playwright/test';
import { collectConsoleErrors } from './helpers/console-monitor';
import { ContactPage, HomePage, ProductPage, StorePage } from './fixtures/pages';

const internalPages = [
  { path: './', heading: /quality products/i },
  { path: './store.html', heading: /all products/i },
  { path: './about.html', heading: /our story/i },
  { path: './contact.html', heading: /get in touch/i },
  { path: './login.html', heading: /welcome back/i },
  { path: './dashboard.html', heading: /recent orders/i },
  { path: './team.html', heading: /our team/i },
  { path: './product.html', heading: /laptop pro/i },
];

async function visibleProductNames(page: Page) {
  return page.locator('.product-card:visible h3').allTextContents();
}

async function visibleProductPrices(page: Page) {
  const cardTexts = await page.locator('.product-card:visible').allTextContents();
  const prices = cardTexts.map((text: string) => {
    const match = text.match(/\$([\d,]+)/);
    return match ? Number(match[1].replace(/,/g, '')) : Number.NaN;
  });

  expect(prices.length).toBeGreaterThan(0);
  expect(prices.every((price: number) => Number.isFinite(price))).toBe(true);

  return prices;
}

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

    await expect.poll(() => visibleProductNames(page)).toEqual(['Laptop Pro', 'Budget Laptop']);
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

  test('store low-to-high price sort displays products in ascending order', async ({ page }) => {
    test.fail(true, 'Known defect: low-to-high price sort displays products in descending order.');
    const store = new StorePage(page);

    await store.goto();
    await store.expectLoaded();
    await store.sortSelect.selectOption({ label: 'Price: Low to High' });

    const prices = await visibleProductPrices(page);
    const ascendingPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(ascendingPrices);
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

  test('contact page blocks submission when required name is missing', async ({ page }) => {
    test.fail(true, 'Known defect: contact form submits successfully when the required name field is empty.');
    const contact = new ContactPage(page);

    await contact.goto();
    await page.locator('#f-email').fill('susmita.qa@example.com');
    await page.locator('#f-message').fill('Please confirm whether the required name field is validated.');
    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByText(/name is required/i)).toBeVisible();
    await expect(page.getByText(/your message has been sent/i)).toBeHidden();
  });

  test('contact page validates phone number format', async ({ page }) => {
    test.fail(true, 'Known defect: phone number field accepts non-numeric characters.');
    const contact = new ContactPage(page);

    await contact.goto();
    await page.locator('#f-name').fill('Susmita Dey Sarkar');
    await page.locator('#f-email').fill('susmita.qa@example.com');
    await page.locator('#f-phone').fill('abcdef');
    await page.locator('#f-message').fill('Please validate that phone accepts digits only.');
    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByText(/phone must contain only numbers/i)).toBeVisible();
    await expect(page.getByText(/your message has been sent/i)).toBeHidden();
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

  test('login requires email before accepting credentials', async ({ page }) => {
    test.fail(true, 'Known defect: login succeeds when email is empty and password has a value.');

    await page.goto('./login.html');
    await page.locator('#login-password').fill('any-password');
    await page.getByRole('button', { name: /^sign in$/i }).click();

    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/welcome back!/i)).toBeHidden();
  });

  test('login shows safe error message for invalid password', async ({ page }) => {
    test.fail(true, 'Known defect: invalid password shows Server Error 500 instead of a safe login error.');

    await page.goto('./login.html');
    await page.locator('#login-email').fill('user@test.com');
    await page.locator('#login-password').fill('wrongpassword');
    await page.getByRole('button', { name: /^sign in$/i }).click();

    await expect(page.getByText(/invalid email or password/i)).toBeVisible();
    await expect(page.getByText(/server error|500/i)).toBeHidden();
  });

  test('dashboard delete removes the selected order row', async ({ page }) => {
    test.fail(true, 'Known defect: delete success toast appears but the order row remains visible.');

    await page.goto('./dashboard.html');
    const orderRow = page.locator('tr', { hasText: '#1001' });

    await expect(orderRow).toBeVisible();
    await orderRow.getByRole('button', { name: /delete/i }).click();

    await expect(page.getByText(/order deleted successfully/i)).toBeVisible();
    await expect(orderRow).toBeHidden();
  });

  test('about page founding year matches the site footer year', async ({ page }) => {
    test.fail(true, 'Known defect: About page founding year conflicts with the site footer year.');

    await page.goto('./about.html');

    const bodyText = await page.locator('body').innerText();
    const foundedYear = bodyText.match(/Founded in (\d{4})/)?.[1];
    const footerYear = bodyText.match(/\u00a9\s*(\d{4})\s*ShopEase/)?.[1];

    expect(foundedYear).toBeTruthy();
    expect(footerYear).toBeTruthy();
    expect(foundedYear).toBe(footerYear);
  });

  test('about menu Meet the Team link opens the team page', async ({ page }) => {
    test.fail(true, 'Known defect: Meet the Team navigation opens the contact page instead of the team page.');

    await page.goto('./');
    await page.getByRole('button', { name: /about/i }).click();
    await page.getByRole('link', { name: /meet the team/i }).click();

    await expect(page).toHaveURL(/team\.html$/);
    await expect(page.getByRole('heading', { name: /our team/i })).toBeVisible();
  });
});
