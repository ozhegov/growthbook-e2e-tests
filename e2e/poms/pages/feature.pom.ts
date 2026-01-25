import type { Locator, Page } from '@playwright/test';
import { FEATURE_PAGE, URLS } from '../../constants';
import { BasePOM } from '../base.pom';

export class FeaturePagePOM extends BasePOM {
  readonly root: Locator;

  /** Верхнее меню */
  readonly actionButton: Locator;
  readonly box: (value: string) => Locator;

  /** Дополнительное меню */
  readonly actionMenu: Locator;
  readonly archiveButton: Locator;
  readonly unarchiveButton: Locator;

  /** Модальное окно Archive Feature*/
  readonly archiveFeatureModal: Locator;
  readonly archiveFeatureModalHeader: Locator;
  readonly archiveModalArchivelButton: Locator;

  /** Модальное окно Unarchive Feature*/
  readonly unarchiveFeatureModal: Locator;
  readonly unarchiveFeatureModalHeader: Locator;
  readonly unarchiveModalUnarchivelButton: Locator;

  /** Секция Description */
  readonly description: Locator;

  /** Секция Enabled Environments */
  readonly envSwitch: (env: string) => Locator;

  constructor(page: Page) {
    super(page);

    this.root = this.page.getByRole('main');

    /** Верхнее меню */
    this.actionButton = this.root.locator('[id^="more_menu"]').getByRole('button');
    this.box = (value: string) =>
      this.root
        .locator('div.rt-Box')
        .filter({ hasText: new RegExp(value) })
        .last();

    /** Дополнительное меню */
    this.actionMenu = this.page.locator('div.dropdown-menu.show');
    this.archiveButton = this.actionMenu.getByRole('button', {
      name: FEATURE_PAGE.BUTTONS.ARCHIVE,
    });
    this.unarchiveButton = this.actionMenu.getByRole('button', {
      name: FEATURE_PAGE.BUTTONS.UNARCHIVE,
    });

    /** Модальное окно Archive Feature*/
    this.archiveFeatureModalHeader = this.page.getByRole('heading', {
      name: FEATURE_PAGE.MODALS.ARCHIVE_FEATURE,
    });
    this.archiveFeatureModal = this.page.locator('div.modal-content', {
      has: this.archiveFeatureModalHeader,
    });
    this.archiveModalArchivelButton = this.archiveFeatureModal.getByRole('button', {
      name: FEATURE_PAGE.BUTTONS.ARCHIVE,
    });

    /** Модальное окно Unarchive Feature*/
    this.unarchiveFeatureModalHeader = this.page.getByRole('heading', {
      name: FEATURE_PAGE.MODALS.UNARCHIVE_FEATURE,
    });
    this.unarchiveFeatureModal = this.page.locator('div.modal-content', {
      has: this.unarchiveFeatureModalHeader,
    });
    this.unarchiveModalUnarchivelButton = this.unarchiveFeatureModal.getByRole('button', {
      name: FEATURE_PAGE.BUTTONS.UNARCHIVE,
    });

    /** Секция Description */
    this.description = this.root.locator('div.card-text');

    /** Секция Enabled Environments */
    this.envSwitch = (env: string) => page.getByRole('switch', { name: new RegExp(env, 'i') });
  }

  async open(featureId: string) {
    await super.open(URLS.FEATURE_PAGE(featureId));
  }

  /** Дополнительное меню */
  async openActionMenu() {
    await super.openActionMenu(this.actionButton);
  }

  async archiveFeature() {
    await this.archiveButton.click();
  }

  async unarchiveFeature() {
    await this.unarchiveButton.click();
  }

  /** Модальное окно Archive Feature*/
  async submitArchiveFeature() {
    this.archiveModalArchivelButton.click();
  }

  /** Модальное окно Unarchive Feature*/
  async submitUnarchiveFeature() {
    this.unarchiveModalUnarchivelButton.click();
  }
}
