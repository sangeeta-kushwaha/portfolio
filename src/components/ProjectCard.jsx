import { ArrowUpRight } from 'lucide-react'
import { Badge } from './Badge'
import { ProjectCover } from './ProjectCover'
import { isSafeHref } from '../lib/urls'
import { cn } from '../utils/cn'

function ProjectAction({ href, children, missingLabel }) {
  if (isSafeHref(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-1.5 rounded-full border border-ink-950/10 bg-white/70 px-3.5 py-2 text-sm font-medium text-ink-800 transition hover:border-brand-600/50 hover:text-brand-800 dark:border-white/10 dark:bg-white/5 dark:text-ink-100 dark:hover:border-brand-300/50 dark:hover:text-white"
      >
        {children}
        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    )
  }

  if (import.meta.env.DEV) {
    return (
      <span
        className="inline-flex items-center rounded-full border border-dashed border-ink-400/50 px-3.5 py-2 text-xs font-medium text-ink-500 dark:border-white/20 dark:text-ink-300"
        title="Add this URL in src/data/profile.js"
      >
        {missingLabel}
      </span>
    )
  }

  return null
}

export function ProjectCard({ project, featured = false }) {
  return (
    <article
      className={cn(
        'panel group flex h-full flex-col overflow-hidden rounded-[1.6rem] motion-safe:transition motion-safe:duration-300 motion-safe:hover:-translate-y-1',
        featured && 'sm:col-span-2 lg:grid lg:grid-cols-2'
      )}
    >
      <ProjectCover
        project={project}
        className={featured ? 'lg:aspect-auto lg:h-full lg:min-h-[320px]' : undefined}
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-xs font-medium tracking-[0.16em] text-brand-700 uppercase dark:text-brand-300">
          {project.category}
        </p>
        <h3 className="font-display mt-2 text-2xl font-bold tracking-tight text-ink-950 dark:text-white">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-200">{project.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li key={item}>
              <Badge>{item}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <ProjectAction href={project.githubUrl} missingLabel="GitHub URL not set">
            GitHub
          </ProjectAction>
          <ProjectAction href={project.demoUrl} missingLabel="Live demo not set">
            Live demo
          </ProjectAction>
        </div>
      </div>
    </article>
  )
}
