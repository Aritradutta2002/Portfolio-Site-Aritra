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

/* macOS-style Trash icon — faithful to the Sonoma/Ventura dock Trash:
   a translucent wire-mesh drum with an overhanging lid and handle.
   `full` lifts the lid slightly and peeks crumpled paper out, like macOS. */
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
      <defs>
        {/* Lid — bright brushed silver */}
        <linearGradient id="bin-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={full ? '#F2F2F5' : '#E9E9EE'} />
          <stop offset="55%" stopColor={full ? '#C9C9D0' : '#C3C3CB'} />
          <stop offset="100%" stopColor={full ? '#A7A7B0' : '#9E9EA8'} />
        </linearGradient>
        {/* Body — translucent silver drum */}
        <linearGradient id="bin-body" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(148,148,158,0.92)" />
          <stop offset="18%" stopColor="rgba(214,214,222,0.85)" />
          <stop offset="50%" stopColor="rgba(176,176,186,0.80)" />
          <stop offset="82%" stopColor="rgba(205,205,214,0.85)" />
          <stop offset="100%" stopColor="rgba(138,138,148,0.92)" />
        </linearGradient>
        {/* Top inner shadow under the lid */}
        <linearGradient id="bin-topshade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(40,40,48,0.35)" />
          <stop offset="100%" stopColor="rgba(40,40,48,0)" />
        </linearGradient>
      </defs>

      {/* ── Crumpled paper (only when full) — peeks above the lid ── */}
      {full && (
        <g>
          <circle cx="24.5" cy="19.5" r="5.2" fill="#F7F7F9" />
          <circle cx="33" cy="17.5" r="5.8" fill="#FFFFFF" />
          <circle cx="40.5" cy="19.8" r="4.8" fill="#EFEFF3" />
          {/* Crease hints */}
          <path d="M29.5 15.5l3 2.5-2.4 2.6" fill="none" stroke="rgba(120,120,130,0.4)" strokeWidth="0.9" strokeLinecap="round" />
          <path d="M22.5 18.5l2.6 1.6-.9 2.3" fill="none" stroke="rgba(120,120,130,0.35)" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      )}

      {/* ── Handle knob on the lid ── */}
      <path
        d="M27.4 10.5h9.2a2.2 2.2 0 0 1 2.2 2.2v3.1a1.4 1.4 0 0 1-1.4 1.4H26.6a1.4 1.4 0 0 1-1.4-1.4v-3.1a2.2 2.2 0 0 1 2.2-2.2Z"
        fill="url(#bin-lid)"
        stroke="rgba(60,60,70,0.35)"
        strokeWidth="0.7"
      />
      <rect x="26.4" y="11.6" width="11.2" height="1.6" rx="0.8" fill="rgba(255,255,255,0.55)" />

      {/* ── Lid — overhangs the body like the real icon ── */}
      <rect x="11.5" y="16.6" width="41" height="6" rx="3" fill="url(#bin-lid)" stroke="rgba(60,60,70,0.35)" strokeWidth="0.7" />
      <rect x="13" y="17.7" width="38" height="1.7" rx="0.85" fill="rgba(255,255,255,0.6)" />
      <rect x="13" y="21.2" width="38" height="1" rx="0.5" fill="rgba(70,70,80,0.18)" />

      {/* ── Body — slightly tapered drum with rounded bottom ── */}
      <path
        d="M15.5 25.5h33l-2.1 26.2a4.6 4.6 0 0 1-4.59 4.3H22.19a4.6 4.6 0 0 1-4.59-4.3L15.5 25.5Z"
        fill="url(#bin-body)"
        stroke="rgba(55,55,65,0.38)"
        strokeWidth="0.8"
      />
      {/* Under-lid shadow */}
      <path d="M15.5 25.5h33l-.45 5.6H15.95l-.45-5.6Z" fill="url(#bin-topshade)" />

      {/* ── Wire-mesh vertical ribs ── */}
      <g strokeLinecap="round">
        <path d="M22.6 32.5 23.6 51" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" />
        <path d="M27.3 32.5 27.9 52.5" stroke="rgba(90,90,100,0.42)" strokeWidth="1.4" />
        <path d="M32 32.5V53" stroke="rgba(90,90,100,0.42)" strokeWidth="1.4" />
        <path d="M36.7 32.5 36.1 52.5" stroke="rgba(90,90,100,0.42)" strokeWidth="1.4" />
        <path d="M41.4 32.5 40.4 51" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
      </g>
      {/* Horizontal mesh hint */}
      <path d="M16.6 38.5h30.8M17.4 45h29.2" stroke="rgba(90,90,100,0.20)" strokeWidth="1.1" strokeLinecap="round" />

      {/* Glass sheen down the front */}
      <path d="M20 27.5 21.4 51" stroke="rgba(255,255,255,0.35)" strokeWidth="3.2" strokeLinecap="round" opacity="0.5" />
    </svg>
  )
}
