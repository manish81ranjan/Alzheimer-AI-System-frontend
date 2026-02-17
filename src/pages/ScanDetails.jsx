// // frontend/src/pages/ScanDetails.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Link, useParams } from "react-router-dom";

// /**
//  * ScanDetails
//  * - Protected page
//  * - Shows:
//  *   - scan preview (placeholder now)
//  *   - predicted stage + confidence distribution
//  *   - heatmap preview (placeholder now)
//  *   - actions: generate report / download report
//  *
//  * Later connect:
//  *  GET  /api/scans/:scanId
//  *  GET  /api/predictions/:scanId
//  *  POST /api/reports/:scanId/generate
//  */

// const CLASS_ORDER = ["ND", "VMD", "MID", "MOD"];

// export default function ScanDetails() {
//   const { scanId } = useParams();

//   const [loading, setLoading] = useState(true);
//   const [scan, setScan] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [reportStatus, setReportStatus] = useState("none"); // none | generating | ready

//   // mock user (optional display)
//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user") || "null");
//     } catch {
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     // Mock fetch (replace with API)
//     const t = setTimeout(() => {
//       const mockPrediction = {
//         stage: "MID",
//         confidence: 0.86,
//         probs: {
//           ND: 0.06,
//           VMD: 0.08,
//           MID: 0.86,
//           MOD: 0.0,
//         },
//         model: "DEMNET-Lite",
//         version: "v1.0",
//         heatmapAvailable: true,
//       };

//       const mockScan = {
//         id: scanId,
//         createdAt: "2026-02-11",
//         fileName: "mri_scan.png",
//         // later this will come from backend (static file URL or signed URL)
//         imageUrl: "",
//         heatmapUrl: "",
//       };

//       setScan(mockScan);
//       setPrediction(mockPrediction);
//       setLoading(false);
//     }, 450);

//     return () => clearTimeout(t);
//   }, [scanId]);

//   async function generateReport() {
//     // Mock generate
//     setReportStatus("generating");
//     setTimeout(() => {
//       setReportStatus("ready");
//     }, 900);

//     // Later:
//     // await POST /api/reports/:scanId/generate
//   }

//   function downloadReport() {
//     // Later:
//     // window.open(`/api/reports/${reportId}/pdf`, "_blank")
//     alert("Report download will work after backend connection ✅");
//   }

//   const stageMeta = stageInfo(prediction?.stage);

//   return (
//     <div className="mx-auto max-w-6xl px-4 py-8">
//       {/* Header */}
//       <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
//         <div>
//           <div className="text-sm text-slate-400">Scan Details</div>
//           <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
//             {scanId}
//           </h1>
//           <p className="mt-2 text-sm text-slate-300">
//             Viewer for MRI scan prediction, confidence, explainability and report.
//           </p>
//           {user?.name ? (
//             <div className="mt-1 text-xs text-slate-500">
//               Requested by <span className="text-slate-300">{user.name}</span>
//             </div>
//           ) : null}
//         </div>

//         <div className="flex flex-wrap gap-3">
//           <Link
//             to="/dashboard"
//             className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
//           >
//             Back
//           </Link>

//           <Link
//             to="/upload"
//             className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
//           >
//             Upload New
//           </Link>
//         </div>
//       </div>

//       {/* Main */}
//       <div className="mt-8 grid gap-4 lg:grid-cols-3">
//         {/* Left: Images */}
//         <div className="lg:col-span-2 space-y-4">
//           <Card title="MRI Preview" subtitle={scan?.fileName || ""}>
//             {loading ? (
//               <SkeletonBox />
//             ) : scan?.imageUrl ? (
//               <img
//                 src={scan.imageUrl}
//                 alt="MRI"
//                 className="max-h-[420px] w-full rounded-xl object-contain"
//               />
//             ) : (
//               <PlaceholderBox label="MRI image will appear here (backend URL)" />
//             )}
//           </Card>

