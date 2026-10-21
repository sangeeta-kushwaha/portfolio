import { cn } from '../utils/cn'

function fieldClass(error) {
  return cn(
    'mt-2 w-full rounded-2xl border border-ink-950/12 bg-white/80 px-3 text-sm text-ink-950 outline-none transition placeholder:text-ink-400 focus:border-brand-600 dark:border-white/12 dark:bg-white/5 dark:text-white dark:placeholder:text-ink-400 dark:focus:border-brand-300',
    error && 'border-red-500 focus:border-red-500'
  )
}

export function Input({ id, label, error, className, ...props }) {
  const errorId = id && error ? `${id}-error` : undefined
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink-900 dark:text-white">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
        className={cn(fieldClass(error), 'h-11', className)}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-2 text-xs font-medium text-red-700 dark:text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}

export function Textarea({ id, label, error, className, ...props }) {
  const errorId = id && error ? `${id}-error` : undefined
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-ink-900 dark:text-white">
        {label}
      </label>
      <textarea
        id={id}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
        className={cn(fieldClass(error), 'min-h-36 resize-y py-3', className)}
        {...props}
      />
      {error && (
        <p id={errorId} className="mt-2 text-xs font-medium text-red-700 dark:text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}
