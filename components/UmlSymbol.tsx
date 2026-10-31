import type { ReactNode } from "react";
import { LINES } from "./symbols/lines";
import { SEQUENCE } from "./symbols/sequence";
import { ACTIVITY, COMPONENT } from "./symbols/shapes";

interface SymbolDef {
  label: string;
  draw: (label?: string) => ReactNode;
}

const SYMBOLS = { ...LINES, ...SEQUENCE, ...ACTIVITY, ...COMPONENT } satisfies Record<
  string,
  SymbolDef
>;

export type SymbolKind = keyof typeof SYMBOLS;

export function isSymbolKind(kind: string): kind is SymbolKind {
  return Object.hasOwn(SYMBOLS, kind);
}

function End({ children }: { children: string }) {
  return <span className="font-mono text-[13px]">{children}</span>;
}

/**
 * A UML symbol, drawn in the text colour, for use in a table cell.
 * `label` is text inside the symbol, such as the operator of a frame.
 * `from` and `to` name the classes at the left and right end of a line.
 */
export default function UmlSymbol({
  kind,
  label,
  from,
  to,
}: {
  kind: SymbolKind;
  label?: string;
  from?: string;
  to?: string;
}) {
  const symbol: SymbolDef = SYMBOLS[kind];
  const name = label === undefined ? symbol.label : `${symbol.label}: ${label}`;
  return (
    <span className="inline-flex items-center gap-1.5 align-middle whitespace-nowrap">
      {from !== undefined && <End>{from}</End>}
      <svg role="img" aria-label={name} viewBox="0 0 72 28" width="72" height="28">
        <title>{name}</title>
        {symbol.draw(label)}
      </svg>
      {to !== undefined && <End>{to}</End>}
    </span>
  );
}
