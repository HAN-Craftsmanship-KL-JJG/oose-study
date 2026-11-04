"use client";

import type { LanguageId } from "@/lib/languages";
import Label, { type LabelTone } from "./Label";
import { useLanguage } from "./LanguageProvider";

export interface CodeTab {
  id: LanguageId;
  label: string;
  html: string;
  note?: string | undefined;
}

/** A code example in a window frame, with a tab per language. Tabs follow the header choice. */
export default function CodeTabs({
  title,
  label,
  tone,
  tabs,
}: {
  title?: string | undefined;
  label?: string | undefined;
  tone?: LabelTone | undefined;
  tabs: CodeTab[];
}) {
  const { lang, setLang } = useLanguage();
  const active = tabs.find((t) => t.id === lang) ?? tabs[0];
  if (!active) return null;

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-sm border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 border-b border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-600 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
        {label && title && <Label tone={tone}>{label}</Label>}
        {(title ?? label) && (
          <span className={title ? "" : "font-semibold text-stone-800 dark:text-stone-100"}>
            {title ?? label}
          </span>
        )}
        <div
          role="tablist"
          className="ml-auto flex gap-1 rounded-sm bg-stone-200/60 p-0.5 dark:bg-stone-800"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === active.id}
              onClick={() => {
                setLang(t.id);
              }}
              className="rounded-sm px-2.5 py-0.5 text-xs font-semibold text-stone-500 transition aria-selected:bg-white aria-selected:text-accent-700 dark:text-stone-400 dark:aria-selected:bg-stone-950 dark:aria-selected:text-accent-300"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div
        role="tabpanel"
        className="overflow-x-auto text-[13.5px] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: active.html }}
      />
      {active.note && (
        <p className="border-t border-stone-200 px-4 py-2.5 text-sm text-stone-600 dark:border-stone-800 dark:text-stone-400">
          <span className="font-semibold">{active.label}: </span>
          {active.note}
        </p>
      )}
    </figure>
  );
}
