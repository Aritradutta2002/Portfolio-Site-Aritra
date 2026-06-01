'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, Clock, ArrowLeft, Search, Tag, Heart, Eye, BookOpen, Star, Filter,
} from 'lucide-react'
import Link from 'next/link'
import { GlassCard } from '@/components/ui/GlassCard'
import { Chip } from '@/components/ui/Chip'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Modal } from '@/components/ui/Modal'
import { EASE } from '@/lib/motion'

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
  updatedAt: string
}

const allPosts: BlogPost[] = [
  {
    id: 1,
    title: "Mastering Data Structures and Algorithms: A Competitive Programmer's Journey",
    excerpt: 'My experience solving 500+ problems across LeetCode, CodeForces, and CodeChef. Key insights and strategies that helped me achieve a 1750 rating.',
    content: "Competitive programming has been an incredible journey for me. Starting from basic array problems to tackling complex graph algorithms, I've learned that consistency beats intensity every time.\n\nIn this post, I share my roadmap: how I structured my practice, the resources that helped me most, and the mindset shifts that turned me from a beginner into a confident problem solver.",
    author: 'Aritra Dutta',
    viewCount: 1240,
    likeCount: 87,
    readTime: 8,
    tags: ['Competitive Programming', 'DSA', 'LeetCode'],
    category: 'PROGRAMMING',
    isFeatured: true,
    createdAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-15T10:00:00Z',
  },
  {
    id: 2,
    title: 'Building Scalable REST APIs with Spring Boot and Hibernate',
    excerpt: 'A comprehensive guide to creating enterprise-grade REST APIs using Spring Boot, covering best practices, security, and performance optimization.',
    content: "Spring Boot has revolutionized how we build Java applications. In this guide, I walk through designing RESTful APIs that scale—from proper resource naming and HTTP status codes to implementing pagination, caching, and rate limiting.",
    author: 'Aritra Dutta',
    viewCount: 980,
    likeCount: 64,
    readTime: 12,
    tags: ['Spring Boot', 'Java', 'REST API', 'Backend'],
    category: 'BACKEND_DEVELOPMENT',
    isFeatured: true,
    createdAt: '2024-12-10T10:00:00Z',
    updatedAt: '2024-12-10T10:00:00Z',
  },
  {
    id: 3,
    title: 'From Algorithm Visualization to Production: My Development Journey',
    excerpt: 'How I built an interactive algorithm visualizer and the lessons learned about clean code, user experience, and performance optimization.',
    content: "Turning a side project into a polished product taught me more than any tutorial. In this post, I share the story of building an algorithm visualizer.",
    author: 'Aritra Dutta',
    viewCount: 756,
    likeCount: 45,
    readTime: 6,
    tags: ['JavaScript', 'Algorithms', 'Web Development'],
    category: 'WEB_DEVELOPMENT',
    isFeatured: false,
    createdAt: '2024-12-05T10:00:00Z',
    updatedAt: '2024-12-05T10:00:00Z',
  },
  {
    id: 4,
    title: 'Effective Problem-Solving Strategies for Technical Interviews',
    excerpt: 'Proven techniques and mental frameworks that helped me excel in technical interviews and competitive programming contests.',
    content: "Technical interviews are as much about communication as they are about coding. I break down the UMPIRE method for approaching unfamiliar problems.",
    author: 'Aritra Dutta',
    viewCount: 1120,
    likeCount: 72,
    readTime: 10,
    tags: ['Interview Prep', 'Problem Solving', 'Career'],
    category: 'CAREER',
    isFeatured: false,
    createdAt: '2024-11-28T10:00:00Z',
    updatedAt: '2024-11-28T10:00:00Z',
  },
  {
    id: 5,
    title: 'Understanding React Server Components in Next.js 15',
    excerpt: 'A deep dive into React Server Components, how they differ from client components, and when to use each for optimal performance.',
    content: "Next.js 15 brings React Server Components to the forefront. I explain the mental model behind server components and practical patterns for building fast apps.",
    author: 'Aritra Dutta',
    viewCount: 640,
    likeCount: 38,
    readTime: 7,
    tags: ['React', 'Next.js', 'Frontend'],
    category: 'WEB_DEVELOPMENT',
    isFeatured: false,
    createdAt: '2024-11-20T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
  },
  {
    id: 6,
    title: 'My Competitive Programming Toolkit: Extensions, Templates, and Tips',
    excerpt: 'The exact setup I use for competitive programming contests—from VS Code extensions to C++ templates and debugging tricks.',
    content: "Having the right toolkit can save minutes in a timed contest. I share my complete VS Code setup for competitive programming.",
    author: 'Aritra Dutta',
    viewCount: 890,
    likeCount: 55,
    readTime: 5,
    tags: ['Competitive Programming', 'C++', 'Tools'],
    category: 'COMPETITIVE_PROGRAMMING',
    isFeatured: false,
    createdAt: '2024-11-15T10:00:00Z',
    updatedAt: '2024-11-15T10:00:00Z',
  },
]

