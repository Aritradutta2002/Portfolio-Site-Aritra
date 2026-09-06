'use client'

import * as React from 'react'
import { motion, Reorder, useReducedMotion } from 'framer-motion'
import { useWindowStore } from '@/store/windowStore'
import AppIcon from './AppIcons'
import { DOCK_APPS, APP_BY_ID } from './appRegistry'
import { registerDockIcon } from './dockRegistry'

const BASE_ICON = 44
const GAP = 10
const PAD = 8
const BASE_H = BASE_ICON + PAD * 2
const MAX_SCALE = 1.5
const GROWTH = Math.round(BASE_ICON * (MAX_SCALE - 1)) // 22

const DOCK_ORDER_KEY = 'os-dock-order:v1'

/** macOS falloff: the hovered icon peaks, immediate neighbours scale less. */
function scaleFor(index: number, hovered: number | null, magnify = true) {
  if (!magnify || hovered === null) return 1
  const d = Math.abs(index - hovered)
  if (d === 0) return MAX_SCALE
  if (d === 1) return 1.28
  if (d === 2) return 1.12
  return 1
}

function loadDockOrder(): string[] {
  const defaults: string[] = DOCK_APPS.map((a) => a.id)
  try {
    const raw = localStorage.getItem(DOCK_ORDER_KEY)
    if (!raw) return defaults
    const parsed = JSON.parse(raw) as string[]
    if (!Array.isArray(parsed)) return defaults
    // Keep only known ids, append any new apps missing from storage.
    const known = new Set(defaults)
    const filtered = parsed.filter((id) => known.has(id))
    for (const id of defaults) if (!filtered.includes(id)) filtered.push(id)
    return filtered.length ? filtered : defaults
  } catch {
    return defaults
  }
}

