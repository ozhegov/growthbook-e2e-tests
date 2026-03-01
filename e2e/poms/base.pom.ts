import { expect, type Locator, type Page } from '@playwright/test';

export class BasePOM {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Открывает страницу по указанному URL.
   *
   * @param url - URL страницы для перехода.
   */
  async open(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Выбирает значение из выпадающего списка.
   *
   * @param selector - локатор элемента dropdown.
   * @param optionsList - локатор контейнера со списком опций.
   * @param value - текст опции, которую необходимо выбрать.
   */
  async selectOptionInDropdown(selector: Locator, optionsList: Locator, value: string) {
    await selector.click();
    await optionsList.getByText(value).click();
  }

  /**
   * Заполняет текстовое поле и проверяет корректность ввода.
   *
   * @param input - локатор поля ввода.
   * @param value - значение, которое необходимо ввести.
   */
  async fillInput(input: Locator, value: string) {
    await input.fill(value);
    await expect(input).toHaveValue(value);
  }

  /**
   * Открывает меню действий по заданному селектору.
   *
   * @param selector - локатор элемента, открывающего меню действий.
   */
  async openActionMenu(selector: Locator) {
    await selector.click();
  }
}
