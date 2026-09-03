'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, CheckCircle } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { CountUp } from './CountUp'


/* ── Inline TCS logo ──────────────────────────────────────── */
function TCSLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 40" className={className} aria-label="TCS Logo">
      {/* Background blue pill */}
      <rect width="120" height="40" rx="6" fill="#003087" />
      {/* TCS text */}
      <text
        x="12"
        y="27"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="20"
        fill="white"
        letterSpacing="1"
      >
        TCS
      </text>
      {/* Tata small text */}
      <text
        x="62"
        y="18"
        fontFamily="Arial, sans-serif"
        fontSize="8"
        fill="#99bbdd"
        letterSpacing="1"
      >
        TATA
      </text>
      <text
        x="62"
        y="30"
        fontFamily="Arial, sans-serif"
        fontSize="7"
        fill="#99bbdd"
        letterSpacing="0.5"
      >
        CONSULTANCY
      </text>
      {/* Decorative line */}
      <line x1="56" y1="8" x2="56" y2="32" stroke="#0066cc" strokeWidth="1.5" />
    </svg>
  )
}

const experience = {
  company: 'Tata Consultancy Services',
  position: 'System Engineer',
  location: 'Bhubaneswar, India',
  startDate: 'Sep 2024',
  endDate: 'Present',
  description:
    'Full Stack Application Engineer with 2+ years building scalable Java microservices, end-to-end web applications, and AI-powered features — across the Ultimatix platform and Element Fleet Management.',
  assignments: [
    {
      client: 'Element Fleet Management',
      role: 'Application Developer',
      period: 'Apr 2026 – Present',
      bullets: [
        'Modernized microservices from Java 8 / Spring Boot 1.x to Java 21 / Spring Boot 3.x using AWS Transform.',
        'Migrated infrastructure from JBoss to Azure Tomcat PaaS; refactored the iDeclare monolith into a standalone Spring Boot microservice with JWT-based Spring Security.',
        'Built Jenkins CI/CD pipelines with Docker deployments and authored 2,000+ JUnit test cases.',
        'Optimized SQL queries and APIs, achieving up to 20x faster response times.',
        'Utilized GitHub Copilot, Jira, and Jile within Agile workflows.',
      ],
    },
    {
      client: 'Ultimatix Platform',
      role: 'Application Developer',
      period: 'Sep 2024 – Mar 2026',
      bullets: [
        'Executed database migration from Oracle to PostgreSQL.',
        'Developed patent and trademark lifecycle modules using Core Java and Spring Boot.',
        'Optimized 7+ critical APIs, improving performance up to 30x under production load.',
        'Conducted technical interviews and onboarding knowledge transfers.',
      ],
    },
  ],
  technologies: ['Java 21', 'Java 17', 'Spring Boot 3', 'Spring Security', 'PostgreSQL', 'Oracle', 'AWS Transform', 'AWS', 'Azure PaaS', 'Jenkins', 'Docker', 'Python', 'LangChain', 'Tomcat'],
  achievements: [
    'Optimized critical APIs achieving up to 30x faster response times under production load',
    'Authored 2,000+ JUnit test cases across Jenkins CI/CD pipelines',
    'Delivered zero-downtime production migration for 10K+ daily users',
    'Modernized Java 8→21 and Spring Boot 1.x→3.x in live production with backward compatibility',
    'Conducted technical interviews and led onboarding knowledge transfers',
  ],
}

const skills = [
  { name: 'Java Full Stack Development', level: 85 },
  { name: 'Spring Boot & Hibernate',     level: 80 },
  { name: 'RESTful API Development',     level: 85 },
  { name: 'AI & LLM Integration',        level: 80 },
  { name: 'SQL & Database Management',   level: 80 },
  { name: 'MVC Architecture',            level: 90 },
]

const timeline = [
  {
    period: 'Sep 2024 – Present',
    role: 'System Engineer',
    org: 'TCS — Bhubaneswar, India',
  },
  {
    period: 'Sep 2024 – Nov 2024',
    role: 'ILP Training (ITIS Technology)',
    org: 'TCS — Thiruvananthapuram, IN',
  },
  {
    period: '2020 – 2024',
    role: 'B.Tech + Competitive Programming',
    org: 'MAKAUT — Kolkata, WB',
  },
]

const workStats = [
  { to: 2,   suffix: 'yr+', label: 'at TCS' },
  { to: 10,  suffix: '+',   label: 'Technologies Mastered' },
  { to: 100, suffix: '%',   label: 'Training Completion' },
  { to: 20,  suffix: '+',   label: 'REST APIs Built' },
]

