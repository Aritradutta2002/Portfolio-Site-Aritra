import Image from "next/image";
import { CONTACT_LINKS, PORTFOLIO_HEADER } from "@/data/portfolioCatalog";

const HERO_STATS = [
  { value: "20–30x", label: "API performance" },
  { value: "2,000+", label: "JUnit tests" },
  { value: "700+", label: "CP problems" },
  { value: "2+ yrs", label: "Enterprise" },
] as const;

const MARQUEE_ITEMS = [
  "Java 21",
  "Spring Boot 3",
  "Azure PaaS",
  "AWS Transform",
  "PostgreSQL",
  "Apache Kafka",
  "LangChain",
  "React",
  "Docker",
  "Jenkins",
  "JUnit",
  "REST APIs",
] as const;

export function Hero() {
  return (
    <section className="zro-hero border-b border-zinc-900">
      <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
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
              <div>
                <div className="text-ds-sm font-medium text-white">
                  Aritra Dutta
                </div>
                <div className="mt-1 text-ds-2xs uppercase tracking-[0.14em] text-zro-muted">
                  System Engineer · Bhubaneswar
                </div>
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
              Available for backend, cloud &amp; full-stack roles
            </div>

            <h1 className="mt-5 max-w-3xl font-ds-sans text-ds-h1 font-medium text-white">
              {PORTFOLIO_HEADER.heroHeadline}
            </h1>

            <p
              data-hero
              className="mt-6 max-w-2xl text-ds-md leading-relaxed text-zinc-400 md:text-ds-lg"
            >
              {PORTFOLIO_HEADER.heroSubtitle}
            </p>

            <div
              data-hero
              style={{ animationDelay: "90ms" }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <a
                href="#work"
                className="border border-white bg-white px-6 py-3.5 text-ds-sm font-medium text-black transition-colors hover:bg-zinc-200"
              >
                View selected work
              </a>
              <a
                href={CONTACT_LINKS.resumePdf}
                className="border border-zinc-700 bg-[#08080a] px-6 py-3.5 text-ds-sm text-white transition-colors hover:border-white"
              >
                Download resume
              </a>
              <a
                href={`mailto:${CONTACT_LINKS.email}`}
                className="text-ds-sm text-zinc-300 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                {CONTACT_LINKS.email}
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
                    alt="Aritra Dutta, full-stack application engineer"
                    fill
                    sizes="(max-width: 1024px) 0px, 420px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:transform-none"
                  />

                  <span className="absolute right-3 top-3 border border-white/30 bg-black px-2 py-1 text-ds-2xs uppercase tracking-[0.14em] text-white">
                    Open
                  </span>
                </div>

                <figcaption className="flex items-center justify-between border-t border-zinc-800 bg-black px-4 py-3">
                  <span className="text-ds-2xs uppercase tracking-[0.14em] text-zinc-300">
                    Bhubaneswar, India
                  </span>
                  <span className="text-ds-2xs uppercase tracking-[0.14em] text-zro-muted">
                    Portrait / 001
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-px border border-zinc-800 bg-zinc-800 sm:grid-cols-4">
          {HERO_STATS.map((stat) => (
            <div key={stat.label} className="bg-black p-5">
              <dt className="text-ds-2xs uppercase tracking-[0.14em] text-zro-muted">
                {stat.label}
              </dt>
              <dd className="zro-metric mt-2 text-[1.65rem] font-semibold italic leading-none text-white">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-12 overflow-hidden border-y border-zinc-900 py-4">
        <div className="zro-marquee flex w-max items-center">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              className="flex shrink-0 items-center gap-8 pr-8"
            >
              {MARQUEE_ITEMS.map((item) => (
                <span
                  key={item}
                  className="text-ds-2xs uppercase tracking-[0.18em] text-zro-muted"
                >
                  {item}
                  <span aria-hidden="true" className="ml-8 text-zinc-700">
                    /
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}