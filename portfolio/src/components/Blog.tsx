'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { SectionHeading } from './SectionHeading'
import { CursorTag } from './CursorTag'
import { useMagnetic } from '@/lib/interactions'

type BlogPost = {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  category: string
  featured?: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Mastering Data Structures and Algorithms: A Competitive Programmer's Journey",
    excerpt: 'My experience solving 700+ problems across LeetCode, CodeForces, and CodeChef. Key insights and strategies that helped me achieve a 1672 rating.',
    date: '2024-12-15',
    readTime: '8 min read',
    tags: ['Competitive Programming', 'DSA', 'LeetCode'],
    category: 'Programming',
    featured: true,
  },
  {
    id: 2,
    title: 'Building Scalable REST APIs with Spring Boot and Hibernate',
    excerpt: 'A comprehensive guide to creating enterprise-grade REST APIs using Spring Boot, covering best practices, security, and performance optimization.',
    date: '2024-12-10',
    readTime: '12 min read',
    tags: ['Spring Boot', 'Java', 'REST API', 'Backend'],
    category: 'Backend Development',
    featured: true,
  },
  {
    id: 3,
    title: 'From Algorithm Visualization to Production: My Development Journey',
    excerpt: 'How I built an interactive algorithm visualizer and the lessons learned about clean code, user experience, and performance optimization.',
    date: '2024-12-05',
    readTime: '6 min read',
    tags: ['JavaScript', 'Algorithms', 'Web Development'],
    category: 'Web Development',
  },
  {
    id: 4,
    title: 'Effective Problem-Solving Strategies for Technical Interviews',
    excerpt: 'Proven techniques and mental frameworks that helped me excel in technical interviews and competitive programming contests.',
    date: '2024-11-28',
    readTime: '10 min read',
    tags: ['Interview Prep', 'Problem Solving', 'Career'],
    category: 'Career',
  },
]

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function PostRow({ post, index }: { post: BlogPost; index: number }) {
  const { targetRef } = useMagnetic<HTMLAnchorElement>(0.1, { maxX: 12, maxY: 8 })
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.07, 0.3) }}
      viewport={{ once: true }}
      className="group relative border-b border-aurora/10 hover:bg-aurora/[0.03] transition-colors duration-300"
      data-cursor
    >
      {/* Aurora gradient sweep — scaleX on hover, origin left */}
      <span
        className="absolute bottom-0 left-0 right-0 h-px bg-aurora origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
        aria-hidden="true"
      />
      <Link href="/blog" ref={targetRef} className="magnetic flex items-start gap-5 md:gap-8 py-7 px-2 md:px-4">
        <span className="font-mono text-xs text-muted pt-1.5 w-8 flex-shrink-0 group-hover:text-aurorastrong transition-colors duration-300">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted mb-2.5">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={11} />{formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={11} />{post.readTime}
            </span>
            <span className="text-aurorastrong">{post.category}</span>
          </div>
          <h4 className="font-display text-xl md:text-2xl font-bold tracking-tight text-ink leading-snug mb-2 group-hover:text-aurorastrong transition-colors duration-300">
            {post.title}
          </h4>
          <p className="text-[15px] text-muted leading-relaxed max-w-2xl mb-3.5">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full border border-aurora/20 font-mono text-[11px] text-ink/70">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="hidden sm:flex w-10 h-10 rounded-full border border-aurora/25 items-center justify-center text-muted group-hover:text-[#0B0616] group-hover:bg-aurora group-hover:border-aurora transition-colors duration-300 flex-shrink-0 mt-1">
          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </span>
      </Link>
    </motion.article>
  )
}

export function Blog() {
  const featuredPosts = blogPosts.filter(p => p.featured)
  const recentPosts   = blogPosts.slice(0, 3)

  return (
    <section id="blog" className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <SectionHeading
          index="05"
          eyebrow="Writing"
          title="Latest Blog Posts"
          blurb="Sharing insights on programming, technology, and lessons from my development journey"
        />

        {/* ── Featured ─────────────────────────────────────── */}
        <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-ink mb-2">Featured Posts</h3>
        <div className="border-t border-aurora/10 mb-14">
          {featuredPosts.map((post, i) => (
            <PostRow key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* ── Recent ───────────────────────────────────────── */}
        <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-ink mb-2">Recent Posts</h3>
        <div className="border-t border-aurora/10 mb-14">
          {recentPosts.map((post, i) => (
            <PostRow key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* ── CTA band — aurora gradient panel ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: '-64px' }}
          className="rounded-2xl bg-aurora text-[#0B0616] p-10 md:p-14 relative overflow-hidden"
        >
          <div className="relative z-10 max-w-xl">
            <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-3">Want to Read More?</h3>
            <p className="text-[#0B0616]/70 text-[15px] mb-7 leading-relaxed">
              Follow me for more insights, updates, and content about technology and development.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B0616] text-white font-bold text-sm hover:shadow-[0_8px_32px_rgba(11,6,22,0.4)] transition-shadow duration-300"
            >
              View All Posts <ArrowRight size={15} />
            </Link>
          </div>
          <span className="absolute -bottom-8 -right-2 font-display font-bold tracking-[-0.04em] leading-none text-[10rem] md:text-[14rem] text-[#0B0616]/10 select-none" aria-hidden="true">
            Aa
          </span>
        </motion.div>

      </div>

      {/* Cursor follower pill over article rows (desktop only) */}
      <CursorTag text="Read" />
    </section>
  )
}
