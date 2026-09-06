'use client'

import { create } from 'zustand'

/* ── App registry ──────────────────────────────────────────────────────────
   Every window is an instance of an appType. `project` carries a payload
   (the project id) so several project windows can coexist. */

export type AppType =
  | 'about'
  | 'experience'
  | 'projects'
  | 'project'
  | 'resume'
  | 'contact'
  | 'terminal'
  | 'photos'
  | 'notes'
  | 'calendar'
  | 'finder'

export interface WindowInstance {
  id: string
  appType: AppType
  title: string
  /** Payload key — e.g. the project id for `project` windows. */
  payload?: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  minimized: boolean
  maximized: boolean
  /** Geometry to restore when un-maximising. */
  restore?: { x: number; y: number; width: number; height: number }
}

interface WindowState {
  windows: WindowInstance[]
  openApp: (appType: AppType, payload?: string) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  toggleMaximize: (id: string) => void
  updatePosition: (id: string, position: { x: number; y: number }) => void
  updateSize: (id: string, size: { width: number; height: number }) => void
  closeAll: () => void
}

/* ── Per-app defaults ─────────────────────────────────────────────────── */

const MENU_BAR_H = 28
const DOCK_H = 96

export const APP_META: Record<AppType, { title: string; width: number; height: number; minWidth: number; minHeight: number }> = {
  about:      { title: 'About',        width: 620,  height: 560, minWidth: 380, minHeight: 320 },
  experience: { title: 'Experience',   width: 860,  height: 560, minWidth: 520, minHeight: 340 },
  projects:   { title: 'Projects',     width: 620,  height: 450, minWidth: 380, minHeight: 300 },
  project:    { title: 'Project',      width: 700,  height: 560, minWidth: 400, minHeight: 320 },
  resume:     { title: 'Resume',       width: 780,  height: 700, minWidth: 420, minHeight: 400 },
  contact:    { title: 'Contact',      width: 600,  height: 520, minWidth: 380, minHeight: 400 },
  terminal:   { title: 'Terminal',     width: 680,  height: 420, minWidth: 360, minHeight: 240 },
  photos:     { title: 'Photos',       width: 820,  height: 580, minWidth: 460, minHeight: 340 },
  notes:      { title: 'Notes',        width: 760,  height: 540, minWidth: 460, minHeight: 340 },
  calendar:   { title: 'Calendar',     width: 720,  height: 560, minWidth: 420, minHeight: 360 },
  finder:     { title: 'Finder',       width: 780,  height: 520, minWidth: 480, minHeight: 340 },
}

const CASCADE = 28

/** Centres the first window, then cascades each subsequent one. */
function nextPosition(index: number, width: number, height: number) {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
  const vh = typeof window !== 'undefined' ? window.innerHeight : 900

  const usableTop = MENU_BAR_H
  const usableHeight = Math.max(vh - MENU_BAR_H - DOCK_H, 320)

  const w = Math.min(width, Math.max(vw - 48, 320))
  const h = Math.min(height, usableHeight)

  const baseX = (vw - w) / 2
  const baseY = usableTop + Math.max((usableHeight - h) / 2, 8)

  const step = index % 6
  return {
    x: Math.max(12, Math.round(baseX - step * CASCADE + step * 6)),
    y: Math.max(usableTop + 8, Math.round(baseY + step * CASCADE)),
    width: w,
    height: h,
  }
}

let seq = 0
const uid = (appType: AppType, payload?: string) =>
  `${appType}${payload ? `-${payload}` : ''}-${++seq}`

export const useWindowStore = create<WindowState>((set, get) => ({
  windows: [],

  openApp: (appType, payload) => {
    const { windows } = get()

    /* Focus an existing window of the same app + payload instead of
       spawning a duplicate. */
    const existing = windows.find(
      (w) => w.appType === appType && w.payload === payload
    )
    if (existing) {
      get().focusWindow(existing.id)
      if (existing.minimized) get().restoreWindow(existing.id)
      return
    }

    const meta = APP_META[appType]
    const box = nextPosition(windows.length, meta.width, meta.height)
    const maxZ = windows.reduce((m, w) => Math.max(m, w.zIndex), 0)

    const title =
      appType === 'project' && payload
        ? `${payload.charAt(0).toUpperCase()}${payload.slice(1)}`
        : meta.title

    set({
      windows: [
        ...windows,
        {
          id: uid(appType, payload),
          appType,
          title,
          payload,
          position: { x: box.x, y: box.y },
          size: { width: box.width, height: box.height },
          zIndex: maxZ + 1,
          minimized: false,
          maximized: false,
        },
      ],
    })
  },

  closeWindow: (id) =>
    set((s) => ({ windows: s.windows.filter((w) => w.id !== id) })),

  focusWindow: (id) =>
    set((s) => {
      const maxZ = s.windows.reduce((m, w) => Math.max(m, w.zIndex), 0)
      const target = s.windows.find((w) => w.id === id)
      if (!target || (target.zIndex === maxZ && !target.minimized)) return s
      return {
        windows: s.windows.map((w) =>
          w.id === id ? { ...w, zIndex: maxZ + 1, minimized: false } : w
        ),
      }
    }),

  minimizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    })),

  restoreWindow: (id) =>
    set((s) => {
      const maxZ = s.windows.reduce((m, w) => Math.max(m, w.zIndex), 0)
      return {
        windows: s.windows.map((w) =>
          w.id === id ? { ...w, minimized: false, zIndex: maxZ + 1 } : w
        ),
      }
    }),

  toggleMaximize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => {
        if (w.id !== id) return w
        if (w.maximized && w.restore) {
          const { x, y, width, height } = w.restore
          return {
            ...w,
            maximized: false,
            restore: undefined,
            position: { x, y },
            size: { width, height },
          }
        }
        const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
        const vh = typeof window !== 'undefined' ? window.innerHeight : 900
        return {
          ...w,
          maximized: true,
          restore: { x: w.position.x, y: w.position.y, width: w.size.width, height: w.size.height },
          position: { x: 0, y: MENU_BAR_H },
          size: { width: vw, height: vh - MENU_BAR_H },
        }
      }),
    })),

  updatePosition: (id, position) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, position } : w)),
    })),

  updateSize: (id, size) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    })),

  closeAll: () => set({ windows: [] }),
}))

/** The focused window = highest zIndex among non-minimized windows. */
export function selectFocused(windows: WindowInstance[]): WindowInstance | undefined {
  return windows
    .filter((w) => !w.minimized)
    .reduce<WindowInstance | undefined>(
      (best, w) => (!best || w.zIndex > best.zIndex ? w : best),
      undefined
    )
}
