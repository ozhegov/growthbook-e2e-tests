import { experiments } from './scenarios';
import { currentExperiment } from './state';

/**
 * Применяет сценарий поверх текущего эксперимента
 *
 * Object.assign мутирует currentExperiment намеренно —
 * все читатели объекта видят обновлённое состояние без смены ссылки.
 *
 * @param scenario - каноническое состояние из scenarios.ts
 */
function applyScenario(scenario: typeof experiments.running | typeof experiments.stoppedWon) {
  const { id, variations } = currentExperiment;
  Object.assign(currentExperiment, scenario, { id, variations });
}

/**
 * Применяет переход состояния из payload POST /experiment/:id/status.
 *
 * @param payload - тело POST-запроса
 */
export function applyStatusChange(payload: { status?: string }) {
  if (payload.status === 'running') {
    applyScenario(experiments.running);
  }
}

/**
 * Применяет переход состояния из payload POST /experiment/:id/stop.
 *
 * @param payload - тело POST-запроса
 */
export function applyStopResult(payload: { results?: string }) {
  if (payload.results === 'won') {
    applyScenario(experiments.stoppedWon);
  }
}
