import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/**
 * Controls.jsx
 * - Adds OrbitControls (optional) to your R3F Canvas
 * - Use enableControls={true} when you want mouse drag control
 * - Keeps it "hero safe" by default (no zoom/pan)
 *
 * Usage inside Canvas:
 *   <Controls enabled={enableControls} />
 */

export default function Controls({
  enabled = false,
  autoRotate = false,
  autoRotateSpeed = 0.6,
  enableZoom = false,
  enablePan = false,
  minPolarAngle = Math.PI / 2.6,
  maxPolarAngle = Math.PI / 1.7,
}) {
  const ref = useRef();

  // Smoothly apply autoRotate only when enabled (avoids jitter)
  useFrame(() => {
    if (!ref.current) return;
    ref.current.autoRotate = Boolean(enabled && autoRotate);
    ref.current.autoRotateSpeed = autoRotateSpeed;
    ref.current.enabled = Boolean(enabled);
  });

  const limits = useMemo(
    () => ({
      minPolarAngle,
      maxPolarAngle,
    }),
    [minPolarAngle, maxPolarAngle]
  );

  return (
    <OrbitControls
      ref={ref}
      enabled={enabled}
      enableZoom={enableZoom}
      enablePan={enablePan}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.55}
      zoomSpeed={0.8}
      {...limits}
    />
  );
}
