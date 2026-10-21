import { Database, Monitor, Server, Wrench } from 'lucide-react'
import { Section } from '../components/Section'
import { Stagger, StaggerItem } from '../components/Motion'
import { skillGroups } from '../data/profile'

const ICONS = {
  frontend: Monitor,
  backend: Server,
  database: Database,
  tools: Wrench
}

export default function Skills() {
  const groups = skillGroups.filter((group) => group.items?.length)

  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Technologies I use"
      subtitle="Grouped by where they show up in the projects I have actually built."
    >
      <Stagger className="grid gap-4 sm:grid-cols-2">
        {groups.map((group) => {
          const Icon = ICONS[group.id] || Monitor
          return (
            <StaggerItem key={group.id} className="panel rounded-[1.6rem] p-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600/10 text-brand-800 dark:bg-brand-300/10 dark:text-brand-100">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-bold text-ink-950 dark:text-white">{group.title}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-ink-950/10 bg-white/70 px-3 py-1.5 text-sm text-ink-700 dark:border-white/10 dark:bg-white/5 dark:text-ink-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
