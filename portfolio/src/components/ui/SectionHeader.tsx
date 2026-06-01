'use client'

import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion'

type SectionHeaderProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  index?: string
  align?: 'center' | 'left'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  index,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className={[
        'mb-16 md:mb-20',
        align === 'center' ? 'text-center' : 'text-left',
        className,
      ].join(' ')}
    >
      {/* Eyebrow chip + index */}
      <motion.div
        variants={staggerItem}
        className={[
          'flex items-center gap-3 mb-5',
          align === 'center' ? 'justify-center' : 'justify-start',
        ].join(' ')}
      >
        {index && (
          <span className="font-mono text-[11px] tracking-[0.3em] text-fg-4 uppercase">
            {index}
          </span>
        )}
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/25 backdrop-blur-sm text-[12px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          {eyebrow}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h2
        variants={fadeUp}
        className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-fg-0 mb-5 leading-[1.05] text-balance"
      >
        {title}
      </motion.h2>

      {/* Gradient divider */}
      <motion.div
        variants={staggerItem}
        className={[
          'flex items-center gap-2 mb-5',
          align === 'center' ? 'justify-center' : 'justify-start',
        ].join(' ')}
      >
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-primary" />
        <span className="h-1 w-16 rounded-full bg-gradient-to-r from-primary via-secondary to-rose" />
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-rose" />
      </motion.div>

      {/* Description */}
      {description && (
        <motion.p
          variants={fadeUp}
          className="text-base text-fg-3 max-w-2xl mx-auto leading-relaxed text-pretty"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
