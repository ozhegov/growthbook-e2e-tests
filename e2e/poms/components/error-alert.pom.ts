import type { Locator, Page } from '@playwright/test';
import { BasePOM } from '../base.pom';

export class ErrorAlertPOM extends BasePOM {
  readonly dangerAlert: Locator;
  readonly noticeAlert: Locator;

  constructor(page: Page) {
    super(page);

    this.dangerAlert = this.page.locator('div.alert-danger');
    this.noticeAlert = this.page.locator('div.alert-secondary');
  }
}
