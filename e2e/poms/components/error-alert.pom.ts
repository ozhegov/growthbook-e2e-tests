import type { Locator, Page } from '@playwright/test';
import { BasePOM } from '../base.pom';

export class ErrorAlertPOM extends BasePOM {
  readonly root: Locator;

  constructor(page: Page) {
    super(page);

    this.root = this.page.locator('div.alert-danger');
  }
}
