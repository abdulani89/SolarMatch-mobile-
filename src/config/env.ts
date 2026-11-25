// Set these in a local .env (never commit it). Expo exposes EXPO_PUBLIC_* vars.
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? '';

// Mock auth stays ON until the backend contract is agreed and tested.
export const USE_MOCK_AUTH = process.env.EXPO_PUBLIC_USE_MOCK_AUTH !== 'false';
