'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Code2, Target, Zap, ExternalLink, Trophy, Twitter, ArrowLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { EASE } from '@/lib/motion'

const socialPlatforms = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/Aritradutta2002',
    username: '@Aritradutta2002',
    description: 'Open source projects, portfolio codebases, and algorithm solutions.',
    stats: '710+ contributions',
    tone: 'primary' as const,
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/aritra-dutta-rick20/',
    username: 'Aritra Dutta',
    description: 'Professional network — career milestones, posts, and tech discussions.',
    stats: 'Software Engineer @ TCS',
    tone: 'sky' as const,
  },
  {
    name: 'Twitter (X)',
    icon: Twitter,
    url: 'https://x.com/Aritra1Sept',
    username: '@Aritra1Sept',
    description: 'Real-time tech updates, programming thoughts, and daily insights.',
    stats: 'Follow for tech content',
    tone: 'sky' as const,
  },
  {
    name: 'LeetCode',
    icon: Code2,
    url: 'https://leetcode.com/u/ari2002/',
    username: '@ari2002',
    description: 'Competitive programming solutions, weekly contests, and problem sets.',
    stats: '1672 Rating · 500+ Solved',
    tone: 'amber' as const,
  },
  {
    name: 'CSES',
    icon: Target,
    url: 'https://cses.fi/user/261539',
    username: 'User 261539',
    description: 'Competitive programming problem set — 100+ problems solved.',
    stats: 'Algorithm challenges',
    tone: 'emerald' as const,
  },
  {
    name: 'Codeforces',
    icon: Zap,
    url: 'https://codeforces.com/profile/aritradutta2001',
    username: 'aritradutta2001',
    description: 'Competitive programming contests, Div 2 participation and ratings.',
    stats: 'Rating 1046 · Div 2',
    tone: 'rose' as const,
  },
]

const toneGradient: Record<string, string> = {
  primary: 'from-primary to-secondary',
  sky: 'from-sky to-primary',
  emerald: 'from-emerald to-sky',
  amber: 'from-amber to-rose',
  rose: 'from-rose to-amber',
}

export default function SocialPage() {
  const { scrollYProgress } = useScroll()
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -20])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.7])

  return (
    <main className="min-h-screen relative">
      {/* Sticky sub-header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-line-soft bg-bg-0/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:text-secondary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Portfolio</span>
          </Link>
          <span className="text-sm text-fg-3">Connect with Aritra</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div style={{ y: headerY, opacity: headerOpacity }}>
          <SectionHeader
            eyebrow="Across the internet"
            title={<>Connect <span className="gradient-text">with me</span></>}
            description="Follow my journey across different platforms — from competitive programming contests to professional updates."
          />
        </motion.div>

        {/* Platform grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
        >
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon
            return (
              <motion.a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE.outExpo } },
                }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="hover"
                className="block group"
              >
                <GlassCard glow="primary" className="p-7 h-full relative overflow-hidden">
                  {/* Top stripe */}
                  <div className={[
                    'absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-60 group-hover:opacity-100 transition-opacity',
                    toneGradient[platform.tone] ?? toneGradient.primary,
                  ].join(' ')} />

                  {/* Hover orb */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className={[
                      'absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30',
                      'bg-gradient-to-br',
                      toneGradient[platform.tone] ?? toneGradient.primary,
                    ].join(' ')} />
                  </div>

                  <div className="relative z-10">
                    <div className={[
                      'w-14 h-14 mb-5 rounded-md bg-gradient-to-br flex items-center justify-center shadow-lg',
                      'group-hover:scale-110 transition-transform duration-500',
                      toneGradient[platform.tone] ?? toneGradient.primary,
                    ].join(' ')}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-fg-0 group-hover:gradient-text transition-all">
                        {platform.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-fg-4 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                    </div>

                    <p className="text-sm font-bold text-primary mb-3">{platform.username}</p>
                    <p className="text-[14px] text-fg-2 leading-relaxed mb-5">{platform.description}</p>

                    <div className={[
                      'inline-flex items-center gap-2 px-4 py-2 rounded-md text-[12.5px] font-bold text-white shadow-md',
                      'bg-gradient-to-r',
                      toneGradient[platform.tone] ?? toneGradient.primary,
                    ].join(' ')}>
                      {platform.stats}
                    </div>
                  </div>
                </GlassCard>
              </motion.a>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.outExpo }}
          viewport={{ once: true }}
        >
          <GlassCard gradientBorder gradientBorderAnimated className="p-10 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/15 rounded-full blur-3xl -z-10" />

            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block mb-4"
            >
              <Trophy className="w-12 h-12 text-amber mx-auto" />
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-fg-0 mb-3">
              Let&apos;s <span className="gradient-text">collaborate</span>!
            </h3>
            <p className="text-fg-3 max-w-xl mx-auto mb-7 text-[14.5px]">
              Interested in working together, discussing tech, or just want to say hi? Reach out on any of these platforms or send a direct message.
            </p>

            <Link href="/#contact">
              <Button variant="primary" size="lg" iconRight={<Sparkles size={15} />}>
                Get in touch
              </Button>
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    </main>
  )
}
