'use client'

import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Award, Trophy, Code2, Target, Sparkles } from 'lucide-react'

const educationData = [
  {
    degree: 'B.Tech in ECE',
    institution: 'WBTU - College of Engineering',
    location: 'Kolkata, WB',
    duration: 'June 2024',
    grade: 'CGPA: 8.67',
    icon: GraduationCap
  },
  {
    degree: 'Higher Secondary (XII)',
    institution: 'WBCHSE',
    location: 'Kirnahar, WB',
    duration: '2020',
    grade: 'Percentage: 92%',
    icon: Award
  },
  {
    degree: 'Secondary (X)',
    institution: 'WBBSE',
    location: 'Kirnahar, WB',
    duration: '2018',
    grade: 'Percentage: 90.30%',
    icon: Award
  }
]

const achievements = [
  'LeetCode Weekly Contest ranking 3556 with max rating 1750',
  'Solved 500+ problems across LeetCode, CodeForces, and CodeChef',
  'Secured Global Rank 1046 in CodeForces Round 967 div 2',
  'CodeChef Rating 1604 (3-star)',
  'Solved over 100 problems in CSES CP sheet',
  'First Runner-up in District Level Youth Parliament'
]

export function About() {
  return (
    <section id="about" className="py-24 relative">
      {/* Enhanced Top Separator */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg className="w-full h-20" preserveAspectRatio="none" viewBox="0 0 1440 100">
          <defs>
            <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,20 Q360,5 720,20 T1440,20 L1440,0 L0,0 Z" fill="url(#aboutGradient)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 rounded-full"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get to know more about my journey, education, and achievements
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Journey
              </h3>
            </div>
            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="relative pl-6 border-l-4 border-blue-500"
              >
                Hello! I&apos;m <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Aritra Dutta</span>, a passionate Software Engineer currently working at 
                <span className="font-semibold text-blue-600 dark:text-blue-400"> Tata Consultancy Services (TCS)</span> 
                in Bhubaneswar, Odisha. At 23, I&apos;ve already embarked on an exciting journey in the world of technology.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="relative pl-6 border-l-4 border-purple-500"
              >
                Currently, I&apos;m undergoing comprehensive training in Thiruvananthapuram, Kerala, where I&apos;m diving deep into 
                <span className="font-semibold text-purple-600 dark:text-purple-400"> C++, MVC architecture, SQL, and PROC</span>. My focus extends to Java Full Stack development, building RESTful APIs 
                using Java, Spring Boot, and Hibernate.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="relative pl-6 border-l-4 border-pink-500"
              >
                What drives me is my love for <span className="font-semibold text-pink-600 dark:text-pink-400">
                competitive programming</span> and problem-solving. With over <span className="font-bold">500+ problems</span> solved across various platforms 
                and a LeetCode rating of <span className="font-bold text-green-600 dark:text-green-400">1750</span>, I constantly challenge myself to think algorithmically and write clean, 
                efficient code.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="relative pl-6 border-l-4 border-green-500"
              >
                Beyond coding, I enjoy playing video games, traveling to new places, and listening to music. 
                I believe in <span className="font-semibold text-green-600 dark:text-green-400">continuous learning</span> and am always eager to explore new technologies and methodologies.
              </motion.p>
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Education
              </h3>
            </div>
            <div className="space-y-6">
              {educationData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 hover:scale-105 group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {item.degree}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
                        {item.institution}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {item.duration}
                        </div>
                      </div>
                      <div className="mt-3 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-800 dark:text-blue-200 rounded-full text-sm font-semibold shadow-md">
                        <Trophy className="w-4 h-4 mr-1" />
                        {item.grade}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 dark:from-yellow-400 dark:via-orange-400 dark:to-red-400 bg-clip-text text-transparent mb-4">
              Key Achievements
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Milestones and accomplishments throughout my journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base font-medium pt-2">
                    {achievement}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Interests */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            When I&apos;m Not Coding
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🎮</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Gaming</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">✈️</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Traveling</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🎵</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Music</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">💡</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Learning</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
