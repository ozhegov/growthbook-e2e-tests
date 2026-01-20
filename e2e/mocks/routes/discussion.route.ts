import type { Route } from '@playwright/test';
import { discussionFixture } from '../fixtures';

/**
 * Route handler для mock-запросов обсуждений эксперимента.
 *
 * Используется только в тестах с включённым mock-режимом.
 */
export function discussionRouteHandler() {
  return async (route: Route) => {
    const req = route.request();

    if (!['xhr', 'fetch'].includes(req.resourceType())) {
      return route.continue();
    }

    const url = new URL(req.url());
    const { pathname } = url;

    if (req.method() === 'GET' && pathname.startsWith('/discussion/experiment/')) {
      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(discussionFixture),
      });
    }

    return route.continue();
  };
}
