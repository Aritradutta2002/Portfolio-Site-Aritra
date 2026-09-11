'use client'

import * as React from 'react'
import {
  animate,
  motion,
  Reorder,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { useWindowStore } from '@/store/windowStore'
import AppIcon from './AppIcons'
import { DOCK_APPS, APP_BY_ID } from './appRegistry'
import { registerDockIcon } from './dockRegistry'

/* ── Geometry — matches real macOS defaults ────────────────────────────────
   Icons are 52px (macOS default ≈ 52–56), magnifying to ~1.55× under the
   cursor with a gaussian falloff across neighbours, exactly like Sonoma. */
const BASE_ICON = 52
const GAP = 10
/* Symmetric vertical padding keeps icons floating centred in the glass,
   clear of the bottom border (macOS leaves roughly this much breathing
   room below the icons). */
const PAD_Y = 10
const BASE_H = BASE_ICON + PAD_Y * 2
const MAX_SCALE = 1.55
const SIGMA = (BASE_ICON + GAP) * 0.85 // falloff width in px

const DOCK_ORDER_KEY = 'os-dock-order:v1'

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
  const outerRef = React.useRef<HTMLDivElement>(null)

  /* Cursor x (raw → springed). Infinity = no magnification. */
  const rawX = useMotionValue(1e6)
  const mouseX = useSpring(rawX, { stiffness: 420, damping: 42, mass: 0.8 })

  React.useEffect(() => {
    try {
      localStorage.setItem(DOCK_ORDER_KEY, JSON.stringify(order))
    } catch {
      /* storage unavailable — order stays in memory */
    }
  }, [order])

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

  const onLeave = () => {
    rawX.set(1e6)
    setHoveredId(null)
    setLabel(null)
    setBinLabel(false)
  }

  return (
    <div
      ref={outerRef}
      className="pointer-events-none absolute inset-x-0 bottom-2 z-[8000] flex justify-center"
    >
      <motion.div
        className="os-dock pointer-events-auto flex items-end px-2"
        style={{ gap: GAP, paddingTop: PAD_Y, paddingBottom: PAD_Y }}
        animate={{ height: BASE_H }}
        initial={false}
        transition={{ type: 'spring', stiffness: 420, damping: 32, mass: 0.7 }}
        onMouseMove={(e) => {
          if (reduce || draggingId !== null) return
          rawX.set(e.clientX)
        }}
        onMouseLeave={onLeave}
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
              <DockSlot
                key={app.id}
                app={app}
                index={i}
                slotCount={order.length + 1 /* + the Bin */}
                mouseX={mouseX}
                outerRef={outerRef}
                magnify={!reduce}
                open={open}
                isDragging={isDragging}
                reduce={!!reduce}
                label={label}
                hoveredId={hoveredId}
                draggingId={draggingId}
                setHoveredId={setHoveredId}
                setLabel={setLabel}
                setDraggingId={setDraggingId}
                suppressClick={suppressClick}
                onLaunch={handleClick}
                onKeyboardMove={moveKeyboard}
              />
            )
          })}
        </Reorder.Group>

        {/* Divider + Bin (fixed — not reorderable, like macOS) */}
        <div className="os-dock-divider" aria-hidden="true" />
        <BinSlot
          index={order.length}
          slotCount={order.length + 1}
          mouseX={mouseX}
          outerRef={outerRef}
          label={binLabel}
          dragging={draggingId !== null}
          onHover={() => setBinLabel(true)}
          focusCount={focusCount}
          onClick={closeAll}
        />
      </motion.div>
    </div>
  )
}

/* ── Magnification math ────────────────────────────────────────────────────
   Each slot's scale derives from its *base* slot centre (stable positions —
   the real dock also computes from resting positions, which keeps the icon
   under the cursor steady). Gaussian falloff, cursor-distance driven,
   springed for butter — no React re-renders during the sweep. */
function useDockScale(
  index: number,
  slotCount: number,
  mouseX: MotionValue<number>,
  outerRef: React.RefObject<HTMLDivElement | null>,
  magnify: boolean
): MotionValue<number> {
  return useTransform(mouseX, (mx) => {
    if (!magnify || !Number.isFinite(mx)) return 1
    const el = outerRef.current
    if (!el) return 1
    const rect = el.getBoundingClientRect()
    const center = rect.left + rect.width / 2
    const base = center + (index - (slotCount - 1) / 2) * (BASE_ICON + GAP)
    const d = Math.abs(mx - base)
    if (d > SIGMA * 3) return 1
    return 1 + (MAX_SCALE - 1) * Math.exp(-(d * d) / (2 * SIGMA * SIGMA))
  })
}

