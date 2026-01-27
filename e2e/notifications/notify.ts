import { parseAllureSummary } from './allure-parser';
import { shouldSendNotification } from './notification-rules';
import { buildTelegramReport } from './report-builder';
import { sendTelegram } from './telegram-sender';

/**
 * Точка входа для отправки уведомления о результатах тестов.
 */
async function run() {
  try {
    const stats = parseAllureSummary();

    if (!shouldSendNotification(stats)) {
      console.log('ℹ️ Уведомление не отправлено (по правилам)');
      return;
    }

    const message = buildTelegramReport(stats);
    await sendTelegram(message);

    console.log('✅ Уведомление успешно отправлено в Telegram');
  } catch (error) {
    console.error('❌ Ошибка отправки уведомления:', error);
    process.exit(1);
  }
}

run();
