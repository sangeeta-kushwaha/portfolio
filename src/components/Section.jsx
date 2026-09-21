import { Container } from './Container'
import { ClipReveal, FadeIn } from './Motion'
import { cn } from '../utils/cn'

export function Section({ id, eyebrow, title, subtitle, children, className }) {
  return (
    <section id={id} className={cn('relative py-20 sm:py-28', className)}>
      <Container>
        {(eyebrow || title || subtitle) && (
          <header className="mb-12 max-w-3xl">
            {eyebrow && (
              <FadeIn>
                <p className="text-sm font-medium tracking-[0.18em] text-brand-700 uppercase dark:text-brand-300">
                  {eyebrow}
                </p>
              </FadeIn>
            )}
            {title && (
              <ClipReveal delay={0.05}>
                <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-ink-950 sm:text-5xl dark:text-white">
                  {title}
                </h2>
              </ClipReveal>
            )}
            {subtitle && (
              <FadeIn delay={0.12}>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg dark:text-ink-200">
                  {subtitle}
                </p>
              </FadeIn>
            )}
          </header>
        )}

        {children}
      </Container>
    </section>
  )
}
