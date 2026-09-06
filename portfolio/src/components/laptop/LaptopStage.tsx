'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

/* The 3D scene is client-only and heavy — load it after hydration and show a
   lightweight 2D placeholder meanwhile (Plan §9). */
const LaptopScene = dynamic(() => import('./LaptopScene'), {
  ssr: false,
  loading: () => <LaptopPlaceholder />,
})

function LaptopPlaceholder() {
  return (
    <div className="grid h-full w-full place-items-center" aria-hidden="true">
      <div className="w-[min(560px,74vw)]">
        <div className="relative mx-auto h-[10px] w-[86%] rounded-t-lg bg-gradient-to-b from-[#D5D8DE] to-[#A8ACB4]" />
        <div className="relative mx-auto h-[8px] w-[92%] rounded-b-xl bg-gradient-to-b from-[#B9BDC5] to-[#8E9299]" />
      </div>
    </div>
  )
}

export default function LaptopStage({
  opening,
  onPowerOn,
  onOpened,
  reduce,
  faded,
}: {
  opening: boolean
  onPowerOn: () => void
  onOpened: () => void
  reduce: boolean
  faded: boolean
}) {
  const progress = React.useRef(0)

  return (
    <div
      className="absolute inset-0 transition-opacity duration-500"
      style={{ opacity: faded ? 0 : 1 }}
    >
      <button
        type="button"
        onClick={onPowerOn}
        disabled={opening}
        className="os-focusable absolute inset-0 grid h-full w-full place-items-center"
        aria-label="Power on the laptop and enter the desktop"
      >
        {/* 3D stage */}
        <div className="absolute inset-0">
          <LaptopScene
            opening={opening}
            progress={progress}
            reduce={reduce}
            onOpened={onOpened}
          />
        </div>

        {/* Ambient glow under the laptop */}
        <div
          className="pointer-events-none absolute bottom-[16%] left-1/2 h-[220px] w-[min(680px,80vw)] -translate-x-1/2 rounded-[50%] opacity-70 blur-[70px]"
          style={{
            background:
              'radial-gradient(closest-side, rgba(87,196,199,0.28), rgba(138,92,230,0.18), transparent 72%)',
          }}
          aria-hidden="true"
        />

        {/* Caption */}
        <motion.div
          className="pointer-events-none absolute bottom-[9%] left-0 right-0 flex flex-col items-center gap-2 px-6 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: opening ? 0 : 1, y: opening ? 6 : 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <p className="text-[13px] font-medium tracking-[0.14em] text-white/55 uppercase">
            {opening ? 'Starting up…' : 'Click to power on'}
          </p>
        </motion.div>
      </button>
    </div>
  )
}
