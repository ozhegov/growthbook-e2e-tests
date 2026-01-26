import { API_BASE_URL, MAX_RETRIES, REQUEST_TIMEOUT, RETRY_DELAY } from '../config';

/**
 * Проверяет состояние GrowthBook API перед global-setup для запуска E2E тестов.
 *
 * Критерий готовности: эндпоинт `${API_BASE_URL}/auth/refresh` начинает отвечать
 * успешным статусом (2xx) либо 400/401 (API функционирует, но нет валидной авторизации).
 *
 * Делает до MAX_RETRIES попыток с паузой RETRY_DELAY между ними.
 * Таймаут одного запроса: REQUEST_TIMEOUT.
 *
 * @throws Error если API не стало доступно за MAX_RETRIES попыток.
 */
export async function waitForApi() {
  console.log('⏳ Ожидаем готовность API...');

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        signal: AbortSignal.timeout(REQUEST_TIMEOUT),
      });

      if (res.ok || res.status === 400 || res.status === 401) {
        console.log('✅ API готов');
        return;
      }
    } catch {
      console.log(`⏳ Попытка ${i + 1} из ${MAX_RETRIES}`);
    }

    await new Promise((res) => setTimeout(res, RETRY_DELAY));
  }

  throw new Error(`API недоступно по адресу ${API_BASE_URL}`);
}
