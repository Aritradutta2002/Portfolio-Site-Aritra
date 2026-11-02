import type { CSSProperties } from "react";
import {
  Boxes,
  Cloud,
  Code2,
  Container,
  Coffee,
  Database,
  Languages,
  Monitor,
  Sparkles,
  Terminal,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SKILL_GROUPS } from "@/data/portfolioCatalog";
import { SectionHeader } from "./ui/SectionHeader";

const GROUP_ICONS: Record<string, LucideIcon> = {
  "Programming languages": Code2,
  "Frameworks & libraries": Boxes,
  Databases: Database,
  "Tools & platforms": Cloud,
  Practices: Workflow,
  "Spoken languages": Languages,
};

const DAILY_DRIVERS: {
  name: string;
  note: string;
  icon: LucideIcon;
}[] = [
  { name: "Java 21", note: "Backend core", icon: Coffee },
  { name: "Spring Boot", note: "Service layer", icon: Boxes },
  { name: "Azure PaaS", note: "Deployment", icon: Cloud },
  { name: "React", note: "Interfaces", icon: Monitor },
  { name: "Docker", note: "Packaging", icon: Container },
  { name: "LangChain", note: "RAG systems", icon: Sparkles },
];

const TECH_GROUPS = SKILL_GROUPS.filter(
  (group) => group.domain !== "Spoken languages"
);

const TECH_COUNT = TECH_GROUPS.reduce(
  (total, group) => total + group.items.length,
  0
);

const MARQUEE_ITEMS = Array.from(
  new Set(TECH_GROUPS.flatMap((group) => group.items))
);

const PRINCIPLES = [
  "Measure before and after — every optimisation needs a number.",
  "Ship in small, testable slices that stay reversible.",
  "Leave the system easier to operate than you found it.",
];

function MarqueeTrack({
  hidden = false,
}: {
  hidden?: boolean;
}) {
  return (
    <ul
      className="zro-marquee-track"
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : "Full technology toolkit"}
    >
      {MARQUEE_ITEMS.map((item) => (
        <li key={`${hidden ? "dup-" : ""}${item}`}>
          <span aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function SkillsMatrix() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-b border-zro-line py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              id="skills-heading"
              index="03"
              title="Skills"
              description="Enterprise Java at the core, cloud and CI/CD around it, and React or AI tooling where the product needs a face."
            />

            <div className="zro-skills-stats mt-7 border-y border-zro-line">
              <div>
                <p>{String(TECH_COUNT).padStart(2, "0")}</p>
                <span>Technologies in use</span>
              </div>
              <div>
                <p>{String(SKILL_GROUPS.length).padStart(2, "0")}</p>
                <span>Domains covered</span>
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

          <div className="lg:col-span-8">
            <div className="zro-drivers" data-reveal data-spot>
              <div className="zro-drivers-head">
                <div>
                  <p className="zro-eyebrow flex items-center gap-2 !text-zro-accent">
                    <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                    Daily drivers
                  </p>
                  <h3>The six tools behind most of the work.</h3>
                </div>
                <span className="zro-metric">CORE STACK</span>
              </div>

              <ul className="zro-drivers-grid">
                {DAILY_DRIVERS.map((driver) => {
                  const Icon = driver.icon;
                  return (
                    <li key={driver.name}>
                      <span className="zro-driver-icon" aria-hidden="true">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <strong>{driver.name}</strong>
                        <small>{driver.note}</small>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="zro-skill-domains__grid mt-5 gap-4 sm:columns-2">
              {SKILL_GROUPS.map((group, index) => {
                const Icon = GROUP_ICONS[group.domain] ?? Terminal;
                return (
                  <article
                    key={group.domain}
                    data-reveal
                    data-spot
                    style={{ "--zro-i": index } as CSSProperties}
                    className="zro-card zro-skill-domain mb-4 break-inside-avoid"
                  >
                    <div className="zro-skill-domain__head">
                      <span className="zro-skill-domain__icon" aria-hidden="true">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <h3>{group.domain}</h3>
                        <p>
                          {group.items.length}{" "}
                          {group.items.length === 1 ? "item" : "items"}
                        </p>
                      </div>
                      <span className="zro-skill-domain__index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <ul className="zro-skill-terms">
                      {group.items.map((item) => (
                        <li key={item}>
                          <span aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="zro-toolkit mt-14">
        <div className="zro-toolkit-head mx-auto max-w-6xl px-6 md:px-8">
          <p className="zro-eyebrow">The full toolkit</p>
          <p className="zro-metric">
            {TECH_COUNT} technologies · continuously expanding
          </p>
        </div>
        <div className="zro-marquee">
          <MarqueeTrack />
          <MarqueeTrack hidden />
        </div>
      </div>
    </section>
  );
}