const categories = ['All', 'PROGRAMMING', 'BACKEND_DEVELOPMENT', 'WEB_DEVELOPMENT', 'CAREER', 'COMPETITIVE_PROGRAMMING']

const categoryTone: Record<string, 'primary' | 'emerald' | 'sky' | 'amber' | 'rose'> = {
  PROGRAMMING: 'primary',
  BACKEND_DEVELOPMENT: 'emerald',
  WEB_DEVELOPMENT: 'sky',
  CAREER: 'amber',
  COMPETITIVE_PROGRAMMING: 'rose',
}

const formatDate = (d: string) => {
  try { return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }
  catch { return 'Unknown' }
}

const formatCategory = (c: string) =>
  c.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())

export default function BlogPage() {
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())

  const pageSize = 6

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(timer)
  }, [])

  const filteredPosts = useMemo(() => {
    let result = allPosts
    if (selectedCategory !== 'All') result = result.filter((p) => p.category === selectedCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [selectedCategory, searchQuery])

  const totalPages = Math.ceil(filteredPosts.length / pageSize) || 1
  const paginatedPosts = filteredPosts.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  const featuredPosts = allPosts.filter((p) => p.isFeatured)

  useEffect(() => { setCurrentPage(0) }, [selectedCategory, searchQuery])

  const toggleLike = (id: number) => {
    setLikedPosts((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const getLikeCount = (post: BlogPost) => post.likeCount + (likedPosts.has(post.id) ? 1 : 0)

  return (
    <main className="min-h-screen relative">
      {/* Sticky sub-header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-line-soft bg-bg-0/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/#blog"
            className="flex items-center gap-2 text-primary hover:text-secondary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-base sm:text-lg font-bold">
              <span className="gradient-text-static">Aritra&apos;s Blog</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionHeader
          eyebrow="Writing"
          title={<>My <span className="gradient-text">writing</span></>}
          description="Deep dives into competitive programming, backend engineering, and the lessons I've learned along the way."
        />

        {/* Featured */}
        {featuredPosts.length > 0 && selectedCategory === 'All' && !searchQuery && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE.outExpo }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-amber to-rose flex items-center justify-center shadow-neon-amber">
                <Star className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-fg-0">Featured posts</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {featuredPosts.slice(0, 2).map((post, i) => (
                <motion.button
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, ease: EASE.outExpo }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  data-cursor="hover"
                  className="text-left"
                >
                  <GlassCard glow="primary" className="p-6 h-full">
                    <div className="flex items-center gap-2 mb-3">
                      <Chip tone="amber" size="sm" icon={<Star size={10} />}>Featured</Chip>
                      <Chip tone={categoryTone[post.category] ?? 'primary'} size="sm">
                        {formatCategory(post.category)}
                      </Chip>
                    </div>
                    <h4 className="text-lg font-bold text-fg-0 mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-fg-3 text-[13.5px] leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-[11.5px] text-fg-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1.5"><Calendar size={11} />{formatDate(post.createdAt)}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock size={11} />{post.readTime} min</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1"><Eye size={11} />{post.viewCount}</span>
                        <span className="inline-flex items-center gap-1"><Heart size={11} />{getLikeCount(post)}</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.button>
              ))}
            </div>
          </motion.section>
        )}

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE.outExpo }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <GlassCard className="p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-4" />
                <input
                  type="text"
                  placeholder="Search posts…"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(0) }}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md border border-line bg-bg-1/60 text-fg-0 placeholder:text-fg-4 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-fg-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(0) }}
                  className="px-4 py-2.5 rounded-md border border-line bg-bg-1/60 text-fg-0 text-sm focus:outline-none focus:border-primary transition-all"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-bg-1 text-fg-0">
                      {formatCategory(c)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-md border border-line-soft p-6 bg-bg-1/40 animate-pulse">
                  <div className="h-3 bg-bg-2 rounded w-3/4 mb-4" />
                  <div className="h-2.5 bg-bg-2 rounded w-full mb-2" />
                  <div className="h-2.5 bg-bg-2 rounded w-2/3 mb-6" />
                  <div className="h-8 bg-bg-2 rounded w-1/3" />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {paginatedPosts.map((post) => (
                <motion.button
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE.outExpo } },
                  }}
                  whileHover={{ y: -5 }}
                  data-cursor="hover"
                  className="text-left"
                >
                  <GlassCard className="p-5 h-full">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-[11.5px] text-fg-3">
                        <Calendar size={11} />{formatDate(post.createdAt)}
                      </div>
                      {post.isFeatured && (
                        <Chip tone="amber" size="sm" icon={<Star size={10} />}>Featured</Chip>
                      )}
                    </div>
                    <h3 className="text-[15px] font-bold text-fg-0 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-fg-3 text-[13px] leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Chip key={tag} tone="neutral" size="sm" icon={<Tag size={9} />}>{tag}</Chip>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3.5 border-t border-line-soft text-[11.5px] text-fg-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1"><Eye size={11} />{post.viewCount}</span>
                        <span
                          onClick={(e) => { e.stopPropagation(); toggleLike(post.id) }}
                          className={[
                            'inline-flex items-center gap-1 transition-colors cursor-pointer',
                            likedPosts.has(post.id) ? 'text-rose' : 'hover:text-rose',
                          ].join(' ')}
                        >
                          <Heart className={`w-3 h-3 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                          {getLikeCount(post)}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={10} />{post.readTime} min
                      </span>
                    </div>
                  </GlassCard>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!loading && paginatedPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Search className="w-12 h-12 text-fg-4 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-fg-0 mb-2">No posts found</h3>
            <p className="text-fg-3 text-sm">Try adjusting your search or category filter.</p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center gap-2 mt-10"
          >
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                data-cursor="hover"
                className={[
                  'w-10 h-10 rounded-md text-sm font-semibold transition-all duration-200',
                  currentPage === i
                    ? 'bg-primary/15 text-primary border border-primary/40 shadow-neon-primary'
                    : 'glass text-fg-3 border border-line-soft hover:border-primary/40 hover:text-primary',
                ].join(' ')}
              >
                {i + 1}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      <Modal
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        size="lg"
        title={selectedPost?.title}
      >
        {selectedPost && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-[12px] text-fg-3">
              <span className="inline-flex items-center gap-1.5"><Calendar size={12} />{formatDate(selectedPost.createdAt)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={12} />{selectedPost.readTime} min read</span>
              <span className="inline-flex items-center gap-1.5"><Eye size={12} />{selectedPost.viewCount}</span>
            </div>
            <p className="text-fg-2 leading-relaxed text-[14.5px]">
              {selectedPost.content.split('\n\n').map((para, i) => (
                <span key={i} className="block mb-3">{para}</span>
              ))}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-line-soft">
              <div className="flex flex-wrap gap-1.5">
                {selectedPost.tags.map((tag) => (
                  <Chip key={tag} tone="primary" size="sm" icon={<Tag size={9} />}>{tag}</Chip>
                ))}
              </div>
              <button
                onClick={() => toggleLike(selectedPost.id)}
                data-cursor="hover"
                className={[
                  'inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all',
                  likedPosts.has(selectedPost.id)
                    ? 'bg-rose/10 text-rose border border-rose/30'
                    : 'border border-line text-fg-3 hover:border-rose/40 hover:text-rose',
                ].join(' ')}
              >
                <Heart className={`w-3.5 h-3.5 ${likedPosts.has(selectedPost.id) ? 'fill-current' : ''}`} />
                {getLikeCount(selectedPost)}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  )
}
