export const FEATURE_PAGE = {
  BUTTONS: {
    ARCHIVE: 'Archive',
    UNARCHIVE: 'Unarchive',
  },
  MODALS: {
    ARCHIVE_FEATURE: 'Archive Feature',
    UNARCHIVE_FEATURE: 'Unarchive Feature',
  },
  MESSAGES: {
    FEATURE_IS_ARCHIVED:
      'This feature is archived. It will not be included in SDK Endpoints or Webhook payloads.',
  },
  BOXES: {
    PROJECT: 'Project:',
    KEY: 'Feature Key:',
    TYPE: 'Type:',
    OWNER: 'Owner:',
    TAGS: 'Tags:',
    DESCRIPTION: 'Description',
  },
  SECTIONS: {
    ENV: 'Enabled Environments',
  },
  ENVS: {
    PROD: 'production',
  },
} as const;
