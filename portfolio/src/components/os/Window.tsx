'use client'

import * as React from 'react'
import { Rnd } from 'react-rnd'
import { motion, useReducedMotion } from 'framer-motion'
import {
  useWindowStore,
  APP_META,
  type WindowInstance,
} from '@/store/windowStore'
import { getDockIconRect } from './dockRegistry'
import AppIcon from './AppIcons'
import { APP_BY_ID } from './appRegistry'

const HANDLE_BASE: React.CSSProperties = { position: 'absolute' as const }

/* Explicit handle styles — no external react-resizable CSS import needed. */
const RESIZE_HANDLES = {
  top:     { ...HANDLE_BASE, top: -3, left: 6, right: 6, height: 8, cursor: 'ns-resize' },
  right:   { ...HANDLE_BASE, right: -3, top: 6, bottom: 6, width: 8, cursor: 'ew-resize' },
  bottom:  { ...HANDLE_BASE, bottom: -3, left: 6, right: 6, height: 8, cursor: 'ns-resize' },
  left:    { ...HANDLE_BASE, left: -3, top: 6, bottom: 6, width: 8, cursor: 'ew-resize' },
  topRight:     { ...HANDLE_BASE, top: -2, right: -2, width: 14, height: 14, cursor: 'nesw-resize' },
  bottomRight:  { ...HANDLE_BASE, bottom: -2, right: -2, width: 14, height: 14, cursor: 'nwse-resize' },
  bottomLeft:   { ...HANDLE_BASE, bottom: -2, left: -2, width: 14, height: 14, cursor: 'nesw-resize' },
  topLeft:      { ...HANDLE_BASE, top: -2, left: -2, width: 14, height: 14, cursor: 'nwse-resize' },
}

const GENIE_MS = 300

