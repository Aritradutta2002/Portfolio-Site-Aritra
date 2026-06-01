'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, type UseFormRegister } from 'react-hook-form'
import {
  Mail, Phone, MapPin, Github, Linkedin, Code2, Send, CheckCircle, Target, Zap, Twitter, ArrowRight,
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Button } from '@/components/ui/Button'
import { EASE } from '@/lib/motion'
import { createMailtoLink, EMAIL_CONFIG, validateFormData, SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/email-config'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const contactInfo = [
  { icon: Mail,   label: 'Email',    value: 'aritradutta049@gmail.com', href: 'mailto:aritradutta049@gmail.com', tone: 'primary' as const },
  { icon: Phone,  label: 'Phone',    value: '+91 629569XXXX',           href: '#',                                tone: 'emerald' as const },
  { icon: MapPin, label: 'Location', value: 'Bhubaneswar, Odisha',      href: '#',                                tone: 'sky'     as const },
]

const socialLinks = [
  { name: 'GitHub',     icon: Github,   url: 'https://github.com/Aritradutta2002',                tone: 'neutral' as const, hoverTone: 'hover:!text-fg-0' },
  { name: 'LinkedIn',   icon: Linkedin, url: 'https://www.linkedin.com/in/aritra-dutta-rick20/',  tone: 'sky'     as const, hoverTone: '' },
  { name: 'Twitter',    icon: Twitter,  url: 'https://x.com/Aritra1Sept',                         tone: 'sky'     as const, hoverTone: '' },
  { name: 'LeetCode',   icon: Code2,    url: 'https://leetcode.com/u/ari2002/',                   tone: 'amber'   as const, hoverTone: '' },
  { name: 'CSES',       icon: Target,   url: 'https://cses.fi/user/261539',                       tone: 'emerald' as const, hoverTone: '' },
  { name: 'Codeforces', icon: Zap,      url: 'https://codeforces.com/profile/aritradutta2001',    tone: 'primary' as const, hoverTone: '' },
]

function FloatingField({
  label, name, type = 'text', register, error, multiline,
}: {
  label: string
  name: keyof FormData
  type?: string
  register: UseFormRegister<FormData>
  error?: string
  multiline?: boolean
}) {
  return (
    <div className="relative">
      {multiline ? (
        <textarea
          {...register(name, { required: `${label} is required` })}
          rows={5}
          placeholder=" "
          className="peer w-full px-4 pt-6 pb-2 rounded-md border border-line bg-bg-1/60 text-fg-0 text-[14px] placeholder-transparent focus:outline-none focus:border-primary focus:bg-bg-1 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
        />
      ) : (
        <input
          type={type}
          {...register(name, { required: `${label} is required` })}
          placeholder=" "
          className="peer w-full px-4 pt-6 pb-2 rounded-md border border-line bg-bg-1/60 text-fg-0 text-[14px] placeholder-transparent focus:outline-none focus:border-primary focus:bg-bg-1 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
        />
      )}
      <label className="absolute left-4 top-2 text-[11px] font-bold uppercase tracking-wider text-fg-3 peer-focus:text-primary peer-focus:top-2 transition-all duration-200 pointer-events-none">
        {label}
      </label>
      {error && <p className="mt-1.5 pl-1 text-[12px] font-medium text-rose">{error}</p>}
    </div>
  )
}

