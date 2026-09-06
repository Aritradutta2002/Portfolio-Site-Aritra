'use client'

import * as React from 'react'
import photos from '@/content/photos.json'

interface Photo {
  id: string
  title: string
  caption: string
  src: string
  accent: string
  date: string
}

const ALL: Photo[] = [
  ...photos,
  {
    id: 'profile',
    title: 'Aritra Dutta',
    caption: 'The person behind this desk',
    src: '/aritra-profile-picture.png',
    accent: '#8B5CF6',
    date: '2024-01-01',
  },
]

export default function PhotosApp() {
  const [selected, setSelected] = React.useState<number | null>(null)
  const current = selected !== null ? ALL[selected] : null

  const go = (dir: 1 | -1) => {
    setSelected((s) => {
      if (s === null) return s
      return (s + dir + ALL.length) % ALL.length
    })
  }

  /* Arrow-key browsing in the detail view */
  React.useEffect(() => {
    if (selected === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected])

  return (
    <div className="flex h-full w-full flex-col bg-white text-[#1D1D1F]">
      {/* ── Toolbar ── */}
      <div className="flex shrink-0 items-center justify-between border-b border-black/[0.07] bg-[#FAFAFC] px-4 py-2">
        {current ? (
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="os-focusable rounded-md px-2 py-1 text-[12px] font-medium text-[#0A63D6] hover:bg-black/[0.05]"
          >
            ‹ Library
          </button>
        ) : (
          <span className="text-[12px] font-medium text-[#3C3C43]">
            Library — {ALL.length} items
          </span>
        )}
        {current && (
          <span className="text-[11.5px] text-[#86868B]">
            {selected! + 1} of {ALL.length}
          </span>
        )}
      </div>

      {/* ── Detail view ── */}
      {current ? (
        <div className="flex min-h-0 flex-1 flex-col bg-[#1C1C1E]">
          <div className="relative grid min-h-0 flex-1 place-items-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={`${current.title} — ${current.caption}`}
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
              draggable={false}
            />

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="os-focusable absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="os-focusable absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-colors hover:bg-black/65"
            >
              ›
            </button>
          </div>
          <div className="shrink-0 px-4 py-2.5 text-center">
            <p className="text-[12.5px] font-semibold text-white/90">{current.title}</p>
            <p className="text-[11px] text-white/50">{current.caption}</p>
          </div>
        </div>
      ) : (
        /* ── Grid view ── */
        <div className="os-scroll flex-1 overflow-y-auto p-4" data-lenis-prevent>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
            {ALL.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(i)}
                className="os-focusable group overflow-hidden rounded-xl border border-black/[0.06] bg-[#F2F2F5] text-left transition-shadow hover:shadow-lg"
                aria-label={`Open ${p.title}`}
              >
                <span className="block aspect-[16/10] w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                    draggable={false}
                  />
                </span>
                <span className="block px-2.5 py-2">
                  <span className="block truncate text-[12px] font-semibold">{p.title}</span>
                  <span className="block truncate text-[10.5px] text-[#86868B]">{p.caption}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
