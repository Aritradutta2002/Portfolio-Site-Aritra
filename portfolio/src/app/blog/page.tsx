


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

const categoryColors: Record<string, string> = {
  PROGRAMMING: 'from-violet-600 to-purple-600',
  BACKEND_DEVELOPMENT: 'from-blue-600 to-cyan-600',
  WEB_DEVELOPMENT: 'from-emerald-600 to-teal-600',
  CAREER: 'from-orange-600 to-amber-600',
  COMPETITIVE_PROGRAMMING: 'from-pink-600 to-rose-600',
}

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
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(135deg, #040408 0%, #0a0514 50%, #04080f 100%)' }}>

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #06b6d4, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      {/* Sticky Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/5"
        style={{ background: 'rgba(4,4,8,0.85)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/#blog"
            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-400" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Aritra&apos;s Blog
            </h1>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero heading */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm font-medium mb-4">
            <Star className="w-3.5 h-3.5" /> Thoughts & Insights
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
            My{' '}
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Writing
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Deep dives into competitive programming, backend engineering, and the lessons I&apos;ve learned along the way.
          </p>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && selectedCategory === 'All' && !searchQuery && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Featured Posts</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.slice(0, 2).map((post, i) => (
                <motion.article key={post.id}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer relative overflow-hidden rounded-3xl border border-white/10 hover:border-primary/40 transition-all duration-500 glass-galaxy"
                  whileHover={{ y: -6, scale: 1.01 }}>
                  {/* Top gradient stripe */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${categoryColors[post.category] || 'from-primary to-secondary'}`} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.15), transparent 60%)' }} />
                  <div className="p-6 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        ★ Featured
                      </span>
                      <span className="text-xs text-gray-500">{formatDate(post.createdAt)}</span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{post.readTime} min
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.viewCount}</span>
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{getLikeCount(post)}</span>
                      </div>
                      <div className="flex gap-1.5 flex-wrap">
                        {post.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="px-2 py-0.5 text-[10px] rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/20">
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
          className="mb-10 rounded-2xl border border-white/10 p-5 glass-galaxy">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" placeholder="Search posts…" value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(0) }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all" />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select value={selectedCategory} onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(0) }}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-violet-500/50 transition-all">
                {categories.map(c => <option key={c} value={c} className="bg-gray-900">{formatCategory(c)}</option>)}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-white/5 p-6 animate-pulse"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="h-3 bg-white/10 rounded w-3/4 mb-4" />
                  <div className="h-2.5 bg-white/10 rounded w-full mb-2" />
                  <div className="h-2.5 bg-white/10 rounded w-2/3 mb-6" />
                  <div className="h-8 bg-white/10 rounded w-1/3" />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="content" variants={containerVariants} initial="hidden" animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map(post => (
                <motion.article key={post.id} variants={cardVariants}
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer relative overflow-hidden rounded-3xl border border-white/10 hover:border-primary/40 transition-all duration-500 glass-galaxy"
                  whileHover={{ y: -5 }}>
                  <div className={`h-1 w-full bg-gradient-to-r ${categoryColors[post.category] || 'from-primary to-secondary'}`} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.12), transparent 60%)' }} />
                  <div className="p-5 relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />{formatDate(post.createdAt)}
                      </div>
                      {post.isFeatured && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">★</span>
                      )}
                    </div>
                    <h3 className="text-[15px] font-bold text-white mb-2.5 line-clamp-2 group-hover:text-violet-300 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          <Tag className="w-2.5 h-2.5" />{tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3.5 border-t border-white/6">
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.viewCount}</span>
                        <button onClick={e => { e.stopPropagation(); toggleLike(post.id) }}
                          className={`flex items-center gap-1 transition-colors ${likedPosts.has(post.id) ? 'text-rose-400' : 'hover:text-rose-400'}`}>
                          <Heart className={`w-3.5 h-3.5 ${likedPosts.has(post.id) ? 'fill-rose-400' : ''}`} />
                          {getLikeCount(post)}
                        </button>
                      </div>
                      <span className="text-xs text-gray-600 flex items-center gap-1">
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
            <Search className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center gap-2 mt-12">
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => setCurrentPage(i)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === i
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                    : 'border border-white/10 text-gray-400 hover:border-violet-500/40 hover:text-white'
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            style={{ background: 'rgba(0,0,0,0.85)' }}
            onClick={() => setSelectedPost(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 glass-galaxy"
              onClick={e => e.stopPropagation()}>
              <div className={`h-1 w-full bg-gradient-to-r ${categoryColors[selectedPost.category] || 'from-violet-600 to-cyan-600'}`} />
              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(selectedPost.createdAt)}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{selectedPost.readTime} min read</span>
                    </div>
                    <h2 className="text-2xl font-bold text-white leading-snug">{selectedPost.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">By {selectedPost.author}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => toggleLike(selectedPost.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${likedPosts.has(selectedPost.id) ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'border border-white/10 text-gray-400 hover:border-rose-500/30'}`}>
                      <Heart className={`w-4 h-4 ${likedPosts.has(selectedPost.id) ? 'fill-rose-400' : ''}`} />
                      {getLikeCount(selectedPost)}
                    </button>
                    <button onClick={() => setSelectedPost(null)}
                      className="p-2 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/20 transition-all">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="prose prose-invert prose-sm max-w-none text-gray-300 leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: selectedPost.content.replace(/\n/g, '<br/>') }} />
                <div className="flex flex-wrap gap-2 pt-5 border-t border-white/8">
                  {selectedPost.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-violet-500/15 text-violet-300 border border-violet-500/25">
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
