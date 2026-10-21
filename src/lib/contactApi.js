import { HONEYPOT_FIELD } from '../../shared/contactRules.js'

export class ContactRequestError extends Error {
  constructor(message, { fields = {}, status = 0 } = {}) {
    super(message)
    this.name = 'ContactRequestError'
    this.fields = fields
    this.status = status
  }
}

function endpoint() {
  const base = String(import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  return `${base}/api/contact`
}

export async function sendContact(payload) {
  let response
  try {
    response = await fetch(endpoint(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        [HONEYPOT_FIELD]: payload[HONEYPOT_FIELD] || ''
      }),
      signal: AbortSignal.timeout(15000)
    })
  } catch {
    throw new ContactRequestError(
      'The contact service is unavailable right now. Please try again later.',
      { status: 0 }
    )
  }

  let data
  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok || !data?.ok) {
    const unavailable = response.status === 0 || response.status === 404 || response.status >= 500
    throw new ContactRequestError(
      data?.message ||
        (unavailable
          ? 'The contact service is unavailable right now. Please try again later.'
          : 'The message could not be sent.'),
      { fields: data?.errors || {}, status: response.status }
    )
  }

  return data
}
