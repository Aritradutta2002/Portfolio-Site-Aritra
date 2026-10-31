import {
  CONTACT_LINKS,
  EDUCATION,
  EXPERIENCE,
  PORTFOLIO_HEADER,
  SPOKEN_LANGUAGES,
} from "@/data/portfolioCatalog";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-zinc-900 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2
              id="about-heading"
              className="font-ds-sans text-ds-h2 font-medium text-white"
            >
              About
            </h2>
            <p className="mt-4 max-w-sm text-ds-sm leading-relaxed text-zinc-400">
              {PORTFOLIO_HEADER.summary}
            </p>

            <dl className="mt-8 space-y-4 text-ds-xs">
              <div>
                <dt className="text-zro-muted">Currently</dt>
                <dd className="mt-1 text-zinc-200">
                  {PORTFOLIO_HEADER.role}, {PORTFOLIO_HEADER.company}
                </dd>
              </div>
              <div>
                <dt className="text-zro-muted">Based in</dt>
                <dd className="mt-1 text-zinc-200">{PORTFOLIO_HEADER.location}</dd>
              </div>
              <div>
                <dt className="text-zro-muted">Education</dt>
                <dd className="mt-1 text-zinc-200">
                  {EDUCATION.degree}, {EDUCATION.period}
                </dd>
              </div>
              <div>
                <dt className="text-zro-muted">Languages</dt>
                <dd className="mt-1 text-zinc-200">
                  {SPOKEN_LANGUAGES.join(" · ")}
                </dd>
              </div>
            </dl>

            <a
              href={CONTACT_LINKS.resumePdf}
              className="mt-8 inline-block text-ds-xs text-white underline decoration-zinc-600 underline-offset-4 transition-colors hover:decoration-white"
            >
              Download resume (PDF) →
            </a>
          </div>

          <div className="lg:col-span-8">
            <h3 className="font-ds-sans text-ds-xl font-medium text-white">
              Experience
            </h3>

            <div className="mt-6 border-t border-zinc-800">
              {EXPERIENCE.map((role, roleIndex) => (
                <article
                  key={role.id}
                  id={role.id}
                  data-reveal
                  style={{ transitionDelay: `${roleIndex * 80}ms` }}
                  className="border-b border-zinc-900 py-8 first:pt-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h4 className="text-ds-lg font-medium text-white">
                      {role.role}
                    </h4>
                    <span className="zro-metric text-ds-xs text-zinc-400">
                      {role.period}
                    </span>
                  </div>
                  <div className="mt-1 text-ds-sm text-zinc-300">
                    {role.org}{" "}
                    <span className="text-zro-muted">· {role.parent}</span>
                  </div>

                  <ul className="mt-4 space-y-2">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-ds-sm leading-relaxed text-zinc-400"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-px w-3 shrink-0 bg-zinc-600"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-zinc-800 bg-black px-2 py-0.5 text-ds-2xs text-zinc-300"
                      >
                        {tech}
                      </span>
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
