import fs from 'node:fs';
import path from 'node:path';

export interface AllureStats {
  passed: number;
  failed: number;
  broken: number;
  skipped: number;
  total: number;
  duration: number;
}

/**
 * Парсит summary.json из Allure отчёта.
 *
 * @param summaryPath - путь к файлу summary.json.
 * @returns Объект со статистикой тестов.
 * @throws Error если файл не найден или имеет некорректный формат.
 */
export function parseAllureSummary(
  summaryPath = 'allure-report/widgets/summary.json',
): AllureStats {
  const filePath = path.resolve(summaryPath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Файл Allure summary не найден: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw);

  const { passed, failed, broken, skipped, total } = data.statistic;
  const { duration } = data.time;

  return { passed, failed, broken, skipped, total, duration };
}
