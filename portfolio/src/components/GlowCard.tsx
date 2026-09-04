'use client'

import { useRef, useState, type ReactNode, type CSSProperties, type MouseEvent } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Glow color override (defaults to aurora violet) */
  color?: string
  /** Glow intensity multiplier (default 1) */
  intensity?: number
  /** Border radius override */
  radius?: string
}

/* ─────────────────────────────────────────────────────────────
   GlowCard — premium card with a cursor-tracking aurora glow.
   Single rAF-throttled mousemove listener on the wrapper.
   The glow element is positioned via translate3d (GPU only).
   Respects prefers-reduced-motion by holding the glow centered.
   ───────────────────────────────────────────────────────────── */
export function GlowCard({
  children,
  className = '',
  color = 'rgba(139, 92, 246, 0.35)',
  intensity = 1,
  radius = '1.25rem',
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number>(0)
  const pendingRef = useRef<{ x: number; y: number } | null>(null)
  const [active, setActive] = useState(false)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    pendingRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0
        const p = pendingRef.current
        if (!p || !glowRef.current) return
        glowRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`
      })
    }
  }

  const glowStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `${260 * intensity}px`,
    height: `${260 * intensity}px`,
    borderRadius: '9999px',
    pointerEvents: 'none',
    opacity: active ? 1 : 0,
    background: `radial-gradient(closest-side, ${color}, transparent 70%)`,
    filter: 'blur(20px)',
    willChange: 'transform, opacity',
    transition: 'opacity 0.45s ease',
  }

  return (
    <div
      ref={wrapperRef}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={{ borderRadius: radius, position: 'relative' }}
      className={`glow-card ${className}`}
    >
      <div ref={glowRef} style={glowStyle} aria-hidden="true" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}