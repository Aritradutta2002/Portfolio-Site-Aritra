import { SKILLS_MATRIX } from "@/data/portfolioCatalog";

export function SkillsMatrix() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-b border-zinc-900 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="text-ds-2xs uppercase tracking-[0.18em] text-zro-muted">
            03 / Capabilities
          </div>
          <h2
            id="skills-heading"
            className="mt-3 font-ds-sans text-ds-h2 font-medium text-white"
          >
            The toolkit.
          </h2>
          <p className="mt-4 text-ds-md leading-relaxed text-zinc-400">
            Production-tested languages, enterprise Java frameworks, cloud PaaS
            environments, and generative AI orchestration tools.
          </p>
        </div>

        <div
          data-reveal
          className="mt-10 grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SKILLS_MATRIX.map((row) => (
            <div
              key={row.code}
              className="group flex flex-col bg-[#08080a] p-5 transition-colors hover:bg-[#0d0d10]"
            >
              <div className="flex items-center gap-3">
                <span className="zro-metric border border-zinc-800 px-1.5 py-0.5 text-ds-2xs text-zro-muted">
                  {row.code}
                </span>
                <span className="text-ds-2xs uppercase tracking-[0.14em] text-zinc-300">
                  {row.domain}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {row.items.map((skill) => (
                  <span
                    key={skill}
                    className="border border-zinc-800 bg-black px-2 py-1 text-ds-2xs text-zinc-300 transition-colors group-hover:border-zinc-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-5 text-ds-2xs font-medium text-white">
                {row.primaryHighlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}