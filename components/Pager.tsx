"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { PAGES, type Page } from "@/lib/pages";
import { card } from "@/lib/ui";

function PagerLink({ page, next }: { page: Page; next: boolean }) {
  return (
    <Link
      href={page.href}
      aria-keyshortcuts={next ? "ArrowRight" : "ArrowLeft"}
      className={`${card} group flex flex-1 flex-col px-4 py-3 transition hover:border-accent-400 ${next ? "items-end text-right" : ""}`}
    >
      <span className="flex items-center gap-1 text-xs text-stone-500">
        {!next && <ArrowLeft className="size-3.5 transition group-hover:-translate-x-0.5" />}
        {next ? "Next" : "Previous"}
        {next && <ArrowRight className="size-3.5 transition group-hover:translate-x-0.5" />}
      </span>
      <span className="font-medium text-accent-700 dark:text-accent-300">{page.title}</span>
    </Link>
  );
}

/** Arrow keys turn the page, unless the reader is busy in a field, a dialog or a widget. */
function useArrowKeys(prev: Page | undefined, next: Page | undefined) {
  const router = useRouter();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const free = e.target === document.body || e.target instanceof HTMLAnchorElement;
      if (!free || document.querySelector("dialog[open], [aria-modal='true']")) return;
      const page = e.key === "ArrowLeft" ? prev : e.key === "ArrowRight" ? next : undefined;
      if (page) router.push(page.href);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [router, prev, next]);
}

export default function Pager() {
  const pathname = usePathname().replace(/(.)\/$/, "$1");
  const index = PAGES.findIndex((p) => p.href === pathname);
  const prev = index === -1 ? undefined : PAGES[index - 1];
  const next = index === -1 ? undefined : PAGES[index + 1];
  useArrowKeys(prev, next);
  if (index === -1) return null;
  return (
    <nav aria-label="Next and previous page" className="mt-16 flex max-w-3xl gap-4">
      {prev ? <PagerLink page={prev} next={false} /> : <span className="flex-1" />}
      {next ? <PagerLink page={next} next /> : <span className="flex-1" />}
    </nav>
  );
}
