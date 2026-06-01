'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Tag, Sparkles } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

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

const categoryColor: Record<string, string> = {
  'Programming':        'from-blue-500 to-violet-500',
  'Backend Development':'from-emerald-500 to-teal-500',
  'Web Development':    'from-cyan-500 to-blue-500',
  'Career':             'from-amber-500 to-orange-500',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export function Blog() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const featuredPosts = blogPosts.filter(p => p.featured)
  const recentPosts   = blogPosts.slice(0, 3)

  return (
    <section id="blog" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/70 dark:border-blue-500/25 text-blue-700 dark:text-blue-300 text-[13px] font-medium mb-4"
          >
            <Sparkles size={12} />
            Writing
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Latest Blog Posts
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
          </div>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Sharing insights on programming, technology, and lessons from my development journey
          </p>
        </motion.div>

        {/* ── Featured Posts ──────────────────────────────── */}
        <div className="mb-16">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-600 to-violet-600" />
            Featured Posts
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredId(post.id)}
                onHoverEnd={() => setHoveredId(null)}
                whileHover={{ y: -5 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`h-1 w-full bg-gradient-to-r ${categoryColor[post.category] ?? 'from-blue-500 to-violet-500'}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <Calendar size={11} />{formatDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <Clock size={11} />{post.readTime}
                    </span>
                  </div>
                  <h4 className="text-[16px] font-bold text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {post.title}
                  </h4>
                  <p className="text-[13.5px] text-gray-500 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.map((tag, ti) => (
                      <span key={ti} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-500/20 rounded-lg text-[11px] font-medium">
                        <Tag size={9} />{tag}
                      </span>
                    ))}
                  </div>
                  <Link href="/blog">
                    <motion.div
                      className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-[13px] font-semibold"
                      animate={{ x: hoveredId === post.id ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      Read Article <ArrowRight size={14} />
                    </motion.div>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ── Recent Posts ────────────────────────────────── */}
        <div className="mb-16">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-emerald-500 to-teal-500" />
            Recent Posts
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            {recentPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`h-1 w-full bg-gradient-to-r ${categoryColor[post.category] ?? 'from-blue-500 to-violet-500'}`} />
                <div className="p-5">
                  <span className="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500 mb-3">
                    <Calendar size={10} />{formatDate(post.date)}
                  </span>
                  <h4 className="text-[14px] font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-[12.5px] text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                    <span className="flex items-center gap-1 text-[11px] text-gray-400"><Clock size={10} />{post.readTime}</span>
                    <Link href="/blog">
                      <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-[12px] font-semibold">
                        Read <ArrowRight size={12} />
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ── CTA ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 rounded-2xl p-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-3">Want to Read More?</h3>
              <p className="text-white/80 text-[14.5px] mb-6 max-w-xl mx-auto">
                Follow me for more insights, updates, and content about technology and development.
              </p>
              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 bg-white text-violet-600 rounded-xl font-bold text-[14px] shadow-xl inline-flex items-center gap-2"
                >
                  View All Posts <ArrowRight size={15} />
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
