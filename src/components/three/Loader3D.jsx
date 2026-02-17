import React from "react";
import { Html } from "@react-three/drei";

/**
 * Loader3D
 * - Minimal, premium loading UI for Three.js scenes
 * - Non-distracting (no spinners, no flashing)
 * - Matches dark SaaS + AI aesthetic
 *
 * Usage:
 *   <Suspense fallback={<Loader3D />} />
 */

export default function Loader3D({ label = "Loading 3D Scene…" }) {
  return (
    <Html center>
      <div className="select-none rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-3 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,.55)]">
        <div className="flex items-center gap-3">
          {/* soft pulse dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>

          <span className="text-sm font-medium text-slate-200">
            {label}
          </span>
        </div>
      </div>
    </Html>
  );
}
