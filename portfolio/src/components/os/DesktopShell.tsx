'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import MenuBar from './MenuBar'
import Desktop from './Desktop'
import WindowManager from './WindowManager'
import Dock from './Dock'
import SpotlightSearch from './SpotlightSearch'
import Widgets from './Widgets'

export default function DesktopShell() {
  const [spotOpen, setSpotOpen] = React.useState(false)

  /* ⌘K / Ctrl+K opens Spotlight. */
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSpotOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* macOS-style wallpaper (resolution-independent SVG) */}
      <div className="os-wallpaper" aria-hidden="true" />

      <MenuBar onOpenSpotlight={() => setSpotOpen(true)} />

      {/* Sonoma-style desktop widgets (hidden below md) */}
      <Widgets />

      {/* Window layer sits between the desktop and the dock/menu bar */}
      <Desktop />
      <WindowManager />
      <Dock />

      <SpotlightSearch open={spotOpen} onClose={() => setSpotOpen(false)} />
    </motion.div>
  )
}
