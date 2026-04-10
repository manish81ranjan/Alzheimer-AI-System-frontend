// // frontend/src/api/endpoints.js

// export const API = {
//   HEALTH: "/api/health",

//   AUTH: {
//     REGISTER: "/api/auth/register",
//     LOGIN: "/api/auth/login",
//     ME: "/api/auth/me",
//     LOGOUT: "/api/auth/logout",
//   },

//   SCANS: {
//     LIST: "/api/scans",
//     GET: (scanId) => `/api/scans/${scanId}`,
//     UPLOAD: "/api/scans/upload",
//     DELETE: (scanId) => `/api/scans/${scanId}`,
//   },

//   REPORTS: {
//     LIST: "/api/reports",
//     GET: (reportId) => `/api/reports/${reportId}`,
//     GENERATE: (scanId) => `/api/reports/${scanId}/generate`,
//     PDF: (reportId) => `/api/reports/${reportId}/pdf`,
//   },

//   ADMIN: {
//     ANALYTICS: "/api/admin/analytics",   // ✅ exists
//     USERS: "/api/admin/users",           // ✅ exists
//     UPDATE_ROLE: (userId) =>
//       `/api/admin/users/${userId}/role`, // ✅ exists
//   },
// };

// frontend/src/api/endpoints.js

export const API = {
  HEALTH: "/api/health",

  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    ME: "/api/auth/me",
    LOGOUT: "/api/auth/logout",
  },

  SCANS: {
    LIST: "/api/scans",
    GET: (scanId) => `/api/scans/${scanId}`,
    UPLOAD: "/api/scans/upload",
    DELETE: (scanId) => `/api/scans/${scanId}`,
  },

  // ✅ ADD THIS (THIS WAS MISSING)
  INFER: {
    RUN: (scanId) => `/api/infer/${scanId}`,
    HEATMAP: (scanId) => `/api/infer/${scanId}/heatmap`,
  },

  REPORTS: {
    LIST: "/api/reports",
    GET: (reportId) => `/api/reports/${reportId}`,
    GENERATE: (scanId) => `/api/reports/${scanId}/generate`,
    PDF: (reportId) => `/api/reports/${reportId}/pdf`,
  },

  ADMIN: {
    ANALYTICS: "/api/admin/analytics",
    USERS: "/api/admin/users",
    UPDATE_ROLE: (userId) =>
      `/api/admin/users/${userId}/role`,
  },
};
