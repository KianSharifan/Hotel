import {createContext, useContext, useEffect, useState} from "react";
import type { ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type User = {
  id: number;
  username: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken){
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<Record<string, any>>(savedToken);

      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        setLoading(false);
        return;
      }

      setToken(savedToken);

      setUser({
        id: Number(
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ]
        ),
        username:
          decoded[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ],
        role:
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ],
      });
    } 
    catch {
      localStorage.removeItem("token");
    }
    finally {
      setLoading(false); 
    }
  }, []);

  function login(newToken: string) {
    localStorage.setItem("token", newToken);

    const decoded = jwtDecode<Record<string, any>>(newToken);

    setToken(newToken);

    setUser({
      id: Number(
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ]
      ),
      username:
        decoded[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
        ],
      role:
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ],
    });
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        token,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}