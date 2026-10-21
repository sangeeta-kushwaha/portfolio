import { useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { Portrait } from '../components/Portrait'
import { FloatingElements } from '../components/FloatingElements'
import { SocialLinks } from '../components/SocialLinks'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { profile } from '../data/profile'
import { isSafeHref } from '../lib/urls'

export default function Hero() {
  const sectionRef = useRef(null)
  const scrollLine = useRef(null)
  const resume = isSafeHref(profile.resumeUrl) ? profile.resumeUrl.trim() : ''

  useGSAP(
    () => {
      if (prefersReducedMotion() || !sectionRef.current) return

      gsap.from('.hero-reveal', {
        y: 22,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out'
      })

      if (scrollLine.current) {
        gsap.fromTo(
          scrollLine.current,
          { y: '-100%' },
          { y: '200%', duration: 1.5, repeat: -1, ease: 'power1.inOut' }
        )
      }
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 bg-atmosphere" />
      <div className="absolute inset-0 bg-noise" />
      <FloatingElements />

      <Container className="relative z-10 grid min-h-[100svh] items-center gap-14 py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="hero-reveal text-sm font-medium tracking-[0.18em] text-brand-700 uppercase dark:text-brand-300">
            {profile.location}
          </p>
          <h1 className="font-display hero-reveal mt-4 text-[clamp(3rem,8vw,5.6rem)] leading-[0.95] font-bold tracking-tight text-ink-950 dark:text-white">
            {profile.name}
          </h1>
          <p className="hero-reveal font-display mt-4 text-2xl font-semibold text-brand-800 sm:text-3xl dark:text-brand-200">
            {profile.title}
          </p>
          <p className="hero-reveal mt-6 max-w-xl text-lg leading-relaxed text-ink-600 dark:text-ink-200">
            {profile.intro}
          </p>

          <div className="hero-reveal mt-8 flex flex-wrap items-center gap-3">
            <Button as="a" href="#projects" variant="primary" size="lg">
              View projects
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button as="a" href="#contact" variant="ghost" size="lg">
              Contact me
            </Button>
            {resume ? (
              <Button as="a" href={resume} variant="ghost" size="lg" download>
                Resume
              </Button>
            ) : (
              import.meta.env.DEV && (
                <span
                  className="text-xs text-ink-500 dark:text-ink-300"
                  title="Add public/resume.pdf and set profile.resumeUrl in src/data/profile.js"
                >
                  Resume file not configured
                </span>
              )
            )}
          </div>

          <SocialLinks className="hero-reveal mt-6" />
        </div>

        <div className="hero-reveal lg:col-span-5">
          <Portrait />
        </div>
      </Container>

      <div className="absolute bottom-8 left-4 hidden items-center gap-3 text-xs tracking-[0.18em] text-ink-500 uppercase md:flex lg:left-8 dark:text-ink-300">
        <span className="relative flex h-10 w-px overflow-hidden bg-ink-300/60 dark:bg-ink-500/50">
          <span ref={scrollLine} className="absolute inset-x-0 h-1/2 bg-brand-600 dark:bg-brand-300" />
        </span>
        Scroll
      </div>
    </section>
  )
}
