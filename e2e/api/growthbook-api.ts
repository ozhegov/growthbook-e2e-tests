import { APIRequestContext } from '@playwright/test'
import { API_BASE_URL } from '../config'
import { CreateSdkConnectionInput } from './types'

/**
 * Создание API ключа (secret) для администратора через GrowthBook API.
 * 
 * Используется для отправки API запросов через `/api/v1`.
 * 
 * @param req - APIRequestContext для выполнения запроса создания ключа.
 * @param adminToken - авторизационный токен (Bearer) администратора.
 * @param orgId - ID организации, к которой относится администратор.
 * @param options - опции ключа: описание и тип ключа (admin/readonly).
 * @returns API ключ (secret) администратора.
 * @throws Error если запрос выполнен со статусом не 2xx или API ключ отсутствует.
 */
export async function createApiKey(
    req: APIRequestContext,
    adminToken: string,
    orgId: string,
    options: {
        description?: string
        type?: 'admin' | 'readonly'
    } = {}
): Promise<string> {
    const res = await req.post(`${API_BASE_URL}/keys`, {
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'X-Organization': orgId
        },
        data: {
            description: options.description || 'API ключ для E2E тестов',
            type: options.type || 'admin'
        }
    })

    if (!res.ok()) {
        const error = await res.text()
        throw new Error(`Неуспешное создание API ключа: ${res.status()} - ${error}`)
    }

    const result = await res.json()
    const key = result?.key?.key

    if (!key) {
      throw new Error(`API ключ отсутствует`)
    }

    return key
}

/**
 * Создание SDK Connection через GrowthBook API.
 * 
 * @param req - APIRequestContext для выполнения запроса создания SDK Connection.
 * @param secretKey - API ключ (secret) для выполнения запроса.
 * @param data - данные по SDK Connection (CreateSdkConnectionInput).
 */
export async function createSdkConnection(
    req: APIRequestContext,
    secretKey: string,
    data: CreateSdkConnectionInput,
  ) {
    const res = await req.post(`${API_BASE_URL}/api/v1/sdk-connections`, {
      headers: {
        'Authorization': `Bearer ${secretKey}`,
      },
      data: {
        name: data.name,
        language: data.language || 'javascript',
        sdkVersion: data.sdkVersion || '1.6.2',
        environment: data.environment || 'production',
        projects: data.projects || [],
        encryptPayload: data.encryptPayload ?? false,
        hashSecureAttributes: data.hashSecureAttributes ?? false,
        includeVisualExperiments: data.includeVisualExperiments ?? true,
        includeDraftExperiments: data.includeDraftExperiments ?? true,
        includeExperimentNames: data.includeExperimentNames ?? false,
        includeRedirectExperiments: data.includeRedirectExperiments ?? true,
        includeRuleIds: data.includeRuleIds ?? true,
        proxyEnabled: data.proxyEnabled ?? false,
        proxyHost: '',
        remoteEvalEnabled: data.remoteEvalEnabled ?? false,
        savedGroupReferencesEnabled: data.savedGroupReferencesEnabled ?? false
      }
    })
  
    if (!res.ok()) {
      const error = await res.text()
      throw new Error(`Неуспешное создание SDK Connection: "${res.status()}" - "${error}"`)
    }
  }
