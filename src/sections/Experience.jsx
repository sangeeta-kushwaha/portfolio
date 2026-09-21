import { useRef } from 'react'
import { Section } from '../components/Section'
import { Stagger, StaggerItem } from '../components/Motion'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { timeline } from '../data/profile'

function TimelineLine() {
  const ref = useRef(null)

  useGSAP(() => {
    if (!ref.current) return
    if (prefersReducedMotion()) {
      gsap.set(ref.current, { scaleY: 1 })
      return
    }
    gsap.fromTo(
      ref.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.5,
        ease: 'power3.out',
        transformOrigin: 'top center',
        scrollTrigger: {
          trigger: ref.current.parentElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [])

  return (
    <div className="absolute top-0 bottom-0 left-0 w-px overflow-hidden sm:left-1">
      <div ref={ref} className="h-full w-full bg-brand-600/70 dark:bg-brand-400/60" />
    </div>
  )
}

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Path so far"
      subtitle="Roles and learning that shaped how I build for the web."
    >
      <div className="relative">
        <TimelineLine />

        <Stagger className="space-y-10">
          {timeline.map((t) => (
            <StaggerItem key={`${t.title}-${t.period}`} className="relative pl-8 sm:pl-10">
              <span className="absolute top-1.5 left-[-4px] h-2.5 w-2.5 rounded-full bg-brand-600 ring-4 ring-[#f7f6fd] dark:bg-brand-400 dark:ring-ink-950 sm:left-[-0.5px]" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl font-bold text-ink-950 dark:text-white">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{t.org}</p>
                </div>
                <p className="text-sm font-medium tracking-wide text-brand-700 dark:text-brand-300">
                  {t.period}
                </p>
              </div>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-600 dark:text-ink-200">
                {t.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-600 dark:bg-brand-400" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
