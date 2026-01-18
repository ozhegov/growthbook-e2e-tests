interface StorageState {
  cookies?: Array<{
    name: string;
    value: string;
  }>;
}

/**
 * Извлекает AUTH_TOKEN из сохраненного storageState пользователя.
 *
 * Используется для создания APIRequestContext с авторизацией.
 *
 * @param storage Содержимое storageState (cookies из Playwright)
 * @throws Error если AUTH_TOKEN не найден
 * @returns Значение AUTH_TOKEN
 */
export function getAuthToken(storage: StorageState): string {
  const cookie = storage.cookies?.find((c) => c.name === 'AUTH_ID_TOKEN');

  if (!cookie?.value) {
    throw new Error('AUTH_ID_TOKEN not found in storageState');
  }

  return cookie.value;
}
