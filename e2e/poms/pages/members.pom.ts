import type { Locator, Page } from '@playwright/test';
import { BasePOM } from '../base.pom';

export class MembersPagePOM extends BasePOM {
  readonly root: Locator;

  readonly pageHeader: Locator;

  constructor(page: Page) {
    super(page);

    this.root = this.page.locator('div.pagecontents');

    this.pageHeader = this.root.getByRole('heading', { name: 'Sign up' });
  }
}
