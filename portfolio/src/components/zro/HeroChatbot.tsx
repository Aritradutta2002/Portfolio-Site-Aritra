'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Briefcase,
  Layers,
  Zap,
  Sparkles,
  Send,
  ArrowUp,
  Check,
  Copy,
  RotateCcw,
  User,
  X,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

interface CategoryCard {
  id: string;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  query: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: 'me',
    label: 'Experience',
    hint: 'TCS',
    icon: Briefcase,
    accent: '#d4af37',
    query: 'Tell me about your experience at TCS, enterprise Java modernization, and Azure migrations.',
  },
  {
    id: 'projects',
    label: 'Projects',
    hint: 'AlgoGuru',
    icon: Sparkles,
    accent: '#2dd4bf',
    query: 'What are your top projects, especially AlgoGuru, and what full-stack and AI architecture did you build?',
  },
  {
    id: 'skills',
    label: 'Stack',
    hint: 'Java 21',
    icon: Layers,
    accent: '#a78bfa',
    query: 'What is your core tech stack across Java 21, Spring Boot, cloud platforms, and modern frontend?',
  },
  {
    id: 'dsa',
    label: 'LeetCode',
    hint: '700+',
    icon: Zap,
    accent: '#f59e0b',
    query: 'Tell me about your competitive programming achievements, LeetCode contest rating, and DSA practice.',
  },
  {
    id: 'contact',
    label: 'Contact',
    hint: 'Hire Me',
    icon: Send,
    accent: '#38bdf8',
    query: 'How can I contact Aritra, download his resume, or schedule an interview?',
  },
];

const ROTATING_PROMPTS = [
  "Ask about Aritra's 20× API optimization at TCS…",
  'Ask about his Java 21 & Azure cloud microservices…',
  'Ask about AlgoGuru, his live full-stack AI platform…',
  'Ask about his 700+ LeetCode DSA problem-solving track…',
  'Ask how to get in touch or schedule an interview…',
];

const CONTEXT_FOLLOWUPS: { match: RegExp; pills: string[] }[] = [
  {
    match: /experience|tcs|work|role/i,
    pills: [
      'How did you achieve the 20× API speedup?',
      'Tell me about the AlgoGuru flagship project',
      'Download Résumé PDF',
    ],
  },
  {
    match: /project|algoguru|rag|ai/i,
    pills: [
      'Tell me about the AlgoGuru RAG architecture',
      'TCS enterprise Java achievements',
      'How to contact Aritra',
    ],
  },
];

function getFollowups(lastUserQuery: string): string[] {
  for (const item of CONTEXT_FOLLOWUPS) {
    if (item.match.test(lastUserQuery)) {
      return item.pills;
    }
  }
  return [
    'Tell me about TCS experience',
    'What are your flagship projects?',
    'How to get in touch?',
  ];
}

const MAX_HISTORY = 10;