export default function Window({
  win,
  focused,
  children,
}: {
  win: WindowInstance
  focused: boolean
  children: React.ReactNode
}) {
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow)
  const toggleMaximize = useWindowStore((s) => s.toggleMaximize)
  const focusWindow = useWindowStore((s) => s.focusWindow)
  const updatePosition = useWindowStore((s) => s.updatePosition)
  const updateSize = useWindowStore((s) => s.updateSize)

  const reduce = useReducedMotion()
  const innerRef = React.useRef<HTMLDivElement>(null)

  /* Draft geometry keeps drag/resize at 60fps without thrashing the store —
     react-rnd is a controlled component, so it must see live values. */
  const [draftPos, setDraftPos] = React.useState<{ x: number; y: number } | null>(null)
  const [draftSize, setDraftSize] = React.useState<{ width: number; height: number } | null>(null)
  const resizeStart = React.useRef<{ width: number; height: number }>(win.size)

  /* Genie target — set for one frame burst before the window is minimized. */
  const [genie, setGenie] = React.useState<{ x: number; y: number; scale: number } | null>(null)

  const meta = APP_META[win.appType]

  const doMinimize = React.useCallback(() => {
    const rect = innerRef.current?.getBoundingClientRect()
    const dock = getDockIconRect(win.appType)

    if (reduce || !rect || !dock) {
      minimizeWindow(win.id)
      return
    }

    const dx = dock.left + dock.width / 2 - (rect.left + rect.width / 2)
    const dy = dock.top + dock.height / 2 - (rect.top + rect.height / 2)
    const scale = Math.max(dock.width / Math.max(rect.width, 1), 0.05)

    setGenie({ x: dx, y: dy, scale })
    window.setTimeout(() => {
      setGenie(null)
      minimizeWindow(win.id)
    }, GENIE_MS)
  }, [minimizeWindow, win.appType, win.id, reduce])

  /* Arrow keys nudge the window while its title bar has focus. */
  const onTitleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 24 : 6
    const map: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    }
    const delta = map[e.key]
    if (!delta || win.maximized) return
    e.preventDefault()
    updatePosition(win.id, {
      x: Math.max(0, win.position.x + delta[0]),
      y: Math.max(24, win.position.y + delta[1]),
    })
  }

  const iconName = APP_BY_ID[win.appType]?.icon ?? 'finder'

  return (
    <Rnd
      size={draftSize ?? win.size}
      position={draftPos ?? win.position}
      minWidth={meta.minWidth}
      minHeight={meta.minHeight}
      bounds="parent"
      dragHandleClassName="os-drag-handle"
      disableDragging={win.maximized}
      enableResizing={!win.maximized}
      resizeHandleStyles={RESIZE_HANDLES}
      style={{ zIndex: 1000 + win.zIndex }}
      className={`pointer-events-auto${draftPos || draftSize ? ' os-dragging' : ''}`}
      onMouseDown={() => focusWindow(win.id)}
      onDragStart={() => {
        focusWindow(win.id)
        setDraftPos(win.position)
      }}
      onDrag={(_e, d) => setDraftPos({ x: d.x, y: d.y })}
      onDragStop={(_e, d) => {
        setDraftPos(null)
        updatePosition(win.id, { x: d.x, y: d.y })
      }}
      onResizeStart={() => {
        focusWindow(win.id)
        resizeStart.current = win.size
        setDraftSize(win.size)
      }}
      onResize={(_e, _dir, _ref, delta) => {
        setDraftSize({
          width: resizeStart.current.width + delta.width,
          height: resizeStart.current.height + delta.height,
        })
      }}
      onResizeStop={(_e, _dir, _ref, delta, position) => {
        const next = {
          width: resizeStart.current.width + delta.width,
          height: resizeStart.current.height + delta.height,
        }
        setDraftSize(null)
        updateSize(win.id, next)
        updatePosition(win.id, position)
      }}
      aria-label={`${win.title} window`}
    >
      <motion.div
        ref={innerRef}
        className="os-window flex h-full w-full flex-col"
        data-focused={focused}
        initial={reduce ? false : { opacity: 0, scale: 0.94, y: 8 }}
        animate={
          genie
            ? { opacity: 0, scale: genie.scale, x: genie.x, y: genie.y }
            : { opacity: 1, scale: 1, x: 0, y: 0 }
        }
        transition={
          genie
            ? { duration: GENIE_MS / 1000, ease: [0.4, 0, 1, 1] }
            : { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 }
        }
        style={{ transformOrigin: 'center center' }}
      >
        {/* ── Title bar ── */}
        <div
          className="os-window-titlebar os-drag-handle flex shrink-0 cursor-default select-none items-center gap-2 px-3"
          style={{ height: 30 }}
          onDoubleClick={() => toggleMaximize(win.id)}
          onKeyDown={onTitleKeyDown}
          tabIndex={0}
          role="toolbar"
          aria-label={`${win.title} title bar — arrow keys move, double-click to zoom`}
        >
          <div className="os-lights flex items-center gap-2">
            <button
              type="button"
              className="os-light os-light-red os-focusable"
              onClick={() => closeWindow(win.id)}
              aria-label={`Close ${win.title}`}
              title="Close"
            >
              <svg viewBox="0 0 12 12" className="os-light-glyph h-[7px] w-[7px]" aria-hidden="true">
                <path d="M2.4 2.4l7.2 7.2M9.6 2.4l-7.2 7.2" stroke="#5A0A06" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              className="os-light os-light-yellow os-focusable"
              onClick={doMinimize}
              aria-label={`Minimize ${win.title}`}
              title="Minimize"
            >
              <svg viewBox="0 0 12 12" className="os-light-glyph h-[7px] w-[7px]" aria-hidden="true">
                <path d="M2.4 6h7.2" stroke="#5A4306" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              className="os-light os-light-green os-focusable"
              onClick={() => toggleMaximize(win.id)}
              aria-label={`${win.maximized ? 'Restore' : 'Zoom'} ${win.title}`}
              title={win.maximized ? 'Restore' : 'Zoom'}
            >
              <svg viewBox="0 0 12 12" className="os-light-glyph h-[7px] w-[7px]" aria-hidden="true">
                <path d="M3.2 8.8V4.4h4.4M8.8 3.2v4.4H4.4" stroke="#0A5411" strokeWidth="1.4" strokeLinecap="round" fill="none" />
              </svg>
            </button>
          </div>

          <div className="pointer-events-none flex min-w-0 flex-1 items-center justify-center gap-1.5">
            <AppIcon name={iconName} size={14} />
            <span className="truncate text-[12.5px] font-semibold text-[#3C3C43]/90">
              {win.title}
            </span>
          </div>

          {/* Balance the traffic lights so the title stays optically centred */}
          <div className="w-[52px] shrink-0" aria-hidden="true" />
        </div>

        {/* ── Content ──
            data-lenis-prevent keeps Lenis from swallowing wheel events so
            in-window scrolling stays native. */}
        <div className="min-h-0 flex-1 bg-white" data-lenis-prevent>
          {children}
        </div>
      </motion.div>
    </Rnd>
  )
}
