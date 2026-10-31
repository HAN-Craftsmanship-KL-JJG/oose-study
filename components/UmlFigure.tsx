"use client";

import { Maximize2, Minimize2, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";

const fade = "pointer-events-none absolute inset-y-0 w-10 transition-opacity";
const toolButton =
  "inline-flex items-center gap-1.5 rounded-sm border border-stone-200 bg-[#fffdf8] px-3 py-1.5 " +
  "text-sm shadow-sm dark:border-stone-700 dark:bg-stone-900";

/**
 * A diagram that is wider than the page scrolls sideways. A fade shows at the side where more
 * of it is hidden, and a button opens it full screen.
 */
export default function UmlFigure({ svg, minWidth }: { svg: string; minWidth: number }) {
  const scroller = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });
  const [open, setOpen] = useState(false);
  const [realSize, setRealSize] = useState(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () => {
      const start = el.scrollLeft > 1;
      const end = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
      setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
    };
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    if (open) dialog.current?.showModal();
  }, [open]);

  const style = { "--uml-min": `${String(minWidth)}px` } as CSSProperties;
  return (
    <figure className="not-prose relative my-8 overflow-hidden rounded-sm border border-stone-200 bg-[#fffdf8] dark:border-stone-800 dark:bg-stone-900">
      <div
        ref={scroller}
        style={style}
        className="uml overflow-x-auto p-5"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <span
        aria-hidden
        className={`${fade} left-0 bg-linear-to-r from-[#fffdf8] dark:from-stone-900 ${edges.start ? "opacity-100" : "opacity-0"}`}
      />
      <span
        aria-hidden
        className={`${fade} right-0 bg-linear-to-l from-[#fffdf8] dark:from-stone-900 ${edges.end ? "opacity-100" : "opacity-0"}`}
      />
      {(edges.start || edges.end) && (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}
          className="absolute top-2 right-2 inline-flex items-center gap-1.5 rounded-sm border border-stone-200 bg-[#fffdf8]/95 px-2 py-1 text-xs text-stone-600 shadow-sm hover:text-stone-900 dark:border-stone-700 dark:bg-stone-900/95 dark:text-stone-300 dark:hover:text-stone-100"
        >
          <Maximize2 className="size-3.5" />
          Enlarge
        </button>
      )}
      {open && (
        <dialog
          ref={dialog}
          aria-label="Diagram"
          onClose={() => {
            setOpen(false);
          }}
          className="m-0 h-dvh max-h-none w-screen max-w-none bg-[#fbf8f1] p-0 text-stone-900 backdrop:bg-black/40 dark:bg-[#1a1814] dark:text-stone-100"
        >
          <div className="flex h-full flex-col">
            <form method="dialog" className="flex shrink-0 justify-end gap-2 p-2">
              <button
                type="button"
                onClick={() => {
                  setRealSize(!realSize);
                }}
                className={toolButton}
              >
                {realSize ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                {realSize ? "Fit to screen" : "Real size"}
              </button>
              <button type="submit" autoFocus className={toolButton}>
                <X className="size-4" />
                Close
              </button>
            </form>
            <div
              className={`uml min-h-0 flex-1 overflow-auto px-4 pb-4 ${realSize ? "uml-real" : "uml-fit"}`}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        </dialog>
      )}
    </figure>
  );
}
