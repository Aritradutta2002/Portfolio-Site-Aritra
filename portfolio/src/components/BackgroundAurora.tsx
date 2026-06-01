'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

/**
 * Single, performant background:
 *  - Animated aurora gradient orbs
 *  - Subtle dotted grid
 *  - Vignette
 *  - Soft scroll-driven parallax
 */
export function BackgroundAurora() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = !mounted || resolvedTheme === 'dark'
  const { scrollYProgress } = useScroll()
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      {/* Base */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ background: isDark ? '#050507' : '#fafafa' }}
      />

      {/* Dotted grid */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle, hsl(0 0% 100% / 0.04) 1px, transparent 1px)'
            : 'radial-gradient(circle, hsl(240 10% 30% / 0.08) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)',
        }}
      />

      {/* Aurora orbs */}
      <motion.div
        style={{ y: y1 }}
        className="absolute rounded-full"
        animate={{ scale: [1, 1.12, 1], opacity: [0.32, 0.55, 0.32] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="w-[60vw] h-[60vw] max-w-[900px] max-h-[900px]"
          style={{
            background: isDark
              ? 'radial-gradient(circle, hsl(262 83% 58% / 0.22) 0%, transparent 65%)'
              : 'radial-gradient(circle, hsl(262 83% 70% / 0.18) 0%, transparent 65%)',
            filter: 'blur(60px)',
            transform: 'translate(-30%, -25%)',
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: y2 }}
        className="absolute rounded-full"
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.32, 0.5, 0.32] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="w-[65vw] h-[65vw] max-w-[1000px] max-h-[1000px]"
          style={{
            background: isDark
              ? 'radial-gradient(circle, hsl(189 94% 50% / 0.18) 0%, transparent 65%)'
              : 'radial-gradient(circle, hsl(189 90% 55% / 0.16) 0%, transparent 65%)',
            filter: 'blur(70px)',
            transform: 'translate(40%, 35%)',
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: y3 }}
        className="absolute rounded-full"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="w-[45vw] h-[45vw] max-w-[700px] max-h-[700px]"
          style={{
            background: isDark
              ? 'radial-gradient(circle, hsl(330 81% 60% / 0.14) 0%, transparent 70%)'
              : 'radial-gradient(circle, hsl(330 81% 65% / 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: 'translate(60%, -40%)',
          }}
        />
      </motion.div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.12] transition-opacity duration-700"
        style={{
          backgroundImage:
            'linear-gradient(hsl(0 0% 100% / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.05) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, black 0%, transparent 70%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)'
            : 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.06) 100%)',
        }}
      />

      {/* Scanline */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(189 94% 50% / 0.6), transparent)',
        }}
        animate={{ y: ['-10vh', '110vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}
