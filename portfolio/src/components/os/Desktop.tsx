'use client'

import * as React from 'react'
import { useWindowStore } from '@/store/windowStore'
import AppIcon from './AppIcons'
import { DESKTOP_APPS, type AppDefinition } from './appRegistry'
import { MENU_H } from './MenuBar'

const ICON_W = 68
const ICON_H = 82
const ROW_GAP = 8
const EDGE = 16
const DRAG_THRESHOLD = 4
const COLUMN_GAP = 16

/* Grid cell size — icons snap to this grid on drop */
const GRID_COL = ICON_W + COLUMN_GAP
const GRID_ROW = ICON_H + ROW_GAP

type Pos = { x: number; y: number }

/** macOS convention: icons stack in columns anchored to the top-right,
    wrapping to a new column toward the left when one fills up. */
function columnLayout(vw: number, vh: number): Pos[] {
  const usable = vh - MENU_H - EDGE - 110 /* dock clearance */
  const maxRows = Math.max(1, Math.floor(usable / GRID_ROW))
  let col = 0
  return DESKTOP_APPS.map((_, i) => {
    const row = i % maxRows
    if (i > 0 && row === 0) col++
    return {
      x: vw - EDGE - (col + 1) * ICON_W - col * COLUMN_GAP,
      y: MENU_H + EDGE + row * GRID_ROW,
    }
  })
}

function clampPos(x: number, y: number): Pos {
  const vw = window.innerWidth
  const vh = window.innerHeight
  return {
    x: Math.min(Math.max(x, 0), Math.max(vw - ICON_W, 0)),
    y: Math.min(Math.max(y, MENU_H + 4), Math.max(vh - ICON_H - 96, MENU_H + 4)),
  }
}

/** Snap a free position to the nearest grid cell. */
function snapToGrid(x: number, y: number): Pos {
  /* Find the nearest column origin from the right edge */
  const snappedX = Math.round((x - EDGE) / GRID_COL) * GRID_COL + EDGE
  const snappedY = Math.round((y - MENU_H - EDGE) / GRID_ROW) * GRID_ROW + MENU_H + EDGE
  return clampPos(snappedX, snappedY)
}

