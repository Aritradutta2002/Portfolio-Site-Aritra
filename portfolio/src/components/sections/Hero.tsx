'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Github, Linkedin, Code2, ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { Container } from '@/components/luxe/Container'
import { Marquee } from '@/components/luxe/Marquee'
import { GoldButton, GhostButton } from '@/components/luxe/Buttons'
import ParticleNetwork from '@/components/luxe/ParticleNetworkBFS'
import { useLuxeReady, luxeParent, luxeChild } from '@/lib/luxe'

const socials = [
  { icon: Github, href: 'https://github.com/Aritradutta2002', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/aritra-dutta-rick20/', label: 'LinkedIn' },
  { icon: Code2, href: 'https://leetcode.com/u/Ari2001/', label: 'LeetCode' },
]

const stats = [
  { value: '2+', label: 'years @ TCS' },
  { value: '700+', label: 'DSA solves' },
  { value: '1672', label: 'LeetCode rating' },
]

/* Front screen — editorial hero over the untouched particle canvas. */
export function Hero() {
  const ready = useLuxeReady()

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-background !pb-0 !pt-0"
    >
      <ParticleNetwork className="absolute inset-0 h-full w-full" />
      {/* focus vignette — keeps the centered copy crisp over the field */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 62% 52% at 50% 42%, transparent 40%, rgb(var(--bg) / 0.55) 100%)',
        }}
      />

      {/* Content layer is click-through (`pointer-events-none`) so clicks on the
          name / avatar / text fall through to the particle canvas and fire the
          BFS lightning. Only the social links stay interactive. */}
      <Container className="pointer-events-none relative z-10">
        <motion.div
          variants={luxeParent}
          initial="hidden"
          animate={ready ? 'visible' : 'hidden'}
          className="relative flex min-h-[100svh] flex-col items-center justify-center px-2 pb-24 pt-28 text-center"
        >
          {/* ── Corner microlabels ── */}
          <div
            className="pointer-events-none absolute inset-x-8 bottom-5 hidden items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-muted/70 lg:flex"
            aria-hidden="true"
          >
            <span>© 2026 Aritra Dutta</span>
            <span className="flex items-center gap-2">
              click any pixel
              <span className="h-1 w-1 rounded-full bg-gold" />
            </span>
          </div>

          {/* ── Scroll cue ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pointer-events-none absolute inset-x-0 bottom-5 hidden flex-col items-center gap-2.5 sm:flex"
            aria-hidden="true"
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-muted/70">Scroll</span>
            <span className="relative h-10 w-px overflow-hidden bg-line/10">
              <motion.span
                className="absolute left-0 top-0 h-3.5 w-px bg-gold"
                animate={{ y: [-14, 42] }}
                transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
              />
            </span>
          </motion.div>

          {/* ── Orbit portrait ── */}
          <motion.div variants={luxeChild} className="relative mb-10">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              aria-hidden="true"
            >
              <svg
                className="h-40 w-40 animate-spin text-gold/40 md:h-48 md:w-48"
                style={{ animationDuration: '22s' }}
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 6" />
              </svg>
            </div>
            <div className="absolute -inset-3 rounded-full bg-gold/25 blur-2xl" aria-hidden="true" />
            <div className="absolute -inset-1 rounded-full bg-gold/30 blur-xl" aria-hidden="true" />
            <Image
              src="/aritra-profile-picture.png"
              alt="Portrait of Aritra Dutta, full-stack engineer"
              width={256}
              height={256}
              priority
              sizes="128px"
              className="relative h-24 w-24 rounded-full object-cover ring-2 ring-gold/70 ring-offset-4 ring-offset-background shadow-gold-glow transition-transform duration-500 hover:scale-105 md:h-32 md:w-32"
            />
            <span className="absolute bottom-1 right-1 flex h-4 w-4" aria-hidden="true">
              <span className="absolute h-full w-full animate-ping rounded-full bg-emeraldx opacity-60" />
              <span className="h-4 w-4 rounded-full border-2 border-background bg-emeraldx" />
            </span>
          </motion.div>

          {/* ── Eyebrow status badge ── */}
          <motion.p
            variants={luxeChild}
            className="inline-flex items-center gap-2.5 rounded-full border border-line/12 bg-surface/70 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink backdrop-blur-xl"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emeraldx animate-pulse-dot" aria-hidden="true" />
            Full Stack Engineer @ TCS
            <span className="text-gold/70" aria-hidden="true">·</span>
            <span className="hidden items-center gap-1.5 text-muted sm:inline-flex">
              <MapPin size={11} strokeWidth={2.5} />
              Bhubaneswar
            </span>
          </motion.p>

          {/* ── Name ── */}
          <motion.h1
            id="hero-title"
            variants={luxeChild}
            className="hero-display font-display font-bold text-ink"
          >
            Aritra
            <span className="relative inline-block px-3">
              <span className="serif-accent">Dutta</span>
              <motion.span
                className="pointer-events-none absolute -right-0.5 -top-5 hidden text-gold/60 lg:block"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                aria-hidden="true"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M9 1v16M1 9h16M2.8 2.8l12.4 12.4M15.2 2.8L2.8 15.2" />
                </svg>
              </motion.span>
            </span>
          </motion.h1>

          {/* ── Divider ── */}
          <motion.div variants={luxeChild} className="mt-8 flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-line/15 sm:w-20" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold shadow-gold-soft" />
            <span className="h-px w-10 bg-line/15 sm:w-20" />
          </motion.div>

          {/* ── Tagline ── */}
          <motion.p
            variants={luxeChild}
            className="mt-6 max-w-xl text-balance text-[15px] leading-relaxed text-muted sm:text-base"
          >
            I design and build fast, human-grade web platforms — Spring Boot and Kafka at the core,
            React on the edge, and engineering polish in every pixel.
          </motion.p>

          {/* ── CTAs ── */}
          <motion.div variants={luxeChild} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <GoldButton href="#work" className="pointer-events-auto">
              View my work <ArrowDown size={16} />
            </GoldButton>
            <GhostButton href="/resume" className="pointer-events-auto">
              Resume <ArrowUpRight size={16} />
            </GhostButton>
          </motion.div>

          {/* ── Socials ── */}
          <motion.div variants={luxeChild} className="mt-8 flex items-center gap-3.5">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="pointer-events-auto group relative flex h-12 w-12 items-center justify-center rounded-full border border-line/15 text-muted transition-colors duration-300 hover:border-gold hover:text-gold-ink"
              >
                <span className="absolute inset-0 scale-0 rounded-full bg-gold transition-transform duration-300 ease-out group-hover:scale-100" aria-hidden="true" />
                <Icon size={18} className="relative z-10" />
              </a>
            ))}
          </motion.div>

          {/* ── Stats hairline ── */}
          <motion.div
            variants={luxeChild}
            className="mt-12 hidden items-stretch divide-x divide-line/10 border-t border-line/10 font-mono md:flex"
            aria-hidden="true"
          >
            {stats.map((s) => (
              <div key={s.label} className="px-7 py-3 text-center">
                <span className="font-display text-2xl font-bold tracking-tight text-ink">{s.value}</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-muted/80">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* breathing room before the marquee */}
        <div className="h-12 lg:h-16" aria-hidden="true" />
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="pointer-events-none relative z-10"
      >
        <Marquee
          items={['Java 21', 'Spring Boot 3', 'PostgreSQL', 'Azure PaaS', 'Microservices', 'Docker', 'Kafka', 'LangChain', 'React', 'Jenkins']}
        />
      </motion.div>
    </section>
  )
}