//           <Card
//             title="Explainability Heatmap"
//             subtitle={
//               prediction?.heatmapAvailable
//                 ? "Grad-CAM ready"
//                 : "Heatmap not available"
//             }
//           >
//             {loading ? (
//               <SkeletonBox />
//             ) : prediction?.heatmapAvailable && scan?.heatmapUrl ? (
//               <img
//                 src={scan.heatmapUrl}
//                 alt="Heatmap"
//                 className="max-h-[420px] w-full rounded-xl object-contain"
//               />
//             ) : (
//               <PlaceholderBox label="Heatmap will appear here (backend output)" />
//             )}
//           </Card>
//         </div>

//         {/* Right: Results + Actions */}
//         <div className="space-y-4">
//           <Card title="Prediction" subtitle="DEMNET-Lite output">
//             {loading ? (
//               <div className="space-y-3">
//                 <div className="h-10 animate-pulse rounded-xl bg-white/10" />
//                 <div className="h-24 animate-pulse rounded-xl bg-white/10" />
//               </div>
//             ) : (
//               <>
//                 <div className="flex items-center justify-between gap-3">
//                   <div className="min-w-0">
//                     <div className="text-xs text-slate-400">Stage</div>
//                     <div className="mt-1 truncate text-lg font-semibold text-white">
//                       {stageMeta.label}
//                     </div>
//                     <div className="mt-1 text-xs text-slate-400">
//                       {stageMeta.desc}
//                     </div>
//                   </div>

//                   <span
//                     className={[
//                       "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
//                       stageMeta.pill,
//                     ].join(" ")}
//                   >
//                     {prediction.stage}
//                   </span>
//                 </div>

//                 <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
//                   <div className="flex items-center justify-between text-xs text-slate-400">
//                     <span>Top Confidence</span>
//                     <span className="text-slate-200">
//                       {(prediction.confidence ?? 0).toFixed(2)}
//                     </span>
//                   </div>

//                   <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
//                     <div
//                       className="h-full bg-emerald-300 transition-all"
//                       style={{ width: `${(prediction.confidence ?? 0) * 100}%` }}
//                     />
//                   </div>

//                   <div className="mt-3 text-xs text-slate-500">
//                     Model:{" "}
//                     <span className="text-slate-200">
//                       {prediction.model} ({prediction.version})
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <div className="text-xs text-slate-400">
//                     Confidence Distribution
//                   </div>
//                   <div className="mt-2 space-y-2">
//                     {CLASS_ORDER.map((cls) => (
//                       <ProbRow
//                         key={cls}
//                         label={cls}
//                         value={prediction.probs?.[cls] ?? 0}
//                         active={cls === prediction.stage}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </>
//             )}
//           </Card>

//           <Card title="Report" subtitle="Auto clinical-style report">
//             <div className="grid gap-3">
//               <button
//                 onClick={generateReport}
//                 disabled={loading || reportStatus === "generating"}
//                 className={[
//                   "rounded-xl px-4 py-3 text-sm font-semibold transition",
//                   loading || reportStatus === "generating"
//                     ? "cursor-not-allowed bg-white/20 text-white/60"
//                     : "bg-white text-slate-950 hover:bg-slate-200",
//                 ].join(" ")}
//               >
//                 {reportStatus === "generating"
//                   ? "Generating..."
//                   : reportStatus === "ready"
//                   ? "Regenerate Report"
//                   : "Generate Report"}
//               </button>

//               <button
//                 onClick={downloadReport}
//                 disabled={reportStatus !== "ready"}
//                 className={[
//                   "rounded-xl px-4 py-3 text-sm font-semibold transition",
//                   reportStatus !== "ready"
//                     ? "cursor-not-allowed bg-emerald-400/20 text-emerald-100/60"
//                     : "bg-emerald-400 text-slate-950 hover:bg-emerald-300",
//                 ].join(" ")}
//               >
//                 Download PDF
//               </button>

//               <div className="rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-slate-300">
//                 {reportStatus === "none" && (
//                   <p>
//                     Generate a report to get structured findings, confidence, and
//                     recommendations.
//                   </p>
//                 )}
//                 {reportStatus === "generating" && (
//                   <p>
//                     Creating report from prediction + confidence (and heatmap if
//                     enabled)…
//                   </p>
//                 )}
//                 {reportStatus === "ready" && (
//                   <p>
//                     Report ready ✅ (text + PDF). Next we’ll connect it to your
//                     Flask endpoint and store in MongoDB.
//                   </p>
//                 )}
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------- UI helpers -------------------- */

