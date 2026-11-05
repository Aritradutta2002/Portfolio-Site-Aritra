/**
 * Single source of truth for the résumé at `/`.
 * All hrefs are plain URLs (no markdown) so they can be used directly.
 *
 * Copy mirrors public/resume.pdf so the page and the downloadable CV never
 * disagree. If the PDF changes, change this file first.
 */

export type SystemCategory =
  | "ALL"
  | "GENAI & FULL-STACK"
  | "JAVA / SPRING"
  | "CLOUD & PAAS"
  | "ALGORITHMS & TOOLS";

/** An individual project never belongs to the pseudo-category "ALL". */
export type CatalogCategory = Exclude<SystemCategory, "ALL">;

export interface Metric {
  label: string;
  value: string;
}

export interface ExperienceRole {
  id: string;
  role: string;
  org: string;
  parent: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  stack: string[];
}

export interface ProjectItem {
  id: string;
  name: string;
  kind: string;
  categories: CatalogCategory[];
  years: string;
  summary: string;
  bullets: string[];
  stack: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
  metric?: Metric;
  demoUrl?: string;
  githubUrl?: string;
}

export interface SkillGroup {
  domain: string;
  items: string[];
}

export const PORTFOLIO_HEADER = {
  name: "Aritra Dutta",
  role: "Full Stack Application Engineer",
  company: "Tata Consultancy Services",
  location: "Bhubaneswar, Odisha",
  availability: "Open to backend, cloud and full-stack roles",
  summary:
    "Results-driven Full Stack Application Engineer with 2+ years of experience building scalable Java microservices, end-to-end web applications, and AI-powered features. Proficient in Java, Spring Boot, Python, Generative AI (RAG/LangChain), React, and AWS — with a strong focus on backend modernization and intelligent system integration, delivering measurable performance improvements in enterprise, client-facing environments.",
};

/** Headline numbers a recruiter can verify further down the page. */
export const HEADLINE_METRICS: Metric[] = [
  { label: "Experience", value: "2+ yrs" },
  { label: "Fastest API gain", value: "20x" },
  { label: "Problems solved", value: "700+" },
];

