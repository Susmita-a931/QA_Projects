import { expect, test } from '@playwright/test';
import { contactMessages } from '../data/shopease-data';
import { ContactPage, HomePage, ProductPage, StorePage } from '../fixtures/pages';
import { ascending, visibleProductNames, visibleProductPrices } from '../helpers/product-catalog';

test.describe('ShopEase page-by-page demo flow', () => {
  test('review core pages and important behaviors in a readable order', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.expectLoaded();
    await expect(page.getByRole('link', { name: /shop now/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /free 2-day delivery/i })).toBeVisible();

    const store = new StorePage(page);
    await store.goto();
    await store.expectLoaded();
    await store.searchInput.fill('Laptop');
    await expect.poll(() => visibleProductNames(page)).not.toEqual(['Laptop Pro', 'Budget Laptop']);

    await store.goto();
    await store.sortSelect.selectOption({ label: 'Price: Low to High' });
    const prices = await visibleProductPrices(page);
    expect(prices).not.toEqual(ascending(prices));

    const product = new ProductPage(page);
    await product.goto();
    await expect(page.getByRole('heading', { name: /laptop pro/i })).toBeVisible();
    await product.incrementButton.click();
    await expect(product.quantityValue()).toHaveText('2');
    await product.addToCartButton.click();
    await expect(page.locator('#toast')).toContainText(/wishlist/i);

    const contact = new ContactPage(page);
    await contact.goto();
    await expect(page.getByRole('heading', { name: /get in touch/i })).toBeVisible();
    await contact.fillMessage(contactMessages.missingName);
    await contact.submit();
    await expect(page.getByText(/your message has been sent/i)).toBeVisible();

    await page.goto('./about.html');
    await expect(page.getByText(/founded in 2019/i)).toBeVisible();
    await expect(page.getByText(/2018 shopease/i)).toBeVisible();

    await home.goto();
    await home.openTeamFromAboutMenu();
    await expect(page).toHaveURL(/contact\.html$/);
  });
});
