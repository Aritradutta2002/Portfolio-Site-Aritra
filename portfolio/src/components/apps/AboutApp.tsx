'use client'

import * as React from 'react'
import Image from 'next/image'
import about from '@/content/about.json'

const ACCENT = '#0F766E' /* text-safe teal */
const ACCENT_SOFT = '#CCFBF1'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <h2 className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.09em] text-[#86868B]">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Chip({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'accent' }) {
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-[3px] text-[11.5px] font-medium leading-tight"
      style={tone === 'accent' ? { background: ACCENT_SOFT, color: ACCENT } : { background: '#F2F2F7', color: '#3C3C43' }}
    >
      {children}
    </span>
  )
}

export default function AboutApp() {
  const skillGroups = Object.entries(about.skills) as Array<[string, string[]]>

  return (
    <div className="os-scroll h-full w-full overflow-y-auto bg-white px-5 py-4 text-[#1D1D1F]">
      {/* ── Identity ── */}
      <header className="mb-5 flex items-start gap-4">
        <div
          className="relative h-[74px] w-[74px] shrink-0 overflow-hidden rounded-2xl ring-1 ring-black/10"
          style={{ boxShadow: '0 6px 18px -6px rgba(0,0,0,0.35)' }}
        >
          <Image
            src="/aritra-profile-picture.png"
            alt={`${about.name} — profile photo`}
            width={74}
            height={74}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="min-w-0 pt-0.5">
          <h1 className="text-[21px] font-semibold leading-tight tracking-[-0.01em]">
            {about.name}
          </h1>
          <p className="mt-0.5 text-[13px] font-medium" style={{ color: ACCENT }}>
            {about.title}
          </p>
          <p className="mt-1 text-[12px] text-[#6E6E73]">
            {about.company} · {about.location}
          </p>
        </div>
      </header>

      {/* ── Bio ── */}
      <Section title="Bio">
        <p className="text-[13px] leading-[1.62] text-[#3C3C43]">{about.bio}</p>
      </Section>

      {/* ── Quick facts ── */}
      <Section title="Quick facts">
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
          {about.quickFacts.map((f) => (
            <div key={f.label} className="min-w-0">
              <dt className="text-[10.5px] uppercase tracking-wide text-[#86868B]">{f.label}</dt>
              <dd className="truncate text-[12.5px] font-medium text-[#1D1D1F]">{f.value}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* ── Skills ── */}
      <Section title="Skills">
        <div className="space-y-2.5">
          {skillGroups.map(([group, items]) => (
            <div key={group} className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 shrink-0 text-[11.5px] font-semibold text-[#1D1D1F]">
                {group}
              </span>
              <span className="flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <Chip key={`${group}-${s}`}>{s}</Chip>
                ))}
              </span>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="mr-1 shrink-0 text-[11.5px] font-semibold text-[#1D1D1F]">Spoken</span>
            {about.spokenLanguages.map((l) => (
              <Chip key={l}>{l}</Chip>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Education ── */}
      <Section title="Education">
        {about.education.map((e) => (
          <div
            key={e.institution}
            className="rounded-xl border border-black/[0.07] bg-[#FAFAFC] px-3.5 py-3"
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[13.5px] font-semibold leading-snug">{e.degree}</p>
              <span className="shrink-0 rounded-md px-2 py-[2px] text-[11px] font-semibold" style={{ background: ACCENT_SOFT, color: ACCENT }}>
                CGPA {e.cgpa}
              </span>
            </div>
            <p className="mt-0.5 text-[12px] text-[#3C3C43]">{e.institution}</p>
            <p className="mt-0.5 text-[11.5px] text-[#86868B]">
              {e.location} · {e.period}
            </p>
          </div>
        ))}
      </Section>

      {/* ── Certifications & achievements ── */}
      <Section title="Certifications & Achievements">
        <div className="space-y-2">
          {about.certifications.map((c) => (
            <div key={c.title} className="rounded-xl border border-black/[0.07] bg-[#FAFAFC] px-3.5 py-2.5">
              <p className="text-[12.5px] font-semibold leading-snug">{c.title}</p>
              <p className="mt-0.5 text-[11.5px] text-[#6E6E73]">{c.detail}</p>
            </div>
          ))}
          {about.achievements.map((a) => (
            <div key={a.title} className="rounded-xl border border-black/[0.07] bg-[#FAFAFC] px-3.5 py-2.5">
              <p className="text-[12.5px] font-semibold leading-snug">{a.title}</p>
              <p className="mt-0.5 text-[11.5px] text-[#6E6E73]">{a.detail}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {a.stats.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="os-focusable inline-flex items-baseline gap-1.5 rounded-md px-2 py-1 text-[11.5px] hover:opacity-80"
                    style={{ background: ACCENT_SOFT, color: ACCENT }}
                  >
                    <span className="font-medium">{s.label}</span>
                    <span className="font-semibold">{s.value}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Links ── */}
      <Section title="Find me">
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'GitHub', href: about.links.github },
            { label: 'LinkedIn', href: about.links.linkedin },
            { label: 'LeetCode', href: about.links.leetcode },
            { label: 'CodeChef', href: about.links.codechef },
            { label: 'Email', href: about.links.email },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="os-focusable rounded-lg border border-black/[0.08] bg-white px-3 py-1.5 text-[12px] font-medium text-[#1D1D1F] transition-colors hover:border-black/20 hover:bg-[#F5F5F7]"
            >
              {l.label}
            </a>
          ))}
        </div>
      </Section>
    </div>
  )
}
