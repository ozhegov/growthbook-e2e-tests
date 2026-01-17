import * as allure from 'allure-js-commons';
import type { UserRoleApi } from '../types/user-role';

interface AllureMetadataConfig {
  owner?: string;
  backend?: 'mock' | 'real';
  tags?: string[];
}

/**
 * Добавляет метаданные Allure в тест.
 *
 * @param config Набор метаданных:
 * - owner - владелец теста (сетевое имя)
 * - backend - использование мока или реального бэкенда
 * - tags - теги (smoke, regression и другие произвольные)
 *
 * @example
 * ```ts
 * await setAllureMetadata({
 *   owner: 'ozhegovmv',
 *   backend: 'mock',
 *   tags: ['smoke', 'features'],
 * });
 * ```
 */
export async function setAllureMetadata(config: AllureMetadataConfig) {
  if (config.owner) {
    await allure.owner(config.owner);
  }

  if (config.tags?.length) {
    await allure.tags(...config.tags);
  }

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

/**
 * Добавляет параметр Allure role в тест.
 *
 * @param role Роль пользователя, под которым проходит тест.
 */
export async function setAllureRole(role: UserRoleApi) {
  await allure.parameter('role', role.toLowerCase());
}

/**
 * Добавляет параметр Allure seed в тест.
 *
 * @param seed Faker seed для тестовых данных.
 */
export async function setAllureSeed(seed: number) {
  await allure.parameter('seed', String(seed));
}
