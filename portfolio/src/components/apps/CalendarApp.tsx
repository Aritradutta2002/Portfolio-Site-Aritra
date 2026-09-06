'use client'

import * as React from 'react'
import events from '@/content/calendar.json'

/* ── Calendar — month view ─────────────────────────────────────────────────
   Real month grid with prev/next navigation, today highlighted, and career
   milestones pinned to their dates. Clicking a day shows its events. */

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

const KIND_COLOR: Record<string, string> = {
  work: '#0A84FF',
  milestone: '#5E5CE6',
  project: '#30D158',
  life: '#FF9F0A',
  award: '#FF375F',
}

export default function CalendarApp() {
  const today = React.useMemo(() => new Date(), [])
  const [view, setView] = React.useState(() => ({
    y: today.getFullYear(),
    m: today.getMonth(),
  }))
  const [selected, setSelected] = React.useState<string | null>(null)

  const eventsByDate = React.useMemo(() => {
    const map = new Map<string, typeof events>()
    for (const e of events) {
      const list = map.get(e.date) ?? []
      list.push(e)
      map.set(e.date, list)
    }
    return map
  }, [])

  const grid = React.useMemo(() => {
    const first = new Date(view.y, view.m, 1)
    const start = new Date(first)
    start.setDate(1 - first.getDay())
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      return d
    })
  }, [view])

  const isToday = (d: Date) =>
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()

  const inMonth = (d: Date) => d.getMonth() === view.m

  const dateKey = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

  const shift = (delta: number) =>
    setView((v) => {
      const d = new Date(v.y, v.m + delta, 1)
      return { y: d.getFullYear(), m: d.getMonth() }
    })

  const monthLabel = new Date(view.y, view.m, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const selectedEvents = selected ? eventsByDate.get(selected) ?? [] : []

  return (
    <div className="flex h-full w-full flex-col bg-white dark:bg-[#1e1e20] text-[#1D1D1F] dark:text-[#f4f4f6]">
      {/* ── Toolbar ── */}
      <div className="flex shrink-0 items-center justify-between border-b border-black/[0.07] dark:border-white/[0.08] bg-[#FAFAFC] dark:bg-[#252528] px-4 py-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Previous month"
            className="os-focusable grid h-7 w-7 place-items-center rounded-md text-[#0A63D6] dark:text-[#4da3ff] hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Next month"
            className="os-focusable grid h-7 w-7 place-items-center rounded-md text-[#0A63D6] dark:text-[#4da3ff] hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
          >
            ›
          </button>
          <button
            type="button"
            onClick={() => {
              setView({ y: today.getFullYear(), m: today.getMonth() })
              setSelected(dateKey(today))
            }}
            className="os-focusable ml-1 rounded-md border border-black/[0.1] dark:border-white/[0.08] bg-white dark:bg-[#1e1e20] px-2.5 py-1 text-[11.5px] font-medium hover:bg-[#F0F0F3] dark:hover:bg-[#3a3a3e]"
          >
            Today
          </button>
        </div>
        <p className="text-[13.5px] font-semibold">{monthLabel}</p>
      </div>

      {/* ── Month grid ── */}
      <div className="flex min-h-0 flex-1 flex-col px-3 pb-2 pt-2.5">
        <div className="grid shrink-0 grid-cols-7 border-b border-black/[0.07] dark:border-white/[0.08] pb-1.5">
          {DOW.map((d, i) => (
            <span
              key={i}
              className="text-center text-[10.5px] font-semibold uppercase tracking-wide text-[#86868B] dark:text-[#8e8e93]"
            >
              {d}
            </span>
          ))}
        </div>
        <div className="os-scroll grid min-h-0 flex-1 grid-cols-7 grid-rows-6 overflow-y-auto" data-lenis-prevent>
          {grid.map((d, i) => {
            const key = dateKey(d)
            const dayEvents = eventsByDate.get(key)
            const on = selected === key
            const today = isToday(d)
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(key)}
                className="flex flex-col items-center gap-0.5 border-b border-r border-black/[0.04] dark:border-white/[0.08] px-1 pt-1.5 pb-1 text-center transition-colors last:border-r-0 hover:bg-[#F5F5F7] dark:hover:bg-white/[0.06]"
                style={on ? { background: document.documentElement.classList.contains('dark') ? '#1a2d4a' : '#E8F2FF' } : undefined}
                aria-label={`${d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}${dayEvents ? `, ${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}` : ''}`}
              >
                <span
                  className={
                    'grid h-6 w-6 place-items-center rounded-full text-[12px] ' +
                    (today ? 'font-semibold text-white' : inMonth(d) ? 'text-[#1D1D1F] dark:text-[#f4f4f6]' : 'text-[#C7C7CC] dark:text-[#636366]')
                  }
                  style={today ? { background: '#FF453A' } : undefined}
                >
                  {d.getDate()}
                </span>
                <span className="flex items-center gap-0.5">
                  {dayEvents?.slice(0, 3).map((e) => (
                    <span
                      key={e.id}
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: KIND_COLOR[e.kind] ?? '#8E8E93' }}
                    />
                  ))}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Selected day ── */}
      <div className="shrink-0 border-t border-black/[0.07] dark:border-white/[0.08] bg-[#FAFAFC] dark:bg-[#252528] px-4 py-2.5">
        {selected ? (
          selectedEvents.length ? (
            <ul className="space-y-1.5">
              {selectedEvents.map((e) => (
                <li key={e.id} className="flex items-start gap-2.5">
                  <span
                    className="mt-1 h-2.5 w-2.5 shrink-0 rounded-[3px]"
                    style={{ background: KIND_COLOR[e.kind] ?? '#8E8E93' }}
                  />
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-semibold leading-snug">{e.title}</span>
                    <span className="block text-[11px] leading-snug text-[#6E6E73] dark:text-[#8e8e93]">{e.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[12px] text-[#86868B] dark:text-[#8e8e93]">
              {new Date(selected + 'T12:00:00').toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}{' '}
              — no events
            </p>
          )
        ) : (
          <p className="text-[12px] text-[#86868B] dark:text-[#8e8e93]">Select a day to see its events.</p>
        )}
      </div>
    </div>
  )
}
