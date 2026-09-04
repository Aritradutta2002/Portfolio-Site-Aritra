'use client'
import { ReactNode, MouseEventHandler } from 'react'
import { useMagnetic } from '@/lib/luxe'

type BtnProps = {
  children: ReactNode
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  label?: string
  external?: boolean
}

function MagneticShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { targetRef } = useMagnetic<HTMLDivElement>(0.22)
  return (
    <div ref={targetRef} className={`magnetic inline-flex ${className}`}>
      {children}
    </div>
  )
}

export function GoldButton({ children, href, onClick, type = 'button', disabled, className = '', label, external }: BtnProps) {
  const cls = `btn-gold btn-shimmer btn-press magnetic inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[52px] rounded-full font-bold text-[15px] tracking-tight disabled:opacity-50 disabled:cursor-not-allowed ${className}`
  const inner = <span className="inline-flex items-center gap-2.5">{children}</span>
  if (href) {
    return (
      <MagneticShell>
        <a
          href={href}
          onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
          aria-label={label}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={cls}
        >
          {inner}
        </a>
      </MagneticShell>
    )
  }
  return (
    <MagneticShell>
      <button type={type} onClick={onClick as MouseEventHandler<HTMLButtonElement>} disabled={disabled} aria-label={label} className={cls}>
        {inner}
      </button>
    </MagneticShell>
  )
}

export function GhostButton({ children, href, onClick, type = 'button', disabled, className = '', label, external }: BtnProps) {
  const cls = `magnetic btn-press inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[52px] rounded-full border border-line/15 bg-surface/60 backdrop-blur-xl text-ink font-semibold text-[15px] hover:border-gold/50 hover:text-gold transition-colors duration-300 disabled:opacity-50 ${className}`
  const inner = <span className="inline-flex items-center gap-2.5">{children}</span>
  if (href) {
    return (
      <MagneticShell>
        <a
          href={href}
          onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
          aria-label={label}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={cls}
        >
          {inner}
        </a>
      </MagneticShell>
    )
  }
  return (
    <MagneticShell>
      <button type={type} onClick={onClick as MouseEventHandler<HTMLButtonElement>} disabled={disabled} aria-label={label} className={cls}>
        {inner}
      </button>
    </MagneticShell>
  )
}
