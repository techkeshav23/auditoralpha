"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useSeen } from "../hooks";

/** Holds the printer's CSS animations until it scrolls into view, so phones see it print. */
export function PrintOnView({
  className,
  label,
  children,
}: {
  className?: string;
  label: string;
  children: ReactNode;
}) {
  const [ref, seen] = useSeen<HTMLDivElement>(0.3);
  return (
    <div ref={ref} role="img" aria-label={label} className={cn(className, seen && "is-printing")}>
      {children}
    </div>
  );
}
