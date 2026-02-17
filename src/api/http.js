// frontend/src/api/http.js
import axios from "axios";
import { tokenStorage } from "./tokenStorage";

/**
 * Axios client with:
 * - baseURL from env (VITE_API_URL or VITE_API_BASE_URL)
 * - Authorization header injection (clean JWT)
 * - FormData-safe Content-Type
 * - consistent error normalization
 * - ✅ auto-clear OLD/BAD JWT on 422 ("Subject must be a string")
 */

const baseURL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:5000";

export const http = axios.create({
  baseURL,
  timeout: 30000,
});

// ✅ clear auth everywhere (primary + legacy)
function clearAuthStorage() {
  try {
    tokenStorage?.clearAll?.();
  } catch (_) {}

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}

// ✅ prevent redirect loops
function safeRedirectToLogin() {
  if (typeof window === "undefined") return;
  if (window.location.pathname === "/login") return;
  window.location.replace("/login");
}

/* -------------------- Request interceptor -------------------- */
http.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    // ✅ Get token (supports your wrapper)
    const raw = tokenStorage?.getToken?.() ?? "";
    const token = String(raw).replace(/^Bearer\s+/i, "").trim();

    // ✅ Attach only if it looks like JWT (3 parts)
    if (token && token.split(".").length === 3) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    // ✅ Don't set Content-Type for FormData (browser sets boundary)
    const isFormData =
      typeof FormData !== "undefined" && config.data instanceof FormData;

    if (!isFormData) {
      if (!config.headers["Content-Type"] && !config.headers["content-type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    } else {
      delete config.headers["Content-Type"];
      delete config.headers["content-type"];
    }

    return config;
  },
  (error) => Promise.reject(normalizeError(error))
);

/* -------------------- Response interceptor -------------------- */
http.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalized = normalizeError(error);

    // ✅ AUTO-FIX: old token generated before identity fix
    // Common backend msg: "Subject must be a string"
    if (
      normalized.status === 422 &&
      /subject must be a string/i.test(normalized.message || "")
    ) {
      clearAuthStorage();
      safeRedirectToLogin();
    }

    // Optional: clear on 401 unauthorized
    if (normalized.status === 401) {
      clearAuthStorage();
      // don't force redirect always; but usually better UX:
      safeRedirectToLogin();
    }

    return Promise.reject(normalized);
  }
);

/* -------------------- Error normalizer -------------------- */
function normalizeError(error) {
  // If server didn't respond (CORS, offline, wrong baseURL)
  if (!error?.response) {
    return {
      status: 0,
      message:
        error?.message || "Network Error (server unreachable / CORS blocked)",
      details: null,
      raw: error,
    };
  }

  const status = error.response.status || 0;

  // Try common Flask/JWT fields
  const data = error.response.data || {};
  const message =
    data.msg ||
    data.message ||
    data.error ||
    data.detail ||
    error.message ||
    "Something went wrong";

  return { status, message, details: data, raw: error };
}

/* -------------------- Small helpers -------------------- */
export const apiGet = (url, config) => http.get(url, config).then((r) => r.data);
export const apiPost = (url, data, config) =>
  http.post(url, data, config).then((r) => r.data);
export const apiPut = (url, data, config) =>
  http.put(url, data, config).then((r) => r.data);
export const apiPatch = (url, data, config) =>
  http.patch(url, data, config).then((r) => r.data);
export const apiDelete = (url, config) =>
  http.delete(url, config).then((r) => r.data);
