// // frontend/src/pages/Home.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import BrainCanvas from "../components/three/BrainCanvas.jsx";

// /**
//  * Home Page
//  * - Responsive hero with Three.js background (BrainCanvas)
//  * - Clean Tailwind layout
//  * - CTA buttons to Upload + Dashboard
//  */

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       {/* HERO */}
//       <section className="relative overflow-hidden">
//         {/* 3D Background */}
//         <div className="absolute inset-0">
//           <BrainCanvas />
//         </div>

//         {/* Content */}
//         <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
//           <div className="grid items-center gap-10 md:grid-cols-2">
//             {/* Left */}
//             <div>
//               <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 backdrop-blur">
//                 <span className="h-2 w-2 rounded-full bg-emerald-400" />
//                 DEMNET-Lite • MRI Dementia Staging
//               </div>

//               <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
//                 Cognitive Disorder Detection{" "}
//                 <span className="text-slate-200">with AI</span>
//               </h1>

//               <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-300">
//                 Upload MRI scans and get dementia staging predictions (ND, VMD,
//                 MID, MOD) with confidence, optional heatmaps, and a structured
//                 clinical-style report — all in one dashboard.
//               </p>

//               <div className="mt-7 flex flex-col gap-3 sm:flex-row">
//                 <Link
//                   to="/upload"
//                   className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-slate-200"
//                 >
//                   Upload MRI Scan
//                 </Link>

//                 <Link
//                   to="/dashboard"
//                   className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
//                 >
//                   View Dashboard
//                 </Link>
//               </div>

//               <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
//                 <StatCard label="Stages" value="4 Classes" />
//                 <StatCard label="Report" value="Auto Generated" />
//                 <StatCard label="Explainability" value="Grad-CAM Ready" />
//               </div>
//             </div>

//             {/* Right */}
//             <div className="relative">
//               <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-sm font-medium text-slate-200">
//                       Quick Preview
//                     </div>
//                     <div className="mt-1 text-xs text-slate-400">
//                       What you’ll see after uploading
//                     </div>
//                   </div>
//                   <span className="rounded-lg border border-white/10 bg-black/30 px-2 py-1 text-[11px] text-slate-200">
//                     DEMNET-Lite
//                   </span>
//                 </div>

//                 <div className="mt-5 space-y-3">
//                   <PreviewRow label="Prediction" value="MID (Moderate)" />
//                   <PreviewRow label="Confidence" value="0.86" />
//                   <PreviewRow label="Heatmap" value="Enabled" />
//                   <PreviewRow label="Report" value="PDF + Text" />
//                 </div>

//                 <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
//                   <div className="text-xs text-slate-400">Clinical Note</div>
//                   <p className="mt-2 text-sm leading-relaxed text-slate-200">
//                     Findings suggest moderate cognitive decline patterns.
//                     Consider correlating with clinical history and cognitive
//                     assessments.
//                   </p>
//                 </div>

//                 <div className="mt-5 flex flex-wrap gap-2">
//                   <Badge>Upload</Badge>
//                   <Badge>Predict</Badge>
//                   <Badge>Explain</Badge>
//                   <Badge>Report</Badge>
//                   <Badge>Track</Badge>
//                 </div>
//               </div>

//               {/* Glow */}
//               <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-r from-indigo-500/15 via-cyan-400/10 to-emerald-400/15 blur-2xl" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="mx-auto max-w-6xl px-4 pb-16">
//         <div className="grid gap-4 md:grid-cols-3">
//           <FeatureCard
//             title="Responsive Dashboard"
//             desc="Mobile-first UI with scan history, predictions, and reports."
//           />
//           <FeatureCard
//             title="Explainable AI Ready"
//             desc="Optional Grad-CAM heatmaps to visualize important regions."
//           />
//           <FeatureCard
//             title="MongoDB Storage"
//             desc="Securely store scans, predictions, reports, and analytics."
//           />
//         </div>

//         <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div>
//               <h2 className="text-xl font-semibold">Ready to test a scan?</h2>
//               <p className="mt-1 text-sm text-slate-300">
//                 Start by uploading a sample MRI image and view the output.
//               </p>
//             </div>
//             <Link
//               to="/upload"
//               className="inline-flex items-center justify-center rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
//             >
//               Get Started
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// /* ---------------------- small components ---------------------- */

// function StatCard({ label, value }) {
//   return (
//     <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur">
//       <div className="text-xs text-slate-400">{label}</div>
//       <div className="mt-1 text-sm font-semibold text-slate-100">{value}</div>
//     </div>
//   );
// }

// function PreviewRow({ label, value }) {
//   return (
//     <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
//       <div className="text-xs text-slate-400">{label}</div>
//       <div className="text-sm font-semibold text-slate-100">{value}</div>
//     </div>
//   );
// }

// function Badge({ children }) {
//   return (
//     <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
//       {children}
//     </span>
//   );
// }

