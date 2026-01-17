import type { UserRoleApi, UserRoleTest } from './user-role';

/**
 * Преобразует роль пользователя из API формата (uppercase)
 * в тестовый формат (lowercase).
 *
 * @example
 * apiRoleToTest('ENGINEER') -> 'engineer'
 */
export const apiRoleToTest = (role: UserRoleApi): UserRoleTest => {
  return role.toLowerCase() as UserRoleTest;
};
