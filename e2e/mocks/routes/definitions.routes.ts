import type { Route } from '@playwright/test';
import { definitionsFixture } from '../fixtures';

/**
 * Route handler для mock-запроса определений организации.
 *
 * Возвращает статическую фикстуру definitions.
 * Используется только в тестах с включённым mock-режимом.
 */
export function definitionsRouteHandler() {
  return async (route: Route) => {
    const req = route.request();
    const url = new URL(req.url());

    if (req.method() === 'GET' && url.pathname === '/organization/definitions') {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(definitionsFixture),
      });
    }

    return route.continue();
  };
}
