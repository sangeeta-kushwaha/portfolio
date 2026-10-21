import { profile } from '../data/profile'
import { isSafeHref } from '../lib/urls'
import { Container } from './Container'
import { SocialLinks } from './SocialLinks'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink-950/10 dark:border-white/10">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <a href="#top" className="font-display text-2xl font-bold tracking-tight text-ink-950 dark:text-white">
            {profile.name}
          </a>
          <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{profile.title}</p>
          <SocialLinks className="mt-5" compact />
        </div>
        <div className="flex flex-col items-start gap-3 text-sm text-ink-600 sm:items-end dark:text-ink-300">
          <a
            href="#top"
            className="rounded-full border border-ink-950/10 px-4 py-2 font-medium text-ink-800 transition hover:border-brand-600/40 hover:text-brand-800 dark:border-white/10 dark:text-white dark:hover:text-brand-200"
          >
            Back to top
          </a>
          <p>
            © {year} {profile.name}
          </p>
          {isSafeHref(profile.socials?.github) && (
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer noopener"
              className="underline-offset-4 hover:underline"
            >
              GitHub profile
            </a>
          )}
        </div>
      </Container>
    </footer>
  )
}
