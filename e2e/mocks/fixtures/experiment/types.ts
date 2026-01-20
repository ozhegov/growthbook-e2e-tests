import type { EXPERIMENT_STATUS } from './constants';

export type ExperimentStatus = (typeof EXPERIMENT_STATUS)[keyof typeof EXPERIMENT_STATUS];
