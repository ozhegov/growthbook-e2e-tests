import type { UserRoleTest } from '../../../types/user-role';
import { ROLE_PERMISSIONS } from './roles';
import type { UserPermissions } from './types';

export const DEFAULT_USER_ROLE: UserRoleTest = 'admin';

export const currentUserState: {
  role: UserRoleTest;
  permissions: UserPermissions;
} = {
  role: DEFAULT_USER_ROLE,
  permissions: {},
};

/**
 * Устанавливает роль пользователя и базовый набор доступов.
 *
 * Используется автоматически mockFixture на основе @role=...
 */
export function setUserRole(role: UserRoleTest) {
  currentUserState.role = role;
  currentUserState.permissions = {
    ...ROLE_PERMISSIONS[role],
  };
}

/**
 * Точечно переопределяет доступы для edge-case сценариев.
 *
 * Используется в тестах, в которых нужно сломать стандартную роль
 * или проверить реакцию UI на отсутствие конкретного права
 */
export function setUserPermissions(overrides: Partial<typeof currentUserState.permissions>) {
  Object.assign(currentUserState.permissions, overrides);
}

/**
 * Сбрасывает состояние mock-пользователя
 * к дефолтной роли и разрешениям.
 *
 * Вызывается после каждого mock-теста.
 */
export function resetUserState() {
  currentUserState.role = DEFAULT_USER_ROLE;
  currentUserState.permissions = {
    ...ROLE_PERMISSIONS[DEFAULT_USER_ROLE],
  };
}
