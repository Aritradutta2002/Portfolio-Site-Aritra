'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Skill {
  name: string
  level: number
  color: string
  icon: string
  category: string
  description: string
}

const skills: Skill[] = [
  { name: 'Java', level: 96, color: '#f89820', icon: '☕', category: 'Backend', description: 'Enterprise applications, Spring ecosystem' },
  { name: 'JavaScript', level: 85, color: '#f7df1e', icon: '🟨', category: 'Frontend', description: 'Modern ES6+, async programming' },
  { name: 'TypeScript', level: 80, color: '#3178c6', icon: '🔷', category: 'Frontend', description: 'Type-safe development, large codebases' },
  { name: 'React', level: 75, color: '#61dafb', icon: '⚛️', category: 'Frontend', description: 'Component-based UI, hooks, context' },
  { name: 'Next.js', level: 78, color: '#000000', icon: '▲', category: 'Frontend', description: 'Full-stack React framework' },
  { name: 'Angular', level: 85, color: '#dd0031', icon: '🅰️', category: 'Frontend', description: 'Enterprise web applications' },
  { name: 'Spring Boot', level: 90, color: '#6db33f', icon: '🍃', category: 'Backend', description: 'Microservices, REST APIs' },
  { name: 'Python', level: 75, color: '#3776ab', icon: '🐍', category: 'Backend', description: 'Data analysis, automation, AI/ML' },
  { name: 'C++', level: 85, color: '#00599c', icon: '⚡', category: 'Programming', description: 'Competitive programming, algorithms' },
  { name: 'MySQL', level: 85, color: '#4479a1', icon: '🗄️', category: 'Database', description: 'Relational databases, optimization' },
  { name: 'PostgreSQL', level: 75, color: '#336791', icon: '🐘', category: 'Database', description: 'Advanced SQL, performance tuning' },
  { name: 'Docker', level: 70, color: '#2496ed', icon: '🐳', category: 'DevOps', description: 'Containerization, deployment' },
  { name: 'AWS', level: 65, color: '#ff9900', icon: '☁️', category: 'Cloud', description: 'Cloud infrastructure, serverless' },
  { name: 'Git', level: 90, color: '#f05032', icon: '📝', category: 'Tools', description: 'Version control, collaboration' },
  { name: 'Linux', level: 75, color: '#fcc624', icon: '🐧', category: 'System', description: 'Server administration, scripting' },
  { name: 'Tailwind', level: 82, color: '#06b6d4', icon: '🎨', category: 'Frontend', description: 'Utility-first CSS framework' }
]

const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Cloud', 'Tools', 'System', 'Programming']

