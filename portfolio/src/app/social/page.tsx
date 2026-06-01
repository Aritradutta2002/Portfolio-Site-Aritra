'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Code2, Target, Zap, ExternalLink, Trophy, Twitter, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const socialPlatforms = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/Aritradutta2002',
    username: '@Aritradutta2002',
    description: 'Open source projects, portfolio codebases, and algorithm solutions.',
    stats: '710+ contributions',
    gradient: 'from-gray-600 to-gray-800',
    glow: 'rgba(156,163,175,0.15)',
    border: 'rgba(156,163,175,0.2)',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/aritra-dutta-rick20/',
    username: 'Aritra Dutta',
    description: 'Professional network — career milestones, posts, and tech discussions.',
    stats: 'Software Engineer @ TCS',
    gradient: 'from-blue-600 to-blue-800',
    glow: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.25)',
  },
  {
    name: 'Twitter (X)',
    icon: Twitter,
    url: 'https://x.com/Aritra1Sept',
    username: '@Aritra1Sept',
    description: 'Real-time tech updates, programming thoughts, and daily insights.',
    stats: 'Follow for tech content',
    gradient: 'from-sky-500 to-sky-700',
    glow: 'rgba(14,165,233,0.15)',
    border: 'rgba(14,165,233,0.25)',
  },
  {
    name: 'LeetCode',
    icon: Code2,
    url: 'https://leetcode.com/u/ari2002/',
    username: '@ari2002',
    description: 'Competitive programming solutions, weekly contests, and problem sets.',
    stats: '1672 Rating · 500+ Solved',
    gradient: 'from-orange-500 to-orange-700',
    glow: 'rgba(249,115,22,0.15)',
    border: 'rgba(249,115,22,0.25)',
  },
  {
    name: 'CSES',
    icon: Target,
    url: 'https://cses.fi/user/261539',
    username: 'User 261539',
    description: 'Competitive programming problem set — 100+ problems solved.',
    stats: 'Algorithm challenges',
    gradient: 'from-emerald-600 to-emerald-800',
    glow: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.25)',
  },
  {
    name: 'Codeforces',
    icon: Zap,
    url: 'https://codeforces.com/profile/aritradutta2001',
    username: 'aritradutta2001',
    description: 'Competitive programming contests, Div 2 participation and ratings.',
    stats: 'Rating 1046 · Div 2',
    gradient: 'from-violet-600 to-violet-800',
    glow: 'rgba(139,92,246,0.15)',
    border: 'rgba(139,92,246,0.25)',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
}

export default function SocialPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -30])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6])

  return (
    <div ref={containerRef} className="min-h-screen relative"
      style={{ background: 'linear-gradient(135deg, #040408 0%, #0a0514 50%, #04080f 100%)' }}>

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div className="absolute top-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08), transparent 70%)', filter: 'blur(100px)' }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.07), transparent 70%)', filter: 'blur(90px)' }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.05), transparent 70%)', filter: 'blur(70px)' }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} />
        {/* Star dots */}
        {[...Array(30)].map((_, i) => (
          <motion.div key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
            animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.5, 1] }}
            transition={{ duration: 2 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3 }} />
        ))}
      </div>

      {/* Sticky nav */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5"
        style={{ background: 'rgba(4,4,8,0.85)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/#social"
            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors group text-sm font-medium">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>
          <span className="text-sm text-gray-500">Connect with Aritra</span>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Hero heading */}
        <motion.div style={{ y: headerY, opacity: headerOpacity }} className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-6">
            ✦ Find me across the internet
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            Connect{' '}
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              With Me
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto">
            Follow my journey across different platforms — from competitive programming contests to professional updates.
          </motion.p>
        </motion.div>

        {/* Platform grid */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {socialPlatforms.map((platform) => (
            <motion.div key={platform.name} variants={cardVariants}>
              <motion.a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden rounded-3xl border p-8 group transition-all duration-500 glass-galaxy hover:-translate-y-2"
                style={{ borderColor: platform.border }}
                whileTap={{ scale: 0.98 }}>
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${platform.glow}, transparent 60%)` }} />

                {/* Top stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${platform.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br ${platform.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-neon-cyan transition-all duration-500`}>
                    <platform.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Info */}
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all">
                      {platform.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </div>

                  <p className="text-sm font-bold text-primary mb-4 glow">{platform.username}</p>
                  <p className="text-[14.5px] text-gray-300 leading-relaxed mb-6 font-medium">{platform.description}</p>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold bg-gradient-to-r ${platform.gradient} text-white shadow-md`}>
                    {platform.stats}
                  </div>
                </div>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-violet-500/20 p-10 text-center"
          style={{ background: 'rgba(139,92,246,0.06)' }}>
          {/* Inner glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.12), transparent 60%)' }} />
          <div className="relative z-10">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block text-5xl mb-5">
              <Trophy className="w-14 h-14 text-amber-400 mx-auto" />
            </motion.div>
            <h3 className="text-3xl font-extrabold text-white mb-4">Let&apos;s Collaborate!</h3>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Interested in working together, discussing tech, or just want to say hi? Feel free to reach out on any of these platforms or send a direct message.
            </p>
            <Link href="/#contact">
              <motion.span
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg shadow-violet-600/30 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>
                Get In Touch
                <ExternalLink className="w-4 h-4" />
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
