import type { Metadata } from "next";
import { CONTACT_LINKS, PORTFOLIO_HEADER } from "@/data/portfolioCatalog";
import { TopBanner } from "@/components/zro/TopBanner";
import { Navbar } from "@/components/zro/Navbar";
import { CatalogBrowser } from "@/components/zro/CatalogBrowser";
import { SkillsMatrix } from "@/components/zro/SkillsMatrix";
import { BenchmarksSection } from "@/components/zro/BenchmarksSection";
import { FooterSection } from "@/components/zro/FooterSection";

export const metadata: Metadata = {
  title: "Aritra Dutta — System Engineer · Full Stack Application Engineer",
  description:
    "The production Java 21 microservices, Azure PaaS migrations, and AI-powered platforms engineered by Aritra Dutta — with measured API latency gains, runtime remediation, and unit test coverage.",
  keywords:
    "Aritra Dutta, Java 21, Spring Boot 3, microservices, Azure PaaS, AWS Transform, LangChain, full stack engineer, TCS, portfolio",
  alternates: {
    canonical: "https://www.aritradutta.tech/",
  },
  openGraph: {
    type: "website",
    url: "https://www.aritradutta.tech/",
    siteName: "Aritra Dutta — Engineering Datasheet",
    title: "Aritra Dutta — System Engineer · Full Stack Application Engineer",
    description:
      "Enterprise Java 21 microservices, cloud PaaS migrations, and AI platforms — documented as an engineering datasheet.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aritra Dutta — System Engineer · Full Stack Application Engineer",
    description:
      "Enterprise Java 21 microservices, cloud PaaS migrations, and AI platforms — documented as an engineering datasheet.",
  },
};

export default function PortfolioDatasheetPage() {
  return (
    <div className="zro-root min-h-screen bg-black font-ds-mono text-white">
      <a
        href="#catalog"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-white focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to system catalog
      </a>

      <TopBanner />
      <Navbar />

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="py-20 md:py-28">
          <div className="mb-4 text-ds-xs uppercase tracking-[0.16em] text-zro-muted">
            {PORTFOLIO_HEADER.name} · {PORTFOLIO_HEADER.role}
          </div>
          <h1 className="max-w-4xl font-ds-sans text-ds-h1 font-medium text-white">
            {PORTFOLIO_HEADER.heroHeadline}
          </h1>
          <p className="mt-7 max-w-2xl text-ds-md leading-relaxed text-zinc-400 md:text-ds-lg">
            {PORTFOLIO_HEADER.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={CONTACT_LINKS.resumePdf}
              className="border border-white bg-white px-6 py-3.5 text-ds-sm font-medium text-black transition-colors hover:bg-zinc-200"
            >
              Download resume
            </a>
            <a
              href="#catalog"
              className="text-ds-sm text-white transition-colors hover:text-zinc-300"
            >
              Read the system specs →
            </a>
          </div>
        </section>

        {/* Interactive filter + datasheet catalog */}
        <section
          aria-labelledby="catalog-heading"
          className="border-t border-zinc-800/90"
        >
          <div id="catalog" className="scroll-mt-24">
            <h2 id="catalog-heading" className="sr-only font-ds-sans">
              Production system catalog
            </h2>
            <CatalogBrowser />
          </div>
        </section>

        <SkillsMatrix />
        <BenchmarksSection />
      </main>

      <FooterSection />
    </div>
  );
}
