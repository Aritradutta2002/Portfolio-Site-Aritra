'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import Image from 'next/image'

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
  const [mounted,  setMounted]  = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => { setMounted(true) }, [])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  /* ── Scroll + active-section tracking ─────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
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

  /* ── Variants ──────────────────────────────────────────────── */
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.3, staggerChildren: 0.05, delayChildren: 0.05 },
    },
  }
  const mobileItemVariants = {
    hidden:  { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
  }

  return (
    <motion.nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? 'glass-panel backdrop-blur-2xl border-b border-white/5 shadow-glass'
          : 'bg-transparent border-b border-transparent'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-[70px]">

          {/* ── Logo ─────────────────────────────────────────── */}
          <motion.button
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavClick('#home')}
          >
            {/* Avatar */}
            <div className="relative w-9 h-9 rounded-full ring-2 ring-blue-500/60 ring-offset-2 ring-offset-white dark:ring-offset-[#0a0a0a] overflow-hidden shadow-lg flex-shrink-0 group-hover:ring-purple-500/70 transition-all duration-300">
              <Image
                src="/aritra-profile-picture.png"
                alt="Aritra"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Name */}
            <span className="text-[17px] font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
                Aritra
              </span>
              <span className="text-gray-800 dark:text-gray-100 ml-1">Dutta</span>
            </span>
          </motion.button>

          {/* ── Desktop Nav ───────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, i) => {
              const active_ = isActive(item.href)
              if (item.href.startsWith('#')) {
                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative px-3.5 py-2 text-[13.5px] font-medium rounded-lg transition-colors duration-200 ${
                      active_
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {/* Active pill background */}
                    {active_ && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-primary/20 border border-primary/50 shadow-neon-purple"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>

                    {/* Hover underline */}
                    {!active_ && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-gradient-to-r from-primary to-secondary group-hover:w-4/5 transition-all duration-300 shadow-neon-cyan" />
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
                    className="relative px-3.5 py-2 text-[13.5px] font-medium rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 block"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              )
            })}

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 mx-1" />

            {/* Hire Me CTA */}
            <motion.button
              onClick={() => handleNavClick('#contact')}
              className="relative px-4 py-2 text-[13px] font-mono rounded-lg bg-primary/20 border border-primary/50 text-white shadow-neon-purple hover:bg-primary/40 transition-all duration-300 overflow-hidden group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Hire Me
              </span>
            </motion.button>

            {/* Theme toggle — compact icon button */}
            {mounted && (
              <motion.button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-gray-400 hover:text-primary hover:shadow-neon-purple hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {theme === 'dark'
                  ? <Sun size={16} className="text-amber-400" />
                  : <Moon size={16} className="text-blue-400" />}
              </motion.button>
            )}
          </div>

          {/* ── Mobile Controls ───────────────────────────────── */}
          <div className="md:hidden flex items-center gap-2">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg glass-panel flex items-center justify-center text-gray-400 hover:text-primary transition-all duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark'
                  ? <Sun size={16} className="text-amber-400" />
                  : <Moon size={16} className="text-blue-400" />}
              </button>
            )}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
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

        {/* ── Mobile Menu ───────────────────────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden overflow-hidden"
            >
              <div className="pb-4 pt-1 border-t border-gray-100 dark:border-gray-800/60">
                <div className="flex flex-col gap-1 mt-2">
                  {navItems.map((item) => {
                    const active_ = isActive(item.href)
                    if (item.href.startsWith('#')) {
                      return (
                        <motion.button
                          key={item.name}
                          variants={mobileItemVariants}
                          onClick={() => handleNavClick(item.href)}
                          className={`text-left px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 flex items-center gap-3 ${
                            active_
                              ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-500/20'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60'
                          }`}
                        >
                          {active_ && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />}
                          {item.name}
                        </motion.button>
                      )
                    }
                    return (
                      <motion.div key={item.name} variants={mobileItemVariants}>
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-left px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all duration-200"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    )
                  })}

                  {/* Mobile Hire Me */}
                  <motion.button
                    variants={mobileItemVariants}
                    onClick={() => handleNavClick('#contact')}
                    className="mt-2 mx-1 px-4 py-3 rounded-xl text-[14px] font-semibold bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-md flex items-center gap-2 justify-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Hire Me
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
