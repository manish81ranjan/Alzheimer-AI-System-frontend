// // frontend/src/pages/Dashboard.jsx
// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";

// /**
//  * Dashboard
//  * - Protected page
//  * - Shows stats + recent scans list (mock now, API-ready later)
//  * - Fully responsive (mobile-first)
//  *
//  * Later we’ll connect:
//  *  GET /api/scans
//  *  GET /api/admin/analytics (admin only)
//  */

// export default function Dashboard() {
//   const [loading, setLoading] = useState(true);
//   const [recentScans, setRecentScans] = useState([]);

//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user") || "null");
//     } catch {
//       return null;
//     }
//   }, []);

//   useEffect(() => {
//     // Mock load (replace with real API later)
//     const t = setTimeout(() => {
//       setRecentScans([
//         {
//           id: "scan_001",
//           createdAt: "2026-02-11",
//           stage: "MID",
//           confidence: 0.86,
//           hasHeatmap: true,
//         },
//         {
//           id: "scan_002",
//           createdAt: "2026-02-10",
//           stage: "VMD",
//           confidence: 0.74,
//           hasHeatmap: false,
//         },
//         {
//           id: "scan_003",
//           createdAt: "2026-02-08",
//           stage: "ND",
//           confidence: 0.91,
//           hasHeatmap: true,
//         },
//       ]);
//       setLoading(false);
//     }, 450);

//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <div className="mx-auto max-w-6xl px-4 py-8">
//       {/* Header */}
//       <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
//         <div>
//           <div className="text-sm text-slate-400">Dashboard</div>
//           <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
//             Welcome{user?.name ? `, ${user.name}` : ""} 👋
//           </h1>
//           <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
//             Track your MRI uploads, view predictions (ND, VMD, MID, MOD), and
//             download auto-generated clinical-style reports.
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <Link
//             to="/upload"
//             className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
//           >
//             Upload MRI
//           </Link>
//           <Link
//             to="/reports"
//             className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 backdrop-blur transition hover:bg-white/10"
//           >
//             View Reports
//           </Link>
//         </div>
//       </div>

//       {/* Stats */}
//       <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <StatCard title="Total Scans" value={loading ? "—" : "3"} hint="All time uploads" />
//         <StatCard title="Most Recent Stage" value={loading ? "—" : "MID"} hint="Latest prediction" />
//         <StatCard title="Avg Confidence" value={loading ? "—" : "0.84"} hint="Across recent scans" />
//         <StatCard title="Reports Generated" value={loading ? "—" : "2"} hint="PDF + text reports" />
//       </div>

//       {/* Content grid */}
//       <div className="mt-8 grid gap-4 lg:grid-cols-3">
//         {/* Recent scans */}
//         <div className="lg:col-span-2">
//           <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//             <div className="flex items-center justify-between">
//               <div>
//                 <div className="text-base font-semibold text-white">
//                   Recent Scans
//                 </div>
//                 <div className="mt-1 text-xs text-slate-400">
//                   Click a scan to view prediction & details
//                 </div>
//               </div>
//               <Link
//                 to="/upload"
//                 className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 transition hover:bg-white/10"
//               >
//                 + New Upload
//               </Link>
//             </div>

//             <div className="mt-4 space-y-3">
//               {loading ? (
//                 <>
//                   <SkeletonRow />
//                   <SkeletonRow />
//                   <SkeletonRow />
//                 </>
//               ) : recentScans.length === 0 ? (
//                 <EmptyState />
//               ) : (
//                 recentScans.map((scan) => (
//                   <ScanRow key={scan.id} scan={scan} />
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right: Quick Actions + Model Info */}
//         <div className="space-y-4">
//           <QuickActions />
//           <ModelInfo />
//         </div>
//       </div>

//       {/* Placeholder charts (API-ready) */}
//       <div className="mt-8 grid gap-4 lg:grid-cols-2">
//         <ChartCard
//           title="Confidence Trend"
//           subtitle="(Placeholder — connect backend analytics later)"
//         />
//         <ChartCard
//           title="Stage Distribution"
//           subtitle="(Placeholder — ND/VMD/MID/MOD counts)"
//         />
//       </div>
//     </div>
//   );
// }

// /* -------------------- components -------------------- */

