import { Fragment, type ReactNode } from "react";
import UmlSymbol, { isSymbolKind } from "../UmlSymbol";

// A UML symbol: `{{kind}}`, `{{kind label}}` such as `{{frame alt}}`,
// or `{{kind From To}}` such as `{{generalization A B}}`.
function symbol(token: string): ReactNode {
  const [kind = "", first, second] = token.slice(2, -2).trim().split(/\s+/);
  if (!isSymbolKind(kind)) return token;
  if (first !== undefined && second !== undefined) {
    return <UmlSymbol kind={kind} from={first} to={second} />;
  }
  return <UmlSymbol kind={kind} {...(first === undefined ? {} : { label: first })} />;
}

function part(text: string, key: number): ReactNode {
  if (text.startsWith("{{") && text.endsWith("}}")) {
    return <Fragment key={key}>{symbol(text)}</Fragment>;
  }
  if (text.startsWith("`") && text.endsWith("`") && text.length > 1) {
    return (
      <code
        key={key}
        className="rounded bg-stone-100 px-1 py-0.5 font-mono text-[0.9em] dark:bg-stone-800"
      >
        {text.slice(1, -1)}
      </code>
    );
  }
  return <Fragment key={key}>{text}</Fragment>;
}

/** Renders `inline code` and `{{symbol}}` tokens inside a line of text. */
export function Inline({ text }: { text: string }) {
  return <>{text.split(/(`[^`]+`|\{\{[^}]+\}\})/).map(part)}</>;
}

/** Paragraphs separated by a blank line, with `inline code`. */
export default function RichText({ text, className = "" }: { text: string; className?: string }) {
  const paragraphs = text.trim().split(/\n\s*\n/);
  return (
    <div className={className}>
      {paragraphs.map((p, i) => (
        <p key={i} className="my-2 first:mt-0 last:mb-0">
          <Inline text={p.replace(/\s*\n\s*/g, " ")} />
        </p>
      ))}
    </div>
  );
}
