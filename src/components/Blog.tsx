'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'

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
    <section id="blog" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Latest Blog Posts
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Sharing my thoughts on programming, technology, and lessons learned from my development journey
          </p>
        </motion.div>

        {/* Featured Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Featured Posts</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(post.date)}
                  <Clock className="w-4 h-4 ml-4 mr-2" />
                  {post.readTime}
                </div>

                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {post.title}
                </h4>

                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Recent Posts</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(post.date)}
                </div>

                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h4>

                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{post.readTime}</span>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-200">
                    Read
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Want to read more?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Follow me on my social media channels for more insights and updates on my latest projects and learnings.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
            >
              Follow for Updates
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
