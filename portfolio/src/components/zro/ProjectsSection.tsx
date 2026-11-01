"use client";

import { useState, useMemo } from "react";
import { SectionHeader } from "./ui/SectionHeader";
import { Button } from "./ui/Button";
import { Tag } from "./ui/Tag";
import {
  PROJECTS,
  type CatalogCategory,
  type SystemCategory,
} from "@/data/portfolioCatalog";

const CATEGORIES: SystemCategory[] = [
  "ALL",
  "GENAI & FULL-STACK",
  "JAVA / SPRING",
  "CLOUD & PAAS",
  "ALGORITHMS & TOOLS",
];

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<SystemCategory>("ALL");

  // Calculate counts for category filters
  const categoryCounts = useMemo(() => {
    const counts: Record<SystemCategory, number> = {
      ALL: PROJECTS.length,
      "GENAI & FULL-STACK": 0,
      "JAVA / SPRING": 0,
      "CLOUD & PAAS": 0,
      "ALGORITHMS & TOOLS": 0,
    };

    PROJECTS.forEach((p) => {
      p.categories.forEach((cat) => {
        if (cat in counts) {
          counts[cat]++;
        }
      });
    });

    return counts;
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "ALL") return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(selectedCategory as CatalogCategory));
  }, [selectedCategory]);

  const flagship = PROJECTS.find((p) => p.id === "algoguru");
  const showFlagshipSpotlight =
    flagship &&
    (selectedCategory === "ALL" ||
      flagship.categories.includes(selectedCategory as CatalogCategory));

  const regularProjects = useMemo(() => {
    if (showFlagshipSpotlight) {
      return filteredProjects.filter((p) => p.id !== "algoguru");
    }
    return filteredProjects;
  }, [filteredProjects, showFlagshipSpotlight]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-zro-line py-16 md:py-24 relative"
    >
      {/* Hidden backward-compatible anchor for #work links */}
      <div id="work" aria-hidden="true" className="sr-only" />

      <div className="mx-auto max-w-6xl px-6 md:px-8">
        {/* Section Header with KPI strip */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-zro-line pb-8">
          <div>
            <SectionHeader
              id="projects-heading"
              index="02"
              title="Projects"
              description="Engineered from concept to production — featuring full-stack architectures, GenAI integrations, enterprise modernization, and algorithmic engines."
            />
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="border border-zro-line bg-zro-surface/40 px-4 py-2">
              <p className="zro-metric text-[1.5rem] font-medium leading-none text-zro-ink">
                {String(PROJECTS.length).padStart(2, "0")}
              </p>
              <p className="zro-eyebrow mt-1 text-[0.625rem] text-zro-muted">
                Systems Built
              </p>
            </div>

            <div className="border border-zro-line bg-zro-surface/40 px-4 py-2">
              <p className="zro-metric text-[1.5rem] font-medium leading-none text-zro-accent">
                20×
              </p>
              <p className="zro-eyebrow mt-1 text-[0.625rem] text-zro-muted">
                Max API Gain
              </p>
            </div>

            <div className="border border-zro-line bg-zro-surface/40 px-4 py-2">
              <p className="zro-metric text-[1.5rem] font-medium leading-none text-emerald-400">
                100%
              </p>
              <p className="zro-eyebrow mt-1 text-[0.625rem] text-zro-muted">
                Production Tested
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters Bar */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            const count = categoryCounts[category];

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`zro-metric text-[0.6875rem] uppercase tracking-wider px-3.5 py-1.5 transition-all duration-200 ${
                  isSelected
                    ? "border border-zro-accent bg-zro-accent/15 text-zro-accent font-medium shadow-[0_0_12px_rgba(200,164,107,0.2)]"
                    : "border border-zro-line bg-transparent text-zro-muted hover:border-zro-line-strong hover:text-zro-ink"
                }`}
              >
                <span>{category}</span>
                <span className="ml-1.5 opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Flagship Spotlight: AlgoGuru */}
        {showFlagshipSpotlight && flagship && (
          <div data-reveal className="mt-10">
            <article className="zro-card group relative p-6 md:p-10 border-zro-line hover:border-zro-accent/40 transition-all duration-500">
              {/* Top Bar with Live Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zro-line pb-6">
                <div className="flex items-center gap-3">
                  <span className="zro-plate text-zro-accent font-mono font-medium">
                    {"// 01 · FLAGSHIP"}
                  </span>
                  <span className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[0.6875rem] font-mono text-emerald-400 uppercase tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Live at algoguru.online
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="zro-metric text-[0.6875rem] text-zro-muted uppercase">
                    {flagship.years}
                  </span>
                  <span className="zro-metric border border-zro-accent/40 bg-zro-accent/10 px-2 py-0.5 text-[0.6875rem] text-zro-accent uppercase">
                    Custom Domain
                  </span>
                </div>
              </div>

              {/* Main Content Layout */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Project Narrative */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <h3 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-medium tracking-tight text-zro-ink">
                      {flagship.name}
                    </h3>
                    <p className="zro-eyebrow mt-1 text-zro-accent text-[0.75rem]">
                      Full-Stack Competitive Programming & AI Learning Platform
                    </p>
                  </div>

                  <p className="text-[0.9375rem] leading-relaxed text-zro-muted">
                    {flagship.summary}
                  </p>

                  {/* Highlights Grid */}
                  <div className="space-y-3 pt-2">
                    <p className="zro-eyebrow text-[0.6875rem]">
                      Key Architecture Highlights
                    </p>
                    <ul className="space-y-2.5">
                      {flagship.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-[0.875rem] text-zro-muted leading-relaxed"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-2 shrink-0 bg-zro-accent"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    <Button
                      href="https://www.algoguru.online/"
                      variant="solid"
                      size="md"
                      arrow
                      external
                    >
                      Launch Live Platform
                    </Button>
                    <Button
                      href="https://github.com/Aritradutta2002"
                      variant="outline"
                      size="md"
                      arrow
                      external
                    >
                      View Source Code
                    </Button>
                  </div>
                </div>

                {/* Right Column: Interactive IDE / Terminal Mockup */}
                <div className="lg:col-span-5">
                  <div className="border border-zro-line bg-black/60 rounded-none overflow-hidden shadow-2xl backdrop-blur-md">
                    {/* Window Title Bar */}
                    <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      </div>
                      <span className="font-mono text-[0.6875rem] text-zro-muted">
                        GuruBotRAG.py · AlgoGuru
                      </span>
                      <span className="font-mono text-[0.625rem] text-zro-accent">
                        Python 3.11
                      </span>
                    </div>

                    {/* Code Content */}
                    <div className="p-4 font-mono text-[0.75rem] leading-[1.7] text-zinc-300 overflow-x-auto">
                      <p className="text-zinc-500">
                        # Autonomous RAG Algorithm Tutor
                      </p>
                      <p>
                        <span className="text-purple-400">from</span> langchain{" "}
                        <span className="text-purple-400">import</span>{" "}
                        RetrievalQA
                      </p>
                      <p>
                        <span className="text-purple-400">class</span>{" "}
                        <span className="text-yellow-300">GuruBotTutor</span>:
                      </p>
                      <p className="pl-4">
                        <span className="text-purple-400">def</span>{" "}
                        <span className="text-blue-400">generate_hint</span>(self,
                        code, problem_id):
                      </p>
                      <p className="pl-8 text-zinc-400">
                        doc = self.vector_db.lookup(problem_id)
                      </p>
                      <p className="pl-8 text-zinc-400">
                        prompt = self.build_prompt(doc, code)
                      </p>
                      <p className="pl-8">
                        <span className="text-purple-400">return</span>{" "}
                        self.llm.stream(prompt)
                      </p>
                    </div>

                    {/* Live System Telemetry Strip */}
                    <div className="border-t border-white/10 bg-white/[0.02] p-3 text-[0.6875rem] font-mono space-y-1.5">
                      <div className="flex items-center justify-between text-zinc-400">
                        <span>Production URL:</span>
                        <a
                          href="https://www.algoguru.online"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:underline"
                        >
                          https://www.algoguru.online ↗
                        </a>
                      </div>
                      <div className="flex items-center justify-between text-zinc-400">
                        <span>System Health:</span>
                        <span className="text-emerald-400">
                          200 OK · 99.9% Uptime
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-zinc-400">
                        <span>Runtime Sandbox:</span>
                        <span className="text-zinc-200">
                          In-Browser Java 21 Engine
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stack Badges Footer */}
              <div className="mt-8 flex flex-wrap gap-2 border-t border-zro-line pt-5">
                {flagship.stack.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>
            </article>
          </div>
        )}

        {/* Regular Projects Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularProjects.map((item, index) => {
            const projectNumber = String(
              showFlagshipSpotlight ? index + 2 : index + 1
            ).padStart(2, "0");
            
            return (
              <article
                key={item.id}
                id={item.id}
                data-reveal
                className="zro-card group relative p-6 md:p-8 flex flex-col justify-between hover:border-zro-accent/50 transition-all duration-300"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zro-line pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="zro-plate text-zro-accent font-mono">
                        {"// "}{projectNumber}
                      </span>
                      <span className="zro-eyebrow text-[0.625rem]">
                        {item.kind}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.metric && (
                        <span className="zro-metric text-[0.6875rem] font-medium border border-zro-accent/40 bg-zro-accent/10 text-zro-accent px-2 py-0.5">
                          {item.metric.value}
                        </span>
                      )}
                      <span className="zro-metric text-[0.6875rem] text-zro-muted">
                        {item.years}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-5">
                    <h4 className="text-[1.25rem] font-medium tracking-tight text-zro-ink group-hover:text-white transition-colors">
                      {item.name}
                    </h4>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-zro-muted">
                      {item.summary}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="mt-5 space-y-2 border-t border-zro-line pt-4">
                    {item.bullets.slice(0, 3).map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-[0.8125rem] text-zro-muted leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1 w-1.5 shrink-0 bg-zro-line-strong group-hover:bg-zro-accent transition-colors"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer with Stack & Links */}
                <div className="mt-8 border-t border-zro-line pt-5">
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>

                  {item.links && item.links.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2.5">
                      {item.links.map((link, linkIndex) => (
                        <Button
                          key={link.label}
                          href={link.href}
                          variant={linkIndex === 0 ? "solid" : "outline"}
                          size="sm"
                          arrow
                          external={link.href.startsWith("http")}
                        >
                          {link.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
