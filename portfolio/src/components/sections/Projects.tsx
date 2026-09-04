'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ArrowUpRight, X, ExternalLink } from 'lucide-react'
import { Container } from '@/components/luxe/Container'
import { SectionHeading } from '@/components/luxe/SectionHeading'
import { Counter } from '@/components/luxe/Counter'

type Project = {
  id: number
  title: string
  excerpt: string
  body: string
  tech: string[]
  category: string
  github: string
  demo: string
  featured?: boolean
  cover: [string, string]
  glyph: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AlgoGuru — Programming Learning Platform',
    excerpt: 'Full-stack competitive programming platform with Java Playground, role-based auth, progress tracking and an AI Guru Bot.',
    body: 'Designed, built and deployed end-to-end — live at algoguru.online with a custom domain. React + TypeScript + Supabase frontend, Java playground, role-based auth, and a Python / LangChain / RAG Guru Bot for contextual guidance. Sole developer across architecture, implementation, deployment and domain config.',
    tech: ['React', 'TypeScript', 'Supabase', 'Python', 'LangChain', 'Tailwind'],
    category: 'Web',
    github: 'https://github.com/Aritradutta2002',
    demo: 'https://www.algoguru.online/',
    featured: true,
    cover: ['#1A1408', '#3A2A10'],
    glyph: 'Ag',
  },
  {
    id: 2,
    title: 'Algorithm Visualizer',
    excerpt: 'Interactive sorting visualizer — Bubble, Merge, Quick, Insertion — with speed control and step execution.',
    body: 'Helps students see how sorting algorithms behave: dynamic bar animations, speed controls, step-by-step execution and side-by-side complexity comparison.',
    tech: ['JavaScript', 'C++'],
    category: 'Web',
    github: 'https://github.com/Aritradutta2002/new_Sorting_Visualizer',
    demo: '#',
    cover: ['#0B1626', '#12395B'],
    glyph: 'Av',
  },
  {
    id: 3,
    title: 'HuffZip — File Compressor',
    excerpt: 'Huffman-coding compressor with live Huffman-tree construction visualization.',
    body: 'C++ backend for efficient compression plus an interactive JS visualization of tree construction, frequency tables and bit savings per file.',
    tech: ['C++', 'JavaScript'],
    category: 'Backend',
    github: 'https://github.com/Aritradutta2002/File_Compressor',
    demo: '#',
    cover: ['#101A14', '#1D4A33'],
    glyph: 'Hz',
  },
  {
    id: 4,
    title: 'ChatGPT Clone',
    excerpt: 'Streamlit interface over GPT-4 with tunable temperature, tokens and presets.',
    body: 'Clean chat UI with session history, parameter sliders and prompt presets — a playground for understanding LLM sampling behaviour.',
    tech: ['Python', 'Streamlit', 'OpenAI'],
    category: 'AI',
    github: 'https://github.com/Aritradutta2002/ChatGPT-clone',
    demo: '#',
    cover: ['#160F24', '#4A2A7A'],
    glyph: 'Gp',
  },
  {
    id: 5,
    title: 'LeetCode Directory',
    excerpt: '537+ commits of organized LeetCode solutions with complexity notes and alternate approaches.',
    body: 'Topic- and difficulty-indexed solutions in Java, Python and C++, each with time/space analysis and multiple approaches where it matters.',
    tech: ['Java 17', 'Python', 'C++'],
    category: 'CP',
    github: 'https://github.com/Aritradutta2002/LeetCode-Directory',
    demo: '#',
    featured: true,
    cover: ['#231006', '#7A3A12'],
    glyph: 'Lc',
  },
  {
    id: 6,
    title: 'Tic-Tac-Toe',
    excerpt: 'Modern Angular + TypeScript take on the classic — score tracking, responsive, animated.',
    body: 'Responsive board, score persistence, win-line animation and a clean component architecture in Angular 20.',
    tech: ['Angular 20', 'TypeScript'],
    category: 'Web',
    github: 'https://github.com/Aritradutta2002/TIC-TAC-TOE-GAME',
    demo: '#',
    cover: ['#101828', '#334155'],
    glyph: 'Tt',
  },
  {
    id: 7,
    title: 'SpringBoot Service',
    excerpt: 'RESTful Spring Boot service — JPA/Hibernate, validation, clean layering.',
    body: 'My first production-style Spring Boot app: REST controllers, JPA entities, DTO validation and PostgreSQL persistence with layered packaging.',
    tech: ['Java 17', 'Spring Boot 3', 'PostgreSQL'],
    category: 'Backend',
    github: 'https://github.com/Aritradutta2002/First-SpringBoot-App',
    demo: '#',
    cover: ['#0A1F1A', '#0F5C46'],
    glyph: 'Sb',
  },
]

const filters = ['All', 'Web', 'Backend', 'AI', 'CP'] as const

