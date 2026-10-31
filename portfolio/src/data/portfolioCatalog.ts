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
    "I build and modernise enterprise Java systems — migrating Spring Boot services to Java 21, moving workloads to cloud PaaS, and shipping AI-powered products end-to-end.",
};

/** Headline numbers a recruiter can verify further down the page. */
export const HEADLINE_METRICS: Metric[] = [
  { label: "Experience", value: "2+ yrs" },
  { label: "Fastest API gain", value: "30x" },
  { label: "JUnit tests", value: "2,000+" },
];

export const EXPERIENCE: ExperienceRole[] = [
  {
    id: "element-fleet",
    role: "Application Developer",
    org: "Element Fleet Management",
    parent: "Tata Consultancy Services",
    period: "Apr 2026 – Present",
    location: "Bhubaneswar, India",
    summary:
      "Remediation phase of a Java microservices modernisation programme for an enterprise fleet-management platform.",
    bullets: [
      "Migrated backend services from Java 8 to Java 21 and Spring Boot 1.x to 3.x, using AWS Transform for dependency upgrades, refactoring and compatibility checks.",
      "Moved critical infrastructure from a legacy JBoss server to Azure Tomcat PaaS, configuring health checks for high availability in production.",
      "Refactored the iDeclare module from a legacy monolith into a standalone Spring Boot microservice with JWT-based, role-level access control via Spring Security.",
      "Built end-to-end Jenkins CI/CD pipelines with Docker deployments and authored 2,000+ JUnit test cases.",
      "Optimised SQL queries and APIs, achieving up to 20× faster response times in critical production workflows.",
      "Shipped in Agile ceremonies with Jira and Jile for delivery tracking, and used GitHub Copilot to speed up refactoring and peer review.",
    ],
    stack: [
      "Java 21",
      "Spring Boot 3",
      "Spring Security",
      "JWT",
      "Azure Tomcat PaaS",
      "AWS Transform",
      "Docker",
      "Jenkins",
      "JUnit",
    ],
  },
  {
    id: "ultimatix",
    role: "Application Developer",
    org: "Ultimatix Platform",
    parent: "Tata Consultancy Services",
    period: "Sep 2024 – Mar 2026",
    location: "Bhubaneswar, India",
    summary:
      "Database engine migration and patent / trademark lifecycle modules on TCS's internal enterprise platform.",
    bullets: [
      "Executed a database migration from Oracle to PostgreSQL, redesigning normalised schemas and cutting redundant query calls.",
      "Built backend services for patent and trademark lifecycle modules in Core Java and Spring Boot, including multi-stage approval workflows and audit trails.",
      "Troubleshot and optimised 7+ critical APIs, achieving up to 30× performance improvement under production load.",
      "Conducted technical interviews and led knowledge-transfer sessions to onboard new team members.",
    ],
    stack: [
      "Core Java",
      "Spring Boot",
      "Hibernate",
      "Oracle",
      "PostgreSQL",
      "SQL",
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
      "A competitive-programming learning platform with an in-browser Java playground and a retrieval-augmented AI tutor, designed, built and deployed end-to-end.",
    bullets: [
      "Integrated a Generative AI “Guru Bot” using Python, LangChain and RAG to deliver context-aware, document-grounded explanations.",
      "Built a Java code playground with role-based authentication, progress tracking and interactive problem sets.",
      "Owned the full product lifecycle: architecture, AI integration, implementation, deployment and a custom domain.",
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
    ],
    links: [
      { label: "algoguru.online", href: "https://www.algoguru.online/" },
      { label: "Source", href: "https://github.com/Aritradutta2002" },
    ],
  },
  {
    id: "fleet-iaas",
    name: "Fleet Microservice Carve-Out",
    kind: "Enterprise migration · TCS",
    categories: ["JAVA / SPRING", "CLOUD & PAAS"],
    years: "Apr 2026 – Present",
    summary:
      "Carving a legacy iDeclare monolith out of a fleet-management estate and moving it to Azure Tomcat PaaS on Java 21.",
    bullets: [
      "Rebuilt the monolithic iDeclare module as a standalone Spring Boot service with a dedicated login portal.",
      "Added JWT-based role-level access control with Spring Security.",
      "Configured health checks and Docker-based Jenkins pipelines for a high-availability production rollout.",
    ],
    stack: ["Java 21", "Spring Boot 3", "Spring Security", "Azure PaaS", "Jenkins"],
  },
  {
    id: "oracle-to-postgres",
    name: "Oracle → PostgreSQL Migration",
    kind: "Data platform · TCS",
    categories: ["CLOUD & PAAS", "JAVA / SPRING"],
    years: "Sep 2024 – Mar 2026",
    summary:
      "Zero-loss database engine migration on Ultimatix, with the schema and query layer rewritten for PostgreSQL.",
    bullets: [
      "Redesigned normalised schemas for PostgreSQL and removed redundant query calls.",
      "Optimised 7+ critical APIs for up to 30× faster response under peak production load.",
      "Created the migration plan, validation checks and rollback path for the cutover.",
    ],
    stack: ["PostgreSQL", "Oracle", "Hibernate", "Core Java", "Spring Boot"],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    domain: "Languages",
    items: ["Java", "Python", "TypeScript", "SQL"],
  },
  {
    domain: "Frameworks",
    items: [
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "Spring Data JPA",
      "Hibernate",
      "REST APIs",
      "Microservices",
      "React",
      "Angular",
      "Tailwind CSS",
    ],
  },
  {
    domain: "AI & Generative AI",
    items: ["Generative AI", "RAG", "LangChain", "LLM Integration"],
  },
  {
    domain: "Databases",
    items: ["PostgreSQL", "Oracle", "MySQL", "Apache Kafka", "Supabase"],
  },
  {
    domain: "Cloud & DevOps",
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
    ],
  },
  {
    domain: "Practices",
    items: ["Agile", "Scrum", "Jira", "Jile", "Code Review", "GitHub Copilot"],
  },
];

export const ACHIEVEMENTS = {
  competitiveProgramming: {
    title: "Competitive programming",
    detail: "700+ problems solved across LeetCode, Codeforces, CodeChef and CSES.",
    profiles: [
      { label: "LeetCode", value: "1672", href: "https://leetcode.com/u/Ari2001/" },
      { label: "Codeforces", value: "1046", href: "https://codeforces.com" },
      { label: "CodeChef", value: "1708 · 3★", href: "https://www.codechef.com/users/interover01" },
    ],
  },
  recognition: {
    title: "Enterprise Java modernisation",
    detail:
      "Led the remediation of enterprise microservices — Java 8 → 21, Spring Boot 1.x → 3.x — with up to 20× faster critical APIs.",
  },
};

export const EDUCATION = {
  institution: "Maulana Abul Kalam Azad University of Technology (MAKAUT)",
  degree: "B.Tech, Electronics & Communication Engineering",
  period: "2020 – 2024",
  location: "Kolkata, India",
  cgpa: "8.79 / 10",
};

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
