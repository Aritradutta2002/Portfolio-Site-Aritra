'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASINGS } from '@/lib/motion';

/**
 * Route enter transition via template.tsx.
 * Animates opacity and translateY only.
 * Bypassed entirely when prefers-reduced-motion is enabled.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: EASINGS.easeInOut,
      }}
    >
      {children}
    </motion.div>
  );
}
