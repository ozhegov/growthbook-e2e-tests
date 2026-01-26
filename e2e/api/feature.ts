import type { APIRequestContext } from '@playwright/test';
import { API_BASE_URL } from '../config';
import type { CreateFeatureInput, CreateFeatureResponse } from './types';

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
): Promise<CreateFeatureResponse> {
  const res = await req.post(`${API_BASE_URL}/api/v1/features`, {
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
    data,
  });

  if (!res.ok()) {
    const error = await res.text();
    throw new Error(`Неуспешное создание фичи "${data.id}": "${res.status()}" - "${error}"`);
  }

  return (await res.json()) as CreateFeatureResponse;
}
