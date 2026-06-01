'use client'

import { motion } from 'framer-motion'
import { Heart, ArrowUp, Github, Linkedin, Code2, Mail, MapPin, Phone, Rocket, Star } from 'lucide-react'
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
    <footer className="relative border-t border-white/5 bg-background/60 overflow-hidden backdrop-blur-xl text-white mt-10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"
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
          className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"
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
            {/* Name */}
            <div className="mb-1">
              <h3 className="text-3xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent glow">
                  Aritra
                </span>
                <span className="text-white ml-2 glow">Dutta</span>
              </h3>
              <div className="flex items-center gap-2 mt-2 mb-4">
                <div className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
                <div className="h-0.5 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
              </div>
            </div>

            {/* Description */}
            <motion.p
              className="text-[14px] text-gray-400 mb-7 leading-relaxed max-w-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <span className="font-bold text-gray-200">Passionate Software Engineer</span> at{' '}
              <span className="text-primary font-bold">TCS</span>, specializing in{' '}
              <span className="text-secondary font-bold">Java Full Stack</span> development,
              competitive programming, and building innovative solutions. Always eager to learn
              and contribute to exciting projects.
            </motion.p>

            {/* Social icon buttons — matching site style */}
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredSocial(social.name)}
                  onHoverEnd={() => setHoveredSocial(null)}
                  className="relative group"
                >
                  <motion.div
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:text-primary transition-all duration-200 shadow-md group-hover:shadow-neon-purple"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.93 }}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.div>

                  {/* Tooltip */}
                  {hoveredSocial === social.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-900 border border-white/10 rounded-lg text-[11px] font-medium whitespace-nowrap text-gray-200 shadow-xl"
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
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full shadow-neon-purple"></div>
              <h4 className="text-xl font-bold text-white tracking-tight">Quick Links</h4>
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
                      className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mr-3 group-hover:scale-150 transition-transform duration-300 shadow-neon-purple"
                    />
                    <span className="font-bold">{link.name}</span>
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
              <div className="w-1 h-6 bg-gradient-to-b from-emerald-400 to-teal-400 rounded-full shadow-neon-cyan"></div>
              <h4 className="text-xl font-bold text-white tracking-tight">Get In Touch</h4>
            </div>
            <div className="space-y-4">
              <motion.a
                href="mailto:aritradutta049@gmail.com"
                className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-neon-purple">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Email</p>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm font-bold mt-0.5">
                    aritradutta049@gmail.com
                  </p>
                </div>
              </motion.a>
              
              <motion.a
                href="tel:+916295699190"
                className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                whileHover={{ x: 4 }}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-neon-cyan">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Phone</p>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm font-bold mt-0.5">
                    +91 629569XXXX
                  </p>
                </div>
              </motion.a>
              
              <motion.div
                className="flex items-start gap-3 p-3 rounded-2xl"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Location</p>
                  <p className="text-gray-300 text-sm font-bold mt-0.5">
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
          className="mt-16 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright with Animated Icons */}
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm font-bold">© 2024 Aritra Dutta. Made with</span>
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
                <Heart className="w-4 h-4 text-rose-500 fill-current" />
              </motion.div>
              <span className="text-sm font-bold">and lots of</span>
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
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <Rocket className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-gray-300">Next.js</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <Code2 className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-gray-300">TypeScript</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                <Star className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-gray-300">Tailwind CSS</span>
              </div>
              
              {/* Scroll to Top Button */}
              <motion.button
                onClick={scrollToTop}
                className="p-3 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg shadow-neon-purple hover:shadow-neon-cyan transition-shadow duration-300 group"
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform" />
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
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          <motion.div
            className="px-6 py-3 bg-white/5 border border-amber-500/30 rounded-full backdrop-blur-sm shadow-lg hover:shadow-neon-orange hover:border-amber-500/60 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🏆</span>
              <span className="text-sm font-bold text-amber-400 glow">LeetCode: 1750+</span>
            </div>
          </motion.div>
          
          <motion.div
            className="px-6 py-3 bg-white/5 border border-primary/30 rounded-full backdrop-blur-sm shadow-lg hover:shadow-neon-purple hover:border-primary/60 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg">⭐</span>
              <span className="text-sm font-bold text-primary glow">CodeChef: 3-Star</span>
            </div>
          </motion.div>
          
          <motion.div
            className="px-6 py-3 bg-white/5 border border-emerald-500/30 rounded-full backdrop-blur-sm shadow-lg hover:shadow-neon-cyan hover:border-emerald-500/60 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-lg">🎯</span>
              <span className="text-sm font-bold text-emerald-400 glow">CodeForces Rank: 1046</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
