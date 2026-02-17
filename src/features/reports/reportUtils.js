// src/features/reports/reportUtils.js

export function shortId(id) {
  if (!id) return "";
  const s = String(id);
  return s.length <= 10 ? s : `${s.slice(0, 6)}…${s.slice(-3)}`;
}

export function formatConfidence(conf) {
  const n = Number(conf);
  if (Number.isNaN(n)) return "—";
  return n.toFixed(2);
}

export function buildReportPreview(text, maxLen = 220) {
  if (!text) return "";
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen) + "…";
}

export function normalizeReports(list) {
  // ensure array and consistent keys
  if (!Array.isArray(list)) return [];
  return list.map((r) => ({
    id: r.id || r._id || r.reportId || "",
    scanId: r.scanId || r.scan_id || "",
    stage: r.stage || r.prediction?.stage || "",
    confidence: r.confidence ?? r.prediction?.confidence ?? null,
    createdAt: r.createdAt || r.created_at || r.date || "",
    text: r.text || r.reportText || r.summary || "",
    pdfUrl: r.pdfUrl || r.pdf_url || "",
    raw: r,
  }));
}
