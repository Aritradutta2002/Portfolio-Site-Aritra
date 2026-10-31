import { SKILL_GROUPS } from "@/data/portfolioCatalog";

export function SkillsMatrix() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-b border-zinc-900 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2
              id="skills-heading"
              className="font-ds-sans text-ds-h2 font-medium text-white"
            >
              Skills
            </h2>
            <p className="mt-4 max-w-sm text-ds-sm leading-relaxed text-zinc-400">
              The stack I work in day to day — enterprise Java on the backend,
              cloud and CI/CD around it, and React or AI tooling at the edges.
            </p>
          </div>

          <dl
            data-reveal
            className="lg:col-span-8 border-t border-zinc-800"
          >
            {SKILL_GROUPS.map((group) => (
              <div
                key={group.domain}
                className="grid grid-cols-1 gap-x-8 gap-y-2 border-b border-zinc-900 py-4 sm:grid-cols-12"
              >
                <dt className="text-ds-xs text-zro-muted sm:col-span-3">
                  {group.domain}
                </dt>
                <dd className="text-ds-xs leading-relaxed text-zinc-200 sm:col-span-9">
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
