/**
 * Single source of truth for the résumé at `/`.
 * All hrefs are plain URLs (no markdown) so they can be used directly.
 *
 * Copy mirrors public/resume.pdf so the page and the downloadable CV never
 * disagree. If the PDF changes, change this file first.
 */

export type SystemCategory =
  | "ALL"
  | "JAVA / SPRING"
  | "CLOUD & PAAS"
  | "GENAI & FULL-STACK";

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
}

export interface SkillGroup {
  domain: string;
  items: string[];
}

export const PORTFOLIO_HEADER = {
  name: "Aritra Dutta",
  role: "Full Stack Application Engineer",
  company: "Tata Consultancy Services",
  location: "Bhubaneswar, India",
  availability: "Open to backend, cloud and full-stack roles",
  summary:
    "Full Stack Application Engineer with 2+ years building scalable Java microservices, end-to-end web applications and AI-powered features. Backend modernisation and intelligent system integration, with measurable performance gains in enterprise, client-facing environments.",
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
      "Remediation phase of a Java microservices modernisation initiative, moving backend services to Java 21 and Spring Boot 4.x on AWS-based infrastructure.",
    bullets: [
      "Led the remediation phase of a Java microservices modernisation initiative, migrating backend services from Java 8 to Java 21 and Spring Boot 1.x to 4.x, improving maintainability, security and long-term support.",
      "Migrated critical applications from legacy JBoss infrastructure to Azure Tomcat PaaS, configuring health checks, deployment slots and monitoring for high availability in production.",
      "Used AWS Transform to accelerate dependency upgrades, code refactoring and compatibility validation across Java microservices.",
      "Built and maintained end-to-end Jenkins CI/CD pipelines with Docker-based deployments, JaCoCo/JUnit coverage reporting and SonarQube code quality analysis.",
      "Optimised complex SQL queries and REST APIs, delivering up to 20× faster response times for critical production workflows.",
      "Managed Git and GitHub workflows across distributed teams — merge conflict resolution, pull request reviews, branch management and release merges.",
      "Partnered with UI/UX teams to refine user-facing features for responsive design and usability.",
      "Created and monitored Jenkins build and deployment jobs, troubleshooting pipeline failures across multiple environments.",
      "Validated APIs and integration tests with Postman and Swagger/OpenAPI, partnering with QA on release readiness.",
      "Accelerated development, refactoring and documentation with GitHub Copilot and Claude Code.",
    ],
    stack: [
      "Java 21",
      "Spring Boot 4",
      "Azure Tomcat PaaS",
      "AWS Transform",
      "Jenkins",
      "Docker",
      "SQL",
      "React",
      "Node.js",
      "Claude Code",
      "GitHub Copilot",
    ],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "algoguru",
    name: "AlgoGuru",
    kind: "Full-stack platform · Founder-built",
    categories: ["GENAI & FULL-STACK", "JAVA / SPRING"],
    years: "2024 – Present",
    summary:
      "A full-stack competitive-programming learning platform with an in-browser Java playground and a retrieval-augmented AI tutor, designed, built and deployed end-to-end.",
    bullets: [
      "Designed, built and deployed the platform end-to-end, including production deployment and custom domain configuration.",
      "Integrated a Generative AI-powered Guru Bot delivering context-aware, document-grounded algorithm explanations.",
      "Built a Java code playground with role-based authentication, user progress tracking and interactive problem sets.",
      "Owned the complete product lifecycle — architecture, AI integration, implementation, deployment and ongoing maintenance.",
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
      "Node.js",
    ],
    links: [
      { label: "algoguru.online", href: "https://www.algoguru.online/" },
      { label: "Source", href: "https://github.com/Aritradutta2002" },
    ],
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
