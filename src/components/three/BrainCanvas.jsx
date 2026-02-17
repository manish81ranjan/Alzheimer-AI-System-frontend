// // // frontend/src/components/three/BrainCanvas.jsx
// // import React, { Suspense, useMemo } from "react";
// // import { Canvas } from "@react-three/fiber";
// // import { OrbitControls, Environment, Float, Html } from "@react-three/drei";

// // /**
// //  * BrainCanvas
// //  * - Drop-in 3D hero background for Home page
// //  * - No external model required yet (uses procedural geometry)
// //  * - Later you can replace the "BrainBlob" with a GLB model from src/assets/models
// //  */

// // function Loader3D() {
// //   return (
// //     <Html center>
// //       <div className="select-none rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur">
// //         Loading 3D...
// //       </div>
// //     </Html>
// //   );
// // }

// // function BrainBlob() {
// //   // A soft "brain-like" blob made with an icosahedron and phong material
// //   // This avoids needing a .glb model on day-1.
// //   const args = useMemo(() => [1.35, 3], []);
// //   return (
// //     <Float speed={1.25} rotationIntensity={0.6} floatIntensity={0.9}>
// //       <mesh castShadow receiveShadow>
// //         <icosahedronGeometry args={args} />
// //         <meshStandardMaterial
// //           metalness={0.35}
// //           roughness={0.25}
// //           envMapIntensity={1.2}
// //         />
// //       </mesh>

// //       {/* subtle halo ring */}
// //       <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.9}>
// //         <torusGeometry args={[1.15, 0.02, 8, 120]} />
// //         <meshStandardMaterial metalness={0.2} roughness={0.5} />
// //       </mesh>
// //     </Float>
// //   );
// // }

// // export default function BrainCanvas({
// //   className = "",
// //   enableControls = false,
// // }) {
// //   return (
// //     <div className={`relative h-full w-full ${className}`}>
// //       <Canvas
// //         shadows
// //         camera={{ position: [0, 0.3, 3.7], fov: 45 }}
// //         dpr={[1, 2]}
// //       >
// //         {/* Lighting */}
// //         <ambientLight intensity={0.4} />
// //         <directionalLight
// //           position={[3, 4, 2]}
// //           intensity={1.2}
// //           castShadow
// //           shadow-mapSize-width={1024}
// //           shadow-mapSize-height={1024}
// //         />
// //         <pointLight position={[-3, -2, 3]} intensity={0.7} />

// //         {/* Environment adds nice reflections */}
// //         <Suspense fallback={<Loader3D />}>
// //           <Environment preset="city" />
// //           <BrainBlob />
// //         </Suspense>

// //         {/* Optional controls (disable for hero background) */}
// //         {enableControls ? (
// //           <OrbitControls
// //             enablePan={false}
// //             enableZoom={false}
// //             minPolarAngle={Math.PI / 2.4}
// //             maxPolarAngle={Math.PI / 1.8}
// //           />
// //         ) : null}
// //       </Canvas>

// //       {/* Overlay gradient for readability */}
// //       <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
// //     </div>
// //   );
// // }

// // frontend/src/components/three/BrainCanvas.jsx
// import React, { Suspense, useMemo } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment, Float, Html } from "@react-three/drei";

// function Loader3D() {
//   return (
//     <Html center>
//       <div className="select-none rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur">
//         Loading 3D...
//       </div>
//     </Html>
//   );
// }

// function BrainBlob() {
//   const args = useMemo(() => [1.0, 3], []); // smaller geometry

//   return (
//     <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.7}>
//       {/* Move blob to the right and a bit behind */}
//       <group position={[1.35, 0.05, -0.2]} scale={1.0}>
//         <mesh castShadow receiveShadow>
//           <icosahedronGeometry args={args} />
//           <meshStandardMaterial metalness={0.25} roughness={0.35} envMapIntensity={1.0} />
//         </mesh>

//         {/* subtle halo ring */}
//         <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.7}>
//           <torusGeometry args={[0.95, 0.02, 10, 140]} />
//           <meshStandardMaterial metalness={0.15} roughness={0.6} />
//         </mesh>
//       </group>
//     </Float>
//   );
// }

// export default function BrainCanvas({ className = "", enableControls = false }) {
//   return (
//     <div className={`relative h-full w-full ${className}`}>
//       <Canvas
//         shadows
//         camera={{ position: [0, 0.2, 5.2], fov: 45 }}   // pulled camera back
//         dpr={[1, 2]}
//       >
//         <ambientLight intensity={0.45} />
//         <directionalLight
//           position={[4, 5, 3]}
//           intensity={1.1}
//           castShadow
//           shadow-mapSize-width={1024}
//           shadow-mapSize-height={1024}
//         />
//         <pointLight position={[-3, -2, 4]} intensity={0.6} />

