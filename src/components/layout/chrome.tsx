"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** The design-direction boards are full-bleed and bring their own navigation. */
export function isBareRoute(pathname: string) {
  return pathname === "/directions" || pathname.startsWith("/directions/");
}

/** Renders the site chrome (header, footer, tab bar) everywhere except on bare routes. */
export function Chrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return isBareRoute(pathname) ? null : children;
}
