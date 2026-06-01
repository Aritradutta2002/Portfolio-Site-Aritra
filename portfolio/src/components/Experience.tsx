'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Calendar,
  Building,
  Code,
  Trophy,
  Sparkles,
  CheckCircle,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Chip } from '@/components/ui/Chip'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { EASE } from '@/lib/motion'

const experience = {
  company: 'Tata Consultancy Services',
  position: 'Assistant System Engineer',
  location: 'Bhubaneswar, India',
  startDate: 'Sep 2024',
  endDate: 'Present',
  description:
    'Architecting high-performance Java/Spring Boot microservices for the Ultimatix platform. Delivering up to 30x API performance gains, leading cloud migrations to Azure PaaS, and building AI-powered full-stack platforms end-to-end.',
  responsibilities: [
    'Migrated critical infrastructure from legacy JBoss server to Azure Tomcat PaaS, configuring health checks and ensuring high availability',
    'Refactored the iDeclare module from a legacy monolith into a standalone Spring Boot microservice serving 10K+ daily users',
    'Engineered backend solutions with Java 8 & Spring Boot 3, leveraging GitHub Copilot for modular, reusable code design',
    'Built end-to-end Jenkins CI/CD pipelines, integrated Docker deployments, and authored 12+ JUnit test cases',
    'Executed a complex database migration from Oracle to PostgreSQL, redesigning normalized schemas',
    'Built robust backend services for Patent & Trademark lifecycle modules using Core Java and Spring Boot',
    'Optimized SQL queries and APIs achieving up to 30x faster response times in critical workflows',
  ],
  technologies: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'Oracle', 'Angular v20', 'TypeScript', 'Azure PaaS', 'Jenkins', 'Docker', 'Git'],
  achievements: [
    'Achieved 20-30x performance improvement through query optimization and database schema design',
    'Delivered zero-downtime production migration for 10K+ daily users',
    'Successfully upgraded Java 8→17 and Spring Boot 2→3 in live production with backward compatibility',
    'Built stage-aware email notification system reducing manual follow-ups',
    'Architected full database schema and owned end-to-end microservice delivery',
  ],
}

const skills = [
  { name: 'Java Full Stack Development', level: 85 },
  { name: 'Spring Boot & Hibernate',     level: 80 },
  { name: 'RESTful API Development',     level: 85 },
  { name: 'C++ Programming',             level: 85 },
  { name: 'SQL & Database Management',   level: 80 },
  { name: 'MVC Architecture',            level: 90 },
]

const timeline = [
  {
    period: 'Sep 2024 – Present',
    role: 'Assistant System Engineer',
    org: 'TCS — Bhubaneswar, India',
    color: 'from-primary to-secondary',
    glow: 'primary' as const,
  },
  {
    period: 'Sep 2024 – Nov 2024',
    role: 'ILP Training (ITIS Technology)',
    org: 'TCS — Thiruvananthapuram, IN',
    color: 'from-emerald to-sky',
    glow: 'emerald' as const,
  },
  {
    period: '2020 – 2024',
    role: 'B.Tech + Competitive Programming',
    org: 'MAKAUT — Kolkata, WB',
    color: 'from-rose to-amber',
    glow: 'rose' as const,
  },
]

const workStats = [
  { value: '1.5yr+',  label: 'at TCS',                tone: 'primary' as const, glow: 'primary'   as const },
  { value: '10+',     label: 'Technologies Mastered', tone: 'emerald' as const, glow: 'emerald'   as const },
  { value: '100%',    label: 'Training Completion',   tone: 'sky'     as const, glow: 'sky'       as const },
  { value: '20+',     label: 'REST APIs Built',       tone: 'amber'   as const, glow: 'amber'     as const },
]

const toneClass: Record<string, string> = {
  primary: 'from-primary to-secondary',
  emerald: 'from-emerald to-sky',
  sky:     'from-sky to-primary',
  amber:   'from-amber to-rose',
  rose:    'from-rose to-amber',
}

