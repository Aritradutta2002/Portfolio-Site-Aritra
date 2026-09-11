'use client'

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Adds the aurora hover glow transition */
  hover?: boolean
}

/* Shared glassmorphic card — gradient hairline border (masked
   ::before), backdrop blur, inner top highlight, optional aurora
   hover glow. Visuals live in .glass-card / .glass-hover in
   globals.css so they stay themable in one place. */
export function GlassCard({ children, className = '', hover = false }: Props) {
  return (
    <div className={`glass-card ${hover ? 'glass-hover' : ''} ${className}`}>
      {/* z-10 so content sits above the ::before/::after decoration */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
