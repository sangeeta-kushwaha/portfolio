import { Section } from '../components/Section'
import { FadeIn, Stagger, StaggerItem } from '../components/Motion'
import { about } from '../data/profile'

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="How I like to build"
      subtitle={about.lead}
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <FadeIn className="panel rounded-[1.6rem] p-6 sm:p-8 lg:col-span-5">
          <h3 className="font-display text-xl font-bold text-ink-950 dark:text-white">Approach</h3>
          <p className="mt-4 text-base leading-relaxed text-ink-600 dark:text-ink-200">{about.approach}</p>
          <h3 className="font-display mt-8 text-xl font-bold text-ink-950 dark:text-white">Interests</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {about.interests.map((item) => (
              <li
                key={item}
                className="rounded-full bg-brand-600/10 px-3 py-1.5 text-sm text-brand-900 dark:bg-brand-300/10 dark:text-brand-100"
              >
                {item}
              </li>
            ))}
          </ul>
        </FadeIn>

        <Stagger className="grid gap-4 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1">
          {about.strengths.map((item, index) => (
            <StaggerItem key={item.title} className="panel rounded-[1.6rem] p-6">
              <p className="text-xs font-medium tracking-[0.16em] text-brand-700 uppercase dark:text-brand-300">
                0{index + 1}
              </p>
              <h3 className="font-display mt-3 text-xl font-bold text-ink-950 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-200">{item.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
