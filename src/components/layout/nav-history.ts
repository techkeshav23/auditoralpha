"use client";

/**
 * Counts how many in-app screens sit behind the current one, so the app bar's
 * Back never takes someone off the site (e.g. after arriving from a shared link).
 */
const KEY = "aa:depth";
let started = false;
let poppedAt = 0;

if (typeof window !== "undefined") {
  window.addEventListener("popstate", () => {
    poppedAt = Date.now();
  });
}

function read() {
  return Number(sessionStorage.getItem(KEY) ?? 0) || 0;
}

/** Call whenever the pathname changes (including the first render). */
export function recordNavigation() {
  try {
    if (!started) {
      started = true;
      const entry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      // A fresh visit starts a new stack; a reload keeps the one we had.
      if (entry?.type !== "reload") sessionStorage.setItem(KEY, "0");
      return;
    }
    const wentBack = Date.now() - poppedAt < 1000;
    poppedAt = 0;
    sessionStorage.setItem(KEY, String(Math.max(0, read() + (wentBack ? -1 : 1))));
  } catch {
    // Storage unavailable (private mode): Back falls back to the home screen.
  }
}

export function canGoBack() {
  try {
    return read() > 0;
  } catch {
    return false;
  }
}
