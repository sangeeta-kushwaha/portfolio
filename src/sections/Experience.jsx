import { useRef } from 'react'
import { Section } from '../components/Section'
import { Stagger, StaggerItem } from '../components/Motion'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { education, experience } from '../data/profile'

function TimelineLine() {
  const ref = useRef(null)

  useGSAP(() => {
    if (!ref.current || prefersReducedMotion()) return
    gsap.fromTo(
      ref.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.2,
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
    <div className="absolute top-0 bottom-0 left-[7px] w-px bg-brand-600/25 dark:bg-brand-300/30">
      <div ref={ref} className="h-full w-full origin-top bg-brand-600 dark:bg-brand-300" />
    </div>
  )
}

export default function Experience() {
  const items = [
    ...experience.map((item) => ({ ...item, kind: 'Experience' })),
    ...education.map((item) => ({ ...item, kind: 'Education' }))
  ]

  if (!items.length) return null

  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Work and study"
      subtitle="Roles and education I can point to."
    >
      <div className="relative">
        <TimelineLine />
        <Stagger className="space-y-8">
          {items.map((item) => (
            <StaggerItem key={`${item.kind}-${item.title}-${item.period}`} className="relative pl-10">
              <span className="absolute top-1.5 left-0 h-4 w-4 rounded-full border-4 border-[var(--bg)] bg-brand-600 dark:bg-brand-300" />
              <div className="panel rounded-[1.4rem] p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium tracking-[0.16em] text-brand-700 uppercase dark:text-brand-300">
                      {item.kind}
                    </p>
                    <h3 className="font-display mt-2 text-xl font-bold text-ink-950 dark:text-white">{item.title}</h3>
                    {item.org && <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{item.org}</p>}
                  </div>
                  {item.period && (
                    <p className="text-sm font-medium text-ink-500 dark:text-ink-300">{item.period}</p>
                  )}
                </div>
                {item.points?.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-600 dark:text-ink-200">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
