'use client'

import { motion } from 'framer-motion'
import { SectionHeading } from './SectionHeading'
import { CountUp } from './CountUp'
import { GlassCard } from './GlassCard'

/* ── Skill data ─────────────────────────────────────────────── */
const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Java 17',     level: 96 },
      { name: 'Python',      level: 85 },
      { name: 'TypeScript',  level: 85 },
      { name: 'SQL',         level: 80 },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'Spring Boot 3', level: 95 },
      { name: 'Angular v20',   level: 90 },
      { name: 'React',         level: 75 },
    ],
  },
  {
    title: 'Databases & Tools',
    skills: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'Docker',     level: 85 },
      { name: 'Jenkins',    level: 85 },
      { name: 'Git',        level: 90 },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'Azure PaaS', level: 85 },
      { name: 'AWS',        level: 80 },
    ],
  },
]

const extraTech = ['Spring MVC', 'Spring Data JPA', 'Spring Security', 'Hibernate', 'REST APIs', 'Microservices', 'JUnit 5', 'Mockito', 'Maven', 'SonarQube', 'Tomcat', 'JBoss', 'Kafka', 'Tailwind CSS', 'Agile/Scrum', 'Jira', 'Jile', 'Code Review', 'GitHub Copilot', 'CI/CD', 'Oracle Database', 'MySQL']

const aiTech = ['Generative AI', 'RAG', 'LangChain', 'LLM Integration']

const cpStats = [
  { to: 1672, suffix: '',  label: 'LeetCode Rating',  sub: 'Max Rating' },
  { to: 1708, suffix: '',  label: 'CodeChef Rating',  sub: '3-Star' },
  { to: 700,  suffix: '+', label: 'Problems Solved',  sub: 'Across Platforms' },
  { to: 1046, suffix: '',  label: 'CodeForces Rank',  sub: 'Div 2' },
]

const certifications = [
  { text: 'Enterprise Java Modernisation', issuer: 'AWS Transform' },
  { text: 'Problem Solving (Intermediate)', issuer: 'HackerRank' },
  { text: 'The Complete Python Pro Bootcamp', issuer: 'Udemy' },
  { text: 'Object Oriented Programming in Java', issuer: 'Coursera' },
  { text: 'Full Stack Java: JAVA + JSP + SPRING + BOOT + JS + REACT', issuer: 'Udemy' },
]

export function Skills() {
  return (
    <section id="skills" className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="Skills & Technologies"
          blurb="Technologies and tools I work with to bring ideas to life"
        />

        {/* ── Skill groups — glass cards with aurora meter rows ── */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 md:mb-20">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: (ci % 2) * 0.08 }}
              viewport={{ once: true, margin: '-64px' }}
            >
              <GlassCard hover className="p-7">
                <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-ink mb-5 flex items-center gap-3">
                  <span className="w-6 h-px bg-aurora" aria-hidden="true" />
                  {category.title}
                </h3>
                <div className="border-t border-aurora/10">
                  {category.skills.map((skill, si) => (
                    <div key={skill.name} className="py-3.5 border-b border-aurora/10 last:border-b-0">
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-[15px] font-semibold text-ink">{skill.name}</span>
                        <span className="font-mono text-xs text-muted">{skill.level}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-line/10 overflow-hidden">
                        <motion.div
                          className="meter-fill h-full rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: si * 0.06, ease: 'easeOut' }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* ── Also experienced with ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-5">Also experienced with</p>
          <div className="flex flex-wrap gap-2.5">
            {extraTech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full border border-aurora/20 font-mono text-xs text-ink/75 hover:border-aurora/60 hover:text-aurorastrong transition-colors duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mt-6">Spoken languages — English · Hindi · Bengali</p>
        </motion.div>

        {/* ── AI & LLM ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-20"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-5">AI & LLM integration</p>
          <div className="flex flex-wrap gap-2.5">
            {aiTech.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-aurora text-[#0B0616] font-mono text-xs font-bold cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Competitive Programming — gradient-border grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: '-64px' }}
          className="mb-16 md:mb-20"
        >
          <h3 className="font-display text-2xl font-bold tracking-tight text-ink mb-8">Competitive Programming</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {cpStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="glass-card glass-hover p-6"
              >
                <div className="font-display text-3xl md:text-4xl font-bold tracking-tight text-gradient mb-2">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="text-sm font-semibold text-ink">{s.label}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mt-1">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Certifications ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: '-64px' }}
        >
          <h3 className="font-display text-2xl font-bold tracking-tight text-ink mb-8">Certifications</h3>
          <div className="border-t border-aurora/10">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.text}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3) }}
                viewport={{ once: true }}
                className="flex items-center justify-between gap-4 py-4 border-b border-aurora/10 group px-2 -mx-2 hover:bg-aurora/[0.03] transition-colors duration-300"
              >
                <p className="text-[15px] font-medium text-ink/85 group-hover:text-ink transition-colors duration-300">
                  {cert.text}
                </p>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-aurorastrong border border-aurora/30 rounded-full px-3 py-1 flex-shrink-0">
                  {cert.issuer}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
