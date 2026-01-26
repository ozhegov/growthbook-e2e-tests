interface StorageCookie {
  name: string;
  value: string;
}

interface StorageState {
  cookies?: StorageCookie[];
}

/**
 * Извлекает AUTH_TOKEN из сохраненного storageState пользователя.
 *
 * Используется для создания APIRequestContext с авторизацией.
 *
 * @param storage - содержимое storageState (cookies из Playwright).
 * @throws Error если AUTH_TOKEN не найден
 * @returns Значение AUTH_TOKEN
 */
export function getAuthToken(storage: StorageState): string {
  const AUTH_TOKEN_COOKIE_NAME = 'AUTH_ID_TOKEN';
  const cookie = storage.cookies?.find((c) => c.name === AUTH_TOKEN_COOKIE_NAME);

  if (!cookie?.value) {
    throw new Error(`${AUTH_TOKEN_COOKIE_NAME} not found in storageState`);
  }

  return cookie.value;
}
