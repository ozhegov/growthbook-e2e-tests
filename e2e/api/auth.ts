import type { APIRequestContext } from '@playwright/test';
import { API_BASE_URL } from '../config';
import type { UserLogin, UserRegistration } from '../types/user';
import type { AuthResponse } from './types';

/**
 * Логин пользователя через GrowthBook API.
 *
 * @param req - APIRequestContext для выполнения запроса логина.
 * @param user - данные пользователя (email/password) для авторизации.
 * @returns AuthResponse из ответа API (например, token и другие поля, если они есть).
 * @throws Error если API вернул неуспешный статус ответа.
 */
export async function loginUser(req: APIRequestContext, user: UserLogin): Promise<AuthResponse> {
  const res = await req.post(`${API_BASE_URL}/auth/login`, {
    data: { email: user.email, password: user.password },
  });

  if (!res.ok()) {
    throw new Error(`Неуспешный логин для пользователя "${user.email}"`);
  }

  return res.json();
}

/**
 * Регистрация первого пользователя-администратора преокта через GrowthBook API (`/auth/firsttime`).
 *
 * В случае если администратор уже зарегистрирован на проекте
 * выполняется логин через `loginUser()`.
 *
 * @param req - APIRequestContext для выполнения запроса регистрации/логина.
 * @param user - данные администратора для регистрации/логина.
 * @returns AuthResponse из ответа API (например, token и другие поля, если они есть).
 * @throws Error если регистрация не удалась, API вернул 400 с другой ошибкой,
 * или если логин завершился неуспешно.
 */
export async function registerAdmin(
  req: APIRequestContext,
  user: UserRegistration,
): Promise<AuthResponse> {
  const res = await req.post(`${API_BASE_URL}/auth/firsttime`, {
    data: {
      companyname: 'GrowthBook Testing',
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });

  if (res.status() === 400) {
    const { message } = await res.json();
    if (message?.includes('already')) {
      console.log('ℹ️  Администратор уже зарегистрирован, логинимся');
      return loginUser(req, user);
    }
    throw new Error(message);
  }

  if (!res.ok()) {
    throw new Error(`Неуспешная регистрация администратора`);
  }

  return res.json();
}

/**
 * Регистрация пользователя (не первый пользователь-администратор) через `/auth/register`.
 *
 * В случае если пользователь уже зарегистрирован на проекте
 * выполняется логин через `loginUser()` и возвращается авторизационный токен.
 *
 * @param req - APIRequestContext для выполнения запроса регистрации/логина.
 * @param user - данные пользователя для регистрации/логина.
 * @returns Авторизационный токен пользователя (token из AuthResponse)
 * @throws Error если регистрация не удалась, API вернул 400 с другой ошибкой,
 * или если логин завершился неуспешно.
 */
export async function registerUser(
  req: APIRequestContext,
  user: UserRegistration,
): Promise<string> {
  const res = await req.post(`${API_BASE_URL}/auth/register`, {
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });

  if (res.status() === 400) {
    const { message } = await res.json();
    if (message?.includes('already')) {
      console.log(`ℹ️ Пользователь "${user.email}" уже зарегистрирован, логинимся`);
      const { token } = await loginUser(req, user);
      return token;
    }
    throw new Error(message);
  }

  if (!res.ok()) {
    throw new Error(`Неуспешная регистрация пользователя "${user.email}"`);
  }

  const { token } = await res.json();
  return token;
}
