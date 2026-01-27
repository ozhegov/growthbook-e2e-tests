import { getOptionalEnv } from '../helpers/env';
import type { AllureStats } from './allure-parser';

/**
 * Определяет, нужно ли отправлять уведомление.
 *
 * @param stats - статистика Allure.
 */
export function shouldSendNotification(stats: AllureStats): boolean {
  const sendOnFail = getOptionalEnv('SEND_TELEGRAM_ON_FAIL', 'true') === 'true';

  const sendOnSuccess = getOptionalEnv('SEND_TELEGRAM_ON_SUCCESS', 'false') === 'true';

  const hasFailures = stats.failed > 0 || stats.broken > 0;

  if (hasFailures) return sendOnFail;

  return sendOnSuccess;
}
