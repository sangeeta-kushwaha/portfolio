import { useEffect, useState } from 'react'

export function useActiveSection(ids) {
  const key = ids.join('|')
  const [active, setActive] = useState(ids[0] || 'top')

  useEffect(() => {
    const list = key.split('|').filter(Boolean)
    const elements = list.map((id) => document.getElementById(id)).filter(Boolean)
    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) setActive(visible.target.id)
      },
      { rootMargin: '-42% 0px -48% 0px', threshold: [0.1, 0.25, 0.5] }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [key])

  return active
}
