'use client'

import { useRef, useState, type ReactNode, type CSSProperties } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** Border thickness in px (default 1.5) */
  thickness?: number
  /** Border radius — should match the wrapped element */
  radius?: string
}

/* ─────────────────────────────────────────────────────────────
   ShineBorder — wraps content with an animated, traveling
   aurora-gradient border. Implementation uses a conic-gradient
   that we rotate via CSS animation (GPU-friendly). The animated
   layer is masked to a 1.5px ring via the inner solid surface.
   No JS listeners — purely CSS keyframes (cheap & accessible).
   Hover speeds up the rotation for a "charged" feel.
   ───────────────────────────────────────────────────────────── */
export function ShineBorder({
  children,
  className = '',
  thickness = 1.5,
  radius = '1.25rem',
}: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [hover, setHover] = useState(false)

  /* Container holds: animated conic-gradient + masked ring + content.
     The ring is drawn with `padding` and a `background-clip` mask so
     it visually traces the rounded corners of the inner surface. */
  const wrapperStyle: CSSProperties = {
    borderRadius: radius,
    padding: `${thickness}px`,
    background: `conic-gradient(from var(--shine-angle, 0deg),
      rgba(139, 92, 246, 0.95) 0deg,
      rgba(34, 211, 238, 0.95) 120deg,
      rgba(244, 114, 182, 0.85) 200deg,
      rgba(139, 92, 246, 0.95) 360deg
    )`,
    animation: hover
      ? 'shine-spin 3s linear infinite'
      : 'shine-spin 6s linear infinite',
  }

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={wrapperStyle}
      className={`shine-border ${className}`}
    >
      {/* Inner solid surface — masks the animated gradient to a ring */}
      <div
        style={{ borderRadius: `calc(${radius} - ${thickness}px)` }}
        className="bg-background/85 backdrop-blur-md h-full w-full"
      >
        {children}
      </div>
    </div>
  )
}