// function FeatureCard({ title, desc }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10">
//       <div className="text-base font-semibold">{title}</div>
//       <div className="mt-2 text-sm leading-relaxed text-slate-300">{desc}</div>
//     </div>
//   );
// }

// // frontend/src/pages/Home.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import BrainCanvas from "../components/three/BrainCanvas.jsx";

// /**
//  * Home Page (Clean + Visual First)
//  * ✅ Removes Quick Preview card
//  * ✅ Full focus on Saturn/Brain 3D canvas
//  * ✅ Left content + right visual balance
//  */

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-slate-950 text-white">
//       {/* HERO */}
//       <section className="relative overflow-hidden">
//         {/* 3D Background */}
//         <div className="absolute inset-0">
//           <BrainCanvas />
//         </div>

//         {/* Readability overlay */}
//         <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-slate-950/90" />
//         <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_12%_10%,rgba(99,102,241,.18),transparent_65%),radial-gradient(900px_500px_at_90%_40%,rgba(34,211,238,.12),transparent_65%)]" />

//         {/* Content */}
//         <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-20 md:pt-28 md:pb-28">
//           <div className="grid items-center gap-10 md:grid-cols-2">
//             {/* LEFT CONTENT */}
//             <div>
//               <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-200 backdrop-blur">
//                 <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" />
//                 DEMNET • MRI Dementia Staging
//               </div>

//               <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
//                 Cognitive Disorder Detection{" "}
//                 <span className="bg-gradient-to-r from-slate-200 via-white to-slate-200 bg-clip-text text-transparent">
//                   with AI
//                 </span>
//               </h1>

//               <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300">
//                 Upload MRI scans and get dementia staging predictions (ND, VMD,
//                 MID, MOD) with confidence, explainable heatmaps, and structured
//                 clinical-style reports — all in one secure dashboard.
//               </p>

//               {/* CTA */}
//               <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//                 <Link
//                   to="/upload"
//                   className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_60px_rgba(255,255,255,.08)] transition hover:bg-slate-200 active:scale-[0.99]"
//                 >
//                   Upload MRI Scan
//                   <ArrowRight className="opacity-70 transition group-hover:translate-x-0.5" />
//                 </Link>

//                 <Link
//                   to="/dashboard"
//                   className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:bg-white/[0.08] active:scale-[0.99]"
//                 >
//                   View Dashboard
//                 </Link>
//               </div>

//               {/* Stats */}
//               <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
//                 <StatCard label="Stages" value="4 Classes" />
//                 <StatCard label="Reports" value="Auto Generated" />
//                 <StatCard label="Explainability" value="Grad-CAM Ready" />
//               </div>
//             </div>

//             {/* RIGHT SIDE – PURE VISUAL SPACE */}
//             <div className="relative hidden md:block">
//               {/* Glow to enhance Saturn/Brain */}
//               <div className="pointer-events-none absolute -inset-10 rounded-full bg-gradient-to-r from-indigo-500/15 via-cyan-400/10 to-emerald-400/15 blur-3xl" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="mx-auto max-w-6xl px-4 pb-16">
//         <div className="mb-6">
//           <div className="text-xs font-semibold tracking-wide text-slate-400">
//             FEATURES
//           </div>
//           <h2 className="mt-2 text-2xl font-semibold tracking-tight">
//             Designed for clinical clarity
//           </h2>
//           <p className="mt-2 max-w-2xl text-sm text-slate-300">
//             A focused workflow from scan upload to prediction, explainability,
//             and reporting — without clutter.
//           </p>
//         </div>

//         <div className="grid gap-4 md:grid-cols-3">
//           <FeatureCard
//             icon={<IconGrid />}
//             title="Responsive Dashboard"
//             desc="Clean interface with scan history, predictions, and reports."
//           />
//           <FeatureCard
//             icon={<IconSpark />}
//             title="Explainable AI"
//             desc="Optional Grad-CAM heatmaps to visualize affected regions."
//           />
//           <FeatureCard
//             icon={<IconDB />}
//             title="Secure Storage"
//             desc="Scans and reports stored safely using MongoDB."
//           />
//         </div>

//         {/* CTA */}
//         <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div>
//               <h3 className="text-lg font-semibold">
//                 Ready to test a scan?
//               </h3>
//               <p className="mt-1 text-sm text-slate-300">
//                 Upload an MRI image and view AI-generated insights instantly.
//               </p>
//             </div>
//             <Link
//               to="/upload"
//               className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
//             >
//               Get Started
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// /* ---------------- components ---------------- */

// function StatCard({ label, value }) {
//   return (
//     <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
//       <div className="text-xs text-slate-400">{label}</div>
//       <div className="mt-1 text-sm font-semibold text-slate-100">{value}</div>
//     </div>
//   );
// }

