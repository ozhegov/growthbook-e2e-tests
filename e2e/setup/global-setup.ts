import { request, FullConfig } from '@playwright/test'
import { waitForApi } from './health'
import { USERS } from '../test-data/users'
import { registerAdmin, registerUser } from '../api/auth'
import { inviteUser, acceptInviteWithRetry } from '../api/invites'
import { getOrganizationId } from '../api/organizations'
import { createApiKey, createSdkConnection } from '../api/growthbook-api'
import { saveStorageState } from './storage'
import { DEFAULT_SDK_CONNECTION_CONFIG } from '../test-data/sdk-connection-config'

export default async function globalSetup(_: FullConfig) {
    console.log('\n🚀 Начало настройки проекта\n')
    console.time('⏱️  Проект настроен за')

    try {
        await waitForApi()

        const adminReq = await request.newContext()
        const admin = USERS[0]

        const { token: adminToken } = await registerAdmin(adminReq, admin)
        console.log('\n✅ Администатратор зарегистрирован')

        const orgId = await getOrganizationId(adminReq, adminToken)
        console.log('✅ Получен ID организации')

        await saveStorageState(adminReq, 'ADMIN')

        const secretKey = await createApiKey(adminReq, adminToken, orgId, {
            description: 'Секретный API ключ для E2E тестов',
            type: 'admin',
        })
        process.env.GROWTHBOOK_API_KEY = secretKey
        console.log('✅ Получен и сохранен API ключ администратора')

        await createSdkConnection(
            adminReq,
            secretKey,
            DEFAULT_SDK_CONNECTION_CONFIG
        )
        console.log('✅ Создано SDK Connection')

        await adminReq.dispose()

        for (const user of USERS.slice(1)) {
            const req = await request.newContext()

            const inviteKey = await inviteUser(req, adminToken, user, orgId)
            const token = await registerUser(req, user)
            await acceptInviteWithRetry(req, token, inviteKey)
            await saveStorageState(req, user.role)

            await req.dispose()
        }
        console.log('✅ Подготовлены пользователи для E2E тестов')

        console.log('\n🎉 Настройка проекта завершена\n')
    } catch (err) {
        console.error('\n❌ Неудачная настройка проекта\n', err)
        process.exit(1)
    } finally {
        console.timeEnd('⏱️  Проект настроен за')
    }
}
