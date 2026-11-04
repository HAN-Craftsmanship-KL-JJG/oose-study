import type { TraceFrame, TraceObject } from "@/lib/trace";

function frameText(f: TraceFrame): string {
  return f.on ? `${f.on}.${f.method}` : f.method;
}

/** The methods that are running now, oldest at the top; the last one is the active one. */
export function Stack({ stack }: { stack: TraceFrame[] }) {
  if (stack.length === 0) {
    return <p className="text-sm text-stone-500">The main program, outside any method.</p>;
  }
  return (
    <ol className="space-y-1 font-mono text-[13px]">
      {stack.map((f, i) => {
        const top = i === stack.length - 1;
        return (
          <li
            key={i}
            style={{ marginLeft: `${String(i * 1.25)}rem` }}
            className={`rounded-sm border px-2 py-0.5 ${
              top
                ? "border-amber-300 bg-amber-100/50 text-stone-900 dark:border-amber-700/60 dark:bg-amber-500/10 dark:text-stone-100"
                : "border-stone-200 text-stone-500 dark:border-stone-700"
            }`}
          >
            {i > 0 && "↳ "}
            {frameText(f)}
            {!top && <span className="ml-2 font-sans text-xs">(waits)</span>}
          </li>
        );
      })}
    </ol>
  );
}

/** Each object as a small UML object box: name : Class, with its fields. */
export function Objects({
  objects,
  active,
}: {
  objects: TraceObject[];
  active: string | undefined;
}) {
  if (objects.length === 0) return <p className="text-sm text-stone-500">No objects yet.</p>;
  return (
    <div className="flex flex-wrap gap-2">
      {objects.map((o) => (
        <div
          key={o.name}
          className={`min-w-32 rounded-sm border font-mono text-[13px] transition ${
            o.name === active
              ? "border-amber-300 bg-amber-100/50 dark:border-amber-700/60 dark:bg-amber-500/10"
              : "border-stone-300 dark:border-stone-700"
          }`}
        >
          <p
            className={`px-2 py-0.5 text-center underline underline-offset-2 ${o.fields ? "border-b border-inherit" : ""}`}
          >
            {o.name} : {o.class}
          </p>
          {o.fields && (
            <ul className="px-2 py-0.5 text-stone-600 dark:text-stone-400">
              {Object.entries(o.fields).map(([k, v]) => (
                <li key={k}>
                  {k} {v}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
