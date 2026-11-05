'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface FlipTextProps {
  words: string[];
  interval?: number;
  className?: string;
}

/**
 * Accessible rotating phrase primitive with fixed-height wrapper to guarantee zero CLS.
 * Under prefers-reduced-motion, immediately displays first word with no transition.
 */
export function FlipText({
  words,
  interval = 3500,
  className,
}: FlipTextProps) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || words.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span
      className={cn(
        'relative inline-flex items-center overflow-hidden h-[1.35em] align-middle select-none',
        className
      )}
      aria-label={words[index]}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default FlipText;
