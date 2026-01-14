import { ERROR_MESSAGES } from '../../constants/messages';
import { URLS } from '../../constants/urls';
import { setAllureMetadata, step } from '../../helpers/allure';
import { expect, test } from '../../test';

test('Пользователь с ролью отличной от администратора не имеет доступ к странице участников в настройках @allure.id=122000 @role=engineer @smoke', async ({
  membersPagePOM,
  errorAlertPOM,
}) => {
  await setAllureMetadata({
    owner: 'ozhegovmv',
    backend: 'real',
    tags: ['smoke', 'access'],
  });

  await step(`Под ролью инженера перейти на страницу "${URLS.SETTINGS_MEMBERS}"`, async () => {
    await membersPagePOM.open();
  });

  await step('Выполнить проверки:', async () => {
    await step('Заголовок страницы не отображается', async () => {
      await expect(membersPagePOM.pageHeader).toBeHidden();
    });

    await step(`Отображается сообщение об ошибке - "${ERROR_MESSAGES.NO_ACCESS}"`, async () => {
      await expect(errorAlertPOM.root).toHaveText(ERROR_MESSAGES.NO_ACCESS);
    });
  });
});