// function Card({ title, subtitle, children }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//       <div className="flex items-start justify-between gap-3">
//         <div>
//           <div className="text-base font-semibold text-white">{title}</div>
//           {subtitle ? (
//             <div className="mt-1 text-xs text-slate-400">{subtitle}</div>
//           ) : null}
//         </div>
//       </div>
//       <div className="mt-4">{children}</div>
//     </div>
//   );
// }

// function SkeletonBox() {
//   return <div className="h-[240px] animate-pulse rounded-2xl bg-white/10" />;
// }

// function PlaceholderBox({ label }) {
//   return (
//     <div className="grid h-[240px] place-items-center rounded-2xl border border-white/10 bg-black/20 text-center text-sm text-slate-400">
//       <div className="max-w-xs">
//         <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-xl bg-white/10">
//           🧠
//         </div>
//         {label}
//       </div>
//     </div>
//   );
// }

// function ProbRow({ label, value, active }) {
//   const pct = Math.max(0, Math.min(1, value)) * 100;

//   return (
//     <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2">
//       <div className="flex items-center justify-between">
//         <div className="text-xs text-slate-400">
//           {label}{" "}
//           {active ? (
//             <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2 py-[2px] text-[10px] text-slate-200">
//               top
//             </span>
//           ) : null}
//         </div>
//         <div className="text-xs font-semibold text-slate-200">
//           {value.toFixed(2)}
//         </div>
//       </div>

//       <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
//         <div
//           className={active ? "h-full bg-emerald-300" : "h-full bg-white/50"}
//           style={{ width: `${pct}%` }}
//         />
//       </div>
//     </div>
//   );
// }

// function stageInfo(stage) {
//   const s = (stage || "").toUpperCase();
//   if (s === "ND")
//     return {
//       label: "No Dementia",
//       desc: "Normal cognitive patterns in MRI.",
//       pill: "bg-emerald-300 text-slate-950",
//     };
//   if (s === "VMD")
//     return {
//       label: "Very Mild Dementia",
//       desc: "Early signs — correlate clinically.",
//       pill: "bg-cyan-300 text-slate-950",
//     };
//   if (s === "MID")
//     return {
//       label: "Mild Dementia",
//       desc: "Mild cognitive decline patterns present.",
//       pill: "bg-amber-300 text-slate-950",
//     };
//   if (s === "MOD")
//     return {
//       label: "Moderate Dementia",
//       desc: "More prominent decline patterns present.",
//       pill: "bg-rose-300 text-slate-950",
//     };
//   return {
//     label: "Unknown",
//     desc: "Prediction not available.",
//     pill: "bg-white text-slate-950",
//   };
// }


// frontend/src/pages/ScanDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useScanDetails, useRunInference } from "../features/scans/scanHooks";
import { normalizeProbs, stageColor, stageLabel, toPct, topClassFromProbs } from "../features/scans/scanUtils";
import { reportService } from "../features/reports/reportService";

/**
 * ScanDetails (API-ready)
 * - GET /api/scans/:scanId
 * - POST /api/infer/:scanId
 * - POST /api/reports/:scanId/generate
 * - GET  /api/reports/:reportId/pdf
 */

const CLASS_ORDER = ["ND", "VMD", "MID", "MOD"];

