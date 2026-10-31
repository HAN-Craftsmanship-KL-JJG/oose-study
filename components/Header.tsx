"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PAGES } from "@/lib/pages";
import MobileMenu from "./nav/MobileMenu";
import { normalise } from "./nav/PageTree";
import SectionsDropdown from "./nav/SectionsDropdown";
import { useSections } from "./nav/SectionsProvider";
import { useHideOnScroll } from "./nav/useHideOnScroll";
import Search from "./search/Search";
import ThemeToggle from "./ThemeToggle";

/** On phones: the page and the subchapter being read. A tap lists the subchapters. */
function PageTitle({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  const pathname = normalise(usePathname());
  const { sections, active } = useSections();
  const page = PAGES.find((p) => p.href === pathname);
  const section = sections.find((s) => s.id === active);
  const hasSections = sections.length > 0;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-expanded={open}
      aria-controls={hasSections ? "sections-dropdown" : "mobile-menu"}
      aria-label={hasSections ? "Show the subchapters of this page" : "Open the menu"}
      className="flex min-w-0 flex-1 items-center gap-2 rounded-sm py-1 pl-1 text-left lg:hidden"
    >
      <span className="min-w-0 flex-1 leading-tight">
        <span className="block truncate text-xs text-stone-500 [font-variant-caps:small-caps]">
          {section && page ? page.title : "OOSE-DT"}
        </span>
        <span className="block truncate text-[15px] font-medium">
          {section?.title ?? page?.title ?? "Menu"}
        </span>
      </span>
      {hasSections && (
        <ChevronDown
          className={`size-4 shrink-0 text-stone-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      )}
    </button>
  );
}

export default function Header() {
  const pathname = normalise(usePathname());
  const { sections, progress } = useSections();
  // A panel belongs to the page it was opened on, so it closes by itself on navigation.
  const [panel, setPanel] = useState<{ kind: "menu" | "sections"; on: string } | null>(null);
  const openPanel = panel?.on === pathname ? panel.kind : null;
  const close = () => {
    setPanel(null);
  };
  // On phones the header makes room while reading down; the progress bar stays in view.
  const hidden = useHideOnScroll();

  return (
    <>
      <header
        className={`sticky top-0 z-20 border-b border-stone-200 bg-[#fbf8f1]/95 backdrop-blur transition-transform duration-200 dark:border-stone-800 dark:bg-[#1a1814]/95 ${hidden ? "max-lg:-translate-y-full" : ""}`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center px-4">
          <Link
            href="/"
            className="hidden text-base font-medium tracking-wide [font-variant-caps:small-caps] lg:block"
          >
            OOSE-DT
          </Link>
          <button
            type="button"
            onClick={() => {
              setPanel({ kind: "menu", on: pathname });
            }}
            aria-expanded={openPanel === "menu"}
            aria-controls="mobile-menu"
            aria-label="Open the menu with all pages"
            className="-ml-2 shrink-0 rounded-sm p-2 text-stone-500 lg:hidden"
          >
            <Menu className="size-5" />
          </button>
          <PageTitle
            open={openPanel === "sections"}
            onOpen={() => {
              setPanel({ kind: sections.length > 0 ? "sections" : "menu", on: pathname });
            }}
          />
          <div className="ml-auto flex shrink-0 items-center gap-1 pl-2">
            <Search />
            <ThemeToggle />
          </div>
        </div>
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-accent-600/70 dark:bg-accent-400/70"
          style={{ transform: `scaleX(${String(progress)})` }}
        />
      </header>
      {openPanel === "menu" && <MobileMenu onClose={close} />}
      {openPanel === "sections" && <SectionsDropdown onClose={close} />}
    </>
  );
}