function toPlainText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*`]/g, '')
    .trim();
}

function FormattedMessage({ text }: { text: string }) {
  const lines = text.split('\n');

  const renderInline = (str: string) => {
    const parts: React.ReactNode[] = [];
    let lastIdx = 0;
    const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
    let match;

    while ((match = tokenRegex.exec(str)) !== null) {
      if (match.index > lastIdx) {
        parts.push(str.substring(lastIdx, match.index));
      }

      if (match[2] && match[3]) {
        parts.push(
          <a
            key={match.index}
            href={match[3]}
            target={match[3].startsWith('http') ? '_blank' : undefined}
            rel={match[3].startsWith('http') ? 'noopener noreferrer' : undefined}
            className="text-violet-500 dark:text-violet-400 underline underline-offset-2 hover:opacity-80 transition-opacity"
          >
            {match[2]}
          </a>
        );
      } else if (match[4]) {
        parts.push(
          <strong key={match.index} className="font-semibold text-neutral-900 dark:text-neutral-100">
            {match[4]}
          </strong>
        );
      } else if (match[5]) {
        parts.push(
          <code
            key={match.index}
            className="rounded bg-black/[0.06] dark:bg-white/[0.08] px-1 py-0.5 font-mono text-[0.8em] text-pink-500 dark:text-pink-400"
          >
            {match[5]}
          </code>
        );
      }

      lastIdx = tokenRegex.lastIndex;
    }

    if (lastIdx < str.length) {
      parts.push(str.substring(lastIdx));
    }

    return parts;
  };

  return (
    <div className="space-y-2 text-[0.875rem] leading-relaxed text-neutral-800 dark:text-neutral-200">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={i} className="h-1.5" />;
        }
        if (trimmed === '---') {
          return <hr key={i} className="my-2 border-black/[0.08] dark:border-white/[0.08]" />;
        }
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          return (
            <div key={i} className="flex items-start gap-2 pl-1">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
              <span>{renderInline(trimmed.substring(2))}</span>
            </div>
          );
        }
        if (/^\d+\.\s/.test(trimmed)) {
          const numMatch = trimmed.match(/^(\d+)\.\s(.*)$/);
          if (numMatch) {
            return (
              <div key={i} className="flex items-start gap-2 pl-1">
                <span className="font-mono text-[0.8rem] font-semibold text-violet-400">
                  {numMatch[1]}.
                </span>
                <span>{renderInline(numMatch[2])}</span>
              </div>
            );
          }
        }
        return <p key={i}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

function MessageBubble({
  message,
  onCopy,
  isCopied,
  onFollowup,
  followups,
  isLastAssistant,
}: {
  message: Message;
  onCopy?: (text: string) => void;
  isCopied?: boolean;
  onFollowup?: (q: string) => void;
  followups?: string[];
  isLastAssistant?: boolean;
}) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn('flex items-start gap-3 text-left w-full', isUser ? 'justify-end' : 'justify-start')}
      role="listitem"
    >
      {!isUser && (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-violet-500 dark:text-violet-400 mt-0.5">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
      )}

      <div
        className={cn(
          'max-w-[85%] rounded-2xl p-3.5 sm:p-4 text-[13.5px] leading-relaxed',
          isUser
            ? 'bg-violet-600 text-white rounded-tr-sm'
            : 'bg-black/[0.04] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200 rounded-tl-sm'
        )}
      >
        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <>
            <FormattedMessage text={message.content} />
            {message.isStreaming && (
              <span className="inline-block h-3.5 w-1 bg-violet-500 animate-pulse ml-1 align-middle" aria-hidden="true" />
            )}

            {!message.isStreaming && message.content && (
              <div className="mt-3 flex items-center justify-between border-t border-black/[0.06] dark:border-white/[0.06] pt-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                  Verified Fact Grounded
                </span>
                {onCopy && (
                  <button
                    type="button"
                    onClick={() => onCopy(message.content)}
                    className="flex items-center gap-1 text-[11px] font-mono text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {!message.isStreaming && isLastAssistant && followups && followups.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Suggested follow-up questions">
                {followups.map((pill, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onFollowup?.(pill)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-black/[0.03] dark:bg-white/[0.04] hover:bg-violet-500/10 hover:text-violet-500 border border-black/[0.06] dark:border-white/[0.06] text-neutral-600 dark:text-neutral-300 transition-colors"
                  >
                    <Sparkles className="h-2.5 w-2.5 text-violet-400" />
                    <span>{pill}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {isUser && (
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/[0.05] dark:bg-white/[0.1] text-neutral-700 dark:text-neutral-300 mt-0.5">
          <User className="h-3.5 w-3.5" />
        </span>
      )}
    </div>
  );
}

export function HeroChatbot() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [remainingQueries, setRemainingQueries] = useState<number | null>(null);
  const [promptIndex, setPromptIndex] = useState(0);

  const shouldReduceMotion = useReducedMotion();
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<number>(0);
  const messagesRef = useRef<Message[]>([]);

  messagesRef.current = messages;

  // Sync remaining queries from localStorage on mount
  useEffect(() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const stored = localStorage.getItem('zro_chat_quota');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.date === today && typeof parsed.remaining === 'number') {
          setRemainingQueries(parsed.remaining);
          return;
        }
      }
      setRemainingQueries(10);
    } catch {
      setRemainingQueries(10);
    }
  }, []);

  // Cycle rotating prompts when idle
  useEffect(() => {
    if (messages.length > 0 || input.trim() || !isExpanded) return;

    const interval = window.setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % ROTATING_PROMPTS.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [messages.length, input, isExpanded]);

  // Handle Escape key to collapse pill
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  // Auto-scroll the answer thread
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const streamAssistantReply = useCallback(
    (reply: string, id: string) => {
      window.clearInterval(typewriterRef.current);
      if (shouldReduceMotion) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, content: reply, isStreaming: false } : m
          )
        );
        setAnnouncement(toPlainText(reply));
        return;
      }

      let currentLen = 0;
      const step = Math.max(4, Math.ceil(reply.length / 40));
      typewriterRef.current = window.setInterval(() => {
        currentLen += step;
        const done = currentLen >= reply.length;
        const slice = done ? reply : reply.substring(0, currentLen);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, content: slice, isStreaming: !done } : m
          )
        );
        if (done) {
          window.clearInterval(typewriterRef.current);
          setAnnouncement(toPlainText(reply));
        }
      }, 16);
    },
    [shouldReduceMotion]
  );

  const handleQuery = useCallback(
    async (queryText: string) => {
      const textToSend = queryText.trim();
      if (!textToSend || loading) return;

      if (!isExpanded) {
        setIsExpanded(true);
      }

      // Handle direct document shortcuts
      if (
        textToSend.toLowerCase().includes('download résumé') ||
        textToSend.toLowerCase().includes('resume pdf')
      ) {
        window.open('/resume.pdf', '_blank');
        return;
      }
      if (textToSend.toLowerCase().includes('visit algoguru')) {
        window.open('https://www.algoguru.online/', '_blank');
        return;
      }

      if (remainingQueries === 0) {
        const quotaMsg: Message = {
          id: `quota-${Date.now()}`,
          role: 'assistant',
          content:
            "You've reached your daily limit of 10 questions! 🎯\n\n" +
            '- Browse his enterprise experience and live projects below.\n' +
            '- Grab his verified [Résumé PDF](/resume.pdf).\n' +
            '- Reach out directly at [aritradutta049@gmail.com](mailto:aritradutta049@gmail.com).\n\n' +
            '⚡ Daily quota resets at 00:00 UTC.',
        };
        setMessages((prev) => [...prev, quotaMsg]);
        return;
      }

      window.clearInterval(typewriterRef.current);
      setInput('');
      setLoading(true);

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: textToSend,
      };

      const history = [...messagesRef.current, userMsg]
        .slice(-MAX_HISTORY)
        .map((m) => ({ role: m.role, content: m.content }));

      setMessages((prev) => [...prev, userMsg]);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history }),
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();

        if (typeof data.remaining === 'number') {
          setRemainingQueries(data.remaining);
          try {
            const today = new Date().toISOString().slice(0, 10);
            localStorage.setItem(
              'zro_chat_quota',
              JSON.stringify({ date: today, remaining: data.remaining })
            );
          } catch {}
        }

        const rawReply: string =
          data.reply ||
          "I'm sorry, I couldn't process that. Try asking about Aritra's experience, projects, or skills.";

        const assistantId = `assistant-${Date.now()}`;
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: 'assistant', content: '', isStreaming: true },
        ]);
        setLoading(false);
        streamAssistantReply(rawReply, assistantId);
      } catch (err) {
        console.error('Chat error:', err);
        setLoading(false);
        const errorCopy =
          'I hit a momentary connection hiccup. You can still explore Aritra’s work in the sections below or grab his [Résumé PDF](/resume.pdf).';
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: errorCopy,
          },
        ]);
        setAnnouncement(toPlainText(errorCopy));
      }
    },
    [loading, remainingQueries, streamAssistantReply, isExpanded]
  );

  const handleClear = useCallback(() => {
    window.clearInterval(typewriterRef.current);
    setMessages([]);
    setAnnouncement('');
    setLoading(false);
  }, []);

  const handleCopy = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(toPlainText(text));
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const lastUserQuery =
    [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';
  const followups = getFollowups(lastUserQuery);

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-2xl flex flex-col items-center">
      <AnimatePresence mode="wait">
        {!isExpanded && messages.length === 0 ? (
          /* ── Collapsed Dynamic Island Pill ── */
          <motion.button
            key="collapsed-pill"
            type="button"
            layoutId="ai-resume-pill"
            onClick={() => {
              setIsExpanded(true);
              setTimeout(() => inputRef.current?.focus(), 50);
            }}
            className="group relative flex min-h-[46px] items-center gap-3 rounded-full border border-black/[0.1] dark:border-white/[0.12] bg-white/90 dark:bg-[#111116]/90 px-4 py-2 shadow-lg backdrop-blur-md transition-all hover:scale-[1.02] hover:border-violet-500/50"
            aria-expanded="false"
            aria-label="Expand AI Résumé Assistant"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-violet-500 dark:text-violet-400">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
            </span>

            <span className="font-sans text-[13.5px] font-semibold text-neutral-800 dark:text-neutral-200">
              Ask my résumé
            </span>

            <span className="hidden sm:inline text-neutral-400 font-mono text-xs">·</span>
            <span className="hidden sm:inline font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
              AI Companion
            </span>

            <span
              className={cn(
                'ml-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[11px] font-medium',
                remainingQueries === 0
                  ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                  : 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20'
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              <span>{remainingQueries !== null ? `${remainingQueries}/10` : '10/10'}</span>
            </span>
          </motion.button>
        ) : (
          /* ── Expanded Dynamic Island Card ── */
          <motion.div
            key="expanded-card"
            layoutId="ai-resume-pill"
            className="w-full rounded-2xl border border-black/[0.1] dark:border-white/[0.12] bg-white/95 dark:bg-[#0c0d12]/95 backdrop-blur-xl shadow-2xl overflow-hidden p-4 sm:p-5 transition-all"
          >
            {/* Header / Topline Status */}
            <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/15 text-violet-500">
                  <Sparkles className="h-3 w-3" />
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                  Ask My Résumé
                </span>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ml-1',
                    remainingQueries === 0
                      ? 'bg-red-500/10 text-red-400'
                      : 'bg-emerald-500/10 text-emerald-400'
                  )}
                >
                  <span className="h-1 w-1 rounded-full bg-current" />
                  <span>{remainingQueries !== null ? `${remainingQueries}/10 Daily` : '10/10 Daily'}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex items-center gap-1 font-mono text-[11px] text-neutral-400 hover:text-red-400 transition-colors px-2 py-1"
                    title="Reset conversation"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  aria-label="Collapse AI Résumé Assistant"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Conversation Thread (Max 320px with data-lenis-prevent) */}
            {messages.length > 0 && (
              <div
                ref={threadRef}
                data-lenis-prevent
                className="max-h-[320px] overflow-y-auto space-y-3.5 pr-1.5 mb-3.5"
                role="list"
                aria-label="AI Résumé conversation"
              >
                {messages.map((m, idx) => {
                  const isLastAssistant =
                    m.role === 'assistant' &&
                    idx === messages.map((msg) => msg.role).lastIndexOf('assistant');

                  return (
                    <MessageBubble
                      key={m.id}
                      message={m}
                      onCopy={m.role === 'assistant' ? (txt) => handleCopy(m.id, txt) : undefined}
                      isCopied={copiedId === m.id}
                      onFollowup={handleQuery}
                      followups={followups}
                      isLastAssistant={isLastAssistant}
                    />
                  );
                })}

                {loading && (
                  <div className="flex items-center gap-2 text-left pl-1">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/10 text-violet-400">
                      <Sparkles className="h-3 w-3" />
                    </span>
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.05]">
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse [animation-delay:300ms]" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Limit Reached Banner */}
            {remainingQueries === 0 && (
              <div className="mb-3 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-500 dark:text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Daily question quota reached (10/10)</p>
                  <p className="mt-0.5 text-neutral-500 dark:text-neutral-400">
                    Quota resets at 00:00 UTC. You can download the verified résumé PDF or email directly below.
                  </p>
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleQuery(input);
              }}
              className="relative flex items-center rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1.5 focus-within:border-violet-500 transition-colors"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={remainingQueries === 0}
                placeholder={
                  remainingQueries === 0
                    ? 'Limit reached · View résumé or explore sections below'
                    : ROTATING_PROMPTS[promptIndex]
                }
                aria-label="Ask a question about Aritra"
                autoComplete="off"
                className="w-full bg-transparent text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none py-1.5 pr-16"
              />

              <div className="absolute right-2 flex items-center gap-1.5">
                <span className="hidden sm:inline font-mono text-[10px] text-neutral-400 select-none">
                  Enter ↵
                </span>
                <button
                  type="submit"
                  disabled={loading || !input.trim() || remainingQueries === 0}
                  aria-label="Send question"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors"
                >
                  <ArrowUp className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Quick Prompt Category Chips */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5" role="group" aria-label="Suggested questions">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleQuery(cat.query)}
                    disabled={loading || remainingQueries === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02] hover:bg-violet-500/10 hover:border-violet-500/30 text-neutral-700 dark:text-neutral-300 transition-all disabled:opacity-40"
                  >
                    <Icon className="h-3 w-3 text-violet-500" aria-hidden="true" />
                    <span>{cat.label}</span>
                    <span className="text-neutral-400 font-mono text-[10px]">· {cat.hint}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen-reader Live Region */}
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </p>
    </div>
  );
}

export default HeroChatbot;
