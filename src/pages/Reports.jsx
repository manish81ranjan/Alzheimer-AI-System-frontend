// // frontend/src/pages/Reports.jsx
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// /**
//  * Reports
//  * - Protected page
//  * - Lists generated reports (mock now)
//  * - Preview report text
//  * - Download PDF button (placeholder now)
//  *
//  * Later connect:
//  *  GET /api/reports
//  *  GET /api/reports/:reportId
//  *  GET /api/reports/:reportId/pdf
//  */

// export default function Reports() {
//   const [loading, setLoading] = useState(true);
//   const [reports, setReports] = useState([]);
//   const [activeId, setActiveId] = useState("");

//   useEffect(() => {
//     // Mock data (replace with API)
//     const t = setTimeout(() => {
//       const mock = [
//         {
//           id: "rep_1201",
//           scanId: "scan_001",
//           createdAt: "2026-02-11",
//           stage: "MID",
//           confidence: 0.86,
//           text:
//             "SUMMARY:\nFindings suggest mild-to-moderate cognitive decline patterns.\n\nDETAILS:\n• Predicted Stage: MID\n• Confidence: 0.86\n• Recommendation: Correlate with clinical history and cognitive assessments.\n\nNOTE:\nThis AI output supports decision-making but does not replace professional diagnosis.",
//         },
//         {
//           id: "rep_1188",
//           scanId: "scan_003",
//           createdAt: "2026-02-08",
//           stage: "ND",
//           confidence: 0.91,
//           text:
//             "SUMMARY:\nNo strong dementia indicators observed in the uploaded slice.\n\nDETAILS:\n• Predicted Stage: ND\n• Confidence: 0.91\n• Recommendation: If symptoms persist, consider additional clinical evaluation.\n\nNOTE:\nThis AI output is informational and should be reviewed by clinicians.",
//         },
//       ];
//       setReports(mock);
//       setActiveId(mock[0]?.id || "");
//       setLoading(false);
//     }, 450);

//     return () => clearTimeout(t);
//   }, []);

//   const active = reports.find((r) => r.id === activeId);

//   function downloadPDF(reportId) {
//     // Later:
//     // window.open(`/api/reports/${reportId}/pdf`, "_blank");
//     alert(`PDF download will work after backend connection ✅ (report: ${reportId})`);
//   }

//   return (
//     <div className="mx-auto max-w-6xl px-4 py-8">
//       {/* Header */}
//       <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
//         <div>
//           <div className="text-sm text-slate-400">Reports</div>
//           <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
//             Generated Reports
//           </h1>
//           <p className="mt-2 text-sm text-slate-300">
//             View report history, preview clinical text, and download PDFs.
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           <Link
//             to="/upload"
//             className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
//           >
//             Upload New Scan
//           </Link>
//           <Link
//             to="/dashboard"
//             className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//           >
//             Dashboard
//           </Link>
//         </div>
//       </div>

//       {/* Main grid */}
//       <div className="mt-8 grid gap-4 lg:grid-cols-3">
//         {/* Left list */}
//         <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-base font-semibold text-white">
//                 Report History
//               </div>
//               <div className="mt-1 text-xs text-slate-400">
//                 Select a report to preview
//               </div>
//             </div>
//             <span className="rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-[11px] text-slate-200">
//               {loading ? "..." : `${reports.length} total`}
//             </span>
//           </div>

//           <div className="mt-4 space-y-3">
//             {loading ? (
//               <>
//                 <SkeletonRow />
//                 <SkeletonRow />
//                 <SkeletonRow />
//               </>
//             ) : reports.length === 0 ? (
//               <EmptyState />
//             ) : (
//               reports.map((r) => (
//                 <button
//                   key={r.id}
//                   onClick={() => setActiveId(r.id)}
//                   className={[
//                     "w-full rounded-2xl border px-4 py-3 text-left transition",
//                     activeId === r.id
//                       ? "border-white/20 bg-black/45"
//                       : "border-white/10 bg-black/25 hover:bg-black/35",
//                   ].join(" ")}
//                 >
//                   <div className="flex items-center justify-between gap-3">
//                     <div className="min-w-0">
//                       <div className="truncate text-sm font-semibold text-white">
//                         {r.id}
//                       </div>
//                       <div className="mt-1 text-xs text-slate-400">
//                         {r.createdAt} • Scan {r.scanId}
//                       </div>
//                     </div>

