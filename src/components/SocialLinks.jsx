import { Mail } from 'lucide-react'
import { profile } from '../data/profile'
import { isEmail, isSafeHref } from '../lib/urls'
import { cn } from '../utils/cn'
import { GithubIcon, LinkedinIcon } from './Icons'

function getSocialLinks() {
  const items = []
  if (isSafeHref(profile.socials?.github)) {
    items.push({ label: 'GitHub', href: profile.socials.github, icon: GithubIcon })
  }
  if (isSafeHref(profile.socials?.linkedin)) {
    items.push({ label: 'LinkedIn', href: profile.socials.linkedin, icon: LinkedinIcon })
  }
  if (isEmail(profile.email)) {
    items.push({
      label: 'Email',
      href: `mailto:${profile.email.trim()}`,
      icon: Mail,
      external: false
    })
  }
  return items
}

export function SocialLinks({ className, compact = false }) {
  const items = getSocialLinks()
  if (!items.length) return null

  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)}>
      {items.map((item) => {
        const Icon = item.icon
        const external = item.external !== false && item.href.startsWith('http')
        return (
          <li key={item.label}>
            <a
              href={item.href}
              className="inline-flex items-center gap-2 rounded-full border border-ink-950/10 bg-white/60 px-3 py-2 text-sm font-medium text-ink-800 transition hover:border-brand-600/40 hover:text-brand-800 dark:border-white/10 dark:bg-white/5 dark:text-ink-100 dark:hover:border-brand-300/40 dark:hover:text-white"
              {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            >
              <Icon className="h-4 w-4" />
              {compact ? <span className="sr-only">{item.label}</span> : item.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
