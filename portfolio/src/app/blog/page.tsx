'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, Clock, ArrowLeft, Search, Tag, Heart, Eye, BookOpen, Star, Filter
} from 'lucide-react'
import Link from 'next/link'

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
    excerpt: 'My experience solving 700+ problems across LeetCode, CodeForces, and CodeChef. Key insights and strategies that helped me achieve a 1672 rating.',
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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export default function BlogPage() {
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())

  const pageSize = 6

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const filteredPosts = useMemo(() => {
    let result = allPosts
    if (selectedCategory !== 'All') result = result.filter(p => p.category === selectedCategory)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [selectedCategory, searchQuery])

  const totalPages = Math.ceil(filteredPosts.length / pageSize) || 1
  const paginatedPosts = filteredPosts.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
  const featuredPosts = allPosts.filter(p => p.isFeatured)

  useEffect(() => { setCurrentPage(0) }, [selectedCategory, searchQuery])

  const toggleLike = (id: number) => {
    setLikedPosts(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const getLikeCount = (post: BlogPost) => post.likeCount + (likedPosts.has(post.id) ? 1 : 0)

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) }
    catch { return 'Unknown' }
  }

  const formatCategory = (c: string) => c.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())

  return (
    <div className="min-h-screen relative bg-background text-ink">

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-line/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/#blog"
            className="flex items-center gap-2 text-muted hover:text-acidstrong transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-acidstrong" />
            <span className="text-lg font-bold tracking-tight">
              Aritra&apos;s Blog<span className="text-acidstrong">.</span>
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">

        {/* Hero heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="mb-14 md:mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-line/15 font-mono text-xs uppercase tracking-[0.18em] text-muted mb-5">
            <Star className="w-3.5 h-3.5 text-acidstrong" /> Thoughts & Insights
          </motion.span>
          <h2 className="tracking-[-0.03em] leading-[1.02] font-bold text-ink text-5xl md:text-6xl mb-4">
            My Writing<span className="text-acidstrong">.</span>
          </h2>
          <p className="text-base md:text-lg text-muted max-w-2xl leading-relaxed">
            Deep dives into competitive programming, backend engineering, and the lessons I&apos;ve learned along the way.
          </p>
          <div className="mt-8 h-px w-full bg-line/10" aria-hidden="true" />
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && selectedCategory === 'All' && !searchQuery && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mb-14">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-ink mb-6">Featured Posts</h3>

            <div className="grid md:grid-cols-2 gap-5">
              {featuredPosts.slice(0, 2).map((post, i) => (
                <motion.article key={post.id}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer relative overflow-hidden rounded-2xl border border-line/10 bg-surface hover:border-acidstrong/40 transition-colors duration-300"
                  whileHover={{ y: -4 }}>
                  <div className="h-1 w-full bg-acid" />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-acid text-[#101204]">
                        Featured
                      </span>
                      <span className="font-mono text-xs text-muted">{formatDate(post.createdAt)}</span>
                      <span className="font-mono text-xs text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />{post.readTime} min
                      </span>
                    </div>
                    <h4 className="text-xl font-bold tracking-tight text-ink mb-3 group-hover:text-acidstrong transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-muted text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 font-mono text-xs text-muted">
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.viewCount}</span>
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{getLikeCount(post)}</span>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2.5 py-1 text-[11px] rounded-full border border-line/12 font-mono text-ink/70">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Search + Filter */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mb-10 rounded-2xl border border-line/10 bg-surface p-5">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-1 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input type="text" placeholder="Search posts…" value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(0) }}
                className="w-full pl-9 pr-4 py-3 bg-transparent border-b border-line/15 text-ink text-[15px] placeholder:text-muted/60 focus:outline-none focus:border-acidstrong transition-colors" />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted" />
              <select value={selectedCategory} onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(0) }}
                className="px-4 py-3 rounded-xl border border-line/15 bg-surface text-ink text-sm focus:outline-none focus:border-acidstrong transition-colors">
                {categories.map(c => <option key={c} value={c}>{formatCategory(c)}</option>)}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-line/10 bg-surface p-6 animate-pulse">
                  <div className="h-3 bg-line/10 rounded w-3/4 mb-4" />
                  <div className="h-2.5 bg-line/10 rounded w-full mb-2" />
                  <div className="h-2.5 bg-line/10 rounded w-2/3 mb-6" />
                  <div className="h-8 bg-line/10 rounded-full w-1/3" />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="content" variants={containerVariants} initial="hidden" animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedPosts.map(post => (
                <motion.article key={post.id} variants={cardVariants}
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer relative overflow-hidden rounded-2xl border border-line/10 bg-surface hover:border-acidstrong/40 transition-colors duration-300"
                  whileHover={{ y: -4 }}>
                  <div className="h-1 w-full bg-acid" />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 font-mono text-xs text-muted">
                        <Calendar className="w-3 h-3" />{formatDate(post.createdAt)}
                      </div>
                      {post.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-acid text-[#101204]">Featured</span>
                      )}
                    </div>
                    <h3 className="text-[15px] font-bold text-ink mb-2.5 line-clamp-2 group-hover:text-acidstrong transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted text-[13px] leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border border-line/12 font-mono text-ink/70">
                          <Tag className="w-2.5 h-2.5" />{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3.5 border-t border-line/10">
                      <div className="flex items-center gap-3 font-mono text-xs text-muted">
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.viewCount}</span>
                        <button onClick={e => { e.stopPropagation(); toggleLike(post.id) }}
                          className={`flex items-center gap-1 transition-colors ${likedPosts.has(post.id) ? 'text-rose-500' : 'hover:text-rose-500'}`}>
                          <Heart className={`w-3.5 h-3.5 ${likedPosts.has(post.id) ? 'fill-rose-500' : ''}`} />
                          {getLikeCount(post)}
                        </button>
                      </div>
                      <span className="font-mono text-xs text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />{post.readTime} min
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!loading && paginatedPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <Search className="w-12 h-12 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-bold text-ink mb-2">No posts found</h3>
            <p className="text-muted">Try adjusting your search or category filter.</p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center gap-2 mt-12">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i)}
                className={`w-9 h-9 rounded-full font-mono text-sm transition-colors duration-200 ${
                  currentPage === i
                    ? 'bg-acid text-[#101204] font-bold'
                    : 'border border-line/15 text-muted hover:text-ink hover:border-acidstrong/50'
                }`}>
                {i + 1}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedPost(null)}>
            <motion.div initial={{ y: 32, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-line/10 bg-surface"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selectedPost.title}>
              <div className="h-1 w-full bg-acid rounded-t-2xl" />
              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 font-mono text-xs text-muted">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(selectedPost.createdAt)}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{selectedPost.readTime} min read</span>
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-ink leading-snug">{selectedPost.title}</h2>
                    <p className="text-sm text-muted mt-1">By {selectedPost.author}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => toggleLike(selectedPost.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-full font-mono text-xs transition-colors ${likedPosts.has(selectedPost.id) ? 'bg-rose-500/15 text-rose-500 border border-rose-500/40' : 'border border-line/15 text-muted hover:text-rose-500 hover:border-rose-500/40'}`}>
                      <Heart className={`w-4 h-4 ${likedPosts.has(selectedPost.id) ? 'fill-rose-500' : ''}`} />
                      {getLikeCount(selectedPost)}
                    </button>
                    <button onClick={() => setSelectedPost(null)}
                      className="p-2 rounded-full border border-line/15 text-muted hover:text-ink transition-colors"
                      aria-label="Close article">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-muted leading-relaxed mb-6 text-[15px] whitespace-pre-line">
                  {selectedPost.content}
                </p>
                <div className="flex flex-wrap gap-2 pt-5 border-t border-line/10">
                  {selectedPost.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs border border-line/12 text-ink/75">
                      <Tag className="w-3 h-3" />{tag}
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
