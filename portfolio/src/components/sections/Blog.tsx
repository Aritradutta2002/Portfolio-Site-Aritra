'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Calendar, Clock } from 'lucide-react'
import { Container } from '@/components/luxe/Container'
import { SectionHeading } from '@/components/luxe/SectionHeading'

type Post = { id: number; title: string; excerpt: string; date: string; read: string; tags: string[]; cat: string }

const posts: Post[] = [
  {
    id: 1,
    title: 'Mastering DSA: a competitive programmer\u2019s journey to 1672',
    excerpt: '700+ problems across LeetCode, Codeforces and CodeChef — the routines, resources and mindset shifts that actually moved my rating.',
    date: 'Dec 15, 2024', read: '8 min', tags: ['CP', 'DSA', 'LeetCode'], cat: 'Programming',
  },
  {
    id: 2,
    title: 'Building scalable REST APIs with Spring Boot & Hibernate',
    excerpt: 'Enterprise-grade patterns: resource naming, pagination, caching, security and the 30× optimization playbook I use in production.',
    date: 'Dec 10, 2024', read: '12 min', tags: ['Spring Boot', 'Java', 'Backend'], cat: 'Backend',
  },
  {
    id: 3,
    title: 'From visualizer to production: lessons in clean UX',
    excerpt: 'What an algorithm visualizer taught me about performance budgets, readable code and designing for first-time users.',
    date: 'Dec 5, 2024', read: '6 min', tags: ['JavaScript', 'UX'], cat: 'Web',
  },
]

export function Blog() {
  return (
    <section id="writing" aria-labelledby="writing-title">
      <Container>
        <div id="writing-title">
          <SectionHeading
            index="05"
            eyebrow="Writing"
            titleA="Notes from the"
            titleItalic="workbench."
            blurb="Field notes on DSA, backend engineering and shipping — short enough to read over coffee."
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {posts.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.08, 0.24) }}
              viewport={{ once: true, margin: '-64px' }}
              className="luxe-card luxe-lift group flex cursor-pointer flex-col overflow-hidden"
              data-cursor="Read"
            >
              <Link href="/blog" className="flex h-full flex-col" aria-label={`Read: ${p.title}`}>
                <div className="flex items-center justify-between border-b border-line/8 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                  <span className="inline-flex items-center gap-1.5"><Calendar size={12} /> {p.date}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock size={12} /> {p.read}</span>
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-gold">{p.cat}</p>
                  <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-gold">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-muted">{p.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line/12 px-3 py-1 font-mono text-[11px] text-ink/70">{t}</span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 border-t border-line/8 pt-5 text-sm font-bold text-ink transition-colors group-hover:text-gold">
                    Read article
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-64px' }}
          className="luxe-card relative mt-6 overflow-hidden p-10 md:p-14"
        >
          <div className="relative z-10 max-w-xl">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-gold">The archive</p>
            <h3 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Longer essays, <span className="serif-accent">deeper dives.</span>
            </h3>
            <p className="mt-3 text-[15px] text-muted">Search, filter and read the full collection — six essays and counting.</p>
            <Link href="/blog" className="btn-gold btn-press mt-7 inline-flex min-h-[52px] items-center gap-2 rounded-full px-7 font-bold">
              View all posts <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
          <span className="pointer-events-none absolute -bottom-10 -right-2 select-none font-serifd text-[11rem] italic leading-none text-ink/[0.05] md:text-[15rem]" aria-hidden="true">
            Aa
          </span>
        </motion.div>
      </Container>
    </section>
  )
}
