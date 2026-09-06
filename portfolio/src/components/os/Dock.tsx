'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useWindowStore } from '@/store/windowStore'
import AppIcon from './AppIcons'
import { DOCK_APPS } from './appRegistry'
import { registerDockIcon } from './dockRegistry'

const BASE_ICON = 44
const GAP = 10
const PAD = 8
const BASE_H = BASE_ICON + PAD * 2
const MAX_SCALE = 1.5
const GROWTH = Math.round(BASE_ICON * (MAX_SCALE - 1)) // 22

/** macOS falloff: the hovered icon peaks, immediate neighbours scale less. */
function scaleFor(index: number, hovered: number | null) {
  if (hovered === null) return 1
  const d = Math.abs(index - hovered)
  if (d === 0) return MAX_SCALE
  if (d === 1) return 1.28
  if (d === 2) return 1.12
  return 1
}

export default function Dock() {
  const windows = useWindowStore((s) => s.windows)
  const openApp = useWindowStore((s) => s.openApp)
  const restoreWindow = useWindowStore((s) => s.restoreWindow)
  const focusWindow = useWindowStore((s) => s.focusWindow)

  const [hovered, setHovered] = React.useState<number | null>(null)
  const [label, setLabel] = React.useState<string | null>(null)
  const reduce = useReducedMotion()

  const hovering = hovered !== null && !reduce

  const isOpen = (id: string) => windows.some((w) => w.appType === id)

  const handleClick = (appType: string) => {
    /* Restore the most recently opened minimized window for this app,
       otherwise focus it, otherwise launch it. */
    const owned = windows.filter((w) => w.appType === appType)
    const minimized = owned.filter((w) => w.minimized)
    if (minimized.length) {
      restoreWindow(minimized[minimized.length - 1].id)
      return
    }
    if (owned.length) {
      focusWindow(owned[owned.length - 1].id)
      return
    }
    openApp(appType as never)
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-2 z-[8000] flex justify-center">
      <motion.div
        className="os-dock pointer-events-auto flex items-end px-2"
        style={{ gap: GAP }}
        animate={{
          height: hovering ? BASE_H + GROWTH : BASE_H,
          paddingBottom: PAD,
          paddingTop: PAD,
        }}
        initial={false}
        transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.7 }}
        onMouseLeave={() => {
          setHovered(null)
          setLabel(null)
        }}
        role="toolbar"
        aria-label="Dock"
      >
        {DOCK_APPS.map((app, i) => {
          const open = isOpen(app.id)
          return (
            <div
              key={app.id}
              className="os-dock-icon flex items-end"
              style={{ width: BASE_ICON, height: BASE_ICON }}
              onMouseEnter={() => {
                setHovered(i)
                setLabel(app.label)
              }}
              onFocus={() => setLabel(app.label)}
            >
              {/* Hover tooltip */}
              {label === app.label && hovered === i && (
                <span className="os-dock-label" aria-hidden="true">
                  {app.label}
                </span>
              )}

              <motion.button
                type="button"
                className="os-focusable relative flex h-full w-full items-end justify-center"
                onClick={() => handleClick(app.id)}
                aria-label={`${app.label}${open ? ' (open)' : ''}`}
                animate={{ scale: reduce ? 1 : scaleFor(i, hovered) }}
                initial={false}
                transition={{ type: 'spring', stiffness: 420, damping: 30, mass: 0.7 }}
                style={{ transformOrigin: 'bottom center' }}
                ref={(el) => {
                  registerDockIcon(app.id, el)
                }}
              >
                <AppIcon name={app.icon} size={BASE_ICON} />
              </motion.button>

              {/* Running indicator */}
              {open && (
                <span className="os-dock-indicator" aria-hidden="true" />
              )}
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
