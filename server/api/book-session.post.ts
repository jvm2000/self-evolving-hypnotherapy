import nodemailer from 'nodemailer'

interface BookSessionForm {
  fullName: string
  email: string
  phone: string
  service: string | null
  date: string | null
  time: string | null
  message: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<BookSessionForm>(event)

  if (
    !body.fullName ||
    !body.email ||
    !body.phone ||
    !body.service ||
    !body.date ||
    !body.time ||
    !body.message
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please complete all required fields.',
    })
  }

  const config = useRuntimeConfig()

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.gmailUser,
      pass: config.gmailAppPassword,
    },
  })

  const serviceName = body.service

  await transporter.sendMail({
    from: `"Booking Form" <${config.gmailUser}>`,
    to: config.bookingEmail,
    replyTo: body.email,

    subject: `New Booking Request - ${body.fullName}`,

    text: `
New Booking Request

Customer Information
--------------------
Full Name: ${body.fullName}
Email: ${body.email}
Phone: ${body.phone}

Booking Information
-------------------
Service: ${serviceName}
Preferred Date: ${body.date}
Start Time: ${body.time}

Message / Notes
---------------
${body.message}
    `.trim(),

    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #83684f;">
          New Booking Request
        </h2>

        <hr>

        <h3>Customer Information</h3>

        <p>
          <strong>Full Name:</strong><br>
          ${body.fullName}
        </p>

        <p>
          <strong>Email:</strong><br>
          ${body.email}
        </p>

        <p>
          <strong>Phone:</strong><br>
          ${body.phone}
        </p>

        <h3>Booking Information</h3>

        <p>
          <strong>Service:</strong><br>
          ${serviceName}
        </p>

        <p>
          <strong>Preferred Date:</strong><br>
          ${body.date}
        </p>

        <p>
          <strong>Start Time:</strong><br>
          ${body.time}
        </p>

        <h3>Message / Notes</h3>

        <p>
          ${body.message.replace(/\n/g, '<br>')}
        </p>

        <hr>

        <p style="font-size: 12px; color: #777;">
          This booking request was submitted through your website.
        </p>
      </div>
    `,
  })

  return {
    success: true,
    message: 'Booking request sent successfully.',
  }
})