function Cover({ p, large }: { p: Project; large?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden ${large ? 'min-h-[280px] lg:min-h-full' : 'aspect-[16/9]'}`}
      style={{ background: `linear-gradient(135deg, ${p.cover[0]}, ${p.cover[1]})` }}
    >
      <div className="cover-grid absolute inset-0" aria-hidden="true" />
      <div className="absolute left-5 top-4 flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold" />
      </div>
      {p.demo !== '#' && (
        <span className="absolute right-5 top-4 flex items-center gap-1.5 rounded-full bg-emeraldx px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-black">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black" /> Live
        </span>
      )}
      <span className="absolute -bottom-6 left-4 select-none font-serifd text-[9rem] italic leading-none text-white/10 md:text-[11rem]" aria-hidden="true">
        {p.glyph}
      </span>
      <span className="absolute bottom-4 right-5 rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
        {p.category}
      </span>
    </div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('All')
  const [open, setOpen] = useState<Project | null>(null)
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="work" aria-labelledby="work-title">
      <Container>
        <div id="work-title">
          <SectionHeading
            index="03"
            eyebrow="Selected Work"
            titleA="Things I've"
            titleItalic="shipped"
            titleB="to production."
            blurb="Seven builds across web, backend, AI and competitive programming — one of them live with real users."
          />
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter projects">
          {filters.map((f) => {
            const active = filter === f
            const n = f === 'All' ? projects.length : projects.filter((p) => p.category === f).length
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={active}
                className={`relative min-h-[44px] rounded-full px-5 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-gold-ink' : 'border border-line/12 text-muted hover:border-gold/50 hover:text-ink'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute inset-0 rounded-full bg-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10 font-bold">{f} <span className="opacity-60">{n}</span></span>
              </button>
            )
          })}
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.25) }}
                className={`luxe-card group cursor-pointer overflow-hidden ${p.featured ? 'md:col-span-2 md:grid md:grid-cols-2' : ''}`}
                onClick={() => setOpen(p)}
                data-cursor="Open"
              >
                <div className="transition-transform duration-700 ease-out group-hover:scale-[1.025]">
                  <Cover p={p} large={p.featured} />
                </div>
                <div className="flex flex-col p-7">
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                    {String(p.id).padStart(2, '0')} — {p.category}
                  </p>
                  <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-gold md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.excerpt}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.slice(0, 4).map((t) => (
                      <span key={t} className="rounded-full border border-line/12 px-3 py-1 font-mono text-[11px] text-ink/70">
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="rounded-full bg-gold-soft px-3 py-1 font-mono text-[11px] font-bold text-gold">
                        +{p.tech.length - 4}
                      </span>
                    )}
                  </div>
                  <div className="mt-6 flex items-center gap-3 border-t border-line/8 pt-5">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`${p.title} source code`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-line/15 text-muted transition-colors hover:border-gold hover:bg-gold hover:text-gold-ink"
                    >
                      <Github size={17} />
                    </a>
                    <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-bold text-ink transition-colors group-hover:text-gold">
                      Case study <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-line/10 bg-line/10 sm:grid-cols-3">
          {[
            { to: 700, suffix: '+', label: 'Problems solved' },
            { to: 1672, suffix: '', label: 'LeetCode rating' },
            { to: 1708, suffix: '', label: 'CodeChef rating' },
          ].map((s) => (
            <div key={s.label} className="bg-surface/80 px-8 py-8 text-center backdrop-blur-xl">
              <div className="font-display text-4xl font-bold tracking-tight text-ink md:text-5xl">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="luxe-card max-h-[92dvh] w-full max-w-3xl overflow-y-auto !rounded-b-none sm:!rounded-b-[20px]"
              onClick={(e) => e.stopPropagation()}
            >
              <Cover p={open} />
              <div className="p-7 md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">{open.category}</p>
                    <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl">{open.title}</h3>
                  </div>
                  <button
                    onClick={() => setOpen(null)}
                    aria-label="Close case study"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line/15 text-muted hover:border-gold hover:text-gold"
                  >
                    <X size={17} />
                  </button>
                </div>
                <div className="mb-5 mt-5 flex flex-wrap gap-2">
                  {open.tech.map((t) => (
                    <span key={t} className="rounded-full border border-line/12 px-3 py-1 font-mono text-[11px] text-ink/75">{t}</span>
                  ))}
                </div>
                <p className="text-[15px] leading-relaxed text-muted">{open.body}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={open.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[52px] items-center gap-2 rounded-full border border-line/15 px-7 font-bold text-ink transition-colors hover:border-gold hover:text-gold">
                    <Github size={17} /> View code
                  </a>
                  {open.demo !== '#' && (
                    <a href={open.demo} target="_blank" rel="noopener noreferrer" className="btn-gold inline-flex min-h-[52px] items-center gap-2 rounded-full px-7 font-bold">
                      <ExternalLink size={17} /> Live demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
