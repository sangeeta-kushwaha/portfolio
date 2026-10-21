export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 120 },
  subject: { min: 2, max: 120 },
  message: { min: 10, max: 2000 }
}

export const HONEYPOT_FIELD = 'companyWebsite'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value, keepNewlines = false) {
  const text = String(value ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/[<>]/g, '')

  let result = ''
  for (const char of text) {
    const code = char.charCodeAt(0)
    const isControl = code < 32 || code === 127
    if (keepNewlines && char === '\n') {
      result += '\n'
      continue
    }
    if (char === '\r' || isControl) {
      if (!keepNewlines) result += ' '
      continue
    }
    result += char
  }

  if (keepNewlines) {
    return result
      .replace(/[^\S\n]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }

  return result.replace(/\s+/g, ' ').trim()
}

export function validateContact(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return {
      ok: false,
      errors: { form: 'Please check the form and try again.' },
      value: null
    }
  }

  if (clean(body[HONEYPOT_FIELD])) {
    return {
      ok: false,
      honeypot: true,
      errors: { form: 'The form could not be submitted.' },
      value: null
    }
  }

  const name = clean(body.name)
  const email = clean(body.email).toLowerCase()
  const subject = clean(body.subject)
  const message = clean(body.message, true)
  const errors = {}

  if (name.length < CONTACT_LIMITS.name.min) {
    errors.name = `Name should be at least ${CONTACT_LIMITS.name.min} characters.`
  } else if (name.length > CONTACT_LIMITS.name.max) {
    errors.name = `Name should be ${CONTACT_LIMITS.name.max} characters or fewer.`
  }

  if (!email) errors.email = 'Enter an email address.'
  else if (email.length > CONTACT_LIMITS.email.max || !EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (subject.length < CONTACT_LIMITS.subject.min) {
    errors.subject = `Subject should be at least ${CONTACT_LIMITS.subject.min} characters.`
  } else if (subject.length > CONTACT_LIMITS.subject.max) {
    errors.subject = `Subject should be ${CONTACT_LIMITS.subject.max} characters or fewer.`
  }

  if (message.length < CONTACT_LIMITS.message.min) {
    errors.message = `Message should be at least ${CONTACT_LIMITS.message.min} characters.`
  } else if (message.length > CONTACT_LIMITS.message.max) {
    errors.message = `Message should be ${CONTACT_LIMITS.message.max} characters or fewer.`
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors, value: null }

  return {
    ok: true,
    errors: {},
    value: { name, email, subject, message }
  }
}
