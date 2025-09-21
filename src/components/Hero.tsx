'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown, Download, Mail, Github, Linkedin, Code2, Target, Zap } from 'lucide-react'

export function Hero() {
  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 pt-24">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10"></div>
        
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-purple-400/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/15 to-pink-400/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-2xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-20">
        <div className="text-center">
          {/* Enhanced Profile Image with Premium Effects */}
          <motion.div
            className="mb-20"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
          >
            <div className="relative group">
              {/* Outer Glow Ring */}
              <motion.div
                className="absolute inset-0 w-72 h-72 rounded-full bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 -m-10 blur-xl"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Middle Glow Ring */}
              <motion.div
                className="absolute inset-0 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-400/25 via-blue-400/25 to-purple-400/25 -m-6 blur-lg"
                animate={{
                  scale: [1.1, 1, 1.1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [360, 180, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Premium Profile Container */}
              <div className="relative w-56 h-56 mx-auto group-hover:scale-105 transition-all duration-700">
                {/* Gradient Border Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 p-2">
                    {/* Inner Gradient Border */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/50 dark:via-purple-900/50 dark:to-pink-900/50 p-1">
                      {/* Image Container */}
                      <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner">
                        <Image
                          src="/aritra-profile-picture.png"
                          alt="Aritra Dutta - System Engineer"
                          width={224}
                          height={224}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          priority
                          onError={() => console.log('Profile image failed to load')}
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Rotating Outer Ring */}
                <motion.div
                  className="absolute -inset-3 rounded-full border-2 border-dashed border-blue-400/60 dark:border-blue-300/60"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Counter-Rotating Inner Ring */}
                <motion.div
                  className="absolute -inset-1 rounded-full border border-purple-400/40 dark:border-purple-300/40"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              {/* Enhanced Floating Particles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: `linear-gradient(45deg, ${
                      ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1'][i]
                    }, ${
                      ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1', '#3b82f6'][i]
                    })`,
                    top: `${30 + Math.sin(i * Math.PI / 4) * 70}%`,
                    left: `${50 + Math.cos(i * Math.PI / 4) * 70}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: [0.5, 1.5, 0.5],
                    opacity: [0.3, 1, 0.3],
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                />
              ))}
              
              {/* Sparkle Effects */}
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    top: `${25 + Math.sin(i * Math.PI / 2) * 50}%`,
                    left: `${50 + Math.cos(i * Math.PI / 2) * 50}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Enhanced Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
              <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-700 dark:from-white dark:via-blue-200 dark:to-purple-300 bg-clip-text text-transparent animate-float leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hi, I&apos;m <span className="gradient-text relative">
                Aritra
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </span>
            </motion.h1>
            
            <motion.h2 
              className="text-2xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-400 mb-8 font-light tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              System Engineer at <span className="font-semibold text-blue-600 dark:text-blue-400 relative">
                TCS
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                />
              </span>
            </motion.h2>
            
            <motion.div 
              className="mb-16 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                Passionate coder & problem solver building robust software, keen on clean code, algorithms, and technology.
              </p>
            </motion.div>

            {/* Enhanced Action Buttons */}
            <motion.div 
              className="mb-48 mt-12 flex flex-col sm:flex-row gap-8 lg:gap-12 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.button
                className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-xl font-medium text-base shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const aboutSection = document.querySelector('#about')
                  if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Button text */}
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  More About Me
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500 -z-10"></div>
              </motion.button>

              {/* Scroll Down Icon - Between Buttons */}
              <motion.button
                onClick={scrollToNext}
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.button>

              {/* Resume Download Button */}
              <motion.a
                href="/RESUME-ARITRA.pdf"
                download="Aritra_Dutta_Resume.pdf"
                className="group relative px-8 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-xl font-medium text-base shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                {/* Button text */}
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-5 h-5 group-hover:animate-bounce transition-transform duration-300" />
                  Download Resume
                </span>
                
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500 -z-10"></div>
              </motion.a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
