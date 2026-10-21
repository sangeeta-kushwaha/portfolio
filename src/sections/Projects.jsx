import { useMemo, useState } from 'react'
import { Section } from '../components/Section'
import { ProjectCard } from '../components/ProjectCard'
import { profile, projects } from '../data/profile'
import { isSafeHref } from '../lib/urls'
import { cn } from '../utils/cn'

export default function Projects() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(projects.map((project) => project.category).filter(Boolean)))],
    []
  )
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter((project) => project.category === active)

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      subtitle="Interfaces and full-stack pieces I have built, with source and live links where they are published."
      className="bg-white/40 dark:bg-white/[0.02]"
    >
      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter projects">
        {categories.map((category) => {
          const selected = active === category
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(category)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition',
                selected
                  ? 'bg-ink-950 text-white dark:bg-white dark:text-ink-950'
                  : 'border border-ink-950/10 text-ink-700 hover:bg-white/80 dark:border-white/10 dark:text-ink-200 dark:hover:bg-white/5'
              )}
            >
              {category}
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {filtered.length === 0 ? (
          <p className="text-sm text-ink-600 dark:text-ink-300">No projects in this category yet.</p>
        ) : (
          filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={Boolean(project.featured) && active === 'All'}
            />
          ))
        )}
      </div>

      {isSafeHref(profile.socials?.github) && (
        <p className="mt-8 text-sm text-ink-600 dark:text-ink-300">
          More experiments are on{' '}
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer noopener"
            className="font-medium text-brand-800 underline-offset-4 hover:underline dark:text-brand-200"
          >
            GitHub
          </a>
          .
        </p>
      )}
    </Section>
  )
}
