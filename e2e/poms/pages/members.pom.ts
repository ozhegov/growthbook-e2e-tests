import type { Locator, Page } from '@playwright/test';
import { URLS } from '../../constants/urls';
import { BasePOM } from '../base.pom';

export class MembersPagePOM extends BasePOM {
  readonly root: Locator;

  readonly pageHeader: Locator;

  constructor(page: Page) {
    super(page);
    this.root = this.page.locator('div.pagecontents');

    this.pageHeader = this.root.getByRole('heading', { name: 'Team Members' });
  }

  async open() {
    await super.open(URLS.SETTINGS_MEMBERS);
  }
}
