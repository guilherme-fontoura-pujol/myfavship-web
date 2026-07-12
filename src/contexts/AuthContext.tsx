import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { AuthResponse, User } from "../types/auth";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (data: AuthResponse) => void;
  logout: () => void;
}

const USER_STORAGE_KEY = "myfavship:user";
const TOKEN_STORAGE_KEY = "myfavship:token";

const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

function readStoredUser(): User | null {
  const value = localStorage.getItem(USER_STORAGE_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as User;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(
    readStoredUser
  );

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_STORAGE_KEY)
  );

  function authenticate(data: AuthResponse) {
    setUser(data.user);
    setToken(data.token);

    localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify(data.user)
    );

    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
  }

  function logout() {
    setUser(null);
    setToken(null);

    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user && token),
      authenticate,
      logout,
    }),
    [user, token]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve ser usado dentro de AuthProvider."
    );
  }

  return context;
}