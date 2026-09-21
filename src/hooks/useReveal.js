import { useEffect, useRef, useState } from 'react'

export function useReveal({ rootMargin = '-10% 0px -10% 0px', once = true } = {}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true)
            if (once) obs.disconnect()
          } else if (!once) {
            setShown(false)
          }
        }
      },
      { rootMargin }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin, once])

  return { ref, revealState: shown ? 'show' : 'hidden' }
}

