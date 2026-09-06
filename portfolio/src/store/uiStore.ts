'use client'

import { create } from 'zustand'

/* ── UI state — OS chrome toggles independently of the app registry ──────
   brightness / volume are visual + (brightness) real screen dimming,
   wifi & darkToggle are cosmetic Control Centre state, showDock /
   showWidgets are driven by the View menu. */

const MIN_BRIGHTNESS = 0.4

interface UiState {
  brightness: number
  volume: number
  wifi: boolean
  showDock: boolean
  showWidgets: boolean
  setBrightness: (v: number) => void
  setVolume: (v: number) => void
  toggleWifi: () => void
  toggleDock: () => void
  toggleWidgets: () => void
}

export const useUiStore = create<UiState>((set) => ({
  brightness: 1,
  volume: 0.7,
  wifi: true,
  showDock: true,
  showWidgets: true,

  setBrightness: (v) =>
    set({ brightness: Math.max(MIN_BRIGHTNESS, Math.min(1, v)) }),
  setVolume: (v) => set({ volume: Math.max(0, Math.min(1, v)) }),
  toggleWifi: () => set((s) => ({ wifi: !s.wifi })),
  toggleDock: () => set((s) => ({ showDock: !s.showDock })),
  toggleWidgets: () => set((s) => ({ showWidgets: !s.showWidgets })),
}))