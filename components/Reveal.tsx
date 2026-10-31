import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

/** A hidden block the student opens on purpose, for example an answer. */
export default function Reveal({
  title = "Show the answer",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <details className="group not-prose my-6 rounded-sm border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
      <summary className="flex cursor-pointer list-none items-center gap-2 px-5 py-3 font-medium text-accent-800 dark:text-accent-300 [&::-webkit-details-marker]:hidden">
        <ChevronDown className="size-4 -rotate-90 transition group-open:rotate-0" aria-hidden />
        {title}
      </summary>
      <div className="prose max-w-none px-5 pb-4 prose-stone dark:prose-invert prose-code:before:content-none prose-code:after:content-none [&>*:first-child]:mt-0">
        {children}
      </div>
    </details>
  );
}
