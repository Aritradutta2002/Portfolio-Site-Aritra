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
      {/* ── Logo / About menu ── */}
      <MenuEntry
        id="app"
        open={openMenu === 'app'}
        ariaLabel="Aritra menu"
        onToggle={() => toggle('app')}
        onHover={() => switchTo('app')}
        label={
          <>
            <span
              className="grid h-[15px] w-[15px] place-items-center rounded-[4px] text-[8px] font-bold leading-none text-white"
              style={{ background: 'linear-gradient(135deg, #57C4C7, #8A5CE6)' }}
              aria-hidden="true"
            >
              {initials}
            </span>
            <span className="font-medium">{about.name}</span>
          </>
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

        <WiFiToggle />

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

/* ── Wi-Fi quick toggle ────────────────────────────────────────────────── */

function WiFiToggle() {
  const wifi = useUiStore((s) => s.wifi)
  const toggleWifi = useUiStore((s) => s.toggleWifi)
  return (
    <button
      type="button"
      onClick={toggleWifi}
      aria-label={wifi ? 'Disconnect Wi-Fi' : 'Connect Wi-Fi'}
      title={wifi ? 'Wi-Fi on' : 'Wi-Fi off'}
      data-open={!wifi}
      className={`os-menubar-item os-press-sm rounded-[5px] px-2 py-0.5 ${wifi ? 'text-white/90' : 'text-white/40 [&_svg]:opacity-40'}`}
    >
      <WiFiGlyph size={15} />
    </button>
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

function WiFiGlyph({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
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