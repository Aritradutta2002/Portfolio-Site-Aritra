import type { Metadata } from 'next'
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
  title: 'Aritra Dutta | Portfolio — plain version',
  description:
    'Accessible, text-only version of the Aritra Dutta portfolio: full stack engineering experience at TCS, projects, skills, education and contact details.',
}

/* The previous scrolling site, preserved as the accessible / no-3D fallback
   referenced by the skip-intro link and Spotlight (Plan §8). */
export default function ClassicPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-ink">
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
  )
}
