"use client";

import { useMemo } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Cloud,
  Code2,
  Database,
  Sparkles,
  Terminal,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";

interface SkillDiscipline {
  index: string;
  discipline: string;
  tagline: string;
  icon: LucideIcon;
  skills: string[];
}

const DISCIPLINES: SkillDiscipline[] = [
  {
    index: "01",
    discipline: "Languages & Runtimes",
    tagline: "Core execution, type safety & backend algorithms",
    icon: Code2,
    skills: ["Java 21", "TypeScript", "Python", "SQL", "C++"],
  },
  {
    index: "02",
    discipline: "Cloud & Distributed Systems",
    tagline: "Containerization, orchestration & message brokering",
    icon: Cloud,
    skills: [
      "Azure",
      "Spring Boot",
      "Microservices",
      "Docker",
      "Kubernetes",
      "Kafka",
      "AWS Transform",
      "Jenkins",
    ],
  },
  {
    index: "03",
    discipline: "AI & Architecture",
    tagline: "RAG orchestration, vector databases & system design",
    icon: Sparkles,
    skills: ["RAG", "Vector DBs", "LangChain", "System Design", "REST/gRPC"],
  },
  {
    index: "04",
    discipline: "Storage & Databases",
    tagline: "Relational persistence, cache layers & ORM mappings",
    icon: Database,
    skills: [
      "PostgreSQL",
      "Redis",
      "MongoDB",
      "Hibernate/JPA",
      "Oracle",
      "Supabase",
    ],
  },
  {
    index: "05",
    discipline: "Practices & Tools",
    tagline: "Automated pipelines, static analysis & team agility",
    icon: Workflow,
    skills: [
      "Git",
      "CI/CD",
      "Agile",
      "Linux",
      "SonarQube",
      "Unit/Integration Testing",
    ],
  },
];

const PRINCIPLES = [
  "Measure before and after — every optimisation needs a number.",
  "Ship in small, testable slices that stay reversible.",
  "Leave the system easier to operate than you found it.",
];

export function SkillsMatrix() {
  const reduceMotion = useReducedMotion();

  const totalSkills = useMemo(
    () => DISCIPLINES.reduce((sum, d) => sum + d.skills.length, 0),
    []
  );

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-b border-zro-line py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Section Header & Principles */}
          <div className="lg:col-span-4">
            <SectionHeader
              id="skills-heading"
              index="03"
              title="Skills"
              description="Enterprise Java at the core, cloud and CI/CD around it, and React or AI tooling where the product needs a face."
            />

            <div className="zro-skills-stats mt-7 border-y border-zro-line">
              <div>
                <p>{String(totalSkills).padStart(2, "0")}</p>
                <span>Technologies in use</span>
              </div>
              <div>
                <p>{String(DISCIPLINES.length).padStart(2, "0")}</p>
                <span>Disciplines covered</span>
              </div>
            </div>

            <div className="zro-skills-principles mt-6">
              <p className="zro-eyebrow">How I work</p>
              <ul>
                {PRINCIPLES.map((principle) => (
                  <li key={principle}>
                    <span aria-hidden="true" />
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* High-Density Categorical Skills Matrix Grid */}
          <div className="lg:col-span-8">
            <div className="mb-4 flex items-center justify-between border-b border-zro-line pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-zro-accent" aria-hidden="true" />
                <span className="text-xs font-mono uppercase tracking-[0.12em] text-zro-accent font-semibold">
                  Engineering Skills Matrix
                </span>
              </div>
              <span className="text-[0.6875rem] font-mono uppercase tracking-wider text-zro-faint">
                {DISCIPLINES.length} Categorical Disciplines
              </span>
            </div>

            <motion.div
              variants={reduceMotion ? undefined : containerVariants}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-10%" }}
              className="space-y-4"
            >
              {DISCIPLINES.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.discipline}
                    variants={reduceMotion ? undefined : cardVariants}
                    data-spot
                    className="zro-card rounded-xl border border-zro-line bg-[#0c0d10]/95 p-5 md:p-6 transition-colors hover:border-zro-line/80"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 pb-3.5 border-b border-zro-line/50">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-zro-line bg-white/[0.03] text-zro-accent">
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="text-sm font-sans font-semibold text-zro-ink">
                            {item.discipline}
                          </h3>
                          <p className="mt-0.5 text-xs text-zro-muted">
                            {item.tagline}
                          </p>
                        </div>
                      </div>
                      <span className="text-[0.625rem] font-mono tracking-widest text-zro-faint">
                        {"// "}{item.index}
                      </span>
                    </div>

                    {/* Skill Badges */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1.5 rounded-md border border-zro-line bg-white/[0.02] px-2.5 py-1 text-xs font-mono text-zro-ink transition-colors hover:border-zro-accent hover:text-zro-accent"
                        >
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 rounded-full bg-zro-accent/70"
                          />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
