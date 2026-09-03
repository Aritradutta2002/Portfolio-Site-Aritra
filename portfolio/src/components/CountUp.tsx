'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

type Props = {
  to: number
  suffix?: string
  duration?: number
  className?: string
}

/* Animated number counter — eases from 0 to `to` when scrolled into
   view (rAF, ease-out cubic, transform-free text swap so no layout
   cost beyond the glyph change). Renders the final value instantly
   under prefers-reduced-motion; SSR-safe initial "0". */
export function CountUp({ to, suffix = '', duration = 1.4, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${to}${suffix}`
      return
    }

    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      el.textContent = `${Math.round(to * eased)}${suffix}`
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, suffix, duration])

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  )
}
