import type { Page } from '@playwright/test';

const ignoredPatterns = [
  /cdn\.tailwindcss\.com should not be used in production/i,
];

export function collectConsoleErrors(page: Page) {
  const messages: string[] = [];

  page.on('console', message => {
    if (!['error', 'warning'].includes(message.type())) {
      return;
    }

    const text = message.text();
    if (ignoredPatterns.some(pattern => pattern.test(text))) {
      return;
    }

    messages.push(`${message.type()}: ${text}`);
  });

  page.on('pageerror', error => {
    messages.push(`pageerror: ${error.message}`);
  });

  return messages;
}
