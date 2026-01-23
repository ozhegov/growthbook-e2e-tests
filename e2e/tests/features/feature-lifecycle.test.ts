import { createFeature } from '../../api';
import { FEATURE_PAGE, URLS } from '../../constants';
import { getFeature } from '../../factories';
import { setAllureMetadata, step } from '../../helpers/allure';
import { get } from '../../storage/storage.manager';
import { expect, test } from '../../test';

test('Фича может быть заархивирована и разархивирована @allure.id=122008 @role=admin @regression', async ({
  faker,
  featurePagePOM,
  errorAlertPOM,
  request,
}) => {
  await setAllureMetadata({
    owner: 'ozhegovmv',
    backend: 'real',
    tags: ['regression', 'feature', 'feature_lifecycle'],
  });

  const featureId = await step('Создать фичу по API', async () => {
    const featureData = getFeature(faker);
    const secretKey = await get('apiKey');

    const { feature } = await createFeature(request, secretKey, featureData);
    const { id: featureId } = feature;

    return featureId;
  });

  await step(
    `Под ролью администратора перейти на страницу созданной фичи "${URLS.FEATURE_PAGE(featureId)}"`,
    async () => {
      await featurePagePOM.open(featureId);
    },
  );
  await step('Нажать на иконку дополнительных действий', async () => {
    await featurePagePOM.openActionMenu();
  });
  await step(
    `Перейти к архивации фичи, нажав на кнопку "${FEATURE_PAGE.BUTTONS.ARCHIVE}"`,
    async () => {
      await featurePagePOM.archiveFeature();
    },
  );
  await step(
    `В модальном окне "${FEATURE_PAGE.MODALS.ARCHIVE_FEATURE}" подтвердить архивацию, нажав на кнопку "${FEATURE_PAGE.BUTTONS.ARCHIVE}"`,
    async () => {
      await featurePagePOM.submitArchiveFeature();
    },
  );

  await step(
    `На странице отображается сообщение "${FEATURE_PAGE.MESSAGES.FEATURE_IS_ARCHIVED}"`,
    async () => {
      await expect(errorAlertPOM.noticeAlert).toHaveText(FEATURE_PAGE.MESSAGES.FEATURE_IS_ARCHIVED);
    },
  );

  await step('Нажать на иконку дополнительных действий', async () => {
    await featurePagePOM.openActionMenu();
  });
  await step(
    `Перейти к разархивации фичи, нажав на кнопку "${FEATURE_PAGE.BUTTONS.UNARCHIVE}"`,
    async () => {
      await featurePagePOM.unarchiveFeature();
    },
  );
  await step(
    `В модальном окне "${FEATURE_PAGE.MODALS.UNARCHIVE_FEATURE}" подтвердить разархивацию, нажав на кнопку "${FEATURE_PAGE.BUTTONS.UNARCHIVE}"`,
    async () => {
      await featurePagePOM.submitUnarchiveFeature();
    },
  );

  await step(
    `На странице не отображается сообщение "${FEATURE_PAGE.MESSAGES.FEATURE_IS_ARCHIVED}"`,
    async () => {
      await expect(errorAlertPOM.noticeAlert).toBeHidden();
      await expect(featurePagePOM.root).not.toHaveText(FEATURE_PAGE.MESSAGES.FEATURE_IS_ARCHIVED);
    },
  );
});
