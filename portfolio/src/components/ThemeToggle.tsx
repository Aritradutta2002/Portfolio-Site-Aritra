'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  className?: string
  iconSize?: number
}

/* Minimal theme toggle supporting both the Acid Editorial and
   Zro Datasheet language — circular/squircle hairline button,
   Sun/Moon crossfade with rotation. Renders a static placeholder
   pre-mount so the nav never shifts layout. */
export function ThemeToggle({ className, iconSize = 16 }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', resolvedTheme === 'light' ? '#F8F9FA' : '#0A0A0B')
    }
  }, [mounted, resolvedTheme])

  const defaultClasses =
    "relative w-9 h-9 border border-zro-line bg-zro-surface/40 flex items-center justify-center text-zro-muted hover:text-zro-ink hover:border-zro-accent/60 transition-colors duration-200 flex-shrink-0"

  if (!mounted) {
    return (
      <span
        className={className || defaultClasses}
        aria-hidden="true"
      />
    )
  }

  const isLight = resolvedTheme === 'light'

  return (
    <button
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      className={className || defaultClasses}
      aria-label={isLight ? 'Switch to night mode' : 'Switch to day mode'}
      title={isLight ? 'Switch to night mode' : 'Switch to day mode'}
      type="button"
    >
      <span className="relative block" style={{ width: iconSize, height: iconSize }}>
        <Sun
          size={iconSize}
          className={`absolute inset-0 transition-all duration-300 ${
            isLight
              ? 'opacity-100 rotate-0 scale-100 text-amber-500'
              : 'opacity-0 rotate-90 scale-50 text-zro-muted'
          }`}
          aria-hidden="true"
        />
        <Moon
          size={iconSize}
          className={`absolute inset-0 transition-all duration-300 ${
            isLight
              ? 'opacity-0 -rotate-90 scale-50 text-zro-muted'
              : 'opacity-100 rotate-0 scale-100 text-zro-accent'
          }`}
          aria-hidden="true"
        />
      </span>
    </button>
  )
}
