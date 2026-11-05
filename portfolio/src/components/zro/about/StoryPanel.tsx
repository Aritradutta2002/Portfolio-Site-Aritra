import { Sparkles, ArrowUpRight } from "lucide-react";
import { Tag } from "../ui/Tag";
import { Reveal } from "@/components/motion/Reveal";

const FOCUS = [
  "Java 21",
  "Spring Boot 4",
  "Azure PaaS",
  "LangChain",
  "RAG",
  "React",
];

export function StoryPanel() {
  return (
    <article
      data-reveal
      data-spot
      className="zro-card zro-story flex h-full flex-col p-6 md:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zro-line pb-4">
        <span className="zro-eyebrow flex items-center gap-2 text-zro-muted">
          <Sparkles className="h-3.5 w-3.5 text-zro-accent" aria-hidden="true" />
          The short version
        </span>
        <span className="zro-metric text-[0.625rem] uppercase tracking-[0.1em] text-zro-faint">
          Full-stack · Systems · AI
        </span>
      </div>

      <Reveal y={12} delay={0.08}>
        <blockquote className="zro-story-quote mt-6">
          <span aria-hidden="true" className="zro-story-mark">
            &ldquo;
          </span>
          I make the systems companies already depend on{" "}
          <em>faster, safer, and ready for what comes next.</em>
        </blockquote>
      </Reveal>

      <div className="zro-story-copy mt-6 space-y-4">
        <p>
          I&apos;m a{" "}
          <strong>Full Stack Application Engineer at TCS</strong>, working on the
          remediation phase of a Java microservices modernisation. I&apos;ve moved
          services from Java 8 to Java 21, Spring Boot 1.x to 4.x, and on-premises
          JBoss to Azure Tomcat PaaS.
        </p>
        <p>
          I also build products end-to-end.{" "}
          <a
            href="https://www.algoguru.online/"
            target="_blank"
            rel="noopener noreferrer"
            className="zro-inline-link"
          >
            AlgoGuru
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
          , my live learning platform, pairs an in-browser Java playground with a
          retrieval-augmented AI tutor. The through-line is the same: systems that
          are simpler to run and faster to use.
        </p>
      </div>

      <div className="zro-story-focus mt-6 flex flex-wrap items-center gap-2 border-t border-zro-line pt-4">
        <span className="zro-eyebrow mr-1 text-[0.625rem]">Currently focused</span>
        {FOCUS.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>

      <div className="zro-story-now mt-5 border-t border-zro-line pt-4">
        <p className="zro-eyebrow text-[0.625rem]">Right now</p>
        <ul className="zro-story-now-list mt-2.5">
          <li>
            <span>Building</span>
            <strong>AlgoGuru, live in production</strong>
          </li>
          <li>
            <span>Modernising</span>
            <strong>Java 21 services at TCS</strong>
          </li>
          <li>
            <span>Exploring</span>
            <strong>RAG evaluation &amp; Azure architecture</strong>
          </li>
        </ul>
      </div>
    </article>
  );
}
