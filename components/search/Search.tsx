"use client";

import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { iconButton } from "../ThemeToggle";
import SearchDialog from "./SearchDialog";

function isTyping(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || /^(?:INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
  );
}

const noSubscribe = () => () => undefined;

/** "⌘K" on a Mac, "Ctrl K" elsewhere. */
function useShortcutLabel(): string {
  return useSyncExternalStore(
    noSubscribe,
    () => (/Mac|iPhone|iPad/.test(navigator.userAgent) ? "⌘K" : "Ctrl K"),
    () => "Ctrl K",
  );
}

/** The search button in the header. Ctrl+K, ⌘K or / opens the search from anywhere. */
export default function Search() {
  const [open, setOpen] = useState(false);
  const shortcut = useShortcutLabel();

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const combo = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      const slash = e.key === "/" && !isTyping(e.target);
      if (!combo && !slash) return;
      e.preventDefault();
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const show = () => {
    setOpen(true);
  };
  return (
    <>
      <button
        type="button"
        onClick={show}
        className="hidden w-60 items-center gap-2 rounded-sm border border-stone-200 bg-[#fffdf8] px-3 py-1.5 text-sm text-stone-500 transition-colors hover:border-stone-300 hover:text-stone-700 lg:flex dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700 dark:hover:text-stone-300"
      >
        <SearchIcon className="size-4" />
        Search
        <kbd className="ml-auto font-sans text-xs text-stone-400">{shortcut}</kbd>
      </button>
      <button
        type="button"
        onClick={show}
        aria-label="Search"
        className={`${iconButton} lg:hidden`}
      >
        <SearchIcon className="size-5" />
      </button>
      {open && (
        <SearchDialog
          onClose={() => {
            setOpen(false);
          }}
        />
      )}
    </>
  );
}
