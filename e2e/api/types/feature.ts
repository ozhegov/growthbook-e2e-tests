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

export interface CreateFeatureResponse {
  feature: Feature;
}

export interface Feature {
  id: string;
  dateCreated: string;
  dateUpdated: string;
  archived: boolean;
  description?: string;
  owner: string;
  project?: string;
  valueType: FeatureValueType;
  defaultValue: string;
  tags?: string[];
  environments?: Record<string, FeatureEnvironment>;
  revision?: FeatureRevision;
  prerequisites?: string[];
  customFields?: Record<string, unknown>;
}

export interface FeatureEnvironment {
  enabled: boolean;
  defaultValue: string;
  rules: FeatureRule[];
  definition?: string;
  draft?: FeatureDraft;
}

export interface FeatureDraft {
  enabled?: boolean;
  defaultValue: string;
  rules: FeatureRule[];
  definition?: string;
}

export interface FeatureRule {
  id?: string;
  description?: string;
  condition?: string;
  enabled?: boolean;
  type?: 'force' | string;
  value?: string;
  savedGroupTargeting?: SavedGroupTargeting[];
  scheduleRules?: ScheduleRule[];
}

export interface SavedGroupTargeting {
  matchType: 'all' | 'any' | 'none';
  savedGroups: string[];
}

export interface ScheduleRule {
  enabled?: boolean;
  timestamp?: string;
}

export interface FeatureRevision {
  version: number;
  comment?: string;
  date: string;
  publishedBy?: string;
}
