import { useEffect, useMemo, useRef, useState } from 'react'
import { Section } from '../components/Section'
import { Button } from '../components/Button'
import { Input, Textarea } from '../components/FormFields'
import { SocialLinks } from '../components/SocialLinks'
import { profile } from '../data/profile'
import { sendContact } from '../lib/contactApi'
import { isEmail } from '../lib/urls'
import { CONTACT_LIMITS, HONEYPOT_FIELD, validateContact } from '../../shared/contactRules.js'

const EMPTY = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [honeypot, setHoneypot] = useState('')
  const [touched, setTouched] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [serverMessage, setServerMessage] = useState('')
  const [status, setStatus] = useState('idle')
  const successRef = useRef(null)

  const local = useMemo(() => validateContact({ ...values, [HONEYPOT_FIELD]: '' }), [values])

  useEffect(() => {
    if (status === 'sent') successRef.current?.focus()
  }, [status])

  function fieldError(key) {
    if (serverErrors[key]) return serverErrors[key]
    if (touched[key]) return local.errors[key]
    return ''
  }

  function update(key, value) {
    setValues((current) => ({ ...current, [key]: value }))
    setServerErrors((current) => ({ ...current, [key]: undefined, form: undefined }))
  }

  async function onSubmit(event) {
    event.preventDefault()
    setTouched({ name: true, email: true, subject: true, message: true })
    const result = validateContact({ ...values, [HONEYPOT_FIELD]: honeypot })
    if (!result.ok) {
      setStatus('error')
      setServerErrors(result.errors)
      setServerMessage(result.errors.form || 'Please check the form and try again.')
      return
    }

    setStatus('sending')
    setServerMessage('')
    setServerErrors({})

    try {
      await sendContact({ ...result.value, [HONEYPOT_FIELD]: honeypot })
      setValues(EMPTY)
      setHoneypot('')
      setTouched({})
      setStatus('sent')
    } catch (error) {
      setStatus('error')
      setServerMessage(error.message || 'The message could not be sent.')
      setServerErrors(error.fields || {})
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Send a message"
      subtitle="Use the form for a role, a project, or a question. It is saved only when the API accepts it."
      className="bg-white/40 dark:bg-white/[0.02]"
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <aside className="panel rounded-[1.6rem] p-6 sm:p-8 lg:col-span-4">
          <h3 className="font-display text-xl font-bold text-ink-950 dark:text-white">Reach me</h3>
          {isEmail(profile.email) && (
            <a
              href={`mailto:${profile.email.trim()}`}
              className="mt-4 block text-sm font-medium break-all text-brand-800 underline-offset-4 hover:underline dark:text-brand-200"
            >
              {profile.email}
            </a>
          )}
          <p className="mt-4 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
            {profile.location ? `${profile.location}. ` : ''}
            I read messages myself.
          </p>
          <SocialLinks className="mt-6" />
        </aside>

        <div className="panel rounded-[1.6rem] p-6 sm:p-8 lg:col-span-8">
          {status === 'sent' ? (
            <div>
              <h3
                ref={successRef}
                tabIndex={-1}
                className="font-display text-2xl font-bold text-ink-950 outline-none dark:text-white"
              >
                Message sent
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-200" role="status">
                Thanks, your message was received. I will reply by email.
              </p>
              <Button className="mt-6" type="button" onClick={() => setStatus('idle')}>
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="relative space-y-4">
              <div className="hp-field" aria-hidden="true">
                <label htmlFor="companyWebsite">Company website</label>
                <input
                  id="companyWebsite"
                  name={HONEYPOT_FIELD}
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="contact-name"
                  name="name"
                  label="Name"
                  value={values.name}
                  maxLength={CONTACT_LIMITS.name.max}
                  autoComplete="name"
                  onBlur={() => setTouched((current) => ({ ...current, name: true }))}
                  onChange={(event) => update('name', event.target.value)}
                  error={fieldError('name')}
                />
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  label="Email"
                  value={values.email}
                  maxLength={CONTACT_LIMITS.email.max}
                  autoComplete="email"
                  onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                  onChange={(event) => update('email', event.target.value)}
                  error={fieldError('email')}
                />
              </div>

              <Input
                id="contact-subject"
                name="subject"
                label="Subject"
                value={values.subject}
                maxLength={CONTACT_LIMITS.subject.max}
                onBlur={() => setTouched((current) => ({ ...current, subject: true }))}
                onChange={(event) => update('subject', event.target.value)}
                error={fieldError('subject')}
              />

              <Textarea
                id="contact-message"
                name="message"
                label="Message"
                value={values.message}
                maxLength={CONTACT_LIMITS.message.max}
                onBlur={() => setTouched((current) => ({ ...current, message: true }))}
                onChange={(event) => update('message', event.target.value)}
                error={fieldError('message')}
              />
              <p className="text-right text-xs text-ink-500 dark:text-ink-300">
                {values.message.length}/{CONTACT_LIMITS.message.max}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button type="submit" size="lg" disabled={status === 'sending'} aria-busy={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </Button>
                <p className="sr-only" aria-live="polite">
                  {status === 'sending' ? 'Sending message' : ''}
                </p>
              </div>

              {status === 'error' && serverMessage && (
                <p role="alert" className="text-sm font-medium text-red-700 dark:text-red-300">
                  {serverMessage}{' '}
                  {isEmail(profile.email) && (
                    <a className="underline underline-offset-4" href={`mailto:${profile.email.trim()}`}>
                      Email {profile.email}
                    </a>
                  )}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </Section>
  )
}
