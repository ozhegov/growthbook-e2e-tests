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

    const experimentId = pathname.split('/experiment/')[1]?.split('/')[0];

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
                organization: 'org_405opf1omkmv6g3w',
                owner: '',
                project: '',
                dateCreated: '2026-01-20T20:06:16.712Z',
                dateUpdated: '2026-01-20T20:06:16.712Z',
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
                        id: 'fr_405opf1omkn0y8w8',
                        condition: '',
                        enabled: true,
                        scheduleRules: [],
                        experimentId: 'exp_405opf1omkn0vgeq',
                        variations: [
                          {
                            value: 'true',
                            variationId: 'var_mkn0uvrn',
                          },
                          {
                            value: 'false',
                            variationId: 'var_mkn0uvrm',
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
                linkedExperiments: ['exp_405opf1omkn0vgeq'],
                jsonSchema: {
                  schemaType: 'schema',
                  simple: {
                    type: 'object',
                    fields: [],
                  },
                  schema: '',
                  date: '2026-01-20T20:06:16.712Z',
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
                  variationId: 'var_mkn0uvrn',
                },
                {
                  value: 'false',
                  variationId: 'var_mkn0uvrm',
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
