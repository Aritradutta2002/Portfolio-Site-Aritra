'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown, Download, Github, Linkedin, Code2 } from 'lucide-react'
import { useState, useEffect } from 'react'

/* ── Typewriter ─────────────────────────────────────────────── */
const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let mounted = true
    const current = texts[currentIndex] ?? ''
    const speed = isDeleting ? 45 : 95

    const handle = setTimeout(() => {
      if (!mounted) return
      if (!isDeleting && charIndex < current.length) {
        setCurrentText(current.slice(0, charIndex + 1))
        setCharIndex(c => c + 1)
      } else if (!isDeleting && charIndex === current.length) {
        setTimeout(() => { if (mounted) setIsDeleting(true) }, 2200)
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(current.slice(0, charIndex - 1))
        setCharIndex(c => c - 1)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false)
        setCurrentIndex(i => (i + 1) % texts.length)
      }
    }, speed)

    return () => { mounted = false; clearTimeout(handle) }
  }, [charIndex, currentIndex, isDeleting, texts])

  return (
    <span className="inline-flex items-baseline">
      <span
        className="font-black bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 40%, #ec4899 80%, #f59e0b 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 2px 12px rgba(139,92,246,0.35))',
        }}
      >
        {currentText || '\u00A0'}
      </span>
      {/* Caret */}
      <motion.span
        aria-hidden
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.65, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-sm"
        style={{ background: 'linear-gradient(180deg,#8b5cf6,#ec4899)', boxShadow: '0 0 12px rgba(139,92,246,0.7)' }}
      />
    </span>
  )
}

/* ── Stats ──────────────────────────────────────────────────── */
const stats = [
  { value: '600+',  label: 'Problems Solved' },
  { value: '1750',  label: 'LeetCode Rating' },
  { value: '1yr+',  label: 'at TCS' },
]

/* ── Social quick-links ─────────────────────────────────────── */
const socials = [
  { icon: Github,   href: 'https://github.com/Aritradutta2002',                  label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/aritra-dutta-rick20/',    label: 'LinkedIn' },
  { icon: Code2,    href: 'https://leetcode.com/u/ari2002/',                     label: 'LeetCode' },
]

/* ── Hero ───────────────────────────────────────────────────── */
export function Hero() {
  const scrollToAbout = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative pt-16 lg:pt-20 overflow-hidden"
    >
      {/* Minimalist Tech Gradient Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 50% 10%, rgba(139,92,246,0.15) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text Content ─────────────────────────── */}
          <div className="order-2 lg:order-1 text-center lg:text-left">

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-400 font-mono tracking-wide mb-2 uppercase"
            >
              &lt;hello world /&gt; I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.05]"
            >
              Aritra{' '}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent filter drop-shadow-[0_0_10px_rgba(139,92,246,0.3)]">
                Dutta
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-200 mb-6 min-h-[1.3em]"
            >
              <TypewriterText
                texts={['Backend Engineer', 'Problem Solver', 'Full Stack Dev']}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
            >
              Building enterprise microservices at{' '}
              <span className="font-semibold text-secondary glow">TCS</span>.
              {' '}Leading production migrations &amp; optimizations with{' '}
              <span className="font-semibold text-primary glow">20–30× performance gains</span>.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-center gap-6 justify-center lg:justify-start mb-10"
            >
              {stats.map((s, i) => (
                <div key={i} className="glass-panel px-4 py-3 rounded-lg text-center lg:text-left min-w-[120px] transition-transform hover:scale-105">
                  <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-none drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">
                    {s.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-gray-500 mt-1 font-mono uppercase tracking-wide">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              {/* Primary */}
              <motion.button
                onClick={scrollToAbout}
                className="group relative px-8 py-3.5 bg-primary/20 text-white rounded-lg font-mono text-[14px] shadow-neon-purple border border-primary/50 hover:bg-primary/30 backdrop-blur-md transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2 tracking-wider">
                  [ ABOUT_ME ]
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.button>

              {/* Secondary */}
              <motion.a
                href="/resume.pdf"
                download="Aritra_Dutta_Resume.pdf"
                className="group relative px-8 py-3.5 rounded-lg font-mono text-[14px] border border-gray-700 text-gray-300 hover:border-secondary/50 hover:text-secondary hover:shadow-neon-cyan glass-panel transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2 tracking-wider">
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  RESUME.PDF
                </span>
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">&gt; Connect</span>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-lg flex items-center justify-center glass-panel text-gray-400 hover:text-primary hover:shadow-neon-purple hover:border-primary/50 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Profile Image ───────────────────────── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-start lg:pl-4 lg:-mt-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative"
            >
              {/* Outer ambient glow */}
              <motion.div
                className="absolute -inset-8 rounded-full opacity-60"
                style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(6,182,212,0.15) 40%, transparent 70%)',
                  filter: 'blur(30px)',
                }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Rotating gradient ring */}
              <motion.div
                className="absolute -inset-[6px] rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, #8b5cf6, transparent, #06b6d4, transparent)',
                  padding: '3px',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-full bg-surface" />
              </motion.div>

              {/* Static gradient border (always visible) */}
              <div
                className="absolute -inset-[3px] rounded-full"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                  padding: '2px',
                }}
              >
                <div className="w-full h-full rounded-full bg-surface" />
              </div>

              {/* Image */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl">
                <Image
                  src="/aritra-profile-picture.png"
                  alt="Aritra Dutta – Software Engineer"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/10 via-transparent to-blue-900/5 pointer-events-none" />
              </div>

              {/* Dashed orbit ring */}
              <motion.div
                className="absolute -inset-5 rounded-full border border-dashed border-blue-300/30 dark:border-blue-500/20 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────── */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-400 dark:text-gray-600 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 group"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        aria-label="Scroll to About"
      >
        <span className="text-[11px] font-medium uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="group-hover:text-blue-500 transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  )
}
