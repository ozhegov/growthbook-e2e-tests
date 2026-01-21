import { test as base } from '@playwright/test';
import { resetExperimentState, resetUserState, setUserRole } from '../mocks/fixtures';
import { apiRoleToTest } from '../types/user-role.adapter';
import { getRoleFromTitle, isMockTest } from './helpers';

/**
 * Фикстура для mock-тестов.
 *
 * Определяет, запущен ли тест в mock-режиме, на основе тега `@mock`
 * в названии теста.
 *
 * При включённом mock-режиме:
 * - сбрасывает состояние mock-эксперимента и mock-пользователя
 * - автоматически определяет роль пользователя из названия теста (`@role=...`)
 * - применяет соответствующую роль и набор прав
 *
 * Возвращает флаг `mock`, который используется другими фикстурами.
 *
 * После выполнения теста состояние автоматически сбрасывается
 * к дефолтным значениям.
 */

export interface MockFixtures {
  mock: boolean;
}

export const mockFixture = base.extend<MockFixtures>({
  mock: async ({}, use, testInfo) => {
    const mock = isMockTest(testInfo.title);

    if (mock) {
      resetExperimentState();
      resetUserState();

      const role = apiRoleToTest(getRoleFromTitle(testInfo.title));
      if (role) {
        setUserRole(role);
      }
    }

    await use(mock);
  },
});
