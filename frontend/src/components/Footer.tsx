'use client'

import { motion } from 'framer-motion'
import { Heart, ArrowUp, Github, Linkedin, Code2, Mail, MapPin, Phone, Sparkles, Coffee, Rocket, Star } from 'lucide-react'
import { useState } from 'react'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/Aritradutta2002'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/aritra-dutta-rick20/'
  },
  {
    name: 'LeetCode',
    icon: Code2,
    url: 'https://leetcode.com/u/ari2002/'
  },
  {
    name: 'Email',
    icon: Mail,
    url: 'mailto:aritradutta049@gmail.com'
  }
]

export function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-950 dark:to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section with Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {/* Name with Sparkle Effect */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </motion.div>
              <h3 className="text-4xl font-black">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Aritra Dutta
                </span>
              </h3>
            </div>
            
            {/* Description with Better Typography */}
            <motion.p 
              className="text-gray-300 text-lg mb-8 leading-relaxed max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="font-semibold text-white">Passionate Software Engineer</span> at{' '}
              <span className="text-blue-400 font-semibold">TCS</span>, specializing in{' '}
              <span className="text-purple-400">Java Full Stack</span> development, 
              competitive programming, and building innovative solutions. Always eager to learn 
              and contribute to exciting projects.
            </motion.p>

            {/* Enhanced Social Links */}
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredSocial(social.name)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  className="relative group"
                >
                  <motion.div
                    className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl shadow-lg transition-all duration-300 group-hover:border-blue-500"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                  </motion.div>
                  
                  {/* Tooltip */}
                  {hoveredSocial === social.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 border border-gray-700 rounded-lg text-xs font-medium whitespace-nowrap"
                    >
                      {social.name}
                    </motion.div>
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <h4 className="text-xl font-bold text-white">Quick Links</h4>
            </div>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300"
                    whileHover={{ x: 8 }}
                  >
                    <motion.span
                      className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"
                    />
                    <span className="font-medium">{link.name}</span>
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Enhanced Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
              <h4 className="text-xl font-bold text-white">Get In Touch</h4>
            </div>
            <div className="space-y-4">
              <motion.a
                href="mailto:aritradutta049@gmail.com"
                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Email</p>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm font-medium">
                    aritradutta049@gmail.com
                  </p>
                </div>
              </motion.a>
              
              <motion.a
                href="tel:+916295699190"
                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Phone</p>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm font-medium">
                    +91 629569XXXX
                  </p>
                </div>
              </motion.a>
              
              <motion.div
                className="flex items-start gap-3 p-3 rounded-xl"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Location</p>
                  <p className="text-gray-300 text-sm font-medium">
                    Bhubaneswar, Odisha, India
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Premium Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-gray-800/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright with Animated Icons */}
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm font-medium">© 2024 Aritra Dutta. Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span className="text-sm font-medium">and lots of</span>
              <motion.span
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-base"
              >
                ☕
              </motion.span>
            </div>
            
            {/* Tech Stack Badges */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full">
                <Rocket className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold text-gray-300">Next.js</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full">
                <Code2 className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-semibold text-gray-300">TypeScript</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full">
                <Star className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-gray-300">Tailwind CSS</span>
              </div>
              
              {/* Scroll to Top Button */}
              <motion.button
                onClick={scrollToTop}
                className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg"
                whileHover={{ scale: 1.15, y: -4, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 text-white" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Achievement Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          <motion.div
            className="px-5 py-2.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/40 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🏆</span>
              <span className="text-sm font-bold text-yellow-400">LeetCode: 1750+</span>
            </div>
          </motion.div>
          
          <motion.div
            className="px-5 py-2.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">⭐</span>
              <span className="text-sm font-bold text-purple-400">CodeChef: 3-Star</span>
            </div>
          </motion.div>
          
          <motion.div
            className="px-5 py-2.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/40 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <span className="text-sm font-bold text-green-400">CodeForces Rank: 1046</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
