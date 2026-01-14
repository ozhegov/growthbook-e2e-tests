import type { Page } from '@playwright/test';

export class BasePOM {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }
}
