import { expect, type Page } from '@playwright/test';

export async function visibleProductNames(page: Page) {
  return page.locator('.product-card:visible h3').allTextContents();
}

export async function visibleProductPrices(page: Page) {
  const cardTexts = await page.locator('.product-card:visible').allTextContents();
  const prices = cardTexts.map((text: string) => {
    const match = text.match(/\$([\d,]+)/);
    return match ? Number(match[1].replace(/,/g, '')) : Number.NaN;
  });

  expect(prices.length).toBeGreaterThan(0);
  expect(prices.every((price: number) => Number.isFinite(price))).toBe(true);

  return prices;
}

export function ascending(values: number[]) {
  return [...values].sort((first, second) => first - second);
}
