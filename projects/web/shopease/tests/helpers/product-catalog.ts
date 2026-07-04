import { expect, type Page } from '@playwright/test';

export async function visibleProductNames(page: Page) {
  const cardTexts = await visibleProductCardTexts(page);
  return cardTexts.map(text => text.split('\n').map(line => line.trim()).filter(Boolean)[0]);
}

export async function visibleProductPrices(page: Page) {
  const cardTexts = await visibleProductCardTexts(page);
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

async function visibleProductCardTexts(page: Page) {
  const cards = page.locator('.product-card:visible, a:has-text("$"):visible');
  const cardTexts = await cards.allTextContents();

  expect(cardTexts.length).toBeGreaterThan(0);

  return cardTexts;
}
