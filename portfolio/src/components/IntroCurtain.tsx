'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { markIntroSeen } from '@/lib/interactions'

/* Page-load intro curtain — full-screen takeover on FIRST visit only.
   Counter 0→100 (~1.2s), then a double-panel exit: ink panel lifts
   first, acid trailer follows 90ms behind. Skipped entirely for
   reduced-motion users and repeat visits this session (sessionStorage).
   Scroll is locked while it plays; hero entrances wait on the
   'ad-intro-done' broadcast via useIntroReady(). */
export function IntroCurtain() {
  const [visible, setVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [count, setCount] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    let skip = false
    try {
      skip =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !!sessionStorage.getItem('ad-intro-seen') ||
        document.documentElement.dataset.intro === 'done'
    } catch {
      skip = true
    }
    if (skip) return

    setVisible(true)
    document.body.style.overflow = 'hidden'

    let raf = 0
    const start = performance.now()
    const DUR = 1200
    const tick = (now: number) => {
      const p = Math.min((now - start) / DUR, 1)
      setCount(Math.round(p * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setExiting(true)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [])

  const finish = () => {
    if (doneRef.current) return
    doneRef.current = true
    document.body.style.overflow = ''
    markIntroSeen()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[200]" aria-hidden="true">
      {/* Acid trailer panel — exits 90ms behind the ink panel */}
      <motion.div
        className="absolute inset-0 bg-acid"
        initial={{ y: 0 }}
        animate={exiting ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: exiting ? 0.09 : 0 }}
      />
      {/* Main ink panel */}
      <motion.div
        className="absolute inset-0 bg-background flex flex-col justify-between p-6 sm:p-10 overflow-hidden"
        initial={{ y: 0 }}
        animate={exiting ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => {
          if (exiting) finish()
        }}
      >
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={exiting ? { opacity: 0, y: -28 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-muted"
        >
          <span>Aritra Dutta — Portfolio</span>
          <span className="hidden sm:inline">Loading experience</span>
        </motion.div>

        {/* Center wordmark */}
        <motion.div
          animate={exiting ? { opacity: 0, y: -28 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="px-1"
        >
          <span className="block overflow-hidden">
            <motion.span
              className="block font-bold tracking-[-0.035em] leading-[0.95] text-ink text-[16vw] sm:text-[11vw] lg:text-[8.5rem]"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Aritra Dutta<span className="text-acidstrong">.</span>
            </motion.span>
          </span>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-muted"
          >
            Full Stack Engineer — Bhubaneswar, IN
          </motion.p>
        </motion.div>

        {/* Bottom counter + progress hairline */}
        <motion.div
          animate={exiting ? { opacity: 0, y: 28 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="flex items-end justify-between mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              {exiting ? 'Welcome' : 'Compiling portfolio'}
            </span>
            <span className="font-bold tabular-nums tracking-tight text-ink text-6xl sm:text-7xl leading-none">
              {count}
            </span>
          </div>
          <div className="h-px w-full bg-line/15 overflow-hidden">
            <div
              className="h-full w-full bg-acid origin-left"
              style={{ transform: `scaleX(${count / 100})` }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
