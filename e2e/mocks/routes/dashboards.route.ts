import type { Route } from '@playwright/test';
import { dashboardsFixture } from '../fixtures';

/**
 * Route handler для mock-запросов дашбордов эксперимента.
 *
 * Возвращает фикстуру дашбордов, связанную с экспериментом.
 * Используется только в тестах с включённым mock-режимом.
 */
export function dashboardsRouteHandler() {
  return async (route: Route) => {
    const req = route.request();

    if (!['xhr', 'fetch'].includes(req.resourceType())) {
      return route.continue();
    }

    const url = new URL(req.url());
    const { pathname } = url;

    if (req.method() === 'GET' && pathname.startsWith('/dashboards/by-experiment/')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(dashboardsFixture),
      });
    }

    return route.continue();
  };
}
