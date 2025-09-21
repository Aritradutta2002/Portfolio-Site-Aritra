'use client'

import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react'

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
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              My Journey
            </h3>
            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Hello! I&apos;m Aritra Dutta, a passionate Software Engineer currently working at 
                <span className="font-semibold text-blue-600 dark:text-blue-400"> Tata Consultancy Services (TCS)</span> 
                in Bhubaneswar, Odisha. At 23, I&apos;ve already embarked on an exciting journey in the world of technology.
              </p>
              <p>
                Currently, I&apos;m undergoing comprehensive training in Thiruvananthapuram, Kerala, where I&apos;m diving deep into 
                C++, MVC architecture, SQL, and PROC. My focus extends to Java Full Stack development, building RESTful APIs 
                using Java, Spring Boot, and Hibernate.
              </p>
              <p>
                What drives me is my love for <span className="font-semibold text-purple-600 dark:text-purple-400">
                competitive programming</span> and problem-solving. With over 500+ problems solved across various platforms 
                and a LeetCode rating of 1750, I constantly challenge myself to think algorithmically and write clean, 
                efficient code.
              </p>
              <p>
                Beyond coding, I enjoy playing video games, traveling to new places, and listening to music. 
                I believe in continuous learning and am always eager to explore new technologies and methodologies.
              </p>
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Education
            </h3>
            <div className="space-y-6">
              {educationData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
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
                      <div className="mt-2 inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
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
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Key Achievements
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2"></div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
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
