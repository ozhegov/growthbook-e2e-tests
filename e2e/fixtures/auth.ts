import fs from 'node:fs';
import path from 'node:path';
import { type BrowserContext, test as base } from '@playwright/test';
import { STORAGE_DIR } from '../config';
import { setAllureRole } from '../helpers/allure';
import type { UserRole } from '../types/user-role';
import { getRoleFromTitle } from './helpers';

/**
 * Фикстура авторизации.
 *
 * Определяет роль пользователя по тегу "@role=..." в названии теста
 * и поднимает контекст браузера с соответствующим storageState.
 */

export interface AuthFixtures {
  role: UserRole;
  context: BrowserContext;
}

export const authFixture = base.extend<AuthFixtures>({
  role: async (_, use, testInfo) => {
    const role = getRoleFromTitle(testInfo.title);
    await setAllureRole(role);

    await use(role);
  },

  context: async ({ browser, role }, use) => {
    const storageStatePath = path.join(STORAGE_DIR, `${role.toLowerCase()}-state.json`);

    if (!fs.existsSync(storageStatePath)) {
      throw new Error(
        `storageState для роли "${role}" не найден.\n` +
          `Ожидался файл: ${storageStatePath}\n` +
          `Убедись, что global-setup отработал корректно.`,
      );
    }

    const context = await browser.newContext({
      storageState: storageStatePath,
    });

    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
  },
});
