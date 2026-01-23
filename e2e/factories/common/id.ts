import { randomUUID } from 'node:crypto';

export type EntityPrefix = 'exp' | 'feat' | 'proj' | 'org' | 'user';

/**
 * Генерирует уникальный id для сущностей.
 *
 * Формат:
 * `<prefix>_<random>`
 *
 * @example
 * feat_9f3a1c2d
 */
export function getId(prefix: EntityPrefix) {
  const random = randomUUID().slice(0, 8);

  return `${prefix}_${random}`;
}
