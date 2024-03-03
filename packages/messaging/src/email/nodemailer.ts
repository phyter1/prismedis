import type { TransportOptions } from "nodemailer"
import { createTransport } from "nodemailer"

export const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
}

export const smtpTransporter = createTransport(smtpConfig as TransportOptions)

export interface EmailMessage {
  from: string
  to: string
  subject: string
  html: string
  text: string
}
