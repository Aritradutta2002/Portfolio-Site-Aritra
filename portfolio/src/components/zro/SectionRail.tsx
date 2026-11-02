"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Desktop-only section rail. A quiet editorial wayfinder that mirrors the
 * navbar's active state without adding another row of chrome.
 */
export function SectionRail() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sections = SECTIONS.map((item) =>
      document.getElementById(item.id)
    ).filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));

    const onScroll = () => setVisible(window.scrollY > 360);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      data-visible={visible}
      className="zro-rail"
    >
      <span aria-hidden="true" className="zro-rail-line" />
      {SECTIONS.map((section, index) => {
        const isActive = active === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={isActive ? "location" : undefined}
            className="zro-rail-item"
            data-active={isActive}
          >
            <span className="zro-rail-dot" aria-hidden="true" />
            <span className="zro-rail-label">
              <span className="zro-rail-num">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
