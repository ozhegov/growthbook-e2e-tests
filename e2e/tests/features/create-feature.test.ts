import {
  DEFAULT_PROJECT_NAME,
  ERROR_MESSAGES,
  FEATURE_PAGE,
  FEATURES_PAGE,
  URLS,
} from '../../constants';
import { getFeature, getTag } from '../../factories';
import { setAllureMetadata, step } from '../../helpers/allure';
import { expect, test } from '../../test';
import { FEATURE_INVALID_KEYS } from '../../test-data/feature';
import { USERS } from '../../test-data/users';

test('Полный флоу создания новой фичи @allure.id=122005 @role=engineer @smoke', async ({
  faker,
  featuresPagePOM,
  featurePagePOM,
}) => {
  await setAllureMetadata({
    owner: 'ozhegovmv',
    backend: 'real',
    tags: ['smoke', 'feature', 'feature_ff'],
  });

  const owner = USERS[1].name;
  const featureData = getFeature(faker);
  const tag = getTag(faker, 'feat');

  await step(
    `Под ролью инженера перейти на страницу создания фичи "${URLS.FEATURES_PAGE}"`,
    async () => {
      await featuresPagePOM.open();
    },
  );
  await step(
    `Перейти к созданию фичи, нажав на кнопку "${FEATURES_PAGE.BUTTONS.ADD_FEATURE}"`,
    async () => {
      await featuresPagePOM.addFeature();
    },
  );

  await step(`В модальном окне "${FEATURES_PAGE.MODALS.CREATE_FEATURE}":`, async () => {
    await step(
      `В поле "${FEATURES_PAGE.INPUTS.FEATURE_KEY}" ввести "${featureData.id}"`,
      async () => {
        await featuresPagePOM.fillFeatureKey(featureData.id);
      },
    );
    await step(
      `Раскрыть поле "${FEATURES_PAGE.INPUTS.TAGS}", нажав на бейдж "${FEATURES_PAGE.BADGES.TAGS}"`,
      async () => {
        await featuresPagePOM.expandTagsInput();
      },
    );
    await step(
      `Раскрыть поле "${FEATURES_PAGE.INPUTS.DESCRIPTION}", нажав на бейдж "${FEATURES_PAGE.BADGES.DESCRIPTION}"`,
      async () => {
        await featuresPagePOM.expandDescriptionInput();
      },
    );
    await step(`В поле "${FEATURES_PAGE.INPUTS.TAGS}" ввести "${tag}"`, async () => {
      await featuresPagePOM.addFeatureTag(tag);
    });
    await step(
      `В поле "${FEATURES_PAGE.INPUTS.DESCRIPTION}" ввести "${featureData.description}"`,
      async () => {
        await featuresPagePOM.fillFeatureDescription(featureData.description);
      },
    );
    await step(
      `В селекторе "${FEATURES_PAGE.DROPDOWNS.PROJECT.LABEL}" выбрать "${DEFAULT_PROJECT_NAME}"`,
      async () => {
        await featuresPagePOM.selectFeatureProject(DEFAULT_PROJECT_NAME);
      },
    );
    await step(
      `В селекторе "${FEATURES_PAGE.DROPDOWNS.VALUE.LABEL}" выбрать "${FEATURES_PAGE.DROPDOWNS.VALUE.OPTIONS.BOOLEAN}"`,
      async () => {
        await featuresPagePOM.selectValueType(FEATURES_PAGE.DROPDOWNS.VALUE.OPTIONS.BOOLEAN);
      },
    );
    await step(`Создать фичу, нажав на кнопку "${FEATURES_PAGE.BUTTONS.CREATE}"`, async () => {
      await featuresPagePOM.createFeature();
      await featuresPagePOM.waitForFeatureCreated();
    });

    await step('Выполнить проверки на странице созданного эксперимента:', async () => {
      await step(
        `В блоке "${FEATURE_PAGE.BOXES.PROJECT}" отображается ранее выбранный проект для фичи - "${DEFAULT_PROJECT_NAME}"`,
        async () => {
          await expect(featurePagePOM.box(FEATURE_PAGE.BOXES.PROJECT)).toContainText(
            DEFAULT_PROJECT_NAME,
          );
        },
      );
      await step(
        `В блоке "${FEATURE_PAGE.BOXES.KEY}" отображается ранее добавленное название фичи - "${featureData.id}"`,
        async () => {
          await expect(featurePagePOM.box(FEATURE_PAGE.BOXES.KEY)).toContainText(featureData.id);
        },
      );
      await step(
        `В блоке "${FEATURE_PAGE.BOXES.TYPE}" отображается ранее заданный тип значения фичи - "${featureData.valueType}"`,
        async () => {
          await expect(featurePagePOM.box(FEATURE_PAGE.BOXES.TYPE)).toContainText(
            featureData.valueType,
          );
        },
      );
      await step(
        `В блоке "${FEATURE_PAGE.BOXES.OWNER}" отображается текущий пользователь - "${owner}"`,
        async () => {
          await expect(featurePagePOM.box(FEATURE_PAGE.BOXES.OWNER)).toContainText(owner);
        },
      );
      await step(
        `В блоке "${FEATURE_PAGE.BOXES.TAGS}" отображается ранее добавленный тег - "${tag}"`,
        async () => {
          await expect(featurePagePOM.box(FEATURE_PAGE.BOXES.TAGS)).toContainText(tag);
        },
      );
      await step(
        `В блоке "${FEATURE_PAGE.BOXES.DESCRIPTION}" отображается ранее добавленное описание фичи - "${featureData.description}"`,
        async () => {
          await expect(featurePagePOM.description).toContainText(featureData.description);
        },
      );
      await step(
        `В блоке "${FEATURE_PAGE.SECTIONS.ENV}" отображается окружение по умолчанию - "${FEATURE_PAGE.ENVS.PROD}" с активным тогглом`,
        async () => {
          await expect(featurePagePOM.envSwitch(FEATURE_PAGE.ENVS.PROD)).toBeChecked();
        },
      );
    });
  });
});

