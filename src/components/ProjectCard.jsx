import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from './Badge'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'

export function ProjectCard({ project, index = 0 }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return
      const el = ref.current

      gsap.from(el, {
        opacity: 0,
        y: 48,
        scale: 0.96,
        duration: 0.9,
        delay: index * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      })

      const xTo = gsap.quickTo(el, 'rotateY', { duration: 0.4, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'rotateX', { duration: 0.4, ease: 'power3.out' })

      const onMove = (e) => {
        const rect = el.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width - 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5
        xTo(px * 10)
        yTo(py * -8)
      }
      const onLeave = () => {
        xTo(0)
        yTo(0)
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    { dependencies: [index] }
  )

  return (
    <article
      ref={ref}
      className="group relative overflow-hidden border border-ink-950/10 bg-white/50 p-6 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03]"
      style={{ transformStyle: 'preserve-3d', perspective: 900, willChange: 'transform' }}
    >
      <div className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brand-500 transition duration-500 group-hover:scale-x-100" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-brand-400/0 blur-2xl transition duration-500 group-hover:bg-brand-400/25 dark:group-hover:bg-brand-400/15"
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-ink-400 uppercase dark:text-ink-400">
            0{index + 1}
          </p>
          <h3 className="font-display mt-2 text-xl font-bold text-ink-950 transition-colors group-hover:text-brand-700 dark:text-white dark:group-hover:text-brand-300">
            {project.title}
          </h3>
        </div>
        <div className="flex gap-2">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center border border-ink-950/10 text-ink-700 transition hover:rotate-12 hover:border-brand-600 hover:text-brand-700 dark:border-white/10 dark:text-ink-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
            aria-label={`${project.title} demo`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center px-3 text-xs font-medium text-ink-600 underline-offset-4 hover:underline dark:text-ink-200"
          >
            Code
          </a>
        </div>
      </div>

      <p className="relative mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-200">
        {project.description}
      </p>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {project.stack.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
    </article>
  )
}
