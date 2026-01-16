import type { Faker } from '@faker-js/faker';
import type { UserRoleLower } from '../../types/user-role';

/**
 * Получает рандомное имя.
 */
export const getUserName = (faker: Faker): string => {
  return faker.person.firstName();
};

/**
 * Получает рандомный email.
 */
export const getUserEmail = (faker: Faker): string => {
  return faker.internet.email({ provider: 'growthbook.local' }).toLowerCase();
};

/**
 * Получает рандомный пароль.
 */
export const getUserPassword = (faker: Faker): string => {
  return faker.internet.password({ length: 8, prefix: 'Test_' });
};

/**
 * Получает рандомную роль.
 */
export const getUserRole = (faker: Faker): UserRoleLower => {
  const roles: UserRoleLower[] = ['engineer', 'experimenter'];

  return faker.helpers.arrayElement(roles);
};
