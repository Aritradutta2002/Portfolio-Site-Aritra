'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown, Download, Github, Linkedin, Code2, ArrowUpRight, ArrowDown } from 'lucide-react'
import { Marquee } from './Marquee'
import { CountUp } from './CountUp'
import { useSpotlight, useMagnetic, useTilt, useIntroReady } from '@/lib/interactions'

/* ── Stats ──────────────────────────────────────────────────── */
const stats = [
  { to: 700,  suffix: '+',   label: 'Problems Solved' },
  { to: 1672, suffix: '',    label: 'LeetCode Rating' },
  { to: 2,    suffix: 'yr+', label: 'at TCS' },
]

/* ── Roles (previously typewriter) ──────────────────────────── */
const roles = ['Full Stack Engineer', 'Problem Solver', 'Full Stack Dev']

/* ── Social quick-links ─────────────────────────────────────── */
const socials = [
  { icon: Github,   href: 'https://github.com/Aritradutta2002',                  label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/aritra-dutta-rick20/',    label: 'LinkedIn' },
  { icon: Code2,    href: 'https://leetcode.com/u/ari2002/',                     label: 'LeetCode' },
]

const marqueeItems = [
  'Java 21', 'Spring Boot 3', 'PostgreSQL', 'Azure PaaS',
  'Microservices', 'Docker', 'REST APIs', 'Jenkins',
]

/* ── Portrait with tilt ─────────────────────────────────────── */
function Portrait() {
  const { targetRef } = useTilt<HTMLDivElement>(8)
  return (
    <div ref={targetRef} data-tilt className="relative rounded-2xl border border-line/10 bg-surface overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-line/10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>Profile — 001</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse" />
          Open
        </span>
      </div>
      <Image
        src="/aritra-profile-picture.png"
        alt="Aritra Dutta – Software Engineer"
        width={640}
        height={640}
        className="w-full aspect-square object-cover grayscale-[35%] contrast-[1.05]"
        priority
      />
      <div className="flex items-center justify-between px-5 py-3 border-t border-line/10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        <span>Bhubaneswar, IN</span>
        <span className="text-acidstrong">EST. 2024</span>
      </div>
    </div>
  )
}

/* ── Hero ───────────────────────────────────────────────────── */
export function Hero() {
  const scrollToAbout = () =>
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  const { containerRef: heroRef } = useSpotlight<HTMLElement>()
  const { targetRef: primaryCtaRef } = useMagnetic<HTMLButtonElement>(0.3)
  const { targetRef: resumeCtaRef } = useMagnetic<HTMLAnchorElement>(0.25)

  /* Gentle parallax — portrait drifts down as the hero scrolls away */
  const { scrollY } = useScroll()
  const portraitY = useTransform(scrollY, [0, 700], [0, 70])

  /* Entrances wait for the intro curtain (instant when curtain is
     skipped: reduced-motion or repeat visit) */
  const ready = useIntroReady()

  return (
    <section
      id="home"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={heroRef as any}
      className="spotlight-container relative overflow-hidden pt-[72px]"
    >
      {/* Spotlight glow — position driven by useSpotlight via translate3d */}
      <div data-spotlight className="z-0" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full relative z-10 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">

          {/* ── LEFT: Statement ─────────────────────────────── */}
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-line/12 bg-line/[0.03] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse" />
              Full Stack Engineer @ TCS
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="hero-display font-bold text-ink mb-6"
            >
              Aritra Dutta<span className="text-acidstrong">.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-2.5 mb-8"
            >
              {roles.map((role) => (
                <span
                  key={role}
                  className="px-4 py-2 rounded-full border border-line/12 font-mono text-xs uppercase tracking-[0.16em] text-ink/80"
                >
                  {role}
                </span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg leading-relaxed text-muted max-w-xl mb-10"
            >
              Building enterprise microservices at{' '}
              <span className="font-semibold text-ink">TCS</span>.
              {' '}Delivered up to{' '}
              <span className="font-semibold text-acidstrong">30x API performance gains</span> and led cloud migrations to Azure PaaS.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3.5 mb-12"
            >
              <motion.button
                ref={primaryCtaRef}
                onClick={scrollToAbout}
                className="magnetic magnetic-glow inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-acid text-[#101204] font-bold text-sm"
              >
                More about me
                <ArrowDown size={16} />
              </motion.button>

              <motion.a
                ref={resumeCtaRef}
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic magnetic-glow inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-line/15 text-ink font-bold text-sm hover:border-acid/60 hover:text-acidstrong"
              >
                <Download size={16} />
                Resume
              </motion.a>

              <a
                href="https://www.algoguru.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-line/15 text-ink font-bold text-sm hover:border-acid/60 hover:text-acidstrong transition-colors duration-300"
              >
                AlgoGuru
                <ArrowUpRight size={16} />
              </a>
            </motion.div>

            {/* Stats band */}
            <motion.dl
              initial={{ opacity: 0, y: 20 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="grid grid-cols-3 border-t border-line/10 pt-7 gap-6"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="order-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted mt-1.5">
                    {s.label}
                  </dt>
                  <dd className="order-1 text-3xl md:text-4xl font-bold tracking-tight text-ink">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ── RIGHT: Portrait + socials ───────────────────── */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div style={{ y: portraitY }}>
                <Portrait />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-3 mt-6"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Connect</span>
              <span className="h-px flex-1 bg-line/10" aria-hidden="true" />
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full flex items-center justify-center border border-line/12 text-muted hover:text-[#101204] hover:bg-acid hover:border-acid transition-colors duration-300"
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Tech marquee ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <Marquee items={marqueeItems} />
      </motion.div>

      {/* ── Scroll cue ───────────────────────────────────────── */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-1.5 text-muted hover:text-acidstrong transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        aria-label="Scroll to About"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
