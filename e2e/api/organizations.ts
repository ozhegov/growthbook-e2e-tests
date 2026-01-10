import { APIRequestContext } from '@playwright/test'
import { API_BASE_URL } from '../config'

/**
 * Получение ID организации через GrowthBook API.
 * 
 * @param req - APIRequestContext для выполнения запроса на получение ID организации.
 * @param token - авторизационный токен пользователя, от лица которого отправляется запрос.
 * @returns ID организации, к которой относится пользователь, отправивший запрос.
 * @throws Error если запрос выполнен со статусом не 2xx или ID отсутствует.
 */
export async function getOrganizationId(
    req: APIRequestContext,
    token: string
): Promise<string> {
    const res = await req.get(`${API_BASE_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` }
    })

    if (!res.ok()) {
        throw new Error(`Неуспешный запрос на получение ID организации: "${res.status()}"`)
    }

    const data = await res.json()
    const orgId = data.organizations?.[0]?.id

    if (!orgId) {
        throw new Error('Неуспешный запрос на получение ID организации: ID отсутствует')
    }

    return orgId
}