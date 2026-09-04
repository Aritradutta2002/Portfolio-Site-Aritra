'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { markLuxeSeen } from '@/lib/luxe'

/* Full-screen counter preloader with curtain wipe */
export function Preloader() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    try {
      if (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        sessionStorage.getItem('luxe-seen-v1')
      ) {
        markLuxeSeen()
        setDone(true)
        return
      }
    } catch {
      markLuxeSeen()
      setDone(true)
      return
    }
    const t0 = performance.now()
    const dur = 1300
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1)
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
      else {
        setTimeout(() => {
          setDone(true)
          markLuxeSeen()
        }, 200)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-[#07080C]"
          exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden={done}
          aria-busy={!done}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40 mb-6">
            Aritra Dutta — Portfolio 2026
          </p>
          <p className="font-serifd italic text-white text-7xl md:text-8xl tabular-nums leading-none">
            {count}
          </p>
          <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
            <div className="h-full bg-[#D3AB63] transition-all duration-100" style={{ width: `${count}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
