import { EXPERIMENT_PAGE, URLS } from '../../constants';
import { setAllureMetadata, step } from '../../helpers/allure';
import { currentExperiment, EXPERIMENT_STATUS, setExperimentStatus } from '../../mocks/fixtures';
import { expect, test } from '../../test';

test('Старт нового эксперимента @allure.id=122011 @role=experimenter @regression @smoke @mock', async ({
  experimentPagePOM,
}) => {
  await setAllureMetadata({
    owner: 'ozhegovmv',
    backend: 'mock',
    tags: ['regression', 'experiment', 'experiment_lifecycle'],
  });

  await step(`Задать статус "${EXPERIMENT_STATUS.DRAFT}" для мок-эксперимента`, async () => {
    setExperimentStatus(EXPERIMENT_STATUS.DRAFT);
  });

  await step(
    `Под ролью экспериментатора перейти на страницу черновика эксперимента "${URLS.EXPERIMENT_PAGE(currentExperiment.id)}"`,
    async () => {
      await experimentPagePOM.open(currentExperiment.id);
    },
  );

  await step(`Нажать на кнопку "${EXPERIMENT_PAGE.BUTTONS.START_EXPERIMENT}"`, async () => {
    await experimentPagePOM.startExperiment();
  });

  await step(
    `В модальном окне "${EXPERIMENT_PAGE.MODALS.START_EXPERIMENT}" подтвердить старт эксперимента, нажав на кнопку "${EXPERIMENT_PAGE.BUTTONS.START_NOW}"`,
    async () => {
      await experimentPagePOM.clickStartNowButton();
    },
  );

  await step('Выполнить проверки на странице:', async () => {
    await step(`Отображается бейдж с текстом "${EXPERIMENT_PAGE.BADGES.RUNNING}"`, async () => {
      await expect(experimentPagePOM.experimentBadge(EXPERIMENT_PAGE.BADGES.RUNNING)).toBeVisible();
    });
    await step(`Отображается кнопка "${EXPERIMENT_PAGE.BUTTONS.MAKE_CHANGES}"`, async () => {
      await expect(experimentPagePOM.makeChangesButton).toBeVisible();
    });
    await step(`Отображается кнопка "${EXPERIMENT_PAGE.BUTTONS.STOP_EXPERIMENT}"`, async () => {
      await expect(experimentPagePOM.stopExperimentButton).toBeVisible();
    });
    await step(`Не отображается кнопка "${EXPERIMENT_PAGE.BUTTONS.START_EXPERIMENT}"`, async () => {
      await expect(experimentPagePOM.startExperimentButton).toBeHidden();
    });
  });
});

test('Остановка эксперимента с выводом "Won" @allure.id=122012 @role=experimenter @regression @mock', async ({
  experimentPagePOM,
}) => {
  await setAllureMetadata({
    owner: 'ozhegovmv',
    backend: 'mock',
    tags: ['regression', 'experiment', 'experiment_lifecycle'],
  });

  await step(`Задать статус "${EXPERIMENT_STATUS.RUNNING}" для мок-эксперимента`, async () => {
    setExperimentStatus(EXPERIMENT_STATUS.RUNNING);
  });

  await step(
    `Под ролью экспериментатора перейти на страницу идущего эксперимента "${URLS.EXPERIMENT_PAGE(currentExperiment.id)}"`,
    async () => {
      await experimentPagePOM.open(currentExperiment.id);
    },
  );

  await step(`Нажать на кнопку "${EXPERIMENT_PAGE.BUTTONS.STOP_EXPERIMENT}"`, async () => {
    await experimentPagePOM.stopExperiment();
  });

  await step(`В модальном окне "${EXPERIMENT_PAGE.MODALS.STOP_EXPERIMENT}":`, async () => {
    await step(
      `В селекторе "${EXPERIMENT_PAGE.DROPDOWNS.CONCLUSION.LABEL}" выбрать вывод по эксперименту "${EXPERIMENT_PAGE.DROPDOWNS.CONCLUSION.OPTIONS.WON}"`,
      async () => {
        await experimentPagePOM.selectConclusion(EXPERIMENT_PAGE.DROPDOWNS.CONCLUSION.OPTIONS.WON);
      },
    );
    await step(
      `В селекторе "${EXPERIMENT_PAGE.DROPDOWNS.VARIATION.LABEL}" выбрать вариант к релизу "${EXPERIMENT_PAGE.DROPDOWNS.VARIATION.OPTIONS.CONTROL}"`,
      async () => {
        await experimentPagePOM.selectVariation(
          EXPERIMENT_PAGE.DROPDOWNS.VARIATION.OPTIONS.CONTROL,
        );
      },
    );
    await step(
      `Подтвердить остановку эксперимента, нажав на кнопку "${EXPERIMENT_PAGE.BUTTONS.STOP}"`,
      async () => {
        await experimentPagePOM.clickStopButton();
      },
    );
  });

  await step('Выполнить проверки на странице:', async () => {
    await step(`Отображается бейдж с текстом "${EXPERIMENT_PAGE.BADGES.WON}"`, async () => {
      await expect(experimentPagePOM.experimentBadge(EXPERIMENT_PAGE.BADGES.WON)).toBeVisible();
    });
    await step(`Не отображается кнопка "${EXPERIMENT_PAGE.BUTTONS.MAKE_CHANGES}"`, async () => {
      await expect(experimentPagePOM.makeChangesButton).toBeHidden();
    });
    await step(`Не отображается кнопка "${EXPERIMENT_PAGE.BUTTONS.STOP_EXPERIMENT}"`, async () => {
      await expect(experimentPagePOM.stopExperimentButton).toBeHidden();
    });
    await step(`Не отображается кнопка "${EXPERIMENT_PAGE.BUTTONS.START_EXPERIMENT}"`, async () => {
      await expect(experimentPagePOM.startExperimentButton).toBeHidden();
    });
    await step(`Отображается кнопка "${EXPERIMENT_PAGE.BUTTONS.SHARE}"`, async () => {
      await expect(experimentPagePOM.shareExperimentButton).toBeVisible();
    });
    await step(
      `Отображается заголовок "${EXPERIMENT_PAGE.TABS.OVERVIEW.SECTIONS.STOPPED_INFO}"`,
      async () => {
        await expect(experimentPagePOM.stoppedExperimentInfoHeader).toContainText(
          EXPERIMENT_PAGE.TABS.OVERVIEW.SECTIONS.STOPPED_INFO,
        );
      },
    );
  });
});
