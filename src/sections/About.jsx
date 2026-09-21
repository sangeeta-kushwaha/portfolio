import { Section } from '../components/Section'
import { Badge } from '../components/Badge'
import { FadeIn, Stagger, StaggerItem } from '../components/Motion'
import { profile, skillGroups } from '../data/profile'

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Interfaces that feel alive"
      subtitle="I build clean, responsive React UIs with attention to motion, accessibility, and performance."
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-7">
          <p className="text-lg leading-relaxed text-ink-700 dark:text-ink-200">{profile.intro}</p>
          <p className="mt-5 text-base leading-relaxed text-ink-600 dark:text-ink-300">
            I focus on component-driven development, responsive layouts, and polishing interactions.
            Comfortable translating designs into reusable UI and improving UX with small, thoughtful
            details.
          </p>
        </FadeIn>

        <Stagger className="space-y-8 lg:col-span-5" faster>
          {skillGroups.map((g) => (
            <StaggerItem key={g.title}>
              <h3 className="text-xs font-medium tracking-[0.18em] text-ink-400 uppercase">
                {g.title}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
