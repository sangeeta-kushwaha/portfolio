import { cn } from '../utils/cn'

export function Button({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 disabled:opacity-60 disabled:pointer-events-none hover:scale-[1.03] active:scale-[0.97]'

  const variants = {
    primary:
      'bg-ink-950 text-white hover:bg-brand-700 dark:bg-brand-400 dark:text-ink-950 dark:hover:bg-brand-300',
    secondary:
      'bg-brand-600/15 text-brand-800 hover:bg-brand-600/25 dark:bg-brand-400/15 dark:text-brand-200 dark:hover:bg-brand-400/25',
    ghost:
      'bg-transparent text-ink-950 hover:bg-ink-950/5 border border-ink-950/15 dark:text-white dark:border-white/15 dark:hover:bg-white/5'
  }

  const sizes = {
    sm: 'h-9 px-3 text-sm rounded-md',
    md: 'h-11 px-4 text-sm rounded-md',
    lg: 'h-12 px-6 text-base rounded-md'
  }

  return <Comp className={cn(base, variants[variant], sizes[size], className)} {...props} />
}
