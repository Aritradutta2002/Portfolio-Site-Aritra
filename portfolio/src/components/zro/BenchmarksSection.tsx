import { ACHIEVEMENTS, EDUCATION } from "@/data/portfolioCatalog";
import { SectionHeader } from "./ui/SectionHeader";

export function BenchmarksSection() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="border-b border-zro-line"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader
              id="achievements-heading"
              index="04"
              title="Education & achievements"
            />
          </div>

          <div
            data-reveal
            className="border-t border-zro-line lg:col-span-8"
          >
            <div id="education" className="border-b border-zro-line py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-zro-ink">
                  {EDUCATION.degree}
                </h3>
                <span className="zro-metric text-[0.6875rem] uppercase tracking-[0.08em] text-zro-faint">
                  {EDUCATION.period}
                </span>
              </div>
              <p className="mt-1 text-[0.875rem] text-zro-muted">
                {EDUCATION.institution}
              </p>
              <p className="mt-2 text-[0.8125rem] text-zro-faint">
                {EDUCATION.location} · CGPA{" "}
                <span className="zro-metric text-zro-ink">{EDUCATION.cgpa}</span>
              </p>
            </div>

            <div className="border-b border-zro-line py-6">
              <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-zro-ink">
                {ACHIEVEMENTS.competitiveProgramming.title}
              </h3>
              <p className="zro-body mt-2 text-zro-muted">
                {ACHIEVEMENTS.competitiveProgramming.detail}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-[0.8125rem]">
                {ACHIEVEMENTS.competitiveProgramming.profiles.map((profile) => (
                  <li key={profile.label} className="flex items-baseline gap-2">
                    <span className="zro-eyebrow">{profile.label}</span>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zro-metric inline-flex items-center bg-zro-ink px-1.5 py-0.5 text-[0.6875rem] font-medium text-zro-canvas transition-colors hover:bg-white"
                    >
                      {profile.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-b border-zro-line py-6">
              <h3 className="text-[1.0625rem] font-medium tracking-[-0.015em] text-zro-ink">
                {ACHIEVEMENTS.recognition.title}
              </h3>
              <p className="zro-body mt-2 text-zro-muted">
                {ACHIEVEMENTS.recognition.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
