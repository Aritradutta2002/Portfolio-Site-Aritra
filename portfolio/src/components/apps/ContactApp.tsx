'use client'

import * as React from 'react'
import about from '@/content/about.json'

const ACCENT = '#0F766E'
const TO_EMAIL = about.links.email.replace('mailto:', '')

type Status = 'idle' | 'sending' | 'sent' | 'error'

const FIELD =
  'w-full rounded-md border border-black/[0.12] bg-white px-2.5 py-1.5 text-[12.5px] text-[#1D1D1F] placeholder:text-[#A1A1A6] focus:border-[#2DD4BF] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]'

export default function ContactApp() {
  const [form, setForm] = React.useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = React.useState<Status>('idle')
  const [error, setError] = React.useState<string | null>(null)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const mailtoFallback = () => {
    const body = `${form.message}\n\n— ${form.name} (${form.email})`
    window.location.href = `mailto:${TO_EMAIL}?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(body)}`
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('All fields are required.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('That email address doesn’t look right.')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', subject: '', message: '' })
        return
      }
      /* No transactional provider configured → fall back to the mail client. */
      mailtoFallback()
      setStatus('sent')
    } catch {
      mailtoFallback()
      setStatus('sent')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-full w-full flex-col bg-white text-[#1D1D1F]"
      noValidate
    >
      {/* ── Header row (Mail.app compose) ── */}
      <div className="shrink-0 border-b border-black/[0.08] bg-[#FAFAFC]">
        <div className="flex items-center gap-2 px-4 py-1.5">
          <label htmlFor="c-to" className="w-12 shrink-0 text-right text-[11.5px] text-[#86868B]">
            To:
          </label>
          <input
            id="c-to"
            value={`${about.name} <${TO_EMAIL}>`}
            readOnly
            className="min-w-0 flex-1 rounded-md border border-transparent bg-transparent px-2.5 py-1 text-[12.5px] text-[#3C3C43]"
          />
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5">
          <label htmlFor="c-subject" className="w-12 shrink-0 text-right text-[11.5px] text-[#86868B]">
            Subject:
          </label>
          <input
            id="c-subject"
            value={form.subject}
            onChange={set('subject')}
            placeholder="Let’s build something"
            className={`min-w-0 flex-1 rounded-md border border-black/[0.12] bg-white px-2.5 py-1 text-[12.5px] placeholder:text-[#A1A1A6] focus:border-[#2DD4BF] focus:outline-none focus:ring-1 focus:ring-[#2DD4BF]`}
          />
        </div>
      </div>

      {/* ── Reply-to + body ── */}
      <div className="os-scroll min-h-0 flex-1 overflow-y-auto px-4 py-3">
        <div className="mb-3 grid grid-cols-2 gap-2">
          <div>
            <label htmlFor="c-name" className="mb-1 block text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#86868B]">
              Your name
            </label>
            <input
              id="c-name"
              value={form.name}
              onChange={set('name')}
              placeholder="Ada Lovelace"
              className={FIELD}
            />
          </div>
          <div>
            <label htmlFor="c-email" className="mb-1 block text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#86868B]">
              Your email
            </label>
            <input
              id="c-email"
              type="email"
              value={form.email}
              onChange={set('email')}
              placeholder="ada@example.com"
              className={FIELD}
            />
          </div>
        </div>

        <label htmlFor="c-message" className="mb-1 block text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#86868B]">
          Message
        </label>
        <textarea
          id="c-message"
          value={form.message}
          onChange={set('message')}
          rows={6}
          placeholder="Hi Aritra — I’d like to talk about…"
          className={`${FIELD} resize-none leading-[1.6]`}
        />

        {error && (
          <p role="alert" className="mt-2 text-[12px] font-medium text-[#B91C1C]">
            {error}
          </p>
        )}
        {status === 'sent' && (
          <p role="status" className="mt-2 text-[12px] font-medium" style={{ color: ACCENT }}>
            Message sent — thanks for reaching out. I’ll reply soon.
          </p>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-t border-black/[0.08] bg-[#FAFAFC] px-4 py-2.5">
        <span className="text-[11px] text-[#86868B]">
          Or email directly:{' '}
          <a href={about.links.email} className="os-focusable underline" style={{ color: ACCENT }}>
            {TO_EMAIL}
          </a>
        </span>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="os-focusable rounded-lg px-4 py-1.5 text-[12.5px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: ACCENT }}
        >
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
      </div>
    </form>
  )
}
