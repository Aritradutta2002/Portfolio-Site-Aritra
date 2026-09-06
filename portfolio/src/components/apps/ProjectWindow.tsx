'use client'

import * as React from 'react'
import projects from '@/content/projects.json'
import AppIcon from '@/components/os/AppIcons'
import type { AppProps } from './types'

const ACCENT = '#0F766E'
const ACCENT_SOFT = '#CCFBF1'

export default function ProjectWindow({ payload }: AppProps) {
  const project = projects.find((p) => p.id === payload) ?? projects[0]

  if (!project) {
    return (
      <div className="grid h-full place-items-center bg-white text-[13px] text-[#86868B]">
        No project found.
      </div>
    )
  }

  const links = [
    project.links.live ? { label: 'Live site', href: project.links.live, primary: true } : null,
    project.links.github ? { label: 'GitHub', href: project.links.github, primary: false } : null,
  ].filter(Boolean) as Array<{ label: string; href: string; primary: boolean }>

  return (
    <div className="os-scroll h-full w-full overflow-y-auto bg-white px-5 py-4 text-[#1D1D1F]">
      {/* ── Header ── */}
      <header className="mb-4 flex items-start gap-3.5">
        <AppIcon name="project" size={54} />
        <div className="min-w-0 flex-1">
          <h1 className="text-[19px] font-semibold leading-tight tracking-[-0.01em]">
            {project.name}
          </h1>
          <p className="mt-0.5 text-[13px] font-medium" style={{ color: ACCENT }}>
            {project.tagline}
          </p>
        </div>
      </header>

      {/* ── Actions ── */}
      {links.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="os-focusable inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-opacity hover:opacity-85"
              style={
                l.primary
                  ? { background: ACCENT, color: '#FFFFFF' }
                  : { background: '#F2F2F7', color: '#1D1D1F' }
              }
            >
              {l.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      )}

      {/* ── Summary ── */}
      <p className="mb-4 text-[13px] leading-[1.62] text-[#3C3C43]">{project.summary}</p>

      {/* ── Description ── */}
      <section className="mb-4">
        <h2 className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[#86868B]">
          Overview
        </h2>
        <p className="text-[12.5px] leading-[1.65] text-[#3C3C43]">{project.description}</p>
      </section>

      {/* ── Features ── */}
      <section className="mb-4">
        <h2 className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[#86868B]">
          What it does
        </h2>
        <ul className="space-y-2">
          {project.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-[12.5px] leading-[1.6] text-[#3C3C43]">
              <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: '#2DD4BF' }}
                aria-hidden="true"
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Stack ── */}
      <section className="mb-4">
        <h2 className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[#86868B]">
          Built with
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-md bg-[#F2F2F7] px-2 py-[3px] text-[11.5px] font-medium text-[#3C3C43]"
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── Role ── */}
      <section>
        <h2 className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[#86868B]">
          My role
        </h2>
        <div
          className="rounded-xl border px-3.5 py-2.5 text-[12.5px] leading-[1.6]"
          style={{ borderColor: ACCENT_SOFT, background: '#F6FEFC', color: '#134E4A' }}
        >
          {project.role}
        </div>
      </section>
    </div>
  )
}
