'use client'

import { motion } from 'framer-motion'
import { Heart, ArrowUp, Github, Linkedin, Code2, Mail, MapPin, Phone, Rocket, Star } from 'lucide-react'
import { useState } from 'react'
import { scrollTo } from '@/lib/lenis'
import { Chip } from '@/components/ui/Chip'
import { WaveDivider } from '@/components/ui/SectionDivider'
import { EASE } from '@/lib/motion'

const quickLinks = [
  { name: 'Home',       href: '#home' },
  { name: 'About',      href: '#about' },
  { name: 'Skills',     href: '#skills' },
  { name: 'Projects',   href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact',    href: '#contact' },
]

const socialLinks = [
  { name: 'GitHub',   icon: Github,  url: 'https://github.com/Aritradutta2002' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/aritra-dutta-rick20/' },
  { name: 'LeetCode', icon: Code2,    url: 'https://leetcode.com/u/ari2002/' },
  { name: 'Email',    icon: Mail,     url: 'mailto:aritradutta049@gmail.com' },
]

export function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) scrollTo(href.slice(1))
  }

  return (
    <footer className="relative">
      <WaveDivider />

      <div className="relative border-t border-line-soft overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div
            className="absolute -top-32 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE.outExpo }}
              viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-3xl font-extrabold tracking-tight">
                  <span className="gradient-text-static text-glow-sm">Aritra</span>
                  <span className="text-fg-0 ml-2">Dutta</span>
                </h3>
                <Chip tone="primary" size="sm" icon={<span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-glow" />}>
                  Available
                </Chip>
              </div>
              <div className="flex items-center gap-2 mb-5">
                <div className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
                <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
              </div>

              <p className="text-[14px] text-fg-3 mb-7 leading-relaxed max-w-sm">
                <span className="font-semibold text-fg-1">Passionate Software Engineer</span> at{' '}
                <span className="text-primary font-semibold">TCS</span>, specializing in{' '}
                <span className="text-secondary font-semibold">Java Full Stack</span> development,
                competitive programming, and building innovative solutions.
              </p>

              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target={social.url.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    title={social.name}
                    onHoverStart={() => setHoveredSocial(social.name)}
                    onHoverEnd={() => setHoveredSocial(null)}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    data-cursor="hover"
                    className="relative w-10 h-10 flex items-center justify-center rounded-md glass text-fg-3 hover:text-primary hover:border-primary/40 hover:shadow-neon-primary transition-all duration-300"
                  >
                    <social.icon className="w-4 h-4" />
                    {hoveredSocial === social.name && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-bg-2 border border-line rounded-md text-[10.5px] font-semibold whitespace-nowrap text-fg-1 shadow-glass-sm"
                      >
                        {social.name}
                      </motion.span>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE.outExpo, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-secondary" />
                <h4 className="text-base font-bold text-fg-0 tracking-tight">Quick links</h4>
              </div>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="group flex items-center text-fg-3 hover:text-fg-0 transition-all duration-300"
                      data-cursor="hover"
                    >
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mr-3 group-hover:scale-150 transition-transform duration-300" />
                      <span className="font-semibold text-sm">{link.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE.outExpo, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-emerald to-sky" />
                <h4 className="text-base font-bold text-fg-0 tracking-tight">Get in touch</h4>
              </div>
              <div className="space-y-2.5">
                <a
                  href="mailto:aritradutta049@gmail.com"
                  data-cursor="hover"
                  className="group flex items-center gap-3 p-2.5 rounded-md hover:bg-bg-2/60 border border-transparent hover:border-line-soft transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-neon-primary">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-fg-4 font-bold uppercase tracking-wider">Email</p>
                    <p className="text-fg-1 group-hover:text-fg-0 text-[13px] font-semibold mt-0.5 truncate">
                      aritradutta049@gmail.com
                    </p>
                  </div>
                </a>
                <a
                  href="tel:+916295699190"
                  data-cursor="hover"
                  className="group flex items-center gap-3 p-2.5 rounded-md hover:bg-bg-2/60 border border-transparent hover:border-line-soft transition-all duration-300"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald to-sky rounded-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-neon-emerald">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-fg-4 font-bold uppercase tracking-wider">Phone</p>
                    <p className="text-fg-1 group-hover:text-fg-0 text-[13px] font-semibold mt-0.5">+91 629569XXXX</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 p-2.5">
                  <div className="w-9 h-9 bg-gradient-to-br from-amber to-rose rounded-md flex items-center justify-center flex-shrink-0 shadow-neon-amber">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-fg-4 font-bold uppercase tracking-wider">Location</p>
                    <p className="text-fg-1 text-[13px] font-semibold mt-0.5">Bhubaneswar, Odisha, India</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE.outExpo }}
            viewport={{ once: true }}
            className="mt-12 pt-6 border-t border-line-soft"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-5">
              <div className="flex items-center gap-2 text-fg-3 text-sm">
                <span>© 2024 Aritra Dutta. Made with</span>
                <motion.span
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Heart className="w-4 h-4 text-rose fill-current" />
                </motion.span>
                <span>and lots of</span>
                <motion.span
                  animate={{ rotate: [0, 12, -12, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-base"
                >
                  ☕
                </motion.span>
              </div>

              <div className="flex items-center gap-2">
                {[
                  { icon: Rocket, label: 'Next.js' },
                  { icon: Code2, label: 'TypeScript' },
                  { icon: Star, label: 'Tailwind CSS' },
                ].map((t) => (
                  <div key={t.label} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 glass rounded-full text-[11px] font-semibold text-fg-2">
                    <t.icon className="w-3.5 h-3.5 text-primary" />
                    {t.label}
                  </div>
                ))}
                <button
                  onClick={() => scrollTo(0)}
                  aria-label="Scroll to top"
                  data-cursor="hover"
                  className="ml-2 w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-neon-primary hover:scale-110 active:scale-95 transition-transform duration-300"
                >
                  <ArrowUp className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Achievement badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: EASE.outExpo }}
            viewport={{ once: true }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {[
              { emoji: '🏆', label: 'LeetCode: 1672',    tone: 'amber'   as const, glow: 'amber'   as const },
              { emoji: '⭐', label: 'CodeChef: 3-Star',   tone: 'primary' as const, glow: 'primary' as const },
              { emoji: '🎯', label: 'CodeForces: 1046',   tone: 'emerald' as const, glow: 'emerald' as const },
            ].map((b) => (
              <motion.div
                key={b.label}
                whileHover={{ scale: 1.05, y: -2 }}
                data-cursor="hover"
                className={[
                  'px-5 py-2.5 glass rounded-full inline-flex items-center gap-2.5 cursor-default',
                  b.tone === 'amber'   ? 'hover:shadow-neon-amber'   :
                  b.tone === 'primary' ? 'hover:shadow-neon-primary' :
                                         'hover:shadow-neon-emerald',
                ].join(' ')}
              >
                <span className="text-base">{b.emoji}</span>
                <span className={[
                  'text-[12.5px] font-bold',
                  b.tone === 'amber'   ? 'text-amber'   :
                  b.tone === 'primary' ? 'text-primary' :
                                         'text-emerald',
                ].join(' ')}>{b.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
