import type { Faker } from '@faker-js/faker';
import type { CreateFeatureInput, FeatureValueType } from '../../api/types';
import { USERS } from '../../test-data/users';
import { getId, getText } from '../';

export interface FeatureFactoryOptions {
  id?: string;
  owner?: string;
  valueType?: FeatureValueType;
  defaultValue?: string;
  description?: string;
}

/**
 * Генерирует данные для создания фичи GrowthBook.
 *
 * Используется в E2E и API-тестах для формирования валидного объекта CreateFeatureInput.
 *
 * @param faker - экземпляр Faker для генерации случайных данных.
 * @param options - частичные параметры фичи для переопределения значений по умолчанию.
 *
 * @returns Объект данных для создания фичи.
 */
export function getFeature(
  faker: Faker,
  options: FeatureFactoryOptions = {},
): CreateFeatureInput & { description: string } {
  return {
    id: options.id ?? getId('feat'),
    owner: options.owner ?? USERS[0].email,
    valueType: options.valueType ?? 'boolean',
    defaultValue: options.defaultValue ?? 'true',
    description: options.description ?? getText(faker, { minLength: 10, maxLength: 20 }),
  };
}
