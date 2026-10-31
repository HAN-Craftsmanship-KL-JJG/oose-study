"use client";

import { useEffect, useState } from "react";

/** Scrolls smaller than this are jitter, not a change of direction. */
const MIN_DELTA = 6;
/** Near the top of the page the header always shows. */
const TOP = 56;

/** True while the reader scrolls down, false as soon as they scroll back up. */
export function useHideOnScroll(): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - last;
      if (Math.abs(delta) < MIN_DELTA && y > TOP) return;
      setHidden(delta > 0 && y > TOP);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return hidden;
}
