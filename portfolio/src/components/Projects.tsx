'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X, Sparkles, GitBranch, Star, GitCommit } from 'lucide-react'

type Project = {
  id: number
  title: string
  description: string
  longDescription: string
  technologies: string[]
  category: string
  github: string
  demo: string
  featured?: boolean
}

const categoryEmoji: Record<string, string> = {
  'Web Development': '🌐',
  'Desktop Application': '💻',
  'AI/ML': '🤖',
  'Competitive Programming': '🏆',
  'Backend Development': '⚙️',
}

const categoryColor: Record<string, string> = {
  'Web Development':        'from-cyan-500 to-blue-500',
  'Desktop Application':    'from-violet-500 to-purple-500',
  'AI/ML':                  'from-pink-500 to-rose-500',
  'Competitive Programming':'from-amber-500 to-orange-500',
  'Backend Development':    'from-emerald-500 to-teal-500',
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AlgoGuru – Programming Learning Platform',
    description: 'Full-stack competitive programming platform featuring a Java Playground, role-based authentication, and interactive problem sets.',
    longDescription: 'Designed, built, and deployed a full-stack competitive programming platform end-to-end — live at algoguru.online with a custom purchased domain and production deployment. Features a Java Playground, role-based authentication, user progress tracking, and interactive problem sets. Sole developer responsible for the complete product lifecycle — from architecture and implementation to deployment.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Java'],
    category: 'Web Development',
    github: 'https://github.com/Aritradutta2002',
    demo: 'https://algoguru.online',
    featured: true,
  },
  {
    id: 2,
    title: 'Algorithm Visualizer',
    description: 'Interactive platform for visualizing sorting algorithms including Bubble Sort, Merge Sort, Quick Sort, and Insertion Sort with dynamic animations.',
    longDescription: 'Developed a comprehensive platform for visualizing various sorting algorithms. The project helps students and developers understand how different sorting algorithms work through interactive visualizations. Features include speed controls, step-by-step execution, and comparison of algorithm performance.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web Development',
    github: 'https://github.com/Aritradutta2002/new_Sorting_Visualizer',
    demo: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'HuffZip - File Compressor',
    description: 'Advanced file compression tool using Huffman Coding algorithm with visualization of the Huffman Tree construction process.',
    longDescription: 'Implemented the Huffman Coding algorithm for efficient file compression. The project includes a visualization tool that shows how the Huffman Tree is constructed step by step. Built with C++ for backend processing and JavaScript for creating interactive visualizations.',
    technologies: ['JavaScript', 'HTML', 'C++'],
    category: 'Desktop Application',
    github: 'https://github.com/Aritradutta2002/File_Compressor',
    demo: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'ChatGPT Clone',
    description: 'Clean and intuitive web interface powered by Streamlit for interacting with GPT-4 model with customizable parameters.',
    longDescription: 'Created a ChatGPT clone using Streamlit in Python. Users can interact with the GPT-4 model through a simple and clean interface. Features include customizable temperature, max tokens, and other parameters for fine-tuning responses.',
    technologies: ['Python', 'Streamlit', 'OpenAI API'],
    category: 'AI/ML',
    github: 'https://github.com/Aritradutta2002/ChatGPT-clone',
    demo: '#',
  },
  {
    id: 5,
    title: 'LeetCode Directory',
    description: 'Comprehensive collection of LeetCode solutions with 537+ commits, organized by topics and difficulty levels.',
    longDescription: 'A well-organized repository containing solutions to various LeetCode problems. Each solution includes detailed explanations, time and space complexity analysis, and multiple approaches where applicable.',
    technologies: ['Java', 'Python', 'C++'],
    category: 'Competitive Programming',
    github: 'https://github.com/Aritradutta2002/LeetCode-Directory',
    demo: '#',
    featured: true,
  },
  {
    id: 6,
    title: 'TIC-TAC-TOE Game',
    description: 'Modern implementation of the classic Tic-Tac-Toe game built with Angular and TypeScript featuring responsive design.',
    longDescription: 'A modern take on the classic Tic-Tac-Toe game built using Angular and TypeScript. Features include responsive design, score tracking, and smooth animations.',
    technologies: ['Angular', 'TypeScript', 'CSS'],
    category: 'Web Development',
    github: 'https://github.com/Aritradutta2002/TIC-TAC-TOE-GAME',
    demo: '#',
  },
  {
    id: 7,
    title: 'SpringBoot Application',
    description: 'First SpringBoot application demonstrating RESTful APIs, database integration, and modern Java backend development practices.',
    longDescription: 'My first SpringBoot application showcasing RESTful API development, database integration with JPA/Hibernate, and modern Java backend development practices.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'JPA'],
    category: 'Backend Development',
    github: 'https://github.com/Aritradutta2002/First-SpringBoot-App',
    demo: '#',
  },
]

