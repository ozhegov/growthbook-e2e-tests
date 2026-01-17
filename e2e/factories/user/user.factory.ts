import type { Faker } from '@faker-js/faker';
import type { UserInvitationApi, UserRegistration } from '../../types/user';
import { getUserEmail, getUserName, getUserPassword, getUserRole } from './user.primitives';

/**
 * Создает объект с данными пользователя необходимыми для регистрации,
 * необходимыми для регистрации через UI или API.
 *
 * @param faker
 * @returns Данные регистрируемого пользователя - имя, email, пароль.
 */
export const createUserForRegistration = (faker: Faker): UserRegistration => {
  return {
    name: getUserName(faker),
    email: getUserEmail(faker),
    password: getUserPassword(faker),
  };
};

/**
 * Создает данные для приглашения пользователя
 * в тестовом контексте (роль в нижнем регистре).
 *
 * @param faker
 * @returns Данные приглашаемого пользователя - email, роль.
 */
export const createUserForInvitation = (faker: Faker): UserInvitationApi => {
  return {
    email: getUserEmail(faker),
    role: getUserRole(faker),
  };
};
