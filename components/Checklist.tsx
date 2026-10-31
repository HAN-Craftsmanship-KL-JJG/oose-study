"use client";

import { ListChecks } from "lucide-react";
import { createStoredValue, type StoredValue } from "@/lib/storage";
import { barFill, card } from "@/lib/ui";
import { Inline } from "./quiz/RichText";

function isBooleanList(value: unknown): value is boolean[] {
  return Array.isArray(value) && value.every((v) => typeof v === "boolean");
}

const stores = new Map<string, StoredValue<boolean[]>>();

function storeFor(id: string) {
  let store = stores.get(id);
  if (!store) {
    store = createStoredValue<boolean[]>(`oose-check-${id}`, [], isBooleanList);
    stores.set(id, store);
  }
  return store;
}

/** A list of checkboxes that the browser remembers. `id` must be unique on the site. */
export default function Checklist({
  id,
  title,
  items,
}: {
  id: string;
  title?: string;
  items: string[];
}) {
  const store = storeFor(id);
  const saved = store.useValue();
  const done = items.map((_, i) => saved[i] === true);
  const count = done.filter(Boolean).length;

  function toggle(i: number) {
    store.set(done.map((d, j) => (j === i ? !d : d)));
  }

  return (
    <div className={`${card} not-prose my-8 p-5`}>
      <div className="mb-3 flex items-center gap-3">
        <ListChecks className="size-5 text-stone-400" aria-hidden />
        <span className="flex-1 font-semibold">{title ?? "Checklist"}</span>
        <span className="text-sm text-stone-500 tabular-nums">
          {count} / {items.length}
        </span>
      </div>
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
        <div
          className={barFill}
          style={{ width: `${String((count / Math.max(items.length, 1)) * 100)}%` }}
        />
      </div>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={item}>
            <label className="flex cursor-pointer items-start gap-3 rounded-sm px-2 py-1.5 transition hover:bg-stone-50 dark:hover:bg-stone-800/60">
              <input
                type="checkbox"
                checked={done[i]}
                onChange={() => {
                  toggle(i);
                }}
                className="mt-1 size-4 accent-emerald-600"
              />
              <span className={done[i] ? "text-stone-400 line-through" : ""}>
                <Inline text={item} />
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
