"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGES, SECTIONS } from "@/lib/pages";
import { useSections } from "./SectionsProvider";

/** The path without a trailing slash, so "/solid/" and "/solid" match. */
export function normalise(path: string): string {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

const pageLink =
  "block rounded-sm px-2 py-1 leading-snug text-stone-600 transition-colors " +
  "hover:text-stone-900 aria-[current=page]:font-medium aria-[current=page]:text-accent-700 " +
  "dark:text-stone-400 dark:hover:text-stone-100 dark:aria-[current=page]:text-accent-300";

const sectionLink =
  "-ml-px block border-l border-transparent py-1 pr-2 pl-3 text-[14px] leading-snug " +
  "text-stone-500 transition-colors hover:text-stone-900 dark:hover:text-stone-100 " +
  "aria-[current=location]:border-accent-600 aria-[current=location]:text-accent-700 " +
  "dark:aria-[current=location]:border-accent-300 dark:aria-[current=location]:text-accent-300";

/** Every page, grouped by part. The current page opens up to show its subchapters. */
export default function PageTree({ onNavigate }: { onNavigate?: (() => void) | undefined }) {
  const pathname = normalise(usePathname());
  const { sections, active } = useSections();
  return (
    <>
      {SECTIONS.map((part) => (
        <div key={part} className="mb-5 last:mb-0">
          <p className="px-2 pb-1 text-sm tracking-wide text-stone-400 [font-variant-caps:all-small-caps] dark:text-stone-500">
            {part}
          </p>
          <ol className="grid gap-0.5">
            {PAGES.filter((p) => p.section === part).map((page) => {
              const current = pathname === page.href;
              return (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    onClick={() => onNavigate?.()}
                    aria-current={current ? "page" : undefined}
                    className={pageLink}
                  >
                    {page.title}
                  </Link>
                  {current && sections.length > 0 && (
                    <ol className="my-1 ml-2 border-l border-stone-200 dark:border-stone-800">
                      {sections.map((s) => (
                        <li key={s.id}>
                          <a
                            href={`#${s.id}`}
                            data-section={s.id}
                            onClick={() => onNavigate?.()}
                            aria-current={s.id === active ? "location" : undefined}
                            className={sectionLink}
                          >
                            {s.title}
                          </a>
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </>
  );
}

/** Scrolls a menu so the active subchapter is in view, without moving the page itself. */
export function revealActive(
  container: HTMLElement | null,
  active: string | null,
  center: boolean,
) {
  if (!container || !active) return;
  const item = container.querySelector<HTMLElement>(`[data-section="${active}"]`);
  if (!item) return;
  const box = container.getBoundingClientRect();
  const rect = item.getBoundingClientRect();
  const margin = 48;
  if (center) {
    container.scrollTop += rect.top - box.top - box.height / 2 + rect.height / 2;
  } else if (rect.top < box.top + margin) {
    container.scrollTop += rect.top - box.top - margin;
  } else if (rect.bottom > box.bottom - margin) {
    container.scrollTop += rect.bottom - box.bottom + margin;
  }
}
