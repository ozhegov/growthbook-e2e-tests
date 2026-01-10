/**
 * Получение ключа для использования в API методах (/api/v1).
 * 
 * Ключ создается один раз во время выполнения global-setup.ts
 * через createApiKey() и хранится в runtime окружении.
 * 
 * @returns API ключ GrowthBook
 * @throws Error если ключ не был инициализирован (global-setup не выполнился)
 */
export function getGrowthBookApiKey(): string {
    const key = process.env.GROWTHBOOK_API_KEY
    if (!key) {
        throw new Error('GROWTHBOOK_API_KEY не инициализирован. ' +
            'Проверь, что global-setup.ts выполняется корректно.')
    }
    return key
}