'use client'

import { resumeData } from '@/data/resumeData'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Download,
  Printer,
  FileText,
  CheckCircle2,
  Sparkles,
  Globe,
  Award,
  Code2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { Chip } from '@/components/ui/Chip'
import { EASE, fadeUp, staggerContainer, staggerItem } from '@/lib/motion'

/* ─── Print + page styles injected at runtime so no extra CSS file needed ─── */
const PRINT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Roboto', 'Arial', sans-serif;
    font-size: 10.5pt;
    color: #000;
    background: transparent;
    line-height: 1.4;
  }

  /* Screen wrapper */
  .screen-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 24px 16px 48px;
    background: transparent;
  }

  /* Download toolbar */
  .toolbar {
    width: 100%;
    max-width: 860px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }
  .toolbar-title { font-size: 13px; color: #555; }
  .btn-download {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 22px;
    background: #1a1a2e;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background .2s;
    text-decoration: none;
  }
  .btn-download:hover { background: #8b5cf6; }
  .btn-back {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 16px;
    background: transparent;
    color: #555;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 13px;
    cursor: pointer;
    text-decoration: none;
    transition: border-color .2s;
  }
  .btn-back:hover { border-color: #8b5cf6; color: #8b5cf6; }

  /* Resume card */
  .resume {
    width: 100%;
    max-width: 860px;
    background: #fff;
    padding: 36px 44px;
    box-shadow: 0 4px 24px rgba(0,0,0,.12);
    border-radius: 4px;
  }

  /* ── Header ── */
  .r-header { text-align: center; margin-bottom: 14px; }
  .r-name {
    font-size: 24pt;
    font-weight: 700;
    letter-spacing: .04em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .r-contacts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px 14px;
    font-size: 9pt;
    color: #333;
  }
  .r-contacts a { color: #1155cc; text-decoration: underline; }
  .r-contacts span { color: #777; }

  /* ── Section ── */
  .r-section { margin-top: 14px; }
  .r-section-title {
    font-size: 11pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .06em;
    border-bottom: 1.2px solid #000;
    padding-bottom: 2px;
    margin-bottom: 8px;
  }

  /* ── Summary ── */
  .r-summary { font-size: 9.5pt; line-height: 1.5; color: #222; }

  /* ── Skills ── */
  .r-skills-list { list-style: none; }
  .r-skills-list li { font-size: 9.5pt; margin-bottom: 3px; }
  .r-skills-list li strong { font-weight: 600; }

  /* ── Experience ── */
  .r-exp-header {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 1px;
  }
  .r-exp-company { font-weight: 700; font-size: 10pt; }
  .r-exp-date    { font-size: 9pt; color: #333; }
  .r-exp-role-row {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 4px;
  }
  .r-exp-role     { font-size: 9.5pt; font-style: italic; }
  .r-exp-location { font-size: 9pt; font-style: italic; color: #444; }
  .r-sub-project  { font-size: 9.5pt; font-style: italic; font-weight: 600; margin: 5px 0 2px; }

  /* ── Projects ── */
  .r-proj-header {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 3px;
  }
  .r-proj-title  { font-size: 10pt; font-weight: 700; }
  .r-proj-stack  { font-size: 9pt; font-style: italic; color: #444; }
  .r-proj-links  { font-size: 9pt; }
  .r-proj-links a { color: #1155cc; text-decoration: underline; font-style: italic; font-weight: 600; margin-left: 6px; }

  /* ── Education ── */
  .r-edu-header { display: flex; justify-content: space-between; }
  .r-edu-inst   { font-weight: 700; font-size: 10pt; }
  .r-edu-loc    { font-size: 9pt; }
  .r-edu-deg    { font-style: italic; font-size: 9.5pt; }
  .r-edu-date   { font-size: 9pt; font-style: italic; color: #444; }

  /* ── Bullet lists ── */
  .r-bullets {
    list-style: disc;
    padding-left: 18px;
    margin-top: 3px;
  }
  .r-bullets li {
    font-size: 9.5pt;
    margin-bottom: 2px;
    line-height: 1.45;
  }

  /* ── Achievements ── */
  .r-ach-list { list-style: disc; padding-left: 18px; }
  .r-ach-list li { font-size: 9.5pt; margin-bottom: 4px; line-height: 1.45; }
  .r-ach-list a  { color: #1155cc; }

  /* ── Print overrides ── */
  @media print {
    body { background: #fff !important; color: #000; }
    .screen-wrap { padding: 0; background: #fff; }
    .toolbar { display: none !important; }
    .resume {
      box-shadow: none;
      border-radius: 0;
      padding: 22px 28px;
      max-width: 100%;
    }
    a { color: #000 !important; text-decoration: underline; }
    @page { margin: 0.55in 0.55in; size: letter; }
  }
`

const features = [
  { icon: <CheckCircle2 size={13} />, label: 'ATS-Optimized' },
  { icon: <FileText size={13} />, label: 'Letter · A4 Ready' },
  { icon: <Printer size={13} />, label: 'One-Click Print' },
  { icon: <Sparkles size={13} />, label: 'Keyword Rich' },
]

export default function ResumeClient() {
  const { name, contacts, summary, skills, experience, projects, education, achievements } = resumeData

  const handleDownload = () => {
    window.print()
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PRINT_STYLES }} />

      <main className="relative min-h-screen">
        {/* Sticky sub-header — matches /social page */}
        <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-line-soft bg-bg-0/70 print-hide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary hover:text-secondary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-semibold">Back to Portfolio</span>
            </Link>

            <div className="flex items-center gap-2">
              <Chip tone="emerald" size="sm" icon={<span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse-glow" />}>
                Live
              </Chip>
              <span className="text-sm text-fg-3 hidden sm:inline">ATS-Optimized Resume</span>
            </div>
          </div>
        </div>

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6"
        >
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <motion.div
              variants={staggerItem}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/25 backdrop-blur-sm text-[12px] font-semibold mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
              Resume / CV
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-fg-0 leading-[1.05] text-balance mb-4"
            >
              {name}&apos;s{' '}
              <span className="gradient-text">Resume</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[15px] text-fg-3 leading-relaxed max-w-2xl mx-auto mb-6"
            >
              A single-page, ATS-friendly snapshot of my work — engineered to be parsed by recruiters and ranked by applicant tracking systems.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="flex flex-wrap items-center justify-center gap-2"
            >
              {features.map((f) => (
                <Chip key={f.label} tone="neutral" size="sm" icon={f.icon}>
                  {f.label}
                </Chip>
              ))}
            </motion.div>
          </div>

          {/* Action bar */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <Button
              variant="primary"
              size="lg"
              icon={<Download size={15} />}
              onClick={handleDownload}
            >
              Download PDF
            </Button>

            <Button
              variant="secondary"
              size="lg"
              icon={<Printer size={15} />}
              onClick={handleDownload}
            >
              Print
            </Button>

            <Link href="/#contact">
              <Button variant="outline" size="lg" icon={<Globe size={15} />}>
                Hire me instead
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Resume paper preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE.outExpo, delay: 0.2 }}
          className="max-w-[860px] mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="relative group">
            {/* Soft glow behind paper */}
            <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/15 to-rose/15 opacity-60 blur-2xl group-hover:opacity-90 transition-opacity duration-700" />

            <div className="screen-wrap !p-0 !bg-transparent">
              <div className="resume" id="resume-content">
                {/* HEADER */}
                <div className="r-header">
                  <div className="r-name">{name}</div>
                  <div className="r-contacts">
                    {contacts.map((c, i) => (
                      <span key={c.label} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                        <a href={c.href} target="_blank" rel="noopener noreferrer">{c.label}</a>
                        {i < contacts.length - 1 && <span>|</span>}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SUMMARY */}
                <div className="r-section">
                  <div className="r-section-title">Summary</div>
                  <p className="r-summary">{summary}</p>
                </div>

                {/* TECHNICAL SKILLS */}
                <div className="r-section">
                  <div className="r-section-title">Technical Skills</div>
                  <ul className="r-skills-list">
                    {skills.map(s => (
                      <li key={s.category}>
                        <strong>{s.category}:</strong> {s.items}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* EXPERIENCE */}
                <div className="r-section">
                  <div className="r-section-title">Professional Experience</div>
                  {experience.map((exp, ei) => (
                    <div key={ei} style={{ marginBottom: ei < experience.length - 1 ? '10px' : 0 }}>
                      <div className="r-exp-header">
                        <span className="r-exp-company">{exp.company}</span>
                        <span className="r-exp-date">{exp.dateRange}</span>
                      </div>
                      <div className="r-exp-role-row">
                        <span className="r-exp-role">{exp.role}</span>
                        <span className="r-exp-location">{exp.location}</span>
                      </div>
                      {exp.projects.map((proj, pi) => (
                        <div key={pi}>
                          <div className="r-sub-project">{proj.name}</div>
                          <ul className="r-bullets">
                            {proj.bullets.map((b, bi) => (
                              <li key={bi} dangerouslySetInnerHTML={{ __html: b }} />
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* PROJECTS */}
                <div className="r-section">
                  <div className="r-section-title">Projects</div>
                  {projects.map((proj, pi) => (
                    <div key={pi} style={{ marginBottom: pi < projects.length - 1 ? '8px' : 0 }}>
                      <div className="r-proj-header">
                        <div>
                          <span className="r-proj-title">{proj.title}</span>
                          {' | '}
                          <span className="r-proj-stack">{proj.stack}</span>
                          <span className="r-proj-links">
                            {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer">Live</a>}
                            {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>}
                          </span>
                        </div>
                      </div>
                      <ul className="r-bullets">
                        {proj.bullets.map((b, bi) => (
                          <li key={bi} dangerouslySetInnerHTML={{ __html: b }} />
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* EDUCATION */}
                <div className="r-section">
                  <div className="r-section-title">Education</div>
                  {education.map((edu, ei) => (
                    <div key={ei}>
                      <div className="r-edu-header">
                        <span className="r-edu-inst">{edu.institution}</span>
                        <span className="r-edu-loc">{edu.location}</span>
                      </div>
                      <div className="r-edu-header">
                        <span className="r-edu-deg" dangerouslySetInnerHTML={{ __html: `${edu.degree} | <strong>${edu.grade}</strong>` }} />
                        <span className="r-edu-date">{edu.dateRange}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ACHIEVEMENTS */}
                <div className="r-section">
                  <div className="r-section-title">Achievements &amp; Certifications</div>
                  <ul className="r-ach-list">
                    {achievements.map((a, i) => (
                      <li key={i}>
                        <strong>{a.title}</strong>
                        {' — '}
                        <span dangerouslySetInnerHTML={{ __html: a.detail }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Below-paper info card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE.outExpo }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12"
        >
          <GlassCard className="p-7 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-neon-primary shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-fg-0 mb-1.5">Pro tip — how to use this</h3>
                <p className="text-[14px] text-fg-2 leading-relaxed mb-4">
                  Use the <strong className="text-fg-0">Download PDF</strong> button (or press <kbd className="px-1.5 py-0.5 rounded bg-bg-2 border border-line text-[11px] font-mono text-fg-1">⌘/Ctrl + P</kbd>) and choose <em>Save as PDF</em>. The layout is sized for US Letter, prints cleanly in B&amp;W, and survives every ATS parser we&apos;ve tested.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Chip tone="primary" size="sm" icon={<Code2 size={12} />}>Built with Next.js</Chip>
                  <Chip tone="secondary" size="sm" icon={<FileText size={12} />}>Single-page format</Chip>
                  <Chip tone="emerald" size="sm" icon={<CheckCircle2 size={12} />}>No images / icons</Chip>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </main>
    </>
  )
}
