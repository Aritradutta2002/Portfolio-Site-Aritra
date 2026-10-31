import type { Metadata } from "next";
import { Navbar } from "@/components/zro/Navbar";
import { Hero } from "@/components/zro/Hero";
import { AboutSection } from "@/components/zro/AboutSection";
import { CatalogBrowser } from "@/components/zro/CatalogBrowser";
import { SkillsMatrix } from "@/components/zro/SkillsMatrix";
import { BenchmarksSection } from "@/components/zro/BenchmarksSection";
import { FooterSection } from "@/components/zro/FooterSection";
import { RevealProvider } from "@/components/zro/RevealProvider";

const TITLE = "Aritra Dutta — Full Stack Application Engineer";
const DESCRIPTION =
  "Aritra Dutta — Full Stack Application Engineer at TCS. Java 21 microservices, Azure PaaS migrations and AI platforms, with up to 30× faster APIs.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aritradutta.tech"),
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Aritra Dutta, Java 21, Spring Boot 3, microservices, Azure PaaS, AWS Transform, LangChain, full stack engineer, TCS, portfolio, resume",
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
    <div className="zro-root min-h-screen bg-black font-ds-mono text-white">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-white focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <RevealProvider />
      <Navbar />

      <main>
        <Hero />

        <div id="experience">
          <h2 className="sr-only">Experience</h2>
          <AboutSection />
        </div>

        <section
          id="work"
          aria-labelledby="work-heading"
          className="border-b border-zinc-900 py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2
                id="work-heading"
                className="font-ds-sans text-ds-h2 font-medium text-white"
              >
                Selected work
              </h2>
              <p className="mt-4 text-ds-sm leading-relaxed text-zinc-400">
                One product I own end-to-end and two enterprise migrations.
                Filter by the part of the stack you care about.
              </p>
            </div>

            <div className="mt-8">
              <CatalogBrowser />
            </div>
          </div>
        </section>

        <div id="education">
          <SkillsMatrix />
          <BenchmarksSection />
        </div>
      </main>

      <FooterSection />

      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
    </div>
  );
}
