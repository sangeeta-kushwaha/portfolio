import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { validateContact } from '../../shared/contactRules.js'

function allowedOrigins(clientUrl) {
  const raw = clientUrl || process.env.CLIENT_URL || 'http://localhost:5173'
  return raw
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function createApp({
  saveContact,
  clientUrl,
  getHealth = () => ({ ok: true, db: 'unknown' }),
  rateLimitMax = 8
} = {}) {
  if (typeof saveContact !== 'function') {
    throw new Error('createApp requires a saveContact function')
  }

  const app = express()
  app.disable('x-powered-by')

  if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1)
  }

  app.use(helmet())
  app.use(express.json({ limit: '32kb' }))

  const allowed = allowedOrigins(clientUrl)
  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowed.includes(origin)) callback(null, true)
        else callback(null, false)
      },
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type']
    })
  )

  app.get('/api/health', (_req, res) => {
    const health = getHealth()
    res.status(health.ok ? 200 : 503).json(health)
  })

  const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: rateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (_req, res) => {
      res.status(429).json({
        ok: false,
        message: 'Too many messages. Please try again later.'
      })
    }
  })

  app.post('/api/contact', contactLimiter, async (req, res) => {
    const result = validateContact(req.body)
    if (!result.ok) {
      return res.status(400).json({
        ok: false,
        message: result.errors.form || 'Please check the form and try again.',
        errors: result.errors
      })
    }

    try {
      await saveContact(result.value)
      return res.status(201).json({
        ok: true,
        message: 'Thanks, your message was received.'
      })
    } catch {
      console.error('Contact save failed')
      return res.status(503).json({
        ok: false,
        message: 'The message could not be saved. Please try again later.'
      })
    }
  })

  app.use((_req, res) => {
    res.status(404).json({ ok: false, message: 'Not found.' })
  })

  app.use((err, _req, res, next) => {
    if (res.headersSent) return next(err)
    if (err?.type === 'entity.parse.failed') {
      return res.status(400).json({ ok: false, message: 'The request could not be read.' })
    }
    if (err?.type === 'entity.too.large' || err?.status === 413) {
      return res.status(413).json({ ok: false, message: 'That message is too large.' })
    }
    console.error('Unexpected API error')
    return res.status(500).json({
      ok: false,
      message: 'Something went wrong. Please try again later.'
    })
  })

  return app
}
