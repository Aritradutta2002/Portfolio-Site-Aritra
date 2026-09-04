'use client'
import { motion } from 'framer-motion'
import { Sparkles, Award } from 'lucide-react'
import { Container } from '@/components/luxe/Container'
import { SectionHeading } from '@/components/luxe/SectionHeading'
import { Dots } from '@/components/luxe/Chip'
import { Counter } from '@/components/luxe/Counter'

const groups = [
  {
    title: 'Languages',
    skills: [
      { name: 'Java 17 / 21', level: 5, years: '3y' },
      { name: 'Python', level: 4, years: '2y' },
      { name: 'TypeScript', level: 4, years: '2y' },
      { name: 'SQL', level: 4, years: '3y' },
    ],
  },
  {
    title: 'Frameworks',
    skills: [
      { name: 'Spring Boot 3', level: 5, years: '2y' },
      { name: 'Angular 20', level: 4, years: '2y' },
      { name: 'React + Next.js', level: 4, years: '2y' },
      { name: 'Hibernate / JPA', level: 4, years: '2y' },
    ],
  },
  {
    title: 'Data & Infra',
    skills: [
      { name: 'PostgreSQL', level: 5, years: '2y' },
      { name: 'Docker', level: 4, years: '2y' },
      { name: 'Kafka', level: 3, years: '1y' },
      { name: 'Git', level: 5, years: '4y' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'Azure PaaS', level: 4, years: '1y' },
      { name: 'AWS', level: 4, years: '2y' },
      { name: 'Jenkins CI/CD', level: 4, years: '2y' },
      { name: 'SonarQube', level: 4, years: '2y' },
    ],
  },
]

const toolbox = ['Spring Security', 'Spring MVC', 'REST APIs', 'Microservices', 'JUnit 5', 'Mockito', 'Maven', 'Tomcat', 'JBoss', 'Oracle DB', 'MySQL', 'Tailwind CSS', 'Agile / Scrum', 'Jira', 'GitHub Copilot']
const aiStack = ['Generative AI', 'RAG', 'LangChain', 'LLM Integration']

const cp = [
  { to: 1672, suffix: '', label: 'LeetCode', sub: 'Max rating' },
  { to: 1708, suffix: '', label: 'CodeChef', sub: '3-Star' },
  { to: 700, suffix: '+', label: 'Solved', sub: 'All platforms' },
  { to: 1046, suffix: '', label: 'Codeforces', sub: 'Div 2' },
]

const certs = [
  { text: 'TCS DEEP Ninja Certified DevOps Engineer', issuer: 'TCS' },
  { text: 'Problem Solving (Intermediate)', issuer: 'HackerRank' },
  { text: 'Complete Python Pro Bootcamp', issuer: 'Udemy' },
  { text: 'OOP in Java', issuer: 'Coursera' },
  { text: 'Full-Stack Java: Spring + Boot + React', issuer: 'Udemy' },
]

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title">
      <Container>
        <div id="skills-title">
          <SectionHeading
            index="02"
            eyebrow="Arsenal"
            titleA="Tools I"
            titleItalic="master,"
            titleB="not just use."
            blurb="The stack behind 30× API wins, zero-downtime migrations, and a live AI learning platform."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {groups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: (gi % 2) * 0.08 }}
              viewport={{ once: true, margin: '-64px' }}
              className="luxe-card luxe-lift p-7"
            >
              <h3 className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-ink">
                <span className="h-px w-6 bg-gold" aria-hidden="true" />
                {g.title}
              </h3>
              <ul className="divide-y divide-line/8">
                {g.skills.map((s) => (
                  <li key={s.name} className="flex items-center justify-between gap-4 py-3.5">
                    <div>
                      <p className="text-[15px] font-semibold text-ink">{s.name}</p>
                      <p className="font-mono text-[11px] text-muted">{s.years} production</p>
                    </div>
                    <Dots level={s.level} label={s.name} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Also in the toolbox</p>
          <div className="flex flex-wrap gap-2.5">
            {toolbox.map((t) => (
              <span key={t} className="cursor-default rounded-full border border-line/12 px-4 py-2 font-mono text-xs text-ink/75 transition-colors duration-300 hover:border-gold/50 hover:text-gold">
                {t}
              </span>
            ))}
          </div>
          <p className="mb-4 mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            <Sparkles size={13} className="text-gold" /> AI & LLM — production grade
          </p>
          <div className="flex flex-wrap gap-2.5">
            {aiStack.map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 font-mono text-xs font-bold text-gold-ink">
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-64px' }}
          className="mt-14"
        >
          <h3 className="mb-6 font-display text-2xl font-bold tracking-tight text-ink">
            Competitive programming <span className="serif-accent text-2xl">— rated & ranked</span>
          </h3>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {cp.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="luxe-card luxe-lift p-6"
              >
                <div className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm font-bold text-ink">{s.label}</div>
                <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: '-64px' }}
          className="mt-14"
        >
          <h3 className="mb-4 flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-ink">
            <Award size={22} className="text-gold" /> Certifications
          </h3>
          <ul className="divide-y divide-line/8 border-t border-line/8">
            {certs.map((c) => (
              <li key={c.text} className="group flex items-center justify-between gap-4 py-4">
                <p className="text-[15px] font-medium text-ink/85 transition-colors group-hover:text-ink">{c.text}</p>
                <span className="shrink-0 rounded-full border border-gold/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
                  {c.issuer}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </Container>
    </section>
  )
}
