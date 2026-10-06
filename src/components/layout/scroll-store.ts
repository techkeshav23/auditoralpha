"use client";

import { useSyncExternalStore } from "react";

// One passive, rAF-throttled scroll listener shared by every subscriber.
const listeners = new Set<() => void>();
let frame = 0;

function onScroll() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    listeners.forEach((notify) => notify());
  });
}

function subscribe(notify: () => void) {
  if (listeners.size === 0) window.addEventListener("scroll", onScroll, { passive: true });
  listeners.add(notify);
  return () => {
    listeners.delete(notify);
    if (listeners.size === 0) window.removeEventListener("scroll", onScroll);
  };
}

/** True once the page has scrolled past `offset`; re-renders only when that flips. */
export function useScrolled(offset = 8) {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > offset,
    () => false,
  );
}
