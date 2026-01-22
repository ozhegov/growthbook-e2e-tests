import type { Route } from '@playwright/test';
import { experiments } from '../fixtures/experiment/scenarios';
import { currentExperiment } from '../fixtures/experiment/state';

/**
 * Route handler для mock-запросов экспериментов.
 *
 * Используется только в тестах с включённым mock-режимом.
 * Перехватывает HTTP-запросы, связанные с экспериментами,
 * и возвращает детерминированные mock-ответы.
 *
 * Состояние текущего эксперимента хранится в `currentExperiment`
 * и может изменяться во время выполнения теста.
 */
export function experimentRouteHandler() {
  return async (route: Route) => {
    const req = route.request();

    if (!['xhr', 'fetch'].includes(req.resourceType())) {
      return route.continue();
    }

    const url = new URL(req.url());
    const method = req.method();
    const pathname = url.pathname;

    if (!pathname.startsWith('/experiment/')) {
      return route.continue();
    }

    const controlVariationId = currentExperiment.variations[0].id;
    const variation1Id = currentExperiment.variations[1].id;

    const experimentId = currentExperiment.id;

    // GET /experiment/:id
    if (method === 'GET' && experimentId && pathname === `/experiment/${experimentId}`) {
      if (experimentId !== currentExperiment.id) {
        return route.fulfill({
          status: 404,
          contentType: 'application/json',
          body: JSON.stringify({
            status: 404,
            message: 'Experiment not found',
          }),
        });
      }

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          experiment: currentExperiment,
          visualChangesets: [],
          urlRedirects: [],
          linkedFeatures: [
            {
              feature: {
                id: 'mock_feature',
                archived: false,
                description: '',
                organization: 'org_mock',
                owner: '',
                project: '',
                dateCreated: new Date().toISOString(),
                dateUpdated: new Date().toISOString(),
                version: 1,
                valueType: 'boolean',
                defaultValue: 'false',
                tags: [],
                environmentSettings: {
                  production: {
                    enabled: true,
                    rules: [
                      {
                        type: 'experiment-ref',
                        description: '',
                        id: 'fr_mock',
                        condition: '',
                        enabled: true,
                        scheduleRules: [],
                        experimentId,
                        variations: [
                          {
                            value: 'true',
                            variationId: variation1Id,
                          },
                          {
                            value: 'false',
                            variationId: controlVariationId, // ✅ совпадает
                          },
                        ],
                      },
                    ],
                  },
                  dev: {
                    rules: [],
                    enabled: false,
                  },
                },
                hasDrafts: false,
                linkedExperiments: [experimentId], // ✅ совпадает
                jsonSchema: {
                  schemaType: 'schema',
                  simple: {
                    type: 'object',
                    fields: [],
                  },
                  schema: '',
                  date: new Date().toISOString(),
                  enabled: false,
                },
                prerequisites: [],
              },
              state: 'live',
              environmentStates: {
                production: 'active',
              },
              values: [
                {
                  value: 'true',
                  variationId: variation1Id, // ✅ совпадает
                },
                {
                  value: 'false',
                  variationId: controlVariationId, // ✅ совпадает
                },
              ],
              valuesFrom: 'production',
              rulesAbove: false,
              inconsistentValues: false,
            },
          ],
          envs: [],
        }),
      });
    }

    // GET /experiment/:id/watchers
    if (method === 'GET' && pathname.endsWith('/watchers')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          watchers: [],
        }),
      });
    }

    // GET /experiment/:id/snapshot/:index
    if (method === 'GET' && pathname.includes('/snapshot/')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          snapshot: {
            dimension: null,
            dateCreated: new Date().toISOString(),
            analyses: [],
          },
        }),
      });
    }

    // GET /experiment/:id/incremental-refresh
    if (method === 'GET' && pathname.endsWith('/incremental-refresh')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 200 }),
      });
    }

    // GET /experiment/:id/reports
    if (method === 'GET' && pathname.endsWith('/reports')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          reports: [],
        }),
      });
    }

    // GET /experiment/:id/launch-checklist
    if (method === 'GET' && pathname.endsWith('/launch-checklist')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 200,
          checklist: [],
        }),
      });
    }

    // POST /experiment/:id/status
    if (method === 'POST' && pathname.endsWith('/status')) {
      const body = req.postDataJSON() as { status: 'running' };

      if (body.status === 'running') {
        Object.assign(currentExperiment, {
          status: 'running',
          archived: false,
          phases: experiments.running.phases,
          releasedVariationId: '',
        });
      }

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 200 }),
      });
    }

    // POST /experiment/:id/stop
    if (method === 'POST' && pathname.endsWith('/stop')) {
      const body = req.postDataJSON() as { results: 'won' };

      if (body.results === 'won') {
        Object.assign(currentExperiment, experiments.stoppedWon);
      }

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 200 }),
      });
    }

    return route.continue();
  };
}
