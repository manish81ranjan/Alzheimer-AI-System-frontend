import React from "react";

/**
 * Lights.jsx
 * - Centralized lighting setup for BrainCanvas
 * - Cinematic + soft (no harsh dots)
 * - Tuned for Saturn + bubbles background
 *
 * Usage inside <Canvas>:
 *   <Lights />
 */

export default function Lights() {
  return (
    <>
      {/* Base ambient light (keeps scene readable) */}
      <ambientLight intensity={0.32} />

      {/* Main key light (top-right) */}
      <directionalLight
        position={[6, 6, 4]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
      />

      {/* Rim / edge light (adds highlight contour) */}
      <directionalLight
        position={[-6, 1, -2]}
        intensity={0.55}
        color="#e0f2fe"
      />

      {/* Soft fill light (prevents black areas) */}
      <pointLight
        position={[0, -2, 5]}
        intensity={0.35}
        color="#ffffff"
      />

      {/* Very subtle cyan accent (luxury glow) */}
      <pointLight
        position={[2, 1, -3]}
        intensity={0.25}
        color="#22d3ee"
      />
    </>
  );
}
