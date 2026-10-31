"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PAGES } from "@/lib/pages";
import MobileMenu from "./nav/MobileMenu";
import { normalise } from "./nav/PageTree";
import { useSections } from "./nav/SectionsProvider";
import { useHideOnScroll } from "./nav/useHideOnScroll";
import Search from "./search/Search";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = normalise(usePathname());
  const { sections, active, progress } = useSections();
  // The menu belongs to the page it was opened on, so it closes by itself on navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  // On phones the header makes room while reading down; the progress bar stays in view.
  const hidden = useHideOnScroll();

  const page = PAGES.find((p) => p.href === pathname);
  const section = sections.find((s) => s.id === active);

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
              setOpenOn(pathname);
            }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open the menu"
            className="-mx-2 flex min-w-0 flex-1 items-center gap-3 rounded-sm px-2 py-1 text-left lg:hidden"
          >
            <Menu className="size-5 shrink-0 text-stone-500" />
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-xs text-stone-500 [font-variant-caps:small-caps]">
                {section && page ? page.title : "OOSE-DT"}
              </span>
              <span className="block truncate text-[15px] font-medium">
                {section?.title ?? page?.title ?? "Menu"}
              </span>
            </span>
            <ChevronDown className="size-4 shrink-0 text-stone-400" />
          </button>
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
      {open && (
        <MobileMenu
          onClose={() => {
            setOpenOn(null);
          }}
        />
      )}
    </>
  );
}
