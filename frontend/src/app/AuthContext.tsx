import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  access: string | null;
  refresh: string | null;
  setAccess: (token: string | null) => void;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [access, setAccess] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedAccess = localStorage.getItem("access");
    const savedRefresh = localStorage.getItem("refresh");
    if (savedAccess && savedRefresh && savedUser) {
      setUser(savedUser);
      setAccess(savedAccess);
      setRefresh(savedRefresh);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch("/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) return false;
      const data = await res.json();
      setUser(username);
      setAccess(data.access);
      setRefresh(data.refresh);
      localStorage.setItem("user", username);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setAccess(null);
    setRefresh(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  return (
    <AuthContext.Provider value={{ user, access, refresh, setAccess, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext not found");
  return ctx;
};