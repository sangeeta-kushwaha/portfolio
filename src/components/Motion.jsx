import { useRef } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'

/** Scroll-triggered fade + rise */
export function FadeIn({ children, className, delay = 0, y = 40 }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (!ref.current) return
      if (prefersReducedMotion()) {
        gsap.set(ref.current, { clearProps: 'all' })
        return
      }

      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      })
    },
    { scope: ref, dependencies: [delay, y] }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/** Clip-path wipe for titles */
export function ClipReveal({ children, className, delay = 0 }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (!ref.current) return
      if (prefersReducedMotion()) return

      gsap.fromTo(
        ref.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0.35 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1.05,
          delay,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      )
    },
    { scope: ref, dependencies: [delay] }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

/** Stagger children on scroll */
export function Stagger({ children, className, faster }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (!ref.current) return
      const items = ref.current.querySelectorAll('[data-stagger-item]')
      if (!items.length) return
      if (prefersReducedMotion()) return

      gsap.from(items, {
        opacity: 0,
        y: 36,
        duration: 0.85,
        stagger: faster ? 0.05 : 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
    },
    { scope: ref, dependencies: [faster, children] }
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export function StaggerItem({ children, className }) {
  return (
    <div className={className} data-stagger-item>
      {children}
    </div>
  )
}
