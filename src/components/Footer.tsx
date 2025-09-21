'use client'

import { motion } from 'framer-motion'
import { Heart, ArrowUp, Github, Linkedin, Code2, Mail } from 'lucide-react'

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
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Aritra Dutta
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Passionate Software Engineer at TCS, specializing in Java Full Stack development, 
              competitive programming, and building innovative solutions. Always eager to learn 
              and contribute to exciting projects.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-2 transform"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Get In Touch</h4>
            <div className="space-y-3">
              <a
                href="mailto:aritradutta049@gmail.com"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                aritradutta049@gmail.com
              </a>
              <a
                href="tel:+916295699190"
                className="block text-gray-300 hover:text-white transition-colors duration-200"
              >
                +91 629569XXXX
              </a>
              <p className="text-gray-400">
                Bhubaneswar, Odisha, India
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center text-gray-400 mb-4 md:mb-0">
            <span>© 2024 Aritra Dutta. Made with</span>
            <Heart className="w-4 h-4 mx-1 text-red-500" />
            <span>and lots of ☕</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <span className="text-gray-400 text-sm">
              Built with Next.js, TypeScript & Tailwind CSS
            </span>
            <motion.button
              onClick={scrollToTop}
              className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Achievement Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full">
            <span className="text-sm font-medium text-blue-400">
              🏆 LeetCode Rating: 1750+ | CodeChef: 3⭐ | CodeForces Global Rank: 1046
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
