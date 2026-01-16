import { RUN_ID } from '../../config';
import { ERROR_MESSAGES, URLS, WELCOME_PAGE } from '../../constants';
import { setAllureMetadata, step } from '../../helpers/allure';
import { expect, test } from '../../test';
import type { UserRegistration } from '../../types/user';

test('Пользователь с ролью отличной от администратора не имеет доступ к странице участников в настройках @allure.id=122000 @role=engineer @smoke', async ({
  membersPagePOM,
  errorAlertPOM,
}) => {
  await setAllureMetadata({
    owner: 'ozhegovmv',
    backend: 'real',
    tags: ['smoke', 'access', 'settings'],
  });

  await step(`Под ролью инженера перейти на страницу "${URLS.SETTINGS_MEMBERS}"`, async () => {
    await membersPagePOM.open();
  });

  await step('Выполнить проверки:', async () => {
    await step('Заголовок страницы не отображается', async () => {
      await expect(membersPagePOM.pageHeader).toBeHidden();
    });

    await step(`Отображается сообщение об ошибке - "${ERROR_MESSAGES.NO_ACCESS}"`, async () => {
      await expect(errorAlertPOM.alert).toHaveText(ERROR_MESSAGES.NO_ACCESS);
    });
  });
});

test('Пользователь без приглашения администратора не может завершить регистрацию @allure.id=122000 @role=guest @smoke', async ({
  welcomePagePOM,
  errorAlertPOM,
}) => {
  await setAllureMetadata({
    owner: 'ozhegovmv',
    backend: 'real',
    tags: ['smoke', 'access', 'welcome_page'],
  });

  const userData: UserRegistration = {
    email: `uninvited_${RUN_ID}@growthbook.local`,
    password: 'Test123!',
    name: 'Vasya',
  };

  await step(
    'На главной странице неавторизованным пользователем нажать на ссылку для регистрации',
    async () => {
      await welcomePagePOM.open();
      await welcomePagePOM.openRegistrationForm();
    },
  );

  await step(
    `Заполнить регистрационную форму:
    - поле "${WELCOME_PAGE.INPUTS.NAME}": "${userData.name}",
    - поле "${WELCOME_PAGE.INPUTS.EMAIL}": "${userData.email}",
    - поле "${WELCOME_PAGE.INPUTS.PASSWORD}": "${userData.password}"`,
    async () => {
      await welcomePagePOM.fillRegistrationForm(userData);
    },
  );

  await step('Нажать на кнопку создания аккаунта', async () => {
    await welcomePagePOM.submitRegistrationForm();
  });

  await step(
    `Отображается сообщение об ошибке- "${ERROR_MESSAGES.INVITATION_REQUIRED}"`,
    async () => {
      await expect(errorAlertPOM.alert).toHaveText(ERROR_MESSAGES.INVITATION_REQUIRED);
    },
  );
});
