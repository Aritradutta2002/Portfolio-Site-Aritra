'use client'

import * as React from 'react'
import { useWindowStore, type AppType } from '@/store/windowStore'
import AppIcon, { type IconName } from '@/components/os/AppIcons'

/* ── Finder ────────────────────────────────────────────────────────────────
   A virtual filesystem over the portfolio: folders navigate inside the
   window, apps and files open new windows. Back/forward history behaves
   like the real thing. */

interface Node {
  id: string
  name: string
  kind: 'folder' | 'app' | 'link'
  icon: IconName
  /** For kind === 'app' */
  appType?: AppType
  payload?: string
  /** For kind === 'link' */
  href?: string
  children?: Node[]
}

const APP_LEAF = (appType: AppType, name: string, icon: IconName): Node => ({
  id: `app-${appType}`,
  name,
  kind: 'app',
  icon,
  appType,
})

const FS: Node = {
  id: 'root',
  name: 'Aritra',
  kind: 'folder',
  icon: 'finder',
  children: [
    {
      id: 'applications',
      name: 'Applications',
      kind: 'folder',
      icon: 'launchpad',
      children: [
        APP_LEAF('finder', 'Finder', 'finder'),
        APP_LEAF('about', 'About', 'about'),
        APP_LEAF('experience', 'Experience', 'experience'),
        APP_LEAF('projects', 'Projects', 'projects'),
        APP_LEAF('photos', 'Photos', 'photos'),
        APP_LEAF('notes', 'Notes', 'notes'),
        APP_LEAF('calendar', 'Calendar', 'calendar'),
        APP_LEAF('resume', 'Resume', 'resume'),
        APP_LEAF('contact', 'Contact', 'contact'),
        APP_LEAF('terminal', 'Terminal', 'terminal'),
      ],
    },
    {
      id: 'documents',
      name: 'Documents',
      kind: 'folder',
      icon: 'projects',
      children: [
        APP_LEAF('resume', 'Resume.pdf', 'resume'),
        APP_LEAF('about', 'About.txt', 'about'),
        APP_LEAF('experience', 'Experience.md', 'experience'),
        APP_LEAF('contact', 'Contact.vcf', 'contact'),
      ],
    },
    {
      id: 'projects-folder',
      name: 'Projects',
      kind: 'folder',
      icon: 'projects',
      children: [
        {
          id: 'algoguru-leaf',
          name: 'AlgoGuru',
          kind: 'app',
          icon: 'project',
          appType: 'project',
          payload: 'algoguru',
        },
        APP_LEAF('projects', 'All Projects', 'projects'),
      ],
    },
    {
      id: 'gallery',
      name: 'Gallery',
      kind: 'folder',
      icon: 'photos',
      children: [APP_LEAF('photos', 'Photos', 'photos')],
    },
    {
      id: 'github-link',
      name: 'GitHub',
      kind: 'link',
      icon: 'terminal',
      href: 'https://github.com/Aritradutta2002',
    },
    {
      id: 'linkedin-link',
      name: 'LinkedIn',
      kind: 'link',
      icon: 'contact',
      href: 'https://www.linkedin.com/in/aritra-dutta-rick20/',
    },
  ],
}

function findPath(ids: string[]): Node | null {
  let node: Node | undefined = FS
  for (const id of ids) {
    node = node?.children?.find((c) => c.id === id)
    if (!node) return null
  }
  return node ?? null
}

