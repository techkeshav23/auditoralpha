"use client";

import { useEffect } from "react";

/**
 * Sets the tab title from a page that can't export metadata (e.g. not-found).
 * Next streams the layout's default <title> in after hydration, so this also
 * re-applies the title whenever <head> changes while the page is shown.
 */
export function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    const apply = () => {
      if (document.title !== title) document.title = title;
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [title]);
  return null;
}
