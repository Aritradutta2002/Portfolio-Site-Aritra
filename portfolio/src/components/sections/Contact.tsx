'use client'
import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Code2, Target, Zap, Send, CheckCircle2, Copy, Check, ArrowUpRight } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { createMailtoLink, EMAIL_CONFIG, validateFormData, SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/email-config'
import { Container } from '@/components/luxe/Container'
import { SectionHeading } from '@/components/luxe/SectionHeading'
import { Counter } from '@/components/luxe/Counter'
import { GoldButton } from '@/components/luxe/Buttons'

type FormData = { name: string; email: string; subject: string; message: string }

const lines = [
  { icon: Mail, label: 'Email', value: 'aritradutta049@gmail.com', href: 'mailto:aritradutta049@gmail.com', copy: 'aritradutta049@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 62956 99190', href: 'tel:+916295699190' },
  { icon: MapPin, label: 'Location', value: 'Bhubaneswar, India', href: '#' },
]

const socials = [
  { name: 'GitHub', icon: Github, url: 'https://github.com/Aritradutta2002' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/aritra-dutta-rick20/' },
  { name: 'Twitter', icon: Twitter, url: 'https://x.com/Aritra1Sept' },
  { name: 'LeetCode', icon: Code2, url: 'https://leetcode.com/u/ari2002/' },
  { name: 'CSES', icon: Target, url: 'https://cses.fi/user/261539' },
  { name: 'Codeforces', icon: Zap, url: 'https://codeforces.com/profile/aritradutta2001' },
]

function Field({ id, label, error, children, invalid }: {
  id: string; label: string; error?: string; children: React.ReactNode; invalid?: boolean
}) {
  return (
    <div className={`luxe-field ${invalid ? 'invalid' : ''}`}>
      {children}
      <label htmlFor={id}>{label}</label>
      <span className="field-bar" aria-hidden="true" />
      {error ? <p id={`${id}-error`} className="mt-2 text-xs font-semibold text-rosex">{error}</p> : null}
    </div>
  )
}

export function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const { register, formState: { errors }, reset, getValues, setError } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('aritradutta049@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard unavailable */ }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setGeneralError(null)
    setSuccess(null)
    const data = getValues()
    const validation = validateFormData(data)
    if (!validation.isValid) {
      Object.entries(validation.errors).forEach(([k, msg]) => {
        // @ts-expect-error dynamic key
        setError(k, { type: 'manual', message: msg })
      })
      setLoading(false)
      return
    }
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      if (!serviceId || !templateId || !publicKey || !formRef.current) {
        throw new Error('EmailJS not configured')
      }
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      reset()
      setSuccess(SUCCESS_MESSAGES.EMAIL_SENT)
      setTimeout(() => setSuccess(null), 6000)
    } catch (err) {
      console.error('EmailJS send error:', err)
      setGeneralError(ERROR_MESSAGES.SEND_FAILED)
      if (EMAIL_CONFIG.MAILTO_ENABLED) window.open(createMailtoLink(data), '_blank')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title">
      <Container>
        <div id="contact-title">
          <SectionHeading
            index="06"
            eyebrow="Contact"
            titleA="Let's build something"
            titleItalic="precise."
            blurb="Open to roles, collaborations, and interesting problems — I reply within 24 hours."
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-64px' }}
          >
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink">Direct lines</h3>
            <div className="mt-5 divide-y divide-line/8 border-y border-line/8">
              {lines.map((c) => (
                <div key={c.label} className="group flex items-center gap-4 py-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-line/12 text-gold transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-gold-ink">
                    <c.icon size={18} />
                  </span>
                  <a href={c.href} className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{c.label}</span>
                    <span className="block truncate text-[15px] font-bold text-ink">{c.value}</span>
                  </a>
                  {c.copy ? (
                    <button
                      onClick={copyEmail}
                      aria-label="Copy email address"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line/12 text-muted transition-colors hover:border-gold hover:text-gold"
                    >
                      {copied ? <Check size={16} className="text-emeraldx" /> : <Copy size={16} />}
                    </button>
                  ) : (
                    <ArrowUpRight size={17} className="shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" />
                  )}
                </div>
              ))}
            </div>

            <p className="mb-4 mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Elsewhere</p>
            <div className="flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-line/15 text-muted transition-colors hover:border-gold hover:text-gold-ink"
                >
                  <span className="absolute inset-0 scale-0 rounded-full bg-gold transition-transform duration-300 group-hover:scale-100" aria-hidden="true" />
                  <s.icon size={18} className="relative z-10" />
                </a>
              ))}
            </div>

            <div className="luxe-card mt-8 flex items-center gap-5 p-6">
              <span className="flex h-3 w-3 shrink-0">
                <span className="absolute h-3 w-3 animate-ping rounded-full bg-emeraldx opacity-60" />
                <span className="h-3 w-3 rounded-full bg-emeraldx" />
              </span>
              <div className="grid flex-1 grid-cols-2 gap-4">
                <div>
                  <div className="font-display text-2xl font-bold text-ink"><Counter to={24} suffix="h" /></div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Reply time</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-ink"><Counter to={5} suffix="+" /></div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Years coding</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: '-64px' }}
          >
            <div className="luxe-card p-8 md:p-10">
              <div className="mb-8 h-1 w-16 rounded-full bg-gold" aria-hidden="true" />
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink">Send a message</h3>
              <p className="mt-1.5 text-sm text-muted">Tell me about the role, project, or idea.</p>

              <div aria-live="polite" className="mt-6">
                {success && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-2xl border border-emeraldx/40 bg-emeraldx/10 px-4 py-3.5">
                    <CheckCircle2 size={19} className="shrink-0 text-emeraldx" />
                    <p className="text-sm font-semibold text-ink">{success}</p>
                  </motion.div>
                )}
                {generalError && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 rounded-2xl border border-rosex/40 bg-rosex/10 px-4 py-3.5">
                    <Mail size={19} className="shrink-0 text-rosex" />
                    <p className="text-sm font-semibold text-ink">{generalError}</p>
                  </motion.div>
                )}
              </div>

              <form ref={formRef} onSubmit={onSubmit} className="mt-6 space-y-7" noValidate>
                <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
                  <Field id="name" label="Your name *" error={errors.name?.message} invalid={!!errors.name}>
                    <input id="name" type="text" placeholder=" " autoComplete="name"
                      aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined}
                      {...register('name', { required: 'Please tell me your name' })} />
                  </Field>
                  <Field id="email" label="Email address *" error={errors.email?.message} invalid={!!errors.email}>
                    <input id="email" type="email" placeholder=" " autoComplete="email"
                      aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
                      {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'That email looks off' } })} />
                  </Field>
                </div>
                <Field id="subject" label="Subject *" error={errors.subject?.message} invalid={!!errors.subject}>
                  <input id="subject" type="text" placeholder=" " autoComplete="off"
                    aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'subject-error' : undefined}
                    {...register('subject', { required: 'A subject helps me prioritize' })} />
                </Field>
                <Field id="message" label="Message *" error={errors.message?.message} invalid={!!errors.message}>
                  <textarea id="message" rows={5} placeholder=" " maxLength={2000}
                    aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}
                    {...register('message', { required: 'Don\u2019t forget the message', minLength: { value: 10, message: 'A little more detail helps (10+ chars)' } })} />
                </Field>
                <GoldButton type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-gold-ink/30 border-t-gold-ink" aria-hidden="true" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <motion.span className="inline-flex" animate={{ x: [0, 3, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                        <Send size={16} strokeWidth={2.5} />
                      </motion.span>
                    </>
                  )}
                </GoldButton>
                <p className="text-center font-mono text-[11px] text-muted">
                  Prefer email? <a href="mailto:aritradutta049@gmail.com" className="font-bold text-gold luxe-underline">aritradutta049@gmail.com</a>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
