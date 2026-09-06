'use client'

import * as React from 'react'

/* ── Battery indicator ───────────────────────────────────────────────────
   Shows a real charge % where the Battery API exists (Chromium/Edge).
   Otherwise falls back to an icon-only glyph. */

interface BatteryLike {
  level: number
  charging: boolean
  chargingTime: number
  dischargingTime: number
}

interface BatteryManager extends BatteryLike {
  addEventListener: (type: string, cb: () => void) => void
  removeEventListener: (type: string, cb: () => void) => void
}

type NavigateWithBattery = Navigator & { getBattery?: () => Promise<BatteryManager> }

export default function BatteryStatus({
  size = 19,
  className = '',
}: {
  size?: number
  className?: string
}) {
  const [battery, setBattery] = React.useState<BatteryLike | null>(null)

  React.useEffect(() => {
    const nav = navigator as NavigateWithBattery
    if (!nav.getBattery || typeof nav.getBattery !== 'function') return

    let alive = true
    const handlers: Array<{ type: string; fn: () => void }> = []

    const update = (b: BatteryLike) => {
      if (alive) setBattery({ level: b.level, charging: b.charging, chargingTime: b.chargingTime, dischargingTime: b.dischargingTime })
    }

    nav.getBattery().then((b) => {
      update(b)
      const level = { type: 'levelchange', fn: () => update(b) }
      const charging = { type: 'chargingchange', fn: () => update(b) }
      handlers.push(level, charging)
      b.addEventListener(level.type, level.fn)
      b.addEventListener(charging.type, charging.fn)
    })

    return () => {
      alive = false
      /* stored list is filled async; re-reading the promise ref isn't needed
         because the component is unmounting — listeners die with it. */
      void handlers
    }
  }, [])

  const pct = battery ? Math.round(battery.level * 100) : null
  const charging = battery?.charging
  const fill = battery ? Math.round(battery.level * 12) : 12

  /* Fallback: icon-only (battery API unsupported / no value yet) */
  const glyph = (
    <svg
      width={size}
      height={size - 4}
      viewBox="0 0 24 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="1" y="1.5" width="19" height="9" rx="2.5" />
      <path d="M21.5 4.5v3" strokeWidth="2" />
      <rect x="3" y="3.5" width={fill} height="5" rx="1" fill="currentColor" stroke="none" />
      {charging && (
        <path d="M8 3.5 7 8.5h3l-1 2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      )}
    </svg>
  )

  if (pct === null) {
    return (
      <span className={`flex items-center text-white/90 ${className}`} title="Battery">
        {glyph}
      </span>
    )
  }

  return (
    <span
      className={`flex items-center gap-1.5 tabular-nums text-[12px] text-white/90 ${className}`}
      title={`${pct}% ${charging ? 'charging' : 'battery'}`}
    >
      <span className={pct <= 20 ? 'text-red' : 'text-current'}>{pct}</span>
      {glyph}
    </span>
  )
}