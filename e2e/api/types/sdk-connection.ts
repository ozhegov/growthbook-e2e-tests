export interface CreateSdkConnectionInput {
  name: string;
  language?: string;
  sdkVersion?: string;
  environment?: string;
  projects?: string[];
  encryptPayload?: boolean;
  hashSecureAttributes?: boolean;
  includeVisualExperiments?: boolean;
  includeDraftExperiments?: boolean;
  includeExperimentNames?: boolean;
  includeRedirectExperiments?: boolean;
  includeRuleIds?: boolean;
  proxyEnabled?: boolean;
  remoteEvalEnabled?: boolean;
  savedGroupReferencesEnabled?: boolean;
}

export interface CreateSdkConnectionResponse {
  sdkConnection: {
    id: string;
    name: string;
    language: string;
    environment: string;
    projects: string[];
    createdAt: string;
  };
}
