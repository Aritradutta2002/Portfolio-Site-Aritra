'use client'

import { motion, useScroll } from 'framer-motion'
import { Heart, ArrowUp, Github, Linkedin, Code2, Mail, MapPin, Phone } from 'lucide-react'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/Aritradutta2002'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/aritra-dutta-rick20/'
  },
  {
    name: 'LeetCode',
    icon: Code2,
    url: 'https://leetcode.com/u/ari2002/'
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:aritradutta049@gmail.com'
  }
]

const badges = [
  { value: 'LeetCode: 1672' },
  { value: 'CodeChef: 3-Star' },
  { value: 'CodeForces Rank: 1046' },
]

/* Back-to-top button wrapped in a scroll-progress ring — the aurora
   arc fills as you read down the page (framer pathLength motion
   value, no listeners, no reflows). */
function TopProgressButton({ onTop }: { onTop: () => void }) {
  const { scrollYProgress } = useScroll()
  return (
    <motion.button
      onClick={onTop}
      className="group/top relative ml-1 w-11 h-11 rounded-full bg-aurora text-[#0B0616] flex items-center justify-center hover:shadow-aurora-glow transition-shadow duration-300 flex-shrink-0 overflow-hidden btn-press"
      aria-label="Scroll to top"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <svg viewBox="0 0 44 44" className="absolute -inset-[3px] w-[50px] h-[50px] -rotate-90 pointer-events-none" aria-hidden="true">
        <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(128,128,128,0.3)" strokeWidth="2" />
        <motion.circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <motion.span
        className="relative z-10 inline-flex"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowUp size={17} />
      </motion.span>
    </motion.button>
  )
}

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative border-t border-aurora/10 text-ink overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 md:pt-20 pb-8">

        {/* ── Wordmark — gradient ink ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="font-display font-bold tracking-[-0.035em] leading-none text-[17vw] md:text-[9rem] select-none text-gradient">
            Aritra<span className="text-ink">.</span>
          </p>
          <p className="text-[15px] text-muted leading-relaxed max-w-xl mt-6">
            <span className="font-semibold text-ink">Passionate Software Engineer</span> at{' '}
            TCS, specializing in{' '}
            <span className="font-semibold text-ink">Java Full Stack</span> development,
            competitive programming, and building innovative solutions. Always eager to learn
            and contribute to exciting projects.
          </p>
        </motion.div>

        {/* ── Columns ──────────────────────────────────────── */}
        <div className="grid md:grid-cols-12 gap-10 mt-14 pt-10 border-t border-aurora/10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-4"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-5">Index</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-aurorastrong transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            viewport={{ once: true }}
            className="md:col-span-4"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-5">Contact</p>
            <div className="space-y-3.5 text-sm">
              <a href="mailto:aritradutta049@gmail.com" className="flex items-center gap-3 text-ink/80 hover:text-aurorastrong transition-colors duration-200">
                <Mail size={15} className="text-muted" />
                aritradutta049@gmail.com
              </a>
              <a href="tel:+916295699190" className="flex items-center gap-3 text-ink/80 hover:text-aurorastrong transition-colors duration-200">
                <Phone size={15} className="text-muted" />
                    +91 62956 99190
              </a>
              <p className="flex items-center gap-3 text-ink/80">
                <MapPin size={15} className="text-muted" />
                    Bhubaneswar, India
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            viewport={{ once: true }}
            className="md:col-span-4"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-5">Elsewhere</p>
            <div className="flex flex-wrap gap-2.5 mb-7">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  aria-label={social.name}
                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3 }}
                  className="group relative w-11 h-11 rounded-full flex items-center justify-center border border-aurora/25 text-muted hover:text-[#0B0616] transition-colors duration-300 overflow-hidden"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-aurora scale-0 group-hover:scale-100 transition-transform duration-300 ease-out rounded-full"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_22px_rgba(139,92,246,0.55)]"
                  />
                  <social.icon size={17} className="relative z-10 transition-transform duration-300 group-hover:rotate-[8deg]" />
                </motion.a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map((b, i) => (
                <motion.span
                  key={b.value}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                  className="px-3.5 py-1.5 rounded-full border border-aurora/30 font-mono text-[11px] text-aurorastrong hover:border-aurora hover:shadow-[0_0_14px_rgba(139,92,246,0.35)] transition-all duration-300 cursor-default"
                >
                  {b.value}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────── */}
        <div className="mt-14 pt-7 border-t border-aurora/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <p className="flex items-center gap-1.5 text-sm text-muted">
            © 2024 Aritra Dutta. Made with
            <Heart size={14} className="text-aurorastrong fill-current" />
            and lots of ☕
          </p>

          <div className="flex items-center gap-2.5">
            {['Next.js', 'TypeScript', 'Tailwind CSS'].map((t) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05 }}
                className="px-3.5 py-1.5 rounded-full border border-aurora/10 font-mono text-[11px] text-muted hover:border-aurora/30 hover:text-aurorastrong transition-colors duration-300 cursor-default"
              >
                {t}
              </motion.span>
            ))}
            <TopProgressButton onTop={scrollToTop} />
          </div>
        </div>

      </div>
    </footer>
  )
}
