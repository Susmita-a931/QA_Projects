import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly heroHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroHeading = page.getByRole('heading', { name: /quality products/i });
  }

  async goto() {
    await this.page.goto('./');
  }

  async expectLoaded() {
    await expect(this.heroHeading).toBeVisible();
    await expect(this.page.getByRole('heading', { name: /featured products/i })).toBeVisible();
  }
}

export class StorePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly categoryFilter: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('#search-input');
    this.categoryFilter = page.locator('#category-filter');
    this.sortSelect = page.locator('#sort-select');
  }

  async goto() {
    await this.page.goto('./store.html');
  }

  products() {
    return this.page.locator('[data-testid="product-card"], .product-card, a:has-text("$")');
  }

  async expectLoaded() {
    await expect(this.page.getByRole('heading', { name: /all products/i })).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.categoryFilter).toBeVisible();
    await expect(this.sortSelect).toBeVisible();
  }
}

export class ProductPage {
  readonly page: Page;
  readonly incrementButton: Locator;
  readonly decrementButton: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.incrementButton = page.getByRole('button', { name: '+' });
    this.decrementButton = page.getByRole('button', { name: /-|−/ });
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
  }

  async goto() {
    await this.page.goto('./product.html');
  }

  quantityValue() {
    return this.page.locator('#quantity, [data-testid="quantity"]').or(this.page.getByText(/^\d+$/)).first();
  }
}

export class ContactPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('./contact.html');
  }

  async fillMessage() {
    await this.page.locator('#f-name').fill('Susmita Dey Sarkar');
    await this.page.locator('#f-email').fill('susmita.qa@example.com');
    await this.page.locator('#f-phone').fill('9876543210');
    await this.page.locator('#f-subject').fill('Automation test message');
    await this.page.locator('#f-message').fill('This message validates the public demo contact form behavior.');
  }
}
