import { en, Faker } from '@faker-js/faker';
import { test as base } from '@playwright/test';
import { setAllureSeed } from '../helpers/allure';
import { getAllureIdFromTitle } from './helpers';

/**
 * Фикстура управления Faker с уникальным seed на каждый тест.
 *
 * Seed автоматически добавляется в Allure отчёт для воспроизводимости.
 *
 * @example
 * test('should register user', async ({ faker }) => {
 *   const user = createUserForRegistration(faker);
 * });
 */

export interface FakerFixture {
  faker: Faker;
}

export const fakerFixture = base.extend<FakerFixture>({
  faker: async ({}, use, testInfo) => {
    const faker = new Faker({ locale: [en] });

    const allureId = getAllureIdFromTitle(testInfo.title);

    const seed =
      testInfo.workerIndex * 1_000_000 +
      testInfo.retry * 10_000 +
      testInfo.repeatEachIndex * 100 +
      allureId;

    faker.seed(seed);

    await setAllureSeed(seed);

    await use(faker);
  },
});
