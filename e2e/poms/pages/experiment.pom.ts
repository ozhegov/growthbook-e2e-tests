import type { Locator, Page } from '@playwright/test';
import { EXPERIMENT_PAGE, URLS } from '../../constants';
import type { ConclusionOption, VariationOption } from '../../types';
import { BasePOM } from '../base.pom';

export class ExperimentPagePOM extends BasePOM {
  readonly root: Locator;

  /** Верхнее меню */
  readonly experimentBadge: (status: string) => Locator;
  readonly makeChangesButton: Locator;
  readonly stopExperimentButton: Locator;
  readonly actionButton: Locator;
  readonly startExperimentButton: Locator;
  readonly shareExperimentButton: Locator;

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

  /** Модальное окно Stop Experiment*/
  readonly stopExperimentModal: Locator;
  readonly stopExperimentModalHeader: Locator;
  readonly selectorsOptions: Locator;
  readonly conclusionSelector: Locator;
  readonly variationSelector: Locator;
  readonly stopButton: Locator;

  /** Таб Overview */
  readonly stoppedExperimentInfo: Locator;
  readonly stoppedExperimentInfoHeader: Locator;

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
    this.shareExperimentButton = this.root.getByRole('button', {
      name: EXPERIMENT_PAGE.BUTTONS.SHARE,
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

    /** Модальное окно Stop Experiment*/
    this.stopExperimentModalHeader = this.page.getByRole('heading', {
      name: EXPERIMENT_PAGE.MODALS.STOP_EXPERIMENT,
    });
    this.stopExperimentModal = this.page.locator('div.modal-content', {
      has: this.stopExperimentModalHeader,
    });
    this.selectorsOptions = this.stopExperimentModal.getByRole('listbox');
    this.conclusionSelector = this.stopExperimentModal
      .locator('div.form-group', {
        has: this.page.getByText(EXPERIMENT_PAGE.DROPDOWNS.CONCLUSION.LABEL),
      })
      .locator('input[role="combobox"]');
    this.variationSelector = this.stopExperimentModal
      .locator('div.form-group', {
        has: this.page.getByText(EXPERIMENT_PAGE.DROPDOWNS.VARIATION.LABEL),
      })
      .locator('input[role="combobox"]');
    this.stopButton = this.stopExperimentModal.getByRole('button', {
      name: EXPERIMENT_PAGE.BUTTONS.STOP,
      exact: true,
    });

    /** Таб Overview */
    this.stoppedExperimentInfoHeader = this.root.getByRole('heading', {
      name: EXPERIMENT_PAGE.TABS.OVERVIEW.SECTIONS.STOPPED_INFO,
    });
    this.stoppedExperimentInfo = this.root.locator('dix.appbox', {
      has: this.stoppedExperimentInfoHeader,
    });
  }

  async open(experimentId: string) {
    await super.open(URLS.EXPERIMENT_PAGE(experimentId));
  }

  /** Верхнее меню */
  async startExperiment() {
    this.startExperimentButton.click();
  }

  async stopExperiment() {
    this.stopExperimentButton.click();
  }

  /** Дополнительное меню */
  async openActionMenu() {
    await this.actionButton.click();
  }

  /** Модальное окно Start Experiment*/
  async clickStartNowButton() {
    await this.startNowButton.click();
  }

  /** Модальное окно Stop Experiment*/
  async selectConclusion(conclusion: ConclusionOption) {
    await this.selectOptionInDropdown(this.conclusionSelector, this.selectorsOptions, conclusion);
  }

  async selectVariation(variation: VariationOption) {
    await this.selectOptionInDropdown(this.variationSelector, this.selectorsOptions, variation);
  }

  async clickStopButton() {
    this.stopButton.click();
  }
}
