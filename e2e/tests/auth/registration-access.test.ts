import { ERROR_MESSAGES, URLS, WELCOME_PAGE } from '../../constants';
import { createUserForRegistration } from '../../factories';
import { setAllureMetadata, step } from '../../helpers/allure';
import { expect, test } from '../../test';

test('Пользователь с ролью отличной от администратора не имеет доступ к странице участников в настройках @allure.id=122003 @role=engineer @smoke', async ({
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
      await expect(errorAlertPOM.dangerAlert).toHaveText(ERROR_MESSAGES.NO_ACCESS);
    });
  });
});

test('Пользователь без приглашения администратора не может завершить регистрацию @allure.id=122001 @role=guest @smoke', async ({
  welcomePagePOM,
  errorAlertPOM,
  faker,
}) => {
  await setAllureMetadata({
    owner: 'ozhegovmv',
    backend: 'real',
    tags: ['smoke', 'access', 'welcome_page'],
  });

  const user = createUserForRegistration(faker);

  await step(
    'На главной странице неавторизованным пользователем нажать на ссылку для регистрации',
    async () => {
      await welcomePagePOM.open();
      await welcomePagePOM.openRegistrationForm();
    },
  );

  await step(
    `Заполнить регистрационную форму:
    - поле "${WELCOME_PAGE.INPUTS.NAME}": "${user.name}",
    - поле "${WELCOME_PAGE.INPUTS.EMAIL}": "${user.email}",
    - поле "${WELCOME_PAGE.INPUTS.PASSWORD}": "${user.password}"`,
    async () => {
      await welcomePagePOM.fillRegistrationForm(user);
    },
  );

  await step('Нажать на кнопку создания аккаунта', async () => {
    await welcomePagePOM.submitRegistrationForm();
  });

  await step(
    `Отображается сообщение об ошибке - "${ERROR_MESSAGES.INVITATION_REQUIRED}"`,
    async () => {
      await expect(errorAlertPOM.dangerAlert).toHaveText(ERROR_MESSAGES.INVITATION_REQUIRED);
    },
  );
});
