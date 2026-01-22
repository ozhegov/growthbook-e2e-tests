import { EXPERIMENT_IDS, EXPERIMENT_STATUS } from './constants';
import { createExperiment } from './factory';

export const experiments = {
  draft: createExperiment({
    id: EXPERIMENT_IDS.DRAFT,
    status: EXPERIMENT_STATUS.DRAFT,
  }),

  running: createExperiment({
    id: EXPERIMENT_IDS.RUNNING,
    status: EXPERIMENT_STATUS.RUNNING,
  }),

  stoppedWon: {
    ...createExperiment({
      id: EXPERIMENT_IDS.RUNNING,
      status: EXPERIMENT_STATUS.STOPPED,
    }),
    results: 'won',
    winner: 1,
    releasedVariationId: 'var_control',
  },
};
