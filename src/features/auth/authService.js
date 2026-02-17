// // src/features/auth/authService.js
// import { apiGet, apiPost } from "../../api/http";
// import { API } from "../../api/endpoints";
// import { tokenStorage } from "../../api/tokenStorage";

// /**
//  * Auth Service
//  * - Talks to backend
//  * - Stores token + user in tokenStorage
//  *
//  * Expected backend responses:
//  *  Login/Register -> { token: "<jwt>", user: { id, name, email, role } }
//  *  ME -> { user: {...} }  OR just user object
//  */

// export const authService = {
//   async register(payload) {
//     const data = await apiPost(API.AUTH.REGISTER, payload);
//     return persistSession(data);
//   },

//   async login(payload) {
//     const data = await apiPost(API.AUTH.LOGIN, payload);
//     return persistSession(data);
//   },

//   async me() {
//     const data = await apiGet(API.AUTH.ME);
//     // support: {user:{...}} OR {...}
//     const user = data?.user || data;
//     if (user) tokenStorage.setUser(user);
//     return user;
//   },

//   logout() {
//     // frontend-side logout (backend endpoint optional)
//     tokenStorage.clear();
//     return true;
//   },
// };

// /* -------------------- helper -------------------- */
// function persistSession(data) {
//   const token = data?.token;
//   const user = data?.user;

//   if (token) tokenStorage.setToken(token);
//   if (user) tokenStorage.setUser(user);

//   return { token, user };
// }

// src/features/auth/authService.js
import { apiGet, apiPost } from "../../api/http";
import { API } from "../../api/endpoints";
import { tokenStorage } from "../../api/tokenStorage";

/**
 * Auth Service (Final)
 * - Supports User/Admin login via loginAs
 * - Persists token + user
 * - Saves last login timestamp for Profile page
 *
 * Expected backend responses:
 *  Login/Register -> { token: "<jwt>", user: { id, name, email, role, ... } }
 *  ME -> { user: {...} } OR {...}
 */

export const authService = {
  async register(payload) {
    // payload: { name, email, password }
    const data = await apiPost(API.AUTH.REGISTER, payload);
    // (Optional) you can also set last login on register if you auto-login user
    return persistSession(data, { setLastLogin: true });
  },

  async login(payload) {
    // payload: { email, password, loginAs? }  ✅ loginAs comes from Login.jsx
    const data = await apiPost(API.AUTH.LOGIN, payload);
    return persistSession(data, { setLastLogin: true });
  },

  async me() {
    const data = await apiGet(API.AUTH.ME);

    // support: {user:{...}} OR {...}
    const user = data?.user || data;

    if (user && typeof user === "object") {
      tokenStorage.setUser(user);
    }

    return user;
  },

  logout() {
    tokenStorage.clear();
    // keep last_login_at if you want, or remove it:
    // localStorage.removeItem("last_login_at");
    return true;
  },
};

/* -------------------- helpers -------------------- */

function persistSession(data, opts = {}) {
  const token = data?.token || null;

  // Support {user:{...}} or direct user
  const user = (data?.user && typeof data.user === "object") ? data.user : null;

  if (token) tokenStorage.setToken(token);
  if (user) tokenStorage.setUser(user);

  // ✅ Save "Last Login" timestamp for Profile page
  if (opts.setLastLogin && token) {
    localStorage.setItem("last_login_at", formatDateTime(new Date()));
  }

  return { token, user };
}

function formatDateTime(date) {
  // Example: 15/2/2026, 12:35:39 pm (same style as your UI screenshot)
  try {
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  } catch {
    return new Date().toISOString();
  }
}
