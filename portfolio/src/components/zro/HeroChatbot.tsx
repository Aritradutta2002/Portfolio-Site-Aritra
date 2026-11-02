'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  type CSSProperties,
} from "react";
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
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
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
    id: "me",
    label: "Experience",
    hint: "TCS",
    icon: Briefcase,
    accent: "#d4af37", // Warm champagne gold
    query: "Tell me about your experience at TCS, enterprise Java modernization, and Azure migrations.",
  },
  {
    id: "projects",
    label: "Projects",
    hint: "AlgoGuru",
    icon: Sparkles,
    accent: "#2dd4bf", // Teal
    query: "What are your top projects, especially AlgoGuru, and what full-stack and AI architecture did you build?",
  },
  {
    id: "skills",
    label: "Stack",
    hint: "Java 21",
    icon: Layers,
    accent: "#a78bfa", // Violet
    query: "What is your core tech stack across Java 21, Spring Boot, cloud platforms, and modern frontend?",
  },
  {
    id: "dsa",
    label: "LeetCode",
    hint: "700+",
    icon: Zap,
    accent: "#f59e0b", // Amber
    query: "Tell me about your competitive programming achievements, LeetCode contest rating, and DSA practice.",
  },
  {
    id: "contact",
    label: "Contact",
    hint: "Hire Me",
    icon: Send,
    accent: "#38bdf8", // Sky blue
    query: "How can I contact Aritra, download his resume, or schedule an interview?",
  },
];

const ROTATING_PROMPTS = [
  "Ask about Aritra's 20× API optimization at TCS…",
  "Ask about his Java 21 & Azure cloud microservices…",
  "Ask about AlgoGuru, his live full-stack AI platform…",
  "Ask about his 700+ LeetCode DSA problem-solving track…",
  "Ask how to get in touch or schedule an interview…",
];

