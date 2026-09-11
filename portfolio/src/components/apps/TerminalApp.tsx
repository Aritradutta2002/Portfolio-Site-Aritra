'use client'

import * as React from 'react'
import { useWindowStore } from '@/store/windowStore'
import { runCommand, banner, type TermLine, type Tone } from '@/lib/terminalCommands'

const TONE_CLASS: Record<Tone, string> = {
  out: 'text-[#E8E8ED]',
  err: 'text-[#FF6B6B]',
  accent: 'text-[#2DD4BF]',
  dim: 'text-[#8A8A93]',
  head: 'text-white font-semibold',
}

const PROMPT_USER = 'aritro'
const PROMPT_HOST = 'macbook'

export default function TerminalApp() {
  const openApp = useWindowStore((s) => s.openApp)

  const [lines, setLines] = React.useState<TermLine[]>(() => banner())
  const [value, setValue] = React.useState('')
  const [history, setHistory] = React.useState<string[]>([])
  const [histIdx, setHistIdx] = React.useState<number | null>(null)

  const inputRef = React.useRef<HTMLInputElement>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const clear = React.useCallback(() => setLines([]), [])

  /* Keep the view pinned to the newest output. */
  React.useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = value
    setLines((prev) => [
      ...prev,
      { text: `${PROMPT_USER}@${PROMPT_HOST} ~ % ${cmd}`, tone: 'out' },
      ...runCommand(cmd, { openApp, clear }).lines,
    ])
    if (cmd.trim()) setHistory((h) => [...h, cmd])
    setHistIdx(null)
    setValue('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (!history.length) return
      const next = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(next)
      setValue(history[next])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx === null) return
      const next = histIdx + 1
      if (next >= history.length) {
        setHistIdx(null)
        setValue('')
      } else {
        setHistIdx(next)
        setValue(history[next])
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      clear()
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault()
      setLines((prev) => [...prev, { text: `${PROMPT_USER}@${PROMPT_HOST} ~ % ${value}^C`, tone: 'dim' }])
      setValue('')
    }
  }

  return (
    <div
      className="os-terminal os-scroll-dark flex h-full w-full flex-col overflow-y-auto bg-[#111114] px-3 py-2.5 text-[#E8E8ED]"
      onClick={() => inputRef.current?.focus()}
      ref={scrollRef}
      data-lenis-prevent
    >
      <div className="whitespace-pre-wrap break-words">
        {lines.map((l, i) => (
          <div key={i} className={TONE_CLASS[l.tone ?? 'out']}>
            {l.text || ' '}
          </div>
        ))}
      </div>

      {/* Input line */}
      <form onSubmit={submit} className="mt-0.5 flex items-baseline gap-1.5">
        <label htmlFor="term-input" className="shrink-0 whitespace-nowrap text-[#2DD4BF]">
          {PROMPT_USER}
          <span className="text-[#8A8A93]">@</span>
          {PROMPT_HOST}
          <span className="text-[#8A8A93]"> ~ %</span>
        </label>
        <input
          id="term-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-[#E8E8ED] caret-transparent focus:outline-none"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal input"
          autoFocus
        />
        <span className="os-caret -ml-[7px] inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-[#E8E8ED]" aria-hidden="true" />
      </form>

      <p className="mt-3 text-[11px] text-[#5A5A63]">
        Try: <span className="text-[#8A8A93]">whoami</span> · <span className="text-[#8A8A93]">ls skills</span> ·{' '}
        <span className="text-[#8A8A93]">cd algoguru</span> ·{' '}
        <span className="text-[#8A8A93]">open resume</span>
      </p>
    </div>
  )
}