// function StatCard({ title, value, hint }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//       <div className="text-xs text-slate-400">{title}</div>
//       <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
//         {value}
//       </div>
//       <div className="mt-1 text-xs text-slate-400">{hint}</div>
//     </div>
//   );
// }

// function ScanRow({ scan }) {
//   const stageColor = stageToPill(scan.stage);
//   return (
//     <Link
//       to={`/scans/${scan.id}`}
//       className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 transition hover:bg-black/40"
//     >
//       <div className="min-w-0">
//         <div className="truncate text-sm font-semibold text-white">
//           {scan.id}
//         </div>
//         <div className="mt-1 text-xs text-slate-400">
//           {scan.createdAt} • Confidence {scan.confidence}
//         </div>
//       </div>

//       <div className="flex items-center gap-2">
//         {scan.hasHeatmap ? (
//           <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200">
//             Heatmap
//           </span>
//         ) : null}
//         <span
//           className={`rounded-full px-3 py-1 text-[11px] font-semibold ${stageColor}`}
//         >
//           {scan.stage}
//         </span>
//       </div>
//     </Link>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-black/20 p-6 text-center">
//       <div className="text-sm font-semibold text-white">No scans yet</div>
//       <div className="mt-1 text-sm text-slate-400">
//         Upload your first MRI to see predictions here.
//       </div>
//       <Link
//         to="/upload"
//         className="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
//       >
//         Upload MRI
//       </Link>
//     </div>
//   );
// }

// function SkeletonRow() {
//   return (
//     <div className="h-[56px] animate-pulse rounded-2xl border border-white/10 bg-black/30" />
//   );
// }

// function QuickActions() {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//       <div className="text-base font-semibold text-white">Quick Actions</div>
//       <div className="mt-4 grid gap-3">
//         <Link
//           to="/upload"
//           className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
//         >
//           Upload New MRI
//         </Link>
//         <Link
//           to="/reports"
//           className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:bg-white/10"
//         >
//           View Reports
//         </Link>
//         <Link
//           to="/profile"
//           className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 transition hover:bg-white/10"
//         >
//           Profile Settings
//         </Link>
//       </div>
//     </div>
//   );
// }

// function ModelInfo() {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//       <div className="text-base font-semibold text-white">Model</div>
//       <div className="mt-3 space-y-2 text-sm text-slate-300">
//         <InfoLine label="Architecture" value="DEMNET-Lite" />
//         <InfoLine label="Classes" value="ND • VMD • MID • MOD" />
//         <InfoLine label="Input" value="MRI → 128×128 grayscale" />
//         <InfoLine label="Explainability" value="Grad-CAM ready" />
//       </div>

//       <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-slate-400">
//         Tip: After backend connection, this card can show{" "}
//         <span className="text-slate-200">model version</span> and{" "}
//         <span className="text-slate-200">last trained date</span>.
//       </div>
//     </div>
//   );
// }

// function InfoLine({ label, value }) {
//   return (
//     <div className="flex items-start justify-between gap-4">
//       <div className="text-slate-400">{label}</div>
//       <div className="text-right text-slate-200">{value}</div>
//     </div>
//   );
// }

// function ChartCard({ title, subtitle }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//       <div className="flex items-center justify-between">
//         <div>
//           <div className="text-base font-semibold text-white">{title}</div>
//           <div className="mt-1 text-xs text-slate-400">{subtitle}</div>
//         </div>
//         <span className="rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-[11px] text-slate-200">
//           Coming soon
//         </span>
//       </div>

//       <div className="mt-4 grid h-44 place-items-center rounded-2xl border border-white/10 bg-black/20 text-sm text-slate-400">
//         Chart placeholder
//       </div>
//     </div>
//   );
// }

// function stageToPill(stage) {
//   // Tailwind-only (no custom colors needed)
//   switch ((stage || "").toUpperCase()) {
//     case "ND":
//       return "bg-emerald-400 text-slate-950";
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

// frontend/src/pages/Dashboard.jsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

import { useScansList } from "../features/scans/scanHooks";
import { formatDate, stageColor, stageLabel } from "../features/scans/scanUtils";
import { tokenStorage } from "../api/tokenStorage";

