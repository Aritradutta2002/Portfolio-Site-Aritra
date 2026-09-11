'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { name: 'Home',       href: '#home' },
  { name: 'About',      href: '#about' },
  { name: 'Skills',     href: '#skills' },
  { name: 'Projects',   href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Blog',       href: '#blog' },
  { name: 'Social',     href: '/social' },
  { name: 'Contact',    href: '#contact' },
]

const sectionIds = navItems
  .filter(i => i.href.startsWith('#'))
  .map(i => i.href.slice(1))

export function Navigation() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('home')

  /* ── Scroll + active-section tracking ─────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const isActive = (href: string) =>
    href.startsWith('#') ? active === href.slice(1) : false

  /* Thin aurora scroll-progress bar pinned to the header's bottom edge */
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 })

  return (
    <motion.header
      className="fixed top-0 w-full z-[100] pt-3 sm:pt-4 px-3 sm:px-6"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Scroll progress — aurora gradient */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-aurora origin-left rounded-full"
      />

      {/* Floating glass pill */}
      <div
        className={`max-w-6xl mx-auto rounded-2xl border transition-all duration-500 ${
          scrolled
            ? 'border-aurora/15 bg-background/70 backdrop-blur-2xl shadow-glass'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className={`flex justify-between items-center px-4 sm:px-5 transition-all duration-500 ${scrolled ? 'h-14' : 'h-[72px]'}`}>

          {/* ── Brand ──────────────────────────────────────── */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2.5 group"
            aria-label="Back to top"
          >
            <span className="w-8 h-8 rounded-lg bg-aurora text-[#0B0616] font-mono font-bold text-sm flex items-center justify-center group-hover:shadow-aurora-glow transition-shadow duration-300">
              AD
            </span>
            <span className="font-display text-[15px] font-bold tracking-tight text-ink">
              Aritra Dutta
              <span className="text-aurorastrong">.</span>
            </span>
          </button>

          {/* ── Desktop Nav ─────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {navItems.map((item) => {
              const active_ = isActive(item.href)
              const cls = `relative px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-200 ${
                active_ ? 'text-aurorastrong' : 'text-muted hover:text-ink'
              }`
              const inner = (
                <>
                  {active_ && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-aurora/15 border border-aurora/25"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </>
              )
              return item.href.startsWith('#') ? (
                <button key={item.name} onClick={() => handleNavClick(item.href)} className={cls}>
                  {inner}
                </button>
              ) : (
                <Link key={item.name} href={item.href} className={cls}>
                  {inner}
                </Link>
              )
            })}
            <div className="flex items-center gap-2.5 ml-3">
              <ThemeToggle />
              <button
                onClick={() => handleNavClick('#contact')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-aurora text-[#0B0616] font-mono text-xs font-bold uppercase tracking-[0.14em] hover:shadow-aurora-glow transition-shadow duration-300"
              >
                Hire me
                <ArrowUpRight size={14} />
              </button>
            </div>
          </nav>

          {/* ── Mobile toggle ───────────────────────────────── */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-ink hover:bg-aurora/10 transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu — glass sheet ─────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', transition: { duration: 0.3, staggerChildren: 0.05, delayChildren: 0.05 } }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
              aria-label="Mobile"
            >
              <div className="pb-6 pt-2 border-t border-aurora/15">
                <div className="flex flex-col mt-2">
                  {navItems.map((item) => {
                    const active_ = isActive(item.href)
                    const cls = `text-left px-2 py-3 font-mono text-sm uppercase tracking-[0.14em] border-b border-aurora/10 transition-colors duration-200 flex items-center justify-between ${
                      active_ ? 'text-aurorastrong' : 'text-muted hover:text-ink'
                    }`
                    return item.href.startsWith('#') ? (
                      <button key={item.name} onClick={() => handleNavClick(item.href)} className={cls}>
                        {item.name}
                        <ArrowUpRight size={14} className="opacity-50" />
                      </button>
                    ) : (
                      <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)} className={cls}>
                        {item.name}
                        <ArrowUpRight size={14} className="opacity-50" />
                      </Link>
                    )
                  })}
                  <button
                    onClick={() => handleNavClick('#contact')}
                    className="mt-4 px-4 py-3 rounded-full bg-aurora text-[#0B0616] font-mono text-sm font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2"
                  >
                    Hire me
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