export const EXPERIENCE: ExperienceRole[] = [
  {
    id: "tcs",
    role: "System Engineer",
    org: "Tata Consultancy Services",
    parent: "",
    period: "Sep 2024 – Present",
    location: "Bhubaneswar, Odisha",
    summary:
      "Led the remediation phase of a Java microservices modernization initiative, migrating backend services from Java 8 to Java 21 and Spring Boot 1.x.x to 4.x.x on AWS-based infrastructure.",
    bullets: [
      "Led the remediation phase of a Java microservices modernization initiative, migrating backend services from Java 8 to Java 21 and Spring Boot 1.x.x to 4.x.x, improving maintainability, security, and long-term support.",
      "Migrated critical applications from legacy JBoss infrastructure to Azure Tomcat PaaS, configuring health checks, deployment slots, and monitoring to ensure high availability in production.",
      "Utilized AWS Transform (ATX) tooling to accelerate dependency upgrades, code refactoring, and compatibility validation across Java microservices running on AWS-based infrastructure.",
      "Built and maintained end-to-end Jenkins CI/CD pipelines with Docker-based deployments, automated build and release workflows, integrated JaCoCo/JUnit test coverage reporting, and enhanced code quality through SonarQube analysis.",
      "Optimized complex SQL queries and REST APIs, delivering up to 20× faster response times for critical business workflows in production environments.",
      "Managed Git and GitHub workflows, including complex merge conflict resolution, pull request reviews, branch management, release merges, and enforcement of code review best practices across distributed development teams.",
      "Collaborated with UI/UX teams to implement and refine user-facing features, ensuring responsive design, usability improvements, and alignment with business requirements.",
      "Created, configured, and monitored Jenkins build and deployment jobs, troubleshooting pipeline failures and supporting continuous delivery practices across multiple environments.",
      "Conducted API validation and integration testing using Postman and Swagger/OpenAPI, partnering with QA teams to verify backend functionality, troubleshoot issues, and ensure release readiness.",
      "Leveraged GitHub Copilot and Claude Code to accelerate development, refactoring, documentation, and peer-review activities, improving engineering productivity across modernization initiatives.",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Azure",
      "AWS",
      "Jenkins",
      "Docker",
      "SQL",
      "React",
      "AWS Transform",
      "CICD",
      "Tomcat",
      "Node.js",
      "Claude Code",
      "Github Copilot",
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "algoguru",
    name: "AlgoGuru",
    kind: "Full-Stack & GenAI Platform · Founder-Built",
    categories: ["GENAI & FULL-STACK", "JAVA / SPRING"],
    years: "2024 – Present",
    featured: true,
    metric: { label: "Live Domain", value: "algoguru.online" },
    summary:
      "A flagship full-stack competitive-programming learning platform with an in-browser Java code playground and an autonomous retrieval-augmented AI tutor, architected and shipped end-to-end.",
    bullets: [
      "Architected, built and deployed the entire platform into production on a custom purchased domain (algoguru.online).",
      "Engineered 'Guru Bot' — an autonomous AI tutor using Python, LangChain, and RAG to deliver context-grounded, document-verified algorithm explanations and space/time complexity breakdowns.",
      "Built a secure in-browser Java code playground with test case validation, role-based authentication, and user progress persistence.",
      "Designed data schemas and security policies with Supabase and PostgreSQL, implementing granular row-level security (RLS).",
    ],
    stack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Java",
      "Python",
      "LangChain",
      "RAG",
      "Supabase",
      "PostgreSQL",
      "Node.js",
    ],
    links: [
      { label: "algoguru.online", href: "https://www.algoguru.online/" },
      { label: "Source Code", href: "https://github.com/Aritradutta2002" },
    ],
    demoUrl: "https://www.algoguru.online/",
    githubUrl: "https://github.com/Aritradutta2002",
  },
  {
    id: "microservices-modernization",
    name: "Enterprise Microservices Modernization",
    kind: "Enterprise Architecture & Cloud Remediation · TCS",
    categories: ["JAVA / SPRING", "CLOUD & PAAS"],
    years: "2024 – Present",
    featured: true,
    metric: { label: "Max Speedup", value: "20× Faster" },
    summary:
      "Remediation and modernization of mission-critical Java microservices for enterprise fleet management, upgrading legacy backends to Java 21, Spring Boot 4, and Azure Tomcat PaaS.",
    bullets: [
      "Led the remediation phase migrating backend services from Java 8 to Java 21 and Spring Boot 1.x to 4.x, resolving critical CVE vulnerabilities and cutting technical debt.",
      "Migrated production workloads from legacy on-premises JBoss servers to Azure Tomcat PaaS with health probes and zero-downtime deployment slots.",
      "Accelerated dependency upgrades, refactoring and backward-compatibility validation with AWS Transform.",
      "Refactored complex SQL query joins and REST APIs, delivering up to 20× faster response times on high-throughput production endpoints.",
      "Built Jenkins CI/CD automation with Docker containers, SonarQube code quality gates, and JaCoCo coverage metrics.",
    ],
    stack: [
      "Java 21",
      "Spring Boot 4",
      "Azure Tomcat PaaS",
      "AWS Transform",
      "Jenkins",
      "Docker",
      "SQL",
      "SonarQube",
      "Postman",
    ],
    links: [
      { label: "TCS Experience Details", href: "#experience" },
    ],
  },
  {
    id: "algorithm-visualizer",
    name: "Algorithm & Sorting Visualizer",
    kind: "Interactive Web Engine · Open Source",
    categories: ["ALGORITHMS & TOOLS", "GENAI & FULL-STACK"],
    years: "2023 – 2024",
    metric: { label: "Engine", value: "Real-Time 60 FPS" },
    summary:
      "An interactive computer science platform designed to visually dissect and animate sorting algorithms with real-time controls, time/space complexity meters, and step execution.",
    bullets: [
      "Engineered dynamic frame-by-frame visual animations for Bubble Sort, Merge Sort, Quick Sort, and Insertion Sort.",
      "Implemented real-time execution controls: array size customization, speed slider, step-by-step playback, and pause/resume.",
      "Designed responsive canvas rendering with color-coded state indicators for comparisons, swaps, and sorted partitions.",
    ],
    stack: ["JavaScript", "C++", "HTML5 Canvas", "CSS3 Animations", "Algorithms"],
    links: [
      { label: "GitHub Repository", href: "https://github.com/Aritradutta2002/new_Sorting_Visualizer" },
    ],
    githubUrl: "https://github.com/Aritradutta2002/new_Sorting_Visualizer",
  },
  {
    id: "huffzip",
    name: "HuffZip — Lossless File Compressor",
    kind: "Systems Utility & Algorithm Visualizer",
    categories: ["ALGORITHMS & TOOLS"],
    years: "2023",
    metric: { label: "Complexity", value: "O(N log N)" },
    summary:
      "A high-performance lossless data compression utility using the Huffman Coding algorithm, paired with an interactive visualizer of the Huffman tree construction.",
    bullets: [
      "Implemented byte-frequency analysis, min-heap priority queue construction, and variable-length prefix code generation in C++.",
      "Engineered bitstream packing and unpacking routines for efficient file compression and lossless decompression.",
      "Designed an interactive visualizer showing step-by-step tree merges, frequency weights, and binary encoding paths.",
    ],
    stack: ["C++", "JavaScript", "Bitwise Operations", "Min-Heap", "Data Structures"],
    links: [
      { label: "GitHub Repository", href: "https://github.com/Aritradutta2002/File_Compressor" },
    ],
    githubUrl: "https://github.com/Aritradutta2002/File_Compressor",
  },
  {
    id: "leetcode-vault",
    name: "LeetCode & Algorithmic Problem Vault",
    kind: "Engineering Knowledge Base · 530+ Commits",
    categories: ["ALGORITHMS & TOOLS", "JAVA / SPRING"],
    years: "2022 – Present",
    metric: { label: "Problems Solved", value: "700+ Solved" },
    summary:
      "A rigorously maintained algorithmic problem repository with 537+ commits, covering data structures, dynamic programming, graphs, and advanced competitive programming patterns.",
    bullets: [
      "Contains 700+ verified solutions across LeetCode (Rating 1672), CodeChef (Rating 1708, 3★), and Codeforces.",
      "Each problem includes comprehensive time and space complexity evaluations, edge-case analysis, and multi-approach evolutions.",
      "Over 100 solutions solved from the renowned CSES Problem Set.",
    ],
    stack: ["Java 21", "C++", "Python", "Data Structures", "Dynamic Programming", "Graph Theory"],
    links: [
      { label: "GitHub Repository", href: "https://github.com/Aritradutta2002/LeetCode-Directory" },
      { label: "LeetCode Profile (1672)", href: "https://leetcode.com/u/Ari2001/" },
    ],
    githubUrl: "https://github.com/Aritradutta2002/LeetCode-Directory",
  },
  {
    id: "chatgpt-studio",
    name: "ChatGPT & AI Conversational Studio",
    kind: "AI Assistant Interface · LLM Application",
    categories: ["GENAI & FULL-STACK"],
    years: "2023 – 2024",
    metric: { label: "LLM Engine", value: "GPT-4 API" },
    summary:
      "An intuitive conversational AI application built with Streamlit and Python, featuring real-time response streaming, customizable sampling parameters, and prompt experimentation.",
    bullets: [
      "Integrated OpenAI GPT-4 API with adjustable temperature, top-p, max tokens, and custom system instructions.",
      "Built real-time token streaming with conversational history buffer and session state persistence.",
      "Designed clean UI for prompt engineering experimentation and structured output validation.",
    ],
    stack: ["Python", "Streamlit", "OpenAI GPT-4", "Prompt Engineering", "REST APIs"],
    links: [
      { label: "GitHub Repository", href: "https://github.com/Aritradutta2002/ChatGPT-clone" },
    ],
    githubUrl: "https://github.com/Aritradutta2002/ChatGPT-clone",
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    domain: "Programming languages",
    items: ["Java", "Python", "TypeScript", "SQL"],
  },
  {
    domain: "Frameworks & libraries",
    items: [
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "Spring Data JPA",
      "Hibernate",
      "REST APIs",
      "Microservices",
      "LangChain",
      "React",
      "Angular",
      "Tailwind CSS",
    ],
  },
  {
    domain: "Databases",
    items: ["PostgreSQL", "Oracle", "MySQL", "Apache Kafka", "Supabase"],
  },
  {
    domain: "Tools & platforms",
    items: [
      "AWS",
      "AWS Transform",
      "Azure PaaS",
      "Docker",
      "Jenkins",
      "CI/CD",
      "Git",
      "Maven",
      "SonarQube",
      "Tomcat",
      "JBoss",
      "Node.js",
      "GitHub Copilot",
      "Claude Code",
    ],
  },
  {
    domain: "Practices",
    items: ["Agile", "Scrum", "Jira", "Jile", "Code Review"],
  },
  {
    domain: "Spoken languages",
    items: ["English", "Hindi", "Bengali"],
  },
];

