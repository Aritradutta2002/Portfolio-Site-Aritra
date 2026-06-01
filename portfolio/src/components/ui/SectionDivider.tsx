'use client'

import { motion } from 'framer-motion'

export function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div className={['relative h-px max-w-7xl mx-auto overflow-hidden', className].join(' ')}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: 0.5 }}
      />
    </div>
  )
}

export function WaveDivider({ className = '', fill = 'hsl(var(--bg-0))' }: { className?: string; fill?: string }) {
  return (
    <div className={['relative leading-[0]', className].join(' ')} aria-hidden>
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-12 sm:h-16 md:h-20 block"
      >
        <path
          d="M0,40 C240,90 480,0 720,40 C960,80 1200,10 1440,50 L1440,100 L0,100 Z"
          fill={fill}
        />
      </svg>
    </div>
  )
}
