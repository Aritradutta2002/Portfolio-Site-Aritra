'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────
   Shared interaction guards — single source of truth.
   All three hooks no-op when prefers-reduced-motion is set or
   on touch/coarse-pointer devices. No per-component duplication.
   ───────────────────────────────────────────────────────────── */

export function usePrefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function')
    return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isCoarsePointer(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function')
    return false
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches ||
    'ontouchstart' in window
  )
}

function interactionsDisabled(): boolean {
  return (
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(hover: none)').matches ||
    'ontouchstart' in window
  )
}

/* ─────────────────────────────────────────────────────────────
   a) useSpotlight — cursor-tracked radial glow.
   Attaches ONE mousemove listener to the container, tracks cursor
   relative to bounding rect, and moves the glow child via
   translate3d (compositor only, no layout reflow). rAF-throttled.
   Usage:
     const { containerRef } = useSpotlight()
     <section ref={containerRef} className="spotlight-container">
       <div className="spotlight-glow" aria-hidden />
   The glow element is found via [data-spotlight] inside container.
   ───────────────────────────────────────────────────────────── */
export function useSpotlight<T extends HTMLElement = HTMLElement>() {
  const containerRef = useRef<T | null>(null)
  const rafRef = useRef<number>(0)
  const pendingRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || interactionsDisabled()) return

    const glow = container.querySelector<HTMLElement>('[data-spotlight]')
    if (!glow) return

    const apply = () => {
      rafRef.current = 0
      const pending = pendingRef.current
      if (!pending) return
      pendingRef.current = null
      // translate3d = GPU-composited, zero layout reflow
      glow.style.transform = `translate3d(${pending.x}px, ${pending.y}px, 0) translate(-50%, -50%)`
    }

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      pendingRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      // Park the glow off-screen so it fades via CSS opacity transition
      glow.style.opacity = '0'
    }
    const onEnter = () => {
      glow.style.opacity = '1'
    }

    container.addEventListener('mousemove', onMove, { passive: true })
    container.addEventListener('mouseleave', onLeave, { passive: true })
    container.addEventListener('mouseenter', onEnter, { passive: true })
    return () => {
      container.removeEventListener('mousemove', onMove)
      container.removeEventListener('mouseleave', onLeave)
      container.removeEventListener('mouseenter', onEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { containerRef }
}

/* ─────────────────────────────────────────────────────────────
   b) useMagnetic(strength, opts) — magnetic pull toward cursor.
   On mousemove within the element, translates toward cursor by
   (offsetFromCenter * strength), optionally clamped to maxX/maxY
   (essential for full-bleed rows — uncapped pull would look broken).
   Resets to translate(0,0) with an ease-out CSS transition on
   mouseleave. rAF-throttled; hover glow handled in CSS
   (.magnetic-glow) so JS only writes transform (compositor only).
   ───────────────────────────────────────────────────────────── */
export function useMagnetic<T extends HTMLElement = HTMLElement>(
  strength = 0.3,
  opts?: { maxX?: number; maxY?: number },
) {
  const targetRef = useRef<T | null>(null)
  const rafRef = useRef<number>(0)
  const pendingRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const el = targetRef.current
    if (!el || interactionsDisabled()) return
    const s = Math.min(Math.max(strength, 0), 1)
    const mx = opts?.maxX ?? Infinity
    const my = opts?.maxY ?? Infinity
    const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v))

    const apply = () => {
      rafRef.current = 0
      const p = pendingRef.current
      if (!p) return
      pendingRef.current = null
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
    }

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const offsetX = e.clientX - (rect.left + rect.width / 2)
      const offsetY = e.clientY - (rect.top + rect.height / 2)
      pendingRef.current = { x: clamp(offsetX * s, mx), y: clamp(offsetY * s, my) }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
      pendingRef.current = null
      el.style.transform = 'translate3d(0, 0, 0)'
    }

    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave, { passive: true })
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [strength, opts?.maxX, opts?.maxY])

  return { targetRef }
}

/* ─────────────────────────────────────────────────────────────
   c) useTilt(maxDegrees) — tilt project/skill cards.
   Cursor position normalized to [-0.5, 0.5] per axis around card
   center → perspective(600px) rotateY/rotateX + translateY(-4px)
   lift. Border brightening handled in CSS via [data-tilt]:hover.
   rAF-throttled, transform-only writes.
   ───────────────────────────────────────────────────────────── */
