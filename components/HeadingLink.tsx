"use client";

import { Check, Link as LinkIcon } from "lucide-react";
import { useEffect, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";

const COPIED_MS = 1500;

/** A small link next to a heading: it jumps there and copies the link to the clipboard. */
function HeadingLink({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => {
      setCopied(false);
    }, COPIED_MS);
    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  return (
    <a
      href={`#${id}`}
      aria-label={copied ? "Link copied" : "Copy a link to this section"}
      onClick={() => {
        const url = `${location.origin}${location.pathname}#${id}`;
        navigator.clipboard.writeText(url).then(
          () => {
            setCopied(true);
          },
          () => undefined, // No clipboard access: the link still jumps to the heading.
        );
      }}
      className="not-prose ml-2 inline-flex translate-y-[-0.1em] align-middle text-stone-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-accent-700 focus-visible:opacity-100 dark:hover:text-accent-300 [@media(hover:none)]:opacity-60"
    >
      {copied ? <Check className="size-[0.6em]" /> : <LinkIcon className="size-[0.6em]" />}
    </a>
  );
}

type HeadingProps = ComponentPropsWithoutRef<"h2"> & { children?: ReactNode };

export function H2({ id, children, ...props }: HeadingProps) {
  return (
    <h2 id={id} className="group" {...props}>
      {children}
      {id && <HeadingLink id={id} />}
    </h2>
  );
}

export function H3({ id, children, ...props }: HeadingProps) {
  return (
    <h3 id={id} className="group" {...props}>
      {children}
      {id && <HeadingLink id={id} />}
    </h3>
  );
}
