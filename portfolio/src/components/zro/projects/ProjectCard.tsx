"use client";

import { useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import type { ProjectItem } from "@/data/portfolioCatalog";
import { ProjectVisual } from "./ProjectVisual";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onOpenCaseStudy?: (project: ProjectItem) => void;
}

export function ProjectCard({ project, index, onOpenCaseStudy }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const panelId = `project-details-${project.id}`;
  const number = String(index + 2).padStart(2, "0");

  const handleToggle = () => {
    if (onOpenCaseStudy) {
      onOpenCaseStudy(project);
    } else {
      setOpen((value) => !value);
    }
  };

  return (
    <article
      id={project.id}
      data-reveal
      data-spot
      className="zro-card zro-project-card group flex h-full flex-col"
    >
      <div className="zro-project-visual zro-tilt" data-tilt>
        <ProjectVisual id={project.id} />
        <div className="zro-project-visual-bar">
          <span className="zro-project-index">{"// "}{number}</span>
          <span className="zro-project-metric">{project.metric?.value}</span>
        </div>
      </div>

      <div className="zro-project-body flex flex-1 flex-col">
        <div className="zro-project-kicker">
          <span>{project.kind}</span>
          <span aria-hidden="true" className="zro-project-kicker-line" />
          <span className="zro-project-years">{project.years}</span>
        </div>

        <h3 className="zro-project-title">{project.name}</h3>
        <p className="zro-project-summary">{project.summary}</p>

        <div className="zro-project-stack">
          {project.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="zro-chip">
              {tech}
            </span>
          ))}
          {project.stack.length > 4 ? (
            <span className="zro-project-stack-more">
              +{project.stack.length - 4}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          className="zro-project-toggle"
          aria-expanded={onOpenCaseStudy ? undefined : open}
          aria-haspopup={onOpenCaseStudy ? "dialog" : undefined}
          aria-controls={onOpenCaseStudy ? undefined : panelId}
          onClick={handleToggle}
        >
          <span className="zro-project-toggle-icon" aria-hidden="true">
            {open ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
          </span>
          <span className="zro-eyebrow !text-zro-ink">
            {open ? "Hide case study" : "Read the case study"}
          </span>
          <span className="zro-project-toggle-hint">
            {project.bullets.length} notes
          </span>
        </button>

        <div
          id={panelId}
          role="region"
          aria-label={`${project.name} case study`}
          className="zro-project-details"
          data-open={open}
        >
          <div className="zro-project-details-inner">
            <ul className="zro-project-notes">
              {project.bullets.map((bullet) => (
                <li key={bullet}>
                  <span aria-hidden="true" />
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="zro-project-details-stack">
              <span className="zro-eyebrow text-[0.5625rem]">Full stack</span>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span key={tech} className="zro-chip">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {project.links && project.links.length > 0 ? (
          <div className="zro-project-links mt-auto">
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
                className="zro-project-link"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
