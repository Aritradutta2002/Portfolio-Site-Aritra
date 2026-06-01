'use client'

import { motion } from 'framer-motion'
import { Code, Database, Globe, Server, Award, Sparkles } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EASE } from '@/lib/motion'

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    tone: 'primary' as const,
    glow: 'primary' as const,
    skills: [
      { name: 'Java 17',    level: 96, tone: 'rose'    as const },
      { name: 'TypeScript', level: 85, tone: 'sky'     as const },
      { name: 'JavaScript', level: 85, tone: 'amber'   as const },
      { name: 'C++',        level: 85, tone: 'primary' as const },
      { name: 'Python',     level: 75, tone: 'emerald' as const },
    ],
  },
  {
    title: 'Frameworks',
    icon: Globe,
    tone: 'emerald' as const,
    glow: 'emerald' as const,
    skills: [
      { name: 'Spring Boot 3', level: 95, tone: 'emerald' as const },
      { name: 'Angular v20',   level: 90, tone: 'rose'    as const },
      { name: 'Hibernate',     level: 85, tone: 'amber'   as const },
      { name: 'React',         level: 75, tone: 'sky'     as const },
      { name: 'Express.js',    level: 70, tone: 'primary' as const },
    ],
  },
  {
    title: 'Databases & Tools',
    icon: Database,
    tone: 'sky' as const,
    glow: 'sky' as const,
    skills: [
      { name: 'PostgreSQL',      level: 90, tone: 'sky'     as const },
      { name: 'Oracle',          level: 85, tone: 'rose'    as const },
      { name: 'Git & GitHub',    level: 90, tone: 'primary' as const },
      { name: 'Docker',          level: 85, tone: 'sky'     as const },
      { name: 'Jenkins',         level: 85, tone: 'rose'    as const },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Server,
    tone: 'primary' as const,
    glow: 'rose' as const,
    skills: [
      { name: 'Azure PaaS',      level: 85, tone: 'sky'     as const },
      { name: 'REST APIs',       level: 95, tone: 'emerald' as const },
      { name: 'Microservices',   level: 90, tone: 'primary' as const },
      { name: 'CI/CD Pipelines', level: 85, tone: 'amber'   as const },
    ],
  },
]

const cpStats = [
  { value: '1672', label: 'LeetCode Rating',  sub: 'Max Rating',       tone: 'sky'     as const, glow: 'sky'     as const },
  { value: '1708', label: 'CodeChef Rating',  sub: '3-Star',           tone: 'primary' as const, glow: 'primary' as const },
  { value: '554+', label: 'Problems Solved',  sub: 'Across platforms', tone: 'emerald' as const, glow: 'emerald' as const },
  { value: '1046', label: 'CodeForces Rank',  sub: 'Div 2',            tone: 'amber'   as const, glow: 'amber'   as const },
]

const certifications = [
  { label: 'TCS DEEP Ninja Certified DevOps Engineer',   sub: 'Recognized for DevOps expertise' },
  { label: 'Problem Solving (Intermediate)',              sub: 'HackerRank' },
  { label: 'The Complete Python Pro Bootcamp',           sub: 'Udemy' },
  { label: 'OOP in Java',                                 sub: 'Coursera' },
  { label: 'Full Stack Java: JSP + Spring + Boot + React', sub: 'Udemy' },
]

function SkillBar({ name, level, index, tone }: { name: string; level: number; index: number; tone: 'primary' | 'secondary' | 'rose' | 'amber' | 'emerald' | 'sky' }) {
  const fillClass: Record<string, string> = {
    primary: 'from-primary to-secondary',
    secondary: 'from-secondary to-sky',
    rose: 'from-rose to-amber',
    amber: 'from-amber to-rose',
    emerald: 'from-emerald to-sky',
    sky: 'from-sky to-primary',
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE.outExpo }}
      viewport={{ once: true }}
      className="mb-3 last:mb-0"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[13.5px] font-semibold text-fg-1">{name}</span>
        <span className="text-[11.5px] font-mono font-bold text-fg-3">{level}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-bg-2 border border-line-soft overflow-hidden">
        <motion.div
          className={['h-full rounded-full bg-gradient-to-r', fillClass[tone] ?? fillClass.primary].join(' ')}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.2, delay: index * 0.06, ease: EASE.outExpo }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="02 — Skills"
          eyebrow="Tech stack"
          title={<>Tools &amp; <span className="gradient-text">technologies</span> I love</>}
          description="A curated toolkit refined through enterprise projects, competitive programming, and constant exploration."
        />

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: ci * 0.08, ease: EASE.outExpo }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <GlassCard
                glow={cat.glow}
                className="p-6 h-full"
                data-cursor="hover"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={[
                    'w-10 h-10 rounded-md flex items-center justify-center',
                    cat.tone === 'primary' ? 'bg-gradient-to-br from-primary to-secondary' :
                    cat.tone === 'emerald' ? 'bg-gradient-to-br from-emerald to-sky' :
                    cat.tone === 'sky'     ? 'bg-gradient-to-br from-sky to-primary' :
                                             'bg-gradient-to-br from-rose to-amber',
                    'shadow-neon-primary',
                  ].join(' ')}>
                    <cat.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-[16px] font-bold text-fg-0 tracking-tight">{cat.title}</h3>
                </div>
                <div>
                  {cat.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      tone={skill.tone}
                      index={si}
                    />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* ── Competitive Programming stats ──────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.outExpo }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-amber to-rose flex items-center justify-center shadow-neon-amber">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-fg-0 tracking-tight">Competitive Programming</h3>
              <p className="text-sm text-fg-3 mt-0.5">Where consistency compounds into mastery</p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {cpStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: EASE.outExpo }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                data-cursor="hover"
              >
                <GlassCard glow={s.glow} className="p-6 text-center">
                  <div className={[
                    'text-4xl lg:text-5xl font-extrabold leading-none mb-2 bg-gradient-to-br bg-clip-text text-transparent',
                    s.tone === 'primary' ? 'from-primary to-secondary' :
                    s.tone === 'emerald' ? 'from-emerald to-sky' :
                    s.tone === 'amber'   ? 'from-amber to-rose' :
                                            'from-sky to-primary',
                  ].join(' ')}>
                    {s.value}
                  </div>
                  <div className="text-[13.5px] font-bold text-fg-1">{s.label}</div>
                  <div className="text-[11.5px] font-medium text-fg-4 mt-1 uppercase tracking-wider">
                    {s.sub}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Certifications ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.outExpo }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-neon-primary">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-fg-0 tracking-tight">Certifications</h3>
              <p className="text-sm text-fg-3 mt-0.5">Formal learning, formal proof</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: EASE.outExpo }}
                viewport={{ once: true }}
                whileHover={{ x: 6 }}
                data-cursor="hover"
              >
                <GlassCard className="p-4 flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-fg-0 group-hover:text-primary transition-colors leading-snug">
                      {cert.label}
                    </p>
                    <p className="text-[12px] text-fg-3 mt-0.5">{cert.sub}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
