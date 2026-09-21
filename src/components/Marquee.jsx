import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'

const DEFAULT_ITEMS = [
  'React',
  'JavaScript',
  'Tailwind',
  'Vite',
  'Accessibility',
  'Performance',
  'TypeScript',
  'Responsive UI'
]

export function Marquee({ items = DEFAULT_ITEMS }) {
  const trackRef = useRef(null)
  const reduce = prefersReducedMotion()
  const row = [...items, ...items]

  useGSAP(
    () => {
      if (reduce || !trackRef.current) return
      const track = trackRef.current
      const tween = gsap.to(track, {
        xPercent: -50,
        duration: 28,
        ease: 'none',
        repeat: -1
      })

      const pause = () => tween.pause()
      const play = () => tween.play()
      track.addEventListener('mouseenter', pause)
      track.addEventListener('mouseleave', play)

      return () => {
        track.removeEventListener('mouseenter', pause)
        track.removeEventListener('mouseleave', play)
      }
    },
    { dependencies: [reduce] }
  )

  return (
    <div className="relative overflow-hidden border-y border-ink-950/10 py-4 dark:border-white/10">
      <div ref={trackRef} className="flex w-max gap-10 will-change-transform">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display flex items-center gap-10 text-sm font-semibold tracking-[0.12em] text-ink-500 uppercase dark:text-ink-300"
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-brand-600 dark:bg-brand-400" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  )
}
