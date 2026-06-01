'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Sparkles, Code2, Cpu, Box, Database, Globe, Brain, Trophy, type LucideIcon } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Chip } from '@/components/ui/Chip'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Modal } from '@/components/ui/Modal'
import { TiltCard } from '@/components/ui/TiltCard'
import { Button } from '@/components/ui/Button'
import { EASE } from '@/lib/motion'

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
  preview: {
    icon: LucideIcon
    primary: string
    secondary: string
    lines: { tokens: { type: 'kw' | 'fn' | 'str' | 'num' | 'com' | 'txt'; text: string }[] }[]
  }
}

const categoryIcon: Record<string, LucideIcon> = {
  'Web Development': Globe,
  'Desktop Application': Cpu,
  'AI/ML': Brain,
  'Competitive Programming': Trophy,
  'Backend Development': Database,
}

const projects: Project[] = [
  {
    id: 1,
    title: 'AlgoGuru – Programming Learning Platform',
    description: 'Full-stack competitive programming platform with Java Playground, role-based auth, and interactive problem sets.',
    longDescription: 'Designed, built, and deployed a full-stack competitive programming platform end-to-end — live at algoguru.online with a custom domain and production deployment. Features a Java Playground, role-based authentication, user progress tracking, and interactive problem sets. Sole developer responsible for the complete product lifecycle — from architecture and implementation to deployment.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'Java'],
    category: 'Web Development',
    github: 'https://github.com/Aritradutta2002',
    demo: 'https://algoguru.online',
    featured: true,
    preview: {
      icon: Globe,
      primary: 'hsl(262, 83%, 58%)',
      secondary: 'hsl(189, 94%, 50%)',
      lines: [
        { tokens: [{ type: 'com', text: '// algoguru.online' }] },
        { tokens: [{ type: 'kw', text: 'const' }, { type: 'txt', text: ' ' }, { type: 'fn', text: 'learn' }, { type: 'txt', text: ' = () => {' }] },
        { tokens: [{ type: 'txt', text: '  ' }, { type: 'fn', text: 'solve' }, { type: 'txt', text: '(' }, { type: 'str', text: '"DSA"' }, { type: 'txt', text: ');' }] },
        { tokens: [{ type: 'txt', text: '  ' }, { type: 'fn', text: 'compete' }, { type: 'txt', text: '(' }, { type: 'str', text: '"weekly"' }, { type: 'txt', text: ');' }] },
        { tokens: [{ type: 'txt', text: '  ' }, { type: 'fn', text: 'grow' }, { type: 'txt', text: '(' }, { type: 'str', text: '"together"' }, { type: 'txt', text: ');' }] },
        { tokens: [{ type: 'txt', text: '};' }] },
      ],
    },
  },
  {
    id: 2,
    title: 'Algorithm Visualizer',
    description: 'Interactive platform for visualizing sorting algorithms — Bubble, Merge, Quick, Insertion sort with dynamic animations.',
    longDescription: 'Developed a comprehensive platform for visualizing various sorting algorithms. Helps students and developers understand how different sorting algorithms work through interactive visualizations. Features include speed controls, step-by-step execution, and algorithm performance comparison.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'Web Development',
    github: 'https://github.com/Aritradutta2002/new_Sorting_Visualizer',
    demo: '#',
    featured: true,
    preview: {
      icon: Code2,
      primary: 'hsl(189, 94%, 50%)',
      secondary: 'hsl(160, 84%, 45%)',
      lines: [
        { tokens: [{ type: 'com', text: '// sorting-visualizer' }] },
        { tokens: [{ type: 'kw', text: 'function' }, { type: 'txt', text: ' ' }, { type: 'fn', text: 'visualize' }, { type: 'txt', text: '(' }, { type: 'txt', text: 'algo' }, { type: 'txt', text: ') {' }] },
        { tokens: [{ type: 'txt', text: '  ' }, { type: 'kw', text: 'const' }, { type: 'txt', text: ' arr = [' }, { type: 'num', text: '42' }, { type: 'txt', text: ', ' }, { type: 'num', text: '17' }, { type: 'txt', text: ', ' }, { type: 'num', text: '8' }, { type: 'txt', text: '];' }] },
        { tokens: [{ type: 'txt', text: '  ' }, { type: 'fn', text: 'animate' }, { type: 'txt', text: '(' }, { type: 'txt', text: 'arr' }, { type: 'txt', text: ');' }] },
        { tokens: [{ type: 'txt', text: '}' }] },
      ],
    },
  },
  {
    id: 3,
    title: 'HuffZip – File Compressor',
    description: 'File compression tool using Huffman Coding with interactive tree construction visualization.',
    longDescription: 'Implemented the Huffman Coding algorithm for efficient file compression. Includes a visualization tool that shows how the Huffman Tree is constructed step by step. Built with C++ for backend processing and JavaScript for interactive visualizations.',
    technologies: ['JavaScript', 'HTML', 'C++'],
    category: 'Desktop Application',
    github: 'https://github.com/Aritradutta2002/File_Compressor',
    demo: '#',
    featured: true,
    preview: {
      icon: Cpu,
      primary: 'hsl(330, 81%, 60%)',
      secondary: 'hsl(262, 83%, 58%)',
      lines: [
        { tokens: [{ type: 'com', text: '// huffman.cpp' }] },
        { tokens: [{ type: 'kw', text: 'struct' }, { type: 'txt', text: ' ' }, { type: 'fn', text: 'Node' }, { type: 'txt', text: ' {' }] },
        { tokens: [{ type: 'txt', text: '  ' }, { type: 'kw', text: 'char' }, { type: 'txt', text: ' ch; ' }, { type: 'kw', text: 'int' }, { type: 'txt', text: ' freq;' }] },
        { tokens: [{ type: 'txt', text: '  ' }, { type: 'fn', text: 'Node' }, { type: 'txt', text: ' *left, *right;' }] },
        { tokens: [{ type: 'txt', text: '};' }] },
        { tokens: [{ type: 'txt', text: '// build tree & encode...' }] },
      ],
    },
  },
  {
    id: 4,
    title: 'ChatGPT Clone',
    description: 'Clean Streamlit interface for GPT-4 with customizable parameters and temperature controls.',
    longDescription: 'Created a ChatGPT clone using Streamlit in Python. Users interact with GPT-4 through a simple, clean interface. Features include customizable temperature, max tokens, and other parameters for fine-tuning responses.',
    technologies: ['Python', 'Streamlit', 'OpenAI API'],
    category: 'AI/ML',
    github: 'https://github.com/Aritradutta2002/ChatGPT-clone',
    demo: '#',
    preview: {
      icon: Brain,
      primary: 'hsl(38, 92%, 55%)',
      secondary: 'hsl(330, 81%, 60%)',
      lines: [
        { tokens: [{ type: 'com', text: '# chatgpt_clone.py' }] },
        { tokens: [{ type: 'kw', text: 'import' }, { type: 'txt', text: ' openai, streamlit' }] },
        { tokens: [{ type: 'txt', text: 'resp = openai.ChatCompletion.' }] },
        { tokens: [{ type: 'txt', text: '  ' }, { type: 'fn', text: 'create' }, { type: 'txt', text: '(' }] },
        { tokens: [{ type: 'txt', text: '    model=' }, { type: 'str', text: '"gpt-4"' }, { type: 'txt', text: ', temp=' }, { type: 'num', text: '0.7' }, { type: 'txt', text: ')' }] },
        { tokens: [{ type: 'txt', text: 'st.' }, { type: 'fn', text: 'write' }, { type: 'txt', text: '(resp.choices[0].text)' }] },
      ],
    },
  },
  {
    id: 5,
    title: 'LeetCode Directory',
    description: 'Comprehensive LeetCode solutions with 537+ commits, organized by topics and difficulty levels.',
    longDescription: 'A well-organized repository containing solutions to various LeetCode problems. Each solution includes detailed explanations, time and space complexity analysis, and multiple approaches where applicable.',
    technologies: ['Java', 'Python', 'C++'],
    category: 'Competitive Programming',
    github: 'https://github.com/Aritradutta2002/LeetCode-Directory',
    demo: '#',
    featured: true,
    preview: {
      icon: Trophy,
      primary: 'hsl(38, 92%, 55%)',
      secondary: 'hsl(0, 84%, 60%)',
      lines: [
        { tokens: [{ type: 'com', text: '// Two Sum — O(n) hashmap' }] },
        { tokens: [{ type: 'kw', text: 'class' }, { type: 'txt', text: ' ' }, { type: 'fn', text: 'Solution' }, { type: 'txt', text: ' {' }] },
        { tokens: [{ type: 'txt', text: '  ' }, { type: 'kw', text: 'public' }, { type: 'txt', text: ' ' }, { type: 'kw', text: 'int' }, { type: 'txt', text: '[] ' }, { type: 'fn', text: 'twoSum' }, { type: 'txt', text: '(' }] },
        { tokens: [{ type: 'txt', text: '    ' }, { type: 'kw', text: 'int' }, { type: 'txt', text: '[] nums, ' }, { type: 'kw', text: 'int' }, { type: 'txt', text: ' target) {' }] },
        { tokens: [{ type: 'txt', text: '    ' }, { type: 'fn', text: 'solve' }, { type: 'txt', text: '(' }, { type: 'txt', text: 'nums, target' }, { type: 'txt', text: ');' }] },
        { tokens: [{ type: 'txt', text: '  }' }, { type: 'txt', text: ' }' }] },
      ],
    },
  },
  {
    id: 6,
    title: 'Tic-Tac-Toe',
    description: 'Modern Tic-Tac-Toe built with Angular and TypeScript featuring responsive design and animations.',
    longDescription: 'A modern take on the classic Tic-Tac-Toe game built using Angular and TypeScript. Features include responsive design, score tracking, and smooth animations.',
    technologies: ['Angular', 'TypeScript', 'CSS'],
    category: 'Web Development',
    github: 'https://github.com/Aritradutta2002/TIC-TAC-TOE-GAME',
    demo: '#',
    preview: {
      icon: Box,
      primary: 'hsl(199, 89%, 60%)',
      secondary: 'hsl(189, 94%, 50%)',
      lines: [
        { tokens: [{ type: 'com', text: '// tic-tac-toe.component.ts' }] },
        { tokens: [{ type: 'kw', text: 'export' }, { type: 'txt', text: ' ' }, { type: 'kw', text: 'class' }, { type: 'txt', text: ' ' }, { type: 'fn', text: 'Board' }, { type: 'txt', text: ' {' }] },
        { tokens: [{ type: 'txt', text: '  cells: ' }, { type: 'str', text: "('X'|'O'|null)[]" }, { type: 'txt', text: ' = ' }, { type: 'fn', text: 'Array' }, { type: 'txt', text: '(' }, { type: 'num', text: '9' }, { type: 'txt', text: ');' }] },
        { tokens: [{ type: 'txt', text: '  ' }, { type: 'fn', text: 'play' }, { type: 'txt', text: '(i: ' }, { type: 'kw', text: 'number' }, { type: 'txt', text: ') {' }] },
        { tokens: [{ type: 'txt', text: '    ' }, { type: 'com', text: '/* mark cell */' }] },
        { tokens: [{ type: 'txt', text: '  }' }, { type: 'txt', text: ' }' }] },
      ],
    },
  },
  {
    id: 7,
    title: 'SpringBoot Microservice',
    description: 'First SpringBoot app demonstrating RESTful APIs, JPA, and modern Java backend practices.',
    longDescription: 'First SpringBoot application showcasing RESTful API development, database integration with JPA/Hibernate, and modern Java backend development practices.',
    technologies: ['Java', 'Spring Boot', 'MySQL', 'JPA'],
    category: 'Backend Development',
    github: 'https://github.com/Aritradutta2002/First-SpringBoot-App',
    demo: '#',
    preview: {
      icon: Database,
      primary: 'hsl(160, 84%, 45%)',
      secondary: 'hsl(189, 94%, 50%)',
      lines: [
        { tokens: [{ type: 'com', text: '// UserController.java' }] },
        { tokens: [{ type: 'kw', text: '@RestController' }] },
        { tokens: [{ type: 'kw', text: 'public' }, { type: 'txt', text: ' ' }, { type: 'kw', text: 'class' }, { type: 'txt', text: ' ' }, { type: 'fn', text: 'UserController' }, { type: 'txt', text: ' {' }] },
        { tokens: [{ type: 'kw', text: '  @GetMapping' }, { type: 'txt', text: '(' }, { type: 'str', text:'"/users"' }, { type: 'txt', text: ')' }] },
        { tokens: [{ type: 'txt', text: '  ' }, { type: 'kw', text: 'public' }, { type: 'txt', text: ' List<User> ' }, { type: 'fn', text: 'all' }, { type: 'txt', text: '() {' }] },
        { tokens: [{ type: 'txt', text: '    ' }, { type: 'fn', text: 'return' }, { type: 'txt', text: ' repo.' }, { type: 'fn', text: 'findAll' }, { type: 'txt', text: '();' }] },
      ],
    },
  },
]

