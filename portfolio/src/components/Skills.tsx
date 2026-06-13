'use client'

import { motion } from 'framer-motion'
import { Award, Sparkles } from 'lucide-react'
import { TechIconCard } from './TechIcon3D'

/* ── Skill data with logo mapping ─────────────────────────── */
const skillCategories = [
  {
    title: 'Programming Languages',
    gradient: 'from-orange-500/20 to-amber-500/20',
    borderColor: 'rgba(249,115,22,0.3)',
    glowColor: '#f97316',
    skills: [
      { name: 'Java 17',     level: 96, color: '#EA2D2E' },
      { name: 'TypeScript',  level: 85, color: '#007ACC' },
      { name: 'JavaScript',  level: 85, color: '#F7DF1E' },
      { name: 'C++',         level: 85, color: '#9C033A' },
      { name: 'Python',      level: 75, color: '#3776AB' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    gradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'rgba(34,197,94,0.3)',
    glowColor: '#22c55e',
    skills: [
      { name: 'Spring Boot 3', level: 95, color: '#6DB33F' },
      { name: 'Angular v20',   level: 90, color: '#DD0031' },
      { name: 'React',         level: 75, color: '#61DAFB' },
    ],
  },
  {
    title: 'Databases & Tools',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    borderColor: 'rgba(99,102,241,0.3)',
    glowColor: '#6366f1',
    skills: [
      { name: 'PostgreSQL', level: 90, color: '#336791' },
      { name: 'Docker',     level: 85, color: '#2396ED' },
      { name: 'Jenkins',    level: 85, color: '#EF3D3A' },
      { name: 'Git',        level: 90, color: '#F34F29' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    gradient: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'rgba(139,92,246,0.3)',
    glowColor: '#8b5cf6',
    skills: [
      { name: 'Azure PaaS', level: 85, color: '#0078D4' },
      { name: 'AWS',        level: 80, color: '#FF9900' },
    ],
  },
]

const cpStats = [
  { value: '1672', label: 'LeetCode Rating',  sub: 'Max Rating',       color: 'from-blue-600 to-blue-400',    glow: 'rgba(59,130,246,0.4)' },
  { value: '1708', label: 'CodeChef Rating',  sub: '3-Star',           color: 'from-violet-600 to-violet-400', glow: 'rgba(139,92,246,0.4)' },
  { value: '554+', label: 'Problems Solved',  sub: 'Across Platforms', color: 'from-emerald-600 to-emerald-400', glow: 'rgba(16,185,129,0.4)' },
  { value: '1046', label: 'CodeForces Rank',  sub: 'Div 2',            color: 'from-orange-600 to-orange-400', glow: 'rgba(249,115,22,0.4)' },
]

const certifications = [
  { text: 'TCS DEEP Ninja Certified DevOps Engineer', issuer: 'TCS', color: '#06b6d4' },
  { text: 'Problem Solving (Intermediate)', issuer: 'HackerRank', color: '#00EA64' },
  { text: 'The Complete Python Pro Bootcamp', issuer: 'Udemy', color: '#A435F0' },
  { text: 'Object Oriented Programming in Java', issuer: 'Coursera', color: '#0056D2' },
  { text: 'Full Stack Java: JAVA + JSP + SPRING + BOOT + JS + REACT', issuer: 'Udemy', color: '#A435F0' },
]

export function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/70 dark:border-blue-500/25 text-blue-700 dark:text-blue-300 text-[13px] font-medium mb-4"
          >
            <Sparkles size={12} />
            Technical Skills
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Skills &amp; Technologies
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
          </div>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* ── Tech Logo Grid (replaces progress bars) ──────── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              viewport={{ once: true }}
              className="glass-galaxy rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-500"
              style={{ borderColor: category.borderColor }}
            >
              {/* Ambient corner glow */}
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[60px] opacity-40 group-hover:opacity-70 transition-opacity duration-500 -z-10"
                style={{ background: category.glowColor }}
              />

              {/* Category title */}
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="h-1 w-8 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${category.glowColor}, transparent)` }}
                />
                <h3 className="text-[18px] font-bold text-white tracking-tight">{category.title}</h3>
              </div>

              {/* Logo icon grid with proficiency rings */}
              <div className="flex flex-wrap gap-6 justify-start">
                {category.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: si * 0.08 + ci * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <TechIconCard
                      name={skill.name}
                      level={skill.level}
                      ringColor={skill.color}
                      size="lg"
                      showName
                      animFloat={false}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Skill level legend */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-4 flex-wrap">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: skill.color }} />
                    <span className="text-[11px] text-gray-500 font-mono">{skill.level}%</span>
                    <span className="text-[11px] text-gray-600">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Additional Tech Pills (tools not in main grid) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-5 text-center">Also experienced with</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['REST APIs', 'Microservices', 'CI/CD Pipelines', 'Hibernate', 'Oracle Database', 'MySQL', 'Spring Security', 'JUnit 5', 'Mockito', 'Maven', 'Tomcat', 'JBoss', 'Kafka', 'Tailwind CSS', 'Agile/Scrum', 'GitHub Copilot'].map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ y: -2, scale: 1.05 }}
                className="px-4 py-2 glass-galaxy rounded-xl text-[12px] font-bold text-gray-300 border border-white/8 cursor-default hover:border-primary/40 hover:text-white transition-all duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ── Competitive Programming Stats ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Competitive Programming</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {cpStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-galaxy rounded-2xl p-6 text-center group relative overflow-hidden transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Glow pulse on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 30px ${s.glow}` }}
                />
                <div className={`text-4xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-2 glow`}>
                  {s.value}
                </div>
                <div className="text-[14px] font-bold text-gray-200">{s.label}</div>
                <div className="text-[12px] font-medium text-gray-500 mt-1 uppercase tracking-wider">{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Certifications ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Certifications</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, scale: 1.01 }}
                className="glass-galaxy rounded-2xl p-5 flex items-start gap-4 group transition-all duration-300 relative overflow-hidden"
              >
                {/* Left color bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(180deg, ${cert.color}, transparent)` }}
                />
                {/* Issuer badge */}
                <div
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
                  style={{ background: `${cert.color}25`, border: `1px solid ${cert.color}40`, color: cert.color }}
                >
                  {cert.issuer}
                </div>
                <p className="text-[14px] font-medium text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {cert.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
