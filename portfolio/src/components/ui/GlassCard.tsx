'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { forwardRef, type ReactNode } from 'react'

type Glow = 'none' | 'primary' | 'secondary' | 'rose' | 'amber' | 'emerald' | 'sky'

type GlassCardProps = {
  glow?: Glow
  gradientBorder?: boolean
  gradientBorderAnimated?: boolean
  interactive?: boolean
  className?: string
  children: ReactNode
} & HTMLMotionProps<'div'>

const glowClass: Record<Glow, string> = {
  none: '',
  primary:   'hover:shadow-neon-primary',
  secondary: 'hover:shadow-neon-secondary',
  rose:      'hover:shadow-neon-rose',
  amber:     'hover:shadow-neon-amber',
  emerald:   'hover:shadow-neon-emerald',
  sky:       'hover:shadow-[0_0_20px_hsl(var(--accent-sky)/0.5)]',
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { glow = 'none', gradientBorder, gradientBorderAnimated, interactive = true, className = '', children, ...rest },
  ref
) {
  return (
    <motion.div
      ref={ref}
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'relative rounded-lg glass-elevated overflow-hidden',
        'transition-shadow duration-500 ease-out-expo',
        gradientBorder ? 'gradient-border' : '',
        gradientBorderAnimated ? 'gradient-border gradient-border-animated' : '',
        glowClass[glow],
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </motion.div>
  )
})
