'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [show, setShow] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="btn-gold btn-press relative flex h-12 w-12 items-center justify-center rounded-full"
        >
          <svg viewBox="0 0 48 48" className="absolute -inset-[3px] h-[54px] w-[54px] -rotate-90" aria-hidden="true">
            <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="2" />
            <motion.circle
              cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp size={18} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
