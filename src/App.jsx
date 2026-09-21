import { Suspense, lazy } from 'react'
import { Navbar } from './components/Navbar'
import { Marquee } from './components/Marquee'
import { ScrollProgress } from './components/ScrollProgress'
import { SectionSkeleton } from './components/Skeletons'
import { useDarkMode } from './hooks/useDarkMode'
import { profile } from './data/profile'

const Hero = lazy(() => import('./sections/Hero'))
const About = lazy(() => import('./sections/About'))
const Projects = lazy(() => import('./sections/Projects'))
const Skills = lazy(() => import('./sections/Skills'))
const Experience = lazy(() => import('./sections/Experience'))
const Contact = lazy(() => import('./sections/Contact'))

export default function App() {
  const { isDark, toggle } = useDarkMode()

  return (
    <div className="min-h-screen bg-[#f7f6fd] text-ink-950 dark:bg-ink-950 dark:text-white">
      <ScrollProgress />
      <Navbar name={profile.name} isDark={isDark} onToggleTheme={toggle} />

      <main>
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
        <Suspense fallback={<SectionSkeleton />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>

      <footer className="border-t border-ink-950/10 py-12 dark:border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 text-sm text-ink-600 sm:px-6 lg:px-8 dark:text-ink-300">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a className="underline-offset-4 transition hover:text-brand-700 hover:underline dark:hover:text-brand-300" href="#top">
            Back to top
          </a>
        </div>
      </footer>
    </div>
  )
}
