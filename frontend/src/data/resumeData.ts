// ─── RESUME DATA ─────────────────────────────────────────────────────────────
// Edit this file to update your resume everywhere (portfolio + PDF download).
// ─────────────────────────────────────────────────────────────────────────────

export const resumeData = {
  /* ── Personal ──────────────────────────────────────────────────────── */
  name: 'Aritra Dutta',
  contacts: [
    { label: 'Gmail',     href: 'mailto:aritradutta049@gmail.com',                         icon: '✉' },
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/aritra-dutta-rick20/',        icon: '🔗' },
    { label: 'GitHub',    href: 'https://github.com/Aritradutta2002',                      icon: '⌥' },
    { label: 'Portfolio', href: 'https://portfolio-aritra-pearl.vercel.app/',               icon: '🌐' },
    { label: 'LeetCode',  href: 'https://leetcode.com/u/Ari2001/',                         icon: '⚡' },
    { label: 'CodeChef',  href: 'https://www.codechef.com/users/interover01',              icon: '🍴' },
  ],

  /* ── Summary ───────────────────────────────────────────────────────── */
  summary:
    'Results-driven Backend Engineer with 1.5+ years at TCS architecting high-performance Java/Spring Boot microservices serving 10K+ daily users. Delivered up to 30x API performance gains, led cloud migrations to Azure PaaS, and built AI-powered full-stack platforms end-to-end. Competitive programmer with 554+ problems solved (LeetCode 1672) and a passion for clean, scalable, production-grade systems.',

  /* ── Technical Skills ──────────────────────────────────────────────── */
  skills: [
    { category: 'Languages',           items: 'Java (8/11/17), TypeScript, Python, SQL' },
    { category: 'Backend',             items: 'Spring Boot, Spring MVC, Spring Security, Spring Data JPA, Hibernate, RESTful APIs, Microservices' },
    { category: 'Databases',           items: 'PostgreSQL, Oracle, MySQL, Apache Kafka, Query Optimization, pgvector' },
    { category: 'DevOps & Cloud',      items: 'Docker, Jenkins, Git, Maven, SonarQube, Microsoft Azure (PaaS, App Services), Tomcat, JBoss, CI/CD' },
    { category: 'Frontend',            items: 'React, Angular, TypeScript, Tailwind CSS' },
    { category: 'Testing & Practices', items: 'JUnit, Mockito, Agile/Scrum, GitHub Copilot (AI-Assisted Development)' },
  ],

  /* ── Experience ────────────────────────────────────────────────────── */
  experience: [
    {
      company:   'Tata Consultancy Services (TCS)',
      dateRange: 'Sep 2024 – Present',
      role:      'Assistant System Engineer',
      location:  'Bhubaneswar, India',
      projects: [
        {
          name: 'iDeclare — Ultimatix Platform',
          bullets: [
            'Migrated critical infrastructure from legacy JBoss server to <strong>Azure Tomcat PaaS</strong>, configuring health checks and ensuring high availability in production environments.',
            'Refactored the iDeclare module from a <strong>legacy monolith into a standalone Spring Boot microservice</strong> with an independent login portal, now serving <strong>10K+ daily users</strong>.',
            'Engineered backend solutions with <strong>Java 8 &amp; Spring Boot 3</strong>, leveraging GitHub Copilot for modular, reusable code design; significantly boosted overall application efficiency.',
            'Built end-to-end <strong>Jenkins CI/CD pipelines</strong>, integrated Docker deployments, and authored <strong>12+ JUnit test cases</strong> to enforce code quality across production rollouts.',
            'Optimized SQL queries and APIs achieving up to <strong>20x faster response times</strong> in critical workflows.',
            'Participated in Agile ceremonies (stand-ups, sprint planning) ensuring tight alignment with product requirements.',
          ],
        },
        {
          name: 'IP Rights Management System — Ultimatix Platform',
          bullets: [
            'Executed a complex <strong>database migration from Oracle to PostgreSQL</strong>, redesigning normalized schemas and eliminating redundant query calls, improving data access efficiency.',
            'Built robust backend services for <strong>Patent &amp; Trademark lifecycle modules</strong> using Core Java and Spring Boot, engineering multi-stage approval workflows with complete audit trails.',
            'Troubleshot and optimized <strong>7+ critical APIs</strong>, achieving a <strong>30x performance improvement</strong> under heavy production load.',
            'Conducted <strong>technical interviews</strong> and led Knowledge Transfer (KT) sessions, successfully onboarding new team members.',
          ],
        },
      ],
    },
  ],

  /* ── Projects ──────────────────────────────────────────────────────── */
  projects: [
    {
      title:  'AlgoGuru – Programming Learning Platform',
      stack:  'React, TypeScript, Tailwind CSS, Supabase, Java',
      liveUrl:   'https://www.algoguru.online/',
      githubUrl: 'https://github.com/Aritradutta2002',
      bullets: [
        'Designed, built, and deployed a <strong>full-stack competitive programming platform</strong> end-to-end — live at <a href="https://www.algoguru.online/">algoguru.online</a> with a custom purchased domain and production deployment.',
        'Features a <strong>Java Playground</strong>, <strong>role-based authentication</strong>, user progress tracking, and interactive problem sets built with React, TypeScript, Tailwind CSS, and a Supabase backend.',
        'Sole developer responsible for the complete product lifecycle — from architecture and implementation to deployment and domain configuration.',
      ],
    },
  ],

  /* ── Education ─────────────────────────────────────────────────────── */
  education: [
    {
      institution: 'Maulana Abul Kalam Azad University of Technology (MAKAUT)',
      location:    'Kolkata, India',
      degree:      'B.Tech, Electronics &amp; Communication Engineering',
      grade:       'CGPA: 8.79 / 10',
      dateRange:   '2020 – 2024',
    },
  ],

  /* ── Achievements & Certifications ────────────────────────────────── */
  achievements: [
    {
      title: 'TCS DEEP Ninja Certified DevOps Engineer',
      detail: 'Recognized for expertise in DevOps tooling and practices.',
    },
    {
      title: 'Competitive Programming',
      detail: '554+ problems solved across platforms — <a href="https://leetcode.com/u/Ari2001/">LeetCode</a> Rating <strong>1672</strong> · <a href="https://codeforces.com">Codeforces</a> <strong>1046 (Div 2)</strong> · <a href="https://www.codechef.com/users/interover01">CodeChef</a> <strong>1708 (3-Star)</strong> · CSES Problem Set.',
    },
  ],
}

export type ResumeData = typeof resumeData
