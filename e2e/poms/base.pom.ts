import type { Locator, Page } from '@playwright/test';

export class BasePOM {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async selectOptionInDropdown(selector: Locator, optionsList: Locator, value: string) {
    await selector.click();
    await optionsList.getByText(value).click();
  }
}
