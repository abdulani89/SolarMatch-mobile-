export type LoginValues = { email: string; password: string };
export type SignUpValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export type FieldErrors<T> = Partial<Record<keyof T, string>>;
export type AuthResult = { token?: string; user?: { name?: string; email: string } };
