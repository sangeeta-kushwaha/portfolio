import { useRef } from 'react'
import { Section } from '../components/Section'
import { Stagger, StaggerItem, CountUp } from '../components/Motion'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'
import { skills } from '../data/profile'

function Bar({ level }) {
  const ref = useRef(null)
  const fillRef = useRef(null)

  useGSAP(
    () => {
      if (!fillRef.current) return
      if (prefersReducedMotion()) {
        gsap.set(fillRef.current, { width: `${level}%` })
        return
      }

      gsap.fromTo(
        fillRef.current,
        { width: '0%' },
        {
          width: `${Math.max(0, Math.min(100, level))}%`,
          duration: 1.35,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      )
    },
    { dependencies: [level] }
  )

  return (
    <div ref={ref} className="h-1.5 w-full overflow-hidden bg-ink-950/10 dark:bg-white/10">
      <div ref={fillRef} className="relative h-full bg-brand-600 dark:bg-brand-400" />
    </div>
  )
}

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Tools in daily rotation"
      subtitle="Always sharpening fundamentals while shipping polished interfaces."
    >
      <Stagger className="grid gap-6 sm:grid-cols-2">
        {skills.map((s) => (
          <StaggerItem
            key={s.name}
            className="border-b border-ink-950/10 pb-5 dark:border-white/10"
          >
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <div className="font-display text-lg font-semibold text-ink-950 dark:text-white">
                {s.name}
              </div>
              <div className="text-sm tabular-nums text-ink-500 dark:text-ink-300">
                <CountUp to={s.level} />%
              </div>
            </div>
            <Bar level={s.level} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
