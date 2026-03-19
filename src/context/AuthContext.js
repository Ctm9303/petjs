import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "petjs_users_v1";
const SESSION_KEY = "petjs_session_v1";

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readJson(SESSION_KEY, null));

  useEffect(() => {
    writeJson(SESSION_KEY, user);
  }, [user]);

  const api = useMemo(() => {
    function register({ email, password, name }) {
      const e = String(email || "").trim().toLowerCase();
      const p = String(password || "");
      const n = String(name || "").trim() || e.split("@")[0] || "User";

      if (!e || !p) {
        const err = new Error("MISSING_FIELDS");
        err.code = "MISSING_FIELDS";
        throw err;
      }

      const users = readJson(USERS_KEY, []);
      if (users.some((u) => u.email === e)) {
        const err = new Error("EMAIL_EXISTS");
        err.code = "EMAIL_EXISTS";
        throw err;
      }

      const newUser = { id: `u_${Date.now()}`, email: e, password: p, name: n };
      writeJson(USERS_KEY, [...users, newUser]);
      setUser({ id: newUser.id, email: newUser.email, name: newUser.name });
      return { ok: true };
    }

    function login({ email, password }) {
      const e = String(email || "").trim().toLowerCase();
      const p = String(password || "");
      const users = readJson(USERS_KEY, []);
      const match = users.find((u) => u.email === e && u.password === p);
      if (!match) {
        const err = new Error("INVALID_CREDENTIALS");
        err.code = "INVALID_CREDENTIALS";
        throw err;
      }
      setUser({ id: match.id, email: match.email, name: match.name });
      return { ok: true };
    }

    function logout() {
      setUser(null);
    }

    return { user, isAuthenticated: Boolean(user), register, login, logout };
  }, [user]);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

