"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import PageTree, { revealActive } from "./PageTree";
import { useSections } from "./SectionsProvider";

/** The menu as a drawer from the left, for phones. */
export default function MobileMenu({ onClose }: { onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const { active } = useSections();

  // On open: lock the page behind it, close on Escape and show the current subchapter.
  useEffect(() => {
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    revealActive(panel.current, active, true);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
    // Only on open: the page cannot scroll while the menu is open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-0 z-30 lg:hidden"
    >
      <button
        type="button"
        aria-label="Close the menu"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/30 backdrop-blur-[1px] dark:bg-black/50"
      />
      <div className="absolute inset-y-0 left-0 flex w-[min(20rem,85vw)] flex-col border-r border-stone-200 bg-[#fbf8f1] shadow-xl dark:border-stone-800 dark:bg-[#1a1814]">
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-stone-200 px-4 dark:border-stone-800">
          <Link
            href="/"
            onClick={onClose}
            className="text-base font-medium tracking-wide [font-variant-caps:small-caps]"
          >
            OOSE-DT
          </Link>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label="Close the menu"
            className="-mr-2 rounded-sm p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
          >
            <X className="size-5" />
          </button>
        </div>
        <div
          ref={panel}
          className="flex-1 overflow-y-auto overscroll-contain px-3 py-5 text-[15px]"
        >
          <PageTree onNavigate={onClose} />
        </div>
      </div>
    </div>
  );
}
