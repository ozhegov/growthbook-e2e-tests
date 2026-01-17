import type { APIRequestContext } from '@playwright/test';
import { API_BASE_URL } from '../config';
import type { UserInvitationApi } from '../types/user';

/**
 * Приглашение пользователя админом в организацию через GrowthBook API.
 *
 * @param req - APIRequestContext для выполнения запроса приглашения.
 * @param adminToken - авторизационный токен администратора.
 * @param user - данные приглашаемого пользователя (email и роль).
 * @param orgId - ID организации, в которую приглашается пользователь.
 * @returns ключ приглашения  (значение параметра `key` из inviteUrl вида `/invitation?key=...`).
 * @throws Error если запрос выполнен со статусом не 2xx или ключ приглашения отсутствует.
 */
export async function inviteUser(
  req: APIRequestContext,
  adminToken: string,
  user: UserInvitationApi,
  orgId: string,
): Promise<string> {
  const res = await req.post(`${API_BASE_URL}/invite`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
      ...(orgId && { 'X-Organization': orgId }),
    },
    data: {
      email: user.email,
      role: user.role.toLowerCase(),
    },
  });

  if (!res.ok()) {
    throw new Error(`Неуспешное приглашение пользователя "${user.email}": ${res.status()}`);
  }

  const { inviteUrl } = await res.json();
  const key = new URL(inviteUrl).searchParams.get('key');

  if (!key) {
    throw new Error(`Отсутствует ключ приглашения пользователя "${user.email}"`);
  }

  return key;
}

/**
 * Принятие приглашения в организацию по ключу через GrowthBook API
 * с повторными попытками, чтобы учесть временную неготовность системы
 * (например, пользователь только что зарегистрирован/приглашён).
 *
 * Делает до трех попыток с паузой 500ms между неуспешными попытками.
 *
 * @param req - APIRequestContext для выполнения запроса принятия приглашения.
 * @param token - авторизационный токен пользователя, который принимает приглашение.
 * @param key - ключ приглашения (параметр `key` из inviteUrl).
 * @throws Error если ключ приглашения отсутствует или приглашение не удалось принять за 3 попытки.
 */
export async function acceptInviteWithRetry(req: APIRequestContext, token: string, key: string) {
  if (!key) {
    throw new Error('Ключ приглашения отсутствует');
  }

  let lastStatus: number | undefined;

  for (let i = 0; i < 3; i++) {
    const res = await req.post(`${API_BASE_URL}/invite/accept`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { key },
    });

    if (res.ok()) return;
    lastStatus = res.status();

    await new Promise((res) => setTimeout(res, 500));
  }

  throw new Error(`Неуспешное принятие приглашения за 3 попытки (последний статус: ${lastStatus})`);
}
