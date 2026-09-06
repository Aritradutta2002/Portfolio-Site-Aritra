'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useWindowStore, selectFocused } from '@/store/windowStore'
import about from '@/content/about.json'
import AppIcon from './AppIcons'

const MENU_H = 28

/* ── Live clock ────────────────────────────────────────────────────────────
   Rendered client-side only after mount to avoid an SSR hydration mismatch. */
function useClock() {
  const [now, setNow] = React.useState<Date | null>(null)

  React.useEffect(() => {
    setNow(new Date())
    const t = setInterval(() => setNow(new Date()), 10_000)
    return () => clearInterval(t)
  }, [])

  if (!now) return null

  const day = now.toLocaleDateString('en-US', { weekday: 'short' })
  const date = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
  const time = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  return `${day} ${date}  ${time}`
}

export default function MenuBar({
  onOpenSpotlight,
}: {
  onOpenSpotlight: () => void
}) {
  const [open, setOpen] = React.useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  const windows = useWindowStore((s) => s.windows)
  const openApp = useWindowStore((s) => s.openApp)
  const closeAll = useWindowStore((s) => s.closeAll)
  const focused = selectFocused(windows)
  const clock = useClock()

  /* Dismiss the menu on outside click or Escape. */
  React.useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const initials = about.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)

  const items: Array<
    { label: string; action: () => void; href?: string; external?: boolean } | { sep: true }
  > = [
    { label: 'About This Site', action: () => openApp('about') },
    { sep: true },
    { label: 'Close All Windows', action: () => closeAll() },
    { label: 'Restart…', action: () => window.location.reload() },
    { sep: true },
    { label: 'LinkedIn', action: () => window.open(about.links.linkedin, '_blank', 'noopener'), href: about.links.linkedin, external: true },
    { label: 'GitHub', action: () => window.open(about.links.github, '_blank', 'noopener'), href: about.links.github, external: true },
    { label: 'Email Me', action: () => window.open(about.links.email, '_self'), href: about.links.email },
    { sep: true },
    { label: 'View Plain Site…', action: () => window.open('/classic', '_self') },
  ]

  return (
    <div
      className="os-menubar absolute inset-x-0 top-0 z-[9000] flex items-center gap-1 px-2 text-[13px] text-white/90 select-none"
      style={{ height: MENU_H }}
    >
      {/* ── Logo menu ── */}
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          data-open={open}
          className="os-menubar-item os-focusable flex items-center gap-1.5 px-2 py-0.5"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className="grid h-[15px] w-[15px] place-items-center rounded-[4px] text-[8px] font-bold leading-none text-white"
            style={{ background: 'linear-gradient(135deg, #57C4C7, #8A5CE6)' }}
            aria-hidden="true"
          >
            {initials}
          </span>
          <span className="font-medium">{about.name}</span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="os-spotlight absolute left-0 top-[calc(100%+4px)] w-56 overflow-hidden p-1.5 text-[13px] text-white"
            >
              <div className="px-2.5 py-1.5">
                <p className="font-semibold leading-tight">{about.name}</p>
                <p className="text-[11px] leading-tight text-white/60">{about.title}</p>
              </div>
              <div className="my-1 h-px bg-white/15" />
              {items.map((it, i) =>
                'sep' in it ? (
                  <div key={`s${i}`} className="my-1 h-px bg-white/15" />
                ) : (
                  <button
                    key={it.label}
                    role="menuitem"
                    type="button"
                    className="os-focusable flex w-full items-center justify-between rounded-[5px] px-2.5 py-[5px] text-left hover:bg-white/15"
                    onClick={() => {
                      it.action()
                      setOpen(false)
                    }}
                  >
                    <span>{it.label}</span>
                    {it.external && <span className="text-[11px] text-white/40">↗</span>}
                  </button>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Focused app name (centre-right, macOS convention) ── */}
      <div className="pointer-events-none ml-4 font-semibold text-white/85">
        {focused ? focused.title : 'Finder'}
      </div>

      <div className="ml-auto flex items-center gap-1">
        <button
          type="button"
          onClick={onOpenSpotlight}
          className="os-focusable flex items-center gap-1.5 rounded-[5px] px-2 py-0.5 text-white/85 hover:bg-white/15"
          aria-label="Open Spotlight search"
          title="Spotlight Search (⌘K)"
        >
          <AppIcon name="spotlight" size={14} glyphColor="#FFFFFF" />
          <span className="hidden text-[12px] sm:inline">Search</span>
        </button>
        <span className="os-focusable px-2 tabular-nums text-white/90">{clock}</span>
      </div>
    </div>
  )
}

export { MENU_H }
