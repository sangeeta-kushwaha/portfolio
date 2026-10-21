import { cn } from '../utils/cn'

export function Button({ as: Comp = 'button', variant = 'primary', size = 'md', className, ...props }) {
  const typeProps = Comp === 'button' && props.type == null ? { type: 'button' } : {}
  const base =
    'inline-flex items-center justify-center gap-2 font-medium transition duration-200 focus-visible:outline disabled:cursor-not-allowed disabled:opacity-60'

  const variants = {
    primary:
      'bg-ink-950 text-white shadow-[0_12px_30px_-18px_rgba(49,32,120,0.9)] hover:bg-brand-800 dark:bg-brand-300 dark:text-ink-950 dark:hover:bg-brand-200',
    secondary:
      'bg-brand-600/12 text-brand-900 hover:bg-brand-600/20 dark:bg-brand-300/15 dark:text-brand-100 dark:hover:bg-brand-300/25',
    ghost:
      'border border-ink-950/15 bg-white/50 text-ink-950 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
  }

  const sizes = {
    sm: 'h-9 rounded-full px-3 text-sm',
    md: 'h-11 rounded-full px-4 text-sm',
    lg: 'h-12 rounded-full px-6 text-base'
  }

  return <Comp className={cn(base, variants[variant], sizes[size], className)} {...typeProps} {...props} />
}
