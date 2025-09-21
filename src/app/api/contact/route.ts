import { NextRequest, NextResponse } from 'next/server'
import { EMAIL_CONFIG, validateEmail } from '@/lib/email-config'

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

    // Create email content
    const emailContent = `
      New Contact Form Submission from Portfolio Website
      
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
      
      ---
      This message was sent from your portfolio contact form.
      Reply directly to: ${email}
    `

    // For now, we'll use a simple approach with mailto
    // In production, you would integrate with an email service like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - Resend
    // - EmailJS
    
    console.log('Contact form submission:', {
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString()
    })

    // You can also save to a database here if needed
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Message received successfully! I will get back to you soon.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
