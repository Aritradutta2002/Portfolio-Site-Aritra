'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Code2, Target, Zap, ExternalLink, Trophy, Twitter, ArrowLeft, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { GlassCard } from '@/components/GlassCard'

const socialPlatforms = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/Aritradutta2002',
    username: '@Aritradutta2002',
    description: 'Open source projects, portfolio codebases, and algorithm solutions.',
    stats: '710+ contributions',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/aritra-dutta-rick20/',
    username: 'Aritra Dutta',
    description: 'Professional network — career milestones, posts, and tech discussions.',
    stats: 'Software Engineer @ TCS',
  },
  {
    name: 'Twitter (X)',
    icon: Twitter,
    url: 'https://x.com/Aritra1Sept',
    username: '@Aritra1Sept',
    description: 'Real-time tech updates, programming thoughts, and daily insights.',
    stats: 'Follow for tech content',
  },
  {
    name: 'LeetCode',
    icon: Code2,
    url: 'https://leetcode.com/u/ari2002/',
    username: '@ari2002',
    description: 'Competitive programming solutions, weekly contests, and problem sets.',
    stats: '1672 Rating · 700+ Solved',
  },
  {
    name: 'CSES',
    icon: Target,
    url: 'https://cses.fi/user/261539',
    username: 'User 261539',
    description: 'Competitive programming problem set — 100+ problems solved.',
    stats: 'Algorithm challenges',
  },
  {
    name: 'Codeforces',
    icon: Zap,
    url: 'https://codeforces.com/profile/aritradutta2001',
    username: 'aritradutta2001',
    description: 'Competitive programming contests, Div 2 participation and ratings.',
    stats: 'Rating 1046 · Div 2',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export default function SocialPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -30])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6])

  return (
    <div ref={containerRef} className="min-h-screen relative bg-background text-ink">

      {/* Sticky nav */}
      <div className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-aurora/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/#social"
            className="flex items-center gap-2 text-muted hover:text-aurorastrong transition-colors group text-sm font-medium">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">Connect with Aritra</span>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">

        {/* Hero heading */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-aurora/25 bg-aurora/10 font-mono text-xs uppercase tracking-[0.18em] text-muted mb-5">
            Find me across the internet
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display tracking-[-0.03em] leading-[1.02] font-bold text-ink text-5xl md:text-6xl mb-5">
            Connect With Me<span className="text-gradient">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
            className="text-base md:text-lg text-muted max-w-2xl leading-relaxed">
            Follow my journey across different platforms — from competitive programming contests to professional updates.
          </motion.p>
          <div className="mt-8 h-px w-full bg-gradient-to-r from-aurora/25 via-aurora/10 to-transparent" aria-hidden="true" />
        </motion.div>

        {/* Platform grid */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16 md:mb-20">
          {socialPlatforms.map((platform) => (
            <motion.div key={platform.name} variants={cardVariants}>
              <motion.a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
                whileTap={{ scale: 0.98 }}>
                <GlassCard hover className="p-7 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <span className="w-12 h-12 rounded-full border border-aurora/25 flex items-center justify-center text-muted group-hover:text-[#0B0616] group-hover:bg-aurora group-hover:border-aurora transition-colors duration-300">
                      <platform.icon size={20} />
                    </span>
                    <ArrowUpRight size={16} className="text-muted group-hover:text-aurorastrong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-tight text-ink group-hover:text-aurorastrong transition-colors duration-300">
                    {platform.name}
                  </h3>
                  <p className="font-mono text-xs text-aurorastrong mt-1 mb-3">{platform.username}</p>
                  <p className="text-[14px] text-muted leading-relaxed mb-6 flex-1">{platform.description}</p>

                  <span className="inline-flex w-fit items-center px-3.5 py-1.5 rounded-full border border-aurora/20 font-mono text-[11px] text-ink/75">
                    {platform.stats}
                  </span>
                </GlassCard>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }} viewport={{ once: true, margin: '-64px' }}
          className="rounded-2xl bg-aurora text-[#0B0616] p-10 md:p-14 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-xl">
            <Trophy size={28} className="mb-5" aria-hidden="true" />
            <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">Let&apos;s Collaborate!</h3>
            <p className="text-[#0B0616]/70 text-[15px] mb-7 leading-relaxed">
              Interested in working together, discussing tech, or just want to say hi? Feel free to reach out on any of these platforms or send a direct message.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B0616] text-white font-bold text-sm hover:shadow-[0_8px_32px_rgba(11,6,22,0.4)] transition-shadow duration-300"
            >
              Get In Touch
              <ExternalLink size={15} />
            </Link>
          </div>
          <span className="absolute -bottom-8 -right-2 font-display font-bold tracking-[-0.04em] leading-none text-[10rem] md:text-[14rem] text-[#0B0616]/10 select-none" aria-hidden="true">
            Hi
          </span>
        </motion.div>
      </div>
    </div>
  )
}
