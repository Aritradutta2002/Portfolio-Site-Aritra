'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

/* Minimal theme toggle in the Acid Editorial language — circular
   hairline button, Sun/Moon crossfade, acid hover. Renders a static
   placeholder pre-mount so the nav never shifts. Also syncs the
   theme-color meta tag with the active theme. */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', resolvedTheme === 'light' ? '#F5F6FA' : '#050508')
    }
  }, [mounted, resolvedTheme])

  if (!mounted) {
    return <span className="w-9 h-9 rounded-full border border-line/10 flex-shrink-0" aria-hidden="true" />
  }

  const isLight = resolvedTheme === 'light'

  return (
    <button
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className="relative w-9 h-9 rounded-full border border-line/10 flex items-center justify-center text-muted hover:text-aurorastrong hover:border-aurora/50 transition-colors duration-300 flex-shrink-0"
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <span className="relative block w-[18px] h-[18px]">
        <Sun
          size={18}
          className={`absolute inset-0 transition-all duration-300 ${isLight ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}
          aria-hidden="true"
        />
        <Moon
          size={18}
          className={`absolute inset-0 transition-all duration-300 ${isLight ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
          aria-hidden="true"
        />
      </span>
    </button>
  )
}
