'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* The screen "wakes": a brief logo flash, then progress dots, then the
   desktop fades up from behind it. Runs entirely in 2D DOM — this is the
   handover point from the WebGL scene to the performant desktop UI. */

export default function BootSequence({
  visible,
  onComplete,
}: {
  visible: boolean
  onComplete: () => void
}) {
  const [stage, setStage] = React.useState<'logo' | 'dots'>('logo')

  React.useEffect(() => {
    if (!visible) return
    const t1 = setTimeout(() => setStage('dots'), 620)
    const t2 = setTimeout(() => onComplete(), 1650)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [visible, onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute inset-0 z-[7000] grid place-items-center bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          role="status"
          aria-live="polite"
          aria-label="Starting up"
        >
          <div className="flex flex-col items-center gap-7">
            {/* Monogram flash */}
            <motion.div
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: stage === 'logo' ? 1 : 0.55, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid h-20 w-20 place-items-center rounded-3xl text-[30px] font-semibold text-white"
              style={{
                background: 'linear-gradient(135deg, #57C4C7, #8A5CE6)',
                boxShadow: '0 0 60px rgba(138,92,230,0.4)',
              }}
            >
              AD
            </motion.div>

            {/* Progress dots */}
            <div className="flex h-3 items-center gap-2">
              {stage === 'dots' &&
                [0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="os-boot-dot h-2 w-2 rounded-full bg-white/85"
                    style={{ animationDelay: `${i * 0.16}s` }}
                  />
                ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
