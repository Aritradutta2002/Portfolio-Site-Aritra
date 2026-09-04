'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) {
    return <span className="h-11 w-11 rounded-full border border-line/15" aria-hidden="true" />
  }
  const dark = theme !== 'light'
  return (
    <motion.button
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={!dark}
      whileTap={{ scale: 0.88 }}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line/15 bg-surface/60 text-muted backdrop-blur-xl transition-colors duration-300 hover:border-gold/50 hover:text-gold"
    >
      <motion.span
        key={dark ? 'moon' : 'sun'}
        initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex"
      >
        {dark ? <Moon size={17} /> : <Sun size={17} />}
      </motion.span>
    </motion.button>
  )
}
