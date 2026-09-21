import { useEffect, useMemo, useState } from 'react'
import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectsGridSkeleton } from '../components/Skeletons'
import { projects } from '../data/profile'

function uniq(arr) {
  return Array.from(new Set(arr))
}

export default function Projects() {
  const allTags = useMemo(() => uniq(projects.flatMap((p) => p.tags ?? [])), [])
  const [active, setActive] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 400)
    return () => window.clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    if (active === 'All') return projects
    return projects.filter((p) => (p.tags ?? []).includes(active))
  }, [active])

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Selected work"
      subtitle="UI-focused builds that highlight layout, interaction, and component systems."
      className="bg-white/45 dark:bg-white/[0.02]"
    >
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={active === 'All' ? 'secondary' : 'ghost'}
          onClick={() => setActive('All')}
        >
          All
        </Button>
        {allTags.map((t) => (
          <Button
            key={t}
            size="sm"
            variant={active === t ? 'secondary' : 'ghost'}
            onClick={() => setActive(t)}
          >
            {t}
          </Button>
        ))}
      </div>

      <div className="mt-10">
        {loading ? (
          <ProjectsGridSkeleton />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
