import type { APIRequestContext } from '@playwright/test';
import { API_BASE_URL } from '../config';
import type { CreateFeatureInput } from './types';

/**
 * Создание фичи через GrowthBook API.
 *
 * @param req - APIRequestContext для выполнения запроса создания фичи.
 * @param secretKey - API ключ (secret) для выполнения запроса.
 * @param data - данные по фиче (CreateFeatureInput).
 */
export async function createFeature(
  req: APIRequestContext,
  secretKey: string,
  data: CreateFeatureInput,
) {
  const res = await req.post(`${API_BASE_URL}/api/v1/features`, {
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
    data: {
      id: data.id,
      archived: data.archived,
      description: data.description,
      owner: data.owner,
      project: data.project,
      valueType: data.valueType,
      defaultValue: data.defaultValue,
      tags: data.tags,
      environments: data.environments,
      prerequisites: data.prerequisites,
      jsonSchema: data.jsonSchema,
      customFields: data.customFields,
    },
  });

  if (!res.ok()) {
    const error = await res.text();
    throw new Error(`Неуспешное создание фичи: "${res.status()}" - "${error}"`);
  }

  return res.json();
}
