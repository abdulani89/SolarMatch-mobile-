import React, { createContext, useContext, useMemo, useState } from 'react';
import { AuthResult } from '../types/auth';

type AuthContextValue = {
  isAuthenticated: boolean;
  user: AuthResult['user'] | null;
  signIn: (result: AuthResult) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthResult['user'] | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // TODO: persist the token in expo-secure-store once the real API is wired.
  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      user,
      signIn: (result) => {
        setUser(result.user ?? null);
        setIsAuthenticated(true);
      },
      signOut: () => {
        setUser(null);
        setIsAuthenticated(false);
      },
    }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
