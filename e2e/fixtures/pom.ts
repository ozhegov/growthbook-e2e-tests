import { test as base } from '@playwright/test';
import { ErrorAlertPOM, ExperimentPagePOM, MembersPagePOM, WelcomePagePOM } from '../poms';

/**
 * Фикстура Page Object Models (POM).
 *
 * Для каждого теста создает новые экземпляры POM для обеспечения изоляции.
 */

export interface PomFixtures {
  membersPagePOM: MembersPagePOM;
  errorAlertPOM: ErrorAlertPOM;
  welcomePagePOM: WelcomePagePOM;
  experimentPagePOM: ExperimentPagePOM;
}

export const pomFixture = base.extend<PomFixtures>({
  membersPagePOM: async ({ page }, use) => use(new MembersPagePOM(page)),
  errorAlertPOM: async ({ page }, use) => use(new ErrorAlertPOM(page)),
  welcomePagePOM: async ({ page }, use) => use(new WelcomePagePOM(page)),
  experimentPagePOM: async ({ page }, use) => use(new ExperimentPagePOM(page)),
});
