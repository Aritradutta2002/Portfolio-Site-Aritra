'use client'

import { resumeData } from '@/data/resumeData'
import Link from 'next/link'

/* ─── Print + page styles injected at runtime so no extra CSS file needed ─── */
const PRINT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Roboto', 'Arial', sans-serif;
    font-size: 10.5pt;
    color: #000;
    background: #f4f4f4;
    line-height: 1.4;
  }

  /* Screen wrapper */
  .screen-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 24px 16px 48px;
    background: #f4f4f4;
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
    body { background: #fff !important; }
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

export default function ResumeClient() {
  const { name, contacts, summary, skills, experience, projects, education, achievements } = resumeData

  const handleDownload = () => {
    window.print()
  }

  return (
    <>
      {/* Inject styles */}
      <style dangerouslySetInnerHTML={{ __html: PRINT_STYLES }} />

      <div className="screen-wrap">
        {/* ── Toolbar (hidden on print) ── */}
        <div className="toolbar">
          <Link href="/" className="btn-back">← Back to Portfolio</Link>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span className="toolbar-title">ATS-Optimized PDF Resume</span>
            <button className="btn-download" onClick={handleDownload}>
              ⬇ Download PDF
            </button>
          </div>
        </div>

        {/* ── Resume paper ── */}
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

        </div>{/* end .resume */}
      </div>
    </>
  )
}
