'use client';

import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { EASINGS, VIEWPORT_CONFIG } from '@/lib/motion';

export interface StaggerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  className?: string;
}

export function Stagger({
  children,
  staggerDelay = 0.07,
  delayChildren = 0,
  once = true,
  className,
  ...props
}: StaggerProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : Math.min(staggerDelay, 0.08),
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{
        once,
        margin: VIEWPORT_CONFIG.margin,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  y?: number;
  className?: string;
}

export function StaggerItem({
  children,
  y = 16,
  className,
  ...props
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : y,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.45,
        ease: EASINGS.easeOut,
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
}
