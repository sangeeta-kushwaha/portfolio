import mongoose from 'mongoose'

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 80 },
    email: { type: String, required: true, maxlength: 120 },
    subject: { type: String, required: true, maxlength: 120 },
    message: { type: String, required: true, maxlength: 2000 }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

export const ContactMessage =
  mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema)
