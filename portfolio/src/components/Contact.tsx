'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Github, Linkedin, Code2, Send, CheckCircle, Target, Zap, Twitter, Sparkles } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { createMailtoLink, EMAIL_CONFIG, validateFormData, SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/email-config'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const contactInfo = [
  { icon: Mail,   label: 'Email',    value: 'aritradutta049@gmail.com', href: 'mailto:aritradutta049@gmail.com' },
  { icon: Phone,  label: 'Phone',    value: '+91 629569XXXX',           href: '#' },
  { icon: MapPin, label: 'Location', value: 'Bhubaneswar, Odisha',      href: '#' },
]

const socialLinks = [
  { name: 'GitHub',     icon: Github,   url: 'https://github.com/Aritradutta2002',                 hoverBg: 'hover:bg-gray-900 dark:hover:bg-gray-100 hover:text-white dark:hover:text-gray-900' },
  { name: 'LinkedIn',   icon: Linkedin, url: 'https://www.linkedin.com/in/aritra-dutta-rick20/',   hoverBg: 'hover:bg-blue-600 hover:text-white' },
  { name: 'Twitter',    icon: Twitter,  url: 'https://x.com/Aritra1Sept',                          hoverBg: 'hover:bg-sky-500 hover:text-white' },
  { name: 'LeetCode',   icon: Code2,    url: 'https://leetcode.com/u/ari2002/',                    hoverBg: 'hover:bg-orange-500 hover:text-white' },
  { name: 'CSES',       icon: Target,   url: 'https://cses.fi/user/261539',                        hoverBg: 'hover:bg-green-600 hover:text-white' },
  { name: 'Codeforces', icon: Zap,      url: 'https://codeforces.com/profile/aritradutta2001',     hoverBg: 'hover:bg-purple-600 hover:text-white' },
]

export function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const { register, formState: { errors }, reset, getValues, setError } = useForm<FormData>()
  const [isLoading, setIsLoading]       = useState(false)
  const [formErrors, setFormErrors]     = useState<Record<string, string> | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setFormErrors(null)
    setSuccessMessage(null)

    const data = getValues()
    const validation = validateFormData(data)

    if (!validation.isValid) {
      Object.keys(validation.errors).forEach((key) => {
        // @ts-expect-error dynamic key
        setError(key, { type: 'manual', message: validation.errors[key] })
      })
      setFormErrors(validation.errors)
      setIsLoading(false)
      return
    }

    try {
      const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey || !formRef.current) {
        throw new Error('EmailJS not configured or form not found')
      }

      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      reset()
      setSuccessMessage(SUCCESS_MESSAGES.EMAIL_SENT)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (err) {
      console.error('EmailJS send error:', err)
      setFormErrors({ general: ERROR_MESSAGES.SEND_FAILED })
      if (EMAIL_CONFIG.MAILTO_ENABLED) {
        window.open(createMailtoLink(data), '_blank')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 text-gray-900 dark:text-white text-[14px] placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-200"

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200/70 dark:border-blue-500/25 text-blue-700 dark:text-blue-300 text-[13px] font-medium mb-4"
          >
            <Sparkles size={12} />
            Contact
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
          </div>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* ── Left: Contact Info ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-7 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-2">Let&apos;s Connect</h3>
              <p className="text-[13.5px] text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                Whether you&apos;re looking to collaborate, need development help, or just want to connect — I&apos;d love to hear from you!
              </p>

              {/* Contact details */}
              <div className="space-y-3">
                {contactInfo.map((c, i) => (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <c.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400 dark:text-gray-600 font-medium">{c.label}</p>
                      <p className="text-[13.5px] text-gray-800 dark:text-gray-200 font-medium">{c.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-7 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <h4 className="text-[15px] font-bold text-gray-900 dark:text-white mb-4">Follow Me On</h4>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((s, i) => (
                  <motion.a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.93 }}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200/60 dark:border-gray-700/60 transition-all duration-200 ${s.hoverBg}`}
                  >
                    <s.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-7 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">24h</div>
                  <div className="text-[12px] text-gray-500 dark:text-gray-500 mt-0.5">Response Time</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">5+</div>
                  <div className="text-[12px] text-gray-500 dark:text-gray-500 mt-0.5">Years Coding</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Contact Form ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <h3 className="text-[17px] font-bold text-gray-900 dark:text-white mb-6">Send Me a Message</h3>

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-5 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <p className="text-[13.5px] text-emerald-700 dark:text-emerald-300">{successMessage}</p>
              </motion.div>
            )}

            {formErrors?.general && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-5 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3"
              >
                <Mail className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-[13.5px] text-red-700 dark:text-red-300">{formErrors.general}</p>
              </motion.div>
            )}

            <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12.5px] font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Name *</label>
                  <input type="text" {...register('name', { required: 'Name is required' })} className={inputClass} placeholder="Your Name" />
                  {errors.name && <p className="mt-1 text-[11.5px] text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Email *</label>
                  <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className={inputClass} placeholder="your@email.com" />
                  {errors.email && <p className="mt-1 text-[11.5px] text-red-500">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Subject *</label>
                <input type="text" {...register('subject', { required: 'Subject is required' })} className={inputClass} placeholder="What's this about?" />
                {errors.subject && <p className="mt-1 text-[11.5px] text-red-500">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-gray-600 dark:text-gray-400 mb-1.5">Message *</label>
                <textarea rows={6} {...register('message', { required: 'Message is required' })} className={`${inputClass} resize-none`} placeholder="Tell me about your project or just say hello!" />
                {errors.message && <p className="mt-1 text-[11.5px] text-red-500">{errors.message.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold text-[14.5px] shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group relative"
                whileHover={!isLoading ? { scale: 1.02, y: -1 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {isLoading ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending...</>
                ) : (
                  <><Send className="w-4 h-4" />Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
