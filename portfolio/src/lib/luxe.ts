'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ═══════════════════════════════════════════════════════════
   LUXE interaction primitives — fresh system.
   Every hook no-ops on prefers-reduced-motion or coarse pointers.
   ═══════════════════════════════════════════════════════════ */

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])
  return reduced
}

export function luxeDisabled(): boolean {
  if (typeof window === 'undefined') return true
  try {
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches ||
      'ontouchstart' in window
    )
  } catch {
    return true
  }
}

/* ── Spotlight: cursor-tracked gold glow inside a container ── */
export function useSpotlight<T extends HTMLElement = HTMLElement>() {
  const containerRef = useRef<T | null>(null)
  const raf = useRef(0)
  const pending = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || luxeDisabled()) return
    const glow = el.querySelector<HTMLElement>('[data-spotlight]')
    if (!glow) return

    const apply = () => {
      raf.current = 0
      const p = pending.current
      if (!p) return
      pending.current = null
      glow.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`
    }
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      pending.current = { x: e.clientX - r.left, y: e.clientY - r.top }
      if (!raf.current) raf.current = requestAnimationFrame(apply)
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      el.removeEventListener('mousemove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return { containerRef }
}

/* ── Magnetic pull ── */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  strength = 0.25,
  opts?: { maxX?: number; maxY?: number }
) {
  const targetRef = useRef<T | null>(null)
  const raf = useRef(0)
  const pending = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const el = targetRef.current
    if (!el || luxeDisabled()) return
    const s = Math.min(Math.max(strength, 0), 1)
    const mx = opts?.maxX ?? 12
    const my = opts?.maxY ?? 10
    const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v))

    const apply = () => {
      raf.current = 0
      const p = pending.current
      if (!p) return
      pending.current = null
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
    }
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      pending.current = {
        x: clamp((e.clientX - (r.left + r.width / 2)) * s, mx),
        y: clamp((e.clientY - (r.top + r.height / 2)) * s, my),
      }
      if (!raf.current) raf.current = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      if (raf.current) { cancelAnimationFrame(raf.current); raf.current = 0 }
      pending.current = null
      el.style.transform = 'translate3d(0,0,0)'
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave, { passive: true })
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [strength])

  return { targetRef }
}

/* ── Tilt ── */
export function useTilt<T extends HTMLElement = HTMLElement>(maxDeg = 6) {
  const targetRef = useRef<T | null>(null)
  const raf = useRef(0)
  const pending = useRef<{ rx: number; ry: number } | null>(null)

  useEffect(() => {
    const el = targetRef.current
    if (!el || luxeDisabled()) return
    const max = Math.min(Math.max(maxDeg, 0), 14)

    const apply = () => {
      raf.current = 0
      const p = pending.current
      if (!p) return
      pending.current = null
      el.style.transform = `perspective(900px) rotateY(${p.ry}deg) rotateX(${p.rx}deg) translateY(-4px)`
    }
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      pending.current = { ry: nx * max * 2, rx: -ny * max * 2 }
      if (!raf.current) raf.current = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      if (raf.current) { cancelAnimationFrame(raf.current); raf.current = 0 }
      pending.current = null
      el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)'
    }
    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave, { passive: true })
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [maxDeg])

  return { targetRef }
}

/* ── Preloader gate ── */
export const LUXE_DONE_EVENT = 'luxe-ready'
const LUXE_SEEN_KEY = 'luxe-seen-v1'

export function markLuxeSeen() {
  try { sessionStorage.setItem(LUXE_SEEN_KEY, '1') } catch { /* noop */ }
  document.documentElement.dataset.luxe = 'done'
  window.dispatchEvent(new Event(LUXE_DONE_EVENT))
}

export function useLuxeReady(): boolean {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        sessionStorage.getItem(LUXE_SEEN_KEY)
      ) { setReady(true); return }
    } catch { setReady(true); return }
    if (document.documentElement.dataset.luxe === 'done') { setReady(true); return }
    const onDone = () => setReady(true)
    window.addEventListener(LUXE_DONE_EVENT, onDone)
    const fallback = setTimeout(() => setReady(true), 4200)
    return () => { window.removeEventListener(LUXE_DONE_EVENT, onDone); clearTimeout(fallback) }
  }, [])
  return ready
}

/* ── Scroll reveal (IO, no framer dep) ── */
export function useReveal<T extends HTMLElement = HTMLElement>(staggerMs = 80) {
  const containerRef = useRef<T | null>(null)
  useEffect(() => {
    const c = containerRef.current
    if (!c || typeof IntersectionObserver === 'undefined') return
    const items = Array.from(c.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!items.length) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    items.forEach((it, i) => {
      it.style.transitionDelay = reduced ? '0ms' : `${Math.min(i * staggerMs, 600)}ms`
    })
    if (reduced) { items.forEach((it) => it.classList.add('is-visible')); return }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target) }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    items.forEach((it) => io.observe(it))
    return () => io.disconnect()
  }, [staggerMs])
  return { containerRef }
}

/* ── Framer shared variants ── */
export const luxeParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
} as const

export const luxeChild = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
} as const

export function useRunOnce(fn: () => void | (() => void)) {
  const ref = useRef(fn)
  ref.current = fn
  const run = useCallback(() => ref.current(), [])
  useEffect(() => {
    const cleanup = ref.current()
    return cleanup
  }, [run])
  return run
}
