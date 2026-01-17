import type { UserRoleApi, UserRoleTest } from './user-role';

/**
 * Основной интерфейс пользователя
 */
export interface User {
  role: UserRoleApi;
  email: string;
  password: string;
  name: string;
}

/**
 * Тип, используемый при логине пользователя
 */
export type UserLogin = Pick<User, 'email' | 'password'>;

/**
 * Тип, используемый при регистрации пользователя
 */
export type UserRegistration = Pick<User, 'email' | 'password' | 'name'>;

/**
 * Тип, используемый для приглашения пользователя через API
 * (роль в ожидаемом бэкендом формате).
 */
export type UserInvitationApi = Pick<User, 'email' | 'role'>;

/**
 * Тип, используемый для приглашения пользователя в тестовом контексте
 * (роль в нижнем регистре, используется в e2e тестах и фикстурах).
 */
export interface UserInvitationTest {
  email: string;
  role: UserRoleTest;
}
