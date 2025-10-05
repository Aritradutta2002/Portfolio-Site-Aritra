'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown, Download } from 'lucide-react'
import { useState, useEffect } from 'react'

const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;
    const current = texts[currentIndex] ?? '';

    const typingSpeed = isDeleting ? 50 : 100;

    const handle = setTimeout(() => {
      if (!mounted) return;

      if (!isDeleting && charIndex < current.length) {
        setCurrentText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else if (!isDeleting && charIndex === current.length) {
        // pause before deleting
        setTimeout(() => {
          if (mounted) setIsDeleting(true);
        }, 2000);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentIndex((i) => (i + 1) % texts.length);
      }
    }, typingSpeed);

    return () => {
      mounted = false;
      clearTimeout(handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charIndex, currentIndex, isDeleting, texts]);

  return (
    <div className="relative min-h-[100px] sm:min-h-[120px] lg:min-h-[140px] flex items-center justify-center px-4">
      <motion.div
        className="flex flex-col items-center space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Greeting text */}
        <motion.span 
          className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-400 font-light"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hi, I'm Aritra
        </motion.span>

        {/* Main typewriter container */}
        <div className="flex items-center">
          {/* "I'm a" prefix - static */}
          <span className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-800 dark:text-gray-200 mr-4">
            I'm a
          </span>

          {/* Animated typewriter text */}
          <div className="relative">
            <span className="inline-block text-4xl sm:text-5xl lg:text-7xl font-black" aria-label={currentText || 'role'}>
              <span
                className="bg-clip-text text-transparent relative"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #feca57 75%, #ff6b6b 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 20px rgba(102, 126, 234, 0.3))',
                  textShadow: '0 0 40px rgba(102, 126, 234, 0.4)'
                }}
              >
                {currentText || '\u00A0'}
              </span>
            </span>

            {/* Premium caret */}
            <motion.span
              aria-hidden
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-1 sm:w-1.5 h-10 sm:h-12 lg:h-14 ml-2 align-middle"
              style={{
                background: 'linear-gradient(180deg, #667eea, #f093fb)',
                boxShadow: '0 0 20px rgba(102, 126, 234, 0.6), 0 0 40px rgba(240, 147, 251, 0.4)',
                borderRadius: '2px'
              }}
            />
          </div>
        </div>

        {/* Decorative underline */}
        <motion.div
          className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full mt-4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '200px', opacity: 0.6 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
    </div>
  );
};

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
            className="mb-16"
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
                          alt="Aritra Dutta - Software Engineer"
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

          {/* Enhanced Main Content with Better Spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Premium Typewriter Effect */}
            <TypewriterText 
              texts={[
                "Full Stack Developer",
                "Problem Solver",
                "Tech Innovator"
              ]}
            />

            {/* Subtitle with enhanced styling and spacing */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 font-medium max-w-3xl mx-auto px-4 mt-8"
            >
              Building robust enterprise solutions at{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-bold">
                TCS
              </span>
              {' '}with a passion for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 font-bold">
                competitive programming
              </span>
            </motion.p>

            {/* Enhanced Action Buttons with Perfect Spacing */}
            <motion.div 
              className="mt-12 mb-24 flex flex-col sm:flex-row gap-5 lg:gap-6 justify-center items-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-white/20"
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
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-5 h-5 transition-transform duration-300 text-amber-400 dark:text-amber-300 group-hover:text-amber-300" viewBox="0 0 24 24" aria-hidden>
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" fill="currentColor"/>
                  </svg>
                  About Me
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 text-amber-400 dark:text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-500 -z-10"></div>
              </motion.button>

              {/* Scroll Down Icon - Between Buttons */}
              <motion.button
                onClick={scrollToNext}
                className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-6 h-6 text-amber-400 dark:text-amber-300" />
                </motion.div>
              </motion.button>

              {/* Resume Download Button */}
              <motion.a
                href="/RESUME-ARITRA.pdf"
                download="Aritra_Dutta_Resume.pdf"
                className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-2xl font-semibold text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-white/20"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated background overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Button text */}
                <span className="relative z-10 flex items-center gap-3">
                  <Download className="w-5 h-5 text-amber-400 dark:text-amber-300 group-hover:animate-bounce" />
                  Download Resume
                </span>

                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-500 -z-10"></div>
              </motion.a>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}