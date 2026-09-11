'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useUiStore } from '@/store/uiStore'
import { MUSIC_TRACKS, useMusicStore } from '@/store/musicStore'

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

  function AirDropIcon({ size = 18 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 16.5a9 9 0 0 1 14 0M8 14a5.5 5.5 0 0 1 8 0M11 11.5a2 2 0 0 1 2 0M4 20a11.5 11.5 0 0 1 16 0" /></svg>
  }

  function StageManagerIcon({ size = 18 }: { size?: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 9h8M8 13h5" /></svg>
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
    <div className="rounded-[16px] bg-white/[0.1] px-3.5 py-3">
      <div className="mb-2 flex items-center gap-2 text-[12px] font-semibold text-white/85">
        {icon}
        <span>{label}</span>
      </div>
      <div className="relative h-[7px]">
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
  const [focus, setFocus] = React.useState(false)
  const [stageManager, setStageManager] = React.useState(false)
  const [now, setNow] = React.useState(() => new Date())
  const brightness = useUiStore((s) => s.brightness)
  const volume = useUiStore((s) => s.volume)
  const wifi = useUiStore((s) => s.wifi)
  const setBrightness = useUiStore((s) => s.setBrightness)
  const setVolume = useUiStore((s) => s.setVolume)
  const toggleWifi = useUiStore((s) => s.toggleWifi)
  const currentIndex = useMusicStore((s) => s.currentIndex)
  const playing = useMusicStore((s) => s.playing)
  const audio = useMusicStore((s) => s.audio)
  const togglePlayback = useMusicStore((s) => s.togglePlayback)
  const nextTrack = useMusicStore((s) => s.nextTrack)
  const track = MUSIC_TRACKS[currentIndex]

  const { resolvedTheme, setTheme } = useTheme()
  const dark = resolvedTheme === 'dark'

  React.useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <motion.div
      role="dialog"
      aria-label="Control Centre"
      className="os-spotlight absolute right-0 top-[calc(100%+6px)] z-[9200] w-[360px] max-w-[calc(100vw-16px)] overflow-hidden p-2.5 text-[13px] text-white"
      initial={{ opacity: 0, y: -6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.96 }}
      transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-[1.15fr_1fr] gap-2">
        <div className="rounded-[17px] bg-white/[0.12] p-2.5">
          <button type="button" onClick={toggleWifi} className="flex w-full items-center gap-2.5 text-left" aria-pressed={wifi}>
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${wifi ? 'bg-[#83a9ff]' : 'bg-white/10 text-white/50'}`}><WifiIcon size={19} /></span>
            <span className="leading-tight"><span className="block font-semibold">Wi-Fi</span><span className="block text-[11px] text-white/55">{wifi ? 'Aritra 5G' : 'Off'}</span></span>
          </button>
          <button type="button" onClick={() => setTheme(dark ? 'light' : 'dark')} className="mt-3 flex w-full items-center gap-2.5 text-left" aria-pressed={dark}>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/80">{dark ? <MoonIcon size={18} /> : <SunIcon size={18} />}</span>
            <span className="leading-tight"><span className="block font-semibold">Appearance</span><span className="block text-[11px] text-white/55">{dark ? 'Dark' : 'Light'}</span></span>
          </button>
          <div className="mt-3 flex items-center gap-2.5 text-white/70">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"><AirDropIcon size={18} /></span>
            <span className="leading-tight"><span className="block font-semibold text-white/80">AirDrop</span><span className="block text-[11px] text-white/45">Off</span></span>
          </div>
        </div>
        <div className="flex min-h-[154px] flex-col items-center justify-center rounded-[17px] bg-white/[0.1]">
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-black/10 shadow-inner">
            <span className="absolute h-1 w-11 origin-left -rotate-[25deg] rounded-full bg-white/30" />
            <span className="absolute h-1 w-9 origin-left rotate-[105deg] rounded-full bg-white/25" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#9b6d61]" />
          </div>
          <span className="mt-1 text-[11px] font-medium text-white/55">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => setFocus((value) => !value)} aria-pressed={focus} className={`os-cc-tile os-press flex min-h-[82px] flex-col items-start justify-between px-3 py-3 ${focus ? 'os-cc-active' : ''}`}>
          <MoonIcon size={18} /><span><span className="block text-[12px] font-semibold">Focus</span><span className="block text-[11px] text-white/50">{focus ? 'On' : 'Off'}</span></span>
        </button>
        <button type="button" onClick={() => setStageManager((value) => !value)} aria-pressed={stageManager} className={`os-cc-tile os-press flex min-h-[82px] flex-col items-start justify-between px-3 py-3 ${stageManager ? 'os-cc-active' : ''}`}>
          <StageManagerIcon size={18} /><span><span className="block text-[12px] font-semibold">Stage Manager</span><span className="block text-[11px] text-white/50">{stageManager ? 'On' : 'Off'}</span></span>
        </button>
      </div>

      <div className="mt-2 flex flex-col gap-2">
        <SliderRow value={brightness} onChange={setBrightness} icon={<SunIcon size={15} />} label="Display" />
        <SliderRow value={volume} onChange={(value) => { setVolume(value); if (audio) audio.volume = value }} icon={<VolumeIcon size={15} muted={volume === 0} />} label="Sound" />
      </div>

      <div className="mt-2 rounded-[10px] bg-white/10 px-3 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg text-white" style={{ background: `linear-gradient(145deg, ${track.accent}, #303038)` }}>♪</div>
          <div className="min-w-0 flex-1"><p className="truncate text-[11px] font-medium">{track.title}</p><p className="truncate text-[10px] text-white/50">{track.artist}</p></div>
          <button type="button" onClick={togglePlayback} aria-label={playing ? 'Pause music' : 'Play music'} className="rounded-full p-1.5 transition hover:bg-white/10">{playing ? <span className="text-xs">❚❚</span> : <span className="text-xs">▶</span>}</button>
          <button type="button" onClick={nextTrack} aria-label="Next song" className="rounded-full p-1.5 transition hover:bg-white/10"><ChevronRightIcon /></button>
        </div>
      </div>

    </motion.div>
  )
}

function ChevronRightIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
}