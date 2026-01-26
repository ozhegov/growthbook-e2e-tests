import { EXPERIMENT_STATUS } from './constants';
import { experiments } from './scenarios';
import type { ExperimentStatus } from './types';

const defaultStatus = experiments.draft;
export let currentExperiment = defaultStatus;

/**
 * Задает необходимый статус эксперимента.
 *
 * @param status - статус эксперимента.
 */
export function setExperimentStatus(status: ExperimentStatus) {
  switch (status) {
    case EXPERIMENT_STATUS.DRAFT:
      currentExperiment = experiments.draft;
      break;

    case EXPERIMENT_STATUS.RUNNING:
      currentExperiment = experiments.running;
      break;

    case EXPERIMENT_STATUS.STOPPED:
      currentExperiment = experiments.stoppedWon;
      break;

    default:
      currentExperiment = defaultStatus;
  }
}

/**
 * Сбрасывает статус эксперимента до дефолтного (draft)
 */
export function resetExperimentState() {
  currentExperiment = defaultStatus;
}