/* ── Dock slot — one magnifiable icon cell ──────────────────────────────── */

type DockSlotProps = {
  app: (typeof DOCK_APPS)[number]
  index: number
  slotCount: number
  mouseX: MotionValue<number>
  outerRef: React.RefObject<HTMLDivElement | null>
  magnify: boolean
  open: boolean
  isDragging: boolean
  reduce: boolean
  label: string | null
  hoveredId: string | null
  draggingId: string | null
  setHoveredId: (id: string | null) => void
  setLabel: (l: string | null) => void
  setDraggingId: (id: string | null) => void
  suppressClick: React.RefObject<boolean>
  onLaunch: (appType: string) => void
  onKeyboardMove: (id: string, dir: -1 | 1) => void
}

function DockSlot({
  app,
  index,
  slotCount,
  mouseX,
  outerRef,
  magnify,
  open,
  isDragging,
  reduce,
  label,
  hoveredId,
  draggingId,
  setHoveredId,
  setLabel,
  setDraggingId,
  suppressClick,
  onLaunch,
  onKeyboardMove,
}: DockSlotProps) {
  const scale = useDockScale(index, slotCount, mouseX, outerRef, magnify)

  /* Width/height follow the magnification MotionValue — layout pushes
     neighbours outward exactly like the real dock. */
  const width = useTransform(scale, (s) => Math.round(BASE_ICON * s))
  const height = useTransform(scale, (s) => Math.round(BASE_ICON * s))

  /* Launch bounce — a single tasteful hop, like macOS opening feedback. */
  const y = useMotionValue(0)
  const bounce = () => {
    if (reduce) return
    animate(y, [0, -26, 0], { duration: 0.52, ease: [0.22, 1, 0.36, 1] })
  }

  return (
    <Reorder.Item
      value={app.id}
      className="os-dock-icon flex items-end justify-center"
      style={{
        width,
        height,
        y,
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
      whileDrag={{ scale: 1.18 }}
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
        onClick={() => {
          bounce()
          onLaunch(app.id)
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault()
            onKeyboardMove(app.id, e.key === 'ArrowLeft' ? -1 : 1)
          }
        }}
        aria-label={`${app.label}${open ? ' (open)' : ''} — drag to reorder, arrow keys to move`}
        whileTap={isDragging ? undefined : { scale: 0.88 }}
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
}

/* ── Bin slot ────────────────────────────────────────────────────────────── */

function BinSlot({
  index,
  slotCount,
  mouseX,
  outerRef,
  label,
  dragging,
  onHover,
  focusCount,
  onClick,
}: {
  index: number
  slotCount: number
  mouseX: MotionValue<number>
  outerRef: React.RefObject<HTMLDivElement | null>
  label: boolean
  dragging: boolean
  onHover: () => void
  focusCount: number
  onClick: () => void
}) {
  const scale = useDockScale(index, slotCount, mouseX, outerRef, true)
  const width = useTransform(scale, (s) => Math.round(BASE_ICON * s))
  const height = useTransform(scale, (s) => Math.round(BASE_ICON * s))
  return (
    <motion.div
      className="os-dock-icon flex items-end justify-center"
      style={{ width, height }}
      onMouseEnter={onHover}
    >
      {label && !dragging && (
        <span className="os-dock-label" aria-hidden="true">
          Bin
        </span>
      )}
      <motion.button
        type="button"
        className="os-focusable relative flex h-full w-full items-end justify-center"
        onClick={onClick}
        aria-label={`Bin — close all windows (${focusCount} open)`}
        title={focusCount > 0 ? `${focusCount} window${focusCount === 1 ? '' : 's'} open` : 'Empty'}
        whileTap={{ scale: 0.88 }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <BinIcon size={BASE_ICON} full={focusCount > 0} />
      </motion.button>
    </motion.div>
  )
}

/* macOS-style Trash icon — authentic Ventura/Sonoma look */
function BinIcon({ size = 44, full }: { size?: number; full?: boolean }) {
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
