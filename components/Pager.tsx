"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGES, type Page } from "@/lib/pages";
import { card } from "@/lib/ui";

function PagerLink({ page, next }: { page: Page; next: boolean }) {
  return (
    <Link
      href={page.href}
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

export default function Pager() {
  const pathname = usePathname();
  const index = PAGES.findIndex((p) => p.href === pathname);
  if (index === -1) return null;
  const prev = PAGES[index - 1];
  const next = PAGES[index + 1];
  return (
    <nav aria-label="Next and previous page" className="mt-16 flex max-w-3xl gap-4">
      {prev ? <PagerLink page={prev} next={false} /> : <span className="flex-1" />}
      {next ? <PagerLink page={next} next /> : <span className="flex-1" />}
    </nav>
  );
}
