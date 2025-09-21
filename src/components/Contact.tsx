'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Github, Linkedin, Code2, Send, CheckCircle, Target, Zap, Twitter } from 'lucide-react'
import { createMailtoLink } from '@/lib/email-config'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'aritradutta049@gmail.com',
    href: 'mailto:aritradutta049@gmail.com'
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 6295699190',
    href: 'tel:+916295699190'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Bhubaneswar, Odisha',
    href: '#'
  }
]

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/Aritradutta2002',
    color: 'hover:bg-gray-900 hover:text-white',
    bgColor: 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/aritra-dutta-rick20/',
    color: 'hover:bg-blue-600 hover:text-white',
    bgColor: 'from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800'
  },
  {
    name: 'Twitter',
    icon: Twitter,
    url: 'https://x.com/Aritra1Sept',
    color: 'hover:bg-sky-500 hover:text-white',
    bgColor: 'from-sky-100 to-sky-200 dark:from-sky-900 dark:to-sky-800'
  },
  {
    name: 'LeetCode',
    icon: Code2,
    url: 'https://leetcode.com/u/ari2002/',
    color: 'hover:bg-orange-500 hover:text-white',
    bgColor: 'from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800'
  },
  {
    name: 'CSES',
    icon: Target,
    url: 'https://cses.fi/user/261539',
    color: 'hover:bg-green-600 hover:text-white',
    bgColor: 'from-green-100 to-green-200 dark:from-green-900 dark:to-green-800'
  },
  {
    name: 'Codeforces',
    icon: Zap,
    url: 'https://codeforces.com/profile/aritradutta2001',
    color: 'hover:bg-purple-600 hover:text-white',
    bgColor: 'from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800'
  }
]

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (response.ok) {
        setIsSubmitted(true)
        reset()
        
        // Create a mailto link as backup
        const mailtoLink = createMailtoLink(data)
        
        // Open mailto link in a new tab as backup
        window.open(mailtoLink, '_blank')
        
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        setSubmitError(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitError('Failed to send message. Please try again.')
      
      // Fallback to mailto
      const mailtoLink = createMailtoLink(data)
      window.open(mailtoLink, '_blank')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Let&apos;s Connect
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Whether you&apos;re looking to collaborate on a project, need help with development work, 
                or just want to connect with a fellow developer, I&apos;d love to hear from you!
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <contact.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{contact.label}</p>
                      <p className="text-gray-900 dark:text-white font-medium">{contact.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Follow Me On
                </h4>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`relative p-4 bg-gradient-to-r ${social.bgColor} rounded-xl shadow-lg transition-all duration-300 group overflow-hidden hover:shadow-xl`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.name}
                    >
                      <div className={`absolute inset-0 ${social.color.replace('hover:', '')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                      <social.icon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-white transition-colors duration-300 relative z-10" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Quick Stats
                </h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24h</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Response Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">5+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Years Coding</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send Me a Message
            </h3>

            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center"
              >
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                <p className="text-green-700 dark:text-green-300">
                  Message sent successfully! Your email client should open with the message. I&apos;ll get back to you soon.
                </p>
              </motion.div>
            )}

            {submitError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center"
              >
                <Mail className="w-5 h-5 text-red-600 dark:text-red-400 mr-3" />
                <p className="text-red-700 dark:text-red-300">
                  {submitError}
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  {...register('subject', { required: 'Subject is required' })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200"
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  rows={6}
                  {...register('message', { required: 'Message is required' })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project, question, or just say hello!"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
                )}
              </div>

              <motion.button
                type="submit"
                className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Additional Links */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            More Ways to Connect
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Coding Platforms
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'GitHub', url: 'https://github.com/Aritradutta2002', icon: Github, color: 'text-gray-600' },
                  { name: 'LeetCode', url: 'https://leetcode.com/u/ari2002/', icon: Code2, color: 'text-orange-600' },
                  { name: 'CSES', url: 'https://cses.fi/user/261539', icon: Target, color: 'text-green-600' },
                  { name: 'Codeforces', url: 'https://codeforces.com/profile/aritradutta2001', icon: Zap, color: 'text-purple-600' }
                ].map((platform, index) => (
                  <motion.a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 group"
                    whileHover={{ x: 5 }}
                  >
                    <platform.icon className={`w-5 h-5 ${platform.color} group-hover:scale-110 transition-transform duration-200`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                      {platform.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Availability
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Currently open to new opportunities and freelance projects. 
                Feel free to reach out for collaborations!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
