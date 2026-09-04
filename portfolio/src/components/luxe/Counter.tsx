'use client'
import { useEffect, useRef, useState } from 'react'

export function Counter({ to, suffix = '', duration = 1400, className = '' }: {
  to: number; suffix?: string; duration?: number; className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true
        const t0 = performance.now()
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1)
          const eased = 1 - Math.pow(2, -10 * p)
          setVal(Math.round(to * (p === 1 ? 1 : eased)))
          if (p < 1) requestAnimationFrame(tick)
          else setVal(to)
        }
        requestAnimationFrame(tick)
        io.disconnect()
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <span ref={ref} className={className} aria-label={`${to.toLocaleString('en-IN')}${suffix}`}>
      {val.toLocaleString('en-IN')}{suffix}
    </span>
  )
}

export function Stat({ value, suffix, label, sub }: { value: number; suffix?: string; label: string; sub?: string }) {
  return (
    <div className="relative px-6 py-7 text-center sm:text-left">
      <div className="font-display text-4xl md:text-[2.75rem] font-bold tracking-tight text-ink leading-none">
        <Counter to={value} suffix={suffix} />
      </div>
      <div className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{label}</div>
      {sub ? <div className="mt-1 text-xs text-muted/80">{sub}</div> : null}
    </div>
  )
}
