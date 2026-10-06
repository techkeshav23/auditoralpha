"use client";

import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { recordNavigation } from "./nav-history";

/** The design-direction boards are full-bleed and bring their own navigation. */
export function isBareRoute(pathname: string) {
  return pathname === "/directions" || pathname.startsWith("/directions/");
}

/** Renders the site chrome (header, footer, tab bar) everywhere except on bare routes. */
export function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return isBareRoute(pathname) ? null : children;
}

/**
 * Tracks in-app navigation depth on every route, including bare ones, so the
 * app bar's Back and Close always know whether there is a screen to return to.
 */
export function NavRecorder() {
  const pathname = usePathname();
  useEffect(() => {
    recordNavigation();
  }, [pathname]);
  return null;
}
