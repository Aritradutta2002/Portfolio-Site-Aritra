import { Navigation } from '@/components/Navigation'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { SkillWheel } from '@/components/SkillWheel'
import { Projects } from '@/components/Projects'
import { Experience } from '@/components/Experience'
import { Blog } from '@/components/Blog'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { AnimatedBackground } from '@/components/AnimatedBackground'

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <AnimatedBackground />
      <Navigation />
      <Hero />
      <About />
      <SkillWheel />
      <Projects />
      <Experience />
      <Blog />
      <Contact />
      <Footer />
    </main>
  )
}
