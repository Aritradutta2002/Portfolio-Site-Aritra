"use client";

import { useState } from "react";
import {
  Cpu,
  Layers,
  Gauge,
  Terminal,
  Plus,
  Minus,
  Building2,
} from "lucide-react";
import { Tag } from "../ui/Tag";
import { EXPERIENCE } from "@/data/portfolioCatalog";

const PILLARS = [
  {
    icon: Cpu,
    title: "Microservices modernisation",
    detail:
      "Java 8 → 21 and Spring Boot 1.x → 4.x, removing technical debt for 10K+ enterprise users.",
    metric: "10K+ users",
  },
  {
    icon: Layers,
    title: "Azure PaaS migration",
    detail:
      "JBoss to Azure Tomcat PaaS with health probes, deployment slots and high availability.",
    metric: "Zero downtime",
  },
  {
    icon: Gauge,
    title: "API & database tuning",
    detail:
      "Refactored SQL joins and REST endpoints, cutting latency on critical reporting pipelines.",
    metric: "Up to 20×",
  },
  {
    icon: Terminal,
    title: "DevOps & quality gates",
    detail:
      "Jenkins CI/CD, Docker packaging, JaCoCo coverage, SonarQube analysis and API contract tests.",
    metric: "End-to-end",
  },
];

export function ExperienceLedger() {
  const [openRole, setOpenRole] = useState<string | null>(null);

  return (
    <div className="zro-exp-stack space-y-5">
      {EXPERIENCE.map((role, index) => {
        const isOpen = openRole === role.id;
        const panelId = `experience-details-${role.id}`;

        return (
          <article
            key={role.id}
            data-reveal
            data-spot
            className="zro-card zro-exp relative p-6 md:p-8"
          >
            <span aria-hidden="true" className="zro-exp-rail" />

            <div className="zro-exp-head flex flex-col gap-4 border-b border-zro-line pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <span className="zro-plate zro-exp-plate shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="zro-eyebrow flex items-center gap-2 text-zro-faint">
                    <Building2 className="h-3 w-3" aria-hidden="true" />
                    Current role · {role.parent || "Enterprise"}
                  </p>
                  <h3 className="mt-1.5 text-[1.25rem] font-medium leading-snug tracking-[-0.025em] text-zro-ink">
                    {role.role}
                    <span className="text-zro-muted"> · </span>
                    <span className="font-normal text-zro-muted">
                      {role.org}
                    </span>
                  </h3>
                  <p className="zro-metric mt-1.5 text-[0.625rem] uppercase tracking-[0.1em] text-zro-faint">
                    {role.location} · {role.period}
                  </p>
                </div>
              </div>

              <span className="zro-exp-live shrink-0">
                <span className="zro-pulse-dot h-1.5 w-1.5 bg-emerald-400" />
                Active in production
              </span>
            </div>

            <div className="zro-exp-grid mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="zro-exp-summary lg:col-span-4">
                <p className="zro-eyebrow text-[0.625rem]">The mandate</p>
                <p className="mt-3 text-[0.9375rem] leading-[1.75] text-zro-muted">
                  {role.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {role.stack.slice(0, 6).map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:col-span-8">
                {PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <div key={pillar.title} className="zro-pillar">
                      <div className="flex items-start justify-between gap-3">
                        <span className="zro-pillar-icon">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="zro-metric text-[0.5625rem] uppercase tracking-[0.08em] text-zro-accent">
                          {pillar.metric}
                        </span>
                      </div>
                      <h4 className="mt-3 text-[0.875rem] font-medium text-zro-ink">
                        {pillar.title}
                      </h4>
                      <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-zro-muted">
                        {pillar.detail}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="zro-exp-details mt-6 border-t border-zro-line pt-1">
              <button
                type="button"
                className="zro-exp-toggle"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenRole(isOpen ? null : role.id)}
              >
                <span className="flex items-center gap-3">
                  <span className="zro-exp-toggle-icon" aria-hidden="true">
                    {isOpen ? (
                      <Minus className="h-3.5 w-3.5" />
                    ) : (
                      <Plus className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <span className="zro-eyebrow !text-zro-ink">
                    {isOpen ? "Hide full responsibilities" : "View full responsibilities"}
                  </span>
                  <span className="zro-metric text-[0.625rem] text-zro-faint">
                    {role.bullets.length}
                  </span>
                </span>
                <span className="zro-eyebrow hidden text-[0.5625rem] sm:block">
                  {isOpen ? "Collapse" : "Expand"}
                </span>
              </button>

              <div
                id={panelId}
                className="zro-exp-collapse"
                data-open={isOpen}
              >
                <div className="zro-exp-collapse-inner">
                  <ul className="zro-exp-bullets">
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>
                        <span aria-hidden="true" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {role.stack.map((tech) => (
                      <Tag key={tech}>{tech}</Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
