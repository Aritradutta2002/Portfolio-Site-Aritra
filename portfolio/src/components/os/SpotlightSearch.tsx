'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useWindowStore } from '@/store/windowStore'
import about from '@/content/about.json'
import projects from '@/content/projects.json'
import AppIcon, { type IconName } from './AppIcons'
import { APPS } from './appRegistry'

interface Result {
  id: string
  label: string
  hint: string
  icon: IconName
  keywords: string
  run: () => void
}

export default function SpotlightSearch({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const openApp = useWindowStore((s) => s.openApp)
  const [query, setQuery] = React.useState('')
  const [active, setActive] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const results = React.useMemo<Result[]>(() => {
    const appResults: Result[] = APPS.map((a) => ({
      id: `app:${a.id}`,
      label: a.label,
      hint: a.description,
      icon: a.icon,
      keywords: [a.label, a.description, ...(a.keywords ?? [])].join(' ').toLowerCase(),
      run: () => openApp(a.id as never),
    }))

    const projectResults: Result[] = projects.map((p) => ({
      id: `project:${p.id}`,
      label: p.name,
      hint: p.tagline,
      icon: 'project' as IconName,
      keywords: `${p.name} ${p.tagline} ${(p.stack ?? []).join(' ')}`.toLowerCase(),
      run: () => openApp('project', p.id),
    }))

    const commandResults: Result[] = [
      {
        id: 'cmd:resume-pdf',
        label: 'Download Resume (PDF)',
        hint: 'Open the full resume in a new tab',
        icon: 'resume',
        keywords: 'resume cv pdf download',
        run: () => window.open('/resume.pdf', '_blank', 'noopener'),
      },
      {
        id: 'cmd:classic',
        label: 'View plain site (no 3D)',
        hint: 'Accessible, text-only version of this portfolio',
        icon: 'finder',
        keywords: 'plain classic accessible no 3d text fallback',
        run: () => window.open('/classic', '_self'),
      },
      {
        id: 'cmd:linkedin',
        label: 'Open LinkedIn',
        hint: about.links.linkedin,
        icon: 'contact',
        keywords: 'linkedin social profile',
        run: () => window.open(about.links.linkedin, '_blank', 'noopener'),
      },
      {
        id: 'cmd:github',
        label: 'Open GitHub',
        hint: about.links.github,
        icon: 'terminal',
        keywords: 'github code repository',
        run: () => window.open(about.links.github, '_blank', 'noopener'),
      },
      {
        id: 'cmd:email',
        label: 'Email Aritra',
        hint: about.links.email.replace('mailto:', ''),
        icon: 'contact',
        keywords: 'email mail contact gmail',
        run: () => window.open(about.links.email, '_self'),
      },
    ]

    const all = [...appResults, ...projectResults, ...commandResults]
    const q = query.trim().toLowerCase()
    if (!q) return all
    return all.filter((r) => r.keywords.includes(q) || r.label.toLowerCase().includes(q))
  }, [query, openApp])

  /* Reset state when the palette opens. */
  React.useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      const t = setTimeout(() => inputRef.current?.focus(), 40)
      return () => clearTimeout(t)
    }
  }, [open])

  React.useEffect(() => {
    setActive(0)
  }, [query])

  const commit = (r?: Result) => {
    const target = r ?? results[active]
    if (!target) return
    onClose()
    /* Let the palette unmount before the window opens so focus lands cleanly. */
    setTimeout(() => target.run(), 10)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => (i + 1) % Math.max(results.length, 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      commit()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9500] flex items-start justify-center pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Spotlight search"
            className="os-spotlight relative w-[min(620px,92vw)] overflow-hidden text-white"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 px-4">
              <AppIcon name="spotlight" size={20} glyphColor="#FFFFFF" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search apps, projects, links…"
                className="w-full bg-transparent py-4 text-[17px] text-white placeholder:text-white/45 focus:outline-none"
                aria-label="Search"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden shrink-0 rounded border border-white/20 px-1.5 py-0.5 text-[10px] text-white/50 sm:block">
                esc
              </kbd>
            </div>

            {results.length > 0 && (
              <>
                <div className="h-px bg-white/12" />
                <ul
                  className="max-h-[46vh] overflow-y-auto os-scroll os-scroll-dark p-1.5"
                  role="listbox"
                  data-lenis-prevent
                >
                  {results.map((r, i) => (
                    <li key={r.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={i === active}
                        data-active={i === active}
                        className="os-spotlight-row os-press flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => commit(r)}
                      >
                        <AppIcon name={r.icon} size={30} />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[13.5px] font-medium leading-tight">
                            {r.label}
                          </span>
                          <span className="block truncate text-[11.5px] leading-tight text-white/55">
                            {r.hint}
                          </span>
                        </span>
                        {i === active && (
                          <kbd className="shrink-0 rounded border border-white/20 px-1.5 py-0.5 text-[10px] text-white/60">
                            ↵
                          </kbd>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {results.length === 0 && (
              <>
                <div className="h-px bg-white/12" />
                <p className="px-4 py-6 text-center text-[13px] text-white/50">
                  No results for “{query}”
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
