const PLACEHOLDER_BITS = ['example.com', 'your-username', 'yourusername']

export function isSafeHref(value) {
  if (typeof value !== 'string') return false
  const url = value.trim()
  if (!url) return false
  const lower = url.toLowerCase()
  if (PLACEHOLDER_BITS.some((bit) => lower.includes(bit))) return false
  if (lower.startsWith('javascript:') || lower.startsWith('data:')) return false
  if (url.startsWith('/')) return !url.startsWith('//')
  return /^https?:\/\//i.test(url)
}

export function isEmail(value) {
  if (typeof value !== 'string') return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}
