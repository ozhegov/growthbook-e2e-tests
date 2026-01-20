import { test as base } from '@playwright/test';
import { resetExperimentState } from '../mocks/fixtures';
import { isMockTest } from './helpers';

/**
 * Фикстура для mock-тестов.
 *
 * Определяют, является ли текущий тест mock-тестом
 * на основе тега `@mock` в названии теста.
 *
 */

export interface MockFixtures {
  mock: boolean;
}

export const mockFixture = base.extend<MockFixtures>({
  mock: async ({}, use, testInfo) => {
    const mock = isMockTest(testInfo.title);

    await use(mock);

    if (mock) {
      resetExperimentState();
    }
  },
});
