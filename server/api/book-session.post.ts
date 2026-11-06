import nodemailer from 'nodemailer'

interface BookSessionForm {
  fullName: string
  email: string
  phone: string
  message: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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

  const fullName = body.fullName.trim()
  const email = body.email.trim()

  if (!EMAIL_REGEX.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please enter a valid email address.',
    })
  }

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

  // Website inbox + Outlook inbox
  const recipients = [config.mailTo, config.mailToOutlook]
    .filter(Boolean)
    .map((addr) => String(addr).trim())

  const port = Number(config.smtpPort) || 587

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port,
    secure: port === 465,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  try {
    await transporter.sendMail({
      from: { name: fullName, address: email },
      to: recipients,
      replyTo: { name: fullName, address: email },

      // Must include ALL recipients or some won't receive it
      envelope: {
        from: config.mailFrom,
        to: recipients,
      },

      subject: `New Booking Request from ${fullName}`,
      text: [
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${body.phone.trim()}`,
        `Message: ${body.message.trim()}`,
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