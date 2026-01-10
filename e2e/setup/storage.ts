import path from 'path'
import { APIRequestContext } from '@playwright/test'
import { STORAGE_DIR } from './config'
import { UserRole } from '../api/types'

/**
 * Сохраняет состояние сессии (storage state) из APIRequestContext в JSON-файл,
 * чтобы переиспользовать его в E2E тестах для авторизации без повторного логина.
 *
 * Используется в global-setup для подготовки авторизованных состояний
 * пользователей перед запуском тестов.
 * 
 * Имя файла зависит от роли пользователя и формируется как:
 * `${STORAGE_DIR}/${role.toLowerCase()}-state.json`.
 *
 * @param req - APIRequestContext, в котором выполнены запросы, установившие сессию.
 * @param role - роль пользователя.
 */
export async function saveStorageState(
    req: APIRequestContext,
    role: UserRole
) {
    const file = path.join(STORAGE_DIR, `${role.toLowerCase()}-state.json`)
    await req.storageState({ path: file })
}