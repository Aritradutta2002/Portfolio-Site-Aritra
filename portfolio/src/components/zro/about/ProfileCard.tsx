import Image from "next/image";
import {
  Github,
  Linkedin,
  Code2,
  Trophy,
  MapPin,
  Target,
  Languages,
} from "lucide-react";
import { CopyEmail } from "../CopyEmail";
import {
  CONTACT_LINKS,
  PORTFOLIO_HEADER,
  SPOKEN_LANGUAGES,
} from "@/data/portfolioCatalog";

export function ProfileCard() {
  return (
    <article
      data-reveal
      data-spot
      className="zro-card zro-profile flex h-full flex-col p-5 md:p-6"
    >
      <div className="flex items-center justify-between gap-3 border-b border-zro-line pb-4">
        <span className="zro-eyebrow flex items-center gap-2 text-zro-muted">
          <span className="zro-plate !h-6 !w-6 !text-[0.5625rem] text-zro-accent">
            AD
          </span>
          Profile
        </span>
        <span className="zro-profile-status">
          <span className="zro-pulse-dot h-1.5 w-1.5 bg-emerald-400" />
          Open to work
        </span>
      </div>

      <figure className="zro-profile-media relative mt-4 aspect-[4/3.85] w-full overflow-hidden border border-zro-line bg-zro-surface">
        <Image
          src="/aritra-portrait.webp"
          alt={`${PORTFOLIO_HEADER.name}, ${PORTFOLIO_HEADER.role}`}
          fill
          sizes="(max-width: 1024px) 100vw, 380px"
          className="object-cover object-[50%_32%]"
        />
        <span className="zro-profile-shade" aria-hidden="true" />
        <span
          aria-hidden="true"
          className="absolute left-3 top-3 h-3.5 w-3.5 border-l border-t border-zro-accent/80"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 h-3.5 w-3.5 border-b border-r border-zro-accent/80"
        />

        <figcaption className="absolute inset-x-3 bottom-3 z-[2] border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-md">
          <p className="text-[0.8125rem] font-medium leading-tight text-white">
            {PORTFOLIO_HEADER.name}
          </p>
          <p className="zro-eyebrow mt-1 text-[0.5625rem] !text-white/60">
            {PORTFOLIO_HEADER.role}
          </p>
        </figcaption>

        <span className="zro-profile-memoji" title="Aritra's memoji">
          <Image
            src="/aritra-memoji.jpg"
            alt=""
            width={96}
            height={96}
            sizes="48px"
            className="h-full w-full object-cover object-top"
          />
        </span>
      </figure>

      <dl className="zro-fact-list mt-5 border-t border-zro-line pt-1">
        <div className="zro-fact-row">
          <dt>
            <span className="zro-fact-icon">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            Based in
          </dt>
          <dd>{PORTFOLIO_HEADER.location}</dd>
        </div>
        <div className="zro-fact-row">
          <dt>
            <span className="zro-fact-icon">
              <Target className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            Focus
          </dt>
          <dd>Java · Cloud · RAG</dd>
        </div>
        <div className="zro-fact-row">
          <dt>
            <span className="zro-fact-icon">
              <Languages className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            Languages
          </dt>
          <dd className="zro-fact-wrap">{SPOKEN_LANGUAGES.join(" · ")}</dd>
        </div>
      </dl>

      <div className="zro-profile-connect mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-zro-line pt-4">
        <span className="zro-eyebrow text-[0.625rem]">Connect</span>
        <div className="flex items-center gap-1.5">
          <a
            href={CONTACT_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="zro-social-link"
            aria-label="GitHub profile"
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={CONTACT_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="zro-social-link"
            aria-label="LinkedIn profile"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={CONTACT_LINKS.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="zro-social-link"
            aria-label="LeetCode profile"
          >
            <Code2 className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href={CONTACT_LINKS.codechef}
            target="_blank"
            rel="noopener noreferrer"
            className="zro-social-link"
            aria-label="CodeChef profile"
          >
            <Trophy className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 border-t border-zro-line pt-3">
        <span className="zro-eyebrow text-[0.625rem]">Email</span>
        <CopyEmail email={CONTACT_LINKS.email} />
      </div>
    </article>
  );
}
