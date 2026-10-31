// The light and dark theme. Without a saved choice the site follows the system setting.

export type Theme = "light" | "dark";

export const THEME_KEY = "oose-theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

/** Runs in <head> before the first paint, so the page never flashes in the wrong theme. */
export const THEME_SCRIPT = `(function(){var t;try{t=localStorage.getItem("${THEME_KEY}")}catch(e){}
if(t!=="light"&&t!=="dark")t=matchMedia("${DARK_QUERY}").matches?"dark":"light";
document.documentElement.dataset.theme=t})()`;

function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function toggleTheme() {
  const next: Theme =
    document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // Storage is blocked: the choice lasts until the page reloads.
  }
}

/** Follows changes of the system setting while the reader has not picked a theme. */
export function followSystemTheme(): () => void {
  const query = matchMedia(DARK_QUERY);
  const onChange = () => {
    if (!savedTheme()) applyTheme(query.matches ? "dark" : "light");
  };
  query.addEventListener("change", onChange);
  return () => {
    query.removeEventListener("change", onChange);
  };
}
