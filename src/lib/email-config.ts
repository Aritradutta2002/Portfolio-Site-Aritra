// Email configuration
export const EMAIL_CONFIG = {
  // Your email address where you want to receive messages
  TO_EMAIL: 'aritradutta049@gmail.com',
  
  // EmailJS configuration (optional - requires EmailJS setup)
  EMAILJS: {
    SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_default',
    TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_default',
    PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key',
  },
  
  // Backup mailto configuration
  MAILTO_ENABLED: true,
  
  // Form validation rules
  VALIDATION: {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
    SUBJECT_MIN_LENGTH: 5,
    SUBJECT_MAX_LENGTH: 100,
    MESSAGE_MIN_LENGTH: 10,
    MESSAGE_MAX_LENGTH: 1000,
  }
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

// Form validation function
export function validateFormData(data: {
  name: string
  email: string
  subject: string
  message: string
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {}
  const { name, email, subject, message } = data
  const { VALIDATION } = EMAIL_CONFIG

  // Name validation
  if (!name.trim()) {
    errors.name = 'Name is required'
  } else if (name.trim().length < VALIDATION.NAME_MIN_LENGTH) {
    errors.name = `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`
  } else if (name.trim().length > VALIDATION.NAME_MAX_LENGTH) {
    errors.name = `Name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`
  }

  // Email validation
  if (!email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email address'
  }

  // Subject validation
  if (!subject.trim()) {
    errors.subject = 'Subject is required'
  } else if (subject.trim().length < VALIDATION.SUBJECT_MIN_LENGTH) {
    errors.subject = `Subject must be at least ${VALIDATION.SUBJECT_MIN_LENGTH} characters`
  } else if (subject.trim().length > VALIDATION.SUBJECT_MAX_LENGTH) {
    errors.subject = `Subject must be less than ${VALIDATION.SUBJECT_MAX_LENGTH} characters`
  }

  // Message validation
  if (!message.trim()) {
    errors.message = 'Message is required'
  } else if (message.trim().length < VALIDATION.MESSAGE_MIN_LENGTH) {
    errors.message = `Message must be at least ${VALIDATION.MESSAGE_MIN_LENGTH} characters`
  } else if (message.trim().length > VALIDATION.MESSAGE_MAX_LENGTH) {
    errors.message = `Message must be less than ${VALIDATION.MESSAGE_MAX_LENGTH} characters`
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Success messages
export const SUCCESS_MESSAGES = {
  EMAIL_SENT: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!',
  MAILTO_OPENED: 'Your email client should open now. Please send the message to complete the contact.',
}

// Error messages
export const ERROR_MESSAGES = {
  SEND_FAILED: 'Sorry, there was an error sending your message. Please try again or contact me directly.',
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  VALIDATION_ERROR: 'Please fix the errors below and try again.',
}
