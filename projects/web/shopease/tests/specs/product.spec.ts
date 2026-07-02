import { expect, test } from '@playwright/test';
import { knownDefects } from '../data/shopease-data';
import { ProductPage } from '../fixtures/pages';

test.describe('ShopEase product detail', () => {
  test('product quantity cannot be reduced below one and cart action gives feedback', async ({ page }) => {
    test.fail(true, knownDefects.cartToast);
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
});
