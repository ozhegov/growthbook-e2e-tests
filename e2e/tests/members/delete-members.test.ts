import { addUserToTeam, createUserApiContext } from '../../api';
import { MEMBERS_PAGE, URLS } from '../../constants';
import { createUserForRegistration, getUserRole } from '../../factories';
import { setAllureMetadata, step } from '../../helpers/allure';
import { expect, test } from '../../test';
import { apiRoleToTest } from '../../types/user-role.adapter';

test('Пользователь с ролью администратор имеет право на удаление членов команды @allure.id=122002 @role=admin @smoke', async ({
  membersPagePOM,
  faker,
  userApi,
}) => {
  await setAllureMetadata({
    owner: 'ozhegovmv',
    backend: 'real',
    tags: ['smoke', 'delete_users', 'members'],
  });

  const user = createUserForRegistration(faker);
  const role = apiRoleToTest(getUserRole(faker));

  const userId = await step(
    `Зарегистрировать пользователя "${user.email}" и получить его ID по API`,
    async () => {
      const { userId } = await userApi.register(user);

      return userId;
    },
  );
  await step('Добавить пользователя в члены команды администратором по API', async () => {
    const adminReq = await createUserApiContext('ADMIN');

    try {
      await addUserToTeam(adminReq, userId, role);
    } finally {
      await adminReq.dispose();
    }
  });

  await step(
    `Под ролью администратора перейти на страницу "${URLS.SETTINGS_MEMBERS}"`,
    async () => {
      await membersPagePOM.open();
    },
  );
  await step(
    `В секции "${MEMBERS_PAGE.SECTIONS.ACTIVE_MEMBERS}" нажать на иконку дополнительных действий у пользователя "${user.email}"`,
    async () => {
      await membersPagePOM.openActiveMembersActionMenu(user.email);
    },
  );
  await step(
    `Открыть модальное окно "${MEMBERS_PAGE.MODALS.DELETE_USER}" нажав на кнопку "${MEMBERS_PAGE.BUTTONS.REMOVE_USER}"`,
    async () => {
      await membersPagePOM.openDeleteUserModal();
    },
  );
  await step(`Подтвердить удаление нажав на кнопку "${MEMBERS_PAGE.BUTTONS.DELETE}"`, async () => {
    await membersPagePOM.deleteUser();
  });

  await step(
    `В секции "${MEMBERS_PAGE.SECTIONS.ACTIVE_MEMBERS}" не отображается ранее удаленный пользователь "${user.email}"`,
    async () => {
      await expect(membersPagePOM.activeMembersTable).not.toContainText(user.email);
    },
  );
});