export function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const { register, formState: { errors }, reset, getValues, setError } = useForm<FormData>()
  const [isLoading, setIsLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string> | null>(null)
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

  return (
    <section id="contact" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="06 — Contact"
          eyebrow="Get in touch"
          title={<>Let&apos;s build something <span className="gradient-text">great</span> together</>}
          description="Open to discussing new opportunities, interesting projects, or just chatting about technology."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* ── Left: Contact info ──────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE.outExpo }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-2 space-y-5"
          >
            <GlassCard glow="primary" className="p-7">
              <h3 className="text-[17px] font-bold text-fg-0 mb-2 tracking-tight">Let&apos;s connect</h3>
              <p className="text-[14px] text-fg-3 mb-6 leading-relaxed">
                Whether you&apos;re looking to collaborate, need dev help, or just want to say hi &mdash; I&apos;d love to hear from you.
              </p>

              <div className="space-y-3">
                {contactInfo.map((c) => (
                  <motion.a
                    key={c.label}
                    href={c.href}
                    whileHover={{ x: 4 }}
                    data-cursor="hover"
                    className="flex items-center gap-4 p-3 rounded-md bg-bg-2/50 border border-line-soft hover:border-primary/40 hover:bg-bg-2 transition-all duration-300 group"
                  >
                    <div className={[
                      'w-10 h-10 rounded-md flex items-center justify-center flex-shrink-0',
                      c.tone === 'primary' ? 'bg-gradient-to-br from-primary to-secondary shadow-neon-primary' :
                      c.tone === 'emerald' ? 'bg-gradient-to-br from-emerald to-sky shadow-neon-emerald' :
                                              'bg-gradient-to-br from-sky to-primary shadow-[0_0_16px_hsl(var(--accent-sky)/0.5)]',
                      'group-hover:scale-110 transition-transform',
                    ].join(' ')}>
                      <c.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[10.5px] text-fg-4 font-bold uppercase tracking-wider">{c.label}</p>
                      <p className="text-[14px] text-fg-1 font-semibold mt-0.5 group-hover:text-primary transition-colors">
                        {c.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-7">
              <h4 className="text-[15px] font-bold text-fg-0 mb-5 tracking-tight">Follow me on</h4>
              <div className="flex flex-wrap gap-2.5">
                {socialLinks.map((s, i) => (
                  <motion.a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.05, ease: EASE.outExpo }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    data-cursor="hover"
                    className="w-11 h-11 rounded-md glass flex items-center justify-center text-fg-3 hover:border-primary/40 hover:text-primary hover:shadow-neon-primary transition-all duration-300"
                  >
                    <s.icon className="w-4.5 h-4.5" />
                  </motion.a>
                ))}
              </div>
            </GlassCard>

            {/* Quick stats */}
            <GlassCard className="p-5">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-md bg-bg-2/50 border border-line-soft">
                  <div className="text-2xl font-extrabold gradient-text-static">24h</div>
                  <div className="text-[10.5px] font-bold text-fg-3 mt-1 uppercase tracking-wider">Response time</div>
                </div>
                <div className="p-3 rounded-md bg-bg-2/50 border border-line-soft">
                  <div className="text-2xl font-extrabold text-emerald">5+</div>
                  <div className="text-[10.5px] font-bold text-fg-3 mt-1 uppercase tracking-wider">Years coding</div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* ── Right: Form ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE.outExpo, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3"
          >
            <GlassCard glow="primary" gradientBorder className="p-7 sm:p-8 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-primary/5 to-secondary/5 rounded-full blur-[100px] -z-10 opacity-50" />

              <h3 className="text-[17px] font-bold text-fg-0 mb-6 tracking-tight">Send me a message</h3>

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-5 p-4 bg-emerald/10 border border-emerald/30 rounded-md flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-emerald flex-shrink-0" />
                  <p className="text-[14px] font-semibold text-emerald">{successMessage}</p>
                </motion.div>
              )}

              {formErrors?.general && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-5 p-4 bg-rose/10 border border-rose/30 rounded-md flex items-center gap-3"
                >
                  <Mail className="w-5 h-5 text-rose flex-shrink-0" />
                  <p className="text-[14px] font-semibold text-rose">{formErrors.general}</p>
                </motion.div>
              )}

              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FloatingField label="Name" name="name" register={register} error={errors.name?.message} />
                  <FloatingField
                    label="Email"
                    name="email"
                    type="email"
                    register={register}
                    error={errors.email?.message}
                  />
                </div>

                <FloatingField label="Subject" name="subject" register={register} error={errors.subject?.message} />
                <FloatingField label="Message" name="message" register={register} error={errors.message?.message} multiline />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={isLoading}
                  iconRight={!isLoading ? <ArrowRight size={16} /> : undefined}
                  icon={!isLoading ? <Send size={15} /> : undefined}
                  className="mt-2"
                >
                  {isLoading ? 'Sending' : 'Send message'}
                </Button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