export default function Dock() {
  const windows = useWindowStore((s) => s.windows)
  const openApp = useWindowStore((s) => s.openApp)
  const restoreWindow = useWindowStore((s) => s.restoreWindow)
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const closeAll = useWindowStore((s) => s.closeAll)

  // Order is id-based so magnification/tooltips survive reordering + reloads.
  const [order, setOrder] = React.useState<string[]>(() =>
    typeof window === 'undefined' ? DOCK_APPS.map((a) => a.id as string) : loadDockOrder()
  )
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)
  const [label, setLabel] = React.useState<string | null>(null)
  const [binLabel, setBinLabel] = React.useState(false)
  const [draggingId, setDraggingId] = React.useState<string | null>(null)
  const reduce = useReducedMotion()
  const suppressClick = React.useRef(false)

  React.useEffect(() => {
    try {
      localStorage.setItem(DOCK_ORDER_KEY, JSON.stringify(order))
    } catch {
      /* storage unavailable — order stays in memory */
    }
  }, [order])

  const hoveredIndex = hoveredId ? order.indexOf(hoveredId) : null
  const hovering = hoveredIndex !== null && hoveredIndex >= 0 && !reduce && draggingId === null

  const isOpen = (id: string) => windows.some((w) => w.appType === id)
  const focusCount = windows.filter((w) => !w.minimized).length

  const handleClick = (appType: string) => {
    // A reorder drag ending over the icon must not launch the app.
    if (suppressClick.current) {
      suppressClick.current = false
      return
    }
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

  // Keyboard reorder: focus an icon + ArrowLeft/Right moves it. macOS-like + a11y.
  const moveKeyboard = (id: string, dir: -1 | 1) => {
    setOrder((prev) => {
      const i = prev.indexOf(id)
      const j = i + dir
      if (i < 0 || j < 0 || j >= prev.length) return prev
      const next = [...prev]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
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
          setHoveredId(null)
          setLabel(null)
          setBinLabel(false)
        }}
        role="toolbar"
        aria-label="Dock — drag icons to reorder"
      >
        <Reorder.Group
          axis="x"
          values={order}
          onReorder={setOrder}
          className="flex items-end"
          style={{ gap: GAP, listStyle: 'none', margin: 0, padding: 0 }}
          aria-label="Pinned apps"
        >
          {order.map((id, i) => {
            const app = APP_BY_ID[id] ?? DOCK_APPS.find((a) => a.id === id)
            if (!app) return null
            const open = isOpen(app.id)
            const isDragging = draggingId === app.id
            return (
              <Reorder.Item
                key={app.id}
                value={app.id}
                className="os-dock-icon flex items-end"
                style={{
                  width: BASE_ICON,
                  height: BASE_ICON,
                  touchAction: 'none',
                  zIndex: isDragging ? 5 : undefined,
                }}
                onMouseEnter={() => {
                  setHoveredId(app.id)
                  setLabel(app.label)
                }}
                onFocus={() => {
                  setHoveredId(app.id)
                  setLabel(app.label)
                }}
                drag={reduce ? false : true}
                whileDrag={{ scale: 1.18, y: -8 }}
                onDragStart={() => {
                  setDraggingId(app.id)
                  suppressClick.current = true
                  setHoveredId(null)
                }}
                onDragEnd={() => {
                  setDraggingId(null)
                  // Keep suppression for the click that follows a real drag;
                  // clear it shortly after so plain clicks keep working.
                  window.setTimeout(() => {
                    suppressClick.current = false
                  }, 80)
                }}
                transition={{ type: 'spring', stiffness: 550, damping: 38, mass: 0.7 }}
                layout={reduce ? undefined : true}
                dragElastic={0.12}
                data-dragging={isDragging}
              >
                {/* Hover tooltip — hidden while any icon is being dragged */}
                {label === app.label && hoveredId === app.id && draggingId === null && (
                  <span className="os-dock-label" aria-hidden="true">
                    {app.label}
                  </span>
                )}

                <motion.button
                  type="button"
                  className="os-focusable relative flex h-full w-full cursor-grab items-end justify-center active:cursor-grabbing"
                  onClick={() => handleClick(app.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                      e.preventDefault()
                      moveKeyboard(app.id, e.key === 'ArrowLeft' ? -1 : 1)
                    }
                  }}
                  aria-label={`${app.label}${open ? ' (open)' : ''} — drag to reorder, arrow keys to move`}
                  animate={{ scale: reduce || isDragging ? 1 : scaleFor(i, hoveredIndex) }}
                  initial={false}
                  whileTap={isDragging ? undefined : { scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.6 }}
                  style={{ transformOrigin: 'bottom center', touchAction: 'none' }}
                  ref={(el) => {
                    registerDockIcon(app.id, el)
                  }}
                >
                  <AppIcon name={app.icon} size={BASE_ICON} />
                </motion.button>

                {/* Running indicator */}
                {open && <span className="os-dock-indicator" aria-hidden="true" />}
              </Reorder.Item>
            )
          })}
        </Reorder.Group>

        {/* Divider + Bin (fixed — not reorderable, like macOS) */}
        <div className="os-dock-divider" aria-hidden="true" />
        <div
          className="os-dock-icon flex items-end"
          style={{ width: BASE_ICON, height: BASE_ICON }}
          onMouseEnter={() => setBinLabel(true)}
        >
          {binLabel && draggingId === null && (
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

/* macOS-style Trash icon — authentic Ventura/Sonoma look */
function BinIcon({ size = 44, full }: { size?: number; full?: boolean }) {
  const bodyColor = full ? '#636366' : '#8E8E93'
  const lidColor = full ? '#8E8E93' : '#AEAEB2'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={{ display: 'block' }}
      shapeRendering="geometricPrecision"
    >
      <defs>
        <linearGradient id="bin-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={full ? '#7C7C80' : '#A0A0A6'} />
          <stop offset="100%" stopColor={full ? '#4A4A4E' : '#6E6E73'} />
        </linearGradient>
        <linearGradient id="bin-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={full ? '#AEAEB2' : '#C7C7CC'} />
          <stop offset="100%" stopColor={full ? '#8E8E93' : '#AEAEB2'} />
        </linearGradient>
      </defs>

      {/* Trash body */}
      <path
        d="M19 27h26l-2.4 27a5 5 0 0 1-5 4.5H26.4a5 5 0 0 1-5-4.5L19 27Z"
        fill="url(#bin-body)"
      />
      {/* Body highlight */}
      <path
        d="M19 27h26l-.5 5H19.5L19 27Z"
        fill="rgba(255,255,255,0.14)"
      />
      {/* Body border */}
      <path
        d="M19 27h26l-2.4 27a5 5 0 0 1-5 4.5H26.4a5 5 0 0 1-5-4.5L19 27Z"
        fill="none"
        stroke="rgba(0,0,0,0.22)"
        strokeWidth="0.8"
      />

      {/* Lid rim (horizontal bar) */}
      <rect x="15" y="24" width="34" height="4.5" rx="2.25" fill="url(#bin-lid)" />
      <rect x="15" y="24" width="34" height="2" rx="2" fill="rgba(255,255,255,0.28)" />

      {/* Handle stem */}
      <rect x="27.5" y="14" width="9" height="11" rx="2" fill={lidColor} />
      <rect x="27.5" y="14" width="9" height="4" rx="2" fill="rgba(255,255,255,0.22)" />
      {/* Handle top cap */}
      <rect x="26" y="12" width="12" height="3.5" rx="1.75" fill={lidColor} />

      {/* Vertical rib lines */}
      <g strokeLinecap="round" strokeWidth="1.4">
        <line x1="26" y1="32" x2="25" y2="50" stroke="rgba(255,255,255,0.30)" />
        <line x1="32" y1="32" x2="32" y2="51" stroke="rgba(255,255,255,0.30)" />
        <line x1="38" y1="32" x2="39" y2="50" stroke="rgba(255,255,255,0.30)" />
      </g>

      {/* Full indicator: crumpled paper hint */}
      {full && (
        <g fill="rgba(255,255,255,0.18)">
          <ellipse cx="32" cy="36" rx="7" ry="4" />
          <ellipse cx="28" cy="42" rx="4" ry="2.5" />
          <ellipse cx="36" cy="44" rx="3.5" ry="2" />
        </g>
      )}
    </svg>
  )
}