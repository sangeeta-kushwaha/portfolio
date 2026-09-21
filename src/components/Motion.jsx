import { useRef, useState, useEffect } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap'

/** Soft magnetic pull — GSAP quickTo (buttery) */
export function Magnetic({ children, className, strength = 0.35 }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return
      const el = ref.current
      const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
      const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })

      const onMove = (e) => {
        const rect = el.getBoundingClientRect()
        xTo((e.clientX - (rect.left + rect.width / 2)) * strength)
        yTo((e.clientY - (rect.top + rect.height / 2)) * strength)
      }
      const onLeave = () => {
        xTo(0)
        yTo(0)
      }

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  )
}

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

/** Count-up with GSAP */
export function CountUp({ to, className }) {
  const ref = useRef(null)
  const [value, setValue] = useState(prefersReducedMotion() ? to : 0)

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return
      const obj = { n: 0 }
      gsap.to(obj, {
        n: to,
        duration: 1.35,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%',
          toggleActions: 'play none none none'
        },
        onUpdate: () => setValue(Math.round(obj.n))
      })
    },
    { dependencies: [to] }
  )

  useEffect(() => {
    if (prefersReducedMotion()) setValue(to)
  }, [to])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}

/** Keep export name for Hero compatibility — GSAP SplitText used in Hero directly */
export function SplitTextChars({ text, className }) {
  return (
    <span className={className} aria-label={text}>
      {text}
    </span>
  )
}
