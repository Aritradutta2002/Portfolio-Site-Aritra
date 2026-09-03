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
    'Full Stack Application Engineer with 2+ years of experience building scalable Java microservices, end-to-end web applications, and AI-powered features (Java, Spring Boot, Python, LangChain, React, AWS).',

  /* ── Technical Skills ──────────────────────────────────────────────── */
  skills: [
    { category: 'Languages',           items: 'Java, Python, TypeScript, SQL · Spoken: English, Hindi, Bengali' },
    { category: 'Frameworks & Libs',   items: 'Spring Boot, Spring MVC, Spring Security, Spring Data JPA, Hibernate, REST APIs, Microservices, LangChain, React, Angular, Tailwind CSS' },
    { category: 'AI',                  items: 'Generative AI, RAG, LangChain, LLM Integration' },
    { category: 'Databases',           items: 'PostgreSQL, Oracle, MySQL, Apache Kafka' },
    { category: 'Tools & Platforms',   items: 'AWS, AWS Transform, Azure PaaS, Docker, Jenkins, Git, Maven, SonarQube, Tomcat, JBoss, GitHub Copilot, CI/CD' },
    { category: 'Methodologies',       items: 'Agile, Scrum, Jira, Jile, Code Review' },
  ],

  /* ── Experience ────────────────────────────────────────────────────── */
  experience: [
    {
      company:   'Tata Consultancy Services (TCS)',
      dateRange: 'Sep 2024 – Present',
      role:      'System Engineer',
      location:  'Bhubaneswar, India',
      projects: [
        {
          name: 'Element Fleet Management — Application Developer (Apr 2026 – Present)',
          bullets: [
            'Modernized microservices from <strong>Java 8 / Spring Boot 1.x to Java 21 / Spring Boot 3.x</strong> using <strong>AWS Transform</strong>.',
            'Migrated infrastructure from <strong>JBoss to Azure Tomcat PaaS</strong>; refactored the <strong>iDeclare monolith into a standalone Spring Boot microservice</strong> with JWT-based Spring Security.',
            'Built <strong>Jenkins CI/CD pipelines</strong> with Docker deployments and authored <strong>2,000+ JUnit test cases</strong>.',
            'Optimized SQL queries and APIs, achieving up to <strong>20x faster response times</strong>.',
            'Utilized <strong>GitHub Copilot, Jira, and Jile</strong> within Agile workflows.',
          ],
        },
        {
          name: 'Ultimatix Platform — Application Developer (Sep 2024 – Mar 2026)',
          bullets: [
            'Executed <strong>database migration from Oracle to PostgreSQL</strong>.',
            'Developed <strong>patent and trademark lifecycle modules</strong> using Core Java and Spring Boot.',
            'Optimized <strong>7+ critical APIs</strong>, improving performance up to <strong>30x</strong> under production load.',
            'Conducted <strong>technical interviews</strong> and onboarding knowledge transfers.',
          ],
        },
      ],
    },
  ],

  /* ── Projects ──────────────────────────────────────────────────────── */
  projects: [
    {
      title:  'AlgoGuru – Programming Learning Platform',
      stack:  'React, TypeScript, Tailwind CSS, Supabase, Java, Python, LangChain',
      liveUrl:   'https://www.algoguru.online/',
      githubUrl: 'https://github.com/Aritradutta2002',
      bullets: [
        'Designed, built, and deployed a <strong>full-stack competitive programming platform</strong> end-to-end — live at <a href="https://www.algoguru.online/">algoguru.online</a> with a custom purchased domain and production deployment.',
        'Features a <strong>Java Playground</strong>, <strong>role-based authentication</strong>, user progress tracking, and interactive problem sets built with React, TypeScript, Tailwind CSS, and a Supabase backend.',
        'Integrated an AI-powered <strong>"Guru Bot"</strong> using <strong>Python, LangChain, and RAG</strong> for contextual problem-solving guidance.',
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
      detail: '700+ problems solved across platforms — <a href="https://leetcode.com/u/Ari2001/">LeetCode</a> Rating <strong>1672</strong> · <a href="https://codeforces.com">Codeforces</a> <strong>1046 (Div 2)</strong> · <a href="https://www.codechef.com/users/interover01">CodeChef</a> <strong>1708 (3-Star)</strong> · CSES Problem Set.',
    },
  ],
}

export type ResumeData = typeof resumeData
