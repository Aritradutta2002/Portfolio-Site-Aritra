'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';
import { useInViewPause } from '@/hooks/useInViewPause';
import { useLowPower } from '@/hooks/useLowPower';

export interface AnimatedRaysProps {
  className?: string;
}

/**
 * Animated Rays hero background from @vengeanceui.
 * Refactored with:
 * - Central dark radial vignette mask (resolves HR-4 contrast)
 * - useInViewPause to suspend execution when offscreen
 * - Low-power detection (downgrades to static background on low-spec/data-saver devices)
 * - Static CSS gradient fallback on mobile (<768px) and reduced-motion
 */
export function AnimatedRays({ className }: AnimatedRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewPause(containerRef);
  const isLowPower = useLowPower();

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden select-none', className)}
      aria-hidden="true"
    >
      {/* 1. Underlying animated gradient rays */}
      <div
        className={cn(
          'absolute inset-0 opacity-40 dark:opacity-30 transition-opacity duration-700',
          isInView && !isLowPower ? 'animate-aurora-bg' : ''
        )}
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              105deg,
              rgba(139, 92, 246, 0.15) 0%,
              rgba(139, 92, 246, 0.15) 8%,
              transparent 12%,
              rgba(34, 211, 238, 0.15) 16%,
              rgba(244, 114, 182, 0.15) 24%,
              transparent 30%
            )
          `,
          backgroundSize: '250% 200%',
          filter: 'blur(32px)',
        }}
      />

      {/* 2. Central Dark Radial Vignette Mask (HR-4 Contrast Guarantee) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at 50% 38%,
              rgba(5, 5, 8, 0.94) 15%,
              rgba(5, 5, 8, 0.82) 45%,
              rgba(5, 5, 8, 0.4) 80%,
              transparent 100%
            )
          `,
        }}
      />

      {/* 3. Subtle directional gradient light */}
      <div
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none opacity-20 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(34,211,238,0.15) 50%, transparent 80%)',
        }}
      />
    </div>
  );
}

export default AnimatedRays;
