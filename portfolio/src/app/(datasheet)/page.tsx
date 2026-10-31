import type { Metadata } from "next";
import { Navbar } from "@/components/zro/Navbar";
import { Hero } from "@/components/zro/Hero";
import { AboutSection } from "@/components/zro/AboutSection";
import { CatalogEntry } from "@/components/zro/CatalogEntry";
import { SkillsMatrix } from "@/components/zro/SkillsMatrix";
import { BenchmarksSection } from "@/components/zro/BenchmarksSection";
import { FooterSection } from "@/components/zro/FooterSection";
import { RevealProvider } from "@/components/zro/RevealProvider";
import { SectionHeader } from "@/components/zro/ui/SectionHeader";
import { PROJECTS } from "@/data/portfolioCatalog";

const TITLE = "Aritra Dutta — Full Stack Application Engineer";
const DESCRIPTION =
  "Aritra Dutta — Full Stack Application Engineer at TCS. Java 21 microservices, Azure PaaS migrations and AI platforms, with up to 20× faster APIs.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aritradutta.tech"),
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Aritra Dutta, Java 21, Spring Boot 4, microservices, Azure PaaS, AWS Transform, LangChain, full stack engineer, TCS, portfolio, resume",
  alternates: {
    canonical: "https://www.aritradutta.tech/",
  },
  openGraph: {
    type: "profile",
    url: "https://www.aritradutta.tech/",
    siteName: "Aritra Dutta",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/aritra-portrait.webp", width: 640, height: 878 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/aritra-portrait.webp"],
  },
};

export default function PortfolioHomePage() {
  return (
    <div className="zro-root min-h-screen bg-zro-canvas text-zro-ink">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-zro-ink focus:bg-zro-ink focus:px-4 focus:py-2 focus:text-zro-canvas"
      >
        Skip to content
      </a>

      <RevealProvider />
      <Navbar />

      <main>
        <Hero />
        <AboutSection />

        <section
          id="work"
          aria-labelledby="work-heading"
          className="border-b border-zro-line"
        >
          <div className="mx-auto max-w-6xl px-6 md:px-8">
            <div className="max-w-2xl">
              <SectionHeader
                id="work-heading"
                index="02"
                title="Selected work"
                description="A product I own end-to-end — built, deployed and maintained on a custom domain."
              />
            </div>

            <div data-stagger className="mt-10 space-y-5">
              {PROJECTS.map((item, index) => (
                <CatalogEntry key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

        <SkillsMatrix />
        <BenchmarksSection />
      </main>

      <FooterSection />

      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
    </div>
  );
}
