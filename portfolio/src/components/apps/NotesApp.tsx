'use client'

import * as React from 'react'
import about from '@/content/about.json'

/* ── Notes ────────────────────────────────────────────────────────────────
   A real, editable notes app: two panes, autosaves to localStorage per
   window, and seeds itself with useful content on first run. */

interface Note {
  id: string
  title: string
  body: string
  updatedAt: number
}

const STORAGE_KEY = 'os-notes-v1'

function seed(): Note[] {
  const now = Date.now()
  return [
    {
      id: 'welcome',
      title: 'Welcome to Notes',
      body:
        'This is a real notepad — everything you type is saved in this browser.\n\n' +
        'Try the Terminal app next: type `help` and press Enter.',
      updatedAt: now,
    },
    {
      id: 'quick-facts',
      title: 'Quick facts',
      body:
        `${about.name}\n${about.title}\n${about.company} — ${about.location}\n\n` +
        `Open windows: ⌘K opens Spotlight. Esc closes the front window. ` +
        'Double-click a window title bar to zoom it.',
      updatedAt: now - 1,
    },
  ]
}

function load(): Note[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return seed()
    const parsed = JSON.parse(raw) as Note[]
    return Array.isArray(parsed) && parsed.length ? parsed : seed()
  } catch {
    return seed()
  }
}

const fmt = (ts: number) =>
  new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

export default function NotesApp() {
  const [notes, setNotes] = React.useState<Note[]>([])
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [ready, setReady] = React.useState(false)

  /* Hydrate from localStorage after mount — never during SSR. */
  React.useEffect(() => {
    const n = load()
    setNotes(n)
    setActiveId(n[0]?.id ?? null)
    setReady(true)
  }, [])

  const active = notes.find((n) => n.id === activeId) ?? null

  const persist = React.useCallback((next: Note[]) => {
    setNotes(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* storage unavailable (private mode) — keep working in memory */
    }
  }, [])

  const patch = (id: string, changes: Partial<Pick<Note, 'title' | 'body'>>) => {
    persist(
      notes.map((n) =>
        n.id === id ? { ...n, ...changes, updatedAt: Date.now() } : n
      )
    )
  }

  const addNote = () => {
    const note: Note = { id: `n-${Date.now()}`, title: 'New Note', body: '', updatedAt: Date.now() }
    persist([note, ...notes])
    setActiveId(note.id)
  }

  const deleteNote = (id: string) => {
    const next = notes.filter((n) => n.id !== id)
    persist(next)
    if (activeId === id) setActiveId(next[0]?.id ?? null)
  }

  const sorted = React.useMemo(
    () => [...notes].sort((a, b) => b.updatedAt - a.updatedAt),
    [notes]
  )

  if (!ready) {
    return <div className="h-full w-full bg-[#FFFDF5] dark:bg-[#252528]" />
  }

  return (
    <div className="flex h-full w-full bg-[#FFFDF5] dark:bg-[#252528] text-[#1D1D1F] dark:text-[#f4f4f6]">
      {/* ── Note list ── */}
      <div className="flex w-[38%] min-w-[170px] max-w-[280px] shrink-0 flex-col border-r border-black/[0.08] dark:border-white/[0.08] bg-[#F7F5EE] dark:bg-[#252528]">
        <div className="flex shrink-0 items-center justify-between border-b border-black/[0.07] dark:border-white/[0.08] px-3 py-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#86868B] dark:text-[#8e8e93]">
            Notes
          </span>
          <button
            type="button"
            onClick={addNote}
            className="os-focusable grid h-6 w-6 place-items-center rounded-md text-[15px] font-medium text-[#B25800] dark:text-[#f5a623] hover:bg-black/[0.06] dark:hover:bg-white/[0.08]"
            aria-label="New note"
            title="New note"
          >
            +
          </button>
        </div>
        <div className="os-scroll min-h-0 flex-1 overflow-y-auto py-1" data-lenis-prevent>
          {sorted.map((n) => {
            const on = n.id === activeId
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setActiveId(n.id)}
                className={`os-focusable block w-full px-3 py-2 text-left transition-colors ${on ? 'bg-[#F5E9CF] dark:bg-[#332d1a]' : ''}`}
                onMouseEnter={(e) => {
                  if (!on) e.currentTarget.style.background = document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
                }}
                onMouseLeave={(e) => {
                  if (!on) e.currentTarget.style.background = 'transparent'
                }}
              >
                <span className="block truncate text-[12.5px] font-semibold">
                  {n.title || 'Untitled'}
                </span>
                <span className="mt-0.5 flex items-baseline justify-between gap-2">
                  <span className="truncate text-[11px] text-[#86868B] dark:text-[#8e8e93]">
                    {n.body.split('\n')[0] || 'No additional text'}
                  </span>
                  <span className="shrink-0 text-[10px] text-[#A1A1A6] dark:text-[#636366]">{fmt(n.updatedAt)}</span>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Editor ── */}
      {active ? (
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex shrink-0 items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] px-4 pt-3 pb-2">
            <input
              value={active.title}
              onChange={(e) => patch(active.id, { title: e.target.value })}
              placeholder="Title"
              aria-label="Note title"
              className="w-full bg-transparent text-[15px] font-semibold outline-none placeholder:text-[#C7C7CC] dark:placeholder:text-[#636366]"
            />
            <button
              type="button"
              onClick={() => deleteNote(active.id)}
              className="os-focusable ml-2 shrink-0 rounded-md px-2 py-1 text-[11px] font-medium text-[#C0392B] hover:bg-[#C0392B]/10"
              aria-label="Delete note"
            >
              Delete
            </button>
          </div>
          <p className="shrink-0 px-4 pt-1 text-[10.5px] text-[#A1A1A6] dark:text-[#636366]">
            {new Date(active.updatedAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </p>
          <textarea
            value={active.body}
            onChange={(e) => patch(active.id, { body: e.target.value })}
            placeholder="Start writing…"
            aria-label="Note body"
            spellCheck={false}
            className="os-scroll min-h-0 flex-1 resize-none bg-transparent px-4 pb-4 pt-2 text-[13px] leading-[1.65] outline-none placeholder:text-[#C7C7CC] dark:placeholder:text-[#636366]"
            data-lenis-prevent
          />
        </div>
      ) : (
        <div className="grid flex-1 place-items-center">
          <div className="text-center">
            <p className="text-[13px] text-[#86868B] dark:text-[#8e8e93]">No note selected</p>
            <button
              type="button"
              onClick={addNote}
              className="os-focusable mt-2 rounded-lg bg-[#B25800] px-4 py-1.5 text-[12px] font-semibold text-white hover:opacity-90"
            >
              Create a note
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