const categories = ['All', 'Web Development', 'Desktop Application', 'AI/ML', 'Competitive Programming', 'Backend Development']

const tokenColor: Record<string, string> = {
  kw:  'text-rose',
  fn:  'text-secondary',
  str: 'text-amber',
  num: 'text-emerald',
  com: 'text-fg-4',
  txt: 'text-fg-2',
}

function ProjectPreview({ preview, title }: { preview: Project['preview']; title: string }) {
  const Icon = preview.icon
  return (
    <div
      className="relative h-44 sm:h-48 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${preview.primary}25, ${preview.secondary}10)`,
      }}
    >
      {/* gradient orbs */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-50"
        style={{ background: preview.primary }}
      />
      <div
        className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full blur-3xl opacity-30"
        style={{ background: preview.secondary }}
      />

      {/* Floating icon */}
      <motion.div
        className="absolute top-4 right-4 w-10 h-10 rounded-md flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${preview.primary}, ${preview.secondary})`,
          boxShadow: `0 8px 24px ${preview.primary}60`,
        }}
        animate={{ y: [0, -4, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon className="w-5 h-5 text-white" />
      </motion.div>

      {/* Code window mock */}
      <div className="absolute inset-x-4 bottom-4 top-16 rounded-md bg-bg-1/90 backdrop-blur-md border border-line overflow-hidden shadow-glass">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line-soft bg-bg-2/50">
          <span className="w-2.5 h-2.5 rounded-full bg-rose" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald" />
          <span className="ml-2 text-[10px] font-mono text-fg-4 truncate">{title.toLowerCase()}.{preview.icon === Brain ? 'py' : preview.icon === Database ? 'java' : preview.icon === Cpu ? 'cpp' : 'tsx'}</span>
        </div>
        {/* Code lines */}
        <div className="p-3 space-y-1 font-mono text-[10.5px] leading-relaxed">
          {preview.lines.slice(0, 5).map((line, li) => (
            <div key={li} className="flex">
              <span className="w-5 text-fg-4 text-right pr-2 select-none">{li + 1}</span>
              <span className="truncate">
                {line.tokens.map((t, ti) => (
                  <span key={ti} className={tokenColor[t.type] ?? 'text-fg-2'}>{t.text}</span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory)

  return (
    <section id="projects" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="03 — Work"
          eyebrow="Portfolio"
          title={<>Featured <span className="gradient-text">projects</span></>}
          description="Selected work spanning full-stack platforms, AI/ML experiments, and competitive programming tools."
        />

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE.outExpo }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => {
            const active = selectedCategory === cat
            const CatIcon = categoryIcon[cat] || Code2
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                data-cursor="hover"
                className={[
                  'h-10 px-4 rounded-full text-[13px] font-semibold inline-flex items-center gap-2 transition-all duration-300',
                  active
                    ? 'bg-primary/15 text-primary border border-primary/40 shadow-neon-primary'
                    : 'glass text-fg-3 border border-line-soft hover:border-secondary/40 hover:text-secondary',
                ].join(' ')}
              >
                {cat !== 'All' && <CatIcon size={13} />}
                {cat}
              </button>
            )
          })}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: EASE.outExpo }}
              >
                <TiltCard maxTilt={6} scale={1.01}>
                  <GlassCard
                    glow="primary"
                    onClick={() => setSelectedProject(project)}
                    data-cursor="hover"
                    className="cursor-pointer overflow-hidden"
                  >
                    <ProjectPreview preview={project.preview} title={project.title} />

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-[16.5px] font-bold text-fg-0 leading-snug group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <Chip tone="amber" size="sm" icon={<Sparkles size={10} />}>
                            Featured
                          </Chip>
                        )}
                      </div>
                      <p className="text-[13.5px] text-fg-3 mb-4 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Chip key={tech} tone="neutral" size="sm">{tech}</Chip>
                        ))}
                        {project.technologies.length > 4 && (
                          <Chip tone="neutral" size="sm">+{project.technologies.length - 4}</Chip>
                        )}
                      </div>
                    </div>
                  </GlassCard>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <Modal
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        size="lg"
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div className="space-y-5">
            <Chip tone="primary" size="sm" icon={<Sparkles size={11} />}>
              {selectedProject.category}
            </Chip>

            <p className="text-fg-2 leading-relaxed text-[14.5px]">
              {selectedProject.longDescription}
            </p>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-fg-4 mb-2">Stack</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <Chip key={tech} tone="primary" size="md">{tech}</Chip>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-3 border-t border-line-soft">
              <Button
                variant="primary"
                onClick={() => window.open(selectedProject.github, '_blank', 'noopener,noreferrer')}
                icon={<Github size={15} />}
              >
                View code
              </Button>
              {selectedProject.demo !== '#' && (
                <Button
                  variant="secondary"
                  onClick={() => window.open(selectedProject.demo, '_blank', 'noopener,noreferrer')}
                  icon={<ExternalLink size={15} />}
                >
                  Live demo
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
