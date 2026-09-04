'use client'

import { useEffect, useRef } from 'react'

/* Awwwards-style cursor follower — a small aurora pill (e.g. "View →")
   that trails the cursor over any element marked with `data-cursor`.
   Single global mousemove listener, lerped rAF loop, transform-only
   writes. Renders nothing on touch devices or reduced-motion. */
export function CursorTag({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window
    ) {
      return
    }

    let raf = 0
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let visible = false

    const loop = () => {
      x += (tx - x) * 0.22
      y += (ty - y) * 0.22
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -130%)`
      raf = requestAnimationFrame(loop)
    }

    const show = () => {
      if (!visible) {
        visible = true
        el.style.opacity = '1'
        el.style.scale = '1'
      }
      if (!raf) {
        const rect = el.getBoundingClientRect()
        x = tx - rect.width / 2
        y = ty - rect.height / 2
        loop()
      }
    }

    const hide = () => {
      if (!visible) return
      visible = false
      el.style.opacity = '0'
      el.style.scale = '0.8'
      cancelAnimationFrame(raf)
      raf = 0
    }

    const onMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest?.('[data-cursor]')
      if (target) {
        tx = e.clientX
        ty = e.clientY
        show()
      } else {
        hide()
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block opacity-0 font-mono text-[11px] font-bold uppercase tracking-[0.16em] bg-aurora text-[#0B0616] px-4 py-2 rounded-full whitespace-nowrap"
      style={{ transition: 'opacity 0.25s ease, scale 0.25s ease', scale: '0.8' }}
    >
      {text} →
    </div>
  )
}
