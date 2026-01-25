import type { Locator, Page } from '@playwright/test';
import { FEATURES_PAGE, URLS } from '../../constants';
import type { FeatureValueType } from '../../types';
import { BasePOM } from '../base.pom';

export class FeaturesPagePOM extends BasePOM {
  readonly root: Locator;

  /** Верхнее меню */
  readonly addFeautureButton: Locator;

  /** Модальное окно Create Feature*/
  readonly createFeautureModal: Locator;
  readonly createFeautureModalHeader: Locator;
  readonly featureKeyInput: Locator;
  readonly tagsBadge: Locator;
  readonly descriptionBadge: Locator;
  readonly tagsInput: Locator;
  readonly descriptionInput: Locator;
  readonly projectSelector: Locator;
  readonly valueTypeSelector: Locator;
  readonly createButton: Locator;
  readonly selectorOptions: Locator;

  constructor(page: Page) {
    super(page);

    this.root = this.page.getByRole('main');

    /** Верхнее меню */
    this.addFeautureButton = this.root
      .getByRole('button', {
        name: FEATURES_PAGE.BUTTONS.ADD_FEATURE,
      })
      .first();

    /** Модальное окно Create Feature*/
    this.createFeautureModalHeader = this.page.getByRole('heading', {
      name: FEATURES_PAGE.MODALS.CREATE_FEATURE,
    });
    this.createFeautureModal = this.page.locator('div.modal-content', {
      has: this.createFeautureModalHeader,
    });
    this.featureKeyInput = this.createFeautureModal.getByLabel(FEATURES_PAGE.INPUTS.FEATURE_KEY);
    this.tagsBadge = this.page.getByRole('link', { name: FEATURES_PAGE.BADGES.TAGS });
    this.descriptionBadge = this.page.getByRole('link', { name: FEATURES_PAGE.BADGES.DESCRIPTION });
    this.tagsInput = this.createFeautureModal
      .locator('div.form-group')
      .filter({ hasText: FEATURES_PAGE.INPUTS.TAGS })
      .locator('input');
    this.descriptionInput = this.createFeautureModal
      .locator('div.form-group')
      .filter({ hasText: FEATURES_PAGE.INPUTS.DESCRIPTION })
      .locator('textarea');
    this.projectSelector = this.createFeautureModal
      .locator('div.form-group', {
        has: this.page.getByText(FEATURES_PAGE.DROPDOWNS.PROJECT.LABEL),
      })
      .locator('input[role="combobox"]');
    this.valueTypeSelector = this.createFeautureModal
      .locator('div.form-group', {
        has: this.page.getByText(FEATURES_PAGE.DROPDOWNS.VALUE.LABEL),
      })
      .locator('input[role="combobox"]');
    this.createButton = this.createFeautureModal.getByRole('button', {
      name: FEATURES_PAGE.BUTTONS.CREATE,
    });
    this.selectorOptions = this.createFeautureModal.getByRole('listbox');
  }

  async open() {
    await super.open(URLS.FEATURES_PAGE);
  }

  /** Верхнее меню */
  async addFeature() {
    await this.addFeautureButton.click();
  }

  /** Модальное окно Create Feature*/
  async fillFeatureKey(key: string) {
    await this.featureKeyInput.fill(key);
  }

  async expandTagsInput() {
    await this.tagsBadge.click();
  }

  async expandDescriptionInput() {
    await this.descriptionBadge.click();
  }

  async addFeatureTag(tag: string) {
    await this.tagsInput.fill(tag);
    await this.tagsInput.press('Enter');
  }

  async fillFeatureDescription(description: string) {
    this.descriptionInput.fill(description);
  }

  async selectFeatureProject(project: string) {
    await this.selectOptionInDropdown(this.projectSelector, this.selectorOptions, project);
  }

  async selectValueType(valueType: FeatureValueType) {
    await this.selectOptionInDropdown(this.valueTypeSelector, this.selectorOptions, valueType);
  }

  async createFeature() {
    await this.createButton.click();
    await this.page.waitForResponse(
      (response) =>
        response.url().endsWith('/feature?') &&
        response.status() === 200 &&
        response.request().method() === 'GET',
    );
  }
}
