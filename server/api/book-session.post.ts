
import nodemailer from 'nodemailer'

interface BookSessionForm {
  fullName: string
  email: string
  phone: string
  message: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<BookSessionForm>(event)
  const config = useRuntimeConfig()

  if (
    !body.fullName?.trim() ||
    !body.email?.trim() ||
    !body.phone?.trim() ||
    !body.message?.trim()
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please complete all fields.',
    })
  }

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: 587,
    secure: false,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  await transporter.sendMail({
    from: config.mailFrom,
    to: config.mailTo,
    replyTo: body.email,
    subject: `New Booking Request from ${body.fullName}`,
    text: [
      `Name: ${body.fullName}`,
      `Email: ${body.email}`,
      `Phone: ${body.phone}`,
      `Message: ${body.message}`,
    ].join('\n'),
  })

  return {
    success: true,
    message: 'Booking request sent successfully.',
  }
})
