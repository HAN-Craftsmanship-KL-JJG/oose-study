"use client";

import { useEffect, useRef } from "react";
import { revealActive } from "./PageTree";
import { useSections } from "./SectionsProvider";

const sectionLink =
  "block rounded-sm px-3 py-2 leading-snug text-stone-600 transition-colors " +
  "hover:text-stone-900 aria-[current=location]:bg-accent-50 " +
  "aria-[current=location]:text-accent-700 dark:text-stone-400 dark:hover:text-stone-100 " +
  "dark:aria-[current=location]:bg-accent-950/60 dark:aria-[current=location]:text-accent-300";

/** On phones: the subchapters of this page, in a panel under the header. */
export default function SectionsDropdown({ onClose }: { onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const { sections, active } = useSections();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    revealActive(panel.current, active, true);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
    // Only on open: show the current subchapter once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-30 lg:hidden">
      <button
        type="button"
        aria-label="Close the list of subchapters"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/10 dark:bg-black/30"
      />
      <nav
        id="sections-dropdown"
        aria-label="On this page"
        className="absolute inset-x-2 top-14 mt-1 flex max-h-[70dvh] flex-col overflow-hidden rounded-sm border border-stone-200 bg-[#fbf8f1] shadow-xl dark:border-stone-800 dark:bg-[#1a1814]"
      >
        <p className="shrink-0 px-5 pt-3 pb-1 text-sm tracking-wide text-stone-400 [font-variant-caps:all-small-caps] dark:text-stone-500">
          On this page
        </p>
        <div ref={panel} className="overflow-y-auto overscroll-contain px-2 pb-2 text-[15px]">
          <ol>
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  data-section={s.id}
                  onClick={onClose}
                  aria-current={s.id === active ? "location" : undefined}
                  className={sectionLink}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </div>
  );
}
