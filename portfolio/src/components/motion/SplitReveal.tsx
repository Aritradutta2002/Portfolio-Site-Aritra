'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASINGS, VIEWPORT_CONFIG } from '@/lib/motion';

export interface SplitRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  by?: 'words' | 'lines';
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  className?: string;
}

/**
 * Masked text reveal: words or lines slide up from below an overflow-hidden boundary.
 * Accessible to screen readers via aria-label on the container and aria-hidden on split tokens.
 */
export function SplitReveal({
  text,
  as: Tag = 'h2',
  by = 'words',
  delay = 0,
  staggerDelay = 0.04,
  once = true,
  className = '',
}: SplitRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const tokens = by === 'words' ? text.split(' ') : text.split('\n');

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap gap-x-[0.25em]">
        {tokens.map((token, index) => (
          <span key={index} className="inline-block overflow-hidden align-top">
            <motion.span
              className="inline-block"
              initial={{ y: '105%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{
                once,
                margin: VIEWPORT_CONFIG.margin,
              }}
              transition={{
                duration: 0.75,
                delay: delay + index * staggerDelay,
                ease: EASINGS.easeOut,
              }}
            >
              {token}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
