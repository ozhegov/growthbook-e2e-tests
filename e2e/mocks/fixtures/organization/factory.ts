import { currentUserState } from './state';

/**
 * Создает mock-ответы для API `/organization`.
 *
 * Формирует объект организации на основе текущего состояния
 * mock-пользователя (`currentUserState`), включая:
 *
 * - роль пользователя
 * - набор прав (`currentUserPermissions`)
 *
 * Используется в route handler организации для эмуляции
 * бэкенд-ответа и динамического переключения ролей и доступов
 * между тестами.
 */

export function createOrganization() {
  return {
    status: 200,
    apiKeys: [],
    enterpriseSSO: null,
    accountPlan: 'oss',
    effectiveAccountPlan: 'oss',
    licenseError: '',
    commercialFeatures: [],
    commercialFeatureLowestPlan: {},
    roles: [
      {
        id: 'admin',
        description: 'All access',
        policies: ['ReadData', 'FeaturesFullAccess', 'ExperimentsFullAccess'],
      },
      {
        id: 'engineer',
        description: 'Manage features',
        policies: ['ReadData', 'FeaturesFullAccess'],
      },
      {
        id: 'experimenter',
        description: 'Manage features AND Analyze experiments',
        policies: ['ReadData', 'FeaturesFullAccess', 'ExperimentsFullAccess'],
      },
    ],
    members: [
      {
        email: 'mock@growthbook.local',
        verified: true,
        name: 'Mock User',
        role: currentUserState.role,
        dateCreated: new Date().toISOString(),
        id: 'u_mock',
      },
    ],
    currentUserPermissions: {
      global: {
        environments: [],
        limitAccessByEnvironment: false,
        permissions: currentUserState.permissions,
      },
      projects: {},
    },
    teams: [],
    license: null,
    installationName: 'GrowthBook Testing',
    subscription: null,
    organization: {
      id: 'org_mock',
      name: 'GrowthBook Testing',
      settings: {
        environments: [
          {
            id: 'production',
            description: '',
            toggleOnList: true,
            defaultState: true,
          },
        ],
      },
    },
  };
}
