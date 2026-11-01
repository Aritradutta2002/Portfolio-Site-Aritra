import type { CSSProperties } from "react";
import { EDUCATION } from "@/data/portfolioCatalog";
import { SectionHeader } from "./ui/SectionHeader";

export function BenchmarksSection() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="border-b border-zro-line"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              id="education-heading"
              index="04"
              title="Education"
              description="The academic path behind the engineering — an electronics degree at MAKAUT, preceded by the science stream at Kirnahar Shib Chandra High School."
            />
          </div>

          <div data-stagger className="space-y-4 lg:col-span-8">
            {EDUCATION.map((edu, index) => (
              <article
                key={`${edu.level}-${edu.period}`}
                data-reveal
                data-spot
                style={{ "--zro-i": index } as CSSProperties}
                className="zro-card zro-edu-card group p-6 md:p-7"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="zro-plate zro-edu-plate">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="zro-eyebrow text-zro-faint">
                        {edu.level}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[1.25rem] font-medium leading-snug tracking-[-0.025em] text-zro-ink">
                      {edu.degree}
                    </h3>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-zro-muted">
                      {edu.institution}
                    </p>
                    <p className="zro-metric mt-2 text-[0.6875rem] uppercase tracking-[0.08em] text-zro-faint">
                      {edu.period} · {edu.location}
                    </p>
                  </div>

                  <div className="zro-edu-score shrink-0 border-t border-zro-line pt-5 sm:min-w-[9.5rem] sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                    <p className="flex items-baseline gap-1 sm:justify-end">
                      <span className="zro-metric text-[2rem] font-medium leading-none tracking-[-0.04em] text-zro-ink">
                        {edu.score}
                      </span>
                      <span className="zro-metric text-[0.875rem] text-zro-faint">
                        {edu.scoreSuffix}
                      </span>
                    </p>
                    <p className="zro-eyebrow mt-2">{edu.scoreLabel}</p>
                    <div className="zro-edu-meter mt-3" aria-hidden="true">
                      <span
                        className="zro-edu-meter-fill"
                        style={{ "--p": `${edu.percent}%` } as CSSProperties}
                      />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
