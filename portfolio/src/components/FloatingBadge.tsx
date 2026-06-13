'use client'

import { motion } from 'framer-motion'

interface FloatingBadgeProps {
  icon: React.ReactNode
  label: string
  sublabel?: string
  color?: string        // gradient from color
  colorTo?: string      // gradient to color
  className?: string
  delay?: number
  floatOffset?: number  // px up/down for float animation
}

export function FloatingBadge({
  icon,
  label,
  sublabel,
  color = '#8b5cf6',
  colorTo = '#06b6d4',
  className = '',
  delay = 0,
  floatOffset = 8,
}: FloatingBadgeProps) {
  return (
    <motion.div
      className={`absolute z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl glass-galaxy border border-white/10 shadow-lg cursor-default select-none ${className}`}
      initial={{ opacity: 0, scale: 0.7, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: [0, -floatOffset, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.5 },
      }}
      whileHover={{ scale: 1.05, boxShadow: `0 0 20px ${color}40` }}
      style={{ borderColor: `${color}30` }}
    >
      {/* Gradient icon circle */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white"
        style={{ background: `linear-gradient(135deg, ${color}, ${colorTo})` }}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span
          className="text-[13px] font-extrabold leading-none"
          style={{ background: `linear-gradient(90deg, ${color}, ${colorTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          {label}
        </span>
        {sublabel && (
          <span className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-wide font-medium">
            {sublabel}
          </span>
        )}
      </div>
    </motion.div>
  )
}
