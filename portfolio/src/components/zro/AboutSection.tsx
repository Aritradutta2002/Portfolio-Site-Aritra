"use client";

import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  Trophy,
  MapPin,
  Github,
  Linkedin,
  Code2,
  Cpu,
  Layers,
  ArrowUpRight,
  Sparkles,
  Globe,
  Terminal,
} from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { Tag } from "./ui/Tag";
import { Button } from "./ui/Button";
import { CopyEmail } from "./CopyEmail";
import {
  CONTACT_LINKS,
  EDUCATION,
  EXPERIENCE,
  PORTFOLIO_HEADER,
  SPOKEN_LANGUAGES,
  ACHIEVEMENTS,
  HEADLINE_METRICS,
} from "@/data/portfolioCatalog";

export function AboutSection() {
  const currentRole = EXPERIENCE[0];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-zro-line py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Top Header Row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-zro-line pb-8">
          <div>
            <SectionHeader
              id="about-heading"
              index="01"
              title="About Me"
              description="Full Stack Application Engineer specializing in enterprise Java microservices, cloud migrations, high-throughput systems, and AI-native platforms."
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1.5 rounded-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="zro-metric text-[0.6875rem] uppercase tracking-[0.08em] text-emerald-400">
                {PORTFOLIO_HEADER.availability}
              </span>
            </div>

            <Button
              href={CONTACT_LINKS.resumePdf}
              variant="solid"
              size="sm"
              arrow
              external
            >
              Download CV
            </Button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Card 1: Stylized 3D Avatar & Identity Card (5 cols) */}
          <div
            data-reveal
            className="zro-card group relative p-6 lg:col-span-5 flex flex-col justify-between"
          >


            <div>
              {/* Top Bar with Status */}
              <div className="flex items-center justify-between border-b border-zro-line pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="zro-plate text-zro-accent font-mono font-medium">
                    {"// AVATAR"}
                  </span>
                  <span className="zro-eyebrow text-[0.625rem]">
                    APPLE MEMOJI
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[0.625rem] font-mono text-emerald-400 uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  Active in Prod
                </span>
              </div>

              {/* Stylized 3D Avatar Showcase Frame */}
              <div className="mt-4 relative aspect-[4/4.2] w-full overflow-hidden border border-zro-line bg-zro-surface/60 group-hover:border-zro-accent/50 transition-colors duration-500">
                <Image
                  src="/aritra-memoji.jpg"
                  alt="Aritra Dutta — Official Apple Memoji Avatar"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-top filter contrast-105 transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--zro-canvas))]/90 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Role Pill */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-md">
                  <div>
                    <p className="text-[0.8125rem] font-medium text-white tracking-wide">
                      {PORTFOLIO_HEADER.name}
                    </p>
                    <p className="zro-eyebrow text-[0.625rem] text-zro-muted">
                      {PORTFOLIO_HEADER.role}
                    </p>
                  </div>
                  <span className="zro-metric text-[0.625rem] text-zro-accent border border-zro-accent/40 bg-zro-accent/10 px-2 py-0.5">
                    TCS
                  </span>
                </div>
              </div>

              {/* Bio Meta Details */}
              <div className="mt-5 space-y-2.5 border-t border-zro-line pt-4">
                <div className="flex items-center justify-between text-[0.8125rem]">
                  <span className="flex items-center gap-2 text-zro-muted">
                    <Briefcase className="h-3.5 w-3.5 text-zro-accent" />
                    Organization
                  </span>
                  <span className="font-medium text-zro-ink">
                    Tata Consultancy Services
                  </span>
                </div>

                <div className="flex items-center justify-between text-[0.8125rem]">
                  <span className="flex items-center gap-2 text-zro-muted">
                    <MapPin className="h-3.5 w-3.5 text-zro-accent" />
                    Location
                  </span>
                  <span className="font-medium text-zro-ink">
                    Bhubaneswar, India 🇮🇳
                  </span>
                </div>

                <div className="flex items-center justify-between text-[0.8125rem]">
                  <span className="flex items-center gap-2 text-zro-muted">
                    <Globe className="h-3.5 w-3.5 text-zro-accent" />
                    Languages
                  </span>
                  <span className="font-medium text-zro-ink">
                    {SPOKEN_LANGUAGES.join(" · ")}
                  </span>
                </div>
              </div>

              {/* Technical Clearance Pills */}
              <div className="mt-4 pt-4 border-t border-zro-line">
                <p className="zro-eyebrow text-[0.625rem] mb-2 text-zro-muted">
                  Production Clearances
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="font-mono text-[0.6875rem] border border-zro-line bg-zro-surface/40 px-2 py-0.5 text-zro-ink">
                    Java 21 · Spring Boot 4
                  </span>
                  <span className="font-mono text-[0.6875rem] border border-zro-line bg-zro-surface/40 px-2 py-0.5 text-zro-ink">
                    Azure Tomcat PaaS · AWS
                  </span>
                  <span className="font-mono text-[0.6875rem] border border-zro-line bg-zro-surface/40 px-2 py-0.5 text-zro-ink">
                    LangChain · RAG · Python
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links Footer */}
            <div className="mt-6 border-t border-zro-line pt-4 flex items-center justify-between">
              <span className="zro-eyebrow text-[0.6875rem]">Connect</span>
              <div className="flex items-center gap-2">
                <a
                  href={CONTACT_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zro-muted hover:text-zro-ink border border-zro-line hover:border-zro-line-strong transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={CONTACT_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zro-muted hover:text-zro-ink border border-zro-line hover:border-zro-line-strong transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={CONTACT_LINKS.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-zro-muted hover:text-zro-ink border border-zro-line hover:border-zro-line-strong transition-colors"
                  aria-label="LeetCode Profile"
                >
                  <Code2 className="h-4 w-4" />
                </a>
                <div className="pl-1">
                  <CopyEmail email={CONTACT_LINKS.email} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Narrative Dossier & Impact Metrics (7 cols) */}
          <div
            data-reveal
            className="zro-card group relative p-6 md:p-8 lg:col-span-7 flex flex-col justify-between"
          >
            {/* Top Eyebrow */}
            <div>
              <div className="flex items-center justify-between border-b border-zro-line pb-4">
                <span className="zro-eyebrow flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-zro-accent" />
                  Engineering Philosophy
                </span>
                <span className="zro-metric text-[0.6875rem] uppercase text-zro-accent">
                  Full-Stack & Systems
                </span>
              </div>

              {/* Editorial Narrative */}
              <div className="mt-5 space-y-4 text-[0.9375rem] leading-[1.75] text-zro-muted">
                <p>
                  I am a{" "}
                  <strong className="font-semibold text-zro-ink">
                    Full Stack Application Engineer
                  </strong>{" "}
                  with 2+ years of production experience at{" "}
                  <strong className="font-semibold text-zro-ink">
                    Tata Consultancy Services
                  </strong>
                  . My engineering craft centers on modernizing enterprise
                  microservices, building high-throughput cloud architectures,
                  and integrating intelligent AI capabilities into real-world
                  software.
                </p>
                <p>
                  In client-facing production environments, I execute the
                  remediation of legacy Java 8 microservices to{" "}
                  <span className="text-zro-ink font-medium">Java 21</span> and{" "}
                  <span className="text-zro-ink font-medium">Spring Boot 4.x</span>
                  , migrate mission-critical applications from on-premises JBoss
                  to{" "}
                  <span className="text-zro-ink font-medium">
                    Azure Tomcat PaaS
                  </span>
                  , and optimize relational SQL queries and REST APIs to achieve
                  up to <span className="text-zro-accent font-semibold">20× faster</span>{" "}
                  response times.
                </p>
                <p>
                  Beyond enterprise backends, I own products end-to-end — such as{" "}
                  <a
                    href="https://www.algoguru.online/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zro-ink underline decoration-zro-accent/50 underline-offset-4 hover:decoration-zro-accent"
                  >
                    AlgoGuru.online
                  </a>
                  , a live learning platform featuring an in-browser Java
                  playground and a retrieval-augmented (RAG) AI algorithm tutor
                  powered by LangChain and Python.
                </p>
              </div>

              {/* 4 Metric Callout Cards */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {HEADLINE_METRICS.map((metric) => (
                  <div
                    key={metric.label}
                    className="border border-zro-line bg-zro-surface/40 p-3.5 transition-colors duration-200 group-hover:border-zro-line-strong"
                  >
                    <p className="zro-metric text-[1.5rem] font-medium leading-none text-zro-ink">
                      {metric.value}
                    </p>
                    <p className="zro-eyebrow mt-2 text-[0.625rem] text-zro-muted">
                      {metric.label}
                    </p>
                  </div>
                ))}
                <div className="border border-zro-line bg-zro-surface/40 p-3.5 transition-colors duration-200 group-hover:border-zro-line-strong">
                  <p className="zro-metric text-[1.5rem] font-medium leading-none text-zro-accent">
                    {EDUCATION[0].score}
                  </p>
                  <p className="zro-eyebrow mt-2 text-[0.625rem] text-zro-muted">
                    B.Tech CGPA
                  </p>
                </div>
              </div>
            </div>

            {/* Core Competencies Ribbon */}
            <div className="mt-8 border-t border-zro-line pt-5">
              <p className="zro-eyebrow mb-3 text-[0.6875rem]">
                Core Competencies Deployed in Production
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Java 21",
                  "Spring Boot 4",
                  "Azure Tomcat PaaS",
                  "AWS Transform",
                  "LangChain & RAG",
                  "Jenkins CI/CD",
                  "Docker",
                  "PostgreSQL",
                  "React & TypeScript",
                ].map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Deep Dive Enterprise Experience (12 cols) */}
          <div
            id="experience"
            data-reveal
            className="zro-card group relative p-6 md:p-8 lg:col-span-12"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-zro-line pb-6">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="zro-plate text-zro-accent">01</span>
                  <h3 className="text-[1.25rem] font-medium tracking-[-0.02em] text-zro-ink">
                    {currentRole.role}
                  </h3>
                  <span className="text-zro-muted">·</span>
                  <span className="text-[1.0625rem] text-zro-ink font-normal">
                    {currentRole.org}
                  </span>
                </div>
                <p className="zro-eyebrow mt-1 text-zro-muted">
                  Bhubaneswar, Odisha · {currentRole.period}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[0.6875rem] uppercase tracking-wider text-emerald-400 font-mono">
                  <span className="h-1.5 w-1.5 bg-emerald-400" />
                  Active Production Role
                </span>
              </div>
            </div>

            <p className="mt-5 text-[0.9375rem] leading-relaxed text-zro-muted max-w-[80ch]">
              {currentRole.summary}
            </p>

            {/* Categorized Impact Pillars */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-zro-line p-4.5 bg-zro-surface/20 hover:border-zro-line-strong transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="h-4 w-4 text-zro-accent" />
                  <h4 className="text-[0.875rem] font-medium text-zro-ink">
                    Microservices Modernization
                  </h4>
                </div>
                <p className="text-[0.8125rem] text-zro-muted leading-relaxed">
                  Migrated mission-critical services from Java 8 to Java 21 and
                  Spring Boot 1.x to 4.x, eliminating technical debt, boosting
                  memory efficiency, and hardening security for 10K+ enterprise
                  users.
                </p>
              </div>

              <div className="border border-zro-line p-4.5 bg-zro-surface/20 hover:border-zro-line-strong transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Layers className="h-4 w-4 text-zro-accent" />
                  <h4 className="text-[0.875rem] font-medium text-zro-ink">
                    Azure PaaS Cloud Migration
                  </h4>
                </div>
                <p className="text-[0.8125rem] text-zro-muted leading-relaxed">
                  Migrated on-premises JBoss setups to Azure Tomcat PaaS with
                  automated health checks, high availability, and deployment
                  slots, utilizing AWS Transform to accelerate dependency
                  upgrades.
                </p>
              </div>

              <div className="border border-zro-line p-4.5 bg-zro-surface/20 hover:border-zro-line-strong transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-zro-accent" />
                  <h4 className="text-[0.875rem] font-medium text-zro-ink">
                    20× API & Database Optimization
                  </h4>
                </div>
                <p className="text-[0.8125rem] text-zro-muted leading-relaxed">
                  Refactored complex SQL query joins and RESTful endpoints,
                  slashing latency by up to 20× on critical business reporting
                  and real-time tracking pipelines.
                </p>
              </div>

              <div className="border border-zro-line p-4.5 bg-zro-surface/20 hover:border-zro-line-strong transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="h-4 w-4 text-zro-accent" />
                  <h4 className="text-[0.875rem] font-medium text-zro-ink">
                    DevOps & Continuous Quality
                  </h4>
                </div>
                <p className="text-[0.8125rem] text-zro-muted leading-relaxed">
                  Built end-to-end Jenkins CI/CD pipelines with Docker packaging,
                  JaCoCo unit test coverage enforcement, SonarQube static
                  analysis, and Postman API contract validations.
                </p>
              </div>
            </div>

            {/* Stack Tags */}
            <div className="mt-6 flex flex-wrap gap-2 border-t border-zro-line pt-5">
              {currentRole.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </div>

          {/* Card 4: Education & Academic Honors (6 cols) */}
          <div
            data-reveal
            className="zro-card group relative p-6 md:p-8 lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-zro-line pb-4">
                <span className="zro-eyebrow flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-zro-accent" />
                  Education & Honors
                </span>
                <span className="zro-metric text-[0.6875rem] text-zro-muted">
                  Formal Qualifications
                </span>
              </div>

              <div className="mt-6 space-y-6">
                {/* Degree 1 */}
                <div className="border-b border-zro-line pb-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-[1rem] font-medium text-zro-ink">
                        {EDUCATION[0].level} in {EDUCATION[0].degree}
                      </h4>
                      <p className="mt-1 text-[0.8125rem] text-zro-muted">
                        {EDUCATION[0].institution}
                      </p>
                      <p className="zro-metric mt-1 text-[0.6875rem] text-zro-muted">
                        {EDUCATION[0].period} · {EDUCATION[0].location}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-block border border-zro-accent/50 bg-zro-accent/10 px-2.5 py-1 text-[0.8125rem] font-mono font-medium text-zro-accent">
                        CGPA {EDUCATION[0].score}
                        <span className="text-zro-muted text-[0.6875rem]">
                          {" "}
                          {EDUCATION[0].scoreSuffix}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Secondary & Higher Secondary */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h5 className="text-[0.875rem] font-medium text-zro-ink">
                        {EDUCATION[1].level} ({EDUCATION[1].degree})
                      </h5>
                      <p className="text-[0.75rem] text-zro-muted">
                        {EDUCATION[1].institution} · {EDUCATION[1].period}
                      </p>
                    </div>
                    <span className="zro-metric text-[0.75rem] text-zro-ink border border-zro-line px-2 py-0.5">
                      {EDUCATION[1].score}%
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h5 className="text-[0.875rem] font-medium text-zro-ink">
                        {EDUCATION[2].level}
                      </h5>
                      <p className="text-[0.75rem] text-zro-muted">
                        {EDUCATION[2].institution} · {EDUCATION[2].period}
                      </p>
                    </div>
                    <span className="zro-metric text-[0.75rem] text-zro-ink border border-zro-line px-2 py-0.5">
                      {EDUCATION[2].score}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-zro-line pt-4 flex items-center justify-between">
              <span className="zro-eyebrow text-[0.6875rem]">Verified Record</span>
              <span className="zro-metric text-[0.6875rem] text-zro-muted">
                First Class with Distinction
              </span>
            </div>
          </div>

          {/* Card 5: Competitive Programming Rigor (6 cols) */}
          <div
            data-reveal
            className="zro-card group relative p-6 md:p-8 lg:col-span-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-zro-line pb-4">
                <span className="zro-eyebrow flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-zro-accent" />
                  Algorithmic Rigor
                </span>
                <span className="zro-metric text-[0.6875rem] text-zro-accent">
                  700+ Problems Solved
                </span>
              </div>

              <p className="mt-5 text-[0.875rem] leading-relaxed text-zro-muted">
                {ACHIEVEMENTS.competitiveProgramming.detail}
              </p>

              {/* Profiles Matrix */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ACHIEVEMENTS.competitiveProgramming.profiles.map((p) => (
                  <a
                    key={p.label}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-zro-line p-3.5 bg-zro-surface/30 hover:border-zro-accent/50 hover:bg-zro-surface/60 transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="zro-eyebrow text-[0.625rem]">
                        {p.label}
                      </span>
                      <ArrowUpRight className="h-3 w-3 text-zro-muted" />
                    </div>
                    <p className="zro-metric mt-3 text-[1.125rem] font-medium text-zro-ink">
                      {p.value}
                    </p>
                  </a>
                ))}
              </div>

              {/* Problem Solving Domains */}
              <div className="mt-6 space-y-2.5 border-t border-zro-line pt-5">
                <p className="zro-eyebrow text-[0.6875rem]">
                  Specialized Problem Domains
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Dynamic Programming",
                    "Graph Traversal & BFS/DFS",
                    "Segment Trees & Heaps",
                    "Two Pointers & Sliding Window",
                    "Greedy & Binary Search",
                    "Bit Manipulation",
                  ].map((domain) => (
                    <span
                      key={domain}
                      className="text-[0.6875rem] font-mono border border-zro-line px-2 py-0.5 text-zro-muted"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-zro-line pt-4 flex items-center justify-between">
              <span className="zro-eyebrow text-[0.6875rem]">LeetCode Rating</span>
              <span className="zro-metric text-[0.75rem] text-zro-accent font-medium">
                1672 (Top Percentile)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
