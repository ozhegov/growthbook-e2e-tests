import type { Locator, Page } from '@playwright/test';
import { FEATURES_PAGE, URLS } from '../../constants';
import type { FeatureValueType } from '../../types';
import { BasePOM } from '../base.pom';

export class FeaturesPagePOM extends BasePOM {
  readonly root: Locator;

  /** Верхнее меню */
  readonly addFeatureButton: Locator;

  /** Модальное окно Create Feature*/
  readonly createFeatureModal: Locator;
  readonly createFeatureModalHeader: Locator;
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
    this.addFeatureButton = this.root
      .getByRole('button', {
        name: FEATURES_PAGE.BUTTONS.ADD_FEATURE,
      })
      .first();

    /** Модальное окно Create Feature*/
    this.createFeatureModalHeader = this.page.getByRole('heading', {
      name: FEATURES_PAGE.MODALS.CREATE_FEATURE,
    });
    this.createFeatureModal = this.page.locator('div.modal-content', {
      has: this.createFeatureModalHeader,
    });
    this.featureKeyInput = this.createFeatureModal.getByLabel(FEATURES_PAGE.INPUTS.FEATURE_KEY);
    this.tagsBadge = this.page.getByRole('link', { name: FEATURES_PAGE.BADGES.TAGS });
    this.descriptionBadge = this.page.getByRole('link', { name: FEATURES_PAGE.BADGES.DESCRIPTION });
    this.tagsInput = this.createFeatureModal
      .locator('div.form-group')
      .filter({ hasText: FEATURES_PAGE.INPUTS.TAGS })
      .locator('input');
    this.descriptionInput = this.createFeatureModal
      .locator('div.form-group')
      .filter({ hasText: FEATURES_PAGE.INPUTS.DESCRIPTION })
      .locator('textarea');
    this.projectSelector = this.createFeatureModal
      .locator('div.form-group', {
        has: this.page.getByText(FEATURES_PAGE.DROPDOWNS.PROJECT.LABEL),
      })
      .locator('input[role="combobox"]');
    this.valueTypeSelector = this.createFeatureModal
      .locator('div.form-group', {
        has: this.page.getByText(FEATURES_PAGE.DROPDOWNS.VALUE.LABEL),
      })
      .locator('input[role="combobox"]');
    this.createButton = this.createFeatureModal.getByRole('button', {
      name: FEATURES_PAGE.BUTTONS.CREATE,
    });
    this.selectorOptions = this.createFeatureModal.getByRole('listbox');
  }

  /**
   * Открывает страницу списка фич.
   */
  async open() {
    await super.open(URLS.FEATURES_PAGE);
  }

  /** Верхнее меню */

  /**
   * Открывает модальное окно создания новой фичи.
   */
  async addFeature() {
    await this.addFeatureButton.click();
  }

  /** Модальное окно Create Feature*/

  /**
   * Заполняет поле ключа фичи.
   *
   * @param key - ключ фичи.
   */
  async fillFeatureKey(key: string) {
    await this.featureKeyInput.fill(key);
  }

  /**
   * Раскрывает поле добавления тегов.
   */
  async expandTagsInput() {
    await this.tagsBadge.click();
  }

  /**
   * Раскрывает поле добавления описания фичи.
   */
  async expandDescriptionInput() {
    await this.descriptionBadge.click();
  }

  /**
   * Добавляет тег фичи.
   *
   * @param tag - значение тега.
   */
  async addFeatureTag(tag: string) {
    await this.tagsInput.fill(tag);
    await this.tagsInput.press('Enter');
  }

  /**
   * Добавляет описание фичи.
   *
   * @param description - описание фичи.
   */
  async fillFeatureDescription(description: string) {
    await this.descriptionInput.fill(description);
  }

  /**
   * Выбирает проект, к которому относится фича.
   *
   * @param project - проект текущей организации.
   */
  async selectFeatureProject(project: string) {
    await this.selectOptionInDropdown(this.projectSelector, this.selectorOptions, project);
  }

  /**
   * Выбирает тип значения фичи.
   *
   * @param valueType - тип значения фичи.
   */
  async selectValueType(valueType: FeatureValueType) {
    await this.selectOptionInDropdown(this.valueTypeSelector, this.selectorOptions, valueType);
  }

  /**
   * Подтверждает создание фичи в модальном окне.
   */
  async createFeature() {
    await this.createButton.click();
  }

  /**
   * Ожидает успешного создания фичи по сетевому запросу.
   */
  async waitForFeatureCreated() {
    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/feature?') &&
        response.status() === 200 &&
        response.request().method() === 'GET',
    );
  }
}
