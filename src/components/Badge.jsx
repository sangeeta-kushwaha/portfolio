import { cn } from '../utils/cn'

export function Badge({ className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-ink-950/10 bg-white/70 px-2.5 py-1 text-xs font-medium text-ink-700 dark:border-white/10 dark:bg-white/5 dark:text-ink-200',
        className
      )}
    >
      {children}
    </span>
  )
}
