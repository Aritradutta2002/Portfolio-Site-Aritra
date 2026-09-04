'use client'
import { useEffect, useRef } from 'react'

/* Gold dot + trailing ring cursor. Desktop fine-pointer only. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100, rx = -100, ry = -100
    let raf = 0
    let label = ''

    const render = () => {
      raf = 0
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`
      const half = ring.classList.contains('is-active') ? 36 : 19
      ring.style.transform = `translate3d(${rx - half}px, ${ry - half}px, 0)`
      if (Math.abs(mx - rx) > 0.4 || Math.abs(my - ry) > 0.4) {
        raf = requestAnimationFrame(render)
      }
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(render) }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      const t = (e.target as HTMLElement).closest?.('[data-cursor]') as HTMLElement | null
      const next = t?.getAttribute('data-cursor') ?? ''
      if (next !== label) {
        label = next
        ring.classList.toggle('is-active', !!next)
        ring.textContent = next
      }
      kick()
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div id="luxe-cursor-dot" ref={dotRef} aria-hidden="true" />
      <div id="luxe-cursor-ring" ref={ringRef} aria-hidden="true" />
    </>
  )
}
