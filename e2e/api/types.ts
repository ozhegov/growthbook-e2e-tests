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

export type FeatureValueType = 'boolean' | 'string' | 'number' | 'json';

export interface CreateFeatureInput {
  id: string;
  archived?: boolean;
  description?: string;
  owner: string;
  project?: string;
  valueType: FeatureValueType;
  defaultValue: string;
  tags?: string[];
  environments?: {
    property1: {
      enabled: boolean;
      rules: [
        {
          description?: string;
          condition?: string;
          savedGroupTargeting?: [
            {
              matchType: 'all' | 'any' | 'none';
              savedGroups: string[];
            },
          ];
          scheduleRules: [
            {
              enabled?: boolean;
              timestamp?: string;
            },
          ];
          id?: string;
          enabled?: boolean;
          type: 'force';
          value: string;
        },
      ];
      definition?: string;
      draft: {
        enabled?: boolean;
        rules: [
          {
            description?: string;
            condition?: string;
            savedGroupTargeting?: [
              {
                matchType: 'all' | 'any' | 'none';
                savedGroups: string[];
              },
            ];
            scheduleRules?: [
              {
                enabled: boolean;
                timestamp: string;
              },
            ];
            id?: string;
            enabled?: boolean;
            type: 'force';
            value: string;
          },
        ];
        definition?: string;
      };
    };
  };
  prerequisites?: string[];
  jsonSchema?: string;
  customFields?: {
    property?: string;
  };
}
