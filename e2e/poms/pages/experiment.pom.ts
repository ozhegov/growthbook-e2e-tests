import type { Locator, Page } from '@playwright/test';
import { EXPERIMENT_PAGE, URLS } from '../../constants';
import { BasePOM } from '../base.pom';

export class ExperimentPagePOM extends BasePOM {
  readonly root: Locator;

  /** Верхнее меню */
  readonly experimentBadge: (status: string) => Locator;
  readonly makeChangesButton: Locator;
  readonly stopExperimentButton: Locator;
  readonly actionButton: Locator;

  /** Дополнительное меню */
  readonly actionMenu: Locator;
  readonly editStatusButton: Locator;
  readonly editInfoButton: Locator;
  readonly editPhaseButton: Locator;
  readonly auditLogButton: Locator;

  constructor(page: Page) {
    super(page);

    this.root = this.page.getByRole('main');

    /** Верхнее меню */
    this.experimentBadge = (status: string) => this.root.getByText(status);
    this.makeChangesButton = this.root.getByRole('button', {
      name: EXPERIMENT_PAGE.BUTTONS.MAKE_CHANGES,
    });
    this.stopExperimentButton = this.root.getByRole('button', {
      name: EXPERIMENT_PAGE.BUTTONS.STOP_EXPERIMENT,
    });
    this.actionButton = this.root.locator('button[aria-haspopup="menu"]');

    /** Дополнительное меню */
    this.actionMenu = this.page.getByRole('menu');
    this.editStatusButton = this.actionMenu.getByRole('menuitem', {
      name: EXPERIMENT_PAGE.BUTTONS.EDIT_STATUS,
    });
    this.editInfoButton = this.actionMenu.getByRole('menuitem', {
      name: EXPERIMENT_PAGE.BUTTONS.EDIT_INFO,
    });
    this.editPhaseButton = this.actionMenu.getByRole('menuitem', {
      name: EXPERIMENT_PAGE.BUTTONS.EDIT_PHASE,
    });
    this.auditLogButton = this.actionMenu.getByRole('menuitem', {
      name: EXPERIMENT_PAGE.BUTTONS.AUDIT_LOG,
    });
  }

  async open(experimentId: string) {
    await super.open(URLS.EXPERIMENT_PAGE(experimentId));
  }

  /** Дополнительное меню */
  async openActionMenu() {
    await this.actionButton.click();
  }
}
