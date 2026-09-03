'use client'

import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Award, Trophy, ArrowUpRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const educationData = [
  {
    degree: 'B.Tech in Electronics & Communication Engineering',
    institution: 'Maulana Abul Kalam Azad University of Technology (MAKAUT)',
    location: 'Kolkata, WB',
    duration: '2020 - 2024',
    grade: 'CGPA: 8.79/10',
    icon: GraduationCap,
  },
  {
    degree: 'Higher Secondary (XII)',
    institution: 'WBCHSE',
    location: 'Kirnahar, WB',
    duration: '2020',
    grade: 'Percentage: 92%',
    icon: Award,
  },
  {
    degree: 'Secondary (X)',
    institution: 'WBBSE',
    location: 'Kirnahar, WB',
    duration: '2018',
    grade: 'Percentage: 90.30%',
    icon: Award,
  },
]

const achievements = [
  { text: 'TCS DEEP Ninja Certified DevOps Engineer — Recognized for expertise in DevOps tooling and practices' },
  { text: 'Competitive Programming: 700+ problems solved across platforms' },
  { text: 'LeetCode Rating 1672' },
  { text: 'Codeforces 1046 (Div 2)' },
  { text: 'CodeChef 1708 (3-Star)' },
  { text: 'Solved over 100 problems in CSES Problem Set' },
]

const interests = [
  { emoji: '🎮', label: 'Gaming' },
  { emoji: '✈️', label: 'Traveling' },
  { emoji: '🎵', label: 'Music' },
  { emoji: '💡', label: 'Learning' },
]

export function About() {
  return (
    <section id="about" className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        <SectionHeading
          index="01"
          eyebrow="About"
          title="My Journey"
          blurb="Get to know more about my background, education, and achievements"
        />

        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* ── Personal Story ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-64px' }}
            className="lg:col-span-7 rounded-2xl border border-line/10 bg-surface p-8 md:p-10"
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-acidstrong mb-6">
              Who I am
            </p>

            <div className="space-y-5 text-[15px] md:text-base text-muted leading-relaxed">
              <p>
                Hello! I&apos;m <span className="font-semibold text-ink">Aritra Dutta</span>, a Full Stack Application Engineer with 2+ years at{' '}
                <span className="font-semibold text-ink">Tata Consultancy Services (TCS)</span> in Bhubaneswar, India.
              </p>
              <p>
                Currently modernizing enterprise backends serving 10K+ daily users with{' '}
                <span className="font-semibold text-ink">Java (8 to 21), Spring Boot 3, PostgreSQL, AWS, and Azure PaaS</span>. Executing remediation and cloud migrations for clients like Element Fleet Management. I also build{' '}
                <span className="font-semibold text-ink">AI-powered features with Python, LangChain, and RAG</span>.
              </p>
              <p>
                Driven by a love for <span className="font-semibold text-ink">competitive programming</span> — 700+ problems solved, LeetCode rating{' '}
                <span className="font-bold text-acidstrong">1672</span>.
              </p>
              <p>
                Beyond coding I enjoy gaming, traveling, and music. I believe in{' '}
                <span className="font-semibold text-ink">continuous learning</span> and always exploring new technologies.
              </p>
            </div>

            {/* Interests */}
            <div className="mt-8 pt-7 border-t border-line/10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-4">When I&apos;m not coding</p>
              <div className="flex gap-2.5 flex-wrap">
                {interests.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-line/10 text-sm text-ink/80"
                  >
                    <span aria-hidden="true">{item.emoji}</span>
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Education ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-64px' }}
            className="lg:col-span-5"
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-acidstrong mb-6">
              Education
            </p>
            <div className="border-t border-line/10">
              {educationData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="group flex items-start gap-4 py-6 border-b border-line/10"
                >
                  <span className="font-mono text-xs text-muted pt-1">0{index + 1}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-ink text-[16px] leading-snug mb-1 group-hover:text-acidstrong transition-colors duration-300">
                      {item.degree}
                    </h4>
                    <p className="text-sm text-muted mb-2.5">{item.institution}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted mb-3">
                      <span className="inline-flex items-center gap-1.5"><MapPin size={12} />{item.location}</span>
                      <span className="inline-flex items-center gap-1.5"><Calendar size={12} />{item.duration}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-acid/10 border border-acid/30 text-acidstrong text-xs font-bold">
                      <Trophy size={12} />{item.grade}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Achievements ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-64px' }}
          className="mt-16 md:mt-20"
        >
          <div className="flex items-center justify-between mb-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-acidstrong">
              Key achievements
            </p>
            <ArrowUpRight size={16} className="text-muted" aria-hidden="true" />
          </div>

          <div className="border-t border-line/10">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.3) }}
                viewport={{ once: true }}
                className="group flex items-baseline gap-4 py-4 border-b border-line/10 hover:bg-line/[0.02] transition-colors duration-300 px-2 -mx-2"
              >
                <span className="font-mono text-xs text-acidstrong">0{index + 1}</span>
                <p className="text-[15px] text-ink/85 group-hover:text-ink transition-colors duration-300">{achievement.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
