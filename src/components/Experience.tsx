'use client'

import { motion } from 'framer-motion'
import { MapPin, Calendar, Building, Code, Trophy } from 'lucide-react'

const experience = {
  company: 'Tata Consultancy Services',
  position: 'Assistant System Engineer',
  location: 'Bhubaneswar, IN',
  startDate: 'December 2024',
  endDate: 'Present',
  description:
    'Full Stack Java Developer: Currently contributing to an internal TCS project aimed at enhancing the Ultimatix platform. Proficiently utilizing Angular, Spring, Spring Boot, Django, and React for front-end and back-end development.',
  responsibilities: [
    'Contributing to Ultimatix platform enhancements as part of an internal TCS project',
    'Building and maintaining full-stack features using Angular and React for frontend',
    'Developing backend services with Java, Spring, and Spring Boot',
    'Integrating and maintaining services possibly using Django where applicable',
    'Collaborating with cross-functional teams to deliver enterprise-grade solutions'
  ],
  technologies: ['Angular', 'React', 'Java', 'Spring', 'Spring Boot', 'Django', 'SQL'],
  achievements: [
    'Contributing to enterprise product improvements',
    'Gaining hands-on experience in full-stack enterprise development'
  ]
}

// Training experience kept for future reference
// const trainingExperience = {
//   company: 'Tata Consultancy Services',
//   position: 'ILP Training (ITIS Technology)',
//   location: 'Thiruvananthapuram, IN',
//   startDate: 'September 2024',
//   endDate: 'November 2024',
//   description:
//     'Training at ITIS Technology: Developed a strong foundation in Windows and Unix systems, along with in-depth knowledge of Computer Networking and Advanced Networking principles. Additionally, enhanced business acumen and soft skills, including communication, teamwork, and problem-solving.'
// }

const skills = [
  { name: 'Java Full Stack Development', level: 85 },
  { name: 'Spring Boot & Hibernate', level: 80 },
  { name: 'RESTful API Development', level: 85 },
  { name: 'C++ Programming', level: 85 },
  { name: 'SQL & Database Management', level: 80 },
  { name: 'MVC Architecture', level: 90 }
]

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My journey in the software engineering industry
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8 shadow-xl"
          >
            {/* Company Header */}
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {experience.position}
                </h3>
                <p className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                  {experience.company}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {experience.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {experience.startDate} - {experience.endDate}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {experience.description}
            </p>

            {/* Responsibilities */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Key Responsibilities
              </h4>
              <ul className="space-y-3">
                {experience.responsibilities.map((responsibility, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3 text-gray-600 dark:text-gray-400"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{responsibility}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2" />
                Key Achievements
              </h4>
              <ul className="space-y-3">
                {experience.achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-3 text-gray-600 dark:text-gray-400"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Skills Progress */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Professional Skills Development
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Career Timeline */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Career Timeline
              </h4>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                          December 2024 - Present
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {experience.position} | {experience.company} — {experience.location}
                        </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      September 2024 - November 2024
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      ILP Training at ITIS Technology — Thiruvananthapuram, IN
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      2020-2024
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Focused on competitive programming and software development
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Work Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Professional Growth
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    3+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Months at TCS
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    5+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Technologies Learned
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                    100%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Training Completion
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                    24
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Team Collaboration
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
