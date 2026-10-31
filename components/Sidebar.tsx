"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGES, SECTIONS } from "@/lib/pages";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Pages"
      className="border-b border-stone-200 px-3 py-4 text-[15px] lg:sticky lg:top-14 lg:h-[calc(100dvh-3.5rem)] lg:overflow-y-auto lg:border-0 lg:py-8 dark:border-stone-800"
    >
      {SECTIONS.map((section) => (
        <ol key={section} className="mb-4 grid gap-0.5 last:mb-0 sm:grid-cols-2 lg:grid-cols-1">
          {PAGES.filter((p) => p.section === section).map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                aria-current={pathname === page.href ? "page" : undefined}
                className="block rounded-sm px-2 py-1 leading-snug text-stone-600 transition-colors hover:text-stone-900 aria-[current=page]:text-accent-700 dark:text-stone-400 dark:hover:text-stone-100 dark:aria-[current=page]:text-accent-300"
              >
                {page.title}
              </Link>
            </li>
          ))}
        </ol>
      ))}
    </nav>
  );
}