//         <Suspense fallback={<Loader3D />}>
//           <Environment preset="city" />
//           <BrainBlob />
//         </Suspense>

//         {enableControls ? (
//           <OrbitControls
//             enablePan={false}
//             enableZoom={false}
//             minPolarAngle={Math.PI / 2.5}
//             maxPolarAngle={Math.PI / 1.7}
//           />
//         ) : null}
//       </Canvas>

//       {/* Dark overlay so text stays readable */}
//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/70" />
//     </div>
//   );
// }

// // frontend/src/components/three/BrainCanvas.jsx
// import React, { Suspense, useMemo, useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Environment, Float, Html, Stars } from "@react-three/drei";
// import * as THREE from "three";

// function Loader3D() {
//   return (
//     <Html center>
//       <div className="select-none rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur">
//         Loading 3D...
//       </div>
//     </Html>
//   );
// }

// /* ---------- Saturn Ring Geometry ---------- */
// function Ring({ inner = 1.25, outer = 2.05 }) {
//   const geom = useMemo(() => {
//     const geometry = new THREE.RingGeometry(inner, outer, 128, 2);
//     geometry.rotateX(Math.PI / 2);
//     return geometry;
//   }, [inner, outer]);

//   return (
//     <mesh geometry={geom} rotation={[0.35, 0.2, 0.08]}>
//       <meshStandardMaterial
//         color="#ffffff"
//         transparent
//         opacity={0.25}
//         roughness={0.6}
//         metalness={0.1}
//         emissive="#7dd3fc"
//         emissiveIntensity={0.12}
//         side={THREE.DoubleSide}
//       />
//     </mesh>
//   );
// }

// /* ---------- Saturn Planet ---------- */
// function SaturnPlanet() {
//   const group = useRef();

//   useFrame((state, delta) => {
//     if (!group.current) return;
//     group.current.rotation.y += delta * 0.18;
//     group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.05;
//   });

//   return (
//     <group ref={group} position={[1.55, 0.1, -0.25]} scale={1.2}>
//       {/* Planet */}
//       <mesh castShadow receiveShadow>
//         <sphereGeometry args={[1, 128, 128]} />
//         <meshPhysicalMaterial
//           color="#e5e7eb"
//           roughness={0.25}
//           metalness={0.08}
//           clearcoat={0.85}
//           clearcoatRoughness={0.25}
//           sheen={1}
//           sheenRoughness={0.55}
//           sheenColor="#a5f3fc"
//           envMapIntensity={1.1}
//         />
//       </mesh>

//       {/* Rings */}
//       <Ring inner={1.2} outer={2.05} />
//       <Ring inner={1.35} outer={2.2} />

//       {/* Soft glow aura */}
//       <mesh scale={1.18}>
//         <sphereGeometry args={[1, 64, 64]} />
//         <meshStandardMaterial
//           color="#22d3ee"
//           transparent
//           opacity={0.06}
//           emissive="#22d3ee"
//           emissiveIntensity={0.35}
//         />
//       </mesh>
//     </group>
//   );
// }

// function Scene() {
//   return (
//     <>
//       {/* Background stars (cinematic) */}
//       <Stars radius={70} depth={40} count={1500} factor={3} fade speed={0.7} />

//       {/* Lights (premium look) */}
//       <ambientLight intensity={0.35} />

//       {/* Main key light */}
//       <directionalLight
//         position={[6, 6, 4]}
//         intensity={1.25}
//         castShadow
//         shadow-mapSize-width={1024}
//         shadow-mapSize-height={1024}
//       />

//       {/* Rim light for edge glow */}
//       <directionalLight position={[-6, 1, -2]} intensity={0.65} />

//       {/* Slight fill */}
//       <pointLight position={[0, -2, 5]} intensity={0.4} />

//       <Suspense fallback={<Loader3D />}>
//         <Environment preset="city" />
//         <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.5}>
//           <SaturnPlanet />
//         </Float>
//       </Suspense>
//     </>
//   );
// }

// /* ---------- Main Canvas ---------- */
// export default function BrainCanvas({ className = "" }) {
//   return (
//     <div className={`relative h-full w-full ${className}`}>
//       <Canvas
//         shadows
//         dpr={[1, 2]}
//         camera={{ position: [0, 0.15, 6.2], fov: 45 }}
//         gl={{ antialias: true, alpha: true }}
//       >
//         <Scene />
//       </Canvas>

//       {/* readability overlay (keep your text clean) */}
//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75" />
//       <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_10%_10%,rgba(99,102,241,.18),transparent_65%),radial-gradient(900px_500px_at_90%_40%,rgba(34,211,238,.12),transparent_65%)]" />
//     </div>
//   );
// }

