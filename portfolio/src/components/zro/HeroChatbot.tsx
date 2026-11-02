'use client';

import React, { useState, useRef, useEffect, useTransition, type CSSProperties } from "react";
import {
  Smile,
  Briefcase,
  Layers,
  PartyPopper,
  Contact,
  ArrowRight,
  X,
  RotateCcw,
  Sparkles,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  category?: string;
  isStreaming?: boolean;
}

interface CategoryCard {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  query: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: "me",
    label: "Me",
    icon: Smile,
    accent: "#2dd4bf",
    query: "Tell me about yourself, your background, and your role",
  },
  {
    id: "projects",
    label: "Projects",
    icon: Briefcase,
    accent: "#34d399",
    query: "What are your top projects and what did you build?",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Layers,
    accent: "#a78bfa",
    query: "What is your core tech stack, languages, and frameworks?",
  },
  {
    id: "fun",
    label: "Fun",
    icon: PartyPopper,
    accent: "#f472b6",
    query: "What do you like to do for fun, hobbies, and outside of work?",
  },
  {
    id: "contact",
    label: "Contact",
    icon: Contact,
    accent: "#fbbf24",
    query: "How can I contact or hire you?",
  },
];

/**
 * Lightweight safe markdown renderer for bold, links, code, and lists.
 */
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
              className="font-medium text-zro-ink underline decoration-zro-accent/50 underline-offset-2 transition-colors hover:decoration-zro-accent"
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
            className="border border-zro-line bg-zro-surface px-1 py-0.5 font-mono text-[0.8em] text-zro-ink"
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
    <div className="space-y-2 text-[0.875rem] leading-relaxed text-zro-muted">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={i} className="h-1" />;
        }
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={i} className="flex items-start gap-2 pl-1">
              <span className="mt-2 h-1 w-1.5 shrink-0 bg-zro-accent" />
              <span>{renderInline(trimmed.substring(2))}</span>
            </div>
          );
        }
        if (/^\d+\.\s/.test(trimmed)) {
          const numMatch = trimmed.match(/^(\d+)\.\s(.*)$/);
          if (numMatch) {
            return (
              <div key={i} className="flex items-start gap-2 pl-1">
                <span className="font-mono text-[0.8rem] font-semibold text-zro-accent">
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

export function HeroChatbot() {
  const [input, setInput] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentResponse, setCurrentResponse] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const answerCardRef = useRef<HTMLDivElement>(null);
  const typewriterRef = useRef<number>(0);
  const [, startTransition] = useTransition();

  useEffect(() => () => window.clearInterval(typewriterRef.current), []);

  const handleQuery = async (queryText: string, categoryId?: string) => {
    const textToSend = queryText.trim();
    if (!textToSend || loading) return;

    window.clearInterval(typewriterRef.current);
    setInput("");
    setActiveCategory(categoryId || null);
    setIsAnswerOpen(true);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: textToSend,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const rawReply: string =
        data.reply ||
        "I'm sorry, I couldn't process that. Please ask about Aritra's experience or projects!";

      setCurrentResponse({
        id: `resp-${Date.now()}`,
        role: "assistant",
        content: "",
        category: categoryId,
        isStreaming: true,
      });

      setLoading(false);

      let currentLen = 0;
      const step = Math.max(4, Math.ceil(rawReply.length / 35));
      typewriterRef.current = window.setInterval(() => {
        currentLen += step;
        if (currentLen >= rawReply.length) {
          window.clearInterval(typewriterRef.current);
          startTransition(() => {
            setCurrentResponse({
              id: `resp-${Date.now()}`,
              role: "assistant",
              content: rawReply,
              category: categoryId,
              isStreaming: false,
            });
          });
          setAnnouncement(toPlainText(rawReply));
        } else {
          const slice = rawReply.substring(0, currentLen);
          setCurrentResponse({
            id: `resp-${Date.now()}`,
            role: "assistant",
            content: slice,
            category: categoryId,
            isStreaming: true,
          });
        }
      }, 16);
    } catch (err) {
      console.error("Chat error:", err);
      setLoading(false);
      const errorCopy =
        "I encountered a momentary connection hiccup. You can also view Aritra's full experience in the sections below or download his [Resume PDF](/resume.pdf).";
      setCurrentResponse({
        id: `err-${Date.now()}`,
        role: "assistant",
        content: errorCopy,
        category: categoryId,
      });
      setAnnouncement(toPlainText(errorCopy));
    }
  };

  useEffect(() => {
    if (isAnswerOpen && answerCardRef.current) {
      answerCardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [isAnswerOpen, currentResponse]);

  const handleCloseAnswer = () => {
    window.clearInterval(typewriterRef.current);
    setIsAnswerOpen(false);
    setActiveCategory(null);
    setCurrentResponse(null);
    setAnnouncement("");
  };

  return (
    <div className="zro-ask relative mx-auto w-full max-w-4xl">
      <div className="zro-ask-topline">
        <span className="zro-eyebrow flex items-center gap-2 text-zro-muted">
          <Sparkles className="h-3.5 w-3.5 text-zro-accent" aria-hidden="true" />
          Ask my résumé
        </span>
        <span className="zro-ask-live zro-metric">
          <span className="zro-pulse-dot h-1.5 w-1.5 bg-zro-accent" />
          AI · grounded in verified facts
        </span>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleQuery(input);
        }}
        className="zro-ask-bar"
      >
        <span aria-hidden="true" className="zro-ask-prompt">
          &gt;
        </span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything — experience, projects, stack…"
          disabled={loading}
          aria-label="Ask a question about Aritra"
          className="zro-ask-input"
        />
        <kbd aria-hidden="true" className="zro-ask-kbd">
          Enter ↵
        </kbd>
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Submit question"
          className="zro-ask-submit"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </button>
      </form>

      <div
        className="zro-ask-chips"
        role="group"
        aria-label="Suggested questions"
      >
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id && isAnswerOpen;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleQuery(cat.query, cat.id)}
              disabled={loading}
              data-active={isActive}
              style={{ "--ask-accent": cat.accent } as CSSProperties}
              className="zro-ask-chip"
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {isAnswerOpen && (
        <div
          ref={answerCardRef}
          role="region"
          aria-label="AI answer"
          className="zro-ask-answer"
        >
          <div className="zro-ask-answer-head">
            <span className="zro-eyebrow flex items-center gap-2 !text-zro-ink">
              <span className="zro-pulse-dot h-1.5 w-1.5 bg-zro-accent" />
              {activeCategory
                ? `${CATEGORIES.find((c) => c.id === activeCategory)?.label} · AI Answer`
                : "AI Answer"}
              {currentResponse?.isStreaming && (
                <span className="zro-metric text-[0.625rem] normal-case tracking-normal text-zro-faint">
                  · generating
                </span>
              )}
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  const cat = CATEGORIES.find((c) => c.id === activeCategory);
                  if (cat) handleQuery(cat.query, cat.id);
                }}
                className="zro-ask-icon-btn"
                title="Regenerate answer"
                aria-label="Regenerate answer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={handleCloseAnswer}
                className="zro-ask-icon-btn"
                title="Close answer"
                aria-label="Close answer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {loading && !currentResponse ? (
            <div className="flex items-center gap-2 py-4 font-mono text-[0.75rem] text-zro-muted">
              <span className="zro-ask-dot" />
              <span className="zro-ask-dot [animation-delay:-0.15s]" />
              <span className="zro-ask-dot" />
              <span className="ml-2">Thinking &amp; synthesizing facts…</span>
            </div>
          ) : currentResponse ? (
            <FormattedMessage text={currentResponse.content} />
          ) : null}

          <div className="zro-ask-answer-foot">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-zro-accent" aria-hidden="true" />
              Grounded in verified experience &amp; résumé facts
            </span>
            <button
              type="button"
              onClick={handleCloseAnswer}
              className="zro-foot-link"
            >
              Done
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      )}

      {/*
        The visible answer streams character by character. Announcing every
        mutation would flood screen readers, so the final reply is written
        once into this persistent status region instead.
      */}
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        aria-busy={currentResponse?.isStreaming ?? false}
        className="sr-only"
      >
        {announcement}
      </p>
    </div>
  );
}
