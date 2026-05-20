import { Resend } from "resend"

let _resend: Resend | null = null

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY)
  }
  return _resend
}

export async function sendContactEmail(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const resend = getResend()
  await resend.emails.send({
    from: "Portfolio Contact <contact@richardkorankye.dev>",
    to: process.env.CONTACT_EMAIL!,
    subject: `New message: ${data.subject}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #00D4A8;">New contact form submission</h2>
        <p><strong>From:</strong> ${data.name} (${data.email})</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <hr style="border-color: #1C2330;" />
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>
    `,
  })

  await resend.emails.send({
    from: "Richard Korankye <hello@richardkorankye.dev>",
    to: data.email,
    subject: "Got your message — I'll be in touch soon",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #080B10; color: #d9e3f7;">
        <h2 style="color: #00D4A8;">Thanks for reaching out!</h2>
        <p>Hi ${data.name},</p>
        <p>I've received your message and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to check out my work at <a href="${process.env.NEXT_PUBLIC_SITE_URL}" style="color: #00D4A8;">my portfolio</a>.</p>
        <br />
        <p>— Richard Korankye</p>
        <p style="color: #85948d; font-size: 12px;">Senior Full Stack Engineer · Accra, Ghana</p>
      </div>
    `,
  })
}
