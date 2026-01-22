export const EXPERIMENT_PAGE = {
  BADGES: {
    RUNNING: 'Running',
    DRAFT: 'Draft',
    WON: 'Stopped: Won',
  },
  BUTTONS: {
    MAKE_CHANGES: 'Make Changes',
    STOP_EXPERIMENT: 'Stop Experiment',
    EDIT_STATUS: 'Edit status',
    EDIT_INFO: 'Edit info',
    EDIT_PHASE: 'Edit phase',
    AUDIT_LOG: 'Audit log',
    START_EXPERIMENT: 'Start Experiment',
    START_NOW: 'Start Now',
    START: 'Start',
    STOP: 'Stop',
    SHARE: 'Share...',
  },
  MODALS: {
    START_EXPERIMENT: 'Start Experiment',
    STOP_EXPERIMENT: 'Stop Experiment',
  },
  DROPDOWNS: {
    CONCLUSION: {
      LABEL: 'Conclusion',
      OPTIONS: {
        WON: 'Won',
      },
    },
    VARIATION: {
      LABEL: 'Variation to Release',
      OPTIONS: {
        CONTROL: 'Control',
      },
    },
  },
  TEXT_AREAS: {
    DETAILS: 'Additional Analysis or Details',
  },
  TABS: {
    OVERVIEW: {
      LABEL: 'Overview',
      SECTIONS: {
        STOPPED_INFO: 'Experiment Stopped',
      },
    },
  },
} as const;
