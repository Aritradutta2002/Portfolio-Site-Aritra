'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

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
