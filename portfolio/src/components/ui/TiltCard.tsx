'use client'

import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type Props = {
  maxTilt?: number
  scale?: number
  className?: string
  children: ReactNode
} & HTMLMotionProps<'div'>

export function TiltCard({ maxTilt = 8, scale = 1.01, className = '', children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rx = useSpring(useTransform(my, [0, 1], [maxTilt, -maxTilt]), { stiffness: 250, damping: 22 })
  const ry = useSpring(useTransform(mx, [0, 1], [-maxTilt, maxTilt]), { stiffness: 250, damping: 22 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        mx.set((e.clientX - rect.left) / rect.width)
        my.set((e.clientY - rect.top) / rect.height)
      }}
      onMouseLeave={() => {
        mx.set(0.5)
        my.set(0.5)
      }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
      }}
      whileHover={{ scale }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={['relative', className].join(' ')}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
