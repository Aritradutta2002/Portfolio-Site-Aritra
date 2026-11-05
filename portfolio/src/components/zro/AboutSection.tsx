import { Building2, Download } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";
import { Button } from "./ui/Button";
import { ProfileCard } from "./about/ProfileCard";
import { StoryPanel } from "./about/StoryPanel";
import { ExperienceLedger } from "./about/ExperienceLedger";
import { BeyondCode } from "./about/BeyondCode";
import {
  CONTACT_LINKS,
  EXPERIENCE,
  PORTFOLIO_HEADER,
} from "@/data/portfolioCatalog";

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-zro-line py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="flex flex-col gap-6 border-b border-zro-line pb-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            id="about-heading"
            index="01"
            title="About Me"
            description="I modernise the enterprise systems teams already depend on — then build AI-native products on top of what I learn."
          />

          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 border border-emerald-500/25 bg-emerald-500/[0.06] px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="zro-metric text-[0.625rem] uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-400">
                {PORTFOLIO_HEADER.availability}
              </span>
            </div>

            <Button
              href={CONTACT_LINKS.resumePdf}
              variant="solid"
              size="sm"
              arrow
              external
            >
              Download CV
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ProfileCard />
          </div>
          <div className="lg:col-span-8">
            <StoryPanel />
          </div>
        </div>

        <div id="experience" className="mt-10 scroll-mt-20">
          <div
            data-reveal
            className="flex flex-wrap items-end justify-between gap-3 border-b border-zro-line pb-4"
          >
            <div>
              <p className="zro-eyebrow flex items-center gap-2 !text-zro-accent">
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                Experience
              </p>
              <h3 className="mt-2 text-[1.125rem] font-medium tracking-[-0.02em] text-zro-ink">
                Where the work ships into production.
              </h3>
            </div>
            <p className="zro-metric text-[0.625rem] uppercase tracking-[0.1em] text-zro-faint">
              {EXPERIENCE[0]?.period}
            </p>
          </div>

          <div className="mt-5">
            <ExperienceLedger />
          </div>
        </div>

        <div className="mt-5">
          <BeyondCode />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="zro-eyebrow text-[0.625rem]">
            Prefer the short version?
          </p>
          <a
            href={CONTACT_LINKS.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="zro-inline-link zro-eyebrow !text-zro-muted"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Download the one-page résumé
          </a>
        </div>
      </div>
    </section>
  );
}
