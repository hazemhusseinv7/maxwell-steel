"use client";

import { useState } from "react";

let storageAvailable: boolean | null = null;
let warned = false;

function checkStorage(): boolean {
  try {
    if (typeof window === "undefined") return true;
    if (storageAvailable !== null) return storageAvailable;
    window.sessionStorage.setItem("__maqrat_probe__", "1");
    window.sessionStorage.removeItem("__maqrat_probe__");
    storageAvailable = true;
  } catch {
    storageAvailable = false;
  }
  if (!storageAvailable && process.env.NODE_ENV !== "production" && !warned) {
    warned = true;
    console.warn(
      "[usePersistentState] sessionStorage is unavailable (private mode, " +
        "blocked site data, or quota). Values are in-memory only and will " +
        "not survive reloads.",
    );
  }
  return storageAvailable;
}
export function usePersistentState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      if (!checkStorage()) return initial;
      const raw = window.sessionStorage.getItem(key);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });

  function set(next: T | ((prev: T) => T)) {
    setValue((prev) => {
      const resolved =
        typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      try {
        if (checkStorage()) {
          window.sessionStorage.setItem(key, JSON.stringify(resolved));
        }
      } catch {
        return resolved;
      }
      return resolved;
    });
  }

  return [value, set] as const;
}
