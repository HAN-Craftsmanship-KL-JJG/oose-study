"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Tracks the subchapters (h2 headings) of the current page and which one the reader is in.
// The sidebar, the mobile menu and the header all read this.

export interface Section {
  id: string;
  title: string;
}

interface SectionsState {
  sections: Section[];
  /** The id of the section at the top of the screen, or null above the first one. */
  active: string | null;
  /** How far the page is scrolled, from 0 to 1. */
  progress: number;
}

const SectionsContext = createContext<SectionsState>({ sections: [], active: null, progress: 0 });

export function useSections(): SectionsState {
  return useContext(SectionsContext);
}

/** A heading counts as "being read" once its top passes this line, below the sticky header. */
const READ_LINE = 120;

/** A jump to a heading counts as finished after this long without scrolling. */
const SETTLE_MS = 200;

function readSections(): Section[] {
  const headings = document.querySelectorAll<HTMLHeadingElement>("article h2[id]");
  return Array.from(headings, (h) => ({ id: h.id, title: h.textContent.trim() }));
}

function sameSections(a: Section[], b: Section[]): boolean {
  return a.length === b.length && a.every((s, i) => s.id === b[i]?.id && s.title === b[i].title);
}

function activeSection(sections: Section[], atBottom: boolean): string | null {
  if (atBottom) return sections.at(-1)?.id ?? null;
  let current: string | null = null;
  for (const section of sections) {
    const el = document.getElementById(section.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top > READ_LINE) break;
    current = section.id;
  }
  return current;
}

export default function SectionsProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sections, setSections] = useState<Section[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Read the headings after each page change, and again when the page content changes.
  useEffect(() => {
    const update = () => {
      const next = readSections();
      setSections((prev) => (sameSections(prev, next) ? prev : next));
    };
    const frame = requestAnimationFrame(update);
    const observer = new MutationObserver(update);
    const article = document.querySelector("article");
    if (article) observer.observe(article, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [pathname]);

  // Follow the scroll position, at most once per frame.
  // A subchapter picked from a link stays active after the jump, even when the page cannot
  // scroll far enough to bring it to the top. The next scroll by the reader releases it.
  useEffect(() => {
    let frame = 0;
    let pinned: string | null = null;
    let settling = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const atBottom = max > 0 && window.scrollY >= max - 2;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setActive(pinned ?? activeSection(sections, atBottom));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const settle = () => {
      clearTimeout(settling);
      settling = window.setTimeout(() => {
        settling = 0;
      }, SETTLE_MS);
    };
    const onScroll = () => {
      if (settling) settle();
      else pinned = null;
      schedule();
    };
    const onClick = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest("a[href^='#']") : null;
      if (!link) return;
      const id = decodeURIComponent(link.getAttribute("href")?.slice(1) ?? "");
      pinned = sections.some((s) => s.id === id) ? id : null;
      settle();
      schedule();
    };
    schedule();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settling);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("click", onClick);
    };
  }, [sections]);

  return (
    <SectionsContext.Provider value={{ sections, active, progress }}>
      {children}
    </SectionsContext.Provider>
  );
}
