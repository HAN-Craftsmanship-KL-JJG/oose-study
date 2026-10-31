// Class names that several components share. Calm and quiet: the focus is the content.

export const card =
  "rounded-sm border border-stone-200 bg-[#fffdf8] dark:border-stone-800 dark:bg-stone-900";

export const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-sm bg-accent-700 px-4 py-2 text-sm " +
  "font-medium text-white transition-colors hover:bg-accent-800 disabled:cursor-not-allowed " +
  "disabled:opacity-40 dark:bg-accent-600 dark:hover:bg-accent-500";

/** Quiet green and red borders for checked answers. */
export function resultStyle(checked: boolean, ok: boolean): string {
  if (!checked) return "border-stone-200 dark:border-stone-700";
  return ok
    ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/30"
    : "border-rose-300 bg-rose-50/60 dark:border-rose-800 dark:bg-rose-950/30";
}

/** A thin progress bar fill. */
export const barFill =
  "block h-full rounded-full bg-accent-600/70 transition-all dark:bg-accent-400/70";
