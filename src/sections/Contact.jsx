import { useMemo, useState } from 'react'
import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { Input, Textarea } from '../components/FormFields'
import { FadeIn, Magnetic, Stagger, StaggerItem } from '../components/Motion'
import { profile } from '../data/profile'

function validate(values) {
  const errors = {}
  if (!values.name || values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!values.email) errors.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Enter a valid email.'
  if (!values.message || values.message.trim().length < 10)
    errors.message = 'Message should be at least 10 characters.'
  return errors
}

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle')

  const errors = useMemo(() => validate(values), [values])
  const show = (k) => touched[k] && errors[k]
  const canSubmit = Object.keys(errors).length === 0 && status !== 'sending'

  async function onSubmit(e) {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    const now = validate(values)
    if (Object.keys(now).length > 0) return

    setStatus('sending')
    await new Promise((r) => setTimeout(r, 700))
    setStatus('sent')
  }

  const socials = [
    { label: 'LinkedIn', href: profile.socials.linkedin },
    { label: 'GitHub', href: profile.socials.github },
    { label: profile.email, href: `mailto:${profile.email}` }
  ]

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s build something"
      subtitle="Send a message — I’ll get back to you soon."
      className="bg-white/45 dark:bg-white/[0.02]"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <FadeIn>
            <h3 className="font-display text-lg font-bold text-ink-950 dark:text-white">Elsewhere</h3>
          </FadeIn>
          <Stagger className="mt-5 space-y-1" faster>
            {socials.map((s) => (
              <StaggerItem key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={s.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  className="group inline-flex items-center gap-2 py-2 text-ink-700 transition hover:text-brand-700 dark:text-ink-200 dark:hover:text-brand-300"
                >
                  <span className="h-px w-4 bg-brand-600 transition-all duration-300 group-hover:w-8 dark:bg-brand-400" />
                  <span className="transition-transform group-hover:translate-x-0.5">{s.label}</span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <FadeIn delay={0.12} className="lg:col-span-8">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Name"
                value={values.name}
                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                error={show('name')}
                placeholder="Your name"
                autoComplete="name"
              />
              <Input
                label="Email"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                error={show('email')}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <Textarea
              label="Message"
              value={values.message}
              onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
              onBlur={() => setTouched((t) => ({ ...t, message: true }))}
              error={show('message')}
              placeholder="Tell me about your project…"
            />

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Magnetic>
                <Button type="submit" size="lg" variant="primary" disabled={!canSubmit}>
                  {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent!' : 'Send message'}
                </Button>
              </Magnetic>
              {status === 'sent' && (
                <span className="text-sm text-ink-600 dark:text-ink-300">
                  Demo form — connect EmailJS / Formspree when ready.
                </span>
              )}
            </div>
          </form>
        </FadeIn>
      </div>
    </Section>
  )
}
