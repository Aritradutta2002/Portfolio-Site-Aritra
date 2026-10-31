import Image from "next/image";
import {
  CONTACT_LINKS,
  HEADLINE_METRICS,
  PORTFOLIO_HEADER,
} from "@/data/portfolioCatalog";

export function Hero() {
  return (
    <section className="zro-hero border-b border-zinc-900">
      <div className="mx-auto max-w-6xl px-6 pb-4 pt-16 md:pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            {/* Mobile identification block — the desktop figure carries this. */}
            <div className="mb-6 flex items-center gap-4 lg:hidden">
              <div className="relative h-24 w-[72px] shrink-0 overflow-hidden border border-zinc-700">
                <Image
                  src="/aritra-portrait-sm.webp"
                  alt=""
                  fill
                  sizes="72px"
                  className="object-cover"
                />
              </div>
              {/* The H1 below already states the name — this block only
                  needs to carry the role and location. */}
              <div className="text-ds-2xs uppercase tracking-[0.14em] text-zro-muted">
                <div>{PORTFOLIO_HEADER.role}</div>
                <div className="mt-1">{PORTFOLIO_HEADER.location}</div>
              </div>
            </div>

            <div
              data-hero
              className="flex items-center gap-3 text-ds-2xs uppercase tracking-[0.18em] text-zinc-400"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 bg-white motion-safe:animate-pulse"
              />
              {PORTFOLIO_HEADER.availability}
            </div>

            {/* Name and role share one display type block: the role is part
                of the name a visitor learns first, and keeping it out of a
                separate paragraph block stops it painting late on its own. */}
            <h1 className="mt-5 max-w-3xl font-ds-sans font-medium text-white">
              <span className="block text-ds-h1">{PORTFOLIO_HEADER.name}</span>
              <span className="mt-3 block text-ds-xl text-zinc-300">
                {PORTFOLIO_HEADER.role} at {PORTFOLIO_HEADER.company}.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-ds-sm leading-relaxed text-zinc-400">
              <span className="lg:hidden">2+ years</span>
              <span className="hidden lg:inline">
                {PORTFOLIO_HEADER.location} · 2+ years
              </span>{" "}
              building and modernising enterprise Java systems.
            </p>

            <div
              data-hero
              style={{ animationDelay: "90ms" }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <a
                href={CONTACT_LINKS.resumePdf}
                className="border border-white bg-white px-6 py-3.5 text-ds-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                Download resume
              </a>
              <a
                href={`mailto:${CONTACT_LINKS.email}`}
                className="border border-zinc-700 bg-[#08080a] px-6 py-3.5 text-ds-sm text-white transition-colors hover:border-white"
              >
                Email me
              </a>
              <a
                href="#experience"
                className="text-ds-sm text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                Read experience
              </a>
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative mx-auto w-full max-w-[420px]">
              <div
                aria-hidden="true"
                className="absolute -left-3 -top-3 hidden h-full w-full border border-zinc-800 sm:block"
              />
              <figure className="group relative overflow-hidden border border-zinc-700 bg-[#08080a]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="/aritra-portrait.webp"
                    alt={`${PORTFOLIO_HEADER.name}, ${PORTFOLIO_HEADER.role}`}
                    fill
                    sizes="(max-width: 1024px) 0px, 420px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                  />
                </div>
                <figcaption className="border-t border-zinc-800 bg-black px-4 py-3 text-ds-2xs uppercase tracking-[0.14em] text-zinc-300">
                  {PORTFOLIO_HEADER.name} · {PORTFOLIO_HEADER.location}
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-3">
          {HEADLINE_METRICS.map((metric) => (
            <div key={metric.label} className="bg-black p-5">
              <dt className="text-ds-2xs uppercase tracking-[0.14em] text-zro-muted">
                {metric.label}
              </dt>
              <dd className="zro-metric mt-2 text-[1.65rem] font-semibold italic leading-none text-white">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
