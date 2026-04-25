'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Code2, Target, Zap, ExternalLink, Trophy, Twitter } from 'lucide-react'
import Link from 'next/link'

const socialPlatforms = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/Aritradutta2002',
    username: '@Aritradutta2002',
    description: 'Open source projects and code repositories',
    stats: '710+ contributions this year',
    color: 'from-gray-700 to-gray-900',
    bgColor: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/aritra-dutta-rick20/',
    username: 'Aritra Dutta',
    description: 'Professional network and career updates',
    stats: 'Software Engineer at TCS',
    color: 'from-blue-600 to-blue-800',
    bgColor: 'from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800'
  },
  {
    name: 'Twitter (X)',
    icon: Twitter,
    url: 'https://x.com/Aritra1Sept',
    username: '@Aritra1Sept',
    description: 'Tech updates, thoughts, and daily insights',
    stats: 'Follow for tech content and updates',
    color: 'from-sky-500 to-sky-700',
    bgColor: 'from-sky-100 to-sky-200 dark:from-sky-900 dark:to-sky-800'
  },
  {
    name: 'LeetCode',
    icon: Code2,
    url: 'https://leetcode.com/u/ari2002/',
    username: '@ari2002',
    description: 'Competitive programming and problem solving',
    stats: '1750 Rating • 500+ Problems Solved',
    color: 'from-orange-500 to-orange-700',
    bgColor: 'from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800'
  },
  {
    name: 'CSES',
    icon: Target,
    url: 'https://cses.fi/user/261539',
    username: 'User 261539',
    description: 'Competitive programming problem set',
    stats: 'Algorithm challenges and solutions',
    color: 'from-green-600 to-green-800',
    bgColor: 'from-green-100 to-green-200 dark:from-green-900 dark:to-green-800'
  },
  {
    name: 'Codeforces',
    icon: Zap,
    url: 'https://codeforces.com/profile/aritradutta2001',
    username: 'aritradutta2001',
    description: 'Competitive programming contests',
    stats: 'Contest participation and ratings',
    color: 'from-purple-600 to-purple-800',
    bgColor: 'from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800'
  }
]

export default function SocialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800 pt-20">
      <div className="container mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Connect With Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Follow my journey across different platforms - from coding challenges to professional updates
          </p>
        </motion.div>

        {/* Social Media Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {socialPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <motion.a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`block p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-transparent hover:bg-gradient-to-br ${platform.bgColor}`}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Platform Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${platform.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <platform.icon className="w-8 h-8 text-white" />
                </div>

                {/* Platform Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {platform.name}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300" />
                  </div>

                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {platform.username}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {platform.description}
                  </p>

                  <div className={`inline-block px-3 py-1 bg-gradient-to-r ${platform.color} text-white text-sm rounded-full font-medium`}>
                    {platform.stats}
                  </div>
                </div>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto border border-gray-200 dark:border-gray-700">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Let&apos;s Collaborate!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Interested in working together or discussing tech? Feel free to reach out on any of these platforms.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors duration-300"
            >
              Get In Touch
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
