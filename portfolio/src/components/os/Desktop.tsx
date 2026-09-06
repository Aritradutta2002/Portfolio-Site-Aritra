'use client'

import * as React from 'react'
import { useWindowStore } from '@/store/windowStore'
import AppIcon from './AppIcons'
import { DESKTOP_APPS, type AppDefinition } from './appRegistry'
import { MENU_H } from './MenuBar'

const ICON_W = 84
const ICON_H = 92
const COL_GAP = 4
const ROW_GAP = 6
const EDGE = 12

type Pos = { x: number; y: number }

/** macOS convention: icons stack in columns anchored to the top-right,
    wrapping to a new column toward the left when one fills up. */
function columnLayout(vw: number, vh: number): Pos[] {
  const usable = vh - MENU_H - EDGE - 110 /* dock clearance */
  const maxRows = Math.max(1, Math.floor(usable / (ICON_H + ROW_GAP)))
  let col = 0
  return DESKTOP_APPS.map((_, i) => {
    const row = i % maxRows
    if (i > 0 && row === 0) col++
    return {
      x: vw - EDGE - (col + 1) * ICON_W - col * (ICON_W * 0.18),
      y: MENU_H + EDGE + row * (ICON_H + ROW_GAP),
    }
  })
}

export default function Desktop() {
  const openApp = useWindowStore((s) => s.openApp)
  const [positions, setPositions] = React.useState<Pos[]>(() =>
    columnLayout(
      typeof window !== 'undefined' ? window.innerWidth : 1440,
      typeof window !== 'undefined' ? window.innerHeight : 900
    )
  )
  const [selected, setSelected] = React.useState<string | null>(null)
  const desktopRef = React.useRef<HTMLDivElement>(null)

  /* Re-flow the column on resize so icons never end up off-screen. */
  React.useEffect(() => {
    const onResize = () => {
      setPositions((prev) => {
        const vw = window.innerWidth
        const vh = window.innerHeight
        return prev.map((p) => ({
          x: Math.min(Math.max(p.x, 0), Math.max(vw - ICON_W, 0)),
          y: Math.min(Math.max(p.y, MENU_H), Math.max(vh - ICON_H - 96, MENU_H)),
        }))
      })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const move = React.useCallback((index: number, pos: Pos) => {
    setPositions((prev) => prev.map((p, i) => (i === index ? pos : p)))
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

/* ── Desktop icon ─────────────────────────────────────────────────────── */

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
  const dragState = React.useRef<{ dx: number; dy: number; moved: boolean } | null>(
    null
  )

  const clamp = (x: number, y: number): Pos => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    return {
      x: Math.min(Math.max(x, 0), Math.max(vw - ICON_W, 0)),
      y: Math.min(Math.max(y, MENU_H), Math.max(vh - ICON_H - 96, MENU_H)),
    }
  }

  const onPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    onSelect()
    const rect = e.currentTarget.getBoundingClientRect()
    dragState.current = {
      dx: e.clientX - rect.left,
      dy: e.clientY - rect.top,
      moved: false,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const s = dragState.current
    if (!s) return
    const nx = e.clientX - s.dx
    const ny = e.clientY - s.dy
    if (Math.abs(nx - position.x) > 2 || Math.abs(ny - position.y) > 2) s.moved = true
    onMove(index, clamp(nx, ny))
  }

  const endDrag = (e: React.PointerEvent<HTMLButtonElement>) => {
    dragState.current = null
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <button
      type="button"
      className="os-desktop-icon os-focusable absolute grid place-items-center gap-1 p-1"
      style={{
        left: position.x,
        top: position.y,
        width: ICON_W,
        height: ICON_H,
        touchAction: 'none',
      }}
      data-selected={selected}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onDoubleClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      aria-label={`${app.label} — ${app.description}`}
    >
      <span className="os-desktop-icon-plate grid place-items-center p-1">
        <AppIcon name={app.icon} size={56} />
      </span>
      <span className="os-desktop-icon-label text-center">{app.label}</span>
    </button>
  )
}

export { ICON_W, ICON_H, COL_GAP }
