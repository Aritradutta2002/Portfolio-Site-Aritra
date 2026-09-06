'use client'

import * as React from 'react'
import experience from '@/content/experience.json'

const ACCENT = '#0F766E'

export default function ExperienceApp() {
  const [activeId, setActiveId] = React.useState<string>(experience[0]?.id ?? '')
  const active = experience.find((e) => e.id === activeId) ?? experience[0]

  return (
    <div className="flex h-full w-full bg-white text-[#1D1D1F] dark:bg-[#1e1e20] dark:text-[#f4f4f6]">
      {/* ── Left column: role list (Finder column view) ── */}
      <div className="os-scroll w-[42%] min-w-[190px] max-w-[300px] shrink-0 overflow-y-auto border-r border-black/[0.08] bg-[#F7F7F9] py-1.5 dark:border-white/10 dark:bg-[#252529]">
        <p className="px-3 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[#86868B]">
          Roles
        </p>
        {experience.map((role) => {
          const on = role.id === active?.id
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => setActiveId(role.id)}
              aria-current={on}
              className="os-focusable block w-full px-3 py-2 text-left transition-colors"
              style={
                on
                  ? { background: 'var(--experience-selected-bg)' }
                  : undefined
              }
              onMouseEnter={(e) => {
                if (!on) e.currentTarget.style.background = document.documentElement.classList.contains('dark') ? '#303036' : '#EFEFF2'
              }}
              onMouseLeave={(e) => {
                if (!on) e.currentTarget.style.background = 'transparent'
              }}
            >
              <span
                className="block truncate text-[12.5px] font-semibold leading-snug"
                style={on ? { color: ACCENT } : undefined}
              >
                {role.org}
              </span>
              <span className="block truncate text-[11.5px] text-[#6E6E73]">{role.role}</span>
              <span className="block truncate text-[10.5px] text-[#A1A1A6]">{role.period}</span>
            </button>
          )
        })}
      </div>

      {/* ── Right column: detail pane ── */}
      {active && (
        <div className="os-scroll min-w-0 flex-1 overflow-y-auto px-5 py-4">
          <header className="mb-3">
            <h1 className="text-[17px] font-semibold leading-tight tracking-[-0.01em]">
              {active.role}
            </h1>
            <p className="mt-0.5 text-[13px] font-medium" style={{ color: ACCENT }}>
              {active.org}
            </p>
            <p className="mt-0.5 text-[11.5px] text-[#86868B]">
              {active.period} · {active.location}
            </p>
          </header>

          <p className="mb-3 text-[13px] leading-[1.62] text-[#3C3C43] dark:text-[#d1d1d6]">{active.summary}</p>

          {/* Impact highlights */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {active.highlights.map((h) => (
              <span
                key={h}
                className="rounded-md px-2 py-[3px] text-[11px] font-semibold bg-[#CCFBF1] text-[#0F766E] dark:bg-[#0d3330] dark:text-[#2dd4bf]"
              >
                {h}
              </span>
            ))}
          </div>

          <h2 className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[#86868B]">
            What I did
          </h2>
          <ul className="mb-4 space-y-2">
            {active.bullets.map((b) => (
              <li key={b} className="flex gap-2.5 text-[12.5px] leading-[1.6] text-[#3C3C43] dark:text-[#d1d1d6]">
                <span
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: '#2DD4BF' }}
                  aria-hidden="true"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <h2 className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[#86868B]">
            Stack
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {active.stack.map((s) => (
              <span
                key={s}
                className="rounded-md px-2 py-[3px] text-[11.5px] font-medium"
                style={{ background: 'var(--os-chip-bg)', color: 'var(--os-chip-text)' }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
