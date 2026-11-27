// Place at: server/utils/mailer.ts
import nodemailer from 'nodemailer'

let transporter: nodemailer.Transporter | null = null

export function getTransporter() {
  if (transporter) return transporter

  const config = useRuntimeConfig()

  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL on port 465
    auth: {
      user: config.gmailUser,
      pass: config.gmailAppPassword
    }
  })

  return transporter
}

export interface MailOptions {
  from: string
  to: string | string[]
  subject: string
  text?: string
  html?: string
  replyTo?: string
}

export async function sendMail(options: MailOptions) {
  return getTransporter().sendMail(options)
}