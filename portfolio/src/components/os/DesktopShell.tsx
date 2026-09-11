'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useUiStore } from '@/store/uiStore'
import MenuBar from './MenuBar'
import Desktop from './Desktop'
import WindowManager from './WindowManager'
import Dock from './Dock'
import SpotlightSearch from './SpotlightSearch'
import Widgets from './Widgets'

export default function DesktopShell() {
  const [spotOpen, setSpotOpen] = React.useState(false)

  const brightness = useUiStore((s) => s.brightness)
  const showDock = useUiStore((s) => s.showDock)
  const showWidgets = useUiStore((s) => s.showWidgets)

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

  /* Dim opacity crashes toward ~65% as brightness drops toward the floor. */
  const dimOpacity = (1 - brightness) * 0.65

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

      {/* Sonoma-style desktop widgets (hidden below md) — toggled from View menu */}
      {showWidgets && <Widgets />}

      {/* Window layer sits between the desktop and the dock/menu bar */}
      <Desktop />
      <WindowManager />
      {showDock && <Dock />}

      <SpotlightSearch open={spotOpen} onClose={() => setSpotOpen(false)} />

      {/* Real screen dimming — a fixed black overlay above all chrome */}
      <div className="os-dim" style={{ opacity: dimOpacity }} aria-hidden="true" />
    </motion.div>
  )
}