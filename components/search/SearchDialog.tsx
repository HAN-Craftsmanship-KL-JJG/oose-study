"use client";

import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { hitHref, queryWords, search, snippet } from "@/lib/search";
import type { SearchEntry } from "@/lib/search-index";

let indexRequest: Promise<SearchEntry[]> | null = null;

/** Loads the index once per visit. A failed load is tried again on the next open. */
function loadIndex(): Promise<SearchEntry[]> {
  indexRequest ??= fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/search-index.json`)
    .then((response) => {
      if (!response.ok) throw new Error(`Search index: ${String(response.status)}`);
      return response.json() as Promise<SearchEntry[]>;
    })
    .catch((error: unknown) => {
      indexRequest = null;
      throw error;
    });
  return indexRequest;
}

const hitClass =
  "block rounded-sm px-3 py-2 aria-selected:bg-accent-50 dark:aria-selected:bg-accent-950/60";

export default function SearchDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    dialog.current?.showModal();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    loadIndex().then(setIndex, () => {
      setFailed(true);
    });
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    document.getElementById(`search-hit-${String(selected)}`)?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const hits = useMemo(() => (index ? search(index, query) : []), [index, query]);
  const words = queryWords(query);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const step = e.key === "ArrowDown" ? 1 : -1;
      setSelected((s) => Math.min(Math.max(s + step, 0), Math.max(hits.length - 1, 0)));
    } else if (e.key === "Enter" && hits[selected]) {
      e.preventDefault();
      router.push(hitHref(hits[selected]));
      onClose();
    }
  };

  let status: string | null = null;
  if (failed) status = "The search could not load. Check the connection and try again.";
  else if (!index) status = "Loading…";
  else if (words.length > 0 && hits.length === 0) status = "Nothing found.";

  return (
    <dialog
      ref={dialog}
      aria-label="Search"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) dialog.current?.close();
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-[#fbf8f1] p-0 text-stone-900 backdrop:bg-black/40 sm:bottom-auto sm:mx-auto sm:mt-[10vh] sm:h-auto sm:max-h-[75vh] sm:w-[min(40rem,calc(100vw-2rem))] sm:rounded-sm sm:border sm:border-stone-200 sm:shadow-xl dark:bg-[#1a1814] dark:text-stone-100 sm:dark:border-stone-800"
    >
      <div className="flex max-h-[inherit] flex-col max-sm:h-full">
        <div className="flex shrink-0 items-center gap-3 border-b border-stone-200 px-4 dark:border-stone-800">
          <SearchIcon className="size-5 shrink-0 text-stone-400" />
          <input
            autoFocus
            type="text"
            enterKeyHint="search"
            value={query}
            placeholder="Search the theory"
            aria-label="Search the theory"
            aria-controls="search-results"
            aria-activedescendant={hits.length > 0 ? `search-hit-${String(selected)}` : undefined}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            onKeyDown={onKeyDown}
            className="h-14 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-stone-400"
          />
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            className="text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
          >
            Close
          </button>
        </div>
        <ul
          id="search-results"
          role="listbox"
          className={`min-h-0 flex-1 overflow-y-auto p-2 ${hits.length === 0 ? "hidden" : ""}`}
        >
          {hits.map((hit, i) => (
            <li
              key={`${hit.href}#${hit.id ?? ""}`}
              id={`search-hit-${String(i)}`}
              role="option"
              aria-selected={i === selected}
              className={hitClass}
              onMouseMove={() => {
                if (i !== selected) setSelected(i);
              }}
            >
              <Link href={hitHref(hit)} onClick={onClose} tabIndex={-1} className="block">
                <span className="block text-xs text-stone-500">{hit.page}</span>
                <span className="block font-medium">{hit.heading ?? hit.page}</span>
                <span className="line-clamp-2 block text-sm text-stone-600 dark:text-stone-400">
                  {snippet(hit.text, words).map((part, j) =>
                    part.match ? (
                      <mark
                        key={j}
                        className="rounded-[2px] bg-accent-100 text-inherit dark:bg-accent-800"
                      >
                        {part.text}
                      </mark>
                    ) : (
                      part.text
                    ),
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {status && <p className="px-5 py-4 text-sm text-stone-500">{status}</p>}
      </div>
    </dialog>
  );
}
