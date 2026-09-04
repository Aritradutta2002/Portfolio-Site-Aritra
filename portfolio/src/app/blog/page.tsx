'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Search, Tag, Heart, Eye, BookOpen, Star, X } from 'lucide-react'
import Link from 'next/link'
import { LuxeBackdrop } from '@/components/luxe/Backdrop'
import { Cursor } from '@/components/luxe/Cursor'

type BlogPost = {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  viewCount: number
  likeCount: number
  readTime: number
  tags: string[]
  category: string
  isFeatured: boolean
  createdAt: string
}

const allPosts: BlogPost[] = [
  {
    id: 1,
    title: "Mastering Data Structures and Algorithms: A Competitive Programmer's Journey",
    excerpt: 'My experience solving 700+ problems across LeetCode, CodeForces, and CodeChef. Key insights and strategies that helped me achieve a 1672 rating.',
    content: "Competitive programming has been an incredible journey. Starting from basic array problems to tackling complex graph algorithms, I've learned that consistency beats intensity every time.\n\nIn this post, I share my roadmap: how I structured my practice, the resources that helped me most, and the mindset shifts that turned me from a beginner into a confident problem solver.",
    author: 'Aritra Dutta', viewCount: 1240, likeCount: 87, readTime: 8,
    tags: ['Competitive Programming', 'DSA', 'LeetCode'], category: 'PROGRAMMING', isFeatured: true,
    createdAt: '2024-12-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'Building Scalable REST APIs with Spring Boot and Hibernate',
    excerpt: 'A comprehensive guide to creating enterprise-grade REST APIs using Spring Boot, covering best practices, security, and performance optimization.',
    content: "Spring Boot has revolutionized how we build Java applications. In this guide, I walk through designing RESTful APIs that scale — from proper resource naming and HTTP status codes to pagination, caching, and rate limiting.",
    author: 'Aritra Dutta', viewCount: 980, likeCount: 64, readTime: 12,
    tags: ['Spring Boot', 'Java', 'REST API', 'Backend'], category: 'BACKEND_DEVELOPMENT', isFeatured: true,
    createdAt: '2024-12-10T10:00:00Z',
  },
  {
    id: 3,
    title: 'From Algorithm Visualization to Production: My Development Journey',
    excerpt: 'How I built an interactive algorithm visualizer and the lessons learned about clean code, user experience, and performance optimization.',
    content: "Turning a side project into a polished product taught me more than any tutorial. In this post, I share the story of building an algorithm visualizer.",
    author: 'Aritra Dutta', viewCount: 756, likeCount: 45, readTime: 6,
    tags: ['JavaScript', 'Algorithms', 'Web Development'], category: 'WEB_DEVELOPMENT', isFeatured: false,
    createdAt: '2024-12-05T10:00:00Z',
  },
  {
    id: 4,
    title: 'Effective Problem-Solving Strategies for Technical Interviews',
    excerpt: 'Proven techniques and mental frameworks that helped me excel in technical interviews and competitive programming contests.',
    content: "Technical interviews are as much about communication as they are about coding. I break down the UMPIRE method for approaching unfamiliar problems.",
    author: 'Aritra Dutta', viewCount: 1120, likeCount: 72, readTime: 10,
    tags: ['Interview Prep', 'Problem Solving', 'Career'], category: 'CAREER', isFeatured: false,
    createdAt: '2024-11-28T10:00:00Z',
  },
  {
    id: 5,
    title: 'Understanding React Server Components in Next.js 15',
    excerpt: 'A deep dive into React Server Components, how they differ from client components, and when to use each for optimal performance.',
    content: "Next.js 15 brings React Server Components to the forefront. I explain the mental model behind server components and practical patterns for building fast apps.",
    author: 'Aritra Dutta', viewCount: 640, likeCount: 38, readTime: 7,
    tags: ['React', 'Next.js', 'Frontend'], category: 'WEB_DEVELOPMENT', isFeatured: false,
    createdAt: '2024-11-20T10:00:00Z',
  },
  {
    id: 6,
    title: 'My Competitive Programming Toolkit: Extensions, Templates, and Tips',
    excerpt: 'The exact setup I use for competitive programming contests — from VS Code extensions to C++ templates and debugging tricks.',
    content: "Having the right toolkit can save minutes in a timed contest. I share my complete VS Code setup for competitive programming.",
    author: 'Aritra Dutta', viewCount: 890, likeCount: 55, readTime: 5,
    tags: ['Competitive Programming', 'C++', 'Tools'], category: 'COMPETITIVE_PROGRAMMING', isFeatured: false,
    createdAt: '2024-11-15T10:00:00Z',
  },
]

