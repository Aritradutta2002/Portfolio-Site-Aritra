import about from "@/content/about.json";
import experience from "@/content/experience.json";
import { CONTACT_LINKS } from "@/data/portfolioCatalog";

const FACTS = [
  ...about.quickFacts,
  {
    label: "Education",
    value: `B.Tech ECE · ${about.education[0].cgpa} CGPA`,
  },
  { label: "Focus", value: "Java 21 · Azure · GenAI" },
];

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
            <div className="text-ds-2xs uppercase tracking-[0.18em] text-zro-muted">
              01 / Profile
            </div>
            <h2
              id="about-heading"
              className="mt-3 font-ds-sans text-ds-h2 font-medium text-white"
            >
              Engineer, builder, problem solver.
            </h2>
            <p className="mt-4 max-w-sm text-ds-sm leading-relaxed text-zinc-400">
              I work where backend depth meets product speed: modernising
              enterprise Java, moving workloads to cloud PaaS, and shipping
              full-stack systems end-to-end.
            </p>
            <a
              href={CONTACT_LINKS.resumePdf}
              className="mt-5 inline-block text-ds-xs text-white underline decoration-zinc-600 underline-offset-4 transition-colors hover:decoration-white"
            >
              Read the full resume →
            </a>
          </div>

          <div className="lg:col-span-8" data-reveal>
            <p className="max-w-3xl text-ds-md leading-relaxed text-zinc-300 md:text-ds-lg">
              {about.bio}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
              {FACTS.map((fact) => (
                <div key={fact.label} className="bg-[#08080a] p-4">
                  <dt className="text-ds-2xs uppercase tracking-[0.14em] text-zro-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-ds-xs text-zinc-200">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <h3 className="text-ds-2xs uppercase tracking-[0.18em] text-zro-muted">
                Career snapshot
              </h3>
              <div className="mt-3 border-t border-zinc-800">
                {experience.map((role) => (
                  <div
                    key={role.id}
                    className="grid grid-cols-1 gap-3 border-b border-zinc-900 py-5 sm:grid-cols-12"
                  >
                    <div className="text-ds-2xs uppercase tracking-[0.14em] text-zro-muted sm:col-span-3">
                      {role.period}
                    </div>
                    <div className="sm:col-span-9">
                      <div className="text-ds-md font-medium text-white">
                        {role.role}{" "}
                        <span aria-hidden="true" className="text-zinc-600">
                          ·
                        </span>{" "}
                        {role.org}
                      </div>
                      <p className="mt-1 text-ds-sm leading-relaxed text-zinc-400">
                        {role.summary}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {role.stack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="border border-zinc-800 bg-black px-2 py-0.5 text-ds-2xs text-zinc-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}