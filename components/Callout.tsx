import { Info, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface Style {
  label: string;
  icon: LucideIcon;
  box: string;
  text: string;
}

const STYLES: Record<"note", Style> = {
  note: {
    label: "Note",
    icon: Info,
    box: "border-sky-500/60 bg-sky-50/50 dark:bg-sky-950/20",
    text: "text-sky-800 dark:text-sky-300",
  },
};

export default function Callout({
  type = "note",
  title,
  children,
}: {
  type?: keyof typeof STYLES;
  title?: string;
  children: ReactNode;
}) {
  const style = STYLES[type];
  const Icon = style.icon;
  return (
    <aside className={`not-prose my-8 rounded-r-lg border-l-4 px-5 py-4 ${style.box}`}>
      <div className="min-w-0">
        <p className={`mb-1 flex items-center gap-2 text-sm font-semibold ${style.text}`}>
          <Icon className="size-4" aria-hidden />
          {title ?? style.label}
        </p>
        <div className="prose max-w-none text-base prose-stone dark:prose-invert prose-p:my-1.5 prose-code:before:content-none prose-code:after:content-none prose-ul:my-1.5 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      </div>
    </aside>
  );
}
