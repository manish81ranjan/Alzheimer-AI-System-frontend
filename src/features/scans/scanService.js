// // src/features/scans/scanService.js
// import { http, apiGet, apiDelete, apiPost } from "../../api/http";
// import { API } from "../../api/endpoints";

// /**
//  * Scan Service
//  * - Handles scan CRUD + upload
//  *
//  * Backend expectations:
//  *  GET    /api/scans                -> { scans: [...] } OR [...]
//  *  GET    /api/scans/:id            -> { scan: {...} } OR {...}
//  *  DELETE /api/scans/:id            -> { success: true }
//  *  POST   /api/scans/upload         -> { scanId, scan } OR { id, ... }
//  */

// export const scanService = {
//   async list() {
//     const data = await apiGet(API.SCANS.LIST);
//     return data?.scans || data || [];
//   },

//   async get(scanId) {
//     const data = await apiGet(API.SCANS.GET(scanId));
//     return data?.scan || data;
//   },

//   async remove(scanId) {
//     return await apiDelete(API.SCANS.DELETE(scanId));
//   },

//   async upload(file, { onProgress } = {}) {
//     const form = new FormData();
//     form.append("file", file);

//     const res = await http.post(API.SCANS.UPLOAD, form, {
//       headers: { "Content-Type": "multipart/form-data" },
//       onUploadProgress: (evt) => {
//         if (!onProgress) return;
//         const total = evt.total || 0;
//         const pct = total ? Math.round((evt.loaded / total) * 100) : 0;
//         onProgress(pct);
//       },
//     });

//     // support both {scanId} or {scan:{id}} or {id}
//     const data = res.data;
//     const scanId = data?.scanId || data?.scan?.id || data?.id || null;

//     return { scanId, data };
//   },

//   async runInference(scanId) {
//     // POST /api/infer/:scanId
//     const data = await apiPost(API.INFER.RUN(scanId), {});
//     return data;
//   },
// };

// src/features/scans/scanService.js
import { http, apiGet, apiDelete, apiPost } from "../../api/http";
import { API } from "../../api/endpoints";

/**
 * Scan Service (FINAL)
 * - Handles scan CRUD + upload + inference
 * - Fully normalized responses
 */

export const scanService = {
  /* =========================
     LIST SCANS
  ========================= */
  async list() {
    try {
      const data = await apiGet(API.SCANS.LIST);
      return data?.scans || data || [];
    } catch (err) {
      console.error("Scan list error:", err);
      throw err;
    }
  },

  /* =========================
     GET SINGLE SCAN
  ========================= */
  async get(scanId) {
    if (!scanId) throw new Error("scanId is required");

    try {
      const data = await apiGet(API.SCANS.GET(scanId));
      return data?.scan || data || null;
    } catch (err) {
      console.error("Get scan error:", err);
      throw err;
    }
  },

  /* =========================
     DELETE SCAN
  ========================= */
  async remove(scanId) {
    if (!scanId) throw new Error("scanId is required");

    try {
      return await apiDelete(API.SCANS.DELETE(scanId));
    } catch (err) {
      console.error("Delete scan error:", err);
      throw err;
    }
  },

  /* =========================
     UPLOAD SCAN
  ========================= */
  async upload(file, { onProgress } = {}) {
    if (!file) throw new Error("File is required");

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await http.post(API.SCANS.UPLOAD, form, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (!onProgress) return;
          const total = evt.total || 0;
          const pct = total ? Math.round((evt.loaded / total) * 100) : 0;
          onProgress(pct);
        },
      });

      const data = res?.data || {};

      // ✅ Normalize ID (VERY IMPORTANT)
      const scanId =
        data?.scanId ||
        data?.scan?.id ||
        data?.id ||
        null;

      return {
        scanId,
        scan: data?.scan || data || null,
      };
    } catch (err) {
      console.error("Upload error:", err);
      throw err;
    }
  },

  /* =========================
     RUN INFERENCE
  ========================= */
  async runInference(scanId) {
    if (!scanId) throw new Error("scanId is required");

    try {
      const data = await apiPost(API.INFER.RUN(scanId), {});
      return data || null;
    } catch (err) {
      console.error("Inference error:", err);
      throw err;
    }
  },
};
