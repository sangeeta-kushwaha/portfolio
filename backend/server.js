import 'dotenv/config'
import mongoose from 'mongoose'
import { createApp } from './src/app.js'
import { ContactMessage } from './src/models/ContactMessage.js'

const uri = process.env.MONGO_URI

if (!uri) {
  console.error('MONGO_URI is not set. Copy backend/.env.example to backend/.env.')
  process.exit(1)
}

try {
  await mongoose.connect(uri)
} catch {
  console.error('MongoDB connection failed')
  process.exit(1)
}

const port = Number(process.env.PORT) || 8080

const app = createApp({
  clientUrl: process.env.CLIENT_URL,
  getHealth: () => {
    const connected = mongoose.connection.readyState === 1
    return {
      ok: connected,
      db: connected ? 'connected' : 'disconnected'
    }
  },
  saveContact: (data) => ContactMessage.create(data)
})

const server = app.listen(port, () => {
  console.log(`API listening on port ${port}`)
})

async function shutdown() {
  server.close(async () => {
    await mongoose.disconnect()
    process.exit(0)
  })
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
