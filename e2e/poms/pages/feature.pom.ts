import type { Locator, Page } from '@playwright/test';
import { FEATURE_PAGE, URLS } from '../../constants';
import { expect } from '../../test';
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
    this.actionButton = this.root
      .locator('[id^="more_menu"] button')
      .or(this.root.locator('button[aria-haspopup="menu"]'));
    this.box = (value: string) =>
      this.root
        .locator('div.rt-Box')
        .filter({ hasText: new RegExp(value) })
        .last();

    /** Дополнительное меню */
    this.actionMenu = this.page.locator('.dropdown-menu.show, .rt-DropdownMenuViewport');
    this.archiveButton = this.actionMenu
      .getByRole('button', {
        name: FEATURE_PAGE.BUTTONS.ARCHIVE,
      })
      .or(this.page.getByRole('menuitem', { name: FEATURE_PAGE.BUTTONS.ARCHIVE }));
    this.unarchiveButton = this.actionMenu
      .getByRole('button', {
        name: FEATURE_PAGE.BUTTONS.UNARCHIVE,
      })
      .or(this.page.getByRole('menuitem', { name: FEATURE_PAGE.BUTTONS.UNARCHIVE }));

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
    this.envSwitch = (env: string) => this.page.getByRole('switch', { name: new RegExp(env, 'i') });
  }

  /**
   * Открывает страницу фичи по её идентификатору.
   *
   * @param featureId - идентификатор фичи.
   */
  async open(featureId: string) {
    await super.open(URLS.FEATURE_PAGE(featureId));

    await expect(this.actionButton).toBeVisible({ timeout: 10_000 });
  }

  /** Дополнительное меню */

  /**
   * Открывает дополнительное меню действий фичи.
   */
  async openActionMenu() {
    await super.openActionMenu(this.actionButton);
  }

  /**
   * Выбирает действие архивации в меню фичи.
   */
  async archiveFeature() {
    await this.archiveButton.click();
  }

  /**
   * Выбирает действие разархивации в меню фичи.
   */
  async unarchiveFeature() {
    await this.unarchiveButton.click();
  }

  /** Модальное окно Archive Feature*/

  /**
   * Подтверждает архивирование фичи в модальном окне.
   */
  async submitArchiveFeature() {
    await this.archiveModalArchivelButton.click();
  }

  /** Модальное окно Unarchive Feature*/

  /**
   * Подтверждает разархивацию фичи в модальном окне.
   */
  async submitUnarchiveFeature() {
    await this.unarchiveModalUnarchivelButton.click();
  }
}
