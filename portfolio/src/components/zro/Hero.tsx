'use client'

import type { CSSProperties, MouseEvent } from "react";
import Image from "next/image";
import { Button } from "./ui/Button";
import { HeroChatbot } from "./HeroChatbot";
import { ParticleNetworkBFS } from "@/components/luxe/ParticleNetworkBFS";
import {
  CONTACT_LINKS,
  PORTFOLIO_HEADER,
} from "@/data/portfolioCatalog";

export function Hero() {
  const handleHeroClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (
      target.closest(
        'a, button, input, textarea, select, [role="button"], [contenteditable="true"]'
      )
    ) {
      return;
    }
    if (typeof window !== "undefined" && window.getSelection()?.toString()) {
      return;
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("particle:wave", {
          detail: { x: event.clientX, y: event.clientY },
        })
      );
    }
  };

  return (
    <section
      onClick={handleHeroClick}
      data-spot
      className="zro-hero relative overflow-hidden border-b border-zro-line cursor-default"
    >
      {/* Background Layer: Canvas 2D BFS Engine + Hero Focus Vignette */}
      <div
        className="zro-hero-bg pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <ParticleNetworkBFS className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="zro-hero-light" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 40%, transparent 35%, rgba(10, 10, 11, 0.72) 100%)",
          }}
        />
      </div>

      {/* Foreground Hero Content (Tightened top spacing to remove excess dead space) */}
      <div className="zro-hero-content relative z-10 mx-auto flex max-w-6xl flex-col px-6 pt-6 md:px-8 md:pt-8 lg:min-h-[calc(100svh-4rem)] lg:pt-8">
        <div className="grid flex-1 grid-cols-1 items-center gap-12 py-6 md:py-8 lg:grid-cols-12 lg:gap-12 lg:py-10">
          <div className="lg:col-span-7">
            {/* Mobile identification block — the desktop figure carries this. */}
            <div className="mb-7 flex items-center gap-4 lg:hidden">
              <div className="relative h-[118px] w-[92px] shrink-0 overflow-hidden border border-zro-line bg-zro-surface">
                <Image
                  src="/aritra-portrait-sm.webp"
                  alt=""
                  fill
                  sizes="92px"
                  className="object-cover"
                />
              </div>
              <div className="zro-eyebrow">
                {PORTFOLIO_HEADER.location}
              </div>
            </div>

            <div
              data-reveal="fade"
              className="flex items-center gap-2.5"
            >
              <span
                aria-hidden="true"
                className="zro-pulse-dot h-1.5 w-1.5 rounded-full bg-zro-accent"
              />
              <span className="zro-eyebrow">{PORTFOLIO_HEADER.availability}</span>
            </div>

            {/* Name and role share one display block; only the role line is
                revealed so the H1 (the LCP element) paints on the first frame. */}
            <h1 className="mt-6 max-w-4xl">
              <span className="zro-display block text-zro-ink">
                {PORTFOLIO_HEADER.name}
              </span>
              <span
                data-reveal
                style={{ "--zro-delay": "80ms" } as CSSProperties}
                className="mt-4 block text-[1.375rem] leading-[1.45] tracking-[-0.02em] text-zro-muted"
              >
                {PORTFOLIO_HEADER.role} at {PORTFOLIO_HEADER.company}.
              </span>
            </h1>

            <p
              data-reveal
              style={{ "--zro-delay": "150ms" } as CSSProperties}
              className="zro-lede mt-6 max-w-[52ch] text-zro-muted"
            >
              <span className="lg:hidden">2+ years</span>
              <span className="hidden lg:inline">
                {PORTFOLIO_HEADER.location} · 2+ years
              </span>{" "}
              building and modernising enterprise Java systems.
            </p>

            <div
              data-reveal
              style={{ "--zro-delay": "220ms" } as CSSProperties}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <Button
                href={CONTACT_LINKS.resumePdf}
                variant="solid"
                arrow
                magnetic
              >
                Download resume
              </Button>
              <Button
                href={`mailto:${CONTACT_LINKS.email}`}
                variant="outline"
                magnetic
              >
                Email me
              </Button>
              <Button href="#experience" variant="quiet" arrow>
                Read experience
              </Button>
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:block">
            <figure
              data-reveal="fade"
              className="zro-portrait mx-auto w-full max-w-[400px] overflow-hidden border border-zro-line bg-zro-surface"
            >
              <div
                data-scroll
                className="zro-portrait-frame relative aspect-[4/5] w-full overflow-hidden"
              >
                <div className="zro-portrait-media">
                  <Image
                    src="/aritra-portrait.webp"
                    alt={`${PORTFOLIO_HEADER.name}, ${PORTFOLIO_HEADER.role}`}
                    fill
                    sizes="(max-width: 1024px) 0px, 400px"
                    className="object-cover"
                  />
                </div>
              </div>
              <figcaption className="border-t border-zro-line px-4 py-3 text-[0.6875rem] uppercase leading-relaxed tracking-[0.14em] text-zro-faint">
                {PORTFOLIO_HEADER.name} · {PORTFOLIO_HEADER.location}
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Separator hairline */}
        <div
          data-reveal="rule"
          style={{ "--zro-delay": "260ms" } as CSSProperties}
          aria-hidden="true"
        />

        {/* Ask Me Anything Chatbot replacing the static 3 metrics */}
        <div
          data-reveal="fade"
          style={{ "--zro-delay": "300ms" } as CSSProperties}
          className="pb-10 pt-4"
        >
          <HeroChatbot />
        </div>
      </div>
    </section>
  );
}
