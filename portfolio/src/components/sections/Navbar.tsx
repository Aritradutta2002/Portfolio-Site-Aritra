'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ThemeToggle } from '@/components/luxe/ThemeToggle'

const links = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Work', href: '#work' },
  { name: 'Experience', href: '#experience' },
  { name: 'Writing', href: '#writing' },
  { name: 'Contact', href: '#contact' },
]

const ids = links.map((l) => l.href.slice(1))

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const lastY = useRef(0)

  useMotionValueEvent(scrollY, 'change', (y) => {
    // Border / background / height state for the floating bar.
    setScrolled(y > 32)

    // Direction-aware auto-hide with a dead zone.
    // The old `y > prev + 4` threshold flickered: smooth (Lenis) scroll
    // moves <4px per event, so the header toggled up/down constantly as
    // you scrolled past 480px. Now we only act on real directional
    // movement and ignore micro-jitters in between.
    const delta = y - lastY.current
    if (Math.abs(delta) < 8) return
    lastY.current = y
    if (open) return
    if (delta > 0 && y > 480) setHidden(true)
    else if (delta < 0) setHidden(false)
  })

  useEffect(() => {
    const obs: IntersectionObserver[] = []
    const track = ['home', ...ids]
    track.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id) },
        { rootMargin: '-38% 0px -55% 0px' }
      )
      o.observe(el)
      obs.push(o)
    })
    return () => obs.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open ])

  const go = (href: string) => {
    setOpen(false)
    requestAnimationFrame(() => {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-6 sm:pt-4"
      >
        <div
          className={`mx-auto max-w-6xl rounded-[18px] border transition-all duration-500 ${
            scrolled && !open
              ? 'border-line/10 bg-background/75 shadow-card backdrop-blur-2xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <div className={`flex items-center justify-between px-4 sm:px-5 transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
            <button onClick={() => go('#home')} className="pointer-events-auto group flex items-center gap-3" aria-label="Back to top">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold font-serifd text-lg italic text-gold-ink shadow-gold-soft transition-transform duration-300 group-hover:-rotate-6">
                A
              </span>
              <span className="text-left leading-none">
                <span className="block font-display text-[15px] font-bold tracking-tight text-ink">
                  Aritra Dutta
                </span>
                <span className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  <span className="h-1.5 w-1.5 rounded-full bg-emeraldx animate-pulse-dot" />
                  Open to work
                </span>
              </span>
            </button>

            <nav className="pointer-events-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
              {links.map((l) => {
                const isActive = active === l.href.slice(1)
                return (
                  <button
                    key={l.name}
                    onClick={() => go(l.href)}
                    className={`relative rounded-full px-4 py-2.5 text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                      isActive ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="luxe-nav-pill"
                        className="absolute inset-0 rounded-full border border-gold/30 bg-gold-soft"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      {isActive && <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />}
                      {l.name}
                    </span>
                  </button>
                )
              })}
              <span className="mx-2 h-6 w-px bg-line/10" aria-hidden="true" />
              <ThemeToggle />
              <button
                onClick={() => go('#contact')}
                className="btn-gold btn-press ml-1 inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-5 text-[13px] font-bold"
              >
                Hire me <ArrowUpRight size={15} strokeWidth={2.5} />
              </button>
            </nav>

            <div className="pointer-events-auto flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setOpen(!open)}
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border border-line/15 bg-surface/60 backdrop-blur-xl"
              >
                <motion.span animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className="block h-[2px] w-5 bg-ink" />
                <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="block h-[2px] w-5 bg-ink" />
                <motion.span animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className="block h-[2px] w-5 bg-ink" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[95] flex flex-col bg-background/95 backdrop-blur-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex-1 overflow-y-auto px-6 pb-10 pt-28" style={{ height: '100dvh' }}>
              <nav className="flex flex-col" aria-label="Mobile">
                {[{ name: 'Home', href: '#home' }, ...links].map((l, i) => (
                  <motion.button
                    key={l.name}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.055, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => go(l.href)}
                    className="group flex items-baseline gap-4 border-b border-line/10 py-4 text-left"
                  >
                    <span className="font-mono text-xs text-gold">0{i + 1}</span>
                    <span className="font-display text-4xl font-bold tracking-tight text-ink transition-colors group-active:text-gold">
                      {l.name}
                    </span>
                    <ArrowUpRight size={20} className="ml-auto text-muted" />
                  </motion.button>
                ))}
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex flex-col gap-3"
              >
                <button
                  onClick={() => go('#contact')}
                  className="btn-gold inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full font-bold"
                >
                  Hire me <ArrowUpRight size={17} />
                </button>
                <Link
                  href="/blog"
                  onClick={() => setOpen(false)}
                  className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-line/15 font-semibold text-ink"
                >
                  Read the blog
                </Link>
                <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  aritradutta049@gmail.com
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
