import type { CreateSdkConnectionInput } from '../api/types';

export const DEFAULT_SDK_CONNECTION_CONFIG: CreateSdkConnectionInput = {
  name: 'E2E Test SDK Connection',
  language: 'javascript',
  sdkVersion: '1.6.2',
  environment: 'production',
  projects: [],
  encryptPayload: false,
  hashSecureAttributes: false,
  includeVisualExperiments: true,
  includeDraftExperiments: true,
  includeExperimentNames: false,
  includeRedirectExperiments: true,
  includeRuleIds: true,
  proxyEnabled: false,
  remoteEvalEnabled: false,
  savedGroupReferencesEnabled: false,
};
