import type { ExperimentStatus } from './types';

/**
 * Создаёт mock-объект эксперимента с заданным id и статусом.
 *
 * Используется в mock-тестах для генерации состояния эксперимента
 * (running / stopped и т.д.) без обращения к реальному API.
 *
 * @param params
 * @param params.id - Идентификатор эксперимента
 * @param params.status - Статус эксперимента
 *
 * @returns Полный объект эксперимента в формате API
 */
export function createExperiment({ id, status }: { id: string; status: ExperimentStatus }) {
  return {
    id,
    uid: 'mock-uid',
    trackingKey: 'mock-tracking',
    organization: 'org_mock',
    project: 'prj_4mock',
    owner: 'u_mock',
    datasource: '',
    userIdType: 'anonymous',
    exposureQueryId: '',
    hashAttribute: 'id',
    fallbackAttribute: '',
    hashVersion: 2,
    disableStickyBucketing: false,
    name: 'Mock Experiment',
    dateCreated: new Date().toISOString(),
    dateUpdated: new Date().toISOString(),
    tags: ['mock'],
    description: 'Mock experiment description',
    hypothesis: 'Mock hypothesis',
    pastNotifications: [],
    metricOverrides: [],
    decisionFrameworkSettings: {
      decisionFrameworkMetricOverrides: [],
    },
    goalMetrics: [],
    secondaryMetrics: [],
    guardrailMetrics: [],
    activationMetric: '',
    segment: '',
    queryFilter: '',
    skipPartialData: false,
    attributionModel: 'firstExposure',
    archived: status === 'stopped',
    status,
    analysis: '',
    releasedVariationId: status === 'stopped' ? 'var_control' : '',
    excludeFromPayload: true,
    autoAssign: false,
    implementation: 'code',
    previewURL: '',
    targetURLRegex: '',
    variations: [
      {
        id: 'var_control',
        name: 'Control',
        description: '',
        key: '0',
        screenshots: [],
        dom: [],
      },
      {
        id: 'var_1',
        name: 'Variation 1',
        description: '',
        key: '1',
        screenshots: [],
        dom: [],
      },
    ],
    phases:
      status === 'running'
        ? [
            {
              dateStarted: new Date().toISOString(),
              name: 'Main',
              reason: '',
              coverage: 1,
              condition: '{}',
              savedGroups: [],
              prerequisites: [],
              namespace: {
                enabled: false,
                name: '',
                range: [0, 1],
              },
              seed: 'mock-seed-12345',
              variationWeights: [0.5, 0.5],
              groups: [],
              banditEvents: [],
            },
          ]
        : [],
    lastSnapshotAttempt: new Date().toISOString(),
    nextSnapshotAttempt: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    autoSnapshots: true,
    ideaSource: '',
    regressionAdjustmentEnabled: false,
    linkedFeatures: [],
    sequentialTestingEnabled: false,
    sequentialTestingTuningParameter: 5000,
    type: 'standard',
    banditScheduleValue: 1,
    banditScheduleUnit: 'days',
    banditBurnInValue: 1,
    banditBurnInUnit: 'days',
    shareLevel: 'organization',
    analysisSummary: {
      resultsStatus: {
        variations: [],
      },
      precomputedDimensions: [],
    },
    dismissedWarnings: [],
    pinnedMetricSlices: [],
    customMetricSlices: [],
    manualLaunchChecklist: [],
  };
}