test.describe('Фича не может быть создана с запрещенным символом в имени', () => {
  for (const { value, reason } of FEATURE_INVALID_KEYS) {
    test(`Невалидное имя - "${value}" ("${reason}") @allure.id=122009 @role=engineer @smoke`, async ({
      featuresPagePOM,
    }) => {
      await setAllureMetadata({
        owner: 'ozhegovmv',
        backend: 'real',
        tags: ['smoke', 'feature', 'validation'],
      });

      await step(
        `Под ролью инженера перейти на страницу создания фичи "${URLS.FEATURES_PAGE}"`,
        async () => {
          await featuresPagePOM.open();
        },
      );
      await step(
        `Перейти к созданию фичи, нажав на кнопку "${FEATURES_PAGE.BUTTONS.ADD_FEATURE}"`,
        async () => {
          await featuresPagePOM.addFeature();
        },
      );

      await step(`В модальном окне "${FEATURES_PAGE.MODALS.CREATE_FEATURE}":`, async () => {
        await step(
          `В селекторе "${FEATURES_PAGE.DROPDOWNS.VALUE.LABEL}" выбрать "${FEATURES_PAGE.DROPDOWNS.VALUE.OPTIONS.BOOLEAN}"`,
          async () => {
            await featuresPagePOM.selectValueType(FEATURES_PAGE.DROPDOWNS.VALUE.OPTIONS.BOOLEAN);
          },
        );
        await step(`В поле "${FEATURES_PAGE.INPUTS.FEATURE_KEY}" ввести "${value}"`, async () => {
          await featuresPagePOM.fillFeatureKey(value);
        });
        await step(
          `Попытаться создать фичу, нажав на кнопку "${FEATURES_PAGE.BUTTONS.CREATE}"`,
          async () => {
            await featuresPagePOM.createFeature();
          },
        );
        await step(
          `Отображается сообщение об ошибке - "${ERROR_MESSAGES.FEATURE_KEY}"`,
          async () => {
            await expect(featuresPagePOM.createFeatureModal).toContainText(
              ERROR_MESSAGES.FEATURE_KEY,
            );
          },
        );
      });
    });
  }
});
