/** The colours a Label can have. Give each idea on a page its own colour. */
const TONES = {
  blue: "bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-200",
  green: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200",
  rose: "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-200",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200",
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-950/60 dark:text-violet-200",
  stone: "bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-200",
} as const;

export type LabelTone = keyof typeof TONES;

/** A small coloured pill that names what a piece of code shows, such as "Creator". */
export default function Label({
  tone = "stone",
  children,
}: {
  tone?: LabelTone | undefined;
  children: string;
}) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONES[tone]}`}
    >
      {children}
    </span>
  );
}
