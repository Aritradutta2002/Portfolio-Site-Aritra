'use client'

import * as React from 'react'
import events from '@/content/calendar.json'
import { useWindowStore } from '@/store/windowStore'

/* ── macOS-style desktop widgets (Sonoma-style glass cards) ──────────────
   Anchored top-left so they never fight the desktop icon column on the
   right. All vector — crisp at any display density. */

const W = 158
const GAP = 14

function useNow(intervalMs = 1000) {
  const [now, setNow] = React.useState<Date | null>(null)
  React.useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), intervalMs)
    return () => clearInterval(t)
  }, [intervalMs])
  return now
}

/* ── Calendar widget ─────────────────────────────────────────────────────── */

function CalendarWidget() {
  const now = useNow(30_000)

  const nextEvent = React.useMemo(() => {
    if (!now) return null
    const future = events
      .filter((e) => new Date(e.date + 'T23:59:59') >= now)
      .sort((a, b) => a.date.localeCompare(b.date))
    return future[0] ?? events[events.length - 1] ?? null
  }, [now])

  if (!now) return <WidgetSkeleton />

  const dow = now.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
  const day = now.getDate()

  return (
    <div className="os-widget p-3.5" style={{ width: W, height: W }} aria-label="Calendar widget">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#FF6961]">{dow}</p>
          <p className="-mt-0.5 text-[34px] font-light leading-none text-white">{day}</p>
        </div>
        <span className="mt-1 h-2 w-2 rounded-full bg-[#FF453A]" aria-hidden="true" />
      </div>
      {nextEvent && (
        <div className="mt-2.5 border-t border-white/12 pt-2">
          <p className="truncate text-[11px] font-semibold text-white/90">{nextEvent.title}</p>
          <p className="truncate text-[10.5px] text-white/55">
            {new Date(nextEvent.date + 'T12:00:00').toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
      )}
    </div>
  )
}

/* ── Clock widget (analog, live) ─────────────────────────────────────────── */

function ClockWidget() {
  const now = useNow(1000)

  const h = now ? now.getHours() % 12 : 0
  const m = now ? now.getMinutes() : 0
  const s = now ? now.getSeconds() : 0
  const hAng = (h + m / 60) * 30
  const mAng = (m + s / 60) * 6
  const sAng = s * 6

  return (
    <div className="os-widget grid place-items-center p-4" style={{ width: W, height: W }} aria-label="Clock widget">
      <svg viewBox="0 0 100 100" width="112" height="112" shapeRendering="geometricPrecision">
        {/* Face */}
        <circle cx="50" cy="50" r="46" fill="#FFFFFF" />
        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
        {/* Minute ticks */}
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i * 6 * Math.PI) / 180
          const isHour = i % 5 === 0
          const r1 = isHour ? 36 : 40.5
          const r2 = 43
          return (
            <line
              key={i}
              x1={50 + r1 * Math.sin(a)}
              y1={50 - r1 * Math.cos(a)}
              x2={50 + r2 * Math.sin(a)}
              y2={50 - r2 * Math.cos(a)}
              stroke={isHour ? '#1D1D1F' : '#C7C7CC'}
              strokeWidth={isHour ? 2.4 : 1.1}
              strokeLinecap="round"
            />
          )
        })}
        {/* Hands */}
        <g transform={`rotate(${hAng} 50 50)`}>
          <rect x="48" y="26" width="4" height="27" rx="2" fill="#1D1D1F" />
        </g>
        <g transform={`rotate(${mAng} 50 50)`}>
          <rect x="48.6" y="15" width="2.8" height="38" rx="1.4" fill="#1D1D1F" />
        </g>
        <g transform={`rotate(${sAng} 50 50)`}>
          <rect x="49.3" y="13" width="1.4" height="44" rx="0.7" fill="#FF453A" />
        </g>
        <circle cx="50" cy="50" r="3" fill="#1D1D1F" />
        <circle cx="50" cy="50" r="1.4" fill="#FF453A" />
      </svg>
    </div>
  )
}

/* ── Stats widget ────────────────────────────────────────────────────────── */

function StatsWidget() {
  const windows = useWindowCount()
  return (
    <div className="os-widget p-3.5" style={{ width: W, height: W }} aria-label="Stats widget">
      <p className="text-[10.5px] font-semibold uppercase tracking-wide text-white/50">
        Competitive
      </p>
      <p className="mt-1 text-[26px] font-light leading-none text-white">
        700<span className="text-[16px] text-white/60">+</span>
      </p>
      <p className="text-[10.5px] text-white/55">problems solved</p>
      <div className="mt-2.5 border-t border-white/12 pt-2">
        <p className="text-[10.5px] text-white/55">
          LeetCode <span className="font-semibold text-[#2DD4BF]">1672</span> · CodeChef{' '}
          <span className="font-semibold text-[#2DD4BF]">1708</span>
        </p>
        <p className="mt-0.5 text-[10.5px] text-white/40">
          {windows} window{windows === 1 ? '' : 's'} open
        </p>
      </div>
    </div>
  )
}

function useWindowCount() {
  /* Zustand selector returns a number, so the widget only re-renders when
     the open-window count actually changes. */
  return useWindowStore((s) => s.windows.filter((w) => !w.minimized).length)
}

function WidgetSkeleton() {
  return <div className="os-widget" style={{ width: W, height: W }} aria-hidden="true" />
}

/* ── Stack ───────────────────────────────────────────────────────────────── */

export default function Widgets() {
  return (
    <div
      className="pointer-events-none absolute left-4 z-[100] hidden flex-col md:flex"
      style={{ top: 36, gap: GAP }}
      aria-hidden={false}
    >
      <CalendarWidget />
      <ClockWidget />
      <StatsWidget />
    </div>
  )
}
