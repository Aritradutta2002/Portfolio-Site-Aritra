'use client';

import React, { useState, useRef, useEffect, useTransition } from "react";
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
  iconColor: string;
  activeBorderColor: string;
  query: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: "me",
    label: "Me",
    icon: Smile,
    iconColor: "text-[#0D9488] dark:text-[#2DD4BF]",
    activeBorderColor: "border-[#0D9488] ring-[#0D9488]/30",
    query: "Tell me about yourself, your background, and your role",
  },
  {
    id: "projects",
    label: "Projects",
    icon: Briefcase,
    iconColor: "text-[#10B981] dark:text-[#34D399]",
    activeBorderColor: "border-[#10B981] ring-[#10B981]/30",
    query: "What are your top projects and what did you build?",
  },
  {
    id: "skills",
    label: "Skills",
    icon: Layers,
    iconColor: "text-[#8B5CF6] dark:text-[#A78BFA]",
    activeBorderColor: "border-[#8B5CF6] ring-[#8B5CF6]/30",
    query: "What is your core tech stack, languages, and frameworks?",
  },
  {
    id: "fun",
    label: "Fun",
    icon: PartyPopper,
    iconColor: "text-[#EC4899] dark:text-[#F472B6]",
    activeBorderColor: "border-[#EC4899] ring-[#EC4899]/30",
    query: "What do you like to do for fun, hobbies, and outside of work?",
  },
  {
    id: "contact",
    label: "Contact",
    icon: Contact,
    iconColor: "text-[#D97706] dark:text-[#FBBF24]",
    activeBorderColor: "border-[#D97706] ring-[#D97706]/30",
    query: "How can I contact or hire you?",
  },
];

