'use client'

import { motion } from 'framer-motion'
import {
  GraduationCap,
  MapPin,
  Calendar,
  Trophy,
  Code2,
  Target,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Chip } from '@/components/ui/Chip'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EASE } from '@/lib/motion'

const educationData = [
  {
    degree: 'B.Tech in Electronics & Communication Engineering',
    institution: 'Maulana Abul Kalam Azad University of Technology (MAKAUT)',
    location: 'Kolkata, WB',
    duration: '2020 - 2024',
    grade: 'CGPA: 8.79/10',
    icon: GraduationCap,
    tone: 'primary' as const,
  },
  {
    degree: 'Higher Secondary (XII)',
    institution: 'WBCHSE',
    location: 'Kirnahar, WB',
    duration: '2020',
    grade: 'Percentage: 92%',
    icon: Trophy,
    tone: 'amber' as const,
  },
  {
    degree: 'Secondary (X)',
    institution: 'WBBSE',
    location: 'Kirnahar, WB',
    duration: '2018',
    grade: 'Percentage: 90.30%',
    icon: Trophy,
    tone: 'emerald' as const,
  },
]

const achievements = [
  'TCS DEEP Ninja Certified DevOps Engineer — Recognized for expertise in DevOps tooling and practices',
  'Competitive Programming: 554+ problems solved across platforms',
  'LeetCode Rating 1672',
  'Codeforces 1046 (Div 2)',
  'CodeChef 1708 (3-Star)',
  'Solved over 100 problems in CSES Problem Set',
]

const interests = [
  { emoji: '🎮', label: 'Gaming' },
  { emoji: '✈️', label: 'Traveling' },
  { emoji: '🎵', label: 'Music' },
  { emoji: '💡', label: 'Learning' },
  { emoji: '📚', label: 'Reading' },
  { emoji: '☕', label: 'Coffee' },
]

export function About() {
  return (
    <section id="about" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          index="01 — About"
          eyebrow="About me"
          title={<>Crafting code with <span className="gradient-text">purpose</span> &amp; passion</>}
          description="Get to know more about my background, education, and the milestones that shaped my engineering journey."
        />

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* ── Left: Story card (2 cols) ───────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE.outExpo }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2"
          >
            <GlassCard glow="primary" gradientBorder className="p-8 h-full">
              {/* Ambient orbs */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-[60px] -z-10" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-[60px] -z-10" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary to-secondary p-[1px] shadow-neon-primary">
                  <div className="w-full h-full bg-bg-1 rounded-[11px] flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-fg-0 tracking-tight">Who I am</h3>
              </div>

              <div className="space-y-5 text-[14.5px] text-fg-2 leading-relaxed">
                <p>
                  Hello! I&apos;m <span className="font-bold text-fg-0">Aritra Dutta</span>,
                  a results-driven <span className="font-semibold gradient-text-static">Backend Engineer</span> with
                  1.5+ years at <span className="font-semibold text-sky">Tata Consultancy Services (TCS)</span> in
                  Bhubaneswar, India.
                </p>
                <p>
                  Currently building enterprise microservices serving <span className="font-bold text-fg-0">10K+ daily users</span> with{' '}
                  <span className="font-semibold text-primary">Java 17, Spring Boot 3, PostgreSQL &amp; Azure PaaS</span>. Delivered
                  up to <span className="font-bold text-amber">30× API performance gains</span> and led cloud migrations.
                </p>
                <p>
                  Driven by a love for <span className="font-bold text-fg-0">competitive programming</span> —{' '}
                  <span className="font-bold animate-text-shimmer">554+ problems solved</span>, LeetCode rating{' '}
                  <span className="font-extrabold gradient-text-static">1672</span>.
                </p>
                <p>
                  Beyond coding I enjoy gaming, traveling, and music. I believe in{' '}
                  <span className="font-bold text-fg-0">continuous learning</span> and always exploring new technologies.
                </p>
              </div>

              {/* Interests */}
              <div className="mt-8 pt-6 border-t border-line-soft">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-fg-4 mb-4">When I&apos;m not coding</p>
                <div className="flex gap-2 flex-wrap">
                  {interests.map((item) => (
                    <Chip key={item.label} tone="neutral" size="md">
                      <span className="text-base mr-1">{item.emoji}</span>
                      {item.label}
                    </Chip>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* ── Right: Vertical timeline (3 cols) ──── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE.outExpo, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-3 relative"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-md bg-gradient-to-br from-emerald to-amber p-[1px] shadow-neon-emerald">
                <div className="w-full h-full bg-bg-1 rounded-[11px] flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-emerald" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-fg-0 tracking-tight">Education</h3>
            </div>

            <div className="relative pl-8">
              {/* Gradient rail */}
              <div className="absolute left-3 top-3 bottom-3 w-px bg-gradient-to-b from-primary via-secondary to-rose opacity-50" />

              <div className="space-y-6">
                {educationData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.12, ease: EASE.outExpo }}
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative group"
                  >
                    {/* Dot */}
                    <div className={[
                      'absolute -left-[27px] top-5 w-4 h-4 rounded-full',
                      'bg-gradient-to-br ring-4 ring-bg-0',
                      item.tone === 'primary' ? 'from-primary to-secondary' :
                      item.tone === 'amber'    ? 'from-amber to-rose' :
                                                'from-emerald to-sky',
                      'shadow-neon-primary group-hover:scale-125 transition-transform duration-300',
                    ].join(' ')} />

                    <GlassCard glow={item.tone === 'primary' ? 'primary' : item.tone === 'amber' ? 'amber' : 'emerald'} className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-md bg-bg-2 border border-line flex items-center justify-center flex-shrink-0 group-hover:border-primary/40 transition-colors">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-fg-0 text-[15.5px] leading-snug mb-1">
                            {item.degree}
                          </h4>
                          <p className="text-[13.5px] text-fg-3 mb-3 font-medium">{item.institution}</p>
                          <div className="flex flex-wrap gap-3 text-[12px] text-fg-3 mb-3 font-medium">
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin size={12} className="text-primary" />
                              {item.location}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar size={12} className="text-secondary" />
                              {item.duration}
                            </span>
                          </div>
                          <Chip tone={item.tone} size="sm" icon={<Trophy size={11} />}>
                            {item.grade}
                          </Chip>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Achievements row ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE.outExpo, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-md bg-gradient-to-br from-amber to-rose flex items-center justify-center shadow-neon-amber">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-fg-0">Key Achievements</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: EASE.outExpo }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                data-cursor="hover"
                className="glass rounded-md p-4 flex items-start gap-3 group hover:border-primary/40 transition-colors"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-amber to-rose rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                  <Target className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-[13.5px] text-fg-2 leading-relaxed group-hover:text-fg-0 transition-colors">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
