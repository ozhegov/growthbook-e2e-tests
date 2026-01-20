import type { Route } from '@playwright/test';
import { organizationFixture } from '../fixtures';

/**
 * Route handler для mock-запроса организации.
 *
 * Возвращает фикстуру организации.
 * Используется только в тестах с включённым mock-режимом.
 */
export function organizationRouteHandler() {
  return async (route: Route) => {
    const req = route.request();
    const url = req.url();

    if (req.method() === 'GET' && url.endsWith('/organization')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(organizationFixture),
      });
    }

    return route.continue();
  };
}
