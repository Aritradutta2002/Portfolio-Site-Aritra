'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Building, Code, Trophy, Sparkles, CheckCircle } from 'lucide-react'

const experience = {
  company: 'Tata Consultancy Services',
  position: 'Assistant System Engineer – Backend & Microservices',
  location: 'Bhubaneswar, India',
  startDate: 'September 2024',
  endDate: 'Present',
  description:
    'Building enterprise-grade microservices and backend systems for Ultimatix platform. Leading critical production migrations, version upgrades, and performance optimizations while working with Java 17, Spring Boot 3, PostgreSQL, Angular, and Azure PaaS infrastructure.',
  responsibilities: [
    'Single-handedly decomposed iDeclare from monolithic application into independent microservice with 20+ REST APIs',
    'Executed zero-downtime production migration from JBoss to Tomcat PaaS on Azure (10K+ daily users)',
    'Led critical version upgrades: Java 8→17 and Spring Boot 2→3 with zero service disruption',
    'Optimized SQL queries achieving 20-30x performance improvement across critical APIs',
    'Built and owned Jenkins CI/CD pipelines for automated Docker containerization and production releases',
    'Designed complex multi-stage approval workflows with full audit trail for Patent/Trademark modules',
    'Upgraded Angular frontend from v17 to v20 LTS with zero-disruption migration',
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
    role: 'Assistant System Engineer – Backend & Microservices',
    org: 'TCS — Bhubaneswar, India',
    color: 'from-blue-600 to-violet-600',
  },
  {
    period: 'Sep 2024 – Nov 2024',
    role: 'ILP Training (ITIS Technology)',
    org: 'TCS — Thiruvananthapuram, IN',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    period: '2020 – 2024',
    role: 'B.Tech + Competitive Programming',
    org: 'MAKAUT — Kolkata, WB',
    color: 'from-violet-500 to-pink-500',
  },
]

const workStats = [
  { value: '1yr+',  label: 'at TCS',                color: 'from-blue-600 to-blue-400' },
  { value: '10+',   label: 'Technologies Mastered',  color: 'from-violet-600 to-violet-400' },
  { value: '100%',  label: 'Training Completion',    color: 'from-emerald-600 to-emerald-400' },
  { value: '20+',   label: 'REST APIs Built',        color: 'from-orange-600 to-orange-400' },
]

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
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
            Work Experience
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
          </div>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            My journey in the software engineering industry
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ── Experience Card ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
          >
            {/* Company header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">{experience.position}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold text-[15px] mt-0.5">{experience.company}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-500 dark:text-gray-500">
                  <span className="flex items-center gap-1"><MapPin size={11} />{experience.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} />{experience.startDate} – {experience.endDate}</span>
                </div>
              </div>
            </div>

            <p className="text-[13.5px] text-gray-600 dark:text-gray-400 leading-relaxed mb-6 pl-4 border-l-2 border-blue-500/40">
              {experience.description}
            </p>

            {/* Responsibilities */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h4 className="text-[14px] font-semibold text-gray-900 dark:text-white">Key Responsibilities</h4>
              </div>
              <ul className="space-y-2">
                {experience.responsibilities.map((r, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2.5 text-[13px] text-gray-600 dark:text-gray-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex-shrink-0 mt-1.5" />
                    {r}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="text-[14px] font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, i) => (
                  <span key={i} className="px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-500/20 rounded-lg text-[11.5px] font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h4 className="text-[14px] font-semibold text-gray-900 dark:text-white">Key Achievements</h4>
              </div>
              <ul className="space-y-2">
                {experience.achievements.map((a, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2.5 text-[13px] text-gray-600 dark:text-gray-400"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    {a}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ── Right Column ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Skill bars */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-7 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-[16px] font-bold text-gray-900 dark:text-white mb-6">Professional Skills</h3>
              <div className="space-y-4">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[13.5px] font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-xs font-semibold text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-600 to-violet-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.2, delay: i * 0.08, ease: 'easeOut' }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Career Timeline */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-7 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-[16px] font-bold text-gray-900 dark:text-white mb-6">Career Timeline</h3>
              <div className="relative pl-5">
                {/* Vertical line */}
                <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500 via-violet-500 to-pink-500 opacity-30" />
                <div className="space-y-6">
                  {timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className={`absolute -left-5 top-1 w-3 h-3 rounded-full bg-gradient-to-br ${item.color} shadow-md`} />
                      <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{item.period}</p>
                      <p className="text-[12.5px] text-gray-600 dark:text-gray-400 mt-0.5">{item.role}</p>
                      <p className="text-[11.5px] text-gray-400 dark:text-gray-600">{item.org}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Work Stats */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-7 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-[16px] font-bold text-gray-900 dark:text-white mb-6 text-center">Professional Growth</h3>
              <div className="grid grid-cols-2 gap-4">
                {workStats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className={`text-2xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
                    <div className="text-[12px] text-gray-500 dark:text-gray-500 mt-0.5">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
