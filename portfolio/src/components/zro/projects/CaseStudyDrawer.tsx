"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ExternalLink, Github, Sparkles, X } from "lucide-react";
import type { ProjectItem } from "@/data/portfolioCatalog";
import { ProjectVisual } from "./ProjectVisual";
import { lockScroll } from "@/lib/scrollBridge";

interface CaseStudyDrawerProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function CaseStudyDrawer({ project, onClose }: CaseStudyDrawerProps) {
  const reduceMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Capture trigger element to return focus upon close
  useEffect(() => {
    if (project) {
      triggerRef.current = document.activeElement as HTMLElement | null;
      lockScroll(true);

      // Focus first interactive element or container
      const timer = setTimeout(() => {
        const closeBtn = drawerRef.current?.querySelector<HTMLButtonElement>(
          'button[aria-label="Close case study"]'
        );
        closeBtn?.focus();
      }, 50);

      return () => {
        clearTimeout(timer);
        lockScroll(false);
        triggerRef.current?.focus();
      };
    }
  }, [project]);

  // Handle ESC key and focus trapping
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <div
          className="fixed inset-0 z-50 flex justify-end items-end md:items-stretch"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Drawer: Slide-over on desktop (50vw), bottom sheet on mobile (max-h 85dvh) */}
          <motion.div
            ref={drawerRef}
            key="drawer"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : {
                    x: "100%",
                    y: 0,
                  }
            }
            animate={
              reduceMotion
                ? { opacity: 1 }
                : {
                    x: 0,
                    y: 0,
                  }
            }
            exit={
              reduceMotion
                ? { opacity: 0 }
                : {
                    x: "100%",
                    y: 0,
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", damping: 32, stiffness: 300 }
            }
            className="relative z-10 flex flex-col w-full md:w-[50vw] md:max-w-2xl h-[85dvh] md:h-full bg-[#0d0e12] border-t md:border-t-0 md:border-l border-zro-line shadow-2xl rounded-t-2xl md:rounded-t-none overflow-hidden"
          >
            {/* Mobile Drag Indicator */}
            <div className="flex justify-center pt-3 pb-1 md:hidden" aria-hidden="true">
              <div className="h-1 w-12 rounded-full bg-zro-line" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between border-b border-zro-line px-6 py-5 md:px-8">
              <div>
                <div className="flex items-center gap-2.5 text-[0.6875rem] font-mono uppercase tracking-[0.12em] text-zro-faint">
                  <span>{project.kind}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.years}</span>
                </div>
                <h3
                  id="case-study-title"
                  className="mt-1 text-xl md:text-2xl font-bold font-sans tracking-tight text-zro-ink"
                >
                  {project.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="rounded-lg p-2 text-zro-faint hover:text-zro-ink hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zro-accent"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Content Body with data-lenis-prevent */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto px-6 py-6 md:px-8 space-y-8 overscroll-contain"
            >
              {/* Visual Showcase */}
              <div className="rounded-xl border border-zro-line bg-[#08090b] overflow-hidden">
                <ProjectVisual id={project.id} />
                {project.metric ? (
                  <div className="flex items-center justify-between border-t border-zro-line px-4 py-2.5 bg-white/[0.02]">
                    <span className="text-[0.6875rem] font-mono uppercase tracking-wider text-zro-faint">
                      {project.metric.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-zro-accent">
                      {project.metric.value}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Architectural Overview */}
              <div>
                <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-zro-accent mb-2.5">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  System Overview
                </h4>
                <p className="text-sm md:text-base text-zro-ink/90 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Engineering Highlights */}
              <div>
                <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.14em] text-zro-faint mb-3">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                  Engineering Accomplishments &amp; Details
                </h4>
                <ul className="space-y-3">
                  {project.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs md:text-sm text-zro-ink/80 leading-relaxed"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zro-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Technology Stack */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-[0.14em] text-zro-faint mb-2.5">
                  Technologies &amp; Architecture
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="zro-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* External Links */}
              {project.links && project.links.length > 0 ? (
                <div className="border-t border-zro-line pt-5">
                  <h4 className="text-xs font-mono uppercase tracking-[0.14em] text-zro-faint mb-3">
                    Verified Endpoints &amp; Source
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg border border-zro-line bg-white/[0.03] px-3.5 py-2 text-xs font-mono text-zro-ink hover:border-zro-accent hover:text-zro-accent transition-colors"
                      >
                        {link.label.toLowerCase().includes("git") ? (
                          <Github className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        <span>{link.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Footer with Close Button */}
            <div className="border-t border-zro-line px-6 py-4 md:px-8 bg-white/[0.01] flex items-center justify-between">
              <span className="text-[0.6875rem] font-mono text-zro-faint">
                Press <kbd className="px-1.5 py-0.5 rounded border border-zro-line bg-white/5 text-[0.625rem]">Esc</kbd> to dismiss
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-zro-line text-xs font-mono text-zro-ink hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zro-accent"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
