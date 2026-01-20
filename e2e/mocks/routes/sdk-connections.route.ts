import type { Route } from '@playwright/test';
import { sdkConnectionsFixture } from '../fixtures';

/**
 * Route handler для mock-запросов SDK connections.
 *
 * Возвращает фикстуру SDK подключений.
 * Используется только в тестах с включённым mock-режимом.
 */
export function sdkConnectionsRouteHandler() {
  return async (route: Route) => {
    const req = route.request();
    const url = new URL(req.url());

    if (req.method() === 'GET' && url.pathname === '/sdk-connections') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(sdkConnectionsFixture),
      });
    }

    return route.continue();
  };
}
