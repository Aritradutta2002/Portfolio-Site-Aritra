"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  ExternalLink,
  Github,
  Radio,
  Sparkles,
  Terminal,
} from "lucide-react";
import type { ProjectItem } from "@/data/portfolioCatalog";
import { Button } from "../ui/Button";

const TABS = [
  { id: "playground", label: "Playground" },
  { id: "tutor", label: "Guru Bot" },
  { id: "telemetry", label: "Telemetry" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function Playground() {
  return (
    <div className="zro-demo zro-demo--ide">
      <div className="zro-demo-problem">
        <span className="zro-demo-level">Easy</span>
        <span className="zro-demo-name">Two Sum · Java 21</span>
        <span className="zro-demo-timer">04:12</span>
      </div>

      <pre className="zro-code" aria-hidden="true">
        <code>
          <span className="zro-code-line">
            <i>1</i>
            <span>
              <b className="tok-key">class</b>{" "}
              <b className="tok-type">Solution</b> {"{"}
            </span>
          </span>
          <span className="zro-code-line">
            <i>2</i>
            <span>
              {"  "}
              <b className="tok-key">public</b>{" "}
              <b className="tok-type">int</b>[]{" "}
              <b className="tok-fn">twoSum</b>(
              <b className="tok-type">int</b>[] nums,{" "}
              <b className="tok-type">int</b> target) {"{"}
            </span>
          </span>
          <span className="zro-code-line">
            <i>3</i>
            <span>
              {"    "}
              <b className="tok-type">Map</b>
              {"<Integer, Integer> seen = "}
              <b className="tok-key">new</b>{" "}
              <b className="tok-type">HashMap</b>
              {"<>();"}
            </span>
          </span>
          <span className="zro-code-line">
            <i>4</i>
            <span>
              {"    "}
              <b className="tok-key">for</b> (
              <b className="tok-type">int</b> i = 0; i {"<"} nums.length;
              i++) {"{"}
            </span>
          </span>
          <span className="zro-code-line">
            <i>5</i>
            <span>
              {"      "}
              <b className="tok-type">int</b> need = target - nums[i];
            </span>
          </span>
          <span className="zro-code-line">
            <i>6</i>
            <span>
              {"      "}
              <b className="tok-key">if</b> (seen.
              <b className="tok-fn">containsKey</b>(need)) {"{"}
            </span>
          </span>
          <span className="zro-code-line">
            <i>7</i>
            <span>
              {"        "}
              <b className="tok-key">return</b>{" "}
              <b className="tok-key">new</b>{" "}
              <b className="tok-type">int</b>
              {"[]{seen.get(need), i};"}
            </span>
          </span>
          <span className="zro-code-line">
            <i>8</i>
            <span>
              {"      }"}
            </span>
          </span>
          <span className="zro-code-line">
            <i>9</i>
            <span>
              {"      "}seen.<b className="tok-fn">put</b>(nums[i], i);
            </span>
          </span>
          <span className="zro-code-line">
            <i>10</i>
            <span>
              {"    }"}
            </span>
          </span>
          <span className="zro-code-line">
            <i>11</i>
            <span>
              {"    "}
              <b className="tok-key">return</b>{" "}
              <b className="tok-key">new</b>{" "}
              <b className="tok-type">int</b>
              {"[]{};"}
            </span>
          </span>
          <span className="zro-code-line">
            <i>12</i>
            <span>{"  }"}</span>
          </span>
          <span className="zro-code-line">
            <i>13</i>
            <span>{"}"}</span>
          </span>
        </code>
      </pre>

      <div className="zro-demo-result">
        <span>
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          3 / 3 test cases passed
        </span>
        <span>4 ms · O(n)</span>
      </div>
    </div>
  );
}

function Tutor() {
  return (
    <div className="zro-demo zro-demo--tutor">
      <div className="zro-demo-chat-head">
        <span className="zro-demo-bot">
          <Bot className="h-3.5 w-3.5" aria-hidden="true" />
          Guru Bot
        </span>
        <span>RAG · sources verified</span>
      </div>

      <div className="zro-demo-question">
        Why is my two-pointer solution O(n) and not O(n²)?
      </div>

      <div className="zro-demo-answer">
        <span className="zro-demo-answer-label">
          <Sparkles className="h-3 w-3" aria-hidden="true" />
          Answer
        </span>
        <p>
          Each pointer only moves inward and never revisits an index. Across the
          whole loop that is at most <b>n</b> advances, so the work is linear —
          even though there are two nested-looking moves.
        </p>
        <div className="zro-demo-sources">
          <span>CSES · Two Pointers</span>
          <span>Complexity notes</span>
          <span>2 citations</span>
        </div>
      </div>

      <div className="zro-demo-input">
        <span className="zro-demo-input-prompt" aria-hidden="true">
          &gt;
        </span>
        <span className="zro-demo-input-text">
          Ask a follow-up about the proof…
        </span>
        <span className="zro-demo-input-caret" aria-hidden="true" />
        <span className="zro-demo-input-send" aria-hidden="true">
          <ArrowUp className="h-2.5 w-2.5" strokeWidth={2.5} />
        </span>
      </div>

      <div className="zro-demo-followups">
        <span>Try: prove it with a loop invariant</span>
        <span>Show the complexity table</span>
      </div>
    </div>
  );
}

function Telemetry() {
  return (
    <div className="zro-demo zro-demo--telemetry">
      <div className="zro-demo-metrics">
        <div>
          <span>Uptime</span>
          <strong>99.9%</strong>
        </div>
        <div>
          <span>p95 latency</span>
          <strong>42ms</strong>
        </div>
        <div>
          <span>Sandbox</span>
          <strong>3 / 3</strong>
        </div>
        <div>
          <span>RAG docs</span>
          <strong>1,240</strong>
        </div>
      </div>

      <div className="zro-demo-chart">
        <div className="zro-demo-chart-head">
          <span>Request volume · 7d</span>
          <span className="zro-demo-up">+12.4%</span>
        </div>
        <svg viewBox="0 0 260 64" role="presentation" aria-hidden="true">
          <defs>
            <linearGradient id="zro-spark" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#c8a46b" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#c8a46b" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="zro-demo-chart-fill"
            d="M0 50 L22 43 L44 46 L66 34 L88 38 L110 27 L132 30 L154 20 L176 24 L198 15 L220 18 L242 9 L260 12 L260 64 L0 64 Z"
          />
          <path
            className="zro-demo-chart-line"
            d="M0 50 L22 43 L44 46 L66 34 L88 38 L110 27 L132 30 L154 20 L176 24 L198 15 L220 18 L242 9 L260 12"
          />
        </svg>
      </div>

      <div className="zro-demo-log">
        <div>
          <span className="zro-demo-log-dot" />
          <span>Deploy · main → production</span>
          <span>2m ago</span>
        </div>
        <div>
          <span className="zro-demo-log-dot" />
          <span>RAG index · 1,240 docs synced</span>
          <span>18m ago</span>
        </div>
        <div>
          <span className="zro-demo-log-dot" />
          <span>Java sandbox · health check</span>
          <span>1h ago</span>
        </div>
      </div>
    </div>
  );
}

export function FlagshipShowcase({ project }: { project: ProjectItem }) {
  const [tab, setTab] = useState<TabId>("playground");
  const reduceMotion = useReducedMotion();

  const moveTab = (direction: 1 | -1 | "first" | "last") => {
    const current = TABS.findIndex((item) => item.id === tab);
    const next =
      direction === "first"
        ? 0
        : direction === "last"
          ? TABS.length - 1
          : (current + direction + TABS.length) % TABS.length;
    setTab(TABS[next].id);
    window.requestAnimationFrame(() => {
      document.getElementById(`flagship-tab-${TABS[next].id}`)?.focus();
    });
  };

  return (
    <article
      data-reveal
      data-spot
      className="zro-card zro-flagship relative overflow-hidden"
    >
      <div className="zro-flagship-head">
        <div className="flex flex-wrap items-center gap-3">
          <span className="zro-flagship-index">{"// 01"}</span>
          <span className="zro-eyebrow !text-zro-accent">Flagship</span>
          <span className="zro-flagship-live">
            <span className="zro-pulse-dot h-1.5 w-1.5 bg-emerald-400" />
            Live at algoguru.online
          </span>
        </div>
        <span className="zro-metric text-[0.625rem] uppercase tracking-[0.12em] text-zro-faint">
          {project.years}
        </span>
      </div>

      <div className="zro-flagship-grid">
        <div className="zro-flagship-copy">
          <h3 className="zro-flagship-title">{project.name}</h3>
          <p className="zro-flagship-kind">{project.kind}</p>
          <p className="zro-flagship-summary">{project.summary}</p>

          <ul className="zro-flagship-points">
            {project.bullets.slice(0, 3).map((bullet) => (
              <li key={bullet}>
                <span aria-hidden="true" />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="zro-flagship-actions">
            <Button
              href="https://www.algoguru.online/"
              variant="solid"
              arrow
              external
              magnetic
            >
              Launch live platform
            </Button>
            <Button
              href="https://github.com/Aritradutta2002"
              variant="outline"
              arrow
              external
            >
              <Github className="h-3.5 w-3.5" aria-hidden="true" />
              Source
            </Button>
          </div>

          <div className="zro-flagship-stack">
            {project.stack.map((tech) => (
              <span key={tech} className="zro-chip">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="zro-flagship-demo">
          <div className="zro-product zro-tilt" data-tilt>
            <div className="zro-product-bar">
              <span className="zro-product-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="zro-product-url">
                <Terminal className="h-3 w-3" aria-hidden="true" />
                algoguru.online/workspace
              </span>
              <span className="zro-product-live">
                <Radio className="h-3 w-3" aria-hidden="true" />
                Live
              </span>
            </div>

            <div className="zro-product-tabs">
              <div
                className="zro-product-tablist"
                role="tablist"
                aria-label="AlgoGuru product preview"
              >
                {TABS.map((item) => (
                  <button
                    key={item.id}
                    id={`flagship-tab-${item.id}`}
                    type="button"
                    role="tab"
                    aria-selected={tab === item.id}
                    aria-controls="flagship-panel"
                    tabIndex={tab === item.id ? 0 : -1}
                    data-active={tab === item.id}
                    className="zro-product-tab"
                    onClick={() => setTab(item.id)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowRight") {
                        event.preventDefault();
                        moveTab(1);
                      }
                      if (event.key === "ArrowLeft") {
                        event.preventDefault();
                        moveTab(-1);
                      }
                      if (event.key === "Home") {
                        event.preventDefault();
                        moveTab("first");
                      }
                      if (event.key === "End") {
                        event.preventDefault();
                        moveTab("last");
                      }
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <span className="zro-product-tabs-meta">100% solo-built</span>
            </div>

            <div
              id="flagship-panel"
              role="tabpanel"
              aria-labelledby={`flagship-tab-${tab}`}
              className="zro-product-screen"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.22, ease: "easeOut" }
                  }
                >
                  {tab === "playground" && <Playground />}
                  {tab === "tutor" && <Tutor />}
                  {tab === "telemetry" && <Telemetry />}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="zro-product-status">
              <span>
                <i className="zro-status-ok" />
                200 OK
              </span>
              <span>Java 21 sandbox</span>
              <span>Supabase · RLS</span>
            </div>
          </div>

          <a
            className="zro-flagship-demo-link"
            href="https://www.algoguru.online/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            Open the live product
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
