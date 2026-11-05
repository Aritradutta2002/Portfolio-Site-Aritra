'use client';

import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { EASINGS, DURATIONS, VIEWPORT_CONFIG } from '@/lib/motion';

export interface RevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  duration?: number;
  className?: string;
}

/**
 * Reveal animation primitive: smooth fade/slide into view when scrolled to.
 * Respects prefers-reduced-motion by switching off translation.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  duration = DURATIONS.reveal,
  className,
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : y,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once,
        margin: VIEWPORT_CONFIG.margin,
      }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : duration,
        delay,
        ease: EASINGS.easeOut,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
