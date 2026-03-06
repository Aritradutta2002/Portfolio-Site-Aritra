'use client'

import { motion } from 'framer-motion'
import { Code, Database, Globe, Server, Sparkles, Award } from 'lucide-react'

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    color: 'from-orange-500 to-amber-500',
    skills: [
      { name: 'Java 17',     level: 96, color: 'from-orange-400 to-orange-600' },
      { name: 'TypeScript',  level: 85, color: 'from-blue-400 to-blue-600' },
      { name: 'JavaScript',  level: 85, color: 'from-yellow-400 to-yellow-600' },
      { name: 'C++',         level: 85, color: 'from-purple-400 to-purple-600' },
      { name: 'Python',      level: 75, color: 'from-green-400 to-green-600' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    icon: Globe,
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'Spring Boot 3', level: 95, color: 'from-green-500 to-green-700' },
      { name: 'Angular v20',   level: 90, color: 'from-red-500 to-red-700' },
      { name: 'Hibernate',     level: 85, color: 'from-amber-500 to-amber-700' },
      { name: 'React',         level: 75, color: 'from-cyan-400 to-cyan-600' },
      { name: 'Express.js',    level: 70, color: 'from-gray-400 to-gray-600' },
    ],
  },
  {
    title: 'Databases & Tools',
    icon: Database,
    color: 'from-indigo-500 to-blue-500',
    skills: [
      { name: 'PostgreSQL',      level: 90, color: 'from-indigo-400 to-indigo-600' },
      { name: 'Oracle Database', level: 85, color: 'from-red-500 to-red-700' },
      { name: 'Git & GitHub',    level: 90, color: 'from-gray-600 to-gray-800' },
      { name: 'Docker',          level: 85, color: 'from-blue-400 to-blue-600' },
      { name: 'Jenkins',         level: 85, color: 'from-red-400 to-red-600' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: Server,
    color: 'from-violet-500 to-purple-500',
    skills: [
      { name: 'Azure PaaS',    level: 85, color: 'from-blue-400 to-blue-600' },
      { name: 'REST APIs',     level: 95, color: 'from-green-400 to-green-600' },
      { name: 'Microservices', level: 90, color: 'from-purple-400 to-purple-600' },
      { name: 'CI/CD Pipelines', level: 85, color: 'from-orange-400 to-orange-600' },
    ],
  },
]

const cpStats = [
  { value: '1750', label: 'LeetCode Rating',  sub: 'Max Rating',    color: 'from-blue-600 to-blue-400' },
  { value: '1604', label: 'CodeChef Rating',  sub: '3-Star',        color: 'from-violet-600 to-violet-400' },
  { value: '600+', label: 'Problems Solved',  sub: 'LC & CF',       color: 'from-emerald-600 to-emerald-400' },
  { value: '1046', label: 'CodeForces Rank',  sub: 'Global Rank',   color: 'from-orange-600 to-orange-400' },
]

const certifications = [
  'TCS DEEP Ninja Certified DevOps Engineer — Docker, Jenkins CI/CD, Cloud Deployment',
  'Problem Solving (Intermediate) — HackerRank',
  'The Complete Python Pro Bootcamp — Udemy',
  'Object Oriented Programming in Java — Coursera',
  'Full Stack Java: JAVA + JSP + SPRING + BOOT + JS + REACT — Udemy',
]

type Skill = { name: string; level: number; color: string }

function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[13.5px] font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1.2, delay: index * 0.08, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  )
}

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

        {/* ── Skill Category Cards ────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-6 mb-20">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-7 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-md`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[16px] font-bold text-gray-900 dark:text-white">{category.title}</h3>
              </div>
              <div>
                {category.skills.map((skill, si) => (
                  <SkillBar key={skill.name} skill={skill} index={si} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Competitive Programming Stats ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Competitive Programming</h3>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {cpStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50 text-center"
              >
                <div className={`text-3xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-1`}>
                  {s.value}
                </div>
                <div className="text-[13px] font-semibold text-gray-700 dark:text-gray-300">{s.label}</div>
                <div className="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5">{s.sub}</div>
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
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Certifications</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200/50 dark:border-gray-700/50 flex items-start gap-3 hover:shadow-lg transition-all duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 flex-shrink-0 mt-1.5" />
                <p className="text-[13.5px] text-gray-700 dark:text-gray-300 leading-relaxed">{cert}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
