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
  readonly startExperimentButton: Locator;

  /** Дополнительное меню */
  readonly actionMenu: Locator;
  readonly editStatusButton: Locator;
  readonly editInfoButton: Locator;
  readonly editPhaseButton: Locator;
  readonly auditLogButton: Locator;

  /** Модальное окно Start Experiment*/
  readonly startExperimentModal: Locator;
  readonly startExperimentModalHeader: Locator;
  readonly startNowButton: Locator;

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
    this.actionButton = this.root.locator('button[aria-haspopup="menu"]').first();
    this.startExperimentButton = this.root.getByRole('button', {
      name: EXPERIMENT_PAGE.BUTTONS.START_EXPERIMENT,
    });

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

    /** Модальное окно Start Experiment*/
    this.startExperimentModalHeader = this.page.getByRole('heading', {
      name: EXPERIMENT_PAGE.MODALS.START_EXPERIMENT,
    });
    this.startExperimentModal = this.page.locator('div.modal-content', {
      has: this.startExperimentModalHeader,
    });
    this.startNowButton = this.startExperimentModal.getByRole('button', {
      name: EXPERIMENT_PAGE.BUTTONS.START_NOW,
    });
  }

  async open(experimentId: string) {
    await super.open(URLS.EXPERIMENT_PAGE(experimentId));
  }

  /** Верхнее меню */
  async startExperiment() {
    this.startExperimentButton.click();
  }

  /** Дополнительное меню */
  async openActionMenu() {
    await this.actionButton.click();
  }

  /** Модальное окно Start Experiment*/
  async clickStartNowButton() {
    await this.startNowButton.click();
  }

  // async clickStartButton() {
  //   await this.startButton.click();
  // }
}
