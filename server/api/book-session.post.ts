import nodemailer from 'nodemailer'

interface BookSessionForm {
  fullName: string
  email: string
  phone: string
  message: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<BookSessionForm>(event)

  // Validate required fields
  if (
    !body?.fullName?.trim() ||
    !body?.email?.trim() ||
    !body?.phone?.trim() ||
    !body?.message?.trim()
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please complete all required fields.',
    })
  }

  // Basic email validation
  const email = body.email.trim()

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Please provide a valid email address.',
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

  // Escape user input before inserting it into HTML
  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (char) => {
      const entities: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      }

      return entities[char]
    })

  const fullName = body.fullName.trim()
  const phone = body.phone.trim()
  const message = body.message.trim()

  try {
    await transporter.sendMail({
      // Must use the authenticated Gmail account
      from: `"Self Evolving Hypnotherapy Booking" <${config.gmailUser}>`,

      // Send the booking request to this address
      to: 'info@selfevolvinghypnotherapy.com',

      // Replies will go directly to the customer
      replyTo: email,

      subject: `New Booking Request - ${fullName}`,

      text: `
New Booking Request

Customer Information
--------------------
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}

Message / Notes
---------------
${message}

--------------------
Submitted through the Self Evolving Hypnotherapy website.
      `.trim(),

      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #333; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #83684f; padding: 24px; color: #ffffff;">
            <h2 style="margin: 0;">
              New Booking Request
            </h2>
            <p style="margin: 8px 0 0;">
              Self Evolving Hypnotherapy
            </p>
          </div>

          <div style="padding: 24px; border: 1px solid #e5e0da;">
            <h3 style="color: #83684f;">Customer Information</h3>

            <p>
              <strong>Full Name:</strong><br>
              ${escapeHtml(fullName)}
            </p>

            <p>
              <strong>Email:</strong><br>
              ${escapeHtml(email)}
            </p>

            <p>
              <strong>Phone:</strong><br>
              ${escapeHtml(phone)}
            </p>

            <h3 style="color: #83684f;">Message / Notes</h3>

            <div style="background-color: #faf8f5; padding: 16px; border-radius: 6px; white-space: pre-wrap; overflow-wrap: anywhere;">${escapeHtml(message)}</div>

            <hr style="border: 0; border-top: 1px solid #e5e0da; margin: 24px 0;">

            <p style="font-size: 12px; color: #777;">
              This booking request was submitted through the Self Evolving Hypnotherapy website.
            </p>
          </div>
        </div>
      `,
    })

    return {
      success: true,
      message: 'Booking request sent successfully.',
    }
  } catch (error) {
    console.error('Failed to send booking request:', error)

    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to send your booking request. Please try again later.',
    })
  }
})