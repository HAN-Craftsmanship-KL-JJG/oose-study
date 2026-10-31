"use client";

// Saves which questions a student answered right, in the browser.

import { createStoredValue } from "./storage";

/** Question id → was the last answer right? */
export type Progress = Record<string, boolean>;

function isProgress(value: unknown): value is Progress {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const store = createStoredValue<Progress>("oose-progress", {}, isProgress);

export function recordResult(id: string, correct: boolean) {
  store.set({ ...store.get(), [id]: correct });
}

export const useProgress = store.useValue;
