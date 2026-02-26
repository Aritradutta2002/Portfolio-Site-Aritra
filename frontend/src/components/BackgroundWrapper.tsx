'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface BackgroundWrapperProps {
  children: ReactNode
  className?: string
}

export function UnifiedBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = !mounted || resolvedTheme === 'dark'

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* ── Base background ── */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ background: isDark ? '#0a0a0a' : '#ffffff' }}
      />

      {/* ── Dot grid pattern (williamlin.io style) ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Top-left teal orb ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '700px', height: '700px',
          top: '-180px', left: '-180px',
          background: isDark
            ? 'radial-gradient(circle at center, rgba(20,184,166,0.20) 0%, rgba(6,182,212,0.12) 40%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(20,184,166,0.12) 0%, rgba(6,182,212,0.07) 40%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Bottom-right indigo/teal orb ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '800px', height: '800px',
          bottom: '-200px', right: '-200px',
          background: isDark
            ? 'radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, rgba(20,184,166,0.10) 40%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(99,102,241,0.08) 0%, rgba(20,184,166,0.05) 40%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Top-right accent orb ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '420px', height: '420px',
          top: '10%', right: '5%',
          background: isDark
            ? 'radial-gradient(circle at center, rgba(6,182,212,0.13) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(6,182,212,0.07) 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
        animate={{ y: [0, -40, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Bottom-left accent orb ── */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '380px', height: '380px',
          bottom: '12%', left: '8%',
          background: isDark
            ? 'radial-gradient(circle at center, rgba(20,184,166,0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(20,184,166,0.06) 0%, transparent 70%)',
          filter: 'blur(65px)',
        }}
        animate={{ y: [0, 35, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export function BackgroundWrapper({ children, className = '' }: BackgroundWrapperProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  )
}
