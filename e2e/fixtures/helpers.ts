import type { UserRoleApi } from '../types/user-role';

const DEFAULT_ROLE: UserRoleApi = 'ADMIN';
const ALLOWED_ROLES = new Set<UserRoleApi>(['ADMIN', 'ENGINEER', 'EXPERIMENTER', 'GUEST']);

/**
 * Определение роли пользователя на основе тега `@role=...` в названии теста.
 *
 * Используется в auth-фикстуре для выбора соответствующего storageState.
 *
 * Если тег не указан или указан неверно — используется роль по умолчанию.
 *
 * @param title - название теста
 * @returns UserRole - роль пользователя
 */
export function getRoleFromTitle(title: string): UserRoleApi {
  const match = title.match(/@role=([\w-]+)/i);

  if (!match) {
    return DEFAULT_ROLE;
  }

  const role = match[1].toUpperCase() as UserRoleApi;

  if (ALLOWED_ROLES.has(role)) {
    return role;
  }

  console.warn(
    `⚠️ Указана неизвестная роль "@role=${match[1]}" в тесте "${title}".\n` +
      `Допустимые роли: ${Array.from(ALLOWED_ROLES).join(', ')}.\n` +
      `Используется роль по умолчанию: ${DEFAULT_ROLE}`,
  );

  return DEFAULT_ROLE;
}

export function getAllureIdFromTitle(title: string): number {
  const match = title.match(/@allure\.id=(\d+)/);

  return match ? Number(match[1]) : 0;
}
