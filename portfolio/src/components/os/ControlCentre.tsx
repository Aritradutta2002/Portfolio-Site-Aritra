'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useUiStore } from '@/store/uiStore'

/* ── Inline status glyphs (kept local; not part of the app-icon set) ──── */

function WifiIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2.5 8.5a15 15 0 0 1 19 0" />
      <path d="M5.5 12.5a10.5 10.5 0 0 1 13 0" />
      <path d="M8.8 16.3a6 6 0 0 1 6.4 0" />
      <circle cx="12" cy="19.5" r="1" fill="currentColor" />
    </svg>
  )
}

function SunIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

function MoonIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
    </svg>
  )
}

function VolumeIcon({ size = 16, className = '', muted }: { size?: number; className?: string; muted?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      {muted ? (
        <path d="m16 9 5 6M21 9l-5 6" />
      ) : (
        <path d="M16 9.5a4 4 0 0 1 0 5" />
      )}
    </svg>
  )
}

/* ── Slider row helper ─────────────────────────────────────────────────── */

function SliderRow({
  value,
  onChange,
  icon,
  label,
  min = 0,
  max = 1,
  step = 0.02,
}: {
  value: number
  onChange: (v: number) => void
  icon: React.ReactNode
  label: string
  min?: number
  max?: number
  step?: number
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div className="flex items-center gap-3 rounded-[10px] bg-white/10 px-3 py-2.5">
      {icon}
      <div className="relative h-[6px] flex-1">
        <div className="absolute inset-y-0 left-0 w-full rounded-full bg-white/20" />
        <div className="os-slider-fill" style={{ width: `${pct}%` }} />
        <input
          type="range"
          className="os-slider relative"
          aria-label={label}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
      </div>
    </div>
  )
}

/* ── Control Centre ────────────────────────────────────────────────────── */

export default function ControlCentre() {
  const brightness = useUiStore((s) => s.brightness)
  const volume = useUiStore((s) => s.volume)
  const wifi = useUiStore((s) => s.wifi)
  const setBrightness = useUiStore((s) => s.setBrightness)
  const setVolume = useUiStore((s) => s.setVolume)
  const toggleWifi = useUiStore((s) => s.toggleWifi)

  const { resolvedTheme, setTheme } = useTheme()
  const dark = resolvedTheme === 'dark'

  return (
    <motion.div
      role="dialog"
      aria-label="Control Centre"
      className="os-spotlight absolute right-0 top-[calc(100%+6px)] z-[9200] w-72 overflow-hidden p-3 text-[13px] text-white"
      initial={{ opacity: 0, y: -6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.96 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Sliders */}
      <div className="flex flex-col gap-2">
        <SliderRow
          value={brightness}
          onChange={setBrightness}
          icon={<SunIcon size={15} />}
          label="Display brightness"
        />
        <SliderRow
          value={volume}
          onChange={setVolume}
          icon={<VolumeIcon size={15} muted={volume === 0} />}
          label="Volume"
        />
      </div>

      {/* Tiles */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <button
          type="button"
          className={`os-cc-tile os-press flex flex-col items-start justify-between gap-4 px-3 pb-2.5 pt-3 ${wifi ? 'os-cc-active' : ''}`}
          onClick={toggleWifi}
          aria-pressed={wifi}
        >
          <WifiIcon size={17} />
          <span className="os-cc-label text-[11px] font-medium">Wi-Fi</span>
        </button>
        <button
          type="button"
          className={`os-cc-tile os-press flex flex-col items-start justify-between gap-4 px-3 pb-2.5 pt-3 ${dark ? 'os-cc-active' : ''}`}
          onClick={() => setTheme(dark ? 'light' : 'dark')}
          aria-pressed={dark}
        >
          {dark ? <MoonIcon size={17} /> : <SunIcon size={17} />}
          <span className="os-cc-label text-[11px] font-medium">Dark&nbsp;Mode</span>
        </button>
      </div>
    </motion.div>
  )
}