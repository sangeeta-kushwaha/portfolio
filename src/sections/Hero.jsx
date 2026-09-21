import { useRef } from 'react'
import { ArrowDownRight } from 'lucide-react'
import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { Magnetic } from '../components/Motion'
import { FloatingElements } from '../components/FloatingElements'
import { gsap, useGSAP, SplitText, prefersReducedMotion } from '../lib/gsap'
import { profile } from '../data/profile'

export default function Hero() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const blob1 = useRef(null)
  const blob2 = useRef(null)
  const ringRef = useRef(null)
  const scrollLine = useRef(null)

  useGSAP(
    () => {
      const reduce = prefersReducedMotion()
      const root = sectionRef.current
      if (!root) return

      // --- Intro timeline ---
      if (!reduce) {
        const split = SplitText.create(titleRef.current, {
          type: 'chars,words',
          charsClass: 'hero-char',
          wordsClass: 'hero-word'
        })

        gsap.set(titleRef.current, { perspective: 800 })
        gsap.set(split.chars, { yPercent: 120, opacity: 0, rotateX: -55 })

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.from('.hero-eyebrow', { y: 24, opacity: 0, filter: 'blur(10px)', duration: 0.8 })
          .to(
            split.chars,
            {
              yPercent: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.9,
              stagger: 0.028,
              ease: 'power4.out'
            },
            '-=0.35'
          )
          .from('.hero-intro', { y: 28, opacity: 0, duration: 0.75 }, '-=0.45')
          .from('.hero-cta', { y: 22, opacity: 0, duration: 0.65, stagger: 0.1 }, '-=0.4')
          .from('.hero-scroll', { opacity: 0, duration: 0.6 }, '-=0.2')

        // Orbit ring
        if (ringRef.current) {
          gsap.to(ringRef.current, {
            rotate: 360,
            duration: 28,
            repeat: -1,
            ease: 'none'
          })
          gsap.to(ringRef.current.querySelector('.ring-dot'), {
            scale: 1.35,
            duration: 1.2,
            yoyo: true,
            repeat: -1,
            ease: 'sine.inOut'
          })
        }

        // Scroll indicator bounce
        if (scrollLine.current) {
          gsap.fromTo(
            scrollLine.current,
            { y: '-100%' },
            { y: '200%', duration: 1.35, repeat: -1, ease: 'power1.inOut' }
          )
        }

        // Parallax on scroll
        gsap.to(contentRef.current, {
          y: 100,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        })

        gsap.to(blob1.current, {
          y: 180,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        })

        gsap.to(blob2.current, {
          y: 100,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        })
      }
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="top" className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 bg-atmosphere" />
      <div className="absolute inset-0 bg-noise" />
      <FloatingElements />

      <div
        ref={blob1}
        className="animate-drift absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-400/30 blur-3xl dark:bg-brand-500/20"
        aria-hidden
      />
      <div
        ref={blob2}
        className="animate-float absolute -right-16 bottom-24 h-80 w-80 rounded-full bg-ink-300/40 blur-3xl dark:bg-ink-600/30"
        aria-hidden
      />

      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-[8%] hidden h-48 w-48 -translate-y-1/2 rounded-full border border-brand-600/25 lg:block dark:border-brand-400/20"
      >
        <span className="ring-dot absolute top-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600 dark:bg-brand-400" />
      </div>

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-center py-28">
        <div ref={contentRef} className="max-w-4xl" style={{ perspective: 900 }}>
          <p className="hero-eyebrow text-sm font-medium tracking-[0.2em] text-brand-700 uppercase dark:text-brand-300">
            {profile.title} · {profile.location}
          </p>

          <h1
            ref={titleRef}
            className="font-display mt-5 overflow-hidden text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.95] font-bold tracking-tight text-ink-950 dark:text-white"
          >
            {profile.name}
          </h1>

          <p className="hero-intro mt-6 max-w-xl text-lg leading-relaxed text-ink-600 dark:text-ink-200 sm:text-xl">
            {profile.intro}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic className="hero-cta">
              <Button as="a" href="#projects" variant="primary" size="lg">
                View projects
                <ArrowDownRight className="h-4 w-4" />
              </Button>
            </Magnetic>
            <Magnetic className="hero-cta" strength={0.22}>
              <Button as="a" href="#contact" variant="ghost" size="lg">
                Let’s talk
              </Button>
            </Magnetic>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-8 left-4 flex items-center gap-3 text-xs tracking-[0.18em] text-ink-500 uppercase sm:left-6 lg:left-8 dark:text-ink-300">
          <span className="relative flex h-10 w-px overflow-hidden bg-ink-300/50 dark:bg-ink-500/40">
            <span
              ref={scrollLine}
              className="absolute inset-x-0 h-1/2 bg-brand-600 dark:bg-brand-400"
            />
          </span>
          Scroll
        </div>
      </Container>
    </section>
  )
}
