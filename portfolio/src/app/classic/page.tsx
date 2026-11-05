import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Skills } from '@/components/Skills'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'
import { Blog } from '@/components/Blog'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { GradientOrbs } from '@/components/GradientOrbs'

export const metadata: Metadata = {
  title: 'Aritra Dutta — Full Stack Application Engineer (Plain Version)',
  description:
    'Accessible, text-only and print-friendly version of the Aritra Dutta portfolio: full stack engineering experience at TCS, projects, skills, education and contact details.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.aritrodutta.tech/classic',
  },
}

/* The accessible semantic scrolling site, preserved as the accessible / no-3D fallback
   referenced by the skip-intro link and Spotlight (Plan §8 & §10). */
export default function ClassicPage() {
  return (
    <>
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-[#121214] focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#c8a46b]"
      >
        Skip to main content
      </a>

      {/* Top bar with back-to-main link (hidden in print) */}
      <div className="print:hidden sticky top-0 z-50 border-b border-line bg-surface/80 px-6 py-2.5 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs font-mono">
          <span className="text-muted">Classic View · Semantic Edition</span>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1.5 py-0.5"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
            <span>Back to main portfolio (datasheet)</span>
          </Link>
        </div>
      </div>

      <main id="main-content" className="relative min-h-screen overflow-x-hidden bg-background text-ink">
        <GradientOrbs />
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Blog />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
