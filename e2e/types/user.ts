import type { UserRole } from './user-role';

/**
 * Основной интерфейс пользователя
 */
export interface User {
  role: UserRole;
  email: string;
  password: string;
  name: string;
}

/**
 * Тип используемый при логине пользователя
 */
export type UserLogin = Pick<User, 'email' | 'password'>;

/**
 * Тип используемый при регистрации пользователя
 */
export type UserRegistration = Pick<User, 'email' | 'password' | 'name'>;

/**
 * Тип используемый при приглашении пользователя
 */
export type UserInvitation = Pick<User, 'email' | 'role'>;
