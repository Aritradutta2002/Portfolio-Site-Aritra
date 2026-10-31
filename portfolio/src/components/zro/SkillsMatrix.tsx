import { SKILLS_MATRIX } from "@/data/portfolioCatalog";

export function SkillsMatrix() {
  return (
    <section
      aria-labelledby="skills-heading"
      className="border-t border-zinc-800/90 py-16 md:py-24"
    >
      <div id="skills" className="scroll-mt-24">
        <div className="text-ds-xs uppercase tracking-[0.16em] text-zro-muted">
          Technical Capabilities &amp; Runtime Matrix
        </div>
        <h2
          id="skills-heading"
          className="mt-2 font-ds-sans text-ds-h2 font-medium text-white"
        >
          Full-Stack &amp; Cloud Specification
        </h2>
        <p className="mt-4 max-w-2xl text-ds-md leading-relaxed text-zinc-400 md:text-ds-lg">
          Production-tested languages, enterprise Java frameworks, relational
          databases, cloud PaaS environments, and generative AI orchestration
          tools.
        </p>

        <div className="mt-10 divide-y divide-zinc-900 border-t border-zinc-800/80">
          {SKILLS_MATRIX.map((row) => (
            <div
              key={row.code}
              className="grid grid-cols-1 items-baseline gap-4 py-5 md:grid-cols-12"
            >
              <div className="flex items-center gap-3 md:col-span-4">
                <span className="zro-metric border border-zinc-800 px-1.5 py-0.5 text-ds-2xs text-zro-muted">
                  {row.code}
                </span>
                <span className="text-ds-xs uppercase tracking-[0.14em] text-zinc-400">
                  {row.domain}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 md:col-span-6">
                {row.items.map((skill) => (
                  <span
                    key={skill}
                    className="border border-zinc-800/90 bg-[#0a0a0c] px-2.5 py-1 text-ds-xs text-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="text-ds-xs font-medium text-white md:col-span-2 md:text-right">
                {row.primaryHighlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
