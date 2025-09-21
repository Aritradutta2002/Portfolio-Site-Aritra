// Email configuration
export const EMAIL_CONFIG = {
  // Your email address where you want to receive messages
  TO_EMAIL: 'aritradutta049@gmail.com',
  
  // EmailJS configuration (optional - requires EmailJS setup)
  EMAILJS: {
    SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
    TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
    PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
  },
  
  // Backup mailto configuration
  MAILTO_ENABLED: true,
}

// Helper function to create mailto link
export function createMailtoLink(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  const { name, email, subject, message } = data
  
  const mailtoSubject = `Portfolio Contact: ${subject}`
  const mailtoBody = `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent from your portfolio website contact form.
Please reply directly to: ${email}
  `.trim()

  return `mailto:${EMAIL_CONFIG.TO_EMAIL}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(mailtoBody)}`
}

// Helper function to validate email
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}
