'use client'

import { motion } from 'framer-motion'
import { Code, Database, Globe, Server } from 'lucide-react'

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: [
      { name: 'Java', level: 96, color: 'from-orange-400 to-orange-600' },
      { name: 'JavaScript', level: 85, color: 'from-yellow-400 to-yellow-600' },
      { name: 'TypeScript', level: 80, color: 'from-blue-400 to-blue-600' },
      { name: 'C++', level: 85, color: 'from-purple-400 to-purple-600' },
      { name: 'Python', level: 75, color: 'from-green-400 to-green-600' }
    ]
  },
  {
    title: 'Frameworks & Libraries',
    icon: Globe,
    skills: [
      { name: 'Spring Boot', level: 90, color: 'from-green-500 to-green-700' },
      { name: 'Angular', level: 85, color: 'from-red-500 to-red-700' },
      { name: 'React', level: 75, color: 'from-cyan-400 to-cyan-600' },
      { name: 'Hibernate', level: 80, color: 'from-brown-400 to-brown-600' },
      { name: 'Express.js', level: 70, color: 'from-gray-400 to-gray-600' }
    ]
  },
  {
    title: 'Databases & Tools',
    icon: Database,
    skills: [
      { name: 'MySQL', level: 85, color: 'from-blue-500 to-blue-700' },
      { name: 'PostgreSQL', level: 75, color: 'from-indigo-400 to-indigo-600' },
      { name: 'Git & GitHub', level: 90, color: 'from-gray-700 to-gray-900' },
      { name: 'Docker', level: 70, color: 'from-blue-400 to-blue-600' },
      { name: 'Linux/UNIX', level: 75, color: 'from-orange-500 to-orange-700' }
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: Server,
    skills: [
      { name: 'AWS', level: 65, color: 'from-orange-400 to-orange-600' },
      { name: 'REST APIs', level: 85, color: 'from-green-400 to-green-600' },
      { name: 'MVC Architecture', level: 90, color: 'from-purple-400 to-purple-600' },
      { name: 'Microservices', level: 70, color: 'from-blue-400 to-blue-600' }
    ]
  }
]

const certifications = [
  'Problem Solving (Intermediate) - HackerRank',
  'The Complete Python Pro Bootcamp - Udemy',
  'Object Oriented Programming in Java - Coursera',
  'Full Stack Java: JAVA + JSP + SPRING + BOOT + JS + REACT - Udemy'
]

type Skill = {
  name: string
  level: number
  color: string
}

function SkillBar({ skill, index }: { skill: Skill, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      {/* Enhanced Top Separator */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg className="w-full h-20" preserveAspectRatio="none" viewBox="0 0 1440 100">
          <defs>
            <linearGradient id="skillsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgb(37, 99, 235)', stopOpacity: 0.1 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(37, 99, 235)', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(37, 99, 235)', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,30 Q360,15 720,30 T1440,30 L1440,0 L0,0 Z" fill="url(#skillsGradient)" />
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Competitive Programming Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Competitive Programming
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">1750</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">LeetCode Rating</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">Max Rating</div>
            </div>
            <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-8 rounded-2xl">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">1604</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">CodeChef Rating</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">3-Star</div>
            </div>
            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">Problems Solved</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">Multiple Platforms</div>
            </div>
            <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-8 rounded-2xl">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">1046</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">CodeForces Rank</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">Global Rank</div>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">
            Certifications
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mr-4 flex-shrink-0"></div>
                  <p className="text-gray-700 dark:text-gray-300 text-left leading-relaxed">
                    {cert}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
