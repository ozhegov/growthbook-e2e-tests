import type { Route } from '@playwright/test';
import { holdoutFixture } from '../fixtures';

/**
 * Route handler для mock-запроса holdout-групп.
 *
 * Возвращает фикстуру holdout-конфигурации.
 * Используется только в тестах с включённым mock-режимом.
 */
export function holdoutRouteHandler() {
  return async (route: Route) => {
    const req = route.request();
    const url = new URL(req.url());

    if (req.method() === 'GET' && url.pathname === '/holdout') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(holdoutFixture),
      });
    }

    return route.continue();
  };
}
