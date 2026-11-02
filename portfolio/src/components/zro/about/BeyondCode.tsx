import { Trophy, ArrowUpRight, Sparkles } from "lucide-react";
import { ACHIEVEMENTS } from "@/data/portfolioCatalog";

export function BeyondCode() {
  return (
    <article
      data-reveal
      data-spot
      className="zro-card zro-beyond relative p-6 md:p-8"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <span className="zro-eyebrow flex items-center gap-2 text-zro-muted">
            <Trophy className="h-4 w-4 text-zro-accent" aria-hidden="true" />
            Beyond the résumé
          </span>
          <h3 className="mt-3 text-[1.375rem] font-medium leading-snug tracking-[-0.03em] text-zro-ink">
            A competitive-programming habit that keeps the fundamentals sharp.
          </h3>
          <p className="mt-3 max-w-[46ch] text-[0.875rem] leading-relaxed text-zro-muted">
            {ACHIEVEMENTS.competitiveProgramming.detail} I still reach for the
            same instinct at work: understand the complexity before changing the
            code.
          </p>
          <p className="zro-metric mt-4 flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.1em] text-zro-accent">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            700+ solved · LeetCode 1672 · CodeChef 3★
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:col-span-7">
          {ACHIEVEMENTS.competitiveProgramming.profiles.map((profile) => (
            <a
              key={profile.label}
              href={profile.href}
              target="_blank"
              rel="noopener noreferrer"
              className="zro-profile-link"
            >
              <span className="zro-eyebrow text-[0.5625rem]">
                {profile.label}
              </span>
              <span className="zro-metric mt-4 block text-[1.125rem] font-medium text-zro-ink">
                {profile.value}
              </span>
              <span className="mt-3 flex items-center justify-between border-t border-zro-line pt-2.5 text-[0.625rem] text-zro-faint">
                View profile
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
