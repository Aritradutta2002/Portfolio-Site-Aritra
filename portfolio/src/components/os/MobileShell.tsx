'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { APP_COMPONENTS } from '@/components/apps/registry'
import AppIcon from './AppIcons'
import { APPS } from './appRegistry'
import type { AppType } from '@/store/windowStore'

/* Plan §7 — touch gets an iOS-style springboard instead of floating windows:
   tap an icon, the app opens full-screen, tap back to return. Same content
   components, different shell. */

function StatusTime() {
  const [time, setTime] = React.useState<string | null>(null)
  React.useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
      )
    tick()
    const t = setInterval(tick, 10_000)
    return () => clearInterval(t)
  }, [])
  return <>{time ?? ''}</>
}

export default function MobileShell() {
  const [openId, setOpenId] = React.useState<AppType | null>(null)

  const app = openId ? APPS.find((a) => a.id === openId) : null
  const Component = openId
    ? (APP_COMPONENTS[openId] as React.ComponentType<{ payload?: string }> | undefined)
    : null

  /* Lock body scroll while an app is full-screen. */
  React.useEffect(() => {
    document.body.style.overflow = openId ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [openId])

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* ── Springboard ── */}
      <div className="os-wallpaper" aria-hidden="true" />

      <div className="relative flex h-full w-full flex-col">
        {/* Status bar */}
        <div className="flex shrink-0 items-center justify-between px-5 pt-3 text-[13px] font-semibold text-white">
          <span>
            <StatusTime />
          </span>
          <span className="text-[11px] font-medium text-white/70">Aritra Dutta</span>
        </div>

        {/* App grid */}
        <div
          className="os-scroll min-h-0 flex-1 overflow-y-auto px-4 pt-6"
          data-lenis-prevent
        >
          <div className="grid grid-cols-3 gap-x-2 gap-y-6">
            {APPS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setOpenId(a.id as AppType)}
                className="os-focusable flex flex-col items-center gap-1.5 active:opacity-70"
                aria-label={`${a.label} — ${a.description}`}
              >
                <AppIcon name={a.icon} size={62} />
                <span className="max-w-[86px] truncate text-center text-[11.5px] font-medium text-white drop-shadow">
                  {a.label}
                </span>
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-[11px] leading-relaxed text-white/50">
            Tap an icon to open. This is the compact version of the desktop site —
            rotate to landscape or use a larger screen for the full experience.
          </p>
        </div>

        {/* Home indicator */}
        <div className="flex shrink-0 justify-center pb-2 pt-2">
          <span className="h-1 w-32 rounded-full bg-white/70" aria-hidden="true" />
        </div>
      </div>

      {/* ── Full-screen app ── */}
      <AnimatePresence>
        {openId && Component && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col bg-white"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 36 }}
            role="dialog"
            aria-modal="true"
            aria-label={app?.label}
          >
            <header className="flex shrink-0 items-center gap-2 border-b border-black/[0.08] bg-[#FAFAFC] px-3 py-2.5">
              <button
                type="button"
                onClick={() => setOpenId(null)}
                className="os-focusable flex items-center gap-0.5 rounded-md px-1.5 py-1 text-[14px] font-medium text-[#0F766E]"
                aria-label="Back to home screen"
              >
                <span aria-hidden="true">‹</span>
                <span>Home</span>
              </button>
              <span className="flex-1 truncate text-center text-[14px] font-semibold text-[#1D1D1F]">
                {app?.label}
              </span>
              <span className="w-[62px] shrink-0" aria-hidden="true" />
            </header>
            <div className="min-h-0 flex-1" data-lenis-prevent>
              <Component />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
