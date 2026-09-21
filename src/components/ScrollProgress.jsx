import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

export function ScrollProgress() {
  const barRef = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion() || !barRef.current) return

    gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' })

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        gsap.set(barRef.current, { scaleX: self.progress })
      }
    })
  }, [])

  return (
    <div
      ref={barRef}
      aria-hidden
      className="pointer-events-none fixed top-0 right-0 left-0 z-50 h-[2px] bg-brand-600 dark:bg-brand-400"
    />
  )
}
