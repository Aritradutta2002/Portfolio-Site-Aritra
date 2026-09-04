'use client'
import { motion } from 'framer-motion'
import { Heart, Github, Linkedin, Code2, Mail, MapPin, Phone, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { Container } from '@/components/luxe/Container'
import { BackToTop } from '@/components/luxe/BackToTop'

const index = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Work', href: '#work' },
  { name: 'Experience', href: '#experience' },
  { name: 'Writing', href: '#writing' },
  { name: 'Contact', href: '#contact' },
]

const pages = [
  { name: 'Blog', href: '/blog' },
  { name: 'Social', href: '/social' },
  { name: 'Resume', href: '/resume' },
]

const socials = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/Aritradutta2002' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/aritra-dutta-rick20/' },
  { name: 'LeetCode', icon: Code2, url: 'https://leetcode.com/u/ari2002/' },
  { name: 'Email', icon: Mail, url: 'mailto:aritradutta049@gmail.com' },
]

export function Footer() {
  const [copied, setCopied] = useState(false)
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  const copy = async () => {
    try {
      await navigator.clipboard.writeText('aritradutta049@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch { /* noop */ }
  }

  return (
    <footer className="relative overflow-hidden border-t border-line/10" aria-label="Footer">
      <Container className="pb-8 pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <p className="monument select-none font-display text-[18vw] font-bold leading-[0.85] tracking-[-0.05em] md:text-[10rem]" aria-hidden="true">
            ARITRA
          </p>
          <div className="-mt-3 flex flex-wrap items-end justify-between gap-6 md:-mt-6">
            <p className="max-w-xl text-[15px] leading-relaxed text-muted">
              <span className="font-serifd text-xl italic text-gold">dutta — </span>
              <span className="font-semibold text-ink">full-stack engineer</span> at TCS.
              Java backends, cloud migrations, and GenAI — built to last.
            </p>
            <span className="inline-flex items-center gap-2 rounded-full border border-line/12 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-emeraldx" />
              Available Q3 2026
            </span>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-10 border-t border-line/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Footer index">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Index</p>
            <ul className="space-y-2.5">
              {index.map((l) => (
                <li key={l.name}>
                  <button onClick={() => go(l.href)} className="luxe-underline font-mono text-[13px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-gold">
                    {l.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Footer pages">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Pages</p>
            <ul className="space-y-2.5">
              {pages.map((l) => (
                <li key={l.name}>
                  <a href={l.href} className="luxe-underline font-mono text-[13px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-gold">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={copy} className="group flex items-center gap-2.5 text-ink/80 transition-colors hover:text-gold" aria-label="Copy email">
                  <Mail size={15} className="text-muted" />
                  <span className="truncate">aritradutta049@gmail.com</span>
                  {copied ? <Check size={14} className="text-emeraldx" /> : <Copy size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />}
                </button>
              </li>
              <li>
                <a href="tel:+916295699190" className="flex items-center gap-2.5 text-ink/80 transition-colors hover:text-gold">
                  <Phone size={15} className="text-muted" /> +91 62956 99190
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-ink/80">
                <MapPin size={15} className="text-muted" /> Bhubaneswar, India
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Elsewhere</p>
            <div className="flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel={s.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={s.name}
                  title={s.name}
                  className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-line/15 text-muted transition-colors hover:border-gold hover:text-gold-ink"
                >
                  <span className="absolute inset-0 scale-0 rounded-full bg-gold transition-transform duration-300 group-hover:scale-100" aria-hidden="true" />
                  <s.icon size={17} className="relative z-10" />
                </a>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {['LC 1672', 'CC 3-Star', 'CF 1046'].map((b) => (
                <span key={b} className="rounded-full border border-gold/35 px-3 py-1.5 font-mono text-[11px] font-bold text-gold">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 border-t border-line/10 pt-7 md:flex-row md:items-center">
          <p className="flex items-center gap-1.5 text-sm text-muted">
            © {new Date().getFullYear()} Aritra Dutta · Made with
            <Heart size={14} className="fill-gold text-gold" aria-label="love" /> and lots of ☕
          </p>
          <div className="flex items-center gap-2.5">
            {['Next.js', 'TypeScript', 'Tailwind'].map((t) => (
              <span key={t} className="rounded-full border border-line/10 px-3.5 py-1.5 font-mono text-[11px] text-muted">
                {t}
              </span>
            ))}
            <BackToTop />
          </div>
        </div>
      </Container>
    </footer>
  )
}
