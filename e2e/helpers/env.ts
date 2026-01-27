/**
 * Получает значение переменной окружения
 *
 * @param name - имя переменной окружения
 * @returns Значение переменной окружения
 * @throws Error Если переменная окружения не установлена
 */
export function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Отсутствует переменная окружения: ${name}`);
  }
  return value;
}

/**
 * Возвращает переменную окружения или значение по умолчанию.
 * Не выбрасывает ошибку, если переменная не задана.
 *
 * @param name - имя переменной окружения
 * @returns Значение переменной окружения
 */
export function getOptionalEnv(name: string, defaultValue: string): string {
  return process.env[name] ?? defaultValue;
}
