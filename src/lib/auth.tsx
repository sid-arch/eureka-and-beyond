import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { can, type Permission, type Role } from "../../shared/permissions";
import { api } from "./api";

export interface CurrentUser {
  id: string;
  email: string;
  displayName: string;
  role: Role;
  emailVerified: boolean;
}

interface AuthState {
  user: CurrentUser | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  can: (p: Permission) => boolean;
}

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const r = await api.get<{ user: CurrentUser | null }>("/auth/me");
      setUser(r.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const logout = useCallback(async () => {
    await api.post("/auth/logout");
    setUser(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({ user, loading, refresh, logout, can: (p) => can(user?.role, p) }),
    [user, loading, refresh, logout],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth outside AuthProvider");
  return v;
}
