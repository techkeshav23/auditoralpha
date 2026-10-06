"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { TAB_ROUTES } from "@/lib/site";
import { isBareRoute } from "@/components/layout/chrome";

/**
 * Re-mounts on every navigation. On phones, tab screens fade in and pushed
 * screens slide in from the right, like a native navigation stack.
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Bare routes have their own fixed bars, so they fade without a transform (which would
  // make this wrapper the containing block for position: fixed).
  if (isBareRoute(pathname)) return <div className="animate-fade-in">{children}</div>;
  const pushed = !TAB_ROUTES.includes(pathname);
  return <div className={pushed ? "animate-page-in max-lg:animate-push-in" : "animate-page-in"}>{children}</div>;
}
