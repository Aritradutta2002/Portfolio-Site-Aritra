/**
 * Single source of truth for the Zro-style enterprise datasheet at `/`.
 * All hrefs are plain URLs (no markdown) so they can be used directly.
 */

export type SystemCategory =
  | "ALL"
  | "JAVA / SPRING"
  | "CLOUD & PAAS"
  | "GENAI & FULL-STACK";

/** An individual system never belongs to the pseudo-category "ALL". */
export type CatalogCategory = Exclude<SystemCategory, "ALL">;

export interface SpecRow {
  label: string;
  value: string;
}

export interface PerformanceMetric {
  label: string;
  highlight: string;
  unit: string;
}

export interface ArchitectureItem {
  label: string;
  value: string;
}

export interface SystemCatalogItem {
  id: string;
  organization: string;
  title: string;
  badge: string;
  iconGlyph: string;
  categories: CatalogCategory[];
  summary: string;
  highlights: string[];
  externalLinks?: { label: string; href: string }[];
  specifications: SpecRow[];
  performance: PerformanceMetric[];
  architecture: ArchitectureItem[];
  footerNote: string;
}

export const PORTFOLIO_HEADER = {
  name: "Aritra Dutta",
  role: "System Engineer · Full Stack Application Engineer",
  company: "Tata Consultancy Services",
  location: "Bhubaneswar, India",
  heroHeadline: "I build enterprise systems that move faster.",
  heroSubtitle:
    "Java 21 microservices, Azure PaaS migrations, and AI-powered platforms — engineered at TCS with measured 20–30x API gains.",
};

