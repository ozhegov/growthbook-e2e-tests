import { getEnv } from '../helpers/env';

const TOKEN = getEnv('TELEGRAM_TOKEN');
const CHAT_ID = getEnv('TELEGRAM_CHAT_ID');

/**
 * Отправляет сообщение в Telegram.
 *
 * @param message Текст сообщения
 * @throws Error если запрос завершился неуспешно
 */
export async function sendTelegram(message: string): Promise<void> {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Неудачная отправка сообщения в Telegram: "${res.status}" - "${error}"`);
  }
}
