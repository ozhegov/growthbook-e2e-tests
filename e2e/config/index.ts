import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
export const API_BASE_URL = process.env.API_BASE_URL ?? 'http://localhost:3100';

export const STORAGE_DIR = process.env.STORAGE_DIR ?? path.join(process.cwd(), 'storage');

export const MAX_RETRIES = 30;
export const RETRY_DELAY = 1000;
export const REQUEST_TIMEOUT = 5000;

export const RUN_ID = process.env.GITHUB_RUN_ID ?? randomUUID();

if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}
