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

  const inputClass = "w-full px-4 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white text-[14px] placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-300 backdrop-blur-sm shadow-inner"

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
            <div className="glass-galaxy rounded-3xl p-8 lg:p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px] -z-10 group-hover:bg-primary/20 transition-colors duration-500" />
              <h3 className="text-[20px] font-bold text-white mb-2 tracking-tight">Let&apos;s Connect</h3>
              <p className="text-[14px] text-gray-400 mb-8 leading-relaxed font-medium">
                Whether you&apos;re looking to collaborate, need development help, or just want to connect — I&apos;d love to hear from you!
              </p>

              {/* Contact details */}
              <div className="space-y-4">
                {contactInfo.map((c, i) => (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 6 }}
                    className="flex items-center gap-5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300 group/item relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:shadow-neon-purple transition-all duration-300">
                      <c.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[12px] text-gray-500 font-bold uppercase tracking-wider">{c.label}</p>
                      <p className="text-[14.5px] text-gray-200 font-bold mt-0.5 group-hover/item:text-white transition-colors">{c.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="glass-galaxy rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] -z-10 group-hover:bg-secondary/20 transition-colors duration-500" />
              <h4 className="text-[16px] font-bold text-white mb-6 tracking-tight">Follow Me On</h4>
              <div className="flex flex-wrap gap-3">
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
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.93 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shadow-lg text-gray-300 transition-all duration-300 ${s.hoverBg} hover:shadow-neon-cyan`}
                  >
                    <s.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="glass-galaxy rounded-3xl p-8 relative overflow-hidden group">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent glow">24h</div>
                  <div className="text-[12px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Response Time</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent glow">5+</div>
                  <div className="text-[12px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Years Coding</div>
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
            className="glass-galaxy rounded-3xl p-8 lg:p-10 relative overflow-hidden group"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/5 to-secondary/5 rounded-full blur-[100px] -z-10 opacity-50" />
            <h3 className="text-[20px] font-bold text-white mb-8 tracking-tight">Send Me a Message</h3>

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 backdrop-blur-sm"
              >
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <p className="text-[14px] font-bold text-emerald-300">{successMessage}</p>
              </motion.div>
            )}

            {formErrors?.general && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 backdrop-blur-sm"
              >
                <Mail className="w-5 h-5 text-rose-400 flex-shrink-0" />
                <p className="text-[14px] font-bold text-rose-300">{formErrors.general}</p>
              </motion.div>
            )}

            <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-bold text-gray-300 mb-2 pl-1">Name *</label>
                  <input type="text" {...register('name', { required: 'Name is required' })} className={inputClass} placeholder="Your Name" />
                  {errors.name && <p className="mt-1.5 pl-1 text-[12px] font-medium text-rose-400">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-gray-300 mb-2 pl-1">Email *</label>
                  <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className={inputClass} placeholder="your@email.com" />
                  {errors.email && <p className="mt-1.5 pl-1 text-[12px] font-medium text-rose-400">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-300 mb-2 pl-1">Subject *</label>
                <input type="text" {...register('subject', { required: 'Subject is required' })} className={inputClass} placeholder="What's this about?" />
                {errors.subject && <p className="mt-1.5 pl-1 text-[12px] font-medium text-rose-400">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-[13px] font-bold text-gray-300 mb-2 pl-1">Message *</label>
                <textarea rows={6} {...register('message', { required: 'Message is required' })} className={`${inputClass} resize-none`} placeholder="Tell me about your project or just say hello!" />
                {errors.message && <p className="mt-1.5 pl-1 text-[12px] font-medium text-rose-400">{errors.message.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-2xl font-bold text-[15px] shadow-lg shadow-primary/25 hover:shadow-neon-purple transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group relative mt-4"
                whileHover={!isLoading ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {isLoading ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending...</>
                ) : (
                  <><Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