//                     <span
//                       className={[
//                         "shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold",
//                         stagePill(r.stage),
//                       ].join(" ")}
//                     >
//                       {r.stage}
//                     </span>
//                   </div>

//                   <div className="mt-2 text-xs text-slate-500">
//                     Confidence <span className="text-slate-200">{r.confidence.toFixed(2)}</span>
//                   </div>
//                 </button>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Right preview */}
//         <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//           <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
//             <div>
//               <div className="text-base font-semibold text-white">
//                 Report Preview
//               </div>
//               <div className="mt-1 text-xs text-slate-400">
//                 {active
//                   ? `Report ${active.id} • Scan ${active.scanId}`
//                   : "Select a report"}
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {active?.scanId ? (
//                 <Link
//                   to={`/scans/${active.scanId}`}
//                   className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 transition hover:bg-white/10"
//                 >
//                   View Scan
//                 </Link>
//               ) : null}

//               <button
//                 onClick={() => active && downloadPDF(active.id)}
//                 disabled={!active}
//                 className={[
//                   "rounded-xl px-3 py-2 text-xs font-semibold transition",
//                   active
//                     ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
//                     : "cursor-not-allowed bg-emerald-400/20 text-emerald-100/60",
//                 ].join(" ")}
//               >
//                 Download PDF
//               </button>
//             </div>
//           </div>

//           <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4">
//             {loading ? (
//               <div className="space-y-2">
//                 <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
//                 <div className="h-4 w-full animate-pulse rounded bg-white/10" />
//                 <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
//                 <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
//               </div>
//             ) : active ? (
//               <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-slate-200">
//                 {active.text}
//               </pre>
//             ) : (
//               <div className="grid h-48 place-items-center text-center text-sm text-slate-400">
//                 Select a report from the left panel
//               </div>
//             )}
//           </div>

//           <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-xs text-slate-400">
//             Next step: connect Flask endpoints for reports list + PDF download and
//             store generated reports in MongoDB.
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------- helpers -------------------- */

// function stagePill(stage) {
//   switch ((stage || "").toUpperCase()) {
//     case "ND":
//       return "bg-emerald-300 text-slate-950";
//     case "VMD":
//       return "bg-cyan-300 text-slate-950";
//     case "MID":
//       return "bg-amber-300 text-slate-950";
//     case "MOD":
//       return "bg-rose-300 text-slate-950";
//     default:
//       return "bg-white text-slate-950";
//   }
// }

// function SkeletonRow() {
//   return <div className="h-[64px] animate-pulse rounded-2xl bg-white/10" />;
// }

// function EmptyState() {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center">
//       <div className="text-sm font-semibold text-white">No reports yet</div>
//       <div className="mt-1 text-sm text-slate-400">
//         Generate a report after running a scan prediction.
//       </div>
//       <Link
//         to="/upload"
//         className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
//       >
//         Upload Scan
//       </Link>
//     </div>
//   );
// }


// // frontend/src/pages/Reports.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// import { reportService } from "../features/reports/reportService";
// import { buildReportPreview, formatConfidence, normalizeReports, shortId } from "../features/reports/reportUtils";
// import { stageColor } from "../features/scans/scanUtils";

// /**
//  * Reports (API-ready)
//  * - GET /api/reports
//  * - Preview report text
//  * - Download PDF (blob)
//  */

// export default function Reports() {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [reports, setReports] = useState([]);
//   const [activeId, setActiveId] = useState("");

//   const active = useMemo(
//     () => reports.find((r) => r.id === activeId) || null,
//     [reports, activeId]
//   );

//   async function load() {
//     setLoading(true);
//     setError("");
//     try {
//       const raw = await reportService.list();
//       const list = normalizeReports(raw);
//       setReports(list);
//       setActiveId(list[0]?.id || "");
//     } catch (err) {
//       setError(err?.message || "Failed to load reports");
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   async function downloadPDF(reportId) {
//     try {
//       const url = await reportService.downloadPdf(reportId);
//       window.open(url, "_blank", "noopener,noreferrer");
//       // optional: revoke later
//       setTimeout(() => URL.revokeObjectURL(url), 30_000);
//     } catch (err) {
//       alert(err?.message || "PDF download failed");
//     }
//   }

//   return (
//     <div className="mx-auto max-w-6xl px-4 py-8">
//       {/* Header */}
//       <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
//         <div>
//           <div className="text-sm text-slate-400">Reports</div>
//           <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
//             Generated Reports
//           </h1>
//           <p className="mt-2 text-sm text-slate-300">
//             View report history, preview clinical text, and download PDFs.
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-3">
//           <Link
//             to="/upload"
//             className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
//           >
//             Upload New Scan
//           </Link>
//           <Link
//             to="/dashboard"
//             className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//           >
//             Dashboard
//           </Link>
//         </div>
//       </div>

//       {/* Error */}
//       {error ? (
//         <div className="mt-6 rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
//           {error}{" "}
//           <button
//             onClick={load}
//             className="ml-2 underline decoration-white/30 underline-offset-2 hover:text-white"
//           >
//             Retry
//           </button>
//         </div>
//       ) : null}

//       {/* Main grid */}
//       <div className="mt-8 grid gap-4 lg:grid-cols-3">
//         {/* Left list */}
//         <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-base font-semibold text-white">
//                 Report History
//               </div>
//               <div className="mt-1 text-xs text-slate-400">
//                 Select a report to preview
//               </div>
//             </div>

//             <button
//               onClick={load}
//               className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 transition hover:bg-white/10"
//             >
//               Refresh
//             </button>
//           </div>

//           <div className="mt-4 space-y-3">
//             {loading ? (
//               <>
//                 <SkeletonRow />
//                 <SkeletonRow />
//                 <SkeletonRow />
//               </>
//             ) : reports.length === 0 ? (
//               <EmptyState />
//             ) : (
//               reports.map((r) => (
//                 <button
//                   key={r.id}
//                   onClick={() => setActiveId(r.id)}
//                   className={[
//                     "w-full rounded-2xl border px-4 py-3 text-left transition",
//                     activeId === r.id
//                       ? "border-white/20 bg-black/45"
//                       : "border-white/10 bg-black/25 hover:bg-black/35",
//                   ].join(" ")}
//                 >
//                   <div className="flex items-center justify-between gap-3">
//                     <div className="min-w-0">
//                       <div className="truncate text-sm font-semibold text-white">
//                         {shortId(r.id)}
//                       </div>
//                       <div className="mt-1 text-xs text-slate-400">
//                         {r.createdAt || "—"} • Scan {shortId(r.scanId)}
//                       </div>
//                     </div>

//                     <span
//                       className={[
//                         "shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold",
//                         stageColor(r.stage),
//                       ].join(" ")}
//                     >
//                       {r.stage || "—"}
//                     </span>
//                   </div>

//                   <div className="mt-2 text-xs text-slate-500">
//                     Confidence{" "}
//                     <span className="text-slate-200">
//                       {formatConfidence(r.confidence)}
//                     </span>
//                   </div>

//                   <div className="mt-2 text-xs text-slate-400">
//                     {buildReportPreview(r.text)}
//                   </div>
//                 </button>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Right preview */}
//         <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//           <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
//             <div>
//               <div className="text-base font-semibold text-white">
//                 Report Preview
//               </div>
//               <div className="mt-1 text-xs text-slate-400">
//                 {active
//                   ? `Report ${shortId(active.id)} • Scan ${shortId(active.scanId)}`
//                   : "Select a report"}
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {active?.scanId ? (
//                 <Link
//                   to={`/scans/${active.scanId}`}
//                   className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 transition hover:bg-white/10"
//                 >
//                   View Scan
//                 </Link>
//               ) : null}

//               <button
//                 onClick={() => active && downloadPDF(active.id)}
//                 disabled={!active}
//                 className={[
//                   "rounded-xl px-3 py-2 text-xs font-semibold transition",
//                   active
//                     ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
//                     : "cursor-not-allowed bg-emerald-400/20 text-emerald-100/60",
//                 ].join(" ")}
//               >
//                 Download PDF
//               </button>
//             </div>
//           </div>

//           <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4">
//             {loading ? (
//               <div className="space-y-2">
//                 <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
//                 <div className="h-4 w-full animate-pulse rounded bg-white/10" />
//                 <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
//                 <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
//               </div>
//             ) : active ? (
//               <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-slate-200">
//                 {active.text || "No report text provided by backend."}
//               </pre>
//             ) : (
//               <div className="grid h-48 place-items-center text-center text-sm text-slate-400">
//                 Select a report from the left panel
//               </div>
//             )}
//           </div>

//           <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4 text-xs text-slate-400">
//             Backend endpoints used:{" "}
//             <span className="text-slate-200">GET /api/reports</span>,{" "}
//             <span className="text-slate-200">GET /api/reports/:id/pdf</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------- helpers -------------------- */

// function SkeletonRow() {
//   return <div className="h-[70px] animate-pulse rounded-2xl bg-white/10" />;
// }

// function EmptyState() {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center">
//       <div className="text-sm font-semibold text-white">No reports yet</div>
//       <div className="mt-1 text-sm text-slate-400">
//         Generate a report after running a scan prediction.
//       </div>
//       <Link
//         to="/upload"
//         className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
//       >
//         Upload Scan
//       </Link>
//     </div>
//   );
// }

// frontend/src/pages/Reports.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { reportService } from "../features/reports/reportService";
import {
  buildReportPreview,
  formatConfidence,
  normalizeReports,
  shortId,
} from "../features/reports/reportUtils";
import { stageColor } from "../features/scans/scanUtils";

/**
 * Reports (UI improved, API-ready)
 * - GET /api/reports
 * - Preview report text
 * - Download PDF (blob)
 */

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reports, setReports] = useState([]);
  const [activeId, setActiveId] = useState("");

  // UI controls
  const [q, setQ] = useState("");
  const [stage, setStage] = useState("all"); // all | stageName
  const [sort, setSort] = useState("newest"); // newest | oldest | confidence

  // UX
  const [downloadingId, setDownloadingId] = useState("");
  const [toast, setToast] = useState("");

  const active = useMemo(
    () => reports.find((r) => r.id === activeId) || null,
    [reports, activeId]
  );

  async function load() {
    setLoading(true);
    setError("");
    setToast("");
    try {
      const raw = await reportService.list();
      const list = normalizeReports(raw);
      setReports(list);
      setActiveId(list[0]?.id || "");
    } catch (err) {
      setError(err?.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stageOptions = useMemo(() => {
    const s = new Set();
    for (const r of reports) if (r?.stage) s.add(String(r.stage));
    return ["all", ...Array.from(s)];
  }, [reports]);

  // client-side filter/sort (no backend changes)
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    let list = reports.slice();

    if (stage !== "all") {
      list = list.filter((r) => String(r.stage || "").toLowerCase() === stage.toLowerCase());
    }

    if (query) {
      list = list.filter((r) => {
        const a = String(r.id || "").toLowerCase();
        const b = String(r.scanId || "").toLowerCase();
        const c = String(r.stage || "").toLowerCase();
        const d = String(r.createdAt || "").toLowerCase();
        const e = String(r.text || "").toLowerCase();
        return (
          a.includes(query) ||
          b.includes(query) ||
          c.includes(query) ||
          d.includes(query) ||
          e.includes(query)
        );
      });
    }

    if (sort === "confidence") {
      list.sort((x, y) => (Number(y.confidence) || 0) - (Number(x.confidence) || 0));
    } else if (sort === "oldest") {
      list.reverse(); // normalizeReports usually returns newest first
    } // newest keeps as-is

    return list;
  }, [reports, q, stage, sort]);

  // ensure active exists in filtered view; keep UX consistent
  useEffect(() => {
    if (!activeId) return;
    if (filtered.length === 0) return;
    const exists = filtered.some((r) => r.id === activeId);
    if (!exists) setActiveId(filtered[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, stage, sort]);

  async function downloadPDF(reportId) {
    if (!reportId) return;
    setToast("");
    setDownloadingId(reportId);
    try {
      const url = await reportService.downloadPdf(reportId);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 30_000);
    } catch (err) {
      setToast(err?.message || "PDF download failed");
    } finally {
      setDownloadingId("");
    }
  }

  async function copy(text, label) {
    setToast("");
    if (!text) return;
    try {
      await navigator.clipboard.writeText(String(text));
      setToast(label || "Copied ✅");
      setTimeout(() => setToast(""), 1500);
    } catch {
      setToast("Copy failed");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm text-slate-400">Reports</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
            Generated Reports
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            View report history, preview clinical text, and download PDFs.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/upload"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
          >
            Upload New Scan
          </Link>
          <Link
            to="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Alerts */}
      {error ? (
        <div className="mt-6 rounded-2xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}{" "}
          <button
            onClick={load}
            className="ml-2 underline decoration-white/30 underline-offset-2 hover:text-white"
          >
            Retry
          </button>
        </div>
      ) : null}

      {toast ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
          {toast}
        </div>
      ) : null}

      {/* Main grid */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {/* Left list */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-base font-semibold text-white">Report History</div>
              <div className="mt-1 text-xs text-slate-400">
                {loading ? "Loading…" : `${filtered.length} shown • ${reports.length} total`}
              </div>
            </div>

            <button
              onClick={load}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 transition hover:bg-white/10"
            >
              Refresh
            </button>
          </div>

          {/* controls */}
          <div className="mt-4 space-y-3">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/25 px-3 py-2">
                <span className="text-slate-400">
                  <IconSearch />
                </span>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by ID, stage, date, text…"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
                {q ? (
                  <button
                    type="button"
                    onClick={() => setQ("")}
                    className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-200 hover:bg-white/10"
                  >
                    Clear
                  </button>
                ) : null}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-slate-100 outline-none"
                >
                  {stageOptions.map((s) => (
                    <option key={s} value={s} className="bg-slate-950">
                      {s === "all" ? "All stages" : s}
                    </option>
                  ))}
                </select>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-slate-100 outline-none"
                >
                  <option value="newest" className="bg-slate-950">
                    Sort: Newest
                  </option>
                  <option value="oldest" className="bg-slate-950">
                    Sort: Oldest
                  </option>
                  <option value="confidence" className="bg-slate-950">
                    Sort: Confidence
                  </option>
                </select>
              </div>
            </div>

            {/* list */}
            <div className="space-y-3">
              {loading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : filtered.length === 0 ? (
                <EmptyState />
              ) : (
                filtered.map((r) => {
                  const isActive = activeId === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => setActiveId(r.id)}
                      className={[
                        "w-full rounded-2xl border px-4 py-3 text-left transition",
                        isActive
                          ? "border-white/25 bg-black/45 shadow-[0_0_0_3px_rgba(99,102,241,.14)]"
                          : "border-white/10 bg-black/25 hover:bg-black/35",
                      ].join(" ")}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <div className="truncate text-sm font-semibold text-white">
                              {shortId(r.id)}
                            </div>
                            <span className="text-xs text-slate-500">•</span>
                            <div className="text-xs text-slate-400">{r.createdAt || "—"}</div>
                          </div>
                          <div className="mt-1 text-xs text-slate-400">
                            Scan <span className="text-slate-200">{shortId(r.scanId)}</span>
                          </div>
                        </div>

                        <span
                          className={[
                            "shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold",
                            stageColor(r.stage),
                          ].join(" ")}
                        >
                          {r.stage || "—"}
                        </span>
                      </div>

                      <div className="mt-2 text-xs text-slate-500">
                        Confidence{" "}
                        <span className="text-slate-200">{formatConfidence(r.confidence)}</span>
                      </div>

                      <div className="mt-2 text-xs text-slate-400">
                        {buildReportPreview(r.text)}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right preview */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          {/* sticky-ish header (professional) */}
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-base font-semibold text-white">Report Preview</div>
              <div className="mt-1 text-xs text-slate-400">
                {active
                  ? `Report ${shortId(active.id)} • Scan ${shortId(active.scanId)}`
                  : "Select a report"}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {active?.id ? (
                <button
                  onClick={() => copy(active.id, "Report ID copied ✅")}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 transition hover:bg-white/10"
                >
                  Copy Report ID
                </button>
              ) : null}

              {active?.scanId ? (
                <>
                  <button
                    onClick={() => copy(active.scanId, "Scan ID copied ✅")}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 transition hover:bg-white/10"
                  >
                    Copy Scan ID
                  </button>

                  <Link
                    to={`/scans/${active.scanId}`}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 transition hover:bg-white/10"
                  >
                    View Scan
                  </Link>
                </>
              ) : null}

              <button
                onClick={() => active && downloadPDF(active.id)}
                disabled={!active || downloadingId === active?.id}
                className={[
                  "rounded-xl px-3 py-2 text-xs font-semibold transition",
                  active
                    ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                    : "cursor-not-allowed bg-emerald-400/20 text-emerald-100/60",
                  downloadingId === active?.id ? "opacity-80" : "",
                ].join(" ")}
              >
                {downloadingId === active?.id ? (
                  <span className="inline-flex items-center gap-2">
                    <SpinnerDark /> Downloading…
                  </span>
                ) : (
                  "Download PDF"
                )}
              </button>
            </div>
          </div>

          {/* meta chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            <MetaChip label="Stage" value={active?.stage || "—"} className={active?.stage ? stageColor(active.stage) : ""} />
            <MetaChip label="Confidence" value={active ? formatConfidence(active.confidence) : "—"} />
            <MetaChip label="Created" value={active?.createdAt || "—"} />
          </div>

          {/* preview box */}
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4">
            {loading ? (
              <PreviewSkeleton />
            ) : active ? (
              <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-slate-200">
                {active.text || "No report text provided by backend."}
              </pre>
            ) : (
              <div className="grid h-48 place-items-center text-center text-sm text-slate-400">
                Select a report from the left panel
              </div>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-xs text-slate-400">
            Backend endpoints used:{" "}
            <span className="text-slate-200">GET /api/reports</span>,{" "}
            <span className="text-slate-200">GET /api/reports/:id/pdf</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- helpers -------------------- */

function SkeletonRow() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
      <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-white/10" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-white/10" />
      <div className="mt-2 h-3 w-5/6 animate-pulse rounded bg-white/10" />
    </div>
  );
}

function PreviewSkeleton() {
  return (
    <div className="space-y-2">
      <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
      <div className="h-4 w-full animate-pulse rounded bg-white/10" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-white/10" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
      <div className="h-4 w-full animate-pulse rounded bg-white/10" />
      <div className="h-4 w-4/5 animate-pulse rounded bg-white/10" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center">
      <div className="text-sm font-semibold text-white">No reports found</div>
      <div className="mt-1 text-sm text-slate-400">
        Generate a report after running a scan prediction.
      </div>
      <Link
        to="/upload"
        className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
      >
        Upload Scan
      </Link>
    </div>
  );
}

function MetaChip({ label, value, className = "" }) {
  return (
    <div className={["rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-xs", className].join(" ")}>
      <span className="text-slate-400">{label}: </span>
      <span className="font-semibold text-slate-100">{value}</span>
    </div>
  );
}

function SpinnerDark() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950"
      aria-label="loading"
    />
  );
}

/* simple icon */
function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M21 21l-4.3-4.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