export default function FinderApp() {
  const openApp = useWindowStore((s) => s.openApp)
  const [path, setPath] = React.useState<string[]>([])
  const [history, setHistory] = React.useState<string[][]>([[]])
  const [hIndex, setHIndex] = React.useState(0)
  const [selected, setSelected] = React.useState<string | null>(null)

  const current = findPath(path) ?? FS
  const items = current.children ?? []

  const navigate = (ids: string[]) => {
    const next = [...history.slice(0, hIndex + 1), ids]
    setHistory(next)
    setHIndex(next.length - 1)
    setPath(ids)
    setSelected(null)
  }

  const back = () => {
    if (hIndex === 0) return
    const i = hIndex - 1
    setHIndex(i)
    setPath(history[i])
    setSelected(null)
  }

  const forward = () => {
    if (hIndex >= history.length - 1) return
    const i = hIndex + 1
    setHIndex(i)
    setPath(history[i])
    setSelected(null)
  }

  const open = (node: Node) => {
    if (node.kind === 'folder') navigate([...path, node.id])
    else if (node.kind === 'app' && node.appType) openApp(node.appType, node.payload)
    else if (node.kind === 'link' && node.href) window.open(node.href, '_blank', 'noopener')
  }

  const canBack = hIndex > 0
  const canForward = hIndex < history.length - 1
  const crumb = [FS, ...path.map((_, i) => findPath(path.slice(0, i + 1))!)]

  return (
    <div className="flex h-full w-full bg-white text-[#1D1D1F]">
      {/* ── Sidebar ── */}
      <div className="os-chrome-surface hidden w-[168px] shrink-0 flex-col gap-3 border-r border-black/[0.08] px-2.5 py-3 sm:flex">
        <div>
          <p className="px-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wide text-[#86868B]">
            Favourites
          </p>
          {[
            { name: 'Aritra', ids: [] as string[] },
            { name: 'Applications', ids: ['applications'] },
            { name: 'Documents', ids: ['documents'] },
            { name: 'Projects', ids: ['projects-folder'] },
            { name: 'Gallery', ids: ['gallery'] },
          ].map((fav) => {
            const on = path.join('/') === fav.ids.join('/')
            return (
              <button
                key={fav.name}
                type="button"
                onClick={() => navigate(fav.ids)}
                className="os-focusable block w-full truncate rounded-md px-1.5 py-1 text-left text-[12px] transition-colors"
                style={on ? { background: 'rgba(10,99,214,0.12)', color: '#0A63D6' } : undefined}
                onMouseEnter={(e) => {
                  if (!on) e.currentTarget.style.background = 'rgba(0,0,0,0.05)'
                }}
                onMouseLeave={(e) => {
                  if (!on) e.currentTarget.style.background = 'transparent'
                }}
              >
                {fav.name}
              </button>
            )
          })}
        </div>
        <div>
          <p className="px-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wide text-[#86868B]">
            Locations
          </p>
          <a
            href="https://github.com/Aritradutta2002"
            target="_blank"
            rel="noopener noreferrer"
            className="os-focusable block truncate rounded-md px-1.5 py-1 text-[12px] hover:bg-black/[0.05]"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/aritra-dutta-rick20/"
            target="_blank"
            rel="noopener noreferrer"
            className="os-focusable block truncate rounded-md px-1.5 py-1 text-[12px] hover:bg-black/[0.05]"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Toolbar */}
        <div className="flex shrink-0 items-center gap-2 border-b border-black/[0.07] bg-[#FAFAFC] px-3 py-2">
          <button
            type="button"
            onClick={back}
            disabled={!canBack}
            aria-label="Back"
            className="os-focusable grid h-7 w-7 place-items-center rounded-md text-[#0A63D6] transition-colors hover:bg-black/[0.05] disabled:opacity-30"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={forward}
            disabled={!canForward}
            aria-label="Forward"
            className="os-focusable grid h-7 w-7 place-items-center rounded-md text-[#0A63D6] transition-colors hover:bg-black/[0.05] disabled:opacity-30"
          >
            ›
          </button>
          <nav className="flex min-w-0 items-center gap-1 text-[12px] text-[#6E6E73]" aria-label="Path">
            {crumb.map((n, i) => (
              <React.Fragment key={n.id}>
                {i > 0 && <span className="text-[#C7C7CC]">›</span>}
                <button
                  type="button"
                  onClick={() => navigate(path.slice(0, i))}
                  className="os-focusable max-w-[110px] truncate rounded px-1 font-medium text-[#1D1D1F] hover:bg-black/[0.05]"
                >
                  {n.name}
                </button>
              </React.Fragment>
            ))}
          </nav>
          <span className="ml-auto shrink-0 text-[11px] text-[#86868B]">
            {items.length} item{items.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Items */}
        <div className="os-scroll flex-1 overflow-y-auto p-4" data-lenis-prevent>
          {items.length === 0 ? (
            <p className="grid h-full place-items-center text-[13px] text-[#86868B]">
              This folder is empty.
            </p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {items.map((node) => {
                const on = selected === node.id
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelected(node.id)}
                    onDoubleClick={() => open(node)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        open(node)
                      }
                    }}
                    className="os-focusable group flex w-[96px] flex-col items-center gap-1.5 rounded-xl p-2 transition-colors"
                    style={on ? { background: '#E8F2FF' } : undefined}
                    onMouseEnter={(e) => {
                      if (!on) e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
                    }}
                    onMouseLeave={(e) => {
                      if (!on) e.currentTarget.style.background = 'transparent'
                    }}
                    aria-label={`${node.name}${node.kind === 'folder' ? ' folder — double-click to open' : ''}`}
                  >
                    <span className="transition-transform duration-200 group-hover:scale-[1.06]">
                      <AppIcon
                        name={node.icon}
                        size={52}
                        glyphColor={node.icon === 'project' ? '#FFFFFF' : undefined}
                      />
                    </span>
                    <span className="max-w-full truncate text-[11.5px] font-medium leading-tight">
                      {node.name}
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="shrink-0 border-t border-black/[0.07] bg-[#FAFAFC] px-3 py-1.5">
          <p className="text-[11px] text-[#86868B]">
            Double-click a folder to open it · double-click an app to launch it
          </p>
        </div>
      </div>
    </div>
  )
}