export const CATALOG_ITEMS: SystemCatalogItem[] = [
  {
    id: "tcs-element-fleet-v21",
    organization: "TATA CONSULTANCY SERVICES · ELEMENT FLEET MANAGEMENT",
    title: "Fleet Microservice Estate v21",
    badge: "CURRENT · PRODUCTION",
    iconGlyph: "EF",
    categories: ["JAVA / SPRING", "CLOUD & PAAS"],
    summary:
      "Modernising an enterprise fleet-management microservice estate: remediating Java 8 monoliths into Java 21 / Spring Boot 3.x microservices, migrating JBoss workloads onto Azure Tomcat PaaS, and executing a standalone monolith carve-out.",
    highlights: [
      "Modernized microservices from Java 8 / Spring Boot 1.x to Java 21 / Spring Boot 3.x using AWS Transform.",
      "Migrated infrastructure from JBoss to Azure Tomcat PaaS; refactored the iDeclare monolith into a standalone Spring Boot microservice with JWT-based Spring Security.",
      "Built Jenkins CI/CD pipelines with Docker deployments and authored 2,000+ JUnit test cases.",
      "Optimized SQL queries and critical APIs, achieving up to 20x faster response times.",
      "Utilized GitHub Copilot, Jira, and Jile within enterprise Agile workflows.",
    ],
    specifications: [
      { label: "SYSTEM ID", value: "tcs-element-fleet-v21" },
      { label: "TENURE", value: "Apr 2026 – Present · Bhubaneswar, India" },
      { label: "RUNTIME UPGRADE", value: "Java 8 / SB 1.x → Java 21 / SB 3.x" },
      { label: "CLOUD MIGRATION", value: "JBoss → Azure Tomcat PaaS" },
      { label: "CARVE-OUT", value: "iDeclare Monolith → Standalone Microservice" },
      { label: "SECURITY LAYER", value: "Spring Security + Stateless JWT" },
      { label: "CI/CD & TOOLING", value: "Jenkins, Docker, AWS Transform, Copilot" },
    ],
    performance: [
      { label: "API LATENCY GAIN", highlight: "20x", unit: "faster response" },
      { label: "UNIT TEST SUITE", highlight: "2,000+", unit: "JUnit test cases" },
      { label: "RUNTIME TARGET", highlight: "Java 21", unit: "Spring Boot 3.x" },
    ],
    architecture: [
      { label: "LANGUAGE", value: "Java 21 LTS" },
      { label: "FRAMEWORK", value: "Spring Boot 3.x" },
      { label: "AUTH PROTOCOL", value: "JWT / Security" },
      { label: "CLOUD HOST", value: "Azure PaaS" },
      { label: "PIPELINE", value: "Jenkins + Docker" },
    ],
    footerNote: "VERIFIED ENTERPRISE PRODUCTION DEPLOYMENT",
  },
  {
    id: "tcs-ultimatix-core",
    organization: "TATA CONSULTANCY SERVICES · INTERNAL PLATFORM",
    title: "Ultimatix Enterprise Platform",
    badge: "HIGH THROUGHPUT · 30X GAIN",
    iconGlyph: "UX",
    categories: ["JAVA / SPRING", "CLOUD & PAAS"],
    summary:
      "Executed core database engine migration from Oracle to PostgreSQL alongside full-lifecycle patent and trademark management modules engineered for high-concurrency internal enterprise workloads.",
    highlights: [
      "Executed zero-data-loss database migration from Oracle to PostgreSQL.",
      "Developed enterprise patent and trademark lifecycle modules using Core Java and Spring Boot.",
      "Optimized 7+ critical production APIs, improving throughput up to 30x under peak production load.",
      "Conducted technical interviews and led developer onboarding knowledge transfers (KT).",
    ],
    specifications: [
      { label: "SYSTEM ID", value: "tcs-ultimatix-core" },
      { label: "TENURE", value: "Sep 2024 – Mar 2026 · Bhubaneswar, India" },
      { label: "DB MIGRATION", value: "Oracle → PostgreSQL" },
      { label: "DOMAIN MODULES", value: "Patent & Trademark Lifecycle Engine" },
      { label: "PERSISTENCE", value: "Core Java, Spring Boot, Hibernate, SQL" },
      { label: "LEADERSHIP", value: "Technical Interviews & Onboarding KT" },
    ],
    performance: [
      { label: "LOAD SPEEDUP", highlight: "30x", unit: "under prod load" },
      { label: "OPTIMIZED APIS", highlight: "7+", unit: "critical endpoints" },
      { label: "DATA ENGINE", highlight: "PGSQL", unit: "migrated from Oracle" },
    ],
    architecture: [
      { label: "CORE RUNTIME", value: "Core Java" },
      { label: "FRAMEWORK", value: "Spring Boot" },
      { label: "RELATIONAL DB", value: "PostgreSQL / Oracle" },
      { label: "ORM LAYER", value: "Hibernate / JPA" },
    ],
    footerNote: "PRODUCTION TELEMETRY BENCHMARKED",
  },
  {
    id: "algoguru-ai-platform",
    organization: "END-TO-END AI PRODUCT · COMPETITIVE PROGRAMMING",
    title: "AlgoGuru Learning Platform",
    badge: "FULL LIFECYCLE · GENAI",
    iconGlyph: "AG",
    categories: ["GENAI & FULL-STACK", "JAVA / SPRING"],
    summary:
      "Competitive programming learning platform designed, built, and deployed end-to-end. Pairs curated interactive problem sets with an in-browser Java execution playground, RBAC authentication, and a LangChain-powered AI tutor.",
    highlights: [
      "Owned complete product lifecycle end-to-end: system architecture, full-stack implementation, cloud deployment, and domain configuration.",
      "Built an interactive in-browser Java code playground with real-time execution and progress tracking.",
      "Engineered a contextual AI tutor using Python and LangChain to provide structured algorithmic hints without spoiling solutions.",
      "Implemented role-based authentication (RBAC) and persistent user telemetry with Supabase.",
    ],
    externalLinks: [
      { label: "Launch live platform", href: "https://www.algoguru.online/" },
      { label: "View source code", href: "https://github.com/Aritradutta2002" },
    ],
    specifications: [
      { label: "PRODUCT ID", value: "algoguru-prod-v1" },
      { label: "OWNERSHIP", value: "100% End-to-End Architecture & Deployment" },
      { label: "FRONTEND STACK", value: "React, TypeScript, Tailwind CSS" },
      { label: "BACKEND & SANDBOX", value: "Java, Python, REST Microservices" },
      { label: "AI ORCHESTRATION", value: "LangChain + Contextual LLM Tutor" },
      { label: "AUTH & DATABASE", value: "Supabase (PostgreSQL + RBAC)" },
    ],
    performance: [
      { label: "SANDBOX ENGINE", highlight: "Live", unit: "in-browser Java" },
      { label: "AI MENTORSHIP", highlight: "RAG", unit: "LangChain tutor" },
      { label: "LIFECYCLE", highlight: "100%", unit: "owned end-to-end" },
    ],
    architecture: [
      { label: "CLIENT UI", value: "React + TypeScript" },
      { label: "STYLING", value: "Tailwind CSS" },
      { label: "AI PIPELINE", value: "Python + LangChain" },
      { label: "EXECUTION", value: "Java Sandbox" },
      { label: "BACKEND-AS-A-SVC", value: "Supabase" },
    ],
    footerNote: "LIVE PRODUCTION WEB APPLICATION",
  },
];

