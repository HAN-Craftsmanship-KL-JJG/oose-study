"use client";

import { useSyncExternalStore } from "react";

/** A value saved in localStorage that React components can read and that updates them on change. */
export interface StoredValue<T> {
  get: () => T;
  set: (value: T) => void;
  useValue: () => T;
}

export function createStoredValue<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
): StoredValue<T> {
  let cache: T | undefined;
  const listeners = new Set<() => void>();

  function get(): T {
    if (cache === undefined) {
      try {
        const raw = localStorage.getItem(key);
        const parsed: unknown = raw === null ? undefined : JSON.parse(raw);
        cache = isValid(parsed) ? parsed : fallback;
      } catch {
        cache = fallback;
      }
    }
    return cache;
  }

  function set(value: T) {
    cache = value;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage is blocked: the value lasts until the page reloads.
    }
    listeners.forEach((listener) => {
      listener();
    });
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  function useValue(): T {
    return useSyncExternalStore(subscribe, get, () => fallback);
  }

  return { get, set, useValue };
}
