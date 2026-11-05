import type { Metadata } from "next";
import { Navbar } from "@/components/zro/Navbar";
import { Hero } from "@/components/zro/Hero";
import { AboutSection } from "@/components/zro/AboutSection";
import { ProjectsSection } from "@/components/zro/ProjectsSection";
import { SkillsMatrix } from "@/components/zro/SkillsMatrix";
import { BenchmarksSection } from "@/components/zro/BenchmarksSection";
import { FooterSection } from "@/components/zro/FooterSection";
import { RevealProvider } from "@/components/zro/RevealProvider";
import { MotionController } from "@/components/zro/MotionController";
import { DatasheetScroll } from "@/components/zro/DatasheetScroll";
import { BackToTop } from "@/components/zro/BackToTop";
import { SectionRail } from "@/components/zro/SectionRail";
import { Backdrop } from "@/components/luxe/Backdrop";
import {
  CONTACT_LINKS,
  PORTFOLIO_HEADER,
} from "@/data/portfolioCatalog";

const TITLE = "Aritra Dutta — Full Stack Application Engineer";
const DESCRIPTION =
  "Aritra Dutta — Full Stack Application Engineer at TCS. Java 21 microservices, Azure PaaS migrations and AI platforms, with up to 20× faster APIs.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aritrodutta.tech"),
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    "Aritra Dutta, Java 21, Spring Boot 4, microservices, Azure PaaS, AWS Transform, LangChain, full stack engineer, TCS, portfolio, resume",
  alternates: {
    canonical: "https://www.aritrodutta.tech/",
  },
  openGraph: {
    type: "profile",
    url: "https://www.aritrodutta.tech/",
    siteName: "Aritra Dutta",
    title: TITLE,
    description: DESCRIPTION,
    /* Image comes from ./opengraph-image.tsx (file convention). */
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    /* Image comes from ./twitter-image.tsx (file convention). */
  },
};

const PERSON_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PORTFOLIO_HEADER.name,
  jobTitle: PORTFOLIO_HEADER.role,
  url: "https://www.aritrodutta.tech/",
  image: "https://www.aritrodutta.tech/aritra-portrait.webp",
  worksFor: { "@type": "Organization", name: PORTFOLIO_HEADER.company },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhubaneswar",
    addressCountry: "IN",
  },
  sameAs: [
    CONTACT_LINKS.github,
    CONTACT_LINKS.linkedin,
    CONTACT_LINKS.leetcode,
    CONTACT_LINKS.codechef,
  ],
};

export default function PortfolioHomePage() {
  return (
    <div id="top" className="zro-root luxe-grain relative min-h-screen text-zro-ink">
      <Backdrop />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-zro-ink focus:bg-zro-ink focus:px-4 focus:py-2 focus:text-zro-canvas"
      >
        Skip to content
      </a>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PERSON_JSON_LD).replace(/</g, "\\u003c"),
        }}
      />

      <div className="zro-progress" aria-hidden="true" />
      <RevealProvider />
      <MotionController />
      <DatasheetScroll />
      <Navbar />
      <SectionRail />

      <main className="relative z-10">
        <Hero />
        <AboutSection />

        <ProjectsSection />

        <SkillsMatrix />
        <BenchmarksSection />
      </main>

      <FooterSection />
      <BackToTop />

      <noscript>
        <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
      </noscript>
    </div>
  );
}
