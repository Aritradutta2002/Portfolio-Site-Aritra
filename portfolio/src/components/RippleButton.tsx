'use client'

import { useRef, useState, useEffect, type ReactNode, type MouseEvent } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Ripple = {
  id: number
  x: number
  y: number
  size: number
}

/* ─────────────────────────────────────────────────────────────
   RippleButton — premium CTA with:
     • click-ripple (multiple simultaneous)
     • aurora shimmer sweep on hover (CSS-driven ::before)
     • gentle scale spring on press
     • gradient ring that intensifies on hover
   Defaults to <button>; pass `href` to render <a>.
   Respects prefers-reduced-motion automatically.
   ───────────────────────────────────────────────────────────── */

type CommonProps =
  | ({
      children: ReactNode
      variant?: 'aurora' | 'glass'
      className?: string
      /** Disable the magnetic tilt/pull toward cursor */
      noTilt?: boolean
      href?: undefined
    } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'>)
  | ({
      children: ReactNode
      variant?: 'aurora' | 'glass'
      className?: string
      noTilt?: boolean
      href: string
    } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'>)

const base =
  'group/ripple relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm isolate transition-all duration-300 will-change-transform'

const styles = {
  aurora:
    `${base} bg-aurora text-[#0B0616] hover:shadow-aurora-glow hover:ring-1 hover:ring-aurora-2/60`,
  glass:
    `${base} text-ink border border-aurora/40 bg-aurora/5 backdrop-blur-sm hover:border-aurora/70 hover:text-aurorastrong hover:bg-aurora/10 hover:shadow-[0_0_24px_rgba(139,92,246,0.18)]`,
}

let rippleIdCounter = 0

export function RippleButton({
  children,
  variant = 'aurora',
  className = '',
  noTilt,
  ...rest
}: CommonProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [ripples, setRipples] = useState<Ripple[]>([])
  const prefersReducedMotion = useReducedMotion()

  /* Subtle tilt toward pointer — feels alive without being noisy.
     Skipped on touch, reduced-motion, or when noTilt is set. */
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const onPointerMove = (e: MouseEvent<HTMLElement>) => {
    if (noTilt || prefersReducedMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    /* small magnitude so it reads as a lean, not a chase */
    setTilt({ x: px * 4, y: py * 4 })
  }
  const onPointerLeave = () => setTilt({ x: 0, y: 0 })

  const onClick = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 1.2
    const ripple: Ripple = {
      id: ++rippleIdCounter,
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
      size,
    }
    setRipples((prev) => [...prev, ripple])
    /* ripple lifetime — match AnimatePresence below */
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
    }, 750)
  }

  /* Reset ripples on unmount to avoid leak warnings */
  useEffect(() => () => setRipples([]), [])

  const isAnchor = 'href' in rest && rest.href !== undefined
  const sharedProps = {
    className: `${styles[variant]} ${className}`,
    onClick,
    onMouseMove: onPointerMove,
    onMouseLeave: onPointerLeave,
    'data-variant': variant,
  } as const

  /* Aurora shimmer sweep — driven entirely by .ripple-shimmer in globals.css.
     Lives in a pseudo-element so it doesn't block clicks. */
  const inner = (
    <>
      {/* Shimmer sweep */}
      <span
        aria-hidden="true"
        className="ripple-shimmer pointer-events-none absolute inset-0 -z-10"
      />
      {/* Ripples */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 1.6, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute rounded-full"
              style={{
                left: r.x,
                top: r.y,
                width: r.size,
                height: r.size,
                background:
                  variant === 'aurora'
                    ? 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 60%)'
                    : 'radial-gradient(circle, rgba(139,92,246,0.45) 0%, rgba(139,92,246,0) 60%)',
              }}
            />
          ))}
        </AnimatePresence>
      </span>
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </>
  )

  /* tilt transform only when motion is allowed */
  const motionStyle = prefersReducedMotion
    ? undefined
    : {
        transform: `perspective(600px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg) translateZ(0)`,
        transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      }

  if (isAnchor) {
    const aRest = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        {...sharedProps}
        {...aRest}
        ref={ref as React.Ref<HTMLAnchorElement>}
        style={{ ...motionStyle, ...(aRest.style ?? {}) }}
      >
        {inner}
      </a>
    )
  }

  const bRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button
      {...sharedProps}
      {...bRest}
      ref={ref as React.Ref<HTMLButtonElement>}
      style={{ ...motionStyle, ...(bRest.style ?? {}) }}
    >
      {inner}
    </button>
  )
}