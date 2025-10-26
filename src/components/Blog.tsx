'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Tag, BookOpen, Sparkles, TrendingUp, Zap } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

type BlogPost = {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string[]
  category: string
  featured?: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Mastering Data Structures and Algorithms: A Competitive Programmer\'s Journey',
    excerpt: 'My experience solving 500+ problems across LeetCode, CodeForces, and CodeChef. Key insights and strategies that helped me achieve a 1750 rating.',
    content: 'Full blog post content would go here...',
    date: '2024-12-15',
    readTime: '8 min read',
    tags: ['Competitive Programming', 'DSA', 'LeetCode'],
    category: 'Programming',
    featured: true
  },
  {
    id: 2,
    title: 'Building Scalable REST APIs with Spring Boot and Hibernate',
    excerpt: 'A comprehensive guide to creating enterprise-grade REST APIs using Spring Boot, covering best practices, security, and performance optimization.',
    content: 'Full blog post content would go here...',
    date: '2024-12-10',
    readTime: '12 min read',
    tags: ['Spring Boot', 'Java', 'REST API', 'Backend'],
    category: 'Backend Development',
    featured: true
  },
  {
    id: 3,
    title: 'From Algorithm Visualization to Production: My Development Journey',
    excerpt: 'How I built an interactive algorithm visualizer and the lessons learned about clean code, user experience, and performance optimization.',
    content: 'Full blog post content would go here...',
    date: '2024-12-05',
    readTime: '6 min read',
    tags: ['JavaScript', 'Algorithms', 'Web Development'],
    category: 'Web Development'
  },
  {
    id: 4,
    title: 'Effective Problem-Solving Strategies for Technical Interviews',
    excerpt: 'Proven techniques and mental frameworks that helped me excel in technical interviews and competitive programming contests.',
    content: 'Full blog post content would go here...',
    date: '2024-11-28',
    readTime: '10 min read',
    tags: ['Interview Prep', 'Problem Solving', 'Career'],
    category: 'Career'
  }
]

export function Blog() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const featuredPosts = blogPosts.filter(post => post.featured)
  const recentPosts = blogPosts.slice(0, 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <section id="blog" className="py-24 relative">
      {/* Enhanced Top Separator */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg className="w-full h-20" preserveAspectRatio="none" viewBox="0 0 1440 100">
          <defs>
            <linearGradient id="blogGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,40 Q360,25 720,40 T1440,40 L1440,0 L0,0 Z" fill="url(#blogGradient)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Premium Styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto shadow-2xl"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <BookOpen className="w-10 h-10 text-white" />
              </motion.div>
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-6xl font-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Latest Blog Posts
            </span>
          </motion.h2>
          
          <motion.div 
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="h-1 w-12 bg-gradient-to-r from-transparent to-blue-600 rounded-full"></div>
            <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-pink-600 to-transparent rounded-full"></div>
          </motion.div>

          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Sharing insights on programming, technology, and lessons learned from my development journey
          </motion.p>
        </motion.div>

        {/* Featured Posts with Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                Featured Posts
              </h3>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-2 border-dashed border-yellow-500 rounded-full"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredId(post.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="group cursor-pointer"
              >
                <motion.div
                  className="relative h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated background gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  {/* Featured badge */}
                  <div className="absolute top-6 right-6">
                    <motion.div
                      animate={{
                        rotate: hoveredId === post.id ? 360 : 0,
                        scale: hoveredId === post.id ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Zap className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  <div className="relative z-10">
                    {/* Date and Read Time */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {post.title}
                    </h4>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-base">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: tagIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium shadow-sm"
                        >
                          <Tag className="w-3 h-3 mr-1.5" />
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <Link href="/blog">
                      <motion.div
                        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-4 transition-all duration-300"
                      >
                        <span>Read Full Article</span>
                        <motion.div
                          animate={{
                            x: hoveredId === post.id ? [0, 5, 0] : 0,
                          }}
                          transition={{
                            duration: 1,
                            repeat: hoveredId === post.id ? Infinity : 0,
                          }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Recent Posts with Card Flip Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Recent Posts
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30, rotateY: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotateY: 5 }}
                className="group cursor-pointer perspective-1000"
              >
                <div className="relative h-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-bl-full"
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Date Badge */}
                  <div className="relative z-10 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">{formatDate(post.date)}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="relative z-10 text-lg font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h4>

                  {/* Excerpt */}
                  <p className="relative z-10 text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="relative z-10 flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    <Link href="/blog">
                      <motion.div
                        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-semibold"
                        whileHover={{ gap: '8px' }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>Read</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Premium Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 overflow-hidden shadow-2xl">
            {/* Animated background patterns */}
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '30px 30px',
              }}
              animate={{
                backgroundPosition: ['0px 0px', '30px 30px'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Floating sparkles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Want to Read More?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Follow me on social media for more insights, updates, and exciting content about technology and development.
              </p>
              
              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center gap-3"
                >
                  <span>View All Posts</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