/**
 * Lightweight safe markdown renderer for bold, links, code, and lists.
 */
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
        // [label](url)
        parts.push(
          <a
            key={match.index}
            href={match[3]}
            target={match[3].startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-400 font-medium underline decoration-blue-500/50 underline-offset-2 transition-colors hover:text-blue-600 dark:hover:text-blue-300"
          >
            {match[2]}
          </a>
        );
      } else if (match[4]) {
        // **bold**
        parts.push(
          <strong
            key={match.index}
            className="font-semibold text-zinc-900 dark:text-zinc-100"
          >
            {match[4]}
          </strong>
        );
      } else if (match[5]) {
        // `code`
        parts.push(
          <code
            key={match.index}
            className="rounded bg-zinc-200/70 px-1 py-0.5 font-mono text-[0.8em] text-zinc-800 dark:bg-white/10 dark:text-zinc-200"
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
    <div className="space-y-2 text-[0.875rem] leading-relaxed text-zinc-600 dark:text-zinc-300">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={i} className="h-1" />;
        }
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
          return (
            <div key={i} className="flex items-start gap-2 pl-1">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              <span>{renderInline(trimmed.substring(2))}</span>
            </div>
          );
        }
        if (/^\d+\.\s/.test(trimmed)) {
          const numMatch = trimmed.match(/^(\d+)\.\s(.*)$/);
          if (numMatch) {
            return (
              <div key={i} className="flex items-start gap-2 pl-1">
                <span className="font-mono text-[0.8rem] font-bold text-blue-500">
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
  const inputRef = useRef<HTMLInputElement>(null);
  const answerCardRef = useRef<HTMLDivElement>(null);
  const [, startTransition] = useTransition();

  const handleQuery = async (queryText: string, categoryId?: string) => {
    const textToSend = queryText.trim();
    if (!textToSend || loading) return;

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

      // Typewriter effect
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
      const interval = setInterval(() => {
        currentLen += step;
        if (currentLen >= rawReply.length) {
          clearInterval(interval);
          startTransition(() => {
            setCurrentResponse({
              id: `resp-${Date.now()}`,
              role: "assistant",
              content: rawReply,
              category: categoryId,
              isStreaming: false,
            });
          });
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
      setCurrentResponse({
        id: `err-${Date.now()}`,
        role: "assistant",
        content:
          "I encountered a momentary connection hiccup. You can also view Aritra's full experience in the sections below or download his [Resume PDF](/resume.pdf).",
        category: categoryId,
      });
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
    setIsAnswerOpen(false);
    setActiveCategory(null);
    setCurrentResponse(null);
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl py-2">
      {/* Subtle colorful aura backdrop matching the user's screenshot */}
      <div
        className="pointer-events-none absolute -inset-x-4 -top-8 h-44 bg-gradient-to-r from-purple-400/15 via-teal-300/15 to-emerald-400/15 blur-3xl opacity-75 dark:opacity-40"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col gap-3.5 sm:gap-4">
        {/* Top Search / Prompt Pill Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuery(input);
          }}
          className="group relative flex w-full items-center rounded-full border border-zinc-200/90 bg-white/95 px-5 py-2 sm:px-6 sm:py-2.5 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] backdrop-blur-md transition-all duration-200 hover:border-zinc-300 hover:shadow-[0_6px_30px_-4px_rgba(0,0,0,0.09)] dark:border-white/10 dark:bg-[#121215]/95 dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.4)] dark:hover:border-white/20"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={loading}
            className="flex-1 bg-transparent pr-4 font-sans text-base sm:text-lg text-zinc-800 placeholder:text-zinc-400 focus:outline-none disabled:opacity-50 dark:text-zinc-100 dark:placeholder:text-zinc-500"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Submit query"
            className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-[#3B82F6] text-white shadow-md shadow-blue-500/25 transition-all duration-150 hover:bg-[#2563EB] hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none"
          >
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <ArrowRight className="h-5 w-5 stroke-[2.5]" />
            )}
          </button>
        </form>

        {/* 5 Category Cards */}
        <div className="grid grid-cols-2 gap-2.5 xs:grid-cols-5 sm:grid-cols-5 sm:gap-3.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id && isAnswerOpen;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleQuery(cat.query, cat.id)}
                disabled={loading}
                className={`group flex flex-col items-center justify-center gap-2 rounded-2xl border bg-white/95 px-3 py-4 sm:px-4 sm:py-5 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-[#121215]/95 dark:shadow-[0_2px_12px_-2px_rgba(0,0,0,0.3)] ${
                  isActive
                    ? `ring-2 ${cat.activeBorderColor} shadow-md`
                    : "border-zinc-200/80 hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/20"
                }`}
              >
                <Icon
                  className={`h-6 w-6 sm:h-7 sm:w-7 ${cat.iconColor} transition-transform duration-200 group-hover:scale-110`}
                />
                <span className="font-medium text-xs sm:text-sm text-zinc-700 transition-colors group-hover:text-zinc-900 dark:text-zinc-200 dark:group-hover:text-white">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Answer Panel (Opens below when user queries or clicks a card) */}
        {isAnswerOpen && (
          <div
            ref={answerCardRef}
            className="animate-in fade-in slide-in-from-top-2 relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-[#151518]/95 dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] duration-200"
          >
            {/* Top Bar of Answer Panel */}
            <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-3 dark:border-white/5">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  {activeCategory
                    ? `${CATEGORIES.find((c) => c.id === activeCategory)?.label} · AI Answer`
                    : "AI Answer"}
                </span>
                {currentResponse?.isStreaming && (
                  <span className="font-mono text-[0.6875rem] text-blue-500">
                    · generating...
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const cat = CATEGORIES.find((c) => c.id === activeCategory);
                    if (cat) handleQuery(cat.query, cat.id);
                  }}
                  className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-white/10 dark:hover:text-zinc-200"
                  title="Regenerate"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleCloseAnswer}
                  className="rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-white/10 dark:hover:text-zinc-200"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            {loading && !currentResponse ? (
              <div className="flex items-center gap-2 py-4 text-zinc-500 dark:text-zinc-400">
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500" />
                <span className="ml-2 font-mono text-xs">
                  Thinking &amp; synthesizing facts...
                </span>
              </div>
            ) : currentResponse ? (
              <FormattedMessage text={currentResponse.content} />
            ) : null}

            {/* Footer subtle tip */}
            <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 font-mono text-[0.6875rem] text-zinc-400 dark:border-white/5 dark:text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-blue-500" />
                Grounded in verified experience &amp; resume facts
              </span>
              <button
                type="button"
                onClick={handleCloseAnswer}
                className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
              >
                Done / Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
