'use client'

import * as React from 'react'
import projects from '@/content/projects.json'
import { useWindowStore } from '@/store/windowStore'
import AppIcon from '@/components/os/AppIcons'
export default function ProjectsFolder() {
  const openApp = useWindowStore((s) => s.openApp)
  const [selected, setSelected] = React.useState<string | null>(null)

  return (
    <div className="flex h-full w-full flex-col bg-white text-[#1D1D1F]">
      {/* Toolbar strip */}
      <div className="flex shrink-0 items-center justify-between border-b border-black/[0.07] bg-[#FAFAFC] px-4 py-2">
        <span className="text-[12px] font-medium text-[#3C3C43]">
          {projects.length} {projects.length === 1 ? 'item' : 'items'}
        </span>
        <span className="text-[11px] text-[#86868B]">Double-click to open</span>
      </div>

      {/* Icon grid */}
      <div className="os-scroll flex-1 overflow-y-auto p-5">
        <div className="flex flex-wrap gap-5">
          {projects.map((p) => {
            const on = selected === p.id
            const open = () => openApp('project', p.id)
            return (
              <button
                key={p.id}
                type="button"
                onDoubleClick={open}
                onClick={() => setSelected(p.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    open()
                  }
                }}
                className="os-focusable group flex w-[124px] flex-col items-center gap-1.5 rounded-xl p-2 transition-colors"
                style={on ? { background: '#CCFBF1' } : undefined}
                onMouseEnter={(e) => {
                  if (!on) e.currentTarget.style.background = '#F5F5F7'
                }}
                onMouseLeave={(e) => {
                  if (!on) e.currentTarget.style.background = 'transparent'
                }}
                aria-label={`${p.name} — ${p.tagline}. Open project.`}
              >
                <span className="transition-transform duration-200 group-hover:scale-[1.06]">
                  <AppIcon name="project" size={68} />
                </span>
                <span className="text-center text-[12px] font-medium leading-tight text-[#1D1D1F]">
                  {p.name}
                </span>
                <span className="text-center text-[10.5px] leading-tight text-[#86868B]">
                  {p.tagline}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer hint */}
      <div className="shrink-0 border-t border-black/[0.07] bg-[#FAFAFC] px-4 py-2">
        <p className="text-[11px] text-[#86868B]">
          Tip: press{' '}
          <kbd className="rounded border border-black/15 bg-white px-1 text-[10px]">⌘K</kbd>{' '}
          and search any project by name or stack.
        </p>
      </div>
    </div>
  )
}
