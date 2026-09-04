'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Code2, Target, Zap, ArrowLeft, ArrowUpRight, Twitter, Trophy } from 'lucide-react'
import Link from 'next/link'
import { LuxeBackdrop } from '@/components/luxe/Backdrop'
import { Cursor } from '@/components/luxe/Cursor'

const platforms = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/Aritradutta2002', username: '@Aritradutta2002', description: 'Open-source projects, portfolio codebases, and algorithm solutions.', stats: '710+ contributions' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/aritra-dutta-rick20/', username: 'Aritra Dutta', description: 'Career milestones, posts, and tech discussions.', stats: 'Engineer @ TCS' },
  { name: 'Twitter (X)', icon: Twitter, url: 'https://x.com/Aritra1Sept', username: '@Aritra1Sept', description: 'Real-time tech updates and programming thoughts.', stats: 'Follow for tech content' },
  { name: 'LeetCode', icon: Code2, url: 'https://leetcode.com/u/ari2002/', username: '@ari2002', description: 'Contests, problem sets, and rated solutions.', stats: '1672 · 700+ solved' },
  { name: 'CSES', icon: Target, url: 'https://cses.fi/user/261539', username: 'User 261539', description: '100+ problem-set solves and counting.', stats: 'Algorithm challenges' },
  { name: 'Codeforces', icon: Zap, url: 'https://codeforces.com/profile/aritradutta2001', username: 'aritradutta2001', description: 'Div 2 contests and rating journey.', stats: '1046 · Div 2' },
]

export default function SocialPage() {
  return (
    <div className="relative min-h-screen bg-background text-ink">
      <LuxeBackdrop />
      <Cursor />

      <div className="sticky top-0 z-50 border-b border-line/10 bg-background/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="group flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-gold">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to portfolio
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Connect with Aritra</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 md:py-20">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line/12 bg-surface/70 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Find me across the internet
          </span>
          <h1 className="font-display text-5xl font-bold tracking-[-0.04em] text-ink md:text-6xl">
            Connect <span className="serif-accent">with me.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            From contest ratings to career milestones — follow whichever journey interests you.
          </p>
          <div className="mt-8 h-px bg-gradient-to-r from-gold/40 via-line/10 to-transparent" aria-hidden="true" />
        </motion.div>

        <div className="mb-14 mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.55 }}
              whileTap={{ scale: 0.98 }}
              className="luxe-card luxe-lift group block p-7"
              aria-label={`${p.name}: ${p.username}`}
            >
              <div className="mb-6 flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line/12 text-gold transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-gold-ink">
                  <p.icon size={20} />
                </span>
                <ArrowUpRight size={17} className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
              </div>
              <h2 className="font-display text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-gold">{p.name}</h2>
              <p className="mt-1 font-mono text-xs font-bold text-gold">{p.username}</p>
              <p className="mb-6 mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
              <span className="inline-flex rounded-full border border-line/12 px-3.5 py-1.5 font-mono text-[11px] text-ink/75">
                {p.stats}
              </span>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="luxe-card relative overflow-hidden p-10 md:p-14"
        >
          <div className="relative z-10 max-w-xl">
            <Trophy size={28} className="mb-5 text-gold" aria-hidden="true" />
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Let&apos;s <span className="serif-accent">collaborate.</span>
            </h2>
            <p className="mb-7 mt-3 text-[15px] leading-relaxed text-muted">
              Interested in working together or just want to say hi? Reach out on any platform — or send a direct message.
            </p>
            <Link href="/#contact" className="btn-gold btn-press inline-flex min-h-[52px] items-center gap-2 rounded-full px-7 font-bold">
              Get in touch <ArrowUpRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
          <span className="pointer-events-none absolute -bottom-8 -right-2 select-none font-serifd text-[10rem] italic leading-none text-ink/[0.05] md:text-[14rem]" aria-hidden="true">
            Hi
          </span>
        </motion.div>
      </div>
    </div>
  )
}
