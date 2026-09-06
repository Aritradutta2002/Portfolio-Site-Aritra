'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useWindowStore, selectFocused } from '@/store/windowStore'
import { useUiStore } from '@/store/uiStore'
import about from '@/content/about.json'
import AppIcon from './AppIcons'
import BatteryStatus from './BatteryStatus'
import ControlCentre from './ControlCentre'

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

/* ── Small presentational helpers ──────────────────────────────────────── */

function MenuItem({
  label,
  shortcut,
  onClick,
}: {
  label: React.ReactNode
  shortcut?: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      role="menuitem"
      className="os-dd-row os-focusable os-press-sm"
      onClick={onClick}
    >
      <span>{label}</span>
      {shortcut && (
        <kbd className="shrink-0 text-[11px] text-white/40">{shortcut}</kbd>
      )}
    </button>
  )
}

function Separator() {
  return <div className="my-1 h-px bg-white/15" aria-hidden="true" />
}

/* A menu-bar entry: trigger button + animated dropdown panel. */
function MenuEntry({
  id,
  open,
  label,
  ariaLabel,
  onToggle,
  onHover,
  align = 'left',
  widthClass = 'w-56',
  children,
}: {
  id: string
  open: boolean
  label: React.ReactNode
  ariaLabel: string
  onToggle: () => void
  onHover: () => void
  align?: 'left' | 'right'
  widthClass?: string
  children: React.ReactNode
}) {
  const alignCls = align === 'right' ? 'right-0' : 'left-0'
  return (
    <div className="relative" onMouseEnter={onHover}>
      <button
        type="button"
        data-open={open}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel}
        className="os-menubar-item os-press-sm flex items-center gap-1.5 rounded-[5px] px-2 py-0.5"
        onClick={onToggle}
      >
        {label}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className={`os-spotlight absolute top-[calc(100%+4px)] z-[9200] overflow-hidden p-1.5 text-[13px] text-white ${alignCls} ${widthClass}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── MenuBar ───────────────────────────────────────────────────────────── */

export default function MenuBar({
  onOpenSpotlight,
}: {
  onOpenSpotlight: () => void
}) {
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const barRef = React.useRef<HTMLDivElement>(null)

  const windows = useWindowStore((s) => s.windows)
  const openApp = useWindowStore((s) => s.openApp)
  const closeWindow = useWindowStore((s) => s.closeWindow)
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow)
  const toggleMaximize = useWindowStore((s) => s.toggleMaximize)
  const closeAll = useWindowStore((s) => s.closeAll)

  const showDock = useUiStore((s) => s.showDock)
  const showWidgets = useUiStore((s) => s.showWidgets)
  const toggleDock = useUiStore((s) => s.toggleDock)
  const toggleWidgets = useUiStore((s) => s.toggleWidgets)

  const focused = selectFocused(windows)
  const clock = useClock()

  const toggle = (id: string) => setOpenMenu((cur) => (cur === id ? null : id))
  const switchTo = (id: string) =>
    setOpenMenu((cur) => (openMenu ? id : cur)) // hover: only switch when one is already open
  const close = () => setOpenMenu(null)

  /* Keep the View-menu label honest as fullscreen state changes. */
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  React.useEffect(() => {
    const sync = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', sync)
    return () => document.removeEventListener('fullscreenchange', sync)
  }, [])

  /* Dismiss the menus on outside click or Escape. */
  React.useEffect(() => {
    if (!openMenu) return
    const onDown = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) close()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [openMenu])

  /* App-level keyboard shortcuts (⌘W and ⌘K live elsewhere). */
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.tagName === 'INPUT' || t?.tagName === 'TEXTAREA' || t?.isContentEditable) return
      const mod = e.metaKey || e.ctrlKey
      if (!mod) return
      if (e.key.toLowerCase() === 'n') {
        e.preventDefault()
        openApp('finder')
      } else if (e.key.toLowerCase() === 't') {
        e.preventDefault()
        openApp('terminal')
      } else if (e.shiftKey && e.key.toLowerCase() === 'w') {
        e.preventDefault()
        closeAll()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openApp, closeAll])

  const editCommand = (cmd: string) => () =>
    document.execCommand(cmd as 'undo' | 'redo' | 'cut' | 'copy' | 'paste' | 'selectAll')

  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void document.documentElement.requestFullscreen().catch(() => {})
  }

  const initials = about.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)

  const focusedApp = focused ? focused.title : 'Finder'
  const closeApp = () => {
    if (!focused) return
    windows.filter((w) => w.appType === focused.appType).forEach((w) => closeWindow(w.id))
  }
  const hideApp = () => {
    if (!focused) return
    windows.filter((w) => w.appType === focused.appType).forEach((w) => minimizeWindow(w.id))
  }

  return (
    <div
      ref={barRef}
      className="os-menubar absolute inset-x-0 top-0 z-[9000] flex items-center gap-1 px-2 text-[13px] text-white/90 select-none"
      style={{ height: MENU_H }}
    >
      {/* ── Apple logo / About menu ── */}
      <MenuEntry
        id="app"
        open={openMenu === 'app'}
        ariaLabel="Apple menu"
        onToggle={() => toggle('app')}
        onHover={() => switchTo('app')}
        label={
          /* Authentic Apple  logo — SF-style path */
          <svg width="13" height="16" viewBox="0 0 14 17" fill="currentColor" aria-hidden="true" style={{ opacity: 0.92, marginLeft: 2 }}>
            <path d="M13.17 12.56c-.3.68-.65 1.31-1.06 1.88-.56.8-1.02 1.35-1.37 1.65-.55.5-1.14.76-1.77.77-.45 0-1-.13-1.63-.39-.63-.26-1.21-.39-1.74-.39-.56 0-1.15.13-1.79.39-.64.26-1.16.4-1.56.41-.6.03-1.21-.24-1.82-.8-.38-.33-.86-.9-1.44-1.72C.4 13.5 0 12.5 0 11.46c0-1.1.24-2.05.72-2.84.38-.63.88-1.13 1.52-1.5.64-.37 1.33-.56 2.07-.57.46 0 1.06.14 1.81.42.75.28 1.23.42 1.44.42.16 0 .7-.17 1.6-.5.86-.31 1.58-.44 2.18-.39 1.61.13 2.82.76 3.62 1.9-1.44.87-2.15 2.09-2.14 3.65.01 1.22.46 2.23 1.34 3.01zm-3.5-12.4c0 .96-.35 1.85-1.05 2.68-.84 1-1.86 1.57-2.96 1.48-.01-.11-.02-.23-.02-.35 0-.92.4-1.9 1.11-2.7.35-.4.8-.74 1.34-1.01.54-.27 1.05-.42 1.53-.44.01.12.05.23.05.34z" />
          </svg>
        }
      >
        <div className="px-2.5 py-1.5">
          <p className="font-semibold leading-tight">{about.name}</p>
          <p className="text-[11px] leading-tight text-white/60">{about.title}</p>
        </div>
        <div className="my-1 h-px bg-white/15" />
        <MenuItem label="About This Site" onClick={() => { openApp('about'); close() }} />
        <Separator />
        <MenuItem label="Close All Windows" onClick={() => { closeAll(); close() }} />
        <MenuItem label="Restart…" onClick={() => window.location.reload()} />
        <Separator />
        <MenuItem label="LinkedIn" onClick={() => window.open(about.links.linkedin, '_blank', 'noopener')} />
        <MenuItem label="GitHub" onClick={() => window.open(about.links.github, '_blank', 'noopener')} />
        <MenuItem label="Email Me" onClick={() => window.open(about.links.email, '_self')} />
        <Separator />
        <MenuItem label="View Plain Site…" onClick={() => window.open('/classic', '_self')} />
      </MenuEntry>

      {/* ── Focused app menu (bold name — clickable Finder / app) ── */}
      <MenuEntry
        id="finder"
        open={openMenu === 'finder'}
        ariaLabel={`${focusedApp} menu`}
        onToggle={() => toggle('finder')}
        onHover={() => switchTo('finder')}
        label={<span className="font-semibold text-white">{focusedApp}</span>}
      >
        {focused ? (
          <>
            <MenuItem
              label={`About ${focusedApp}`}
              onClick={() => { openApp(focused.appType); close() }}
            />
            <Separator />
            <MenuItem label={`Hide ${focusedApp}`} onClick={() => { hideApp(); close() }} />
            <MenuItem label={`Quit ${focusedApp}`} onClick={() => { closeApp(); close() }} />
          </>
        ) : (
          <>
            <MenuItem label="About" onClick={() => { openApp('about'); close() }} />
            <Separator />
            <MenuItem label="New Finder Window" shortcut="⌘N" onClick={() => { openApp('finder'); close() }} />
            <MenuItem label="Close All Windows" shortcut="⇧⌘W" onClick={() => { closeAll(); close() }} />
          </>
        )}
      </MenuEntry>

      {/* ── File menu ── */}
      <MenuEntry
        id="file"
        open={openMenu === 'file'}
        ariaLabel="File menu"
        onToggle={() => toggle('file')}
        onHover={() => switchTo('file')}
        label={<span className="font-medium">{'File'}</span>}
      >
        <MenuItem label="New Finder Window" shortcut="⌘N" onClick={() => { openApp('finder'); close() }} />
        <MenuItem label="New Terminal" shortcut="⌘T" onClick={() => { openApp('terminal'); close() }} />
        <Separator />
        <MenuItem
          label="Close Window"
          shortcut="⌘W"
          onClick={() => {
            if (focused) closeWindow(focused.id)
            close()
          }}
        />
        <MenuItem label="Close All Windows" shortcut="⇧⌘W" onClick={() => { closeAll(); close() }} />
      </MenuEntry>

      {/* ── Edit menu ── */}
      <MenuEntry
        id="edit"
        open={openMenu === 'edit'}
        ariaLabel="Edit menu"
        onToggle={() => toggle('edit')}
        onHover={() => switchTo('edit')}
        label={<span className="font-medium">Edit</span>}
      >
        <MenuItem label="Undo" shortcut="⌘Z" onClick={() => { editCommand('undo')(); close() }} />
        <MenuItem label="Redo" shortcut="⇧⌘Z" onClick={() => { editCommand('redo')(); close() }} />
        <Separator />
        <MenuItem label="Cut" shortcut="⌘X" onClick={() => { editCommand('cut')(); close() }} />
        <MenuItem label="Copy" shortcut="⌘C" onClick={() => { editCommand('copy')(); close() }} />
        <MenuItem label="Paste" shortcut="⌘V" onClick={() => { editCommand('paste')(); close() }} />
        <Separator />
        <MenuItem label="Select All" shortcut="⌘A" onClick={() => { editCommand('selectAll')(); close() }} />
      </MenuEntry>

      {/* ── View menu ── */}
      <MenuEntry
        id="view"
        open={openMenu === 'view'}
        ariaLabel="View menu"
        onToggle={() => toggle('view')}
        onHover={() => switchTo('view')}
        label={<span className="font-medium">View</span>}
      >
        <MenuItem
          label={isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
          shortcut={isFullscreen ? '⌃⌘F' : ''}
          onClick={() => { toggleFullscreen(); close() }}
        />
        <MenuItem
          label="Zoom"
          shortcut="⌘+"
          onClick={() => {
            if (focused) toggleMaximize(focused.id)
            close()
          }}
        />
        <Separator />
        <MenuItem
          label={showDock ? 'Hide Dock' : 'Show Dock'}
          onClick={() => { toggleDock(); close() }}
        />
        <MenuItem
          label={showWidgets ? 'Hide Widgets' : 'Show Widgets'}
          onClick={() => { toggleWidgets(); close() }}
        />
      </MenuEntry>

      {/* ── Status cluster: Battery · Wi-Fi · Control Centre · Spotlight · Clock ── */}
      <div className="ml-auto flex items-center gap-1">
        <BatteryStatus />

        <WiFiToggle
          open={openMenu === 'wifi'}
          onToggle={() => toggle('wifi')}
          onHover={() => switchTo('wifi')}
        />

        {/* Control Centre */}
        <ControlCentreTrigger open={openMenu === 'cc'} onClick={() => toggle('cc')} onHover={() => switchTo('cc')}>
          <AnimatePresence>
            {openMenu === 'cc' && <ControlCentre />}
          </AnimatePresence>
        </ControlCentreTrigger>

        <button
          type="button"
          onClick={onOpenSpotlight}
          className="os-menubar-item os-press-sm flex items-center gap-1.5 rounded-[5px] px-2 py-0.5 text-white/85"
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

/* ── Wi-Fi panel ───────────────────────────────────────────────────────── */

const WIFI_NETWORKS = [
  { id: 'aritra5g',   name: 'Aritra 5G',        strength: 3, secured: true,  connected: true  },
  { id: 'aritraBt',   name: 'Aritra Bluetooth',  strength: 2, secured: true,  connected: false },
  { id: 'aritra2g',   name: 'Aritra 2.4G',       strength: 2, secured: true,  connected: false },
  { id: 'guest',      name: 'Guest Network',      strength: 1, secured: false, connected: false },
]

function WiFiToggle({
  open,
  onToggle,
  onHover,
}: {
  open: boolean
  onToggle: () => void
  onHover: () => void
}) {
  const wifi = useUiStore((s) => s.wifi)
  const toggleWifi = useUiStore((s) => s.toggleWifi)
  const [connected, setConnected] = React.useState('aritra5g')

  const handleConnect = (id: string) => {
    setConnected(id)
    if (!wifi) toggleWifi()
  }

  return (
    <div className="relative" onMouseEnter={onHover}>
      <button
        type="button"
        onClick={onToggle}
        aria-label="Wi-Fi"
        aria-haspopup="dialog"
        aria-expanded={open}
        data-open={open}
        title="Wi-Fi"
        className={`os-menubar-item os-press-sm rounded-[5px] px-2 py-0.5 ${wifi ? 'text-white/90' : 'text-white/40'}`}
      >
        <WiFiGlyph size={15} active={wifi} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Wi-Fi"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="os-spotlight absolute right-0 top-[calc(100%+6px)] z-[9200] w-[280px] overflow-hidden p-3 text-[13px] text-white"
          >
            {/* Header row */}
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[13px] font-semibold text-white/90">Wi-Fi</span>
              <button
                type="button"
                onClick={toggleWifi}
                className={`relative h-[22px] w-[38px] rounded-full transition-colors duration-200 ${wifi ? 'bg-[#30D158]' : 'bg-white/20'}`}
                aria-label={wifi ? 'Turn Wi-Fi off' : 'Turn Wi-Fi on'}
              >
                <span
                  className="absolute top-[3px] h-[16px] w-[16px] rounded-full bg-white shadow transition-all duration-200"
                  style={{ left: wifi ? 19 : 3 }}
                />
              </button>
            </div>

            {wifi ? (
              <>
                {/* Network list */}
                <div className="flex flex-col gap-0.5">
                  {WIFI_NETWORKS.map((net) => (
                    <button
                      key={net.id}
                      type="button"
                      onClick={() => handleConnect(net.id)}
                      className={`flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-left transition-colors hover:bg-white/10 ${connected === net.id ? 'bg-white/[0.08]' : ''}`}
                    >
                      {/* Signal strength bars */}
                      <WifiStrengthIcon strength={net.strength} active={connected === net.id} />
                      <span className="flex-1 text-[12.5px] font-medium leading-tight text-white/90">
                        {net.name}
                      </span>
                      {net.secured && (
                        <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
                          <rect x="1" y="5.5" width="9" height="7" rx="1.5" fill="rgba(255,255,255,0.45)" />
                          <path d="M3 5.5V4a2.5 2.5 0 0 1 5 0v1.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                        </svg>
                      )}
                      {connected === net.id && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2 6l3 3 5-5" stroke="#30D158" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>

                <div className="my-2 h-px bg-white/10" />

                {/* Other network */}
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-[8px] px-2.5 py-1.5 text-[12px] text-white/60 hover:bg-white/10 hover:text-white/90 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                  </svg>
                  Other…
                </button>
              </>
            ) : (
              <p className="py-2 text-center text-[12px] text-white/45">
                Wi-Fi is turned off
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function WifiStrengthIcon({ strength, active }: { strength: number; active: boolean }) {
  const color = active ? '#30D158' : 'rgba(255,255,255,0.7)'
  const dim = 'rgba(255,255,255,0.22)'
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true">
      <path d="M8 12.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" fill={strength >= 1 ? color : dim} />
      <path d="M4.5 9.5a5 5 0 0 1 7 0" stroke={strength >= 2 ? color : dim} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M1.5 6.5a9 9 0 0 1 13 0" stroke={strength >= 3 ? color : dim} strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function ControlCentreTrigger({
  open,
  onClick,
  onHover,
  children,
}: {
  open: boolean
  onClick: () => void
  onHover: () => void
  children: React.ReactNode
}) {
  return (
    <div className="relative" onMouseEnter={onHover}>
      <button
        type="button"
        onClick={onClick}
        aria-haspopup="dialog"
        aria-expanded={open}
        data-open={open}
        aria-label="Open Control Centre"
        title="Control Centre"
        className="os-menubar-item os-press-sm rounded-[5px] px-2 py-0.5 text-white/90"
      >
        <ToggleGlyph size={14} />
      </button>
      {children}
    </div>
  )
}

/* ── Glyphs ────────────────────────────────────────────────────────────── */

function WiFiGlyph({ size = 15, active = true }: { size?: number; active?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" style={{ opacity: active ? 1 : 0.4 }}>
      <path d="M2.5 8.5a15 15 0 0 1 19 0" />
      <path d="M5.5 12.5a10.5 10.5 0 0 1 13 0" />
      <path d="M8.8 16.3a6 6 0 0 1 6.4 0" />
      <circle cx="12" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ToggleGlyph({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      {/* two toggled control bars (macOS Control Centre glyph) */}
      <path d="M2 4.5h12" />
      <circle cx="5.5" cy="4.5" r="1.9" fill="currentColor" stroke="none" />
      <path d="M2 8.5h12" />
      <circle cx="10.8" cy="8.5" r="1.9" fill="#000" stroke="none" />
      <path d="M2 12.5h12" />
      <circle cx="6" cy="12.5" r="1.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export { MENU_H }