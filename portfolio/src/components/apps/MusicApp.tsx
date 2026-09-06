'use client'

import * as React from 'react'
import { ChevronRight, Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { MUSIC_TRACKS, useMusicStore } from '@/store/musicStore'
import { useUiStore } from '@/store/uiStore'
import { APPLE_MUSIC_LOGO } from '@/components/os/AppIcons'

function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return '0:00'
  return `${Math.floor(value / 60)}:${Math.floor(value % 60).toString().padStart(2, '0')}`
}

export default function MusicApp() {
  const currentIndex = useMusicStore((s) => s.currentIndex)
  const playing = useMusicStore((s) => s.playing)
  const progress = useMusicStore((s) => s.progress)
  const duration = useMusicStore((s) => s.duration)
  const audio = useMusicStore((s) => s.audio)
  const togglePlayback = useMusicStore((s) => s.togglePlayback)
  const nextTrack = useMusicStore((s) => s.nextTrack)
  const previousTrack = useMusicStore((s) => s.previousTrack)
  const selectTrack = useMusicStore((s) => s.selectTrack)
  const setProgress = useMusicStore((s) => s.setProgress)
  const volume = useUiStore((s) => s.volume)
  const setVolume = useUiStore((s) => s.setVolume)
  const track = MUSIC_TRACKS[currentIndex]

  React.useEffect(() => {
    if (audio) audio.volume = volume
  }, [audio, volume])

  return (
    <div className="grid h-full min-h-0 grid-cols-1 overflow-hidden bg-[#fbfbfd] text-[#1d1d1f] md:grid-cols-[minmax(0,1fr)_300px]">
      <div className="relative flex min-h-0 flex-col overflow-hidden bg-[#242226] px-7 pb-8 pt-7 text-white">
        <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full opacity-70 blur-3xl" style={{ background: track.accent }} />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">Now playing</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Music</h1>
          </div>
          <div className="rounded-2xl bg-white/10 p-2 shadow-lg backdrop-blur-sm">
            <img src={APPLE_MUSIC_LOGO} alt="" width="34" height="34" className="block rounded-lg" />
          </div>
        </div>
        <div className="relative mt-7 flex items-end gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl text-4xl font-semibold text-white shadow-xl" style={{ background: `linear-gradient(145deg, ${track.accent}, #1d1d1f)` }}>
            ♪
          </div>
          <div className="min-w-0 pb-1">
            <p className="truncate text-xl font-semibold">{track.title}</p>
            <p className="truncate text-sm text-white/65">{track.artist} · {track.album}</p>
          </div>
        </div>
        <div className="relative mt-6">
          <input aria-label="Song progress" type="range" min="0" max={duration || 1} step="0.1" value={Math.min(progress, duration || 1)} onChange={(e) => setProgress(Number(e.target.value))} className="h-1.5 w-full accent-white" />
          <div className="mt-1 flex justify-between text-[10px] text-white/45"><span>{formatTime(progress)}</span><span>{formatTime(duration)}</span></div>
        </div>
        <div className="relative mt-auto flex items-center justify-center gap-6 pt-6">
          <button type="button" onClick={previousTrack} aria-label="Previous song" className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"><SkipBack size={18} fill="currentColor" /></button>
          <button type="button" onClick={togglePlayback} aria-label={playing ? 'Pause song' : 'Play song'} className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#242226] shadow-lg transition hover:scale-105">
            {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>
          <button type="button" onClick={nextTrack} aria-label="Next song" className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"><SkipForward size={18} fill="currentColor" /></button>
        </div>
      </div>

      <div className="flex min-h-0 flex-col border-t border-black/[0.08] px-6 py-5 md:border-l md:border-t-0">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Up next</h2>
          <span className="text-[11px] text-black/40">{MUSIC_TRACKS.length} songs</span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
          {MUSIC_TRACKS.map((item, index) => {
            const active = index === currentIndex
            return (
              <button key={item.id} type="button" onClick={() => selectTrack(index)} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${active ? 'bg-black/[0.07]' : 'hover:bg-black/[0.04]'}`}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg text-white" style={{ background: `linear-gradient(145deg, ${item.accent}, #303038)` }}>{active && playing ? '♫' : '♪'}</span>
                <span className="min-w-0 flex-1"><span className={`block truncate text-[13px] font-medium ${active ? 'text-[#d32657]' : ''}`}>{item.title}</span><span className="block truncate text-[11px] text-black/45">{item.artist} · {item.album}</span></span>
                <ChevronRight size={15} className="text-black/20 transition group-hover:translate-x-0.5" />
              </button>
            )
          })}
        </div>
        <div className="mt-4 flex items-center gap-3 border-t border-black/[0.07] pt-4">
          <Volume2 size={15} className="text-black/45" />
          <input aria-label="Music volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => { const value = Number(e.target.value); setVolume(value); if (audio) audio.volume = value }} className="h-1.5 flex-1 accent-[#d32657]" />
          <span className="w-8 text-right text-[11px] text-black/40">{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </div>
  )
}