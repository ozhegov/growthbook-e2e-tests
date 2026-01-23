import fs from 'node:fs/promises';
import path from 'node:path';
import { STORAGE_DIR } from '../config';

const STORAGE_FILE = path.join(STORAGE_DIR, 'state.json');

export interface StorageState {
  apiKey?: string;
  orgId?: string;
}

/**
 * Гарантирует существование директории для storage-файла.
 *
 * Создаёт директорию STORAGE_DIR, если она отсутствует.
 */
async function ensureDir() {
  await fs.mkdir(STORAGE_DIR, { recursive: true });
}

/**
 * Читает состояние storage из файла.
 *
 * Если файл отсутствует или повреждён, возвращает пустой объект.
 *
 * @returns Текущее состояние storage.
 */
async function readState(): Promise<StorageState> {
  try {
    const data = await fs.readFile(STORAGE_FILE, 'utf-8');
    return JSON.parse(data) as StorageState;
  } catch {
    return {};
  }
}

/**
 * Записывает состояние storage в файл.
 *
 * Перед записью гарантирует существование директории.
 *
 * @param state - объект состояния storage.
 */
async function writeState(state: StorageState) {
  await ensureDir();
  await fs.writeFile(STORAGE_FILE, JSON.stringify(state, null, 2));
}

/**
 * Получает значение из storage по ключу.
 *
 * Используется в тестах для получения данных,
 * созданных в global-setup (например, apiKey или orgId).
 *
 * @param key - Ключ значения в storage.
 * @throws Error если значение по ключу отсутствует.
 * @returns Значение из storage.
 */
export async function get<K extends keyof StorageState>(
  key: K,
): Promise<NonNullable<StorageState[K]>> {
  const storageState = await readState();
  const state = storageState[key];

  if (state == null) {
    throw new Error(`Значение ${String(key)} отсутствует в storage`);
  }

  return state as NonNullable<StorageState[K]>;
}

/**
 * Сохраняет значение в storage по ключу.
 *
 * Используется в global-setup для сохранения данных,
 * которые должны быть доступны в тестах.
 *
 * @param key - ключ значения в storage.
 * @param value - значение для сохранения.
 */
export async function set<K extends keyof StorageState>(key: K, value: StorageState[K]) {
  const state = await readState();
  state[key] = value;

  await writeState(state);
}
