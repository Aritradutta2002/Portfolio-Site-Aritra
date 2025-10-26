'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.div
      className="fixed top-4 right-6 z-[200]"
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <motion.button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="relative w-14 h-14 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-700/50 shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1, rotate: theme === 'dark' ? 180 : -180 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        {/* Sun Icon */}
        <Sun className="h-6 w-6 text-amber-500 dark:text-gray-400 transition-all duration-500 dark:rotate-180 dark:scale-0 absolute" />
        
        {/* Moon Icon */}
        <Moon className="h-6 w-6 text-gray-400 dark:text-blue-400 transition-all duration-500 rotate-180 scale-0 dark:rotate-0 dark:scale-100 absolute" />
        
        {/* Animated Background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/30 to-orange-500/30 dark:from-blue-500/30 dark:to-purple-500/30 blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"></div>
      </motion.button>
    </motion.div>
  )
}

// Separate component for navigation (if needed)
export function NavigationThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-3 rounded-xl bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 hover:from-blue-200 hover:to-purple-200 dark:hover:from-blue-900 dark:hover:to-purple-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-300/50 dark:border-gray-600/50"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 text-yellow-600 dark:text-gray-400 transition-all duration-300 dark:rotate-90 dark:scale-0 drop-shadow-sm" />
      <Moon className="absolute inset-3 h-5 w-5 text-gray-400 dark:text-blue-400 transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100 drop-shadow-sm" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
    </button>
  )
}
