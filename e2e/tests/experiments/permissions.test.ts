import { EXPERIMENT_PAGE, URLS } from '../../constants';
import { setAllureMetadata, step } from '../../helpers/allure';
import { currentExperiment, EXPERIMENT_STATUS, setExperimentStatus } from '../../mocks/fixtures';
import { expect, test } from '../../test';

test('Пользователь с ролью инженера имеет доступ только на просмотр запущенного эксперимента @allure.id=122004 @role=engineer @regression @mock', async ({
  experimentPagePOM,
}) => {
  await setAllureMetadata({
    owner: 'ozhegovmv',
    backend: 'mock',
    tags: ['regression', 'permissions', 'experiment'],
  });

  await step(`Задать статус "${EXPERIMENT_STATUS.RUNNING}" для мок-эксперимента`, async () => {
    setExperimentStatus(EXPERIMENT_STATUS.RUNNING);
  });

  await step(
    `Под ролью инженера перейти на страницу запущенного эксперимента "${URLS.EXPERIMENT_PAGE(currentExperiment.id)}"`,
    async () => {
      await experimentPagePOM.open(currentExperiment.id);
    },
  );

  await step('Выполнить проверки на странице:', async () => {
    await step(`Отображается бейдж с текстом "${EXPERIMENT_PAGE.BADGES.RUNNING}"`, async () => {
      await expect(experimentPagePOM.experimentBadge(EXPERIMENT_PAGE.BADGES.RUNNING)).toBeVisible();
    });
    await step(`Не отображается кнопка "${EXPERIMENT_PAGE.BUTTONS.MAKE_CHANGES}"`, async () => {
      await expect(experimentPagePOM.makeChangesButton).toBeHidden();
    });
    await step(`Не отображается кнопка "${EXPERIMENT_PAGE.BUTTONS.STOP_EXPERIMENT}"`, async () => {
      await expect(experimentPagePOM.stopExperimentButton).toBeHidden();
    });
  });

  await step('Нажать на иконку дополнительных действий', async () => {
    await experimentPagePOM.openActionMenu();
  });

  await step('Выполнить проверки в дополнительно меню:', async () => {
    await step(`Не отображается кнопка "${EXPERIMENT_PAGE.BUTTONS.EDIT_STATUS}"`, async () => {
      await expect(experimentPagePOM.editStatusButton).toBeHidden();
    });
    await step(`Не отображается кнопка "${EXPERIMENT_PAGE.BUTTONS.EDIT_INFO}"`, async () => {
      await expect(experimentPagePOM.editInfoButton).toBeHidden();
    });
    await step(`Отображается кнопка "${EXPERIMENT_PAGE.BUTTONS.EDIT_PHASE}"`, async () => {
      await expect(experimentPagePOM.editPhaseButton).toBeVisible();
    });
    await step(`Отображается кнопка "${EXPERIMENT_PAGE.BUTTONS.AUDIT_LOG}"`, async () => {
      await expect(experimentPagePOM.auditLogButton).toBeVisible();
    });
  });
});
