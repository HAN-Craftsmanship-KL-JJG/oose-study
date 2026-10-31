import { CircleCheck, CircleMinus, CircleX, RotateCcw } from "lucide-react";
import RichText from "./RichText";

const STATES = {
  right: {
    title: "Right!",
    icon: CircleCheck,
    box: "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-50",
  },
  wrong: {
    title: "Not right.",
    icon: CircleX,
    box: "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-50",
  },
  open: {
    title: "Not answered.",
    icon: CircleMinus,
    box: "border-stone-200 bg-stone-50 text-stone-900 dark:border-stone-800 dark:bg-stone-800/50 dark:text-stone-100",
  },
} as const;

/** The result and the explanation, shown after checking. */
export default function Feedback({
  result,
  explain,
  onRetry,
}: {
  result: boolean | null;
  explain: string;
  onRetry?: (() => void) | undefined;
}) {
  const state = STATES[result === null ? "open" : result ? "right" : "wrong"];
  const Icon = state.icon;
  return (
    <div className={`mx-5 mb-5 rounded-sm border px-4 py-3 text-[15px] ${state.box}`}>
      <p className="mb-1 flex items-center gap-2 text-base font-semibold">
        <Icon className="size-5" aria-hidden />
        {state.title}
      </p>
      <RichText text={explain} />
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 inline-flex items-center gap-1.5 rounded-sm border border-current px-3 py-1 text-sm font-semibold opacity-80 transition hover:opacity-100"
        >
          <RotateCcw className="size-3.5" aria-hidden />
          Try again
        </button>
      )}
    </div>
  );
}
