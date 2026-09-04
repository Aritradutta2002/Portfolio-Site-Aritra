'use client'
import { motion } from 'framer-motion'
import { MapPin, Calendar, CheckCircle2, Download, Building2 } from 'lucide-react'
import { Container } from '@/components/luxe/Container'
import { SectionHeading } from '@/components/luxe/SectionHeading'
import { Dots } from '@/components/luxe/Chip'
import { Counter } from '@/components/luxe/Counter'

const assignments = [
  {
    client: 'Element Fleet Management',
    role: 'Application Developer',
    period: 'Apr 2026 — Present',
    bullets: [
      'Modernized microservices from Java 8 / Spring Boot 1.x to Java 21 / Spring Boot 3.x using AWS Transform.',
      'Migrated JBoss → Azure Tomcat PaaS; split the iDeclare monolith into a JWT-secured Spring Boot microservice.',
      'Built Jenkins CI/CD with Docker deploys; authored 2,000+ JUnit test cases.',
      'Tuned SQL + APIs to 20× faster responses.',
    ],
  },
  {
    client: 'Ultimatix Platform',
    role: 'Application Developer',
    period: 'Sep 2024 — Mar 2026',
    bullets: [
      'Executed Oracle → PostgreSQL migration with zero data loss.',
      'Built patent & trademark lifecycle modules in Core Java + Spring Boot.',
      'Optimized 7+ critical APIs to 30× under production load.',
      'Ran technical interviews and onboarding knowledge transfers.',
    ],
  },
]

const tech = ['Java 21', 'Spring Boot 3', 'Spring Security', 'PostgreSQL', 'Oracle', 'AWS', 'Azure PaaS', 'Jenkins', 'Docker', 'LangChain', 'Tomcat']
const wins = [
  '30× faster critical APIs under production load',
  '2,000+ JUnit tests across Jenkins pipelines',
  'Zero-downtime migration for 10K+ daily users',
  'Java 8→21 live modernization, backward compatible',
]
const skills = [
  { name: 'Java Full-Stack Development', level: 5 },
  { name: 'Spring Boot & Hibernate', level: 4 },
  { name: 'REST API Design', level: 5 },
  { name: 'AI & LLM Integration', level: 4 },
  { name: 'SQL & Data Modeling', level: 4 },
  { name: 'MVC Architecture', level: 5 },
]
const timeline = [
  { period: 'Sep 2024 — Present', role: 'System Engineer', org: 'TCS · Bhubaneswar' },
  { period: 'Sep — Nov 2024', role: 'ILP Training, ITIS', org: 'TCS · Thiruvananthapuram' },
  { period: '2020 — 2024', role: 'B.Tech + Competitive Programming', org: 'MAKAUT · Kolkata' },
]

export function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title">
      <Container>
        <div id="exp-title">
          <SectionHeading
            index="04"
            eyebrow="Experience"
            titleA="Two years of"
            titleItalic="production"
            titleB="pressure."
            blurb="Real users, real incidents, real migrations — at Tata Consultancy Services."
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          {/* Sticky dossier */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-64px' }}
              className="luxe-card p-8 md:p-10"
            >
              <div className="flex items-start gap-5 border-b border-line/10 pb-7">
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-[#003087] text-white">
                  <span className="font-display text-lg font-bold leading-none tracking-tight">TCS</span>
                  <span className="mt-1 font-mono text-[7px] uppercase tracking-[0.2em] text-white/70">Tata</span>
                </div>
                <div>
                  <p className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-emeraldx">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emeraldx" /> Active
                  </p>
                  <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-ink">System Engineer</h3>
                  <p className="font-semibold text-gold">Tata Consultancy Services</p>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5"><MapPin size={12} /> Bhubaneswar, IN</span>
                    <span className="inline-flex items-center gap-1.5"><Calendar size={12} /> Sep 2024 — Present</span>
                  </p>
                </div>
              </div>

              <p className="mt-6 text-[15px] leading-relaxed text-muted">
                Full-stack engineer across the Ultimatix platform and Element Fleet Management —
                Java microservices, cloud migrations, and AI-assisted delivery.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {tech.map((t) => (
                  <span key={t} className="rounded-full border border-line/12 px-3 py-1.5 font-mono text-[11px] text-ink/75">{t}</span>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {[
                  { to: 30, suffix: '×', label: 'API uplift' },
                  { to: 2000, suffix: '+', label: 'JUnit tests' },
                  { to: 10, suffix: 'K+', label: 'Daily users' },
                  { to: 7, suffix: '+', label: 'APIs tuned' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-line/10 bg-background/50 px-4 py-4 text-center">
                    <div className="font-display text-2xl font-bold text-ink"><Counter to={s.to} suffix={s.suffix} /></div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{s.label}</div>
                  </div>
                ))}
              </div>

              <a href="/resume" className="mt-7 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-gold/40 font-bold text-gold transition-colors hover:bg-gold hover:text-gold-ink">
                <Download size={16} /> Download resume
              </a>
            </motion.div>
          </div>

          {/* Assignments */}
          <div>
            {assignments.map((a, ai) => (
              <motion.article
                key={a.client}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: ai * 0.06 }}
                viewport={{ once: true, margin: '-64px' }}
                className="relative mb-6 pl-8 last:mb-0"
              >
                <span className="spine" aria-hidden="true" />
                <span className="absolute -left-[1px] top-2 h-[13px] w-[13px] rounded-full bg-gold shadow-[0_0_16px_rgba(211,171,99,0.7)] ring-4 ring-background" aria-hidden="true" />
                <div className="luxe-card p-7 md:p-8">
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gold">{a.period}</p>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-ink">{a.client}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-muted"><Building2 size={13} /> {a.role}</p>
                  <ul className="mt-4 divide-y divide-line/8 border-t border-line/8">
                    {a.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 py-3 text-[14.5px] leading-relaxed text-ink/80">
                        <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: '-64px' }}
              className="luxe-card mt-6 p-7 md:p-8"
            >
              <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-gold">Signature wins</h4>
              <ul className="space-y-3">
                {wins.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-[15px] text-ink/85">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emeraldx" /> {w}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true, margin: '-64px' }}
            className="luxe-card p-7 md:p-8"
          >
            <h3 className="mb-5 font-display text-xl font-bold tracking-tight text-ink">Professional skills</h3>
            <ul className="divide-y divide-line/8">
              {skills.map((s) => (
                <li key={s.name} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="text-[15px] font-semibold text-ink">{s.name}</span>
                  <Dots level={s.level} label={s.name} />
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            viewport={{ once: true, margin: '-64px' }}
            className="luxe-card p-7 md:p-8"
          >
            <h3 className="mb-6 font-display text-xl font-bold tracking-tight text-ink">Career timeline</h3>
            <ol className="relative space-y-7 pl-7">
              <span className="spine" aria-hidden="true" />
              {timeline.map((t) => (
                <li key={t.period} className="relative">
                  <span className="absolute -left-7 top-1.5 h-[11px] w-[11px] rounded-full bg-gold ring-4 ring-background" aria-hidden="true" />
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-gold">{t.period}</p>
                  <p className="mt-1 text-[15px] font-bold text-ink">{t.role}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{t.org}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
