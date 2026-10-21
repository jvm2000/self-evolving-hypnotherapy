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
    !body?.fullName?.trim() ||
    !body?.email?.trim() ||
    !body?.phone?.trim() ||
    !body?.message?.trim()
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please complete all fields.',
    })
  }

  // Fail early if env vars are missing (prevents the silent 127.0.0.1 fallback)
  const missing = ['smtpHost', 'smtpUser', 'smtpPass', 'mailFrom', 'mailTo'].filter(
    (key) => !config[key as keyof typeof config],
  )
  if (missing.length) {
    console.error('Missing runtime config:', missing)
    throw createError({
      statusCode: 500,
      statusMessage: 'Email service is not configured.',
    })
  }

  const port = Number(config.smtpPort) || 587

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port,
    secure: port === 465, // true for 465, false (STARTTLS) for 587
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  try {
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
  } catch (err) {
    console.error('Mail send failed:', err)
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to send email. Please try again later.',
    })
  }

  return {
    success: true,
    message: 'Booking request sent successfully.',
  }
})