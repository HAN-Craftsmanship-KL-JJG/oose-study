"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { followSystemTheme, toggleTheme } from "@/lib/theme";

export const iconButton =
  "rounded-sm p-2 text-stone-500 transition-colors hover:text-stone-900 dark:text-stone-400 " +
  "dark:hover:text-stone-100";

/** Switches between the light and the dark theme. CSS picks the icon, so it is right at once. */
export default function ThemeToggle() {
  useEffect(followSystemTheme, []);
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Switch between the light and the dark theme"
      title="Light or dark"
      className={iconButton}
    >
      <Moon className="size-5 dark:hidden" />
      <Sun className="hidden size-5 dark:block" />
    </button>
  );
}
