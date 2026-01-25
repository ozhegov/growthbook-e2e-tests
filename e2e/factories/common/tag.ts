import type { Faker } from '@faker-js/faker';

export type TagPrefix = 'exp' | 'feat';

/**
 * Генерирует тег для экспериментов и фичей.
 *
 * Формат:
 * `<prefix>_<random>`
 *
 * @example
 * feat_98765432
 */
export function getTag(faker: Faker, prefix: TagPrefix) {
  const random = faker.string.numeric(8);

  return `${prefix}_${random}`;
}
