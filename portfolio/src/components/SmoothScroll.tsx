'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import type Lenis from 'lenis'

/* The datasheet (`/`) runs its own Lenis instance (see zro/DatasheetScroll)
   that is wired into its anchor links, scroll lock and reduced-motion
   handling, so this global one must stay off it. The OS owns a fixed viewport
   and does not benefit from smooth scroll at all. */
const NATIVE_SCROLL_ROUTES = new Set(['/', '/desktop'])

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()
  const disabled = NATIVE_SCROLL_ROUTES.has(pathname ?? '')

  useEffect(() => {
    if (disabled) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    let cancelled = false
    let frame = 0

    /* Loaded on demand so the library never enters the initial bundle of
       routes that do not use smooth scrolling. */
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      })

      lenisRef.current = lenis

      function raf(time: number) {
        lenis.raf(time)
        frame = requestAnimationFrame(raf)
      }

      frame = requestAnimationFrame(raf)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [disabled])

  return <>{children}</>
}
