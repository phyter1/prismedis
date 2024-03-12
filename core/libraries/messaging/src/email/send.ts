import type { EmailMessage } from "./nodemailer"
import { smtpTransporter } from "./nodemailer"

export const sendMail = (message: EmailMessage) => {
  return smtpTransporter.sendMail(message)
}
