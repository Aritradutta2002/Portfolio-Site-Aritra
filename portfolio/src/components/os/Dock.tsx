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