// function FeatureCard({ icon, title, desc }) {
//   return (
//     <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition hover:bg-white/[0.09]">
//       <div className="flex items-center gap-3">
//         <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-black/25">
//           {icon}
//         </div>
//         <div className="text-base font-semibold">{title}</div>
//       </div>
//       <div className="mt-3 text-sm leading-relaxed text-slate-300">
//         {desc}
//       </div>
//     </div>
//   );
// }

// /* ---------------- icons ---------------- */

// function ArrowRight({ className = "" }) {
//   return (
//     <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path d="M5 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//       <path d="m13 6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//     </svg>
//   );
// }

// function IconGrid() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path d="M4 4h7v7H4V4Z" stroke="currentColor" strokeWidth="2" />
//       <path d="M13 4h7v7h-7V4Z" stroke="currentColor" strokeWidth="2" />
//       <path d="M4 13h7v7H4v-7Z" stroke="currentColor" strokeWidth="2" />
//       <path d="M13 13h7v7h-7v-7Z" stroke="currentColor" strokeWidth="2" />
//     </svg>
//   );
// }

// function IconSpark() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" stroke="currentColor" strokeWidth="2" />
//     </svg>
//   );
// }

// function IconDB() {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//       <path d="M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3Z" stroke="currentColor" strokeWidth="2" />
//       <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" stroke="currentColor" strokeWidth="2" />
//     </svg>
//   );
// }

// frontend/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import BrainCanvas from "../components/three/BrainCanvas.jsx";

/**
 * Home Page (Final)
 * ✅ No Quick Preview card
 * ✅ Right side = pure visual space for Saturn (Canvas)
 * ✅ Clean SaaS layout + premium spacing
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* 3D background */}
        <div className="absolute inset-0">
          <BrainCanvas />
        </div>

        {/* readability overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/25 to-slate-950/90" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_12%_10%,rgba(99,102,241,.18),transparent_65%),radial-gradient(900px_500px_at_90%_40%,rgba(34,211,238,.12),transparent_65%)]" />

        {/* content */}
        <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            {/* LEFT */}
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-slate-200 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" />
                DEMNET • MRI Dementia Staging
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                Cognitive Disorder Detection{" "}
                <span className="bg-gradient-to-r from-slate-200 via-white to-slate-200 bg-clip-text text-transparent">
                  with AI
                </span>
              </h1>

              <p className="mt-6 text-base leading-relaxed text-slate-300">
                Upload MRI scans and get dementia staging predictions (ND, VMD,
                MID, MOD) with confidence, explainable heatmaps, and structured
                clinical-style reports — all in one secure dashboard.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/upload"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_60px_rgba(255,255,255,.08)] transition hover:bg-slate-200 active:scale-[0.99]"
                >
                  Upload MRI Scan
                  <ArrowRight className="opacity-70 transition group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur transition hover:bg-white/[0.08] active:scale-[0.99]"
                >
                  View Dashboard
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <StatCard label="Stages" value="4 Classes" />
                <StatCard label="Reports" value="Auto Generated" />
                <StatCard label="Explainability" value="Grad-CAM Ready" />
              </div>
            </div>

            {/* RIGHT: pure visual space (only glow, Saturn stays clean) */}
            <div className="relative hidden md:block">
              <div className="pointer-events-none absolute -inset-12 rounded-full bg-gradient-to-r from-indigo-500/16 via-cyan-400/10 to-emerald-400/14 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-6">
          <div className="text-xs font-semibold tracking-wide text-slate-400">
            FEATURES
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Designed for clinical clarity
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-300">
            A focused workflow from scan upload to prediction, explainability,
            and reporting — without clutter.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<IconGrid />}
            title="Responsive Dashboard"
            desc="Clean interface with scan history, predictions, and reports."
          />
          <FeatureCard
            icon={<IconSpark />}
            title="Explainable AI"
            desc="Optional Grad-CAM heatmaps to visualize affected regions."
          />
          <FeatureCard
            icon={<IconDB />}
            title="Secure Storage"
            desc="Scans and reports stored safely using MongoDB."
          />
        </div>

        {/* CTA card */}
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Ready to test a scan?</h3>
              <p className="mt-1 text-sm text-slate-300">
                Upload an MRI image and view AI-generated insights instantly.
              </p>
            </div>
            <Link
              to="/upload"
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 active:scale-[0.99]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- components ---------------- */

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-100">{value}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur transition hover:bg-white/[0.09]">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-black/25">
          {icon}
        </div>
        <div className="text-base font-semibold">{title}</div>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-slate-300">{desc}</div>
    </div>
  );
}

/* ---------------- icons ---------------- */

function ArrowRight({ className = "" }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 12h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="m13 6 6 6-6 6"
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
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 4h7v7H4V4Z" stroke="currentColor" strokeWidth="2" />
      <path d="M13 4h7v7h-7V4Z" stroke="currentColor" strokeWidth="2" />
      <path d="M4 13h7v7H4v-7Z" stroke="currentColor" strokeWidth="2" />
      <path d="M13 13h7v7h-7v-7Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconSpark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconDB() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
