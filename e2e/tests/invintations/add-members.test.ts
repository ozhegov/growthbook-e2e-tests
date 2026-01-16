import { registerUser } from '../../api/auth';
import { RUN_ID } from '../../config';
import { MEMBERS_PAGE } from '../../constants/pages/members-page';
import { URLS } from '../../constants/urls';
import { setAllureMetadata, step } from '../../helpers/allure';
import { expect, test } from '../../test';
import type { UserRegistration } from '../../types/user';

test('Пользователь с ролью администратор имеет права добавление членов команды, зарегистрировавшихся не по ссылке-приглашению @allure.id=122001 @role=admin @smoke', async ({
  request,
  membersPagePOM,
}) => {
  await setAllureMetadata({
    owner: 'ozhegovmv',
    backend: 'real',
    tags: ['smoke', 'invite', 'members'],
  });

  const userData: UserRegistration = {
    email: `uninvited_${RUN_ID}@growthbook.local`,
    password: 'Test123!',
    name: 'Vasya',
  };

  await step(
    `Зарегистрировать пользователя "${userData.email}" по API без приглашения от администратора`,
    async () => {
      await registerUser(request, userData);
    },
  );
  await step(
    `Под ролью администратора перейти на страницу "${URLS.SETTINGS_MEMBERS}"`,
    async () => {
      await membersPagePOM.open();
    },
  );
  await step(
    `В секции "${MEMBERS_PAGE.SECTIONS.ORPHANED_USERS}" нажать на иконку дополнительных действий у пользователя "${userData.email}"`,
    async () => {
      await membersPagePOM.openOrphanedUsersActionMenu(userData.email);
    },
  );
  await step(
    `Открыть модальное окно "${MEMBERS_PAGE.MODAL.ADD_USER}" нажав на кнопку "${MEMBERS_PAGE.BUTTONS.ADD_BACK_TO_ACCOUNT}"`,
    async () => {
      await membersPagePOM.openAddUserModal();
    },
  );
  await step(
    `В селекторе "${MEMBERS_PAGE.DROPDOWNS.GLOBAL_ROLE.LABEL}" выбрать роль "${MEMBERS_PAGE.DROPDOWNS.GLOBAL_ROLE.OPTIONS.ENGINEER}"`,
    async () => {
      await membersPagePOM.selectGlobalRole(MEMBERS_PAGE.DROPDOWNS.GLOBAL_ROLE.OPTIONS.ENGINEER);
    },
  );
  await step(
    `Нажать на кнопку добавления пользователя "${MEMBERS_PAGE.BUTTONS.ADD_USER}"`,
    async () => {
      await membersPagePOM.addUser();
    },
  );
  await step(
    `В секции "${MEMBERS_PAGE.SECTIONS.ACTIVE_MEMBERS}" отображается ранее добавленный пользователь "${userData.email}"`,
    async () => {
      await expect(membersPagePOM.activeMembersTable).toContainText(userData.email);
    },
  );
});
