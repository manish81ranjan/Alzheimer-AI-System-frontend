// src/features/scans/scanUtils.js

export const STAGES = ["ND", "VMD", "MID", "MOD"];

export function stageLabel(stage) {
  switch ((stage || "").toUpperCase()) {
    case "ND":
      return "No Dementia";
    case "VMD":
      return "Very Mild Dementia";
    case "MID":
      return "Mild Dementia";
    case "MOD":
      return "Moderate Dementia";
    default:
      return "Unknown";
  }
}

export function stageColor(stage) {
  // Tailwind-safe class names used across UI
  switch ((stage || "").toUpperCase()) {
    case "ND":
      return "bg-emerald-300 text-slate-950";
    case "VMD":
      return "bg-cyan-300 text-slate-950";
    case "MID":
      return "bg-amber-300 text-slate-950";
    case "MOD":
      return "bg-rose-300 text-slate-950";
    default:
      return "bg-white text-slate-950";
  }
}

export function clamp01(n) {
  const x = Number(n);
  if (Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(1, x));
}

export function toPct(n) {
  return Math.round(clamp01(n) * 100);
}

export function topClassFromProbs(probs) {
  if (!probs || typeof probs !== "object") return { stage: "ND", score: 0 };
  let best = { stage: "ND", score: -1 };

  for (const k of Object.keys(probs)) {
    const v = clamp01(probs[k]);
    if (v > best.score) best = { stage: k, score: v };
  }
  return best;
}

export function normalizeProbs(probs) {
  // ensures all stages exist and sum doesn't matter for UI
  const out = {};
  for (const s of STAGES) out[s] = clamp01(probs?.[s] ?? 0);
  return out;
}

export function formatDate(dateStr) {
  // Accepts YYYY-MM-DD or ISO; returns readable
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return String(dateStr);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
