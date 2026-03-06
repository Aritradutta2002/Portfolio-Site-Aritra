'use client'

import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Award, Trophy, Code2, Target, Sparkles } from 'lucide-react'

const educationData = [
  {
    degree: 'B.Tech in Electronics & Communication Engineering',
    institution: 'Maulana Abul Kalam Azad University of Technology (MAKAUT)',
    location: 'Kolkata, WB',
    duration: '2020 - 2024',
    grade: 'CGPA: 8.79/10',
    icon: GraduationCap,
  },
  {
    degree: 'Higher Secondary (XII)',
    institution: 'WBCHSE',
    location: 'Kirnahar, WB',
    duration: '2020',
    grade: 'Percentage: 92%',
    icon: Award,
  },
  {
    degree: 'Secondary (X)',
    institution: 'WBBSE',
    location: 'Kirnahar, WB',
    duration: '2018',
    grade: 'Percentage: 90.30%',
    icon: Award,
  },
]

const achievements = [
  'TCS DEEP Ninja Certified DevOps Engineer – Docker, Jenkins CI/CD, and cloud deployment',
  'Solved 600+ algorithmic problems across LeetCode and Codeforces',
  'LeetCode Weekly Contest ranking 3556 with max rating 1750',
  'Secured Global Rank 1046 in CodeForces Round 967 div 2',
  'CodeChef Rating 1604 (3-star)',
  'Solved over 100 problems in CSES CP sheet',
  'First Runner-up in District Level Youth Parliament',
]

const interests = [
  { emoji: '🎮', label: 'Gaming' },
  { emoji: '✈️', label: 'Traveling' },
  { emoji: '🎵', label: 'Music' },
  { emoji: '💡', label: 'Learning' },
]

/* ── Shared section-header component ─────────────────────── */
function SectionHeader({ label, title, subtitle }: { label: string; title: string; subtitle: string }) {
  return (
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
        {label}
      </motion.span>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
        <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
      </div>
      <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
    </motion.div>
  )
}

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <SectionHeader
          label="About Me"
          title="My Journey"
          subtitle="Get to know more about my background, education, and achievements"
        />

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ── Personal Story ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Who I Am</h3>
            </div>

            <div className="space-y-5 text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed">
              <p className="pl-4 border-l-2 border-blue-500/60">
                Hello! I&apos;m <span className="font-semibold text-gray-900 dark:text-white">Aritra Dutta</span>, a passionate Backend &amp; Microservices Engineer at{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">Tata Consultancy Services (TCS)</span> in Bhubaneswar, India.
              </p>
              <p className="pl-4 border-l-2 border-violet-500/60">
                Currently building enterprise microservices for the Ultimatix platform with{' '}
                <span className="font-medium text-gray-800 dark:text-gray-200">Java 17, Spring Boot 3, PostgreSQL, Angular v20, and Azure PaaS</span>. Led critical production migrations and achieved 20–30× performance improvements.
              </p>
              <p className="pl-4 border-l-2 border-pink-500/60">
                Driven by a love for <span className="font-medium text-gray-800 dark:text-gray-200">competitive programming</span> — 600+ problems solved, LeetCode rating{' '}
                <span className="font-bold text-emerald-600 dark:text-emerald-400">1750</span>.
              </p>
              <p className="pl-4 border-l-2 border-emerald-500/60">
                Beyond coding I enjoy gaming, traveling, and music. I believe in{' '}
                <span className="font-medium text-gray-800 dark:text-gray-200">continuous learning</span> and always exploring new technologies.
              </p>
            </div>

            {/* Interests */}
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4">When I&apos;m not coding</p>
              <div className="flex gap-4 flex-wrap">
                {interests.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    <span>{item.emoji}</span>
                    {item.label}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Education Timeline ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Education</h3>
            </div>

            <div className="space-y-4">
              {educationData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-gray-200/50 dark:border-gray-700/50 group transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-[15px] leading-snug mb-1">{item.degree}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{item.institution}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-500 mb-3">
                        <span className="flex items-center gap-1"><MapPin size={11} />{item.location}</span>
                        <span className="flex items-center gap-1"><Calendar size={11} />{item.duration}</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                        <Trophy size={11} />{item.grade}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Achievements ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Key Achievements</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.07 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-gray-200/50 dark:border-gray-700/50 flex items-start gap-3 group hover:shadow-lg transition-all duration-300"
              >
                <div className="w-7 h-7 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-[13.5px] text-gray-700 dark:text-gray-300 leading-relaxed">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
