'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function MagneticCursor() {
  const [isCoarse, setIsCoarse] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.4 })

  useEffect(() => {
    setIsCoarse(window.matchMedia('(pointer: coarse)').matches)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(false)
      return
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }
    const onLeave = () => setIsVisible(false)

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor="hover"]')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseover', onOver)
    }
  }, [x, y, isVisible])

  if (isCoarse) return null

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 2.4 : 1,
      }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none fixed top-0 left-0 z-[250] mix-blend-difference"
    >
      <div className="w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fg-0" />
    </motion.div>
  )
}
