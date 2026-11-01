import { CircleCheck, CircleX } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Two panels side by side: a bad and a good version, or any two things to compare.
 * Panels with code are stacked instead, so the code keeps its full width.
 * <Compare>
 * <Side kind="bad" title="Before">...Markdown, code or a diagram...</Side>
 * <Side kind="good" title="After">...</Side>
 * </Compare>
 */
export function Compare({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 grid gap-4 md:grid-cols-2 md:has-[.code-block]:grid-cols-1">
      {children}
    </div>
  );
}

const KINDS = {
  bad: {
    box: "border-rose-200 dark:border-rose-900/60",
    head: "border-b border-rose-200 bg-rose-50/70 text-rose-800 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200",
    icon: CircleX,
  },
  good: {
    box: "border-emerald-200 dark:border-emerald-900/60",
    head: "border-b border-emerald-200 bg-emerald-50/70 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200",
    icon: CircleCheck,
  },
  neutral: {
    box: "border-stone-200 dark:border-stone-800",
    head: "border-b border-stone-200 bg-stone-50 text-stone-700 dark:border-stone-800 dark:bg-stone-800/40 dark:text-stone-200",
    icon: null,
  },
} as const;

export function Side({
  kind = "neutral",
  title,
  children,
}: {
  kind?: keyof typeof KINDS;
  title: string;
  children: ReactNode;
}) {
  const k = KINDS[kind];
  const Icon = k.icon;
  return (
    <div
      className={`min-w-0 overflow-hidden rounded-sm border bg-white dark:bg-stone-900 ${k.box}`}
    >
      <div className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold ${k.head}`}>
        {Icon && <Icon className="size-4" aria-hidden />}
        {title}
      </div>
      <div className="prose prose-sm max-w-none px-4 py-3 prose-stone dark:prose-invert prose-code:before:content-none prose-code:after:content-none [&_.code-block]:-mx-4 [&_.code-block]:rounded-none [&_.code-block]:border-x-0 [&_.shiki]:[--code-pad:1rem] [&_figure]:my-2 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&>.code-block:first-child]:-mt-3 [&>.code-block:first-child]:border-t-0 [&>.code-block:last-child]:-mb-3 [&>.code-block:last-child]:border-b-0">
        {children}
      </div>
    </div>
  );
}
