import type { APIRequestContext } from '@playwright/test';
import { API_BASE_URL } from '../config';
import type { UserRoleTest } from '../types/user-role';

/**
 * Добавляет пользователя в члены команды организации через GrowthBook API.
 *
 * @param adminReq APIRequestContext администратора
 * @param userId ID добавляемого в команду пользователя
 * @param role Роль добавляемого в команду пользователя
 * @throws Error если запрос выполнен со статусом не 2xx
 */
export async function addUserToTeam(
  adminReq: APIRequestContext,
  userId: string,
  role: UserRoleTest,
) {
  const res = await adminReq.post(`${API_BASE_URL}/orphaned-users/${userId}/add`, {
    data: {
      role: role,
      projectRoles: [],
      environments: [],
      limitAccessByEnvironment: false,
    },
  });

  if (!res.ok()) {
    throw new Error(
      `Неуспешное добавление пользователя ${userId} в члены команды: ${res.status()}`,
    );
  }
}
