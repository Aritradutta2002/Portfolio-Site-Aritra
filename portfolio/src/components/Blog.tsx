'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Tag, Sparkles, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { GlassCard } from '@/components/ui/GlassCard'
import { Chip } from '@/components/ui/Chip'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { EASE } from '@/lib/motion'

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
    excerpt: 'My experience solving 500+ problems across LeetCode, CodeForces, and CodeChef. Key insights and strategies that helped me achieve a 1750 rating.',
    date: '2024-12-15',
    readTime: '8 min read',
    tags: ['CP', 'DSA', 'LeetCode'],
    category: 'Programming',
    featured: true,
  },
  {
    id: 2,
    title: 'Building Scalable REST APIs with Spring Boot and Hibernate',
    excerpt: 'A comprehensive guide to creating enterprise-grade REST APIs using Spring Boot, covering best practices, security, and performance optimization.',
    date: '2024-12-10',
    readTime: '12 min read',
    tags: ['Spring Boot', 'Java', 'Backend'],
    category: 'Backend',
    featured: true,
  },
  {
    id: 3,
    title: 'From Algorithm Visualization to Production: My Development Journey',
    excerpt: 'How I built an interactive algorithm visualizer and the lessons learned about clean code, UX, and performance optimization.',
    date: '2024-12-05',
    readTime: '6 min read',
    tags: ['JavaScript', 'Algorithms', 'Web'],
    category: 'Web',
  },
  {
    id: 4,
    title: 'Effective Problem-Solving Strategies for Technical Interviews',
    excerpt: 'Proven techniques and mental frameworks that helped me excel in technical interviews and competitive programming contests.',
    date: '2024-11-28',
    readTime: '10 min read',
    tags: ['Interviews', 'Problem Solving', 'Career'],
    category: 'Career',
  },
]

const categoryTone: Record<string, 'primary' | 'secondary' | 'emerald' | 'amber' | 'rose' | 'sky'> = {
  'Programming': 'primary',
  'Backend':     'emerald',
  'Web':         'sky',
  'Career':      'amber',
}

const categoryIcon: Record<string, string> = {
  'Programming': '⚡',
  'Backend': '⚙️',
  'Web': '🌐',
  'Career': '🎯',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function Blog() {
  const featuredPosts = blogPosts.filter((p) => p.featured)
  const recentPosts = blogPosts.filter((p) => !p.featured)

  return (
    <section id="blog" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="05 — Writing"
          eyebrow="Blog"
          title={<>Latest <span className="gradient-text">writing</span></>}
          description="Insights on competitive programming, Spring Boot internals, and lessons from shipping real software."
        />

        {/* Featured hero card (2 cols) */}
        <div className="grid lg:grid-cols-5 gap-6 mb-12">
          {featuredPosts[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE.outExpo }}
              viewport={{ once: true, amount: 0.2 }}
              className="lg:col-span-3"
            >
              <Link href="/blog">
                <GlassCard
                  glow="primary"
                  gradientBorder
                  className="p-8 h-full group cursor-pointer"
                  data-cursor="hover"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Chip tone="amber" size="sm" icon={<Sparkles size={11} />}>Featured</Chip>
                    <Chip tone={categoryTone[featuredPosts[0].category]} size="sm">
                      {categoryIcon[featuredPosts[0].category]} {featuredPosts[0].category}
                    </Chip>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-fg-0 leading-tight mb-4 group-hover:gradient-text transition-all">
                    {featuredPosts[0].title}
                  </h3>
                  <p className="text-[15px] text-fg-2 leading-relaxed mb-6 line-clamp-3">
                    {featuredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-[12.5px] text-fg-3 mb-6">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={12} />
                      {formatDate(featuredPosts[0].date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={12} />
                      {featuredPosts[0].readTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    Read article
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          )}

          {/* Secondary featured */}
          <div className="lg:col-span-2 space-y-5">
            {featuredPosts.slice(1).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE.outExpo }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link href="/blog">
                  <GlassCard
                    className="p-5 group cursor-pointer"
                    data-cursor="hover"
                  >
                    <Chip tone={categoryTone[post.category]} size="sm" className="mb-3">
                      {categoryIcon[post.category]} {post.category}
                    </Chip>
                    <h4 className="text-[15px] font-bold text-fg-0 leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[11.5px] text-fg-3">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={11} />{formatDate(post.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={11} />{post.readTime}
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}

            {/* Recent compact list */}
            {recentPosts.slice(0, 1).map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE.outExpo }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Link href="/blog">
                  <GlassCard className="p-5 group cursor-pointer" data-cursor="hover">
                    <Chip tone={categoryTone[post.category]} size="sm" className="mb-3">
                      {categoryIcon[post.category]} {post.category}
                    </Chip>
                    <h4 className="text-[15px] font-bold text-fg-0 leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-3 text-[11.5px] text-fg-3">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={11} />{formatDate(post.date)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={11} />{post.readTime}
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tag cloud */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE.outExpo }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          <span className="text-xs text-fg-3 font-mono uppercase tracking-widest mr-2">Popular tags</span>
          {Array.from(new Set(blogPosts.flatMap((p) => p.tags))).map((tag) => (
            <Chip key={tag} tone="neutral" size="sm" icon={<Tag size={10} />}>{tag}</Chip>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.outExpo }}
          viewport={{ once: true }}
          className="text-center"
        >
          <GlassCard
            gradientBorder
            gradientBorderAnimated
            className="px-8 py-10 relative overflow-hidden"
          >
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-rose/20 rounded-full blur-3xl -z-10" />
            <BookOpen className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-fg-0 mb-2">Want to read more?</h3>
            <p className="text-fg-3 text-[14.5px] mb-6 max-w-xl mx-auto">
              Browse the full archive for deeper dives, code samples, and engineering retrospectives.
            </p>
            <Link href="/blog">
              <Button variant="primary" size="lg" iconRight={<ArrowRight size={16} />}>
                View all posts
              </Button>
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