export interface SkillDomain {
  code: string;
  domain: string;
  items: string[];
  primaryHighlight: string;
}

export const SKILLS_MATRIX: SkillDomain[] = [
  {
    code: "MOD-01",
    domain: "LANGUAGES",
    items: ["Java (8 / 21 LTS)", "Python", "TypeScript", "SQL"],
    primaryHighlight: "Java 21 LTS",
  },
  {
    code: "MOD-02",
    domain: "FRAMEWORKS & LIBRARIES",
    items: [
      "Spring Boot 3.x",
      "Spring MVC",
      "Spring Security (JWT)",
      "Spring Data JPA",
      "Hibernate",
      "REST APIs",
      "Microservices",
      "React",
      "Angular",
      "Tailwind CSS",
    ],
    primaryHighlight: "Spring Boot 3.x",
  },
  {
    code: "MOD-03",
    domain: "AI & GENERATIVE AI",
    items: ["Generative AI", "RAG Architectures", "LangChain", "LLM Integration"],
    primaryHighlight: "LangChain & RAG",
  },
  {
    code: "MOD-04",
    domain: "DATABASES & MESSAGING",
    items: ["PostgreSQL", "Oracle DB", "MySQL", "Apache Kafka", "Supabase"],
    primaryHighlight: "PostgreSQL & Kafka",
  },
  {
    code: "MOD-05",
    domain: "CLOUD, DEVOPS & PLATFORM",
    items: [
      "AWS",
      "AWS Transform",
      "Azure Tomcat PaaS",
      "Docker",
      "Jenkins CI/CD",
      "Git",
      "Maven",
      "SonarQube",
      "Tomcat",
      "JBoss",
      "GitHub Copilot",
    ],
    primaryHighlight: "AWS & Azure PaaS",
  },
  {
    code: "MOD-06",
    domain: "ENGINEERING PRACTICES",
    items: [
      "Agile / Scrum",
      "Jira / Jile",
      "JUnit Testing (2,000+ cases)",
      "Code Review",
      "Technical Interviewing",
    ],
    primaryHighlight: "Enterprise Agile",
  },
];

export const BENCHMARKS_DATA = {
  cpTotalSolved: "700+",
  leetcodeRating: "1672",
  codechefRating: "1708",
  codechefStars: "3★",
  codeforcesRating: "1046",
  education: {
    degree: "B.Tech in Electronics & Communication Engineering (ECE)",
    institution:
      "Maulana Abul Kalam Azad University of Technology (MAKAUT), Kolkata",
    period: "2020 – 2024",
    cgpa: "8.79",
  },
  certification: {
    title: "Enterprise Java Modernisation — AWS Transform",
    detail:
      "Led remediation of enterprise microservices: Java 8 → 21, Spring Boot 1.x → 3.x, with 20× faster critical APIs.",
  },
};

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