export function useTilt<T extends HTMLElement = HTMLElement>(
  maxDegrees = 12,
) {
  const targetRef = useRef<T | null>(null)
  const rafRef = useRef<number>(0)
  const pendingRef = useRef<{ rx: number; ry: number } | null>(null)

  useEffect(() => {
    const el = targetRef.current
    if (!el || interactionsDisabled()) return
    const max = Math.min(Math.max(maxDegrees, 0), 30)

    const apply = () => {
      rafRef.current = 0
      const p = pendingRef.current
      if (!p) return
      pendingRef.current = null
      el.style.transform = `perspective(600px) rotateY(${p.ry}deg) rotateX(${p.rx}deg) translateY(-4px)`
    }

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const nx = (e.clientX - rect.left) / rect.width - 0.5 // -0.5..0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5
      pendingRef.current = {
        ry: nx * max * 2,
        rx: -ny * max * 2,
      }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }
      pendingRef.current = null
      // CSS transition on the card smooths the reset
      el.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0)'
    }

    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave, { passive: true })
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [maxDegrees])

  return { targetRef }
}

/* ─────────────────────────────────────────────────────────────
   useIntroReady — gates hero entrances behind the intro curtain.
   Returns false until IntroCurtain broadcasts 'ad-intro-done'.
   True immediately when there is no curtain to wait for:
   reduced-motion, repeat visit this session (sessionStorage flag),
   or curtain already completed. Includes a 4s fallback so content
   can never be trapped hidden if the curtain misfires.
   ───────────────────────────────────────────────────────────── */
export const INTRO_DONE_EVENT = 'ad-intro-done'
const INTRO_SEEN_KEY = 'ad-intro-seen'

export function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, '1')
  } catch {
    /* storage unavailable — curtain simply replays next load */
  }
  document.documentElement.dataset.intro = 'done'
  window.dispatchEvent(new Event(INTRO_DONE_EVENT))
}

export function useIntroReady(): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    try {
      if (reduced || sessionStorage.getItem(INTRO_SEEN_KEY)) {
        setReady(true)
        return
      }
    } catch {
      setReady(true)
      return
    }
    if (document.documentElement.dataset.intro === 'done') {
      setReady(true)
      return
    }
    const onDone = () => setReady(true)
    window.addEventListener(INTRO_DONE_EVENT, onDone)
    const fallback = setTimeout(() => setReady(true), 4000)
    return () => {
      window.removeEventListener(INTRO_DONE_EVENT, onDone)
      clearTimeout(fallback)
    }
  }, [])

  return ready
}

/* ─────────────────────────────────────────────────────────────
   useReveal — IntersectionObserver scroll-triggered fade/slide-up.
   Zero-dependency alternative for sections that don't use Framer
   Motion. Adds .is-visible to children matching [data-reveal],
   staggering 50–100ms per child via transition-delay.
   Prefers-reduced-motion: reveals instantly with no transition.
   ───────────────────────────────────────────────────────────── */
export function useReveal<T extends HTMLElement = HTMLElement>(
  staggerMs = 75,
) {
  const containerRef = useRef<T | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof IntersectionObserver === 'undefined') return

    const items = Array.from(
      container.querySelectorAll<HTMLElement>('[data-reveal]'),
    )
    if (items.length === 0) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const stagger = Math.min(Math.max(staggerMs, 50), 100)

    items.forEach((item, i) => {
      item.style.transitionDelay = reduced ? '0ms' : `${Math.min(i * stagger, 600)}ms`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [staggerMs])

  return { containerRef }
}

/* Shared stagger variants for Framer Motion sections (50–100ms). */
export const revealParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
} as const

export const revealChild = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
} as const

export function useIsTouchDevice(): boolean {
  return typeof window !== 'undefined' && isCoarsePointer()
}

export const useInteractionsDisabled = (): boolean => {
  if (typeof window === 'undefined') return true
  return interactionsDisabled()
}

export function useRunOnce(fn: () => void | (() => void)) {
  const fnRef = useRef(fn)
  fnRef.current = fn
  const run = useCallback(() => fnRef.current(), [])
  useEffect(() => {
    const cleanup = fnRef.current()
    return cleanup
  }, [run])
  return run
}
