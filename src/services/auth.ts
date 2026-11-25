import { API_BASE_URL, USE_MOCK_AUTH } from '../config/env';
import { AuthResult, LoginValues, SignUpValues } from '../types/auth';

// TODO: confirm real endpoints with the backend team.
const ENDPOINTS = { login: '/auth/login', register: '/auth/register' };

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function post<T>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error('Network error. Check your connection and try again.');
  }
  if (!res.ok) {
    // Plain-language message; never expose internal error details.
    throw new Error(
      res.status === 401 ? 'Incorrect email or password.' : 'Something went wrong. Please try again.'
    );
  }
  return res.json();
}

export async function login({ email, password }: LoginValues): Promise<AuthResult> {
  if (USE_MOCK_AUTH) {
    await wait(1200);
    // Test the error state: use an email containing "fail".
    if (email.includes('fail')) throw new Error('Incorrect email or password.');
    return { token: 'mock-token', user: { email } };
  }
  return post<AuthResult>(ENDPOINTS.login, { email, password });
}

export async function register(values: SignUpValues): Promise<AuthResult> {
  const { fullName, email, password } = values;
  if (USE_MOCK_AUTH) {
    await wait(1400);
    if (email.includes('fail')) throw new Error('An account with this email already exists.');
    return { token: 'mock-token', user: { name: fullName, email } };
  }
  return post<AuthResult>(ENDPOINTS.register, { name: fullName, email, password });
}