const categories = ['All', 'PROGRAMMING', 'BACKEND_DEVELOPMENT', 'WEB_DEVELOPMENT', 'CAREER', 'COMPETITIVE_PROGRAMMING']
const fmtCat = (c: string) => c === 'All' ? 'All' : c.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())
const fmtDate = (d: string) => { try { return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) } catch { return 'Unknown' } }

export default function BlogPage() {
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const [page, setPage] = useState(0)
  const [open, setOpen] = useState<BlogPost | null>(null)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const pageSize = 6

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => setPage(0), [cat, q])

  const filtered = useMemo(() => {
    let r = allPosts
    if (cat !== 'All') r = r.filter((p) => p.category === cat)
    if (q.trim()) {
      const s = q.toLowerCase()
      r = r.filter((p) => p.title.toLowerCase().includes(s) || p.excerpt.toLowerCase().includes(s) || p.tags.some((t) => t.toLowerCase().includes(s)))
    }
    return r
  }, [cat, q])

  const totalPages = Math.ceil(filtered.length / pageSize) || 1
  const visible = filtered.slice(page * pageSize, (page + 1) * pageSize)
  const featured = allPosts.filter((p) => p.isFeatured)
  const toggleLike = (id: number) => setLiked((prev) => {
    const n = new Set(prev)
    if (n.has(id)) n.delete(id); else n.add(id)
    return n
  })
  const likes = (p: BlogPost) => p.likeCount + (liked.has(p.id) ? 1 : 0)

  return (
    <div className="relative min-h-screen bg-background text-ink">
      <LuxeBackdrop />
      <Cursor />

      <div className="sticky top-0 z-50 border-b border-line/10 bg-background/80 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/#writing" className="group flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-gold">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to portfolio
          </Link>
          <span className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
            <BookOpen size={18} className="text-gold" />
            Aritra&apos;s Blog<span className="text-gold">.</span>
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 md:py-16">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line/12 bg-surface/70 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <Star size={13} className="text-gold" /> Thoughts & insights
          </span>
          <h1 className="font-display text-5xl font-bold tracking-[-0.04em] text-ink md:text-6xl">
            My <span className="serif-accent">writing.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Deep dives into competitive programming, backend engineering, and the lessons I&apos;ve learned along the way.
          </p>
          <div className="mt-8 h-px bg-gradient-to-r from-gold/40 via-line/10 to-transparent" aria-hidden="true" />
        </motion.div>

        {featured.length > 0 && cat === 'All' && !q && (
          <section className="mb-14 mt-12" aria-label="Featured posts">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.24em] text-gold">Featured</p>
            <div className="grid gap-5 md:grid-cols-2">
              {featured.slice(0, 2).map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                  onClick={() => setOpen(p)}
                  className="luxe-card luxe-lift group cursor-pointer overflow-hidden"
                  data-cursor="Read"
                >
                  <div className="h-1.5 w-full bg-gold" />
                  <div className="p-7">
                    <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
                      <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-ink">Featured</span>
                      <span>{fmtDate(p.createdAt)}</span>
                      <span className="inline-flex items-center gap-1"><Clock size={12} />{p.readTime} min</span>
                    </div>
                    <h2 className="font-display text-xl font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-gold">
                      {p.title}
                    </h2>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-line/8 pt-4 font-mono text-xs text-muted">
                      <span className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1"><Eye size={13} />{p.viewCount}</span>
                        <span className="inline-flex items-center gap-1"><Heart size={13} />{likes(p)}</span>
                      </span>
                      <span>{p.tags.slice(0, 2).join(' · ')}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        <div className="luxe-card mb-10 p-5">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search essays…"
                aria-label="Search posts"
                className="w-full border-b border-line/15 bg-transparent py-3 pl-8 pr-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-gold"
              />
            </div>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              aria-label="Filter by category"
              className="rounded-full border border-line/15 bg-background px-5 py-3 text-sm text-ink outline-none focus:border-gold"
            >
              {categories.map((c) => <option key={c} value={c}>{fmtCat(c)}</option>)}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-[20px]" aria-hidden="true" />
            ))}
          </div>
        ) : visible.length === 0 ? (
          <div className="py-24 text-center">
            <Search size={40} className="mx-auto mb-4 text-muted" />
            <h2 className="font-display text-xl font-bold text-ink">No essays found</h2>
            <p className="mt-1 text-muted">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.06, 0.3) }}
                onClick={() => setOpen(p)}
                className="luxe-card luxe-lift group cursor-pointer"
                data-cursor="Read"
              >
                <div className="h-1.5 w-full rounded-t-[20px] bg-gold" />
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between font-mono text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5"><Calendar size={12} />{fmtDate(p.createdAt)}</span>
                    {p.isFeatured && <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-gold-ink">Featured</span>}
                  </div>
                  <h3 className="line-clamp-2 font-display text-[17px] font-bold leading-snug text-ink transition-colors group-hover:text-gold">{p.title}</h3>
                  <p className="mt-2.5 line-clamp-3 text-[13.5px] leading-relaxed text-muted">{p.excerpt}</p>
                  <div className="mb-4 mt-4 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 2).map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 rounded-full border border-line/12 px-2.5 py-1 font-mono text-[10px] text-ink/70">
                        <Tag size={10} />{t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-line/8 pt-4 font-mono text-xs text-muted">
                    <span className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1"><Eye size={13} />{p.viewCount}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleLike(p.id) }}
                        aria-pressed={liked.has(p.id)}
                        aria-label={`Like ${p.title}`}
                        className={`inline-flex items-center gap-1 transition-colors ${liked.has(p.id) ? 'text-rosex' : 'hover:text-rosex'}`}
                      >
                        <Heart size={13} className={liked.has(p.id) ? 'fill-rosex' : ''} />{likes(p)}
                      </button>
                    </span>
                    <span className="inline-flex items-center gap-1"><Clock size={12} />{p.readTime} min</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                aria-current={page === i ? 'page' : undefined}
                className={`h-11 w-11 rounded-full font-mono text-sm transition-colors ${
                  page === i ? 'bg-gold font-bold text-gold-ink' : 'border border-line/15 text-muted hover:border-gold hover:text-ink'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setOpen(null)}
            role="dialog" aria-modal="true" aria-label={open.title}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="luxe-card max-h-[85dvh] w-full max-w-3xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-1.5 w-full bg-gold" />
              <div className="p-8">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 flex items-center gap-3 font-mono text-xs text-muted">
                      <span className="inline-flex items-center gap-1.5"><Calendar size={13} />{fmtDate(open.createdAt)}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock size={13} />{open.readTime} min</span>
                    </p>
                    <h2 className="font-display text-2xl font-bold leading-snug tracking-tight text-ink">{open.title}</h2>
                    <p className="mt-1 text-sm text-muted">By {open.author}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      onClick={() => toggleLike(open.id)}
                      aria-pressed={liked.has(open.id)}
                      aria-label="Like this post"
                      className={`flex h-11 items-center gap-2 rounded-full border px-4 font-mono text-xs ${
                        liked.has(open.id) ? 'border-rosex/50 bg-rosex/10 text-rosex' : 'border-line/15 text-muted hover:border-rosex/50 hover:text-rosex'
                      }`}
                    >
                      <Heart size={15} className={liked.has(open.id) ? 'fill-rosex' : ''} />{likes(open)}
                    </button>
                    <button onClick={() => setOpen(null)} aria-label="Close article" className="flex h-11 w-11 items-center justify-center rounded-full border border-line/15 text-muted hover:text-ink">
                      <X size={17} />
                    </button>
                  </div>
                </div>
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-muted">{open.content}</p>
                <div className="mt-6 flex flex-wrap gap-2 border-t border-line/8 pt-5">
                  {open.tags.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-line/12 px-3 py-1 font-mono text-xs text-ink/75">
                      <Tag size={12} />{t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