export function SkillWheel() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)

  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  const radius = 200
  const centerX = 275
  const centerY = 275

  const spinWheel = () => {
    setIsSpinning(true)
    const newRotation = rotation + 360 + Math.random() * 720
    setRotation(newRotation)
    setTimeout(() => setIsSpinning(false), 2000)
  }

  const getSkillPosition = (index: number, total: number) => {
    const angle = (index * 360) / total - 90 + rotation
    const radian = (angle * Math.PI) / 180
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian),
      angle: angle
    }
  }

  const getSkillSize = (level: number) => {
    return 28 + (level / 100) * 32 // Size between 28-60px based on skill level
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Skills Universe
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Explore my technical skills in an interactive cosmic wheel. Click on any skill to learn more!
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-700/70 backdrop-blur-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="flex flex-col xl:flex-row items-center justify-center gap-16 xl:gap-20 pb-24">
          {/* Skill Wheel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-[550px] h-[550px] mx-auto">
              {/* Outer Rings - Enhanced */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-blue-200/40 dark:border-blue-800/40 shadow-2xl"
                animate={{ rotate: rotation * 0.1 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                  background: 'conic-gradient(from 0deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))'
                }}
              />
              <motion.div
                className="absolute inset-12 rounded-full border-2 border-purple-200/25 dark:border-purple-800/25"
                animate={{ rotate: -rotation * 0.15 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-20 rounded-full border border-pink-200/15 dark:border-pink-800/15"
                animate={{ rotate: rotation * 0.2 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />

              {/* Center Hub - Enhanced */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border-3 border-white/20 dark:border-gray-800/20"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                onClick={spinWheel}
                animate={{ 
                  boxShadow: [
                    "0 0 30px rgba(59, 130, 246, 0.6)",
                    "0 0 60px rgba(147, 51, 234, 0.6)",
                    "0 0 30px rgba(236, 72, 153, 0.6)",
                    "0 0 60px rgba(59, 130, 246, 0.6)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: isSpinning ? 360 : 0 }}
                  transition={{ duration: 0.5, repeat: isSpinning ? Infinity : 0 }}
                  className="text-3xl text-white"
                >
                  ⚡
                </motion.div>
              </motion.div>

              {/* Skills */}
              <AnimatePresence mode="wait">
                {filteredSkills.map((skill, index) => {
                  const position = getSkillPosition(index, filteredSkills.length)
                  const size = getSkillSize(skill.level)
                  
                  return (
                    <motion.div
                      key={`${skill.name}-${selectedCategory}`}
                      className={`absolute cursor-pointer group ${selectedSkill?.name === skill.name ? 'ring-4 ring-white/50 ring-offset-2 ring-offset-transparent' : ''}`}
                      style={{
                        left: position.x - size/2,
                        top: position.y - size/2,
                        width: size,
                        height: size,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        rotate: isSpinning ? rotation : 0
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ 
                        duration: isSpinning ? 2 : 0.5, 
                        delay: index * 0.1,
                        ease: isSpinning ? "easeOut" : "easeInOut"
                      }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      onClick={() => setSelectedSkill(skill)}
                    >
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center text-white font-bold shadow-2xl transition-all duration-300 group-hover:shadow-3xl border-2 border-white/20"
                        style={{ 
                          backgroundColor: skill.color,
                          fontSize: `${size * 0.4}px`,
                          boxShadow: `0 0 20px ${skill.color}40`
                        }}
                      >
                        <span className="group-hover:scale-125 transition-transform duration-300">
                          {skill.icon}
                        </span>
                      </div>
                      
                      {/* Skill Level Ring */}
                      <div 
                        className="absolute inset-0 rounded-full border-3 border-white/40 group-hover:border-white/80 transition-all duration-300"
                        style={{
                          borderWidth: `${Math.max(2, skill.level / 25)}px`
                        }}
                      />
                      
                      {/* Tooltip - Enhanced */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-20 shadow-xl border border-white/20">
                        <div className="font-semibold">{skill.name}</div>
                        <div className="text-xs text-gray-300">{skill.level}% Proficiency</div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {/* Subtle Connecting Lines - Only for Selected Skill */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {selectedSkill && filteredSkills.map((skill, index) => {
                  if (skill.name !== selectedSkill.name) return null
                  const position = getSkillPosition(index, filteredSkills.length)
                  return (
                    <motion.line
                      key={`line-${skill.name}-${selectedCategory}`}
                      x1={centerX}
                      y1={centerY}
                      x2={position.x}
                      y2={position.y}
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      opacity="0.4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                  )
                })}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Spin Button - Compact & Elegant - Fixed Position */}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2">
              <motion.button
                onClick={spinWheel}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSpinning}
                animate={{
                  boxShadow: [
                    "0 4px 15px rgba(59, 130, 246, 0.2)",
                    "0 4px 15px rgba(147, 51, 234, 0.2)",
                    "0 4px 15px rgba(236, 72, 153, 0.2)",
                    "0 4px 15px rgba(59, 130, 246, 0.2)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isSpinning ? '🌀 Spinning...' : '🎯 Spin Wheel'}
              </motion.button>
            </div>
          </motion.div>

          {/* Skill Details Panel - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="w-full xl:w-[450px] flex-shrink-0"
          >
            <AnimatePresence mode="wait">
              {selectedSkill ? (
                <motion.div
                  key={selectedSkill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20"
                >
                  <div className="flex items-center mb-6">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mr-4 shadow-lg"
                      style={{ backgroundColor: selectedSkill.color }}
                    >
                      {selectedSkill.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedSkill.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedSkill.category}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Proficiency Level
                      </span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {selectedSkill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: selectedSkill.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.level}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedSkill.description}
                  </p>

                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="mt-6 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    Close Details
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/20 text-center"
                >
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Explore My Skills
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Click on any skill in the wheel to see detailed information about my proficiency and experience.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <div className="font-semibold text-blue-700 dark:text-blue-300">
                        {skills.length}
                      </div>
                      <div className="text-blue-600 dark:text-blue-400">
                        Technologies
                      </div>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                      <div className="font-semibold text-purple-700 dark:text-purple-300">
                        {categories.length - 1}
                      </div>
                      <div className="text-purple-600 dark:text-purple-400">
                        Categories
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
