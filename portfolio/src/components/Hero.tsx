'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown, Download, Github, Linkedin, Code2, Globe, ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { scrollTo } from '@/lib/lenis'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { EASE } from '@/lib/motion'

/* ── Typewriter — simpler & smoother ───────────── */
function TypewriterText({ texts }: { texts: string[] }) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [j, setJ] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const current = texts[i] ?? ''
    const speed = del ? 35 : 80
    const t = setTimeout(() => {
      if (!del && j < current.length) {
        setText(current.slice(0, j + 1))
        setJ(j + 1)
      } else if (!del && j === current.length) {
        setTimeout(() => setDel(true), 1800)
      } else if (del && j > 0) {
        setText(current.slice(0, j - 1))
        setJ(j - 1)
      } else if (del && j === 0) {
        setDel(false)
        setI((p) => (p + 1) % texts.length)
      }
    }, speed)
    return () => clearTimeout(t)
  }, [j, del, i, texts])

  return (
    <span className="inline-flex items-baseline">
      <span className="gradient-text font-black">{text || '\u00A0'}</span>
      <span
        className="inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-sm bg-gradient-to-b from-primary to-rose animate-caret-blink"
        style={{ boxShadow: '0 0 12px hsl(var(--primary) / 0.7)' }}
        aria-hidden
      />
    </span>
  )
}

/* ── Stats ───────────────────────────────────────── */
const stats = [
  { value: '554+',  label: 'Problems Solved' },
  { value: '1672',  label: 'LeetCode Rating' },
  { value: '1.5yr+', label: 'at TCS' },
]

/* ── Floating tech badges ───────────────────────── */
const techOrbit = [
  { label: 'Java',    tone: 'primary'   as const, x: '-90%', y: '-20%', delay: 0 },
  { label: 'Spring',  tone: 'emerald'   as const, x: '70%',  y: '-15%', delay: 0.5 },
  { label: 'Azure',   tone: 'sky'       as const, x: '85%',  y: '50%',  delay: 1 },
  { label: 'Angular', tone: 'rose'      as const, x: '-80%', y: '55%',  delay: 1.5 },
  { label: 'SQL',     tone: 'amber'     as const, x: '-30%', y: '-80%', delay: 2 },
]

const socials = [
  { icon: Github,   href: 'https://github.com/Aritradutta2002',               label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/aritra-dutta-rick20/', label: 'LinkedIn' },
  { icon: Code2,    href: 'https://leetcode.com/u/ari2002/',                  label: 'LeetCode' },
]

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative pt-24 lg:pt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Text Content ─────────────── */}
          <div className="order-2 lg:order-1 text-center lg:text-left">

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE.outExpo }}
              className="text-sm sm:text-base text-fg-3 font-mono tracking-wide mb-3 uppercase"
            >
              &lt;hello world /&gt; I&apos;m
            </motion.p>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-tight text-fg-0 mb-5 leading-[1.02]">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE.outExpo }}
              >
                Aritra
              </motion.span>
              <motion.span
                className="block gradient-text text-glow-sm"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: EASE.outExpo }}
              >
                Dutta
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE.outExpo }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-fg-1 mb-6 min-h-[1.3em]"
            >
              <TypewriterText
                texts={['Backend Engineer', 'Problem Solver', 'Full Stack Dev', 'Cloud Native Builder']}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE.outExpo }}
              className="text-base sm:text-lg text-fg-3 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 text-pretty"
            >
              Building enterprise microservices at{' '}
              <span className="font-semibold gradient-text-static">TCS</span>. Delivered
              up to <span className="font-semibold text-amber">30× API performance gains</span>
              {' '}and led cloud migrations to Azure PaaS.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE.outExpo }}
              className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mb-10"
            >
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-md px-4 py-3 text-center lg:text-left min-w-[110px] hover-tilt"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold gradient-text leading-none">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-fg-3 mt-1.5 font-mono uppercase tracking-wide">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease: EASE.outExpo }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => scrollTo('about')}
                iconRight={<ArrowRight size={16} />}
              >
                About me
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('/resume', '_blank')}
                icon={<Download size={15} />}
              >
                Resume.pdf
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={() => window.open('https://www.algoguru.online/', '_blank', 'noopener,noreferrer')}
                icon={<Globe size={15} />}
              >
                AlgoGuru
              </Button>
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <span className="text-xs text-fg-3 font-mono uppercase tracking-widest">&gt; Connect</span>
              <div className="flex gap-2.5">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.12, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    data-cursor="hover"
                    className="w-10 h-10 rounded-md glass flex items-center justify-center text-fg-3 hover:text-primary hover:border-primary/40 hover:shadow-neon-primary transition-all duration-300"
                  >
                    <Icon size={17} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Profile Image + Tech Orbit ──── */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end lg:-mt-10 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE.outExpo, delay: 0.2 }}
              className="relative"
            >
              {/* Ambient glow */}
              <motion.div
                className="absolute -inset-12 rounded-full"
                style={{
                  background: 'radial-gradient(circle, hsl(262 83% 58% / 0.35) 0%, hsl(189 94% 50% / 0.18) 40%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Outer dashed orbit */}
              <motion.div
                className="absolute -inset-8 rounded-full border border-dashed border-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              />

              {/* Rotating gradient ring */}
              <motion.div
                className="absolute -inset-[8px] rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, transparent, hsl(262 83% 58%), transparent, hsl(189 94% 50%), transparent)',
                  padding: '3px',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full rounded-full bg-bg-0" />
              </motion.div>

              {/* Static gradient border */}
              <div
                className="absolute -inset-[3px] rounded-full"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                  padding: '2px',
                }}
              >
                <div className="w-full h-full rounded-full bg-bg-0" />
              </div>

              {/* Image */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-glass-lg">
                <Image
                  src="/aritra-profile-picture.png"
                  alt="Aritra Dutta – Software Engineer"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-secondary/5 pointer-events-none" />
              </div>

              {/* Floating tech badges (orbit-like) */}
              {techOrbit.map((t) => (
                <motion.div
                  key={t.label}
                  className="absolute"
                  style={{ left: '50%', top: '50%' }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1, x: t.x, y: t.y }}
                  transition={{ duration: 0.8, delay: 1 + t.delay, ease: EASE.spring }}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3 + t.delay, repeat: Infinity, ease: 'easeInOut', delay: t.delay }}
                  >
                    <Chip tone={t.tone} size="md" className="font-bold shadow-glass-sm">
                      {t.label}
                    </Chip>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-fg-3 hover:text-primary transition-colors duration-300 group"
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
          <ChevronDown size={20} className="group-hover:text-primary transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  )
}
