'use client'
import { motion } from 'framer-motion'
import { Gamepad2, Plane, Music4, Lightbulb, MapPin, Clock, Briefcase, Languages, Trophy, GraduationCap } from 'lucide-react'
import { Container } from '@/components/luxe/Container'
import { SectionHeading } from '@/components/luxe/SectionHeading'

const education = [
  { degree: 'B.Tech, Electronics & Communication', school: 'MAKAUT, Kolkata', meta: '2020 – 2024', grade: 'CGPA 8.79 / 10' },
  { degree: 'Higher Secondary (XII)', school: 'WBCHSE, Kirnahar', meta: '2020', grade: '92%' },
  { degree: 'Secondary (X)', school: 'WBBSE, Kirnahar', meta: '2018', grade: '90.3%' },
]

const achievements = [
  'TCS DEEP Ninja Certified DevOps Engineer',
  '700+ problems solved across LeetCode, CodeChef & Codeforces',
  'LeetCode max rating 1672 · CodeChef 1708 (3-Star)',
  '100+ CSES problem set solves',
  'Shipped AlgoGuru.online end-to-end — domain, auth, AI bot, deploy',
  'Technical interviewer & onboarding mentor @ TCS',
]

const interests = [
  { icon: Gamepad2, label: 'Gaming' },
  { icon: Plane, label: 'Travel' },
  { icon: Music4, label: 'Music' },
  { icon: Lightbulb, label: 'Learning' },
]

const snapshot = [
  { icon: MapPin, k: 'Based in', v: 'Bhubaneswar, India' },
  { icon: Clock, k: 'Timezone', v: 'IST (UTC +5:30)' },
  { icon: Briefcase, k: 'Currently', v: 'System Engineer @ TCS' },
  { icon: Languages, k: 'Languages', v: 'English · Hindi · Bengali' },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title">
      <Container>
        <div id="about-title">
          <SectionHeading
            index="01"
            eyebrow="About"
            titleA="Engineer by craft,"
            titleItalic="problem solver"
            titleB="by nature."
            blurb="Two years in production at TCS taught me what tutorials never do — how to keep systems fast, readable, and kind to the next engineer."
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {/* Story */}
          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-64px' }}
            className="luxe-card luxe-lift p-8 md:p-10 lg:col-span-2"
          >
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.24em] text-gold">Who I am</p>
            <div className="space-y-5 text-[15px] leading-relaxed text-muted md:text-base">
              <p>
                Hello — I&apos;m <span className="font-semibold text-ink">Aritra Dutta</span>, a full-stack
                engineer with 2+ years at <span className="font-semibold text-ink">TCS</span>, modernizing
                backends that serve <span className="font-semibold text-ink">10K+ daily users</span>.
              </p>
              <p>
                Day to day: <span className="font-semibold text-ink">Java 8→21, Spring Boot 3, PostgreSQL,
                AWS & Azure PaaS</span> — remediation and cloud migrations for clients like Element Fleet
                Management, plus <span className="font-semibold text-ink">AI features with Python, LangChain and RAG</span>.
              </p>
              <p>
                Off the clock I chase ratings — <span className="font-bold text-gold">700+ problems</span> solved,
                LeetCode <span className="font-bold text-gold">1672</span>.
              </p>
            </div>
            <blockquote className="mt-8 border-l-2 border-gold pl-5 font-serifd text-xl italic leading-snug text-ink md:text-2xl">
              “I like systems that are fast, readable, and kind to the next engineer.”
            </blockquote>
            <div className="mt-8 flex flex-wrap gap-2.5 border-t border-line/10 pt-7">
              {interests.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 rounded-full border border-line/12 px-4 py-2 text-sm text-ink/80">
                  <Icon size={15} className="text-gold" /> {label}
                </span>
              ))}
            </div>
          </motion.article>

          {/* Snapshot + Education */}
          <div className="flex flex-col gap-5">
            <motion.aside
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-64px' }}
              className="luxe-card p-7"
            >
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-gold">Snapshot</p>
              <dl className="divide-y divide-line/8">
                {snapshot.map(({ icon: Icon, k, v }) => (
                  <div key={k} className="flex items-center gap-3.5 py-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line/12 text-gold">
                      <Icon size={16} />
                    </span>
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{k}</dt>
                      <dd className="text-[15px] font-semibold text-ink">{v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </motion.aside>

            <motion.aside
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: '-64px' }}
              className="luxe-card p-7"
            >
              <p className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-gold">
                <GraduationCap size={14} /> Education
              </p>
              <div className="divide-y divide-line/8">
                {education.map((e, i) => (
                  <div key={e.degree} className="py-4 first:pt-0 last:pb-0">
                    <p className="font-mono text-[11px] text-muted">0{i + 1}</p>
                    <h3 className="mt-1 text-[15px] font-bold leading-snug text-ink">{e.degree}</h3>
                    <p className="text-sm text-muted">{e.school} · {e.meta}</p>
                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 font-mono text-[11px] font-bold text-gold">
                      <Trophy size={11} /> {e.grade}
                    </span>
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-64px' }}
          className="mt-5"
        >
          <div className="luxe-card p-8 md:p-10">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.24em] text-gold">Key achievements</p>
            <ul className="grid gap-x-10 md:grid-cols-2">
              {achievements.map((a, i) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
                  viewport={{ once: true }}
                  className="group flex items-baseline gap-4 border-b border-line/8 py-4"
                >
                  <span className="font-mono text-xs font-bold text-gold">0{i + 1}</span>
                  <span className="text-[15px] text-ink/85 transition-colors group-hover:text-ink">{a}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
