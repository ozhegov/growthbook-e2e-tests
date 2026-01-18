import type { APIRequestContext } from '@playwright/test';
import { API_BASE_URL } from '../config';

/**
 * Получает ID пользователя через GrowthBook API.
 *
 * @param req - APIRequestContext для выполнения запроса на получение ID пользователя.
 * @param token - авторизационный токен пользователя, от лица которого отправляется запрос.
 * @returns ID пользователь, отправившего запрос.
 * @throws Error если запрос выполнен со статусом не 2xx или ID отсутствует.
 */
export async function getUserId(req: APIRequestContext, token: string): Promise<string> {
  const res = await req.get(`${API_BASE_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok()) {
    throw new Error(`Неуспешный запрос на получение ID пользователя: "${res.status()}"`);
  }

  const data = await res.json();
  const userId = data.userId;

  return userId;
}
