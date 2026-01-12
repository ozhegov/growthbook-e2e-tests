import * as allure from 'allure-js-commons';

interface AllureMetadataConfig {
  owner: string;
  allureId: string;
  backend?: 'mock' | 'real';
  tags: string[];
}

/**
 * Добавляет метаданные Allure в тест.
 *
 * @param config Набор метаданных:
 * - owner - владелец теста (сетевое имя)
 * - allureId - id теста в Allure TestOps
 * - backend - использование мока или реального бэкенда
 * - tags - теги (smoke, regression и другие произвольные)
 *
 * @example
 * ```ts
 * await setAllureMetadata({
 *   owner: 'ozhegovmv',
 *   allureId: '123355',
 *   backend: 'mock',
 *   tags: ['smoke', 'features'],
 * });
 * ```
 */
export async function setAllureMetadata(config: AllureMetadataConfig): Promise<void> {
  await allure.owner(config.owner);
  await allure.allureId(config.allureId);
  await allure.tags(...config.tags);

  if (config.backend) {
    await allure.label('backend', config.backend);
  }
}

/**
 * Оборачивает асинхронную функцию в Allure step, чтобы шаг отображался в отчёте.
 *
 * @param name Название шага.
 * @param fn Асинхронная функция с логикой шага.
 * @returns Результат выполнения функции.
 *
 * @example
 * ```ts
 * await step('Под ролью администратора перейти на страницу настроек участников', async () => {
 *   await page.goto('/settings/team#members');
 * });
 * ```
 */
export async function step<T>(name: string, fn: () => Promise<T>): Promise<T> {
  return allure.step(name, fn);
}
