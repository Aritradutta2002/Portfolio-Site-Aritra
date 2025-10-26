'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BackgroundWrapperProps {
  children: ReactNode
  className?: string
}

export function UnifiedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-gray-300/80 to-slate-400/70 dark:from-black dark:via-gray-950/90 dark:to-black"></div>
      
      {/* Subtle dot grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
      
      {/* Large primary orb - Top Right */}
      <motion.div
        className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.18) 0%, rgba(168, 85, 247, 0.12) 30%, rgba(236, 72, 153, 0.08) 60%, transparent 100%)',
          filter: 'blur(80px)'
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, 60, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Large secondary orb - Bottom Left */}
      <motion.div
        className="absolute -bottom-48 -left-48 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.16) 0%, rgba(236, 72, 153, 0.12) 30%, rgba(99, 102, 241, 0.08) 60%, transparent 100%)',
          filter: 'blur(90px)'
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.5, 0.3, 0.5],
          x: [0, -40, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Medium accent orb - Top Left */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-[450px] h-[450px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.14) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)',
          filter: 'blur(60px)'
        }}
        animate={{
          y: [0, -50, 0],
          x: [0, 40, 0],
          opacity: [0.25, 0.45, 0.25],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Medium accent orb - Bottom Right */}
      <motion.div
        className="absolute bottom-1/4 right-1/6 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.08) 50%, transparent 100%)',
          filter: 'blur(70px)'
        }}
        animate={{
          y: [0, 50, 0],
          x: [0, -35, 0],
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Small floating orb - Center */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[350px] h-[350px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(236, 72, 153, 0.12) 0%, rgba(168, 85, 247, 0.08) 50%, transparent 100%)',
          filter: 'blur(50px)',
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.35, 0.15],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Additional accent orbs for depth */}
      <motion.div
        className="absolute top-3/4 left-1/3 w-[280px] h-[280px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          filter: 'blur(45px)'
        }}
        animate={{
          y: [0, -30, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-1/3 right-1/4 w-[320px] h-[320px] rounded-full"
        style={{
          background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.08) 0%, transparent 70%)',
          filter: 'blur(55px)'
        }}
        animate={{
          x: [0, 40, 0],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Subtle overlay for cohesion */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/25 to-transparent dark:via-black/30"></div>
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