export default function ScanDetails() {
  const { scanId } = useParams();

  const { scan, loading: scanLoading, error: scanError, fetchOne } = useScanDetails(scanId, true);
  const { run, running, error: inferError, result } = useRunInference();

  const [reportStatus, setReportStatus] = useState("none"); // none | generating | ready
  const [reportId, setReportId] = useState("");

  // Derived prediction (supports multiple backend formats)
  const prediction = useMemo(() => {
    // backend may return inference result via result OR scan.prediction
    const pred = result?.prediction || result || scan?.prediction || null;

    if (!pred) return null;

    const probs = normalizeProbs(pred.probs || pred.probabilities || pred.scores);
    const top = topClassFromProbs(probs);

    const stage = (pred.stage || pred.label || top.stage || "ND").toUpperCase();
    const confidence = pred.confidence ?? top.score ?? probs?.[stage] ?? 0;

    return {
      stage,
      confidence: Number(confidence) || 0,
      probs,
      heatmapUrl: pred.heatmapUrl || pred.heatmap_url || scan?.heatmapUrl || scan?.heatmap_url || "",
      model: pred.model || "DEMNET-Lite",
      version: pred.version || "v1.0",
    };
  }, [result, scan]);

  useEffect(() => {
    // If scan changes, reset report state
    setReportStatus("none");
    setReportId("");
  }, [scanId]);

  async function runInference() {
    const data = await run(scanId);
    // Some backends also update scan object; refresh scan details
    if (data) fetchOne();
  }

  async function generateReport() {
    if (!scanId) return;
    setReportStatus("generating");
    try {
      const data = await reportService.generate(scanId);
      const id = data?.reportId || data?.report?.id || data?.report?._id || data?.id || "";
      setReportId(id);
      setReportStatus("ready");
    } catch (err) {
      alert(err?.message || "Report generation failed");
      setReportStatus("none");
    }
  }

  async function downloadReport() {
    if (!reportId) return;
    try {
      const url = await reportService.downloadPdf(reportId);
      window.open(url, "_blank", "noopener,noreferrer");
      setTimeout(() => URL.revokeObjectURL(url), 30_000);
    } catch (err) {
      alert(err?.message || "PDF download failed");
    }
  }

  const stageMeta = useMemo(() => {
    const stage = prediction?.stage || "";
    return {
      label: stageLabel(stage),
      pill: stageColor(stage),
    };
  }, [prediction?.stage]);

  const pageLoading = scanLoading;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm text-slate-400">Scan Details</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
            {scanId}
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Viewer for MRI scan, prediction, confidence distribution, heatmap and report.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/dashboard"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
          >
            Back
          </Link>

          <Link
            to="/upload"
            className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
          >
            Upload New
          </Link>
        </div>
      </div>

      {/* Errors */}
      {scanError ? (
        <div className="mt-6 rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {scanError}{" "}
          <button
            onClick={fetchOne}
            className="ml-2 underline decoration-white/30 underline-offset-2 hover:text-white"
          >
            Retry
          </button>
        </div>
      ) : null}

      {inferError ? (
        <div className="mt-4 rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {inferError}
        </div>
      ) : null}

      {/* Main */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {/* Left: Images */}
        <div className="lg:col-span-2 space-y-4">
          <Card title="MRI Preview" subtitle={scan?.fileName || scan?.filename || ""}>
            {pageLoading ? (
              <SkeletonBox />
            ) : scan?.imageUrl || scan?.image_url ? (
              <img
                src={scan.imageUrl || scan.image_url}
                alt="MRI"
                className="max-h-[420px] w-full rounded-xl object-contain"
              />
            ) : (
              <PlaceholderBox label="MRI image will appear here (backend URL required)" />
            )}
          </Card>

          <Card
            title="Explainability Heatmap"
            subtitle={prediction?.heatmapUrl ? "Available" : "Not provided yet"}
          >
            {pageLoading ? (
              <SkeletonBox />
            ) : prediction?.heatmapUrl ? (
              <img
                src={prediction.heatmapUrl}
                alt="Heatmap"
                className="max-h-[420px] w-full rounded-xl object-contain"
              />
            ) : (
              <PlaceholderBox label="Heatmap will appear here (backend output URL)" />
            )}
          </Card>
        </div>

        {/* Right: Results + Actions */}
        <div className="space-y-4">
          <Card title="Prediction" subtitle="Inference result">
            {pageLoading ? (
              <div className="space-y-3">
                <div className="h-10 animate-pulse rounded-xl bg-white/10" />
                <div className="h-24 animate-pulse rounded-xl bg-white/10" />
              </div>
            ) : prediction ? (
              <>
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-slate-400">Stage</div>
                    <div className="mt-1 truncate text-lg font-semibold text-white">
                      {stageMeta.label}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      Model:{" "}
                      <span className="text-slate-200">
                        {prediction.model} ({prediction.version})
                      </span>
                    </div>
                  </div>

                  <span
                    className={[
                      "shrink-0 rounded-full px-3 py-1 text-xs font-semibold",
                      stageMeta.pill,
                    ].join(" ")}
                  >
                    {prediction.stage}
                  </span>
                </div>

                <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Top Confidence</span>
                    <span className="text-slate-200">
                      {prediction.confidence.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full bg-emerald-300 transition-all"
                      style={{ width: `${toPct(prediction.confidence)}%` }}
                    />
                  </div>

                  <div className="mt-3 text-xs text-slate-500">
                    Confidence is a probability score (0–1).
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-slate-400">
                    Confidence Distribution
                  </div>
                  <div className="mt-2 space-y-2">
                    {CLASS_ORDER.map((cls) => (
                      <ProbRow
                        key={cls}
                        label={cls}
                        value={prediction.probs?.[cls] ?? 0}
                        active={cls === prediction.stage}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
                No prediction yet. Click <b>Run Inference</b> to generate results.
              </div>
            )}
          </Card>

          <Card title="Actions" subtitle="Run inference + generate report">
            <div className="grid gap-3">
              <button
                onClick={runInference}
                disabled={pageLoading || running}
                className={[
                  "rounded-xl px-4 py-3 text-sm font-semibold transition",
                  pageLoading || running
                    ? "cursor-not-allowed bg-white/20 text-white/60"
                    : "bg-white text-slate-950 hover:bg-slate-200",
                ].join(" ")}
              >
                {running ? "Running..." : "Run Inference"}
              </button>

              <button
                onClick={generateReport}
                disabled={pageLoading || reportStatus === "generating"}
                className={[
                  "rounded-xl px-4 py-3 text-sm font-semibold transition",
                  pageLoading || reportStatus === "generating"
                    ? "cursor-not-allowed bg-emerald-400/20 text-emerald-100/60"
                    : "bg-emerald-400 text-slate-950 hover:bg-emerald-300",
                ].join(" ")}
              >
                {reportStatus === "generating"
                  ? "Generating..."
                  : reportStatus === "ready"
                  ? "Regenerate Report"
                  : "Generate Report"}
              </button>

              <button
                onClick={downloadReport}
                disabled={reportStatus !== "ready" || !reportId}
                className={[
                  "rounded-xl px-4 py-3 text-sm font-semibold transition",
                  reportStatus !== "ready" || !reportId
                    ? "cursor-not-allowed bg-white/10 text-white/50"
                    : "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
                ].join(" ")}
              >
                Download PDF
              </button>

              {reportId ? (
                <div className="rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-xs text-slate-300">
                  Report ID: <span className="text-slate-100 font-semibold">{reportId}</span>
                </div>
              ) : null}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* -------------------- UI helpers -------------------- */

function Card({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold text-white">{title}</div>
          {subtitle ? (
            <div className="mt-1 text-xs text-slate-400">{subtitle}</div>
          ) : null}
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function SkeletonBox() {
  return <div className="h-[240px] animate-pulse rounded-2xl bg-white/10" />;
}

function PlaceholderBox({ label }) {
  return (
    <div className="grid h-[240px] place-items-center rounded-2xl border border-white/10 bg-black/20 text-center text-sm text-slate-400">
      <div className="max-w-xs">
        <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-xl bg-white/10">
          🧠
        </div>
        {label}
      </div>
    </div>
  );
}

function ProbRow({ label, value, active }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;

  return (
    <div className="rounded-xl border border-white/10 bg-black/25 px-3 py-2">
      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-400">
          {label}{" "}
          {active ? (
            <span className="ml-2 rounded-full border border-white/10 bg-white/5 px-2 py-[2px] text-[10px] text-slate-200">
              top
            </span>
          ) : null}
        </div>
        <div className="text-xs font-semibold text-slate-200">
          {Number(value).toFixed(2)}
        </div>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={active ? "h-full bg-emerald-300" : "h-full bg-white/50"}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
