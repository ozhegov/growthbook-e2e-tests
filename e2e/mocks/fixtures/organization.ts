export const organizationFixture = {
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
      email: 'admin@growthbook.local',
      verified: false,
      name: 'Admin User',
      role: 'admin',
      dateCreated: new Date().toISOString(),
      id: 'u_mock',
    },
  ],
  currentUserPermissions: {
    global: {
      permissions: {
        readData: true,
        manageFeatures: true,
        runExperiments: true,
      },
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
