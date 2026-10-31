import type { CSSProperties } from "react";
import { SectionHeader } from "./ui/SectionHeader";
import { Tag } from "./ui/Tag";
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
  { label: "Education", value: `${EDUCATION.degree}, ${EDUCATION.period}` },
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

            <dl data-reveal className="mt-10 border-t border-zro-line">
              {FACTS.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[7rem_1fr] gap-4 border-b border-zro-line py-3.5"
                >
                  <dt className="zro-eyebrow pt-0.5">{fact.label}</dt>
                  <dd className="text-[0.875rem] leading-relaxed text-zro-ink">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={CONTACT_LINKS.resumePdf}
              className="zro-link mt-8 inline-flex items-center gap-2 text-[0.875rem]"
            >
              Download resume (PDF)
              <span aria-hidden="true">↗</span>
            </a>
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

            <div data-stagger>
              {EXPERIENCE.map((role, index) => (
                <article
                  key={role.id}
                  id={role.id}
                  data-reveal
                  style={{ "--zro-i": index } as CSSProperties}
                  className="border-b border-zro-line py-8 transition-colors duration-200 hover:border-zro-line-strong"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h4 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-zro-ink">
                      {role.role}
                    </h4>
                    <span className="zro-metric text-[0.6875rem] uppercase tracking-[0.08em] text-zro-faint">
                      {role.period}
                    </span>
                  </div>
                  <div className="mt-1 text-[0.875rem] leading-relaxed text-zro-muted">
                    {role.org}
                    {role.parent ? (
                      <span className="text-zro-faint"> · {role.parent}</span>
                    ) : null}
                  </div>

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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
