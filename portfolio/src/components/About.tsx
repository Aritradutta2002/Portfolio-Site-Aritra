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
  'TCS DEEP Ninja Certified DevOps Engineer — Recognized for expertise in DevOps tooling and practices',
  'Competitive Programming: 554+ problems solved across platforms',
  'LeetCode Rating 1672',
  'Codeforces 1046 (Div 2)',
  'CodeChef 1708 (3-Star)',
  'Solved over 100 problems in CSES Problem Set',
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
            className="glass-galaxy rounded-3xl p-8 lg:p-10 relative overflow-hidden group"
          >
            {/* Ambient glow inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 group-hover:bg-primary/20 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -z-10 group-hover:bg-secondary/20 transition-colors duration-500" />

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary p-[1px] shadow-neon-purple group-hover:shadow-neon-cyan transition-shadow duration-500">
                <div className="w-full h-full bg-surface/90 rounded-[15px] flex items-center justify-center backdrop-blur-xl">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Who I Am</h3>
            </div>

            <div className="space-y-6 text-[15px] md:text-base text-gray-300 leading-relaxed font-medium">
              <p className="pl-5 border-l-2 border-primary/40 group-hover:border-primary transition-colors duration-300">
                Hello! I&apos;m <span className="font-bold text-white">Aritra Dutta</span>, a results-driven Backend Engineer with 1.5+ years at{' '}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Tata Consultancy Services (TCS)</span> in Bhubaneswar, India.
              </p>
              <p className="pl-5 border-l-2 border-secondary/40 group-hover:border-secondary transition-colors duration-300">
                Currently building enterprise microservices serving 10K+ daily users with{' '}
                <span className="font-bold text-white glow">Java 17, Spring Boot 3, PostgreSQL, and Azure PaaS</span>. Delivered up to 30x API performance gains and led cloud migrations.
              </p>
              <p className="pl-5 border-l-2 border-pink-500/40 group-hover:border-pink-500 transition-colors duration-300">
                Driven by a love for <span className="font-bold text-white">competitive programming</span> — 554+ problems solved, LeetCode rating{' '}
                <span className="font-extrabold text-transparent bg-clip-text animate-text-shimmer">1672</span>.
              </p>
              <p className="pl-5 border-l-2 border-emerald-500/40 group-hover:border-emerald-500 transition-colors duration-300">
                Beyond coding I enjoy gaming, traveling, and music. I believe in{' '}
                <span className="font-bold text-white">continuous learning</span> and always exploring new technologies.
              </p>
            </div>

            {/* Interests */}
            <div className="mt-10 pt-8 border-t border-white/5">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">When I&apos;m not coding</p>
              <div className="flex gap-3 flex-wrap">
                {interests.map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-gray-300 hover:bg-white/10 hover:text-white transition-colors cursor-default backdrop-blur-md"
                  >
                    <span className="text-base">{item.emoji}</span>
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
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-[1px] shadow-neon-cyan transition-shadow duration-500">
                <div className="w-full h-full bg-surface/90 rounded-[15px] flex items-center justify-center backdrop-blur-xl">
                  <GraduationCap className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">Education</h3>
            </div>

            <div className="space-y-4">
              {educationData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-galaxy rounded-2xl p-6 group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-[40px] -z-10 group-hover:bg-secondary/15 transition-colors duration-500" />
                  
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300 shadow-lg">
                      <item.icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-white text-[16px] leading-snug mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">{item.degree}</h4>
                      <p className="text-[14px] text-gray-400 mb-3 font-medium">{item.institution}</p>
                      <div className="flex flex-wrap gap-4 text-[12px] text-gray-500 mb-4 font-medium">
                        <span className="flex items-center gap-1.5"><MapPin size={13} className="text-primary/70" />{item.location}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={13} className="text-secondary/70" />{item.duration}</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[12px] font-bold group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors">
                        <Trophy size={13} />{item.grade}
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
