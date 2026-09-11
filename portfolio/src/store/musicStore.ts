'use client'

import { create } from 'zustand'

export interface MusicTrack {
  id: string
  title: string
  artist: string
  album: string
  accent: string
  audioUrl: string
}

/* Files supplied in public/music. Keep filenames URL-encoded so spaces and
   punctuation remain valid when served by Next.js. */
export const MUSIC_TRACKS: MusicTrack[] = [
  { id: 'justin-bieber-love-yourself', title: 'Love Yourself', artist: 'Justin Bieber', album: 'Purpose', accent: '#f36b8a', audioUrl: '/music/Justin_Biber_-_Love_yourself_(mp3.pm).mp3' },
  { id: 'ed-sheeran-perfect', title: 'Perfect', artist: 'Ed Sheeran', album: 'Divide', accent: '#d69a6a', audioUrl: '/music/Edd_Sheeran_-_Perfect_(mp3.pm).mp3' },
  { id: 'maroon-5-payphone', title: 'Payphone', artist: 'Maroon 5 feat. Wiz Khalifa', album: 'Overexposed', accent: '#e87c54', audioUrl: '/music/Maroon_5_Feat._Wiz_Khalifa_-_Payphone_(mp3.pm).mp3' },
  { id: 'alan-walker-ava-max-alone', title: 'Alone, Pt. II', artist: 'Alan Walker & Ava Max', album: 'Live at Chateau de Fontainebleau', accent: '#54b8bd', audioUrl: '/music/Alan_Walker_Ava_Max_-_Alone_Pt._II_Live_at_Chteau_de_Fontainebleau_Live_at_Chteau_de_Fontainebl_(mp3.pm).mp3' },
]

interface MusicState {
  currentIndex: number
  playing: boolean
  progress: number
  duration: number
  audio: HTMLAudioElement | null
  selectTrack: (index: number, autoPlay?: boolean) => void
  togglePlayback: () => void
  nextTrack: () => void
  previousTrack: () => void
  setProgress: (value: number) => void
  setDuration: (value: number) => void
}

export const useMusicStore = create<MusicState>((set, get) => ({
  currentIndex: 0,
  playing: false,
  progress: 0,
  duration: 0,
  audio: null,

  selectTrack: (index, autoPlay = true) => {
    const track = MUSIC_TRACKS[index]
    if (!track || typeof Audio === 'undefined') return
    const previous = get().audio
    previous?.pause()
    const audio = new Audio(track.audioUrl)
    audio.volume = 0.7
    audio.preload = 'metadata'
    audio.ontimeupdate = () => set({ progress: audio.currentTime })
    audio.onloadedmetadata = () => set({ duration: audio.duration })
    audio.onended = () => {
      const next = (get().currentIndex + 1) % MUSIC_TRACKS.length
      get().selectTrack(next)
    }
    set({ currentIndex: index, audio, progress: 0, duration: 0, playing: false })
    if (autoPlay) {
      void audio.play().then(() => set({ playing: true })).catch(() => set({ playing: false }))
    }
  },

  togglePlayback: () => {
    const { audio } = get()
    if (!audio) {
      get().selectTrack(get().currentIndex)
      return
    }
    if (audio.paused) {
      void audio.play().then(() => set({ playing: true })).catch(() => set({ playing: false }))
    } else {
      audio.pause()
      set({ playing: false })
    }
  },

  nextTrack: () => get().selectTrack((get().currentIndex + 1) % MUSIC_TRACKS.length),
  previousTrack: () => {
    const { audio, currentIndex } = get()
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }
    get().selectTrack((currentIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length)
  },
  setProgress: (value) => {
    const audio = get().audio
    if (audio) audio.currentTime = value
    set({ progress: value })
  },
  setDuration: (value) => set({ duration: value }),
}))