export interface AuthResponse {
  token: string;
  projectId?: string;
}

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
