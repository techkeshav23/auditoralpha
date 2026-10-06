"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useSeen } from "../hooks";

/** A card lit by a soft lamp that follows the pointer; on touch it lights up as it scrolls into view. */
export function Spotlight({
  className,
  index = 0,
  children,
}: {
  className?: string;
  index?: number;
  children: ReactNode;
}) {
  const [ref, seen] = useSeen<HTMLElement>(0.45);
  return (
    <article
      ref={ref}
      className={cn("na-spot", seen && "is-seen", className)}
      style={{ "--i": index } as CSSProperties}
      onPointerMove={(e) => {
        const box = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
      }}
    >
      {children}
    </article>
  );
}
