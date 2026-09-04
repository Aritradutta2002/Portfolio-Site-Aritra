import { Navbar } from '@/components/sections/Navbar'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Experience } from '@/components/sections/Experience'
import { Blog } from '@/components/sections/Blog'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/sections/Footer'
import { LuxeBackdrop } from '@/components/luxe/Backdrop'
import { Preloader } from '@/components/luxe/Preloader'
import { Cursor } from '@/components/luxe/Cursor'
import { ScrollProgress } from '@/components/luxe/ScrollProgress'

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-ink">
      <LuxeBackdrop />
      <ScrollProgress />
      <Cursor />
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Blog />
      <Contact />
      <Footer />
    </div>
  )
}
