import { ACHIEVEMENTS, EDUCATION } from "@/data/portfolioCatalog";

export function BenchmarksSection() {
  return (
    <section
      id="achievements"
      aria-labelledby="achievements-heading"
      className="border-b border-zinc-900 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2
              id="achievements-heading"
              className="font-ds-sans text-ds-h2 font-medium text-white"
            >
              Education &amp; achievements
            </h2>
          </div>

          <div data-reveal className="lg:col-span-8 border-t border-zinc-800">
            <div className="border-b border-zinc-900 py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-ds-md font-medium text-white">
                  {EDUCATION.degree}
                </h3>
                <span className="zro-metric text-ds-xs text-zinc-400">
                  {EDUCATION.period}
                </span>
              </div>
              <p className="mt-1 text-ds-sm text-zinc-400">
                {EDUCATION.institution}
              </p>
              <p className="mt-2 text-ds-xs text-zro-muted">
                {EDUCATION.location} · CGPA{" "}
                <span className="zro-metric text-zinc-200">{EDUCATION.cgpa}</span>
              </p>
            </div>

            <div className="border-b border-zinc-900 py-6">
              <h3 className="text-ds-md font-medium text-white">
                {ACHIEVEMENTS.competitiveProgramming.title}
              </h3>
              <p className="mt-1 text-ds-sm leading-relaxed text-zinc-400">
                {ACHIEVEMENTS.competitiveProgramming.detail}
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-ds-xs">
                {ACHIEVEMENTS.competitiveProgramming.profiles.map((profile) => (
                  <li key={profile.label} className="flex items-baseline gap-2">
                    <span className="text-zro-muted">{profile.label}</span>
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zro-metric bg-white px-1.5 py-0.5 font-medium text-black transition-opacity hover:opacity-80"
                    >
                      {profile.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-b border-zinc-900 py-6">
              <h3 className="text-ds-md font-medium text-white">
                {ACHIEVEMENTS.recognition.title}
              </h3>
              <p className="mt-1 text-ds-sm leading-relaxed text-zinc-400">
                {ACHIEVEMENTS.recognition.detail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
