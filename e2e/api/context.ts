import { readFile } from 'node:fs/promises';
import { type APIRequestContext, request } from '@playwright/test';
import { STORAGE_DIR } from '../config';
import type { UserRoleApi } from '../types/user-role';
import { getAuthToken } from './auth-token';

/**
 * Создает APIRequestContext для пользователя с заданной ролью
 *
 * Использует сохранённый storageState для извлечения AUTH_TOKEN
 * и прокидывает его в Authorization header.
 *
 * @param role Роль пользователя
 * @returns APIRequestContext пользователя
 */
export async function createUserApiContext(role: UserRoleApi): Promise<APIRequestContext> {
  if (role === 'GUEST') {
    return request.newContext({});
  }

  const storagePath = `${STORAGE_DIR}/${role.toLowerCase()}-state.json`;

  const storage = JSON.parse(await readFile(storagePath, 'utf-8'));

  const token = getAuthToken(storage);

  if (!process.env.E2E_ORG_ID) {
    throw new Error('Переменная окружения "E2E_ORG_ID" отсутствует');
  }

  return request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
      'X-Organization': process.env.E2E_ORG_ID,
    },
  });
}