export function Experience() {
  return (
    <section id="experience" className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <SectionHeading
          index="04"
          eyebrow="Experience"
          title="Professional Experience"
          blurb="My journey in the software engineering industry"
        />

        {/* ── Role dossier ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-64px' }}
          className="rounded-2xl border border-line/10 bg-surface p-8 md:p-10 mb-10"
        >
          {/* Company header */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-8 pb-8 border-b border-line/10">
            <div className="flex-shrink-0">
              <div className="w-28 h-16 rounded-xl border border-line/10 bg-line/[0.03] flex items-center justify-center overflow-hidden px-2">
                <TCSLogo className="w-full h-auto" />
              </div>
              <div className="flex items-center gap-1.5 mt-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse" />
                <span className="font-mono text-[10px] text-acidstrong font-bold uppercase tracking-[0.18em]">Active</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-ink leading-snug">{experience.position}</h3>
              <p className="text-acidstrong font-semibold text-base mt-1">{experience.company}</p>
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3 font-mono text-xs text-muted">
                <span className="inline-flex items-center gap-1.5"><MapPin size={12} />{experience.location}</span>
                <span className="inline-flex items-center gap-1.5"><Calendar size={12} />{experience.startDate} – {experience.endDate}</span>
              </div>
            </div>
          </div>

          <p className="text-[15px] md:text-base text-muted leading-relaxed mb-10 max-w-3xl">
            {experience.description}
          </p>

          {/* Assignments */}
          {experience.assignments.map((assignment) => (
            <div key={assignment.client} className="mb-10 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <h4 className="text-lg font-bold tracking-tight text-ink">{assignment.client}</h4>
                <p className="font-mono text-xs text-acidstrong uppercase tracking-[0.16em]">{assignment.period}</p>
              </div>
              <p className="text-sm text-muted mb-2">{assignment.role}</p>
              <ul className="border-t border-line/10">
                {assignment.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3.5 py-3.5 border-b border-line/10 text-[15px] text-ink/80"
                  >
                    <span className="w-1.5 h-1.5 bg-acid flex-shrink-0 mt-2" aria-hidden="true" />
                    {b}
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

          {/* Technologies */}
          <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-ink mt-10 mb-4">Technologies Used</h4>
          <div className="flex flex-wrap gap-2.5 mb-10">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-full border border-line/12 font-mono text-xs text-ink/75"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Achievements */}
          <h4 className="font-mono text-xs uppercase tracking-[0.25em] text-ink mb-2">Key Achievements</h4>
          <ul className="border-t border-line/10">
            {experience.achievements.map((a, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.25) }}
                viewport={{ once: true }}
                className="flex items-start gap-3.5 py-3.5 border-b border-line/10 text-[15px] text-ink/80"
              >
                <CheckCircle size={16} className="text-acidstrong flex-shrink-0 mt-1" />
                {a}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* ── Professional skills ────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, margin: '-64px' }}
            className="lg:col-span-7"
          >
            <h3 className="text-2xl font-bold tracking-tight text-ink mb-6">Professional Skills</h3>
            <div className="border-t border-line/10">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3) }}
                  viewport={{ once: true }}
                  className="py-4 border-b border-line/10"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[15px] font-semibold text-ink">{skill.name}</span>
                    <span className="font-mono text-xs text-muted">{skill.level}%</span>
                  </div>
                  <div className="h-1 rounded-full bg-line/10 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-acid"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: i * 0.06, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Timeline + stats ───────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            viewport={{ once: true, margin: '-64px' }}
            className="lg:col-span-5"
          >
            <h3 className="text-2xl font-bold tracking-tight text-ink mb-6">Career Timeline</h3>
            <div className="relative pl-7 mb-10">
              <div className="absolute left-[5px] top-2 bottom-2 w-px bg-line/15" aria-hidden="true" />
              <div className="space-y-7">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.period}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <span className="absolute -left-7 top-1.5 w-[11px] h-[11px] rounded-full bg-acid ring-4 ring-background" aria-hidden="true" />
                    <p className="font-mono text-xs text-acidstrong uppercase tracking-[0.16em]">{item.period}</p>
                    <p className="text-[15px] font-bold text-ink mt-1">{item.role}</p>
                    <p className="font-mono text-[11px] text-muted uppercase tracking-[0.14em] mt-0.5">{item.org}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 border-t border-l border-line/10">
              {workStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className="border-b border-r border-line/10 p-5"
                >
                  <div className="text-3xl font-bold tracking-tight text-ink mb-1"><CountUp to={s.to} suffix={s.suffix} /></div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