export default function Desktop() {
  const openApp = useWindowStore((s) => s.openApp)

  /* Always start from the clean column layout — never restore saved positions.
     This ensures icons are always properly aligned on every page load. */
  const [positions, setPositions] = React.useState<Pos[]>(() => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
    const vh = typeof window !== 'undefined' ? window.innerHeight : 900
    return columnLayout(vw, vh)
  })
  const [selected, setSelected] = React.useState<string | null>(null)
  const desktopRef = React.useRef<HTMLDivElement>(null)

  /* Re-flow the column on resize so icons never end up off-screen. */
  React.useEffect(() => {
    const onResize = () => {
      /* On resize, recalculate the full layout from scratch */
      setPositions(columnLayout(window.innerWidth, window.innerHeight))
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const move = React.useCallback((index: number, pos: Pos) => {
    /* Snap to grid on drop */
    const snapped = snapToGrid(pos.x, pos.y)
    setPositions((prev) => prev.map((p, i) => (i === index ? snapped : p)))
  }, [])

  /* Clicking bare desktop clears the selection. */
  const onBackgroundPointerDown = (e: React.PointerEvent) => {
    if (e.target === desktopRef.current) setSelected(null)
  }

  return (
    <div
      ref={desktopRef}
      className="absolute inset-0"
      onPointerDown={onBackgroundPointerDown}
    >
      {DESKTOP_APPS.map((app, i) => (
        <DesktopIcon
          key={app.id}
          app={app}
          index={i}
          position={positions[i]}
          selected={selected === app.id}
          onSelect={() => setSelected(app.id)}
          onMove={move}
          onOpen={() => openApp(app.id as never)}
        />
      ))}
    </div>
  )
}

/* ── Desktop icon ───────────────────────────────────────────────────────
   Ultra-smooth drag: during the gesture we mutate only the element's
   `transform` (GPU-composited, rAF-throttled) — zero React re-renders.
   The committed position is written to state once, on pointer-up. */

type DragState = {
  pointerId: number
  startX: number
  startY: number
  originX: number
  originY: number
  dx: number
  dy: number
  fx: number
  fy: number
  moved: boolean
  raf: number
}

function DesktopIcon({
  app,
  index,
  position,
  selected,
  onSelect,
  onMove,
  onOpen,
}: {
  app: AppDefinition
  index: number
  position: Pos
  selected: boolean
  onSelect: () => void
  onMove: (index: number, pos: Pos) => void
  onOpen: () => void
}) {
  const elRef = React.useRef<HTMLButtonElement>(null)
  const drag = React.useRef<DragState | null>(null)
  const suppressClickUntil = React.useRef(0)
  const [dragging, setDragging] = React.useState(false)

  const applyTransform = React.useCallback(() => {
    const d = drag.current
    const el = elRef.current
    if (!d || !el) return
    d.raf = 0
    const nx = d.originX + d.dx
    const ny = d.originY + d.dy
    const c = clampPos(nx, ny)
    d.fx = c.x
    d.fy = c.y
    // Base layout stays at left/top; only the composited transform moves.
    el.style.transform = `translate3d(${c.x - d.originX}px, ${c.y - d.originY}px, 0) scale(1.08)`
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.isPrimary === false) return
    if (e.pointerType === 'mouse' && e.button !== 0) return
    onSelect()
    drag.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: position.x,
      originY: position.y,
      dx: 0,
      dy: 0,
      fx: position.x,
      fy: position.y,
      moved: false,
      raf: 0,
    }
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* pointer capture unavailable — drag still works via move/up */
    }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current
    if (!d || e.pointerId !== d.pointerId) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (!d.moved) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return
      d.moved = true
      setDragging(true)
      document.body.classList.add('os-dragging')
      const el = elRef.current
      if (el) {
        el.style.zIndex = '60'
        el.style.willChange = 'transform'
      }
    }
    d.dx = dx
    d.dy = dy
    if (d.raf) return
    d.raf = requestAnimationFrame(applyTransform)
  }

  const endDrag = (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = drag.current
    if (!d || e.pointerId !== d.pointerId) return
    if (d.raf) cancelAnimationFrame(d.raf)
    drag.current = null
    document.body.classList.remove('os-dragging')
    const el = elRef.current
    if (el) {
      el.style.transform = ''
      el.style.zIndex = ''
      el.style.willChange = ''
    }
    setDragging((was) => {
      if (was && d.moved) suppressClickUntil.current = Date.now() + 250
      return false
    })
    if (d.moved) {
      const c = clampPos(d.fx, d.fy)
      onMove(index, c)
    }
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId)
      } catch {
        /* already released */
      }
    }
  }

  const onDoubleClick = (e: React.MouseEvent) => {
    if (Date.now() < suppressClickUntil.current) {
      e.preventDefault()
      return
    }
    onOpen()
  }

  const onClick = (e: React.MouseEvent) => {
    // A drag release must not trigger click behaviours.
    if (Date.now() < suppressClickUntil.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <button
      ref={elRef}
      type="button"
      className="os-desktop-icon os-focusable absolute grid place-items-center gap-1 p-1 select-none"
      style={{
        left: position.x,
        top: position.y,
        width: ICON_W,
        height: ICON_H,
        touchAction: 'none',
        transition: dragging ? 'none' : 'transform 180ms cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: dragging ? 'transform' : undefined,
        cursor: dragging ? 'grabbing' : 'default',
      }}
      data-selected={selected}
      data-dragging={dragging}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
          return
        }
        const map: Record<string, Pos> = {
          ArrowLeft:  { x: position.x - GRID_COL, y: position.y },
          ArrowRight: { x: position.x + GRID_COL, y: position.y },
          ArrowUp:    { x: position.x, y: position.y - GRID_ROW },
          ArrowDown:  { x: position.x, y: position.y + GRID_ROW },
        }
        const next = map[e.key]
        if (next) {
          e.preventDefault()
          onMove(index, next)
        }
      }}
      aria-label={`${app.label} — ${app.description}. Drag to move, double-click to open, arrow keys to nudge.`}
    >
      <span className="os-desktop-icon-plate grid place-items-center">
        <AppIcon name={app.icon} size={52} />
      </span>
      <span className="os-desktop-icon-label text-center">{app.label}</span>
    </button>
  )
}

export { ICON_W, ICON_H }
