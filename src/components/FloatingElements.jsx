import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'

const SHAPES = [
  {
    id: 'orb-1',
    className:
      'left-[8%] top-[22%] h-16 w-16 rounded-full border border-brand-500/40 bg-brand-400/20 backdrop-blur-sm dark:border-brand-400/30 dark:bg-brand-500/15',
    dur: 5.5,
    y: 28,
    x: 14,
    rot: 12
  },
  {
    id: 'orb-2',
    className:
      'right-[12%] top-[28%] h-10 w-10 rounded-full bg-gradient-to-br from-brand-400/50 to-brand-700/30 blur-[1px] dark:from-brand-400/35 dark:to-brand-700/20',
    dur: 4.2,
    y: -22,
    x: 10,
    rot: -8
  },
  {
    id: 'diamond',
    className:
      'right-[18%] bottom-[26%] h-12 w-12 rotate-45 border border-brand-600/35 bg-white/40 dark:border-brand-400/25 dark:bg-white/5',
    dur: 6.2,
    y: 20,
    x: -16,
    rot: 20
  },
  {
    id: 'ring',
    className:
      'left-[14%] bottom-[30%] h-20 w-20 rounded-full border-2 border-dashed border-brand-500/30 dark:border-brand-400/25',
    dur: 7,
    y: -18,
    x: 12,
    rot: 40
  },
  {
    id: 'dot-a',
    className: 'left-[42%] top-[18%] h-2.5 w-2.5 rounded-full bg-brand-600 dark:bg-brand-400',
    dur: 3.8,
    y: 16,
    x: 8,
    rot: 0
  },
  {
    id: 'dot-b',
    className: 'right-[28%] top-[58%] h-2 w-2 rounded-full bg-brand-400 dark:bg-brand-300',
    dur: 4.6,
    y: -14,
    x: -10,
    rot: 0
  },
  {
    id: 'pill-react',
    className:
      'left-[6%] top-[48%] hidden rounded-full border border-brand-600/20 bg-white/70 px-3 py-1.5 text-xs font-medium text-ink-700 shadow-sm backdrop-blur-md sm:block dark:border-white/10 dark:bg-white/10 dark:text-ink-200',
    label: 'React',
    dur: 5.8,
    y: 18,
    x: 10,
    rot: 4
  },
  {
    id: 'pill-ui',
    className:
      'right-[8%] top-[42%] hidden rounded-full border border-brand-600/20 bg-white/70 px-3 py-1.5 text-xs font-medium text-ink-700 shadow-sm backdrop-blur-md sm:block dark:border-white/10 dark:bg-white/10 dark:text-ink-200',
    label: 'UI Motion',
    dur: 6.5,
    y: -20,
    x: -12,
    rot: -5
  },
  {
    id: 'bar',
    className:
      'left-[55%] bottom-[18%] hidden h-1.5 w-16 rounded-full bg-gradient-to-r from-brand-400 to-brand-700/60 sm:block dark:from-brand-400/70 dark:to-brand-600/40',
    dur: 4.8,
    y: 12,
    x: 18,
    rot: 0
  }
]

export function FloatingElements({ className = '' }) {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !rootRef.current) return

      const items = rootRef.current.querySelectorAll('[data-float]')
      items.forEach((el, i) => {
        const y = Number(el.dataset.y) || 20
        const x = Number(el.dataset.x) || 10
        const rot = Number(el.dataset.rot) || 0
        const dur = Number(el.dataset.dur) || 5

        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.7 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: 0.35 + i * 0.08,
            ease: 'power3.out'
          }
        )

        gsap.to(el, {
          y: y,
          x: x,
          rotation: rot,
          duration: dur,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.15
        })
      })

      // Soft mouse parallax on the whole layer
      const layer = rootRef.current
      const onMove = (e) => {
        const cx = (e.clientX / window.innerWidth - 0.5) * 24
        const cy = (e.clientY / window.innerHeight - 0.5) * 16
        gsap.to(layer, {
          x: cx,
          y: cy,
          duration: 1.1,
          ease: 'power3.out',
          overwrite: 'auto'
        })
      }
      window.addEventListener('mousemove', onMove)
      return () => window.removeEventListener('mousemove', onMove)
    },
    { scope: rootRef }
  )

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}
    >
      {SHAPES.map((s) => (
        <div
          key={s.id}
          data-float
          data-y={s.y}
          data-x={s.x}
          data-rot={s.rot}
          data-dur={s.dur}
          className={`absolute will-change-transform ${s.className}`}
        >
          {s.label ?? null}
        </div>
      ))}
    </div>
  )
}
