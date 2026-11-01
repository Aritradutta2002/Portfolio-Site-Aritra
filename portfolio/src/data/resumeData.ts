// ─── RESUME DATA ─────────────────────────────────────────────────────────────
// Mirrors public/resume.pdf. Edit this file and the PDF together so the page
// and the downloadable CV never disagree.
// ─────────────────────────────────────────────────────────────────────────────

export const resumeData = {
  /* ── Personal ──────────────────────────────────────────────────────── */
  name: 'Aritra Dutta',
  contacts: [
    { label: 'Gmail',     href: 'mailto:aritradutta049@gmail.com',                         icon: '✉' },
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/aritra-dutta-rick20/',        icon: '🔗' },
    { label: 'GitHub',    href: 'https://github.com/Aritradutta2002',                      icon: '⌥' },
    { label: 'Portfolio', href: 'https://www.aritradutta.tech/',                           icon: '🌐' },
    { label: 'LeetCode',  href: 'https://leetcode.com/u/Ari2001/',                         icon: '⚡' },
    { label: 'CodeChef',  href: 'https://www.codechef.com/users/interover01',              icon: '🍴' },
  ],

  /* ── Summary ───────────────────────────────────────────────────────── */
  summary:
    'Results-driven Full Stack Application Engineer with 2+ years of experience building scalable Java microservices, end-to-end web applications, and AI-powered features. Proficient in Java, Spring Boot, Python, Generative AI (RAG/LangChain), and React — with a strong focus on backend modernization and intelligent system integration, delivering measurable performance improvements in enterprise, client-facing environments.',

  /* ── Technical Skills ──────────────────────────────────────────────── */
  skills: [
    { category: 'Programming Languages', items: 'Java, Python, TypeScript, SQL' },
    { category: 'Frameworks & Libraries', items: 'Spring Boot, Spring MVC, Spring Security, Spring Data JPA, Hibernate, REST APIs, Microservices, LangChain, React, Angular, Tailwind CSS' },
    { category: 'Databases',             items: 'PostgreSQL, Oracle, MySQL, Apache Kafka' },
    { category: 'Tools & Platforms',     items: 'AWS, AWS Transform, Azure PaaS, Docker, Jenkins, Git, Maven, SonarQube, Tomcat, JBoss, Node.js, GitHub Copilot, Claude Code, CI/CD' },
    { category: 'Soft Skills',           items: 'Agile, Scrum, Jira, Jile, Code Review' },
    { category: 'Languages',             items: 'English, Hindi, Bengali' },
  ],

  /* ── Experience ────────────────────────────────────────────────────── */
  experience: [
    {
      company:   'Tata Consultancy Services',
      dateRange: 'Sep 2024 – Present',
      role:      'System Engineer · Full-time',
      location:  'On-site · Bhubaneswar, Odisha',
      bullets: [
        'Led the remediation phase of a <strong>Java microservices modernization initiative</strong>, migrating backend services from <strong>Java 8 to Java 21 and Spring Boot 1.x to 4.x</strong>, improving maintainability, security, and long-term support.',
        'Migrated critical applications from <strong>legacy JBoss infrastructure to Azure Tomcat PaaS</strong>, configuring health checks, deployment slots, and monitoring to ensure high availability in production.',
        'Utilized <strong>AWS Transform</strong> tooling to accelerate dependency upgrades, code refactoring, and compatibility validation across Java microservices running on AWS-based infrastructure.',
        'Built and maintained <strong>end-to-end Jenkins CI/CD pipelines</strong> with Docker-based deployments, automated build and release workflows, <strong>JaCoCo/JUnit test coverage reporting</strong>, and enhanced code quality through <strong>SonarQube</strong> analysis.',
        'Optimized complex SQL queries and REST APIs, delivering up to <strong>20× faster response times</strong> for critical business workflows in production environments.',
        'Managed <strong>Git and GitHub workflows</strong>, including complex merge conflict resolution, pull request reviews, branch management, release merges, and enforcement of code review best practices across distributed development teams.',
        'Collaborated with <strong>UI/UX teams</strong> to implement and refine user-facing features, ensuring responsive design, usability improvements, and alignment with business requirements.',
        'Created, configured, and monitored <strong>Jenkins build and deployment jobs</strong>, troubleshooting pipeline failures and supporting continuous delivery practices across multiple environments.',
        'Conducted <strong>API validation and integration testing</strong> using Postman and Swagger/OpenAPI, partnering with QA teams to verify backend functionality, troubleshoot issues, and ensure release readiness.',
        'Leveraged <strong>GitHub Copilot and Claude Code</strong> to accelerate development, refactoring, documentation, and peer-review activities, improving engineering productivity across modernization initiatives.',
      ],
      technologies:
        'Java, Spring Boot, Azure, AWS, Jenkins, Docker, SQL, React, AWS Transform, CI/CD, Tomcat, Node.js, Claude Code, GitHub Copilot',
    },
  ],

  /* ── Projects ──────────────────────────────────────────────────────── */
  projects: [
    {
      title:  'AlgoGuru',
      stack:  'React, TypeScript, Tailwind CSS, Java, Python, LangChain, RAG, Supabase, Node.js',
      liveUrl:   'https://www.algoguru.online/',
      githubUrl: 'https://github.com/Aritradutta2002',
      bullets: [
        'Designed, built, and deployed a <strong>full-stack competitive programming learning platform</strong> end-to-end, including production deployment and custom domain configuration.',
        'Integrated a <strong>Generative AI-powered Guru Bot</strong> to deliver context-aware algorithm explanations and intelligent, document-grounded problem-solving assistance.',
        'Built a <strong>Java-based code playground</strong> with role-based authentication, user progress tracking, and interactive problem sets using <strong>React, TypeScript, and Tailwind CSS</strong>.',
        'Owned the complete product lifecycle — architecture, AI integration, implementation, deployment, and ongoing maintenance.',
      ],
    },
  ],

  /* ── Education ─────────────────────────────────────────────────────── */
  education: [
    {
      institution: 'Maulana Abul Kalam Azad University of Technology',
      location:    'Kolkata, India',
      degree:      'B.Tech, Electronics &amp; Communication Engineering',
      grade:       'CGPA: 8.79 / 10',
      dateRange:   '2020 – 2024',
    },
    {
      institution: 'Kirnahar Shib Chandra High School',
      location:    'Kirnahar, India',
      degree:      'Higher Secondary — Physics, Chemistry &amp; Mathematics',
      grade:       'Grade: 92%',
      dateRange:   'Mar 2018 – Mar 2020',
    },
    {
      institution: 'Kirnahar Shib Chandra High School',
      location:    'Kirnahar, India',
      degree:      'Secondary (WBBSE)',
      grade:       'Grade: 91%',
      dateRange:   '2017 – 2018',
    },
  ],

  /* ── Awards & Achievements ────────────────────────────────────────── */
  achievements: [
    {
      title: 'Competitive Programming',
      detail: '700+ problems solved across competitive programming platforms — <a href="https://leetcode.com/u/Ari2001/">LeetCode</a> <strong>1672</strong> · <a href="https://codeforces.com">Codeforces</a> <strong>1046</strong> · <a href="https://www.codechef.com/users/interover01">CodeChef</a> <strong>1708 (3-Star)</strong> · CSES Problem Set.',
    },
  ],
}

export type ResumeData = typeof resumeData
