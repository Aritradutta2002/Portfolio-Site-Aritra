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

/* Back-to-top button wrapped in a scroll-progress ring — the acid
   arc fills as you read down the page (framer pathLength motion
   value, no listeners, no reflows). */
function TopProgressButton({ onTop }: { onTop: () => void }) {
  const { scrollYProgress } = useScroll()
  return (
    <button
      onClick={onTop}
      className="relative ml-1 w-11 h-11 rounded-full bg-acid text-[#101204] flex items-center justify-center hover:shadow-acid-glow transition-shadow duration-300 flex-shrink-0"
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 44 44" className="absolute -inset-[3px] w-[50px] h-[50px] -rotate-90 pointer-events-none" aria-hidden="true">
        <circle cx="22" cy="22" r="20" fill="none" stroke="rgba(128,128,128,0.3)" strokeWidth="2" />
        <motion.circle
          cx="22"
          cy="22"
          r="20"
          fill="none"
          stroke="#BEF264"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
        />
      </svg>
      <ArrowUp size={17} />
    </button>
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
    <footer className="relative border-t border-line/10 text-ink overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 md:pt-20 pb-8">

        {/* ── Wordmark ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="font-bold tracking-[-0.035em] leading-none text-[17vw] md:text-[9rem] select-none">
            Aritra<span className="text-acidstrong">.</span>
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
        <div className="grid md:grid-cols-12 gap-10 mt-14 pt-10 border-t border-line/10">
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
                    className="font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-acidstrong transition-colors duration-200"
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
              <a href="mailto:aritradutta049@gmail.com" className="flex items-center gap-3 text-ink/80 hover:text-acidstrong transition-colors duration-200">
                <Mail size={15} className="text-muted" />
                aritradutta049@gmail.com
              </a>
              <a href="tel:+916295699190" className="flex items-center gap-3 text-ink/80 hover:text-acidstrong transition-colors duration-200">
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
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  aria-label={social.name}
                  className="w-11 h-11 rounded-full flex items-center justify-center border border-line/12 text-muted hover:text-[#101204] hover:bg-acid hover:border-acid transition-colors duration-300"
                >
                  <social.icon size={17} />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <span key={b.value} className="px-3.5 py-1.5 rounded-full border border-acid/30 font-mono text-[11px] text-acidstrong">
                  {b.value}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────── */}
        <div className="mt-14 pt-7 border-t border-line/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <p className="flex items-center gap-1.5 text-sm text-muted">
            © 2024 Aritra Dutta. Made with
            <Heart size={14} className="text-acidstrong fill-current" />
            and lots of ☕
          </p>

          <div className="flex items-center gap-2.5">
            {['Next.js', 'TypeScript', 'Tailwind CSS'].map((t) => (
              <span key={t} className="px-3.5 py-1.5 rounded-full border border-line/10 font-mono text-[11px] text-muted">
                {t}
              </span>
            ))}
            <TopProgressButton onTop={scrollToTop} />
          </div>
        </div>

      </div>
    </footer>
  )
}
