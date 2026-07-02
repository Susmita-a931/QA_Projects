import { expect, type Locator, type Page } from '@playwright/test';

type ContactMessage = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

type LoginCredentials = {
  email?: string;
  password?: string;
};

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

  async openTeamFromAboutMenu() {
    await this.page.getByRole('button', { name: /about/i }).click();
    await this.page.getByRole('link', { name: /meet the team/i }).click();
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
    this.decrementButton = page.locator('button[onclick="changeQty(-1)"]');
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
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#f-name');
    this.emailInput = page.locator('#f-email');
    this.phoneInput = page.locator('#f-phone');
    this.subjectInput = page.locator('#f-subject');
    this.messageInput = page.locator('#f-message');
    this.submitButton = page.getByRole('button', { name: /send message/i });
  }

  async goto() {
    await this.page.goto('./contact.html');
  }

  async fillMessage(message: ContactMessage) {
    if (message.name !== undefined) {
      await this.nameInput.fill(message.name);
    }
    if (message.email !== undefined) {
      await this.emailInput.fill(message.email);
    }
    if (message.phone !== undefined) {
      await this.phoneInput.fill(message.phone);
    }
    if (message.subject !== undefined) {
      await this.subjectInput.fill(message.subject);
    }
    if (message.message !== undefined) {
      await this.messageInput.fill(message.message);
    }
  }

  async submit() {
    await this.submitButton.click();
  }
}

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#login-email');
    this.passwordInput = page.locator('#login-password');
  }

  async goto() {
    await this.page.goto('./login.html');
  }

  async expectLoginPanel() {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async expectRegisterPanel() {
    await expect(this.page.getByPlaceholder('John')).toBeVisible();
    await expect(this.page.getByPlaceholder('Doe')).toBeVisible();
    await expect(this.page.getByPlaceholder('Min. 8 characters')).toBeVisible();
  }

  async openRegisterPanel() {
    await this.page.getByRole('button', { name: /^register$/i }).first().click();
  }

  async openLoginPanel() {
    await this.page.getByRole('button', { name: /^login$/i }).first().click();
  }

  async login(credentials: LoginCredentials) {
    if (credentials.email !== undefined) {
      await this.emailInput.fill(credentials.email);
    }
    if (credentials.password !== undefined) {
      await this.passwordInput.fill(credentials.password);
    }
    await this.page.getByRole('button', { name: /^sign in$/i }).click();
  }
}

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('./dashboard.html');
  }

  async expectLoaded() {
    await expect(this.page.getByRole('heading', { name: /recent orders/i })).toBeVisible();
  }

  orderRow(orderId: string) {
    return this.page.locator('tr', { hasText: `#${orderId}` });
  }

  async deleteOrder(orderId: string) {
    await this.orderRow(orderId).getByRole('button', { name: /delete/i }).click();
  }
}

export class AboutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('./about.html');
  }

  async foundingYear() {
    const bodyText = await this.page.locator('body').innerText();
    return bodyText.match(/Founded in (\d{4})/)?.[1];
  }

  async footerYear() {
    const bodyText = await this.page.locator('body').innerText();
    return bodyText.match(/\u00a9\s*(\d{4})\s*ShopEase/)?.[1];
  }
}
