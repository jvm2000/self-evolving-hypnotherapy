// Place at: server/api/send-email.post.ts
// Endpoint: POST /api/send-email
export default defineEventHandler(async (event) => {
  const body = await readBody<{
    fullName?: string
    email?: string
    phone?: string
    message?: string
  }>(event)

  const fullName = body?.fullName?.trim()
  const email = body?.email?.trim()
  const phone = body?.phone?.trim()
  const message = body?.message?.trim()

  if (!fullName || !email || !phone || !message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'fullName, email, phone and message are required'
    })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address' })
  }

  if (!/^[+\d][\d\s\-().]{5,19}$/.test(phone)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid phone number' })
  }

  if (fullName.length > 100 || message.length > 5000) {
    throw createError({ statusCode: 400, statusMessage: 'Input too long' })
  }

  const config = useRuntimeConfig()

  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // Strip characters that could break the header (prevents header injection)
  const safeName = fullName.replace(/["\r\n<>]/g, '')
  const safeEmail = email.replace(/["\r\n<>]/g, '')

  try {
    await sendMail({
      // Display name must NOT contain an email address: Gmail treats a
      // display-name email that differs from the real sender as spoofing
      // and sends it to spam. replyTo handles replies to the visitor.
      from: `"${safeName} via ${config.mailFromName}" <${config.gmailUser}>`,
      to: config.mailTo || config.gmailUser,
      replyTo: email,
      subject: `New message from ${safeName} (${safeEmail})`,
      text: `Full name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
      html: `
        <h3>New message from ${escape(fullName)}</h3>
        <p><strong>Full name:</strong> ${escape(fullName)}</p>
        <p><strong>Email:</strong> ${escape(email)}</p>
        <p><strong>Phone:</strong> ${escape(phone)}</p>
        <p style="white-space:pre-wrap">${escape(message)}</p>
      `
    })

    return { success: true }
  } catch (err) {
    console.error('[send-email] failed:', err)
    throw createError({ statusCode: 500, statusMessage: 'Failed to send email' })
  }
})