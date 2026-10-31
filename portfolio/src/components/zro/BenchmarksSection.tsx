import { BENCHMARKS_DATA, CONTACT_LINKS } from "@/data/portfolioCatalog";

export function BenchmarksSection() {
  return (
    <section
      id="benchmarks"
      aria-labelledby="benchmarks-heading"
      className="border-b border-zinc-900 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="text-ds-2xs uppercase tracking-[0.18em] text-zro-muted">
            04 / Benchmarks
          </div>
          <h2
            id="benchmarks-heading"
            className="mt-3 font-ds-sans text-ds-h2 font-medium text-white"
          >
            Verified benchmarks.
          </h2>
          <p className="mt-4 text-ds-md leading-relaxed text-zinc-400">
            Competitive programming ratings, academic record, and enterprise
            recognition — the measurable side of the work.
          </p>
        </div>

        {/* Hairline telemetry grid — gap-px draws exact 1px rules */}
        <div
          data-reveal
          className="mt-10 grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="bg-[#08080a] p-6">
            <div className="text-ds-2xs uppercase tracking-wider text-zro-muted">
              Problems Solved
            </div>
            <div className="zro-metric mt-2 text-[1.75rem] font-semibold italic leading-none text-white">
              {BENCHMARKS_DATA.cpTotalSolved}
            </div>
            <div className="mt-2 text-ds-xs text-zinc-400">
              Across global judges
            </div>
          </div>

          <div className="bg-[#08080a] p-6">
            <div className="text-ds-2xs uppercase tracking-wider text-zro-muted">
              CodeChef Rating
            </div>
            <div className="zro-metric mt-2 text-[1.75rem] font-semibold italic leading-none text-white">
              {BENCHMARKS_DATA.codechefRating}{" "}
              <span className="text-ds-lg font-normal not-italic text-zinc-300">
                ({BENCHMARKS_DATA.codechefStars})
              </span>
            </div>
            <div className="mt-2 text-ds-xs text-zinc-400">
              <a
                href={CONTACT_LINKS.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                Verify profile ↗
              </a>
            </div>
          </div>

          <div className="bg-[#08080a] p-6">
            <div className="text-ds-2xs uppercase tracking-wider text-zro-muted">
              LeetCode Rating
            </div>
            <div className="zro-metric mt-2 text-[1.75rem] font-semibold italic leading-none text-white">
              {BENCHMARKS_DATA.leetcodeRating}
            </div>
            <div className="mt-2 text-ds-xs text-zinc-400">
              Codeforces:{" "}
              <span className="zro-metric">
                {BENCHMARKS_DATA.codeforcesRating}
              </span>{" "}
              ·{" "}
              <a
                href={CONTACT_LINKS.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                LeetCode ↗
              </a>
            </div>
          </div>

          <div className="bg-[#08080a] p-6">
            <div className="text-ds-2xs uppercase tracking-wider text-zro-muted">
              B.Tech ECE (MAKAUT)
            </div>
            <div className="zro-metric mt-2 text-[1.75rem] font-semibold italic leading-none text-white">
              {BENCHMARKS_DATA.education.cgpa}{" "}
              <span className="text-ds-sm font-normal not-italic text-zinc-400">
                CGPA
              </span>
            </div>
            <div className="mt-2 text-ds-xs text-zinc-400">
              {BENCHMARKS_DATA.education.period} · Kolkata
            </div>
          </div>
        </div>

        <div data-reveal className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="border border-zinc-800/90 bg-[#0a0a0c] p-6">
            <div className="text-ds-2xs uppercase tracking-[0.14em] text-zro-muted">
              Enterprise Recognition
            </div>
            <div className="mt-2 text-ds-md font-semibold text-white">
              {BENCHMARKS_DATA.certification.title}
            </div>
            <p className="mt-2 text-ds-xs leading-relaxed text-zinc-400">
              {BENCHMARKS_DATA.certification.detail}
            </p>
          </div>

          <div className="border border-zinc-800/90 bg-[#0a0a0c] p-6">
            <div className="text-ds-2xs uppercase tracking-[0.14em] text-zro-muted">
              Academic Credential
            </div>
            <div className="mt-2 text-ds-md font-semibold text-white">
              {BENCHMARKS_DATA.education.degree}
            </div>
            <p className="mt-2 text-ds-xs leading-relaxed text-zinc-400">
              {BENCHMARKS_DATA.education.institution} (
              {BENCHMARKS_DATA.education.period}) — Graduated with{" "}
              {BENCHMARKS_DATA.education.cgpa} CGPA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