export function Experience() {
  return (
    <section id="experience" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="04 — Career"
          eyebrow="Work experience"
          title={<>My professional <span className="gradient-text">journey</span></>}
          description="From classroom to enterprise — milestones that shaped how I architect and ship software."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* ── Left: Main experience card (3 cols) ──── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE.outExpo }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3"
          >
            <GlassCard glow="primary" gradientBorder className="p-7 sm:p-8 h-full">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary p-[1px] rounded-md shadow-neon-primary flex-shrink-0">
                  <div className="w-full h-full bg-bg-1 rounded-[11px] flex items-center justify-center">
                    <Building className="w-6 h-6 text-fg-0" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-fg-0 leading-snug tracking-tight">
                    {experience.position}
                  </h3>
                  <p className="gradient-text-static font-bold text-[15px] mt-1">{experience.company}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[12px] font-medium text-fg-3">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={12} className="text-primary" />
                      {experience.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} className="text-secondary" />
                      {experience.startDate} – {experience.endDate}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[14px] text-fg-2 font-medium leading-relaxed mb-7 pl-4 border-l-2 border-primary/40">
                {experience.description}
              </p>

              {/* Responsibilities */}
              <div className="mb-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-md bg-primary/10 text-primary border border-primary/30">
                    <Code className="w-4 h-4" />
                  </div>
                  <h4 className="text-[15px] font-bold text-fg-0 tracking-tight">Key Responsibilities</h4>
                </div>
                <ul className="space-y-2.5">
                  {experience.responsibilities.map((r, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease: EASE.outExpo }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-[13.5px] text-fg-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-2" />
                      {r}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-7">
                <h4 className="text-[11.5px] font-bold uppercase tracking-wider text-fg-4 mb-3">Technologies used</h4>
                <div className="flex flex-wrap gap-1.5">
                  {experience.technologies.map((tech) => (
                    <Chip key={tech} tone="neutral" size="sm">{tech}</Chip>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="pt-5 border-t border-line-soft">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-md bg-amber/10 text-amber border border-amber/30">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <h4 className="text-[15px] font-bold text-fg-0 tracking-tight">Key Achievements</h4>
                </div>
                <ul className="space-y-2.5">
                  {experience.achievements.map((a, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease: EASE.outExpo }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 text-[13.5px] text-fg-2 group/item"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                      <span className="group-hover/item:text-fg-0 transition-colors">{a}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </motion.div>

          {/* ── Right column (2 cols) ─────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE.outExpo, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Professional skills */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-[15px] font-bold text-fg-0 tracking-tight">Professional skills</h3>
              </div>
              <div className="space-y-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: EASE.outExpo }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[13px] font-semibold text-fg-1">{skill.name}</span>
                      <span className="text-[11px] font-mono text-fg-3">{skill.level}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-bg-2 border border-line-soft overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.1, delay: i * 0.06, ease: EASE.outExpo }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Timeline */}
            <GlassCard className="p-6">
              <h3 className="text-[15px] font-bold text-fg-0 tracking-tight mb-5">Career timeline</h3>
              <div className="relative pl-6">
                <div className="absolute left-2 top-1 bottom-1 w-px bg-gradient-to-b from-primary via-secondary to-rose opacity-50" />
                <div className="space-y-6">
                  {timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1, ease: EASE.outExpo }}
                      viewport={{ once: true }}
                      className="relative group"
                    >
                      <div className={[
                        'absolute -left-[25px] top-1 w-3.5 h-3.5 rounded-full ring-4 ring-bg-0',
                        'bg-gradient-to-br',
                        item.color,
                        'group-hover:scale-125 transition-transform duration-300',
                      ].join(' ')} />
                      <p className="text-[12.5px] font-mono text-fg-3">{item.period}</p>
                      <p className="text-[13.5px] font-bold text-fg-0 mt-0.5 group-hover:text-primary transition-colors">
                        {item.role}
                      </p>
                      <p className="text-[11.5px] text-fg-3 uppercase tracking-wider mt-0.5">{item.org}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>

            {/* Stats */}
            <GlassCard className="p-6">
              <h3 className="text-[15px] font-bold text-fg-0 tracking-tight mb-5 text-center">By the numbers</h3>
              <div className="grid grid-cols-2 gap-4">
                {workStats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: EASE.outExpo }}
                    viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                    data-cursor="hover"
                    className="text-center p-4 rounded-md bg-bg-2/60 border border-line-soft hover:border-primary/40 transition-colors"
                  >
                    <div className={[
                      'text-2xl sm:text-3xl font-extrabold bg-gradient-to-br bg-clip-text text-transparent mb-1',
                      toneClass[s.tone] ?? toneClass.primary,
                    ].join(' ')}>
                      {s.value}
                    </div>
                    <div className="text-[10.5px] font-bold text-fg-3 uppercase tracking-wider">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
