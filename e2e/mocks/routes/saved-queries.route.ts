import type { Route } from '@playwright/test';
import { savedQueriesFixture } from '../fixtures';

/**
 * Route handler для mock-запросов сохранённых запросов.
 *
 * Возвращает фикстуру saved queries.
 * Используется только в тестах с включённым mock-режимом.
 */
export function savedQueriesRouteHandler() {
  return async (route: Route) => {
    const req = route.request();
    const url = new URL(req.url());

    if (req.method() === 'GET' && url.pathname.includes('/saved-queries')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(savedQueriesFixture),
      });
    }

    return route.continue();
  };
}
