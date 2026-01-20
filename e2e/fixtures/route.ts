import {
  dashboardsRouteHandler,
  definitionsRouteHandler,
  discussionRouteHandler,
  experimentRouteHandler,
  holdoutRouteHandler,
  organizationRouteHandler,
  savedQueriesRouteHandler,
  sdkConnectionsRouteHandler,
} from '../mocks/routes';
import { mockFixture } from './mock';

/**
 * Фикстура для централизованного роут-мокинга API.
 *
 * Расширяет `mockFixture` и автоматически регистрирует
 * `page.route(...)` handlers, если тест запущен в mock-режиме.
 */
export const routeFixture = mockFixture.extend({
  page: async ({ page, mock }, use) => {
    if (mock) {
      await page.route('**/experiment/**', experimentRouteHandler());
      await page.route('**/organization', organizationRouteHandler());
      await page.route('**/organization/definitions', definitionsRouteHandler());
      await page.route('**/holdout*', holdoutRouteHandler());
      await page.route('**/sdk-connections*', sdkConnectionsRouteHandler());
      await page.route('**/saved-queries*', savedQueriesRouteHandler());
      await page.route('**/saved-queries/**', savedQueriesRouteHandler());
      await page.route('**/dashboards/**', dashboardsRouteHandler());
      await page.route('**/discussion/**', discussionRouteHandler());
    }

    await use(page);
  },
});
