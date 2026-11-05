'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { usePointerFine } from '@/hooks/usePointerFine';

type CursorState = 'default' | 'link' | 'view' | 'hidden';

export function Cursor() {
  const isFinePointer = usePointerFine();
  const shouldReduceMotion = useReducedMotion();
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for the outer ring
  const springX = useSpring(mouseX, { stiffness: 450, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 30, mass: 0.5 });

  useEffect(() => {
    if (!isFinePointer || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Keep native cursor for text fields and inputs
      const isInput = target.closest('input, textarea, select, [contenteditable="true"]');
      if (isInput) {
        setCursorState('hidden');
        return;
      }

      // View state for media / case studies
      const isView = target.closest('[data-cursor="view"], .cursor-view');
      if (isView) {
        setCursorState('view');
        return;
      }

      // Link / button state
      const isLink = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]');
      if (isLink) {
        setCursorState('link');
        return;
      }

      setCursorState('default');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setCursorState('hidden');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isFinePointer, shouldReduceMotion, isVisible, mouseX, mouseY]);

  // Never render on touch, non-fine pointers, or under reduced motion
  if (!isFinePointer || shouldReduceMotion || !isVisible) {
    return null;
  }

  const ringVariants = {
    default: {
      width: 28,
      height: 28,
      borderColor: 'rgba(139, 92, 246, 0.45)',
      backgroundColor: 'rgba(139, 92, 246, 0.05)',
      scale: 1,
      opacity: 1,
    },
    link: {
      width: 44,
      height: 44,
      borderColor: 'rgba(34, 211, 238, 0.8)',
      backgroundColor: 'rgba(34, 211, 238, 0.12)',
      scale: 1.15,
      opacity: 1,
    },
    view: {
      width: 60,
      height: 60,
      borderColor: 'rgba(244, 114, 182, 0.85)',
      backgroundColor: 'rgba(244, 114, 182, 0.18)',
      scale: 1.25,
      opacity: 1,
    },
    hidden: {
      scale: 0,
      opacity: 0,
    },
  };

  const dotVariants = {
    default: {
      scale: 1,
      opacity: 1,
    },
    link: {
      scale: 0.6,
      opacity: 0.8,
    },
    view: {
      scale: 0,
      opacity: 0,
    },
    hidden: {
      scale: 0,
      opacity: 0,
    },
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" aria-hidden="true">
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-solid flex items-center justify-center backdrop-blur-[0.5px]"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={ringVariants}
        animate={cursorState}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {cursorState === 'view' && (
          <span className="font-mono text-[9px] uppercase tracking-wider text-pink-300 font-bold select-none">
            View
          </span>
        )}
      </motion.div>

      {/* Center Precise Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-violet-400"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        variants={dotVariants}
        animate={cursorState}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </div>
  );
}

export default Cursor;