const categories = ['All', 'Web Development', 'Desktop Application', 'AI/ML', 'Competitive Programming', 'Backend Development']

const githubStats = [
  { value: '554+', label: 'Problems Solved', icon: Star,      color: 'from-emerald-600 to-emerald-400' },
  { value: '1672', label: 'LeetCode Rating', icon: GitBranch, color: 'from-blue-600 to-blue-400' },
  { value: '1708', label: 'CodeChef Rating', icon: GitCommit, color: 'from-violet-600 to-violet-400' },
]

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/70 dark:border-blue-500/25 text-blue-700 dark:text-blue-300 text-[13px] font-medium mb-4"
          >
            <Sparkles size={12} />
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
            Featured Projects
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
          </div>
          <p className="text-base text-gray-400 max-w-2xl mx-auto font-mono text-[13px]">
            &gt; Projects showcasing my skills across various technologies and domains
          </p>
        </motion.div>

        {/* ── Filter Pills ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[13px] font-mono transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-primary/20 text-white shadow-neon-purple border border-primary/50'
                  : 'glass-panel text-gray-400 border border-white/5 hover:border-secondary/50 hover:text-secondary hover:shadow-neon-cyan'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Projects Grid ───────────────────────────────── */}
        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
          {filteredProjects.map((project, index) => {
            const gradColor = categoryColor[project.category] ?? 'from-blue-500 to-violet-500'
            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                viewport={{ once: true }}
                className="glass-galaxy rounded-3xl overflow-hidden group hover:shadow-neon-purple hover:-translate-y-2 transition-all duration-500 relative"
              >
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -z-10 group-hover:bg-primary/20 transition-colors duration-500" />

                {/* Card top gradient bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${gradColor}`} />

                {/* Visual area */}
                <div className="relative h-48 bg-surface/50 flex items-center justify-center overflow-hidden border-b border-white/5">
                  <span className="text-6xl opacity-20 select-none group-hover:scale-110 transition-transform duration-500">{categoryEmoji[project.category]}</span>
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all duration-200 hover:scale-110"
                      onClick={e => e.stopPropagation()}
                    >
                      <Github className="w-6 h-6 text-white" />
                    </a>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition-all duration-200 hover:scale-110"
                    >
                      <ExternalLink className="w-6 h-6 text-white" />
                    </button>
                  </div>

                  {project.featured && (
                    <span className="absolute top-4 right-4 px-3 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[11px] font-bold rounded-full shadow-lg">
                      Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-[18px] font-bold text-white mb-2.5 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-primary transition-all duration-300 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-[14px] text-gray-400 mb-5 line-clamp-3 leading-relaxed font-medium">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech, ti) => (
                      <span
                        key={ti}
                        className="px-2.5 py-1.5 bg-white/5 text-gray-300 border border-white/10 rounded-lg text-[11px] font-bold group-hover:border-primary/30 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2.5 py-1.5 bg-white/5 text-gray-500 border border-white/5 rounded-lg text-[11px] font-bold">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* ── Platform Stats ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="glass-galaxy rounded-3xl p-10 relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10 transition-colors duration-700" />
            <h3 className="text-2xl font-bold text-white mb-10 text-center tracking-tight">
              Platform Statistics
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {githubStats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="text-center bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  <div className={`text-4xl font-extrabold bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-2 glow`}>
                    {s.value}
                  </div>
                  <div className="text-[14px] text-gray-300 font-bold uppercase tracking-wider">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Project Modal ───────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="glass-panel backdrop-blur-2xl rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-primary/30 shadow-neon-purple"
              onClick={e => e.stopPropagation()}
            >
              {/* Top gradient bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${categoryColor[selectedProject.category] ?? 'from-blue-500 to-violet-500'} rounded-full mb-6`} />

              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white pr-4 leading-snug drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors duration-200 flex-shrink-0"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/60 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-medium mb-4">
                {categoryEmoji[selectedProject.category]} {selectedProject.category}
              </span>

              <p className="text-gray-300 mb-6 leading-relaxed text-[14.5px] font-mono">
                {selectedProject.longDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-lg text-[12px] font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-[13.5px] font-semibold hover:opacity-90 transition-opacity duration-200"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
                {selectedProject.demo !== '#' && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-primary/20 text-white rounded-xl text-[13.5px] font-mono border border-primary/50 hover:bg-primary/30 shadow-neon-purple transition-all duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
