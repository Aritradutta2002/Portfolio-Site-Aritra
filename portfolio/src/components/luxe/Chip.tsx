'use client'
import { ReactNode } from 'react'

export function Chip({ children, gold, className = '' }: { children: ReactNode; gold?: boolean; className?: string }) {
  if (gold) {
    return (
      <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold text-gold-ink font-mono text-xs font-bold tracking-wide ${className}`}>
        {children}
      </span>
    )
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-line/12 text-ink/75 font-mono text-xs hover:border-gold/50 hover:text-gold transition-colors duration-300 ${className}`}>
      {children}
    </span>
  )
}

export function Dots({ level, max = 5, label }: { level: number; max?: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5" role="img" aria-label={`${label}: ${level} out of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`dot ${i < level ? 'on' : ''}`} aria-hidden="true" />
      ))}
    </span>
  )
}
