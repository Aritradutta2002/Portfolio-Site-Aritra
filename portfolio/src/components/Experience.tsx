'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Building, Code, Trophy, Sparkles, CheckCircle } from 'lucide-react'

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
  { value: '1.5yr+',  label: 'at TCS',                color: 'from-blue-600 to-blue-400' },
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
            className="glass-galaxy rounded-3xl p-8 lg:p-10 relative overflow-hidden group"
          >
            {/* Ambient glows */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 group-hover:bg-primary/20 transition-colors duration-500" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -z-10 group-hover:bg-secondary/20 transition-colors duration-500" />

            {/* Company header */}
            <div className="flex items-start gap-5 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary p-[1px] rounded-2xl shadow-lg group-hover:shadow-neon-purple transition-shadow duration-500 flex-shrink-0">
                <div className="w-full h-full bg-surface/90 rounded-[15px] flex items-center justify-center backdrop-blur-xl">
                  <Building className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white leading-snug tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all duration-300">{experience.position}</h3>
                <p className="text-primary font-bold text-[16px] mt-1 glow">{experience.company}</p>
                <div className="flex flex-wrap gap-4 mt-3 text-[12px] font-medium text-gray-400">
                  <span className="flex items-center gap-1.5"><MapPin size={13} className="text-primary/70" />{experience.location}</span>
                  <span className="flex items-center gap-1.5"><Calendar size={13} className="text-secondary/70" />{experience.startDate} – {experience.endDate}</span>
                </div>
              </div>
            </div>

            <p className="text-[14px] md:text-[15px] text-gray-300 font-medium leading-relaxed mb-8 pl-5 border-l-2 border-primary/40 group-hover:border-primary transition-colors duration-300">
              {experience.description}
            </p>

            {/* Responsibilities */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <Code className="w-4 h-4" />
                </div>
                <h4 className="text-[16px] font-bold text-white tracking-tight">Key Responsibilities</h4>
              </div>
              <ul className="space-y-3">
                {experience.responsibilities.map((r, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-[14px] text-gray-300 font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-2 shadow-neon-purple" />
                    {r}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h4 className="text-[14px] font-bold uppercase tracking-wider text-gray-500 mb-4">Technologies Used</h4>
              <div className="flex flex-wrap gap-2.5">
                {experience.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white/5 text-gray-300 border border-white/10 rounded-lg text-[12px] font-bold group-hover:border-primary/30 transition-colors duration-300 backdrop-blur-sm hover:bg-white/10 cursor-default">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="pt-6 border-t border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Trophy className="w-4 h-4" />
                </div>
                <h4 className="text-[16px] font-bold text-white tracking-tight">Key Achievements</h4>
              </div>
              <ul className="space-y-3">
                {experience.achievements.map((a, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-[14px] text-gray-300 font-medium group/item"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="group-hover/item:text-white transition-colors">{a}</span>
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
            <div className="glass-galaxy rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[40px] -z-10 group-hover:bg-primary/15 transition-colors duration-500" />
              <h3 className="text-[18px] font-bold text-white mb-6 tracking-tight">Professional Skills</h3>
              <div className="space-y-5">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[14px] font-bold text-gray-300 group-hover:text-white transition-colors">{skill.name}</span>
                      <span className="text-[12px] font-bold text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/5 border border-white/10 rounded-full h-2.5 overflow-hidden backdrop-blur-sm">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full shadow-neon-purple"
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
            <div className="glass-galaxy rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/5 rounded-full blur-[40px] -z-10 group-hover:bg-secondary/15 transition-colors duration-500" />
              <h3 className="text-[18px] font-bold text-white mb-6 tracking-tight">Career Timeline</h3>
              <div className="relative pl-6">
                {/* Vertical line */}
                <div className="absolute left-2.5 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-secondary to-pink-500 opacity-50" />
                <div className="space-y-8">
                  {timeline.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="relative group/time"
                    >
                      <div className={`absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-gradient-to-br ${item.color} shadow-lg ring-4 ring-background group-hover/time:scale-125 transition-transform`} />
                      <p className="text-[14px] font-bold text-white glow group-hover/time:text-primary transition-colors">{item.period}</p>
                      <p className="text-[13.5px] font-bold text-gray-300 mt-1">{item.role}</p>
                      <p className="text-[12px] font-medium text-gray-500 uppercase tracking-wider mt-0.5">{item.org}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Work Stats */}
            <div className="glass-galaxy rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[40px] -z-10 group-hover:bg-emerald-500/15 transition-colors duration-500" />
              <h3 className="text-[18px] font-bold text-white mb-8 text-center tracking-tight">Professional Growth</h3>
              <div className="grid grid-cols-2 gap-6">
                {workStats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className="text-center bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm group-hover:border-white/20 transition-colors"
                  >
                    <div className={`text-3xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-1 glow`}>{s.value}</div>
                    <div className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">{s.label}</div>
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