const CONTEXT_FOLLOWUPS: { match: RegExp; pills: string[] }[] = [
  {
    match: /experience|tcs|work|role/i,
    pills: [
      "How did you achieve the 20× API speedup?",
      "Tell me about the AlgoGuru flagship project",
      "Download Résumé PDF",
    ],
  },
  {
    match: /project|algoguru|rag|ai/i,
    pills: [
      "How does the AlgoGuru RAG AI Tutor work?",
      "What is your enterprise experience at TCS?",
      "Visit algoguru.online",
    ],
  },
  {
    match: /skill|stack|tech|java/i,
    pills: [
      "Tell me about your Java 21 & Azure projects",
      "What is your LeetCode contest rating?",
      "How can we get in touch?",
    ],
  },
  {
    match: /leetcode|dsa|contest|problem/i,
    pills: [
      "Tell me about your TCS role",
      "What is your core tech stack?",
      "How to contact Aritra",
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
    "Tell me about TCS experience",
    "What are your flagship projects?",
    "How to get in touch?",
  ];
}

const MAX_HISTORY = 10;

/* ─── safe markdown rendering ───────────────────────────────────────────── */

function safeHref(href: string): string | undefined {
  return /^(https?:|mailto:|tel:|\/|#)/i.test(href.trim()) ? href : undefined;
}

function toPlainText(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*`]/g, "")
    .trim();
}

function FormattedMessage({ text }: { text: string }) {
  const lines = text.split("\n");

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
        const href = safeHref(match[3]);
        parts.push(
          href ? (
            <a
              key={match.index}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="font-medium text-amber-400 underline decoration-amber-400/50 underline-offset-2 transition-colors hover:decoration-amber-300"
            >
              {match[2]}
            </a>
          ) : (
            match[2]
          )
        );
      } else if (match[4]) {
        parts.push(
          <strong key={match.index} className="font-semibold text-zro-ink">
            {match[4]}
          </strong>
        );
      } else if (match[5]) {
        parts.push(
          <code
            key={match.index}
            className="rounded border border-amber-500/20 bg-amber-500/10 px-1 py-0.5 font-mono text-[0.8em] text-amber-300"
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
    <div className="space-y-2 text-[0.875rem] leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={i} className="h-1.5" />;
        }
        if (trimmed === "---") {
          return <hr key={i} className="my-2.5 border-zro-line" />;
        }
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={i} className="flex items-start gap-2.5 pl-1">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80 shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
              <span>{renderInline(trimmed.substring(2))}</span>
            </div>
          );
        }
        if (/^\d+\.\s/.test(trimmed)) {
          const numMatch = trimmed.match(/^(\d+)\.\s(.*)$/);
          if (numMatch) {
            return (
              <div key={i} className="flex items-start gap-2.5 pl-1">
                <span className="font-mono text-[0.8rem] font-semibold text-amber-400">
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

/* ─── message bubble ────────────────────────────────────────────────────── */

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
  const isUser = message.role === "user";

  return (
    <div
      className="zro-ask-row"
      data-role={message.role}
      role="listitem"
    >
      <span className="zro-ask-avatar" data-role={message.role} aria-hidden="true">
        {isUser ? (
          <User className="h-3.5 w-3.5" />
        ) : (
          <Sparkles className="h-3.5 w-3.5" />
        )}
      </span>
      <div className="zro-ask-bubble" data-role={message.role}>
        {isUser ? (
          <p className="text-[0.875rem] leading-relaxed text-zro-ink">
            {message.content}
          </p>
        ) : (
          <>
            <FormattedMessage text={message.content} />
            {message.isStreaming && <span className="zro-ask-caret" aria-hidden="true" />}

            {!message.isStreaming && message.content && (
              <div className="zro-ask-msg-footer">
                <span className="font-mono text-[0.625rem] uppercase tracking-wider text-zro-faint">
                  Verified Fact Grounded
                </span>
                {onCopy && (
                  <button
                    type="button"
                    onClick={() => onCopy(message.content)}
                    className="zro-ask-action-btn"
                    title="Copy response to clipboard"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
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
              <div className="zro-ask-followups" role="group" aria-label="Suggested follow-up questions">
                {followups.map((pill, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onFollowup?.(pill)}
                    className="zro-ask-followup-pill"
                  >
                    <Sparkles className="h-2.5 w-2.5 text-amber-400" />
                    <span>{pill}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── main component ────────────────────────────────────────────────────── */

export function HeroChatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [remainingQueries, setRemainingQueries] = useState<number | null>(null);

  // Synchronize daily quota from localStorage on client mount
  useEffect(() => {
    try {
      const today = new Date().toISOString().slice(0, 10);
      const stored = localStorage.getItem("zro_chat_quota");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.date === today && typeof parsed.remaining === "number") {
          setRemainingQueries(parsed.remaining);
          return;
        }
      }
      setRemainingQueries(10);
    } catch {
      setRemainingQueries(10);
    }
  }, []);

  // Rotating placeholder state
  const [promptIndex, setPromptIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const threadRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<number>(0);
  const messagesRef = useRef<Message[]>([]);

  messagesRef.current = messages;

  useEffect(() => () => window.clearInterval(typewriterRef.current), []);

  const hasConversation = messages.length > 0;

  // Rotate prompt index every 4s when idle
  useEffect(() => {
    if (hasConversation || input.trim()) return;

    const interval = window.setInterval(() => {
      setIsFading(true);
      window.setTimeout(() => {
        setPromptIndex((prev) => (prev + 1) % ROTATING_PROMPTS.length);
        setIsFading(false);
      }, 200);
    }, 3800);

    return () => window.clearInterval(interval);
  }, [hasConversation, input]);

  // Auto-scroll the thread to the newest content.
  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const streamAssistantReply = useCallback((reply: string, id: string) => {
    window.clearInterval(typewriterRef.current);
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
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
  }, []);

  const handleQuery = useCallback(
    async (queryText: string) => {
      const textToSend = queryText.trim();
      if (!textToSend || loading) return;

      // Handle direct document shortcuts
      if (textToSend.toLowerCase().includes("download résumé") || textToSend.toLowerCase().includes("resume pdf")) {
        window.open("/resume.pdf", "_blank");
        return;
      }
      if (textToSend.toLowerCase().includes("visit algoguru")) {
        window.open("https://www.algoguru.online/", "_blank");
        return;
      }

      if (remainingQueries === 0) {
        const quotaMsg: Message = {
          id: `quota-${Date.now()}`,
          role: "assistant",
          content:
            "You've reached your daily limit of 10 questions! 🎯\n\n" +
            "- Browse his enterprise experience and live projects below.\n" +
            "- Grab his verified [Résumé PDF](/resume.pdf).\n" +
            "- Reach out directly at [aritradutta049@gmail.com](mailto:aritradutta049@gmail.com).\n\n" +
            "⚡ Daily quota resets at midnight UTC.",
        };
        setMessages((prev) => [...prev, quotaMsg]);
        return;
      }

      window.clearInterval(typewriterRef.current);
      setInput("");
      setLoading(true);

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: textToSend,
      };

      // Build the history we send: prior turns + this new user message.
      const history = [...messagesRef.current, userMsg]
        .slice(-MAX_HISTORY)
        .map((m) => ({ role: m.role, content: m.content }));

      setMessages((prev) => [...prev, userMsg]);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();

        if (typeof data.remaining === "number") {
          setRemainingQueries(data.remaining);
          try {
            const today = new Date().toISOString().slice(0, 10);
            localStorage.setItem("zro_chat_quota", JSON.stringify({ date: today, remaining: data.remaining }));
          } catch {}
        }

        const rawReply: string =
          data.reply ||
          "I'm sorry, I couldn't process that. Try asking about Aritra's experience, projects, or skills.";

        const assistantId = `assistant-${Date.now()}`;
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "", isStreaming: true },
        ]);
        setLoading(false);
        streamAssistantReply(rawReply, assistantId);
      } catch (err) {
        console.error("Chat error:", err);
        setLoading(false);
        const errorCopy =
          "I hit a momentary connection hiccup. You can still explore Aritra's work in the sections below or grab his [Résumé PDF](/resume.pdf).";
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: "assistant",
            content: errorCopy,
          },
        ]);
        setAnnouncement(toPlainText(errorCopy));
      }
    },
    [loading, remainingQueries, streamAssistantReply]
  );

  const handleClear = useCallback(() => {
    window.clearInterval(typewriterRef.current);
    setMessages([]);
    setAnnouncement("");
    setLoading(false);
  }, []);

  const handleCopy = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(toPlainText(text));
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 2000);
  }, []);

  // Last user query for generating followups
  const lastUserQuery = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const followups = getFollowups(lastUserQuery);

  // First user turn becomes the visible thread topic for follow-ups.
  const contextTopic = messages.find((m) => m.role === "user")?.content ?? "";

  return (
    <div className="zro-ask relative mx-auto w-full max-w-4xl">
      {/* Topline status row */}
      <div className="zro-ask-topline">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)] shrink-0" />
          <span className="zro-eyebrow flex items-center gap-2 font-semibold tracking-[0.14em] text-zro-ink text-[0.7rem]">
            ASK MY RÉSUMÉ
          </span>
          <span className="hidden sm:inline-flex items-center rounded-full border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 font-mono text-[0.6rem] font-medium uppercase tracking-wider text-amber-400">
            AI Companion
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[0.6rem] font-medium transition-colors ${
              remainingQueries === 0
                ? "border border-red-500/30 bg-red-500/10 text-red-400"
                : remainingQueries !== null && remainingQueries <= 3
                ? "border border-amber-500/30 bg-amber-500/10 text-amber-300"
                : "border border-emerald-500/25 bg-emerald-500/10 text-emerald-400"
            }`}
            title="Daily questions quota (resets at midnight UTC)"
          >
            <span className="h-1 w-1 rounded-full bg-current" />
            <span>{remainingQueries !== null ? `${remainingQueries}/10 Daily` : "10/10 Daily"}</span>
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="zro-ask-live zro-metric flex items-center gap-1.5 font-mono text-[0.625rem] text-zro-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="hidden sm:inline">GROUNDED IN</span> VERIFIED FACTS
          </span>
          {hasConversation && (
            <button
              type="button"
              onClick={handleClear}
              className="zro-ask-clear-mini inline-flex items-center gap-1 px-2 py-1 text-[0.6875rem] font-mono text-zro-muted hover:text-red-400 transition-colors"
              title="Reset conversation"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Conversation thread */}
      {hasConversation && (
        <div
          ref={threadRef}
          className="zro-ask-thread"
          role="list"
          aria-label="Conversation with Aritra's AI assistant"
        >
          {messages.map((m, idx) => {
            const isLastAssistant =
              m.role === "assistant" &&
              idx === messages.map((msg) => msg.role).lastIndexOf("assistant");

            return (
              <MessageBubble
                key={m.id}
                message={m}
                onCopy={m.role === "assistant" ? (txt) => handleCopy(m.id, txt) : undefined}
                isCopied={copiedId === m.id}
                onFollowup={handleQuery}
                followups={followups}
                isLastAssistant={isLastAssistant}
              />
            );
          })}

          {loading && (
            <div className="zro-ask-row" data-role="assistant" aria-hidden="true">
              <span className="zro-ask-avatar" data-role="assistant">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              <div className="zro-ask-bubble" data-role="assistant">
                <div className="flex items-center gap-1.5 py-0.5">
                  <span className="zro-ask-dot" />
                  <span className="zro-ask-dot [animation-delay:-0.15s]" />
                  <span className="zro-ask-dot [animation-delay:-0.3s]" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Thread topic — anchors the follow-up exchange */}
      {hasConversation && contextTopic && (
        <p className="zro-ask-context">
          <span className="zro-ask-context-label">Topic</span>
          <span className="zro-ask-context-text">{contextTopic}</span>
        </p>
      )}

      {/* Input bar — floating obsidian glass console with champagne specular rim */}
      <div className="zro-ask-shell">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuery(input);
          }}
          className="zro-ask-bar"
        >
          <span aria-hidden="true" className="zro-ask-prompt">
            <Sparkles className="h-4 w-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={remainingQueries === 0}
            placeholder={
              remainingQueries === 0
                ? "Daily 10-query limit reached · View resume or sections below"
                : hasConversation
                ? "Ask a follow-up question…"
                : ROTATING_PROMPTS[promptIndex]
            }
            aria-label="Ask a question about Aritra"
            autoComplete="off"
            className={`zro-ask-input ${isFading ? "is-fading" : ""}`}
          />
          <kbd aria-hidden="true" className="zro-ask-kbd">
            Enter ↵
          </kbd>
          <button
            type="submit"
            disabled={loading || !input.trim() || remainingQueries === 0}
            aria-label="Send question"
            className="zro-ask-submit"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </button>
        </form>
      </div>

      {/* Smart Query Pills */}
      <div className="zro-ask-chips-wrap">
        <div className="zro-ask-chips" role="group" aria-label="Suggested questions">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleQuery(cat.query)}
                disabled={loading}
                style={
                  { "--ask-accent": cat.accent, "--i": i } as CSSProperties
                }
                className="zro-ask-chip group"
              >
                <span
                  className="zro-ask-chip-icon-box"
                  style={{ color: cat.accent }}
                >
                  <Icon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110" aria-hidden="true" />
                </span>
                <span className="zro-ask-chip-text flex items-center gap-1.5 whitespace-nowrap">
                  <span className="zro-ask-chip-label font-semibold text-zro-ink">{cat.label}</span>
                  <span className="text-zro-faint/40 select-none">·</span>
                  <span className="zro-ask-chip-hint font-mono text-zro-faint text-[0.6875rem]">{cat.hint}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Persistent live region for screen-reader announcements */}
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-busy={loading}
        className="sr-only"
      >
        {announcement}
      </p>
    </div>
  );
}
