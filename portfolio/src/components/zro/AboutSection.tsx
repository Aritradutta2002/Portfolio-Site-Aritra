import type { CSSProperties } from "react";
import { SectionHeader } from "./ui/SectionHeader";
import { Tag } from "./ui/Tag";
import { Button } from "./ui/Button";
import {
  CONTACT_LINKS,
  EDUCATION,
  EXPERIENCE,
  PORTFOLIO_HEADER,
  SPOKEN_LANGUAGES,
} from "@/data/portfolioCatalog";

const FACTS = [
  {
    label: "Currently",
    value: `${PORTFOLIO_HEADER.role}, ${PORTFOLIO_HEADER.company}`,
  },
  { label: "Based in", value: PORTFOLIO_HEADER.location },
  { label: "Education", value: `${EDUCATION[0].level} · ${EDUCATION[0].degree}` },
  { label: "Languages", value: SPOKEN_LANGUAGES.join(" · ") },
];

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-zro-line"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              id="about-heading"
              index="01"
              title="About"
              description={PORTFOLIO_HEADER.summary}
            />

            <div
              data-reveal="fade"
              className="mt-6 flex items-start gap-2.5 border border-zro-line px-3.5 py-2.5"
            >
              <span
                aria-hidden="true"
                className="zro-pulse-dot mt-[0.3rem] h-1.5 w-1.5 shrink-0 bg-zro-accent"
              />
              <span className="zro-metric text-[0.625rem] uppercase leading-[1.6] tracking-[0.08em] text-zro-ink">
                {PORTFOLIO_HEADER.availability}
              </span>
            </div>

            <dl data-reveal className="mt-8 border border-zro-line">
              {FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="border-b border-zro-line px-4 py-3.5 last:border-b-0"
                >
                  <dt className="zro-eyebrow">{fact.label}</dt>
                  <dd className="mt-1 text-[0.875rem] leading-relaxed text-zro-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Button
              href={CONTACT_LINKS.resumePdf}
              variant="outline"
              size="sm"
              arrow
              external
              className="mt-6"
            >
              Download résumé
            </Button>
          </div>

          <div id="experience" className="lg:col-span-8">
            <div className="flex items-baseline justify-between gap-6 border-b border-zro-line pb-4">
              <h3 className="text-[1.125rem] font-medium tracking-[-0.02em] text-zro-ink">
                Experience
              </h3>
              <span className="zro-eyebrow">
                {EXPERIENCE.length} {EXPERIENCE.length === 1 ? "role" : "roles"}
              </span>
            </div>

            <div data-stagger data-scroll className="zro-timeline">
              {EXPERIENCE.map((role, index) => {
                const current = role.period.includes("Present");

                return (
                  <article
                    key={role.id}
                    id={role.id}
                    data-reveal
                    style={{ "--zro-i": index } as CSSProperties}
                    className="zro-timeline-item border-b border-zro-line py-8 hover:border-zro-line-strong"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
                      <div className="min-w-0">
                        <h4 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-zro-ink">
                          {role.role}
                        </h4>
                        <p className="mt-1 text-[0.875rem] leading-relaxed text-zro-muted">
                          {role.org}
                          {role.parent ? (
                            <span className="text-zro-faint">
                              {" "}
                              · {role.parent}
                            </span>
                          ) : null}
                        </p>
                        <p className="zro-metric mt-1.5 text-[0.6875rem] uppercase tracking-[0.08em] text-zro-faint">
                          {role.location}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        {current ? (
                          <span className="inline-flex items-center gap-1.5 border border-zro-accent/35 px-2 py-1">
                            <span
                              aria-hidden="true"
                              className="h-1 w-1 bg-zro-accent"
                            />
                            <span className="zro-metric text-[0.625rem] uppercase leading-none tracking-[0.08em] text-zro-accent">
                              Current
                            </span>
                          </span>
                        ) : null}
                        <span className="zro-metric border border-zro-line px-2 py-1 text-[0.625rem] uppercase leading-none tracking-[0.08em] text-zro-ink">
                          {role.period}
                        </span>
                      </div>
                    </div>

                    <p className="zro-body mt-4 max-w-[62ch] text-zro-muted">
                      {role.summary}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {role.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-[0.875rem] leading-[1.65] text-zro-muted"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-[0.65rem] h-px w-3 shrink-0 bg-zro-line-strong"
                          />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {role.stack.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
