import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { isValidElement, type ComponentPropsWithoutRef, type ReactElement } from "react";
import Callout from "@/components/Callout";
import Checklist from "@/components/Checklist";
import { Compare, Side } from "@/components/Compare";
import Example from "@/components/Example";
import UmlSymbol from "@/components/UmlSymbol";
import Questions from "@/components/quiz/Questions";
import Reveal from "@/components/Reveal";
import Uml from "@/components/Uml";
import { highlight } from "@/lib/highlight";

async function highlightOrNull(text: string, lang: string): Promise<string | null> {
  try {
    return await highlight(text, lang);
  } catch {
    return null; // Unknown language: show it without colours.
  }
}

// A fenced code block with the language "plantuml" becomes a UML diagram.
// Other fenced code blocks get syntax colours.
async function Pre(props: ComponentPropsWithoutRef<"pre">) {
  const child = props.children;
  if (!isValidElement(child)) return <pre {...props} />;
  const code = child as ReactElement<{ className?: string; children?: unknown }>;
  const lang = code.props.className?.replace("language-", "");
  const text = code.props.children;
  if (!lang || typeof text !== "string") return <pre {...props} />;
  if (lang === "plantuml") return <Uml source={text} />;
  const html = await highlightOrNull(text, lang);
  if (html === null) return <pre {...props} />;
  return (
    <div
      className="not-prose my-6 overflow-x-auto rounded-sm border border-stone-200 text-[13.5px] leading-relaxed dark:border-stone-800 [&_pre]:min-w-fit [&_pre]:p-5"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// A link to another page goes through next/link, so it gets the base path on GitHub Pages.
function A({ href, children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (href?.startsWith("/")) return <Link href={href}>{children}</Link>;
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

const components: MDXComponents = {
  a: A,
  pre: Pre,
  Callout,
  Checklist,
  Compare,
  Example,
  UmlSymbol,
  Questions,
  Reveal,
  Side,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
