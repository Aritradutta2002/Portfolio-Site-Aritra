'use client'

import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'
import { pageTransition } from '@/lib/motion'

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={pageTransition as Variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}
