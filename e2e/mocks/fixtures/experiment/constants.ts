export const EXPERIMENT_STATUS = {
  DRAFT: 'draft',
  RUNNING: 'running',
  STOPPED: 'stopped',
} as const;

export const STOP_REASONS = {
  WON: 'won',
  LOST: 'lost',
} as const;

export const EXPERIMENT_IDS = {
  DRAFT: 'exp_mock_draft',
  RUNNING: 'exp_mock_running',
  STOPPED_WON: 'exp_mock_stopped_won',
};