export const ACHIEVEMENTS = {
  competitiveProgramming: {
    title: "Competitive programming",
    detail: "700+ problems solved across LeetCode, Codeforces, CodeChef and the CSES Problem Set.",
    profiles: [
      { label: "LeetCode", value: "1672", href: "https://leetcode.com/u/Ari2001/" },
      { label: "Codeforces", value: "1046", href: "https://codeforces.com" },
      { label: "CodeChef", value: "1708 · 3★", href: "https://www.codechef.com/users/interover01" },
    ],
  },
  recognition: {
    title: "Enterprise Java modernisation",
    detail:
      "Led the remediation of enterprise microservices — Java 8 → 21, Spring Boot 1.x → 4.x — with up to 20× faster critical APIs.",
  },
};

export const EDUCATION = [
  {
    level: "B.Tech",
    degree: "Electronics & Communication Engineering",
    institution: "Maulana Abul Kalam Azad University of Technology (MAKAUT)",
    period: "2020 – 2024",
    location: "Kolkata, India",
    score: "8.79",
    scoreSuffix: "/ 10",
    scoreLabel: "CGPA",
    percent: 87.9,
  },
  {
    level: "Higher Secondary",
    degree: "Science — Physics, Chemistry & Mathematics",
    institution: "Kirnahar Shib Chandra High School",
    period: "Mar 2018 – Mar 2020",
    location: "Kirnahar, India",
    score: "92",
    scoreSuffix: "%",
    scoreLabel: "Grade",
    percent: 92,
  },
  {
    level: "Secondary (WBBSE)",
    degree: "Madhyamik — Class X",
    institution: "Kirnahar Shib Chandra High School",
    period: "2017 – 2018",
    location: "Kirnahar, India",
    score: "91",
    scoreSuffix: "%",
    scoreLabel: "Grade",
    percent: 91,
  },
];

export const SPOKEN_LANGUAGES = ["English", "Hindi", "Bengali"];

export const CONTACT_LINKS = {
  email: "aritradutta049@gmail.com",
  github: "https://github.com/Aritradutta2002",
  linkedin: "https://www.linkedin.com/in/aritra-dutta-rick20/",
  leetcode: "https://leetcode.com/u/Ari2001/",
  codechef: "https://www.codechef.com/users/interover01",
  codeforces: "https://codeforces.com",
  algoguru: "https://www.algoguru.online/",
  resumePdf: "/resume.pdf",
  classicView: "/classic",
  desktopView: "/desktop",
} as const;
