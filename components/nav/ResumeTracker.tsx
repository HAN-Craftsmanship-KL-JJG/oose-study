"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { savedPlace, savePlace } from "@/lib/resume";
import { normalise } from "./PageTree";

const SAVE_DELAY_MS = 300;

/** True until the first page of this visit has been shown. */
let firstPage = true;

/**
 * Saves the page and scroll position while reading. When the site opens on the saved page
 * (the start page sends the reader there), it scrolls back to the saved position.
 */
export default function ResumeTracker() {
  const pathname = normalise(usePathname());

  useEffect(() => {
    if (pathname === "/") return; // The start page only sends the reader on.
    let frame = 0;
    let timer = 0;
    const save = () => {
      savePlace({ path: pathname, y: Math.round(window.scrollY) });
    };
    const saved = savedPlace();
    if (firstPage && !location.hash && saved?.path === pathname) {
      frame = requestAnimationFrame(() => {
        window.scrollTo({ top: saved.y, behavior: "instant" });
      });
    } else {
      // Wait until the router has scrolled the new page to the top.
      timer = window.setTimeout(save, SAVE_DELAY_MS);
    }
    firstPage = false;

    const onScroll = () => {
      clearTimeout(timer);
      timer = window.setTimeout(save, SAVE_DELAY_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", save);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pagehide", save);
    };
  }, [pathname]);

  return null;
}
