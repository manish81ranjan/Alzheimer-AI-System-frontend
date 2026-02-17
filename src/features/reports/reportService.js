// src/features/reports/reportService.js
import { apiGet, apiPost } from "../../api/http";
import { http } from "../../api/http";
import { API } from "../../api/endpoints";

/**
 * Report Service
 *
 * Backend expectations:
 *  GET  /api/reports                 -> { reports: [...] } OR [...]
 *  GET  /api/reports/:id             -> { report: {...} } OR {...}
 *  POST /api/reports/:scanId/generate-> { reportId, report } OR {...}
 *  GET  /api/reports/:id/pdf         -> returns PDF (application/pdf)
 */

export const reportService = {
  async list() {
    const data = await apiGet(API.REPORTS.LIST);
    return data?.reports || data || [];
  },

  async get(reportId) {
    const data = await apiGet(API.REPORTS.GET(reportId));
    return data?.report || data;
  },

  async generate(scanId) {
    const data = await apiPost(API.REPORTS.GENERATE(scanId), {});
    return data;
  },

  async downloadPdf(reportId) {
    // returns blob url so UI can open in new tab
    const res = await http.get(API.REPORTS.PDF(reportId), {
      responseType: "blob",
    });

    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    return url;
  },
};
