import { cn } from '../utils/cn'

export function Input({ label, error, className, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-900 dark:text-white">{label}</span>
      <input
        className={cn(
          'mt-2 h-11 w-full border border-ink-950/15 bg-white/60 px-3 text-sm text-ink-950 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:border-brand-400',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {error && <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
    </label>
  )
}

export function Textarea({ label, error, className, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-900 dark:text-white">{label}</span>
      <textarea
        className={cn(
          'mt-2 min-h-[140px] w-full resize-y border border-ink-950/15 bg-white/60 px-3 py-3 text-sm text-ink-950 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:border-brand-400',
          error && 'border-red-400 focus:border-red-500 focus:ring-red-500/20',
          className
        )}
        {...props}
      />
      {error && <p className="mt-2 text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
    </label>
  )
}
