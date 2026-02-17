// frontend/src/api/tokenStorage.js

// ✅ Primary keys (use these everywhere)
const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

// ✅ Legacy keys (your old code used these)
const LEGACY_TOKEN_KEY = "token";
const LEGACY_USER_KEY = "user";

export const tokenStorage = {
  /* ---------- TOKEN ---------- */
  getToken() {
    return (
      localStorage.getItem(TOKEN_KEY) ||
      localStorage.getItem(LEGACY_TOKEN_KEY)
    );
  },

  setToken(token) {
    if (!token) return;
    // store in BOTH (so old + new code works)
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(LEGACY_TOKEN_KEY, token);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
  },

  /* ---------- USER ---------- */
  getUser() {
    const raw =
      localStorage.getItem(USER_KEY) || localStorage.getItem(LEGACY_USER_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setUser(user) {
    if (!user) return;
    const val = JSON.stringify(user);
    localStorage.setItem(USER_KEY, val);
    localStorage.setItem(LEGACY_USER_KEY, val);
  },

  removeUser() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(LEGACY_USER_KEY);
  },

  /* ---------- SESSION ---------- */
  clear() {
    this.removeToken();
    this.removeUser();
  },

  isAuthenticated() {
    return Boolean(this.getToken());
  },

  isAdmin() {
    const user = this.getUser();
    return (user?.role || "").toLowerCase() === "admin";
  },
};
