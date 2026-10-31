"use client";

import { useEffect, useRef } from "react";
import PageTree, { revealActive } from "./nav/PageTree";
import { useSections } from "./nav/SectionsProvider";

/** The menu on wide screens. On phones the header opens the same menu as a drawer. */
export default function Sidebar() {
  const ref = useRef<HTMLElement>(null);
  const { active } = useSections();

  useEffect(() => {
    revealActive(ref.current, active, false);
  }, [active]);

  return (
    <nav
      ref={ref}
      aria-label="Pages"
      className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain px-3 py-8 text-[15px] lg:block"
    >
      <PageTree />
    </nav>
  );
}
