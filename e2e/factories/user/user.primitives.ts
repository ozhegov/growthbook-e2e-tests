import type { Faker } from '@faker-js/faker';
import type { UserRoleApi } from '../../types/user-role';

/**
 * Генерирует рандомное имя.
 */
export const getUserName = (faker: Faker): string => {
  return faker.person.firstName();
};

/**
 * Генерирует уникальный тестовый email
 * в домене growthbook.local.
 */
export const getUserEmail = (faker: Faker): string => {
  const name = faker.person.firstName().toLowerCase();
  const suffix = faker.string.alphanumeric(3).toLowerCase();

  return `${name}.${suffix}@growthbook.local`;
};

/**
 * Генерирует валидный тестовый пароль.
 */
export const getUserPassword = (faker: Faker): string => {
  return faker.internet.password({ length: 8, prefix: 'Test_' });
};

/**
 *  Генерирует тестовую роль пользователя
 * (в нижнем регистре, без роли администратора).
 */
export const getUserRole = (faker: Faker): UserRoleApi => {
  const roles: UserRoleApi[] = ['ENGINEER', 'EXPERIMENTER'];

  return faker.helpers.arrayElement(roles);
};
