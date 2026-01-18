import { createUserApiContext, registerUser } from '../../api';
import { MEMBERS_PAGE, URLS } from '../../constants';
import { createUserForRegistration } from '../../factories';
import { setAllureMetadata, step } from '../../helpers/allure';
import { expect, test } from '../../test';

test('Пользователь с ролью администратор имеет права добавление членов команды, зарегистрировавшихся не по ссылке-приглашению @allure.id=122000 @role=admin @smoke', async ({
  membersPagePOM,
  faker,
}) => {
  await setAllureMetadata({
    owner: 'ozhegovmv',
    backend: 'real',
    tags: ['smoke', 'invite', 'members'],
  });

  const user = createUserForRegistration(faker);

  await step(
    `Зарегистрировать пользователя "${user.email}" по API без приглашения от администратора`,
    async () => {
      const guestReq = await createUserApiContext('GUEST');
      await registerUser(guestReq, user);
      await guestReq.dispose();
    },
  );
  await step(
    `Под ролью администратора перейти на страницу "${URLS.SETTINGS_MEMBERS}"`,
    async () => {
      await membersPagePOM.open();
    },
  );
  await step(
    `В секции "${MEMBERS_PAGE.SECTIONS.ORPHANED_USERS}" нажать на иконку дополнительных действий у пользователя "${user.email}"`,
    async () => {
      await membersPagePOM.openOrphanedUsersActionMenu(user.email);
    },
  );
  await step(
    `Открыть модальное окно "${MEMBERS_PAGE.MODALS.ADD_USER}" нажав на кнопку "${MEMBERS_PAGE.BUTTONS.ADD_BACK_TO_ACCOUNT}"`,
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
    `В секции "${MEMBERS_PAGE.SECTIONS.ACTIVE_MEMBERS}" отображается ранее добавленный пользователь "${user.email}"`,
    async () => {
      await expect(membersPagePOM.activeMembersTable).toContainText(user.email);
    },
  );
});
