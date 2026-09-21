import { useEffect, useMemo, useState } from 'react'
import { Button } from './Button'
import { cn } from '../utils/cn'

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Timeline' },
  { href: '#contact', label: 'Contact' }
]

export function Navbar({ name, isDark, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const items = useMemo(() => links, [])

  return (
    <div
      className={cn(
        'fixed top-0 right-0 left-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-b border-ink-950/10 bg-[#f7f6fd]/85 backdrop-blur-md dark:border-white/10 dark:bg-ink-950/70'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#top" className="font-display text-sm font-bold tracking-tight text-ink-950 dark:text-white">
          {name}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {items.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative px-3 py-2 text-sm font-medium text-ink-600 transition hover:text-ink-950 dark:text-ink-200 dark:hover:text-white"
            >
              {l.label}
              <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-brand-600 transition duration-300 group-hover:scale-x-100 dark:bg-brand-400" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? 'Light' : 'Dark'}
          </Button>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center border border-ink-950/15 text-ink-950 transition hover:bg-ink-950/5 md:hidden dark:border-white/15 dark:text-white dark:hover:bg-white/5"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span aria-hidden className="flex flex-col gap-1.5">
              <span className={cn('h-px w-4 bg-current transition', open && 'translate-y-[3.5px] rotate-45')} />
              <span className={cn('h-px w-4 bg-current transition', open && '-translate-y-[3.5px] -rotate-45')} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="overflow-hidden border-t border-ink-950/10 bg-[#f7f6fd]/95 backdrop-blur-md md:hidden dark:border-white/10 dark:bg-ink-950/90">
          <div className="mx-auto w-full max-w-6xl space-y-1 px-4 py-4">
            {items.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-3 text-sm font-medium text-ink-700 hover:text-ink-950 dark:text-ink-200 dark:hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
