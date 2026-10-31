import type { Metadata } from "next";
import { Navbar } from "@/components/zro/Navbar";
import { Hero } from "@/components/zro/Hero";
import { AboutSection } from "@/components/zro/AboutSection";
import { CatalogBrowser } from "@/components/zro/CatalogBrowser";
import { SkillsMatrix } from "@/components/zro/SkillsMatrix";
import { BenchmarksSection } from "@/components/zro/BenchmarksSection";
import { FooterSection } from "@/components/zro/FooterSection";
import { RevealProvider } from "@/components/zro/RevealProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aritradutta.tech"),
  title: "Aritra Dutta — System Engineer · Full Stack Application Engineer",
  description:
    "Aritra Dutta — System Engineer and Full Stack Application Engineer at TCS. Java 21 microservices, Azure PaaS migrations, AI platforms, and measured 20–30x API gains.",
  keywords:
    "Aritra Dutta, Java 21, Spring Boot 3, microservices, Azure PaaS, AWS Transform, LangChain, full stack engineer, TCS, portfolio",
  alternates: {
    canonical: "https://www.aritradutta.tech/",
  },
  openGraph: {
    type: "profile",
    url: "https://www.aritradutta.tech/",
    siteName: "Aritra Dutta — Portfolio",
    title: "Aritra Dutta — System Engineer · Full Stack Application Engineer",
    description:
      "Enterprise Java 21 microservices, cloud PaaS migrations, and AI platforms — with the numbers that matter.",
    images: [{ url: "/aritra-portrait.webp", width: 640, height: 878 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aritra Dutta — System Engineer · Full Stack Application Engineer",
    description:
      "Enterprise Java 21 microservices, cloud PaaS migrations, and AI platforms — with the numbers that matter.",
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
        Skip to profile
      </a>

      <RevealProvider />
      <Navbar />

      <main>
        <Hero />
        <AboutSection />

        <section
          id="work"
          aria-labelledby="work-heading"
          className="border-b border-zinc-900 py-16 md:py-24"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <div className="text-ds-2xs uppercase tracking-[0.18em] text-zro-muted">
                02 / Selected work
              </div>
              <h2
                id="work-heading"
                className="mt-3 font-ds-sans text-ds-h2 font-medium text-white"
              >
                Systems I&apos;ve shipped.
              </h2>
              <p className="mt-4 text-ds-md leading-relaxed text-zinc-400">
                Production Java microservices, cloud migrations, and an
                AI-powered learning platform. Filter by the part of the stack
                you care about.
              </p>
            </div>

            <div className="mt-6">
              <CatalogBrowser />
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