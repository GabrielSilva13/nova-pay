"use client";

import * as React from "react";
import { readAuth, writeAuth } from "@/features/auth/storage";
import type { AuthUser } from "@/features/auth/types";

type AuthContextValue = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (name: string) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    setIsAuthenticated(readAuth());
  }, []);

  const value = React.useMemo<AuthContextValue>(() => {
    return {
      isAuthenticated,
      user: isAuthenticated ? { id: "demo-user", name: "Gabriel" } : null,
      login: (name: string) => {
        writeAuth(true);
        // opcional: persistir nome também, mas evitar excesso
        setIsAuthenticated(true);
      },
      logout: () => {
        writeAuth(false);
        setIsAuthenticated(false);
      },
    };
  }, [isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  return ctx;
}
