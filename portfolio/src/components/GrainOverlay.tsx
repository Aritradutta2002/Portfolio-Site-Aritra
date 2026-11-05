import React from 'react';

/**
 * Atmospheric subtle grain overlay (Track B) per Plan.md §5.1.
 * Pure SVG data URI, 3.5% opacity, pointer-events none, 0 network requests.
 */
export function GrainOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[99] opacity-[0.035] dark:opacity-[0.045] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
      aria-hidden="true"
    />
  );
}

export default GrainOverlay;
