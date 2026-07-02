import { expect, test } from '@playwright/test';
import { contactMessages, knownDefects } from '../data/shopease-data';
import { ContactPage } from '../fixtures/pages';

test.describe('ShopEase contact form', () => {
  test('contact page validates required fields and accepts a complete message', async ({ page }) => {
    const contact = new ContactPage(page);

    await contact.goto();
    await expect(page.getByRole('heading', { name: /get in touch/i })).toBeVisible();

    await contact.submit();
    await expect(page.getByText(/email is required/i)).toBeVisible();

    await contact.fillMessage(contactMessages.valid);
    await contact.submit();
    await expect(page.getByText(/your message has been sent/i)).toBeVisible();
  });

  test('contact page blocks submission when required name is missing', async ({ page }) => {
    test.fail(true, knownDefects.missingContactName);
    const contact = new ContactPage(page);

    await contact.goto();
    await contact.fillMessage(contactMessages.missingName);
    await contact.submit();

    await expect(page.getByText(/name is required/i)).toBeVisible();
    await expect(page.getByText(/your message has been sent/i)).toBeHidden();
  });

  test('contact page validates phone number format', async ({ page }) => {
    test.fail(true, knownDefects.invalidContactPhone);
    const contact = new ContactPage(page);

    await contact.goto();
    await contact.fillMessage(contactMessages.invalidPhone);
    await contact.submit();

    await expect(page.getByText(/phone must contain only numbers/i)).toBeVisible();
    await expect(page.getByText(/your message has been sent/i)).toBeHidden();
  });
});
