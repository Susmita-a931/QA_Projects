import { expect, test } from '@playwright/test';
import { expectedLaptopSearchResults, knownDefects } from '../data/shopease-data';
import { StorePage } from '../fixtures/pages';
import { ascending, visibleProductNames, visibleProductPrices } from '../helpers/product-catalog';

test.describe('ShopEase store catalog', () => {
  test('store search narrows products by keyword', async ({ page }) => {
    test.fail(true, knownDefects.search);
    const store = new StorePage(page);

    await store.goto();
    await store.expectLoaded();
    await store.searchInput.fill('Laptop');

    await expect.poll(() => visibleProductNames(page)).toEqual(expectedLaptopSearchResults);
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
    test.fail(true, knownDefects.sort);
    const store = new StorePage(page);

    await store.goto();
    await store.expectLoaded();
    await store.sortSelect.selectOption({ label: 'Price: Low to High' });

    const prices = await visibleProductPrices(page);
    expect(prices).toEqual(ascending(prices));
  });
});
