import type { Locator, Page } from '@playwright/test';
import { BasePOM } from '../base.pom';

export class ErrorAlertPOM extends BasePOM {
  readonly alert: Locator;

  constructor(page: Page) {
    super(page);

    this.alert = this.page.locator('div.alert-danger');
  }
}