// frontend/src/components/three/BrainCanvas.jsx
import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, Stars } from "@react-three/drei";
import * as THREE from "three";

function Loader3D() {
  return (
    <Html center>
      <div className="select-none rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur">
        Loading 3D...
      </div>
    </Html>
  );
}

/* ---------- Floating bubbles (background) ---------- */
function Bubbles({ count = 18 }) {
  const group = useRef();

  const bubbles = useMemo(() => {
    // place bubbles mostly behind + around right side
    return Array.from({ length: count }).map((_, i) => {
      const x = 0.3 + Math.random() * 4.2; // more on right
      const y = (Math.random() - 0.5) * 2.6;
      const z = -1.8 - Math.random() * 6.0; // behind
      const s = 0.12 + Math.random() * 0.45; // small to medium
      const speed = 0.06 + Math.random() * 0.14;
      const drift = 0.08 + Math.random() * 0.18;
      const phase = Math.random() * Math.PI * 2;

      return { id: i, x, y, z, s, speed, drift, phase };
    });
  }, [count]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    // very subtle group drift
    group.current.rotation.y = Math.sin(t * 0.06) * 0.04;

    // animate individual bubbles
    group.current.children.forEach((child, idx) => {
      const b = bubbles[idx];
      if (!b) return;

      // float up/down + slow drift sideways
      child.position.y = b.y + Math.sin(t * b.speed + b.phase) * 0.28;
      child.position.x = b.x + Math.cos(t * b.drift + b.phase) * 0.18;

      // slow spin (tiny)
      child.rotation.y += delta * 0.05;
      child.rotation.x += delta * 0.03;
    });
  });

  return (
    <group ref={group}>
      {bubbles.map((b) => (
        <mesh key={b.id} position={[b.x, b.y, b.z]} scale={b.s}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.12}
            metalness={0.0}
            transmission={1} // glassy bubble
            thickness={0.6}
            ior={1.2}
            transparent
            opacity={0.35}
            clearcoat={1}
            clearcoatRoughness={0.2}
            emissive="#22d3ee"
            emissiveIntensity={0.06} // very soft glow
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Saturn Ring Geometry ---------- */
function Ring({ inner = 1.25, outer = 2.05 }) {
  const geom = useMemo(() => {
    const geometry = new THREE.RingGeometry(inner, outer, 128, 2);
    geometry.rotateX(Math.PI / 2);
    return geometry;
  }, [inner, outer]);

  return (
    <mesh geometry={geom} rotation={[0.35, 0.2, 0.08]}>
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.22}
        roughness={0.65}
        metalness={0.08}
        emissive="#7dd3fc"
        emissiveIntensity={0.09}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ---------- Saturn Planet ---------- */
function SaturnPlanet() {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.05;
  });

  return (
    <group ref={group} position={[1.55, 0.1, -0.25]} scale={1.2}>
      {/* Planet */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhysicalMaterial
          color="#e5e7eb"
          roughness={0.25}
          metalness={0.08}
          clearcoat={0.85}
          clearcoatRoughness={0.25}
          sheen={1}
          sheenRoughness={0.55}
          sheenColor="#a5f3fc"
          envMapIntensity={1.1}
        />
      </mesh>

      {/* Rings */}
      <Ring inner={1.2} outer={2.05} />
      <Ring inner={1.35} outer={2.2} />

      {/* Soft glow aura */}
      <mesh scale={1.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#22d3ee"
          transparent
          opacity={0.05}
          emissive="#22d3ee"
          emissiveIntensity={0.28}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      {/* Background stars (softened) */}
      <Stars radius={70} depth={40} count={900} factor={2.6} fade speed={0.55} />

      {/* Floating bubbles behind Saturn */}
      <Bubbles count={18} />

      {/* Lights (premium look) */}
      <ambientLight intensity={0.33} />

      <directionalLight
        position={[6, 6, 4]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <directionalLight position={[-6, 1, -2]} intensity={0.55} />
      <pointLight position={[0, -2, 5]} intensity={0.35} />

      <Suspense fallback={<Loader3D />}>
        <Environment preset="city" />
        <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.5}>
          <SaturnPlanet />
        </Float>
      </Suspense>
    </>
  );
}

/* ---------- Main Canvas ---------- */
export default function BrainCanvas({ className = "" }) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.15, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>

      {/* readability overlay (keep your text clean) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/75" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_10%_10%,rgba(99,102,241,.18),transparent_65%),radial-gradient(900px_500px_at_90%_40%,rgba(34,211,238,.12),transparent_65%)]" />
    </div>
  );
}
