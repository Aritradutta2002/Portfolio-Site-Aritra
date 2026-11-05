"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { FlagshipShowcase } from "./projects/FlagshipShowcase";
import { ProjectCard } from "./projects/ProjectCard";
import { CaseStudyDrawer } from "./projects/CaseStudyDrawer";
import {
  CONTACT_LINKS,
  PROJECTS,
  type CatalogCategory,
  type ProjectItem,
  type SystemCategory,
} from "@/data/portfolioCatalog";

const CATEGORIES: SystemCategory[] = [
  "ALL",
  "GENAI & FULL-STACK",
  "JAVA / SPRING",
  "CLOUD & PAAS",
  "ALGORITHMS & TOOLS",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<SystemCategory>("ALL");
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectItem | null>(
    null
  );
  const reduceMotion = useReducedMotion();

  const categoryCounts = useMemo(() => {
    const counts: Record<SystemCategory, number> = {
      ALL: PROJECTS.length,
      "GENAI & FULL-STACK": 0,
      "JAVA / SPRING": 0,
      "CLOUD & PAAS": 0,
      "ALGORITHMS & TOOLS": 0,
    };

    PROJECTS.forEach((project) => {
      project.categories.forEach((category) => {
        counts[category] += 1;
      });
    });

    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "ALL") return PROJECTS;
    return PROJECTS.filter((project) =>
      project.categories.includes(selectedCategory as CatalogCategory)
    );
  }, [selectedCategory]);

  const flagship = PROJECTS.find((project) => project.id === "algoguru");
  const showFlagship =
    flagship !== undefined &&
    (selectedCategory === "ALL" ||
      flagship.categories.includes(selectedCategory as CatalogCategory));

  const regularProjects = useMemo(() => {
    if (showFlagship) {
      return filteredProjects.filter((project) => project.id !== "algoguru");
    }
    return filteredProjects;
  }, [filteredProjects, showFlagship]);

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: EASE };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative border-b border-zro-line py-16 md:py-24"
    >
      {/* Hidden backward-compatible anchor for #work links */}
      <div id="work" aria-hidden="true" className="sr-only" />

      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex flex-col gap-6 border-b border-zro-line pb-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            id="projects-heading"
            index="02"
            title="Projects"
            description="Systems I have designed, shipped, and kept alive — enterprise migrations, a live AI learning platform, and algorithmic tools built to understand the fundamentals."
          />

          <div className="flex flex-wrap items-stretch gap-2.5 md:shrink-0">
            <div className="zro-project-kpi">
              <p>{String(PROJECTS.length).padStart(2, "0")}</p>
              <span>Systems built</span>
            </div>
            <div className="zro-project-kpi">
              <p className="text-zro-accent">20×</p>
              <span>Max API gain</span>
            </div>
            <div className="zro-project-kpi">
              <p className="text-emerald-700 dark:text-emerald-400">100%</p>
              <span>Production tested</span>
            </div>
          </div>
        </div>

        <div className="zro-project-filter-row mt-8">
          <div
            className="zro-project-filter"
            role="group"
            aria-label="Filter projects by discipline"
          >
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  data-active={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className="zro-project-filter-btn"
                >
                  {isSelected ? (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="zro-project-filter-pill"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 38 }
                      }
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="zro-project-filter-label">{category}</span>
                  <span className="zro-project-filter-count">
                    {String(categoryCounts[category]).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="zro-project-result zro-metric">
            <SlidersHorizontal className="h-3 w-3" aria-hidden="true" />
            Showing {String(filteredProjects.length).padStart(2, "0")} of{" "}
            {String(PROJECTS.length).padStart(2, "0")}
            <span aria-hidden="true">·</span>
            {selectedCategory === "ALL" ? "All disciplines" : selectedCategory}
          </p>
        </div>

        <LayoutGroup>
          <AnimatePresence initial={false} mode="popLayout">
            {showFlagship && flagship ? (
              <motion.div
                key="flagship"
                layout
                initial={false}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={transition}
                className="mt-8"
              >
                <FlagshipShowcase
                  project={flagship}
                  onOpenCaseStudy={setActiveCaseStudy}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.div
            layout
            className="zro-project-grid mt-5 grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {regularProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={false}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={transition}
                  className="min-w-0"
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onOpenCaseStudy={setActiveCaseStudy}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {regularProjects.length % 2 === 1 ? (
                <motion.a
                  key="archive"
                  layout
                  initial={false}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={transition}
                  data-reveal
                  data-spot
                  href={CONTACT_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zro-archive-tile"
                >
                  <span aria-hidden="true" className="zro-archive-tile-grid" />
                  <span className="zro-archive-tile-top">
                    <span className="zro-eyebrow">Archive · GitHub</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="zro-archive-tile-mid">
                    <span className="zro-eyebrow text-zro-accent">
                      Beyond the selected work
                    </span>
                    <span className="zro-archive-tile-title">
                      More experiments, notes &amp;{" "}
                      <em>older builds.</em>
                    </span>
                  </span>
                  <span className="zro-archive-tile-foot">
                    <span>Browse the archive</span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span aria-hidden="true" className="zro-archive-tile-ghost">
                    ↗
                  </span>
                </motion.a>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <CaseStudyDrawer
          project={activeCaseStudy}
          onClose={() => setActiveCaseStudy(null)}
        />
      </div>
    </section>
  );
}
