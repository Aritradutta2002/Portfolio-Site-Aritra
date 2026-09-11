'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

/* Infinite mono marquee strip — CSS-only loop (pauses on hover,
   static under prefers-reduced-motion) + framer-motion entrance.
   Note: entrance lives on the OUTER wrapper, never on .marquee-track,
   because the CSS keyframe animation owns that element's transform. */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items]
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-48px' }}
      className="marquee overflow-hidden border-y border-aurora/10 bg-aurora/[0.02] py-4 select-none"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max items-center gap-8 pr-8">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 font-mono text-sm uppercase tracking-[0.2em] text-muted whitespace-nowrap">
            {item}
            <Sparkles size={16} className="text-aurorastrong" />
          </span>
        ))}
      </div>
    </motion.div>
  )
}
