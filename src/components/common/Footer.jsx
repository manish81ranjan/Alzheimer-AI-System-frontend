// // frontend/src/components/common/Footer.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// /**
//  * Footer
//  * - Minimal, responsive, consistent styling
//  * - Uses Tailwind only
//  */

// export default function Footer() {
//   return (
//     <footer className="border-t border-white/10 bg-slate-950">
//       <div className="mx-auto max-w-6xl px-4 py-10">
//         <div className="grid gap-8 md:grid-cols-3">
//           {/* Brand */}
//           <div>
//             <div className="flex items-center gap-3">
//               <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10">
//                 <span className="text-sm font-semibold">AI</span>
//               </div>
//               <div className="leading-tight">
//                 <div className="text-sm font-semibold tracking-tight text-white">
//                   DEMNET MRI
//                 </div>
//                 <div className="text-[11px] text-slate-400">
//                   Cognitive Disorder Detection
//                 </div>
//               </div>
//             </div>

//             <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
//               Upload MRI scans, get dementia staging predictions, optional
//               explainability heatmaps, and clinical-style auto reports —
//               securely stored with MongoDB.
//             </p>
//           </div>

//           {/* Links */}
//           <div>
//             <div className="text-sm font-semibold text-white">Quick Links</div>
//             <div className="mt-3 grid gap-2 text-sm text-slate-300">
//               <Link className="hover:text-white" to="/">
//                 Home
//               </Link>
//               <Link className="hover:text-white" to="/dashboard">
//                 Dashboard
//               </Link>
//               <Link className="hover:text-white" to="/upload">
//                 Upload Scan
//               </Link>
//               <Link className="hover:text-white" to="/reports">
//                 Reports
//               </Link>
//             </div>
//           </div>

//           {/* Note */}
//           <div>
//             <div className="text-sm font-semibold text-white">Disclaimer</div>
//             <p className="mt-3 text-sm leading-relaxed text-slate-400">
//               This system provides AI-assisted predictions and does not replace
//               professional medical diagnosis. Always consult qualified
//               healthcare providers for clinical decisions.
//             </p>

//             <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
//               Secure • Explainable • Fast
//             </div>
//           </div>
//         </div>

//         <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
//           <div>© {new Date().getFullYear()} DEMNET MRI. All rights reserved.</div>
//           <div className="flex gap-4">
//             <span>Built with React + Three.js</span>
//             <span>Backend: Flask + MongoDB</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

import React, { useEffect, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import * as THREE from "three";

/**
 * Footer (Professional + Three.js background)
 * - Minimal UI (Brand / Links / Disclaimer)
 * - Three.js: soft floating glass spheres (subtle, premium)
 * - Tailwind + Three only
 */

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const { pathname } = useLocation();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950">
      {/* Three.js Background */}
      <ThreeFooterBackground />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur">
                <span className="text-sm font-semibold text-white">AI</span>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight text-white">
                  DEMNET MRI
                </div>
                <div className="text-[11px] text-slate-400">
                  Cognitive Disorder Detection
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              AI-assisted dementia staging from MRI with optional explainability
              and report generation — securely managed through authenticated APIs.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300 backdrop-blur">
              Secure • Explainable • Fast
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-sm font-semibold text-white">Quick Links</div>
            <div className="mt-4 grid gap-2 text-sm">
              <NavLink to="/" active={pathname === "/"}>Home</NavLink>
              <NavLink to="/dashboard" active={pathname === "/dashboard"}>Dashboard</NavLink>
              <NavLink to="/upload" active={pathname === "/upload"}>Upload Scan</NavLink>
              <NavLink to="/reports" active={pathname === "/reports"}>Reports</NavLink>
            </div>
          </div>

          {/* Disclaimer */}
          <div>
            <div className="text-sm font-semibold text-white">Disclaimer</div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              This system provides AI-assisted predictions and does not replace
              professional medical diagnosis. Always consult qualified healthcare
              providers for clinical decisions.
            </p>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-xs text-slate-400 backdrop-blur">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <span className="inline-flex items-center gap-2">
                  <Dot /> React + Vite
                </span>
                <span className="inline-flex items-center gap-2">
                  <Dot /> Flask + MongoDB
                </span>
                <span className="inline-flex items-center gap-2">
                  <Dot /> Three.js UI
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
          <div>© {year} DEMNET MRI. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">Built for research & demo</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-200 transition hover:bg-white/[0.08] hover:text-white"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ----------------- UI helpers ----------------- */

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={[
        "group inline-flex items-center justify-between rounded-2xl border px-3 py-2 transition",
        active
          ? "border-white/20 bg-white/[0.08] text-white"
          : "border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white",
      ].join(" ")}
    >
      <span>{children}</span>
      <span className="opacity-0 transition group-hover:opacity-100">
        <Chevron />
      </span>
    </Link>
  );
}

