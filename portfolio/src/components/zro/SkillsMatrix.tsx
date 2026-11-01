import type { CSSProperties } from "react";
import { SKILL_GROUPS } from "@/data/portfolioCatalog";
import { SectionHeader } from "./ui/SectionHeader";

const TOTAL_SKILLS = SKILL_GROUPS.reduce(
  (total, group) => total + group.items.length,
  0,
);

export function SkillsMatrix() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-b border-zro-line"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              id="skills-heading"
              index="03"
              title="Skills"
              description="The stack I work in day to day — enterprise Java on the backend, cloud and CI/CD around it, and React or AI tooling at the edges."
            />

            <div className="mt-8 flex items-stretch border-t border-zro-line pt-5">
              <div className="pr-8">
                <p className="zro-metric text-[1.75rem] font-medium leading-none text-zro-ink">
                  {SKILL_GROUPS.length}
                </p>
                <p className="zro-eyebrow mt-2">Domains</p>
              </div>
              <div className="border-l border-zro-line pl-8">
                <p className="zro-metric text-[1.75rem] font-medium leading-none text-zro-ink">
                  {TOTAL_SKILLS}
                </p>
                <p className="zro-eyebrow mt-2">Technologies</p>
              </div>
            </div>
          </div>

          <div
            data-stagger
            className="gap-4 sm:columns-2 lg:col-span-8"
          >
            {SKILL_GROUPS.map((group, index) => (
              <div
                key={group.domain}
                data-reveal
                data-spot
                style={{ "--zro-i": index } as CSSProperties}
                className="zro-card zro-skill-card group mb-4 break-inside-avoid p-5 md:p-6"
              >
                <div className="flex items-baseline justify-between gap-3 border-b border-zro-line pb-3">
                  <div className="flex min-w-0 items-baseline gap-2.5">
                    <span className="zro-metric text-[0.625rem] tracking-[0.08em] text-zro-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="truncate text-[0.9375rem] font-medium tracking-[-0.01em] text-zro-ink">
                      {group.domain}
                    </h3>
                  </div>
                  <span className="zro-metric shrink-0 text-[0.625rem] text-zro-faint">
                    {group.items.length}
                  </span>
                </div>

                <ul className="zro-skill-list mt-4">
                  {group.items.map((item, itemIndex) => (
                    <li key={item}>
                      <span
                        className="zro-chip"
                        style={{ "--ci": itemIndex } as CSSProperties}
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
