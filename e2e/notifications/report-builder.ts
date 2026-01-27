import { getEnv } from '../helpers/env';
import type { AllureStats } from './allure-parser';

/**
 * Форматирует длительность выполнения тестов.
 *
 * @param ms - время в миллисекундах.
 * @returns Строка в формате mm:ss.
 */
function formatDuration(ms: number): string {
  const seconds = Math.round(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;

  return `${minutes}м ${restSeconds}с`;
}

/**
 * Формирует текст отчёта для отправки в Telegram.
 *
 * @param stats - статистика Allure
 * @returns Готовый текст сообщения
 */
export function buildTelegramReport(stats: AllureStats): string {
  const { passed, failed, broken, skipped, total, duration } = stats;

  const successRate = total ? Math.round((passed / total) * 100) : 0;
  const allureUrl = getEnv('ALLURE_REPORT_URL');

  const statusEmoji = failed > 0 || broken > 0 ? '🔴' : skipped > 0 ? '🟡' : '🟢';

  const summaryStatus =
    failed > 0 || broken > 0
      ? 'Регрессия провалена'
      : skipped > 0
        ? 'Регрессия прошла с предупреждениями'
        : 'Регрессия успешна';

  return `
${statusEmoji} *Результаты E2E регрессии*

📌 *Итог:* ${summaryStatus}

📊 *Всего тестов:* ${total}
✅ *Успешно:* ${passed}
❌ *Провалено:* ${failed}
💥 *Ошибки:* ${broken}
⏭ *Пропущено:* ${skipped}

🎯 *Процент успешности:* ${successRate}%
⏱ *Длительность:* ${formatDuration(duration)}

🔗 *Отчёт Allure доступен по ссылке:*
${allureUrl}
`;
}
