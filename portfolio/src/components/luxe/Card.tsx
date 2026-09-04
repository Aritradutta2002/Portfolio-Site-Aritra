'use client'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useSpotlight, useTilt } from '@/lib/luxe'

export function LuxeCard({ children, className = '', tilt = false, spotlight = false, delay = 0 }: {
  children: ReactNode; className?: string; tilt?: boolean; spotlight?: boolean; delay?: number
}) {
  const spot = useSpotlight<HTMLDivElement>()
  const tiltHook = useTilt<HTMLDivElement>(6)
  // Only attach one ref — tilt takes precedence for transform ownership
  const ref = tilt ? tiltHook.targetRef : spot.containerRef
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-64px' }}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <div ref={ref as any} data-tilt={tilt || undefined} className={`luxe-card luxe-lift spotlight-wrap overflow-hidden ${className}`}>
        {spotlight ? <div data-spotlight className="spotlight-glow" aria-hidden="true" /> : null}
        <div className="relative z-[1]">{children}</div>
      </div>
    </motion.div>
  )
}
