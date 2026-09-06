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
function scaleFor(index: number, hovered: number | null, magnify = true) {
  if (!magnify || hovered === null) return 1
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
  const closeAll = useWindowStore((s) => s.closeAll)

  const [hovered, setHovered] = React.useState<number | null>(null)
  const [label, setLabel] = React.useState<string | null>(null)
  const [binLabel, setBinLabel] = React.useState(false)
  const reduce = useReducedMotion()

  const hovering = hovered !== null && !reduce

  const isOpen = (id: string) => windows.some((w) => w.appType === id)
  const focusCount = windows.filter((w) => !w.minimized).length

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
          setBinLabel(false)
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
                whileTap={{ scale: 0.85 }}
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

        {/* Divider + Bin */}
        <div className="os-dock-divider" aria-hidden="true" />
        <div
          className="os-dock-icon flex items-end"
          style={{ width: BASE_ICON, height: BASE_ICON }}
          onMouseEnter={() => setBinLabel(true)}
        >
          {binLabel && (
            <span className="os-dock-label" aria-hidden="true">
              Bin
            </span>
          )}
          <motion.button
            type="button"
            className="os-focusable relative flex h-full w-full items-end justify-center"
            onClick={closeAll}
            aria-label={`Bin — close all windows (${focusCount} open)`}
            title={focusCount > 0 ? `${focusCount} window${focusCount === 1 ? '' : 's'} open` : 'Empty'}
            whileTap={{ scale: 0.85 }}
            style={{ transformOrigin: 'bottom center' }}
          >
            <BinIcon size={BASE_ICON} full={focusCount > 0} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

/* macOS-style trash can (kept local — not in the app-icon registry). */
function BinIcon({ size = 44, full }: { size?: number; full?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={{ display: 'block' }}
      shapeRendering="geometricPrecision"
    >
      {/* Body */}
      <path
        d="M20 26h24l-2.2 26.6a6 6 0 0 1-6 5.4h-7.6a6 6 0 0 1-6-5.4L20 26Z"
        fill={full ? '#7A7A80' : '#8E8E93'}
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="1"
      />
      {/* Lid / rim */}
      <path
        d="M26 26v-4a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v4"
        fill="none"
        stroke="#AEAEB6"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Lid top handle */}
      <rect x="28" y="14.5" width="8" height="3" rx="1.5" fill="#B9B9C0" />
      {/* Vertical rib lines */}
      <g stroke="rgba(255,255,255,0.35)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M27 33l-1 12" />
        <path d="M32 33v13" />
        <path d="M37 33l1 12" />
      </g>
      {!full && (
        <g stroke="rgba(0,0,0,0.18)" strokeWidth="1.6" strokeLinecap="round">
          <path d="M27 33l-1 12" />
          <path d="M37 33l1 12" />
        </g>
      )}
    </svg>
  )
}