'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Sparkles } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'
import { scrollTo } from '@/lib/lenis'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'

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
  .filter((i) => i.href.startsWith('#'))
  .map((i) => i.href.slice(1))

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => { setMounted(true) }, [])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) scrollTo(href.slice(1))
    setIsOpen(false)
  }

  const isActive = (href: string) =>
    href.startsWith('#') ? active === href.slice(1) : false

  return (
    <motion.nav
      className={[
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out-expo',
        scrolled
          ? 'glass-strong border-b border-line-soft shadow-glass-sm'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-[70px]">

          {/* ── Logo ─────────────────────────── */}
          <motion.button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Go to top"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/60 group-hover:ring-secondary/70 transition-all duration-300 shadow-neon-primary">
              <Image
                src="/aritra-profile-picture.png"
                alt="Aritra"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <span className="text-[17px] font-bold tracking-tight">
              <span className="gradient-text-static">Aritra</span>
              <span className="text-fg-0 ml-1">Dutta</span>
            </span>
          </motion.button>

          {/* ── Desktop Nav ───────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => {
              const active_ = isActive(item.href)
              if (item.href.startsWith('#')) {
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={[
                      'relative px-3.5 py-2 text-[13.5px] font-medium rounded-md transition-colors duration-200',
                      active_ ? 'text-primary' : 'text-fg-3 hover:text-fg-0',
                    ].join(' ')}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {active_ && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-md bg-primary/15 border border-primary/40 shadow-neon-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                    {!active_ && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary group-hover:w-4/5 transition-all duration-300" />
                    )}
                  </motion.button>
                )
              }
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Link
                    href={item.href}
                    className="relative px-3.5 py-2 text-[13.5px] font-medium rounded-md text-fg-3 hover:text-fg-0 transition-colors duration-200 block"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )
            })}

            <div className="w-px h-5 bg-line mx-1" />

            <Button
              size="sm"
              variant="glow"
              onClick={() => handleNavClick('#contact')}
              className="font-mono"
              icon={<span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />}
            >
              Hire Me
            </Button>

            {mounted && (
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-md glass flex items-center justify-center text-fg-3 hover:text-primary hover:border-primary/40 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun size={16} className="text-amber" />
                ) : (
                  <Moon size={16} className="text-sky" />
                )}
              </button>
            )}
          </div>

          {/* ── Mobile Controls ───────────────── */}
          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-md glass flex items-center justify-center text-fg-3 hover:text-primary transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} className="text-amber" /> : <Moon size={16} className="text-sky" />}
              </button>
            )}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-fg-2 hover:bg-bg-2 transition-colors duration-200"
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
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
            </motion.button>
          </div>
        </div>

        {/* ── Mobile Menu ──────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: 'auto',
                transition: { duration: 0.3, staggerChildren: 0.05, delayChildren: 0.05 },
              }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
              className="md:hidden overflow-hidden"
            >
              <div className="pb-4 pt-2 border-t border-line-soft">
                <div className="flex flex-col gap-1 mt-2">
                  {navItems.map((item) => {
                    const active_ = isActive(item.href)
                    if (item.href.startsWith('#')) {
                      return (
                        <motion.button
                          key={item.name}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          onClick={() => handleNavClick(item.href)}
                          className={[
                            'text-left px-4 py-3 rounded-md text-[14px] font-medium transition-all duration-200 flex items-center gap-3',
                            active_
                              ? 'bg-primary/10 text-primary border border-primary/30'
                              : 'text-fg-2 hover:bg-bg-2 hover:text-fg-0',
                          ].join(' ')}
                        >
                          {active_ && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                          {item.name}
                        </motion.button>
                      )
                    }
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-left px-4 py-3 rounded-md text-[14px] font-medium text-fg-2 hover:bg-bg-2 hover:text-fg-0 transition-all duration-200"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    )
                  })}

                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2"
                  >
                    <Button
                      size="md"
                      variant="primary"
                      fullWidth
                      onClick={() => handleNavClick('#contact')}
                      icon={<Sparkles size={14} />}
                    >
                      Hire Me
                    </Button>
                  </motion.div>

                  <div className="flex flex-wrap gap-1.5 mt-3 px-1">
                    <Chip tone="primary" size="sm">Java 17</Chip>
                    <Chip tone="secondary" size="sm">Spring Boot 3</Chip>
                    <Chip tone="rose" size="sm">Angular 20</Chip>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
