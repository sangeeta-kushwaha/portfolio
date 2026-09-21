import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'portfolio.theme'

function getSystemPref() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light'
}

function applyTheme(theme) {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

export function useDarkMode() {
  const initial = useMemo(() => {
    if (typeof window === 'undefined') return 'light'
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'dark' || saved === 'light') return saved
    return getSystemPref()
  }, [])

  const [theme, setTheme] = useState(initial)

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return {
    theme,
    isDark: theme === 'dark',
    setTheme,
    toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }
}

