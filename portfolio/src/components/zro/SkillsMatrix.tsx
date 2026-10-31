import type { CSSProperties } from "react";
import { SKILL_GROUPS } from "@/data/portfolioCatalog";
import { SectionHeader } from "./ui/SectionHeader";

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
          </div>

          <dl
            data-stagger
            className="border-t border-zro-line lg:col-span-8"
          >
            {SKILL_GROUPS.map((group, index) => (
              <div
                key={group.domain}
                data-reveal="fade"
                style={{ "--zro-i": index } as CSSProperties}
                className="group grid grid-cols-1 gap-2 border-b border-zro-line py-5 sm:grid-cols-12"
              >
                <dt className="zro-eyebrow transition-colors duration-200 group-hover:text-zro-ink sm:col-span-4">
                  {group.domain}
                </dt>
                <dd className="text-[0.9375rem] leading-relaxed text-zro-ink sm:col-span-8">
                  {group.items.join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