function Dot() {
  return <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />;
}

function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="m10 7 5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ----------------- Three.js Background ----------------- */

function ThreeFooterBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect reduced motion
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    // scene/camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 10);

    // lights (soft, premium)
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const key = new THREE.DirectionalLight(0x93c5fd, 0.75);
    key.position.set(6, 5, 8);
    scene.add(key);

    const rim = new THREE.PointLight(0x22d3ee, 1.1, 30);
    rim.position.set(-6, -2, 8);
    scene.add(rim);

    // group
    const group = new THREE.Group();
    scene.add(group);

    // glassy material (works without environment map)
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#c7d2fe"), // indigo-ish highlight
      roughness: 0.25,
      metalness: 0.0,
      transmission: 0.92, // glass
      thickness: 1.2,
      ior: 1.35,
      transparent: true,
      opacity: 0.35,
      clearcoat: 1,
      clearcoatRoughness: 0.25,
    });

    // create floating spheres (subtle, not busy)
    const sphereGeo = new THREE.SphereGeometry(0.6, 40, 40);

    const bubbles = [];
    const COUNT = 10;

    // deterministic positions (professional, no chaos)
    for (let i = 0; i < COUNT; i++) {
      const mesh = new THREE.Mesh(sphereGeo, material.clone());
      const t = i / COUNT;

      mesh.position.set(
        -5 + t * 10, // spread X
        (i % 2 === 0 ? 1 : -1) * (0.8 + (i % 3) * 0.35), // gentle Y
        -2 - (i % 4) * 0.8 // depth
      );

      mesh.scale.setScalar(0.75 + (i % 5) * 0.08);
      group.add(mesh);

      bubbles.push({
        mesh,
        baseX: mesh.position.x,
        baseY: mesh.position.y,
        baseZ: mesh.position.z,
        speed: 0.25 + (i % 4) * 0.08,
        phase: i * 0.9,
      });
    }

    // faint particles (very minimal)
    const particlesGeo = new THREE.BufferGeometry();
    const P = 120;
    const pos = new Float32Array(P * 3);
    for (let i = 0; i < P; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = -6 - Math.random() * 6;
    }
    particlesGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xffffff,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });

    const points = new THREE.Points(particlesGeo, particlesMat);
    scene.add(points);

    // sizing
    function resize() {
      const parent = canvas.parentElement;
      const w = parent?.clientWidth || window.innerWidth;
      const h = parent?.clientHeight || 380;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();

    let raf = 0;
    const clock = new THREE.Clock();

    function animate() {
      const t = clock.getElapsedTime();

      // slow camera drift (premium)
      camera.position.x = Math.sin(t * 0.08) * 0.35;
      camera.position.y = Math.cos(t * 0.07) * 0.2;
      camera.lookAt(0, 0, 0);

      // bubble motion (subtle floating)
      for (const b of bubbles) {
        const tt = t * b.speed + b.phase;
        b.mesh.position.y = b.baseY + Math.sin(tt) * 0.22;
        b.mesh.position.x = b.baseX + Math.cos(tt * 0.7) * 0.18;
        b.mesh.rotation.y += 0.002;
        b.mesh.rotation.x += 0.0015;
      }

      // particle drift
      points.rotation.y = t * 0.02;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    }

    if (!reduceMotion) animate();
    else renderer.render(scene, camera);

    // listeners
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // cleanup
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);

      // dispose
      sphereGeo.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();

      group.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose?.();
          obj.material?.dispose?.();
        }
      });

      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      {/* fade mask so animation stays subtle */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/55 to-slate-950" />
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-hidden="true"
      />
    </div>
  );
}
