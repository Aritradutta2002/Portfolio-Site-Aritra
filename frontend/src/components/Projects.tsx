'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Filter, X } from 'lucide-react'

type Project = {
  id: number
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: string
  image: string
  github: string
  demo: string
  featured?: boolean
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Algorithm Visualizer',
    description: 'Interactive platform for visualizing sorting algorithms including Bubble Sort, Merge Sort, Quick Sort, and Insertion Sort with dynamic animations.',
    longDescription: 'Developed a comprehensive platform for visualizing various sorting algorithms. The project helps students and developers understand how different sorting algorithms work through interactive visualizations. Features include speed controls, step-by-step execution, and comparison of algorithm performance.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web Development',
    image: '/project-algorithm.jpg',
    github: 'https://github.com/Aritradutta2002/new_Sorting_Visualizer',
    demo: '#',
    featured: true
  },
  {
    id: 2,
    title: 'HuffZip - File Compressor',
    description: 'Advanced file compression tool using Huffman Coding algorithm with visualization of the Huffman Tree construction process.',
    longDescription: 'Implemented the Huffman Coding algorithm for efficient file compression. The project includes a visualization tool that shows how the Huffman Tree is constructed step by step. Built with C++ for backend processing and JavaScript for creating interactive visualizations.',
    technologies: ['JavaScript', 'HTML', 'C++'],
    category: 'Desktop Application',
    image: '/project-huffzip.jpg',
    github: 'https://github.com/Aritradutta2002/File_Compressor',
    demo: '#',
    featured: true
  },
  {
    id: 3,
    title: 'ChatGPT Clone',
    description: 'Clean and intuitive web interface powered by Streamlit for interacting with GPT-4 model with customizable parameters.',
    longDescription: 'Created a ChatGPT clone using Streamlit in Python. Users can interact with the GPT-4 model through a simple and clean interface. Features include customizable temperature, max tokens, and other parameters for fine-tuning responses.',
    technologies: ['Python', 'Streamlit', 'OpenAI API'],
    category: 'AI/ML',
    image: '/project-chatgpt.jpg',
    github: 'https://github.com/Aritradutta2002/ChatGPT-clone',
    demo: '#',
    featured: false
  },
  {
    id: 4,
    title: 'LeetCode Directory',
    description: 'Comprehensive collection of LeetCode solutions with 537+ commits, organized by topics and difficulty levels.',
    longDescription: 'A well-organized repository containing solutions to various LeetCode problems. Each solution includes detailed explanations, time and space complexity analysis, and multiple approaches where applicable. The repository serves as a learning resource for competitive programming.',
    technologies: ['Java', 'Python', 'C++'],
    category: 'Competitive Programming',
    image: '/project-leetcode.jpg',
    github: 'https://github.com/Aritradutta2002/LeetCode-Directory',
    demo: '#',
    featured: true
  },
  {
    id: 5,
    title: 'TIC-TAC-TOE Game',
    description: 'Modern implementation of the classic Tic-Tac-Toe game built with Angular and TypeScript featuring responsive design.',
    longDescription: 'A modern take on the classic Tic-Tac-Toe game built using Angular and TypeScript. Features include responsive design, score tracking, and smooth animations. The game implements optimal AI strategy and provides an engaging user experience.',
    technologies: ['Angular', 'TypeScript', 'CSS'],
    category: 'Web Development',
    image: '/project-tictactoe.jpg',
    github: 'https://github.com/Aritradutta2002/TIC-TAC-TOE-GAME',
    demo: '#',
    featured: false
  },
  {
    id: 6,
    title: 'SpringBoot Application',
    description: 'First SpringBoot application demonstrating RESTful APIs, database integration, and modern Java backend development practices.',
    longDescription: 'My first SpringBoot application showcasing RESTful API development, database integration with JPA/Hibernate, and modern Java backend development practices. The project includes proper error handling, validation, and follows Spring Boot best practices.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'JPA'],
    category: 'Backend Development',
    image: '/project-springboot.jpg',
    github: 'https://github.com/Aritradutta2002/First-SpringBoot-App',
    demo: '#',
    featured: false
  }
]

const categories = ['All', 'Web Development', 'Desktop Application', 'AI/ML', 'Competitive Programming', 'Backend Development']

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  // Featured projects kept for future reference
  // const featuredProjects = projects.filter(project => project.featured)

  return (
    <section id="projects" className="py-24 relative">
      {/* Enhanced Top Separator */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg className="w-full h-20" preserveAspectRatio="none" viewBox="0 0 1440 100">
          <defs>
            <linearGradient id="projectsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
              <stop offset="50%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.3 }} />
              <stop offset="100%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <path d="M0,25 Q360,10 720,25 T1440,25 L1440,0 L0,0 Z" fill="url(#projectsGradient)" />
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
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Here are some of the projects I&apos;ve worked on, showcasing my skills in various technologies
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
            >
              <Filter className="w-4 h-4 inline-block mr-2" />
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 to-purple-900 overflow-hidden">
                {/* Fallback gradient background with icon */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                  <div className="text-6xl opacity-30">
                    {project.category === 'Web Development' && '🌐'}
                    {project.category === 'Desktop Application' && '💻'}
                    {project.category === 'AI/ML' && '🤖'}
                    {project.category === 'Competitive Programming' && '🏆'}
                    {project.category === 'Backend Development' && '⚙️'}
                  </div>
                </div>
                
                {/* Project preview mockup */}
                <div className="absolute inset-4 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="text-2xl mb-2">
                      {project.category === 'Web Development' && '🌐'}
                      {project.category === 'Desktop Application' && '💻'}
                      {project.category === 'AI/ML' && '🤖'}
                      {project.category === 'Competitive Programming' && '🏆'}
                      {project.category === 'Backend Development' && '⚙️'}
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {project.title}
                    </div>
                  </div>
                </div>
                
                {/* Overlay with links */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </a>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
                  >
                    <ExternalLink className="w-6 h-6 text-white" />
                  </button>
                </div>

                {project.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Category */}
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {project.category}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
                >
                  <Github className="w-5 h-5 mr-2" />
                  View Code
                </a>
                {selectedProject.demo !== '#' && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* GitHub Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            GitHub Activity
          </h3>
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">710+</div>
                <div className="text-gray-600 dark:text-gray-400">Contributions This Year</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">6+</div>
                <div className="text-gray-600 dark:text-gray-400">Public Repositories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">537+</div>
                <div className="text-gray-600 dark:text-gray-400">Total Commits</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
