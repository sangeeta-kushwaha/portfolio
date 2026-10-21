import { useEffect, useId, useRef, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { cn } from '../utils/cn'

export function Navbar({ links, activeId, name, isDark, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButtonRef = useRef(null)
  const firstLinkRef = useRef(null)
  const menuId = useId()
  const shortName = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    firstLinkRef.current?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function closeMenu() {
    setOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-40 transition-colors duration-300',
        open
          ? 'border-b border-ink-950/10 bg-[#f6f4fb] shadow-sm dark:border-white/10 dark:bg-[#100f1c]'
          : scrolled
            ? 'border-b border-ink-950/10 bg-[#f6f4fb]/85 backdrop-blur-md dark:border-white/10 dark:bg-[#0e0d18]/80'
            : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="font-display text-sm font-bold tracking-tight text-ink-950 dark:text-white">
          <span className="sm:hidden">{shortName}</span>
          <span className="hidden sm:inline">{name}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => {
            const current = activeId === link.id
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={current ? 'true' : undefined}
                className={cn(
                  'rounded-full px-3 py-2 text-sm font-medium transition',
                  current
                    ? 'bg-ink-950 text-white dark:bg-white dark:text-ink-950'
                    : 'text-ink-600 hover:text-ink-950 dark:text-ink-200 dark:hover:text-white'
                )}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-pressed={isDark}
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-950/10 text-ink-800 transition hover:bg-white/70 dark:border-white/10 dark:text-white dark:hover:bg-white/10"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-950/10 text-ink-950 md:hidden dark:border-white/10 dark:text-white"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id={menuId}
          className="fixed inset-x-0 top-[4.25rem] bottom-0 z-30 overflow-y-auto border-t border-ink-950/10 bg-[#f6f4fb] px-4 py-4 md:hidden dark:border-white/10 dark:bg-[#100f1c]"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {links.map((link, index) => (
              <li key={link.href}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  aria-current={activeId === link.id ? 'true' : undefined}
                  onClick={closeMenu}
                  className="block rounded-2xl px-3 py-3 text-base font-medium text-ink-800 hover:bg-white/70 dark:text-ink-100 dark:hover:bg-white/5"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
