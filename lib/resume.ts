"use client";

// Remembers where the reader was, so the site always opens there again.

const KEY = "oose-resume";

export interface Place {
  path: string;
  y: number;
}

function isPlace(value: unknown): value is Place {
  if (typeof value !== "object" || value === null) return false;
  const place = value as Record<string, unknown>;
  return typeof place["path"] === "string" && typeof place["y"] === "number";
}

export function savedPlace(): Place | null {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "null");
    return isPlace(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function savePlace(place: Place) {
  try {
    localStorage.setItem(KEY, JSON.stringify(place));
  } catch {
    // Storage is blocked: the site opens at the start next time.
  }
}
