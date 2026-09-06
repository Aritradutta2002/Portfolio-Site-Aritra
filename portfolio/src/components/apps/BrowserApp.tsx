'use client'

import * as React from 'react'
import { ArrowUpRight, Globe2, Search } from 'lucide-react'

const LINKS = [
  { label: 'Portfolio home', href: '/' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Resume', href: '/resume' },
  { label: 'GitHub', href: 'https://github.com/' },
]

export default function BrowserApp() {
  const [address, setAddress] = React.useState('')

  const openAddress = (event: React.FormEvent) => {
    event.preventDefault()
    const value = address.trim()
    if (!value) return
    const target = /^https?:\/\//i.test(value) ? value : `https://${value}`
    window.open(target, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#f5f7fb] text-[#1d2433]">
      <form onSubmit={openAddress} className="flex items-center gap-2 border-b border-black/[0.08] bg-white/80 px-4 py-3">
        <Globe2 size={16} className="text-[#4c73d8]" />
        <div className="flex flex-1 items-center gap-2 rounded-full bg-[#eef1f7] px-3 py-2">
          <Search size={14} className="text-black/35" />
          <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Search or enter a website address" aria-label="Website address" className="w-full bg-transparent text-[12px] outline-none placeholder:text-black/35" />
        </div>
        <button type="submit" className="rounded-full bg-[#3768d8] px-3 py-2 text-[11px] font-semibold text-white transition hover:bg-[#2856bd]">Go</button>
      </form>
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-[#65dff5] to-[#3864d8] text-white shadow-xl shadow-[#4775dd]/25">
          <Globe2 size={42} strokeWidth={1.5} />
        </div>
        <p className="mt-5 text-2xl font-semibold tracking-tight">Aurora</p>
        <p className="mt-1 text-center text-sm text-black/45">A clear path to the web.</p>
        <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-3">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined} className="group flex items-center justify-between rounded-2xl border border-black/[0.07] bg-white/80 px-4 py-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="text-[12px] font-medium">{link.label}</span>
              <ArrowUpRight size={14} className="text-black/30 transition group-hover:text-[#3768d8]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}