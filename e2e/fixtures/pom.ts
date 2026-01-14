import { test as base } from '@playwright/test';
import { MembersPagePOM } from '../poms/pages/members.pom';

/**
 * Фикстура Page Object Models (POM).
 *
 * Для каждого теста создает новые экземпляры POM для обеспечения изоляции.
 */

export interface PomFixtures {
  membersPagePOM: MembersPagePOM;
}

export const pomFixture = base.extend<PomFixtures>({
  membersPagePOM: async ({ page }, use) => use(new MembersPagePOM(page)),
});
