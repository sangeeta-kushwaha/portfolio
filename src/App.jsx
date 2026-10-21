import { Suspense, lazy } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Marquee } from './components/Marquee'
import { ScrollProgress } from './components/ScrollProgress'
import { SectionSkeleton } from './components/Skeletons'
import { useDarkMode } from './hooks/useDarkMode'
import { useActiveSection } from './hooks/useActiveSection'
import { hasTimeline, navLinks, profile } from './data/profile'

const Hero = lazy(() => import('./sections/Hero'))
const About = lazy(() => import('./sections/About'))
const Projects = lazy(() => import('./sections/Projects'))
const Skills = lazy(() => import('./sections/Skills'))
const Experience = lazy(() => import('./sections/Experience'))
const Contact = lazy(() => import('./sections/Contact'))

export default function App() {
  const { isDark, toggle } = useDarkMode()
  const links = navLinks.filter((link) => !link.requiresTimeline || hasTimeline())
  const active = useActiveSection(links.map((link) => link.id))

  return (
    <div className="min-h-screen bg-[var(--bg)] text-ink-950 dark:text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar
        links={links}
        activeId={active}
        name={profile.name}
        isDark={isDark}
        onToggleTheme={toggle}
      />

      <main id="main">
        <Suspense fallback={<SectionSkeleton title={false} />}>
          <Hero />
        </Suspense>
        <Marquee />
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Skills />
        </Suspense>
        {hasTimeline() && (
          <Suspense fallback={<SectionSkeleton />}>
            <Experience />
          </Suspense>
        )}
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
