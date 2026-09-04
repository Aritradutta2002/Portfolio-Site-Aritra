'use client'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'

export function Reveal({ children, delay = 0, y = 26, className = '' }: {
  children: ReactNode; delay?: number; y?: number; className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-64px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
