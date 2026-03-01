import { test as base } from '@playwright/test';
import { createFeature, createUserApiContext, getUserId, registerUser } from '../api';
import type { CreateFeatureInput, Feature } from '../api/types/feature';
import { get } from '../storage/storage.manager';
import type { UserRegistration } from '../types/user';

/**
 * API-фикстуры.
 *
 * Инкапсулируют работу с GrowthBook API: получение apiKey из storage,
 * создание фич и управление пользователями.
 *
 * Убирают прямые импорты storage.manager и API-клиентов из тестов.
 */

export interface UserApi {
  register(user: UserRegistration): Promise<{ token: string; userId: string }>;
}

export interface ApiWorkerFixtures {
  apiKey: string;
}

export interface ApiFixtures {
  createdFeature: (data: CreateFeatureInput) => Promise<Feature>;
  userApi: UserApi;
}

export const apiFixture = base.extend<ApiFixtures, ApiWorkerFixtures>({
  apiKey: [
    async ({}, use) => {
      const apiKey = await get('apiKey');

      await use(apiKey);
    },
    { scope: 'worker' },
  ],

  createdFeature: async ({ request, apiKey }, use) => {
    await use(async (data: CreateFeatureInput) => {
      const { feature } = await createFeature(request, apiKey, data);

      return feature;
    });
  },

  userApi: async ({}, use) => {
    const api: UserApi = {
      async register(user: UserRegistration) {
        const req = await createUserApiContext('GUEST');

        try {
          const token = await registerUser(req, user);
          const userId = await getUserId(req, token);

          return { token, userId };
        } finally {
          await req.dispose();
        }
      },
    };

    await use(api);
  },
});
