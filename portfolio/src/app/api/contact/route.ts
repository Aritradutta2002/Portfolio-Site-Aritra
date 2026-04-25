import { NextRequest, NextResponse } from 'next/server'
import { validateEmail, EMAIL_CONFIG } from '@/lib/email-config'

const SENDGRID_API_URL = 'https://api.sendgrid.com/v3/mail/send'

async function sendEmailWithSendGrid({ name, email, subject, message }: { name: string; email: string; subject: string; message: string }) {
  const apiKey = process.env.SENDGRID_API_KEY
  const fromEmail = process.env.SENDGRID_FROM_EMAIL

  if (!apiKey || !fromEmail) {
    throw new Error('SendGrid not configured. Missing SENDGRID_API_KEY or SENDGRID_FROM_EMAIL')
  }

  const body = {
    personalizations: [
      {
        to: [
          {
            email: EMAIL_CONFIG.TO_EMAIL
          }
        ],
        subject: `Portfolio Contact: ${subject}`
      }
    ],
    from: {
      email: fromEmail,
      name: 'Portfolio Website'
    },
    reply_to: {
      email,
      name
    },
    content: [
      {
        type: 'text/plain',
        value: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
      }
    ]
  }

  const res = await fetch(SENDGRID_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`SendGrid error: ${res.status} ${text}`)
  }

  return true
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // For now, we'll use a simple approach with mailto
  // Try to send via SendGrid if configured. If not configured, we keep relying on the
  // client-side mailto fallback. To enable SendGrid, set the following env vars:
  // - SENDGRID_API_KEY
  // - SENDGRID_FROM_EMAIL (a verified sender)
  // Otherwise the route will return a 500 and the client will fall back to opening
  // the user's mail client.
    
    console.log('Contact form submission:', { name, email, subject, message, timestamp: new Date().toISOString() })

    // Attempt to send via SendGrid if env is configured
    try {
      await sendEmailWithSendGrid({ name, email, subject, message })

      return NextResponse.json(
        {
          success: true,
          message: 'Message sent successfully via SendGrid.'
        },
        { status: 200 }
      )
    } catch (sendError) {
      console.error('SendGrid send error:', sendError)

      // Return an error so the client can fallback to mailto
      return NextResponse.json(
        { error: 'Email provider not configured or sending failed. Mailto fallback will be used.' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