export default function Dashboard() {
  const { scans, loading, error, refresh } = useScansList(true);
  const user = tokenStorage.getUser();

  const recent = useMemo(() => (scans || []).slice(0, 6), [scans]);

  const stats = useMemo(() => {
    const total = (scans || []).length;
    const pending = (scans || []).filter((s) => !(s?.stage || "").trim()).length;

    const map = {};
    for (const s of scans || []) {
      const st = (s?.stage || "").trim();
      if (!st) continue;
      map[st] = (map[st] || 0) + 1;
    }

    let topStage = "";
    let topCount = 0;
    Object.entries(map).forEach(([k, v]) => {
      if (v > topCount) {
        topStage = k;
        topCount = v;
      }
    });

    return { total, pending, topStage, topCount };
  }, [scans]);

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-8">
      {/* soft background accents */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-[90px]" />
        <div className="absolute -bottom-40 right-[-120px] h-[420px] w-[520px] rounded-full bg-cyan-500/12 blur-[90px]" />
      </div>

      {/* HERO */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live dashboard • Secure JWT session
            </div>

            <h1 className="mt-4 truncate text-3xl font-semibold tracking-tight text-white">
              Welcome{user?.name ? `, ${user.name}` : ""}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300">
              Upload MRI scans, review predictions, and download reports — all in one
              clean workspace.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/upload"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                <IconUpload />
                Upload Scan
              </Link>

              <Link
                to="/reports"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
              >
                <IconDoc />
                Reports
              </Link>

              <Link
                to="/profile"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
              >
                <IconUser />
                Profile
              </Link>
            </div>
          </div>

          <div className="flex gap-2 md:flex-col md:items-end">
            <button
              onClick={refresh}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10 disabled:opacity-50"
              title="Refresh scans"
            >
              <IconRefresh spinning={loading} />
              {loading ? "Refreshing..." : "Refresh"}
            </button>

            <div className="hidden md:block text-xs text-slate-400">
              Tip: Logout/login if token changed.
            </div>
          </div>
        </div>

        {/* Error banner */}
        {error ? (
          <div className="mt-5 rounded-2xl border border-rose-300/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            <div className="font-semibold">Couldn’t load scans</div>
            <div className="mt-1 text-rose-200/90">{error}</div>
            <button
              onClick={refresh}
              className="mt-3 rounded-xl border border-rose-300/20 bg-rose-500/10 px-4 py-2 text-xs text-rose-200 hover:bg-rose-500/15"
            >
              Retry
            </button>
          </div>
        ) : null}
      </div>

      {/* STATS */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Scans"
          value={loading ? "—" : String(stats.total)}
          hint="All uploads in your account"
          icon={<IconGrid />}
        />
        <StatCard
          title="Pending"
          value={loading ? "—" : String(stats.pending)}
          hint="Not processed yet"
          icon={<IconClock />}
        />
        <StatCard
          title="Most Common Stage"
          value={
            loading
              ? "—"
              : stats.topStage
              ? `${stageLabel(stats.topStage)} • ${stats.topCount}`
              : "—"
          }
          hint="Most frequent prediction"
          icon={<IconSpark />}
        />
      </div>

      {/* MAIN */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Recent scans */}
        <div className="lg:col-span-2">
          <Card
            title="Recent Scans"
            subtitle="Latest MRI uploads"
            right={
              <Link
                to="/upload"
                className="rounded-2xl bg-white px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                New Upload
              </Link>
            }
          >
            <div className="mt-4 space-y-3">
              {loading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : recent.length === 0 ? (
                <EmptyState />
              ) : (
                recent.map((s) => <ScanRow key={s.id || s._id} scan={s} />)
              )}
            </div>

            {/* nice footer */}
            <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
              <span>Showing {Math.min(recent.length, 6)} most recent scans</span>
              <button
                onClick={refresh}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-100 hover:bg-white/10"
              >
                Refresh list
              </button>
            </div>
          </Card>
        </div>

        {/* Side */}
        <div className="space-y-4">
          <Card title="Quick Actions" subtitle="Fast navigation">
            <div className="mt-4 grid gap-3">
              <ActionTile
                to="/upload"
                title="Upload MRI"
                desc="Run a new prediction"
                icon={<IconUpload />}
                primary
              />
              <ActionTile
                to="/reports"
                title="Reports"
                desc="Download summaries"
                icon={<IconDoc />}
              />
              <ActionTile
                to="/profile"
                title="Account"
                desc="Security & settings"
                icon={<IconUser />}
              />
            </div>
          </Card>

          <Card title="Helpful Tips" subtitle="For best results">
            <div className="mt-4 space-y-2">
              <Tip>Use clear MRI image (PNG/JPG).</Tip>
              <Tip>Pending scans update after inference.</Tip>
              <Tip>Reports can be downloaded as PDF (if enabled).</Tip>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------- components ---------------- */

function Card({ title, subtitle, right, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold text-white">{title}</div>
          {subtitle ? <div className="mt-1 text-xs text-slate-400">{subtitle}</div> : null}
        </div>
        {right ? <div className="shrink-0">{right}</div> : null}
      </div>
      <div>{children}</div>
    </div>
  );
}

function StatCard({ title, value, hint, icon }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-5 backdrop-blur transition hover:border-white/15">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-slate-400">{title}</div>
          <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
          <div className="mt-1 text-xs text-slate-400">{hint}</div>
        </div>

        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-black/20 text-slate-100">
          {icon}
        </div>
      </div>
      <div className="mt-4 h-[2px] w-full rounded-full bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-60" />
    </div>
  );
}

function ScanRow({ scan }) {
  const id = scan?.id || scan?._id;
  const created = scan?.createdAt || scan?.date || "";
  const stage = (scan?.stage || "").trim();

  return (
    <Link
      to={`/scans/${id}`}
      className="block rounded-3xl border border-white/10 bg-black/20 px-4 py-4 transition hover:border-white/15 hover:bg-black/25"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white">
            Scan {String(id).slice(0, 10)}
          </div>
          <div className="mt-1 text-xs text-slate-400">{formatDate(created)}</div>
        </div>

        {stage ? (
          <span
            className={[
              "shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold",
              stageColor(stage),
            ].join(" ")}
          >
            {stageLabel(stage)}
          </span>
        ) : (
          <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200">
            Pending
          </span>
        )}
      </div>
    </Link>
  );
}

function ActionTile({ to, title, desc, icon, primary = false }) {
  return (
    <Link
      to={to}
      className={[
        "flex items-center justify-between gap-3 rounded-3xl border p-4 transition",
        primary
          ? "border-white/20 bg-white text-slate-950 hover:bg-slate-200"
          : "border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
      ].join(" ")}
    >
      <div className="flex items-center gap-3">
        <div
          className={[
            "grid h-10 w-10 place-items-center rounded-2xl border",
            primary ? "border-black/10 bg-black/5" : "border-white/10 bg-black/20",
          ].join(" ")}
        >
          {icon}
        </div>

        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className={primary ? "text-xs opacity-80" : "text-xs text-slate-400"}>
            {desc}
          </div>
        </div>
      </div>

      <span className={primary ? "text-slate-700" : "text-slate-300"}>
        <IconArrow />
      </span>
    </Link>
  );
}

function Tip({ children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
      {children}
    </div>
  );
}

function SkeletonRow() {
  return <div className="h-[70px] animate-pulse rounded-3xl bg-white/10" />;
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-7 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5">
        <IconUpload />
      </div>
      <div className="mt-3 text-sm font-semibold text-white">No scans yet</div>
      <div className="mt-1 text-sm text-slate-400">
        Upload your first MRI scan to get started.
      </div>
      <Link
        to="/upload"
        className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
      >
        <IconUpload />
        Upload Scan
      </Link>
    </div>
  );
}

/* ---------------- tiny icons (no libs needed) ---------------- */

function IconUpload() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
      <path
        d="M12 16V4m0 0 4 4M12 4 8 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
      <path
        d="M7 3h7l3 3v15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M14 3v4a1 1 0 0 0 1 1h4" stroke="currentColor" strokeWidth="2" />
      <path d="M9 13h6M9 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
      <path
        d="M20 21a8 8 0 1 0-16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconRefresh({ spinning }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={spinning ? "animate-spin" : ""}
    >
      <path
        d="M20 12a8 8 0 1 1-2.34-5.66M20 4v6h-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
      <path
        d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
      <path
        d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
      <path
        d="M12 2l1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M19 14l.8 2.6L22 18l-2.2.7L19 21l-.8-2.3L16 18l2.2-.4L19 14Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80">
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
