'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Github, Linkedin, Code2, Send, CheckCircle, Target, Zap, Twitter, ArrowUpRight } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { createMailtoLink, EMAIL_CONFIG, validateFormData, SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/email-config'
import { SectionHeading } from './SectionHeading'
import { CountUp } from './CountUp'
import { GlassCard } from './GlassCard'
import { RippleButton } from './RippleButton'
import { GlowCard } from './GlowCard'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const contactInfo = [
  { icon: Mail,   label: 'Email',    value: 'aritradutta049@gmail.com', href: 'mailto:aritradutta049@gmail.com' },
  { icon: Phone,  label: 'Phone',    value: '+91 62956 99190',           href: 'tel:+916295699190' },
  { icon: MapPin, label: 'Location', value: 'Bhubaneswar, India',      href: '#' },
]

const socialLinks = [
  { name: 'GitHub',     icon: Github,   url: 'https://github.com/Aritradutta2002' },
  { name: 'LinkedIn',   icon: Linkedin, url: 'https://www.linkedin.com/in/aritra-dutta-rick20/' },
  { name: 'Twitter',    icon: Twitter,  url: 'https://x.com/Aritra1Sept' },
  { name: 'LeetCode',   icon: Code2,    url: 'https://leetcode.com/u/ari2002/' },
  { name: 'CSES',       icon: Target,   url: 'https://cses.fi/user/261539' },
  { name: 'Codeforces', icon: Zap,      url: 'https://codeforces.com/profile/aritradutta2001' },
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

  const inputClass = "w-full px-1 py-3.5 bg-transparent border-b border-aurora/20 text-ink text-[15px] placeholder:text-muted/60 focus:outline-none focus:border-aurora transition-colors duration-300"

  return (
    <section id="contact" className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <SectionHeading
          index="06"
          eyebrow="Contact"
          title="Get In Touch"
          blurb="Always open to discussing new opportunities, interesting projects, or just having a chat about technology."
        />

        <div className="grid lg:grid-cols-12 gap-10">

          {/* ── Left: info ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-64px' }}
            className="lg:col-span-5"
          >
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink mb-2">Let&apos;s Connect</h3>
            <p className="text-[15px] text-muted mb-8 leading-relaxed">
              Whether you&apos;re looking to collaborate, need development help, or just want to connect — I&apos;d love to hear from you!
            </p>

            <div className="border-t border-aurora/10 mb-8">
              {contactInfo.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group flex items-center justify-between gap-4 py-4 border-b border-aurora/10"
                >
                  <span className="flex items-center gap-4">
                    <span className="w-10 h-10 rounded-full border border-aurora/25 flex items-center justify-center text-muted group-hover:text-[#0B0616] group-hover:bg-aurora group-hover:border-aurora transition-colors duration-300 flex-shrink-0">
                      <c.icon size={16} />
                    </span>
                    <span>
                      <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{c.label}</span>
                      <span className="block text-[15px] font-semibold text-ink mt-0.5">{c.value}</span>
                    </span>
                  </span>
                  <ArrowUpRight size={16} className="text-muted group-hover:text-aurorastrong group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
                </a>
              ))}
            </div>

            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted mb-4">Follow me on</h4>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {socialLinks.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  aria-label={s.name}
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -3 }}
                  className="group relative w-11 h-11 rounded-full flex items-center justify-center border border-aurora/25 text-muted hover:text-[#0B0616] transition-colors duration-300 overflow-hidden"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-aurora scale-0 group-hover:scale-100 transition-transform duration-300 ease-out rounded-full"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_22px_rgba(139,92,246,0.55)]"
                  />
                  <s.icon size={17} className="relative z-10 transition-transform duration-300 group-hover:rotate-[8deg]" />
                </motion.a>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card glass-hover p-5">
                <div className="font-display text-3xl font-bold tracking-tight text-gradient"><CountUp to={24} suffix="h" /></div>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mt-1">Response Time</div>
              </div>
              <div className="glass-card glass-hover p-5">
                <div className="font-display text-3xl font-bold tracking-tight text-gradient"><CountUp to={5} suffix="+" /></div>
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted mt-1">Years Coding</div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: form — glass ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-64px' }}
            className="lg:col-span-7 h-fit"
          >
            <GlowCard className="p-8 md:p-10 bg-background/85 backdrop-blur-md border border-aurora/15" intensity={1.2}>
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink mb-8">Send me a message</h3>

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 px-4 py-3.5 rounded-xl border border-aurora/40 bg-aurora/10 flex items-center gap-3"
                >
                  <CheckCircle size={18} className="text-aurorastrong flex-shrink-0" />
                  <p className="text-sm font-semibold text-aurorastrong">{successMessage}</p>
                </motion.div>
              )}

              {formErrors?.general && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 px-4 py-3.5 rounded-xl border border-red-500/40 bg-red-500/10 flex items-center gap-3"
                >
                  <Mail size={18} className="text-red-400 flex-shrink-0" />
                  <p className="text-sm font-semibold text-red-300">{formErrors.general}</p>
                </motion.div>
              )}

              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-7">
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-7">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-1">Name *</label>
                    <input type="text" {...register('name', { required: 'Name is required' })} className={inputClass} placeholder="Your name" />
                    {errors.name && <p className="mt-2 text-xs font-medium text-red-400">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-1">Email *</label>
                    <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} className={inputClass} placeholder="your@email.com" />
                    {errors.email && <p className="mt-2 text-xs font-medium text-red-400">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-1">Subject *</label>
                  <input type="text" {...register('subject', { required: 'Subject is required' })} className={inputClass} placeholder="What's this about?" />
                  {errors.subject && <p className="mt-2 text-xs font-medium text-red-400">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-1">Message *</label>
                  <textarea rows={5} {...register('message', { required: 'Message is required' })} className={`${inputClass} resize-none`} placeholder="Tell me about your project or just say hello!" />
                  {errors.message && <p className="mt-2 text-xs font-medium text-red-400">{errors.message.message}</p>}
                </div>

                <RippleButton
                  type="submit"
                  disabled={isLoading}
                  variant="aurora"
                  className="w-full !px-6 !py-4 text-[15px] btn-press disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  {isLoading ? (
                    <><span className="w-5 h-5 border-2 border-[#0B0616]/30 border-t-[#0B0616] rounded-full animate-spin" />Sending...</>
                  ) : (
                    <>
                      Send message
                      {/* Icon with a subtle bounce — draws the eye */}
                      <motion.span
                        className="inline-flex"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <Send size={17} />
                      </motion.span>
                    </>
                  )}
                </RippleButton>
              </form>
            </GlowCard>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
