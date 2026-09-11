'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X, ArrowUpRight } from 'lucide-react'
import { useMagnetic } from '@/lib/interactions'
import { SectionHeading } from './SectionHeading'
import { CountUp } from './CountUp'
import { CursorTag } from './CursorTag'
import { GlassCard } from './GlassCard'

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

const projects: Project[] = [
  {
    id: 1,
    title: 'AlgoGuru – Programming Learning Platform',
    description: 'Full-stack competitive programming platform featuring a Java Playground, role-based authentication, interactive problem sets, and an AI-powered "Guru Bot" for contextual guidance.',
    longDescription: 'Designed, built, and deployed a full-stack competitive programming platform end-to-end — live at algoguru.online with a custom purchased domain and production deployment. Features a Java Playground, role-based authentication, user progress tracking, and interactive problem sets. Integrated an AI-powered "Guru Bot" using Python, LangChain, and RAG for contextual problem-solving guidance. Sole developer responsible for the complete product lifecycle — from architecture and implementation to deployment.',
    technologies: ['React', 'TypeScript', 'Java', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Python', 'LangChain'],
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
    technologies: ['JavaScript', 'C++'],
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
    technologies: ['C++', 'JavaScript'],
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
    technologies: ['Python'],
    category: 'AI/ML',
    github: 'https://github.com/Aritradutta2002/ChatGPT-clone',
    demo: '#',
  },
  {
    id: 5,
    title: 'LeetCode Directory',
    description: 'Comprehensive collection of LeetCode solutions with 537+ commits, organized by topics and difficulty levels.',
    longDescription: 'A well-organized repository containing solutions to various LeetCode problems. Each solution includes detailed explanations, time and space complexity analysis, and multiple approaches where applicable.',
    technologies: ['Java 17', 'Python', 'C++'],
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
    technologies: ['Angular v20', 'TypeScript'],
    category: 'Web Development',
    github: 'https://github.com/Aritradutta2002/TIC-TAC-TOE-GAME',
    demo: '#',
  },
  {
    id: 7,
    title: 'SpringBoot Application',
    description: 'First SpringBoot application demonstrating RESTful APIs, database integration, and modern Java backend development practices.',
    longDescription: 'My first SpringBoot application showcasing RESTful API development, database integration with JPA/Hibernate, and modern Java backend development practices.',
    technologies: ['Java 17', 'Spring Boot 3', 'PostgreSQL'],
    category: 'Backend Development',
    github: 'https://github.com/Aritradutta2002/First-SpringBoot-App',
    demo: '#',
  },
]

const categories = ['All', 'Web Development', 'Desktop Application', 'AI/ML', 'Competitive Programming', 'Backend Development']

const githubStats = [
  { to: 700,  suffix: '+', label: 'Problems Solved' },
  { to: 1672, suffix: '',  label: 'LeetCode Rating' },
  { to: 1708, suffix: '',  label: 'CodeChef Rating' },
]

/* Project index row — outer motion.article owns layout + enter
   animations; the inner content layer owns ONLY the magnetic pull
   (strength 0.1, clamped ±12/±8px so full-bleed rows never drift
   out of alignment), resetting smoothly on mouseleave. An aurora
   gradient sweep underlines the row on hover. */
function ProjectRow({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const { targetRef } = useMagnetic<HTMLDivElement>(0.1, { maxX: 12, maxY: 8 })
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
      className="group relative border-b border-aurora/10 hover:bg-aurora/[0.03] transition-colors duration-300 cursor-pointer"
      onClick={onOpen}
      data-cursor
    >
      {/* Aurora gradient sweep — scaleX on hover, origin left */}
      <span
        className="absolute bottom-0 left-0 right-0 h-px bg-aurora origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
        aria-hidden="true"
      />
      <div ref={targetRef} className="magnetic flex items-start gap-5 md:gap-8 py-7 md:py-8 px-2 md:px-4">
        <span className="font-mono text-xs text-muted pt-1.5 w-8 flex-shrink-0 group-hover:text-aurorastrong transition-colors duration-300">
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-ink group-hover:text-aurorastrong transition-colors duration-300">
              {project.title}
            </h3>
            {project.featured && (
              <span className="px-2.5 py-0.5 rounded-full bg-aurora text-[#0B0616] font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                Featured
              </span>
            )}
          </div>
          <p className="text-[15px] text-muted leading-relaxed max-w-2xl mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full border border-aurora/20 font-mono text-[11px] text-ink/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <span className="hidden sm:flex items-center gap-2 flex-shrink-0 pt-1.5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            onClick={e => e.stopPropagation()}
            className="w-10 h-10 rounded-full border border-aurora/25 flex items-center justify-center text-muted hover:text-[#0B0616] hover:bg-aurora hover:border-aurora transition-colors duration-300"
          >
            <Github size={16} />
          </a>
          <span className="w-10 h-10 rounded-full border border-aurora/25 flex items-center justify-center text-muted group-hover:text-[#0B0616] group-hover:bg-aurora group-hover:border-aurora transition-colors duration-300">
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </span>
        </span>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  return (
    <section id="projects" className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <SectionHeading
          index="03"
          eyebrow="Portfolio"
          title="Featured Projects"
          blurb="Projects showcasing my skills across various technologies and domains"
        />

        {/* ── Filter tabs — layout-animated aurora underline ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-x-7 gap-y-3 mb-10"
        >
          {categories.map((cat) => {
            const active_ = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative font-mono text-xs uppercase tracking-[0.16em] pb-1.5 transition-colors duration-200 ${
                  active_ ? 'text-aurorastrong' : 'text-muted border-transparent hover:text-ink'
                }`}
              >
                {cat}
                {active_ && (
                  <motion.span
                    layoutId="project-filter-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-aurora"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </motion.div>

        {/* ── Project index rows ───────────────────────────── */}
        <motion.div layout className="border-t border-aurora/10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectRow key={project.id} project={project} index={index} onOpen={() => setSelectedProject(project)} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Platform Statistics ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, margin: '-64px' }}
          className="mt-16 md:mt-20"
        >
          <GlassCard hover className="p-8 md:p-10">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-muted mb-8 text-center">
              Platform Statistics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {githubStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                >
                  <div className="font-display text-4xl md:text-5xl font-bold tracking-tight text-gradient mb-2">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Cursor follower pill over project rows (desktop only) */}
      <CursorTag text="View" />

      {/* ── Project Modal ───────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[90]"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden"
              onClick={e => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject.title}
            >
              <div className="h-1 w-full bg-aurora" />
              <div className="p-8">
                <div className="flex justify-between items-start gap-4 mb-5">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-aurorastrong mb-2">
                      {selectedProject.category}
                    </p>
                    <h3 className="font-display text-2xl font-bold tracking-tight text-ink leading-snug">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full border border-aurora/25 text-muted hover:text-ink hover:border-aurora/60 transition-colors duration-200 flex-shrink-0"
                    aria-label="Close details"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex gap-2 mb-5 flex-wrap">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full border border-aurora/20 font-mono text-[11px] text-ink/75">
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-muted leading-relaxed text-[15px] mb-7">
                  {selectedProject.longDescription}
                </p>

                <div className="flex flex-wrap gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-aurora/40 bg-aurora/5 text-ink font-bold text-sm hover:border-aurora/70 hover:text-aurorastrong transition-colors duration-300"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                  {selectedProject.demo !== '#' && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-aurora text-[#0B0616] font-bold text-sm hover:shadow-aurora-glow transition-shadow duration-300"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
