import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import test from 'node:test'
import { validateContact } from '../../shared/contactRules.js'
import { createApp } from '../src/app.js'

const validBody = {
  name: 'Ada Lovelace',
  email: 'Ada@Example.com',
  subject: 'Frontend role',
  message: 'I would like to talk about a frontend role.',
  companyWebsite: ''
}

function createTestApp({ saveContact, rateLimitMax = 20, getHealth } = {}) {
  const saved = []
  const app = createApp({
    rateLimitMax,
    clientUrl: 'http://localhost:5173',
    getHealth,
    saveContact:
      saveContact ||
      (async (data) => {
        saved.push(data)
      })
  })
  return { app, saved }
}

async function withServer(app, run) {
  const server = createServer(app)
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  const { port } = server.address()
  try {
    await run(`http://127.0.0.1:${port}`)
  } finally {
    await new Promise((resolve) => server.close(resolve))
  }
}

async function postContact(baseUrl, body, headers = {}) {
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...headers },
    body: JSON.stringify(body)
  })
  const data = await response.json()
  return { status: response.status, data, headers: response.headers }
}

test('validateContact rejects a short name and keeps a valid message', () => {
  const invalid = validateContact({ ...validBody, name: 'A' })
  assert.equal(invalid.ok, false)
  assert.match(invalid.errors.name, /at least 2/)

  const valid = validateContact(validBody)
  assert.equal(valid.ok, true)
  assert.equal(valid.value.email, 'ada@example.com')
  assert.equal(valid.value.name, 'Ada Lovelace')
})

test('validateContact strips markup and rejects the honeypot', () => {
  const cleaned = validateContact({
    ...validBody,
    name: '  <b>Ada</b>  ',
    message: 'Hello <script>alert(1)</script> there friend'
  })
  assert.equal(cleaned.ok, true)
  assert.equal(cleaned.value.name, 'Ada')
  assert.equal(cleaned.value.message.includes('<'), false)

  const spam = validateContact({ ...validBody, companyWebsite: 'https://spam.test' })
  assert.equal(spam.ok, false)
  assert.equal(spam.honeypot, true)
  assert.equal(spam.value, null)
})

test('POST /api/contact stores a valid message', async () => {
  const { app, saved } = createTestApp()
  await withServer(app, async (baseUrl) => {
    const { status, data } = await postContact(baseUrl, {
      ...validBody,
      name: '<i>Ada Lovelace</i>',
      extra: 'ignore me'
    })
    assert.equal(status, 201)
    assert.equal(data.ok, true)
    assert.equal(saved.length, 1)
    assert.deepEqual(saved[0], {
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      subject: 'Frontend role',
      message: 'I would like to talk about a frontend role.'
    })
  })
})

test('POST /api/contact returns 400 and does not store invalid input', async () => {
  const { app, saved } = createTestApp()
  await withServer(app, async (baseUrl) => {
    const missing = await postContact(baseUrl, { ...validBody, subject: ' ', email: 'not-an-email' })
    assert.equal(missing.status, 400)
    assert.equal(missing.data.ok, false)
    assert.ok(missing.data.errors.email)
    assert.ok(missing.data.errors.subject)

    const short = await postContact(baseUrl, { ...validBody, message: 'too short' })
    assert.equal(short.status, 400)
    assert.ok(short.data.errors.message)

    const spam = await postContact(baseUrl, { ...validBody, companyWebsite: 'bot' })
    assert.equal(spam.status, 400)
    assert.equal(saved.length, 0)
  })
})

test('POST /api/contact returns 503 when saving fails', async () => {
  const { app } = createTestApp({
    saveContact: async () => {
      throw new Error('database down: secret message should not leak')
    }
  })
  await withServer(app, async (baseUrl) => {
    const { status, data } = await postContact(baseUrl, validBody)
    assert.equal(status, 503)
    assert.equal(data.ok, false)
    assert.equal(JSON.stringify(data).includes('secret message'), false)
  })
})

test('POST /api/contact rate limits repeated requests', async () => {
  const { app, saved } = createTestApp({ rateLimitMax: 2 })
  await withServer(app, async (baseUrl) => {
    const first = await postContact(baseUrl, validBody)
    const second = await postContact(baseUrl, validBody)
    const third = await postContact(baseUrl, validBody)
    assert.equal(first.status, 201)
    assert.equal(second.status, 201)
    assert.equal(third.status, 429)
    assert.match(third.data.message, /Too many messages/)
    assert.equal(saved.length, 2)
  })
})

test('GET /api/health and unknown routes', async () => {
  const healthy = createTestApp({ getHealth: () => ({ ok: true, db: 'connected' }) })
  await withServer(healthy.app, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`, {
      headers: { Origin: 'http://localhost:5173' }
    })
    const data = await response.json()
    assert.equal(response.status, 200)
    assert.equal(data.db, 'connected')
    assert.equal(response.headers.get('access-control-allow-origin'), 'http://localhost:5173')

    const blocked = await fetch(`${baseUrl}/api/health`, {
      headers: { Origin: 'https://evil.example' }
    })
    assert.notEqual(blocked.headers.get('access-control-allow-origin'), 'https://evil.example')

    const missing = await fetch(`${baseUrl}/api/missing`)
    assert.equal(missing.status, 404)
  })

  const down = createTestApp({ getHealth: () => ({ ok: false, db: 'disconnected' }) })
  await withServer(down.app, async (baseUrl) => {
    const response = await fetch(`${baseUrl}/api/health`)
    assert.equal(response.status, 503)
  })
})
