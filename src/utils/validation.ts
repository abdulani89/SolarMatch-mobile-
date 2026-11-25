import { FieldErrors, LoginValues, SignUpValues } from '../types/auth';

// TODO: replace with the backend/product password policy once agreed.
export const PASSWORD_MIN_LENGTH = 8;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const validateEmail = (value: string): string | undefined => {
  const email = value.trim();
  if (!email) return 'Email is required';
  if (!EMAIL_REGEX.test(email)) return 'Enter a valid email address';
};

export const validatePassword = (value: string): string | undefined => {
  if (!value) return 'Password is required';
  if (value.length < PASSWORD_MIN_LENGTH)
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
};

export const validateLogin = (v: LoginValues): FieldErrors<LoginValues> => ({
  email: validateEmail(v.email),
  // On login we only require presence; the server decides if it's correct.
  password: v.password ? undefined : 'Password is required',
});

export const validateSignUp = (v: SignUpValues): FieldErrors<SignUpValues> => ({
  fullName: v.fullName.trim() ? undefined : 'Full name is required',
  email: validateEmail(v.email),
  password: validatePassword(v.password),
  confirmPassword: !v.confirmPassword
    ? 'Please confirm your password'
    : v.confirmPassword !== v.password
    ? 'Passwords do not match'
    : undefined,
});

export const hasErrors = (errors: object) => Object.values(errors).some(Boolean);
