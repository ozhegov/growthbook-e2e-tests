import type { Route } from '@playwright/test';
import { experiments } from '../fixtures/experiment/scenarios';
import { currentExperiment } from '../fixtures/experiment/state';

/**
 * Route handler для mock-экспериментов.
 *
 * Используется только в тестах с включённым mock-режимом.
 * Перехватывает API-запросы, связанные с экспериментом, включая:
 *
 * - GET    /experiment/:id
 * - GET    /experiment/:id/watchers
 * - GET    /experiment/:id/snapshot/:index
 * - GET    /experiment/:id/incremental-refresh
 * - GET    /experiment/:id/reports
 * - POST   /experiment/:id/status
 * - POST   /experiment/:id/stop
 *
 * Состояние эксперимента хранится в `currentExperiment`
 * и может изменяться в процессе теста.
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
          linkedFeatures: [],
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

    // POST /experiment/:id/status
    if (method === 'POST' && pathname.endsWith('/status')) {
      const body = req.postDataJSON() as { status: 'running' };

      if (body.status === 'running') {
        Object.assign(currentExperiment, experiments.running);
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
