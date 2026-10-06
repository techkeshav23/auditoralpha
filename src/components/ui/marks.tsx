import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Hand-drawn audit tick. With `draw`, it inks in when an ancestor gets `.is-drawn`. */
export function Tick({ className, draw = false }: { className?: string; draw?: boolean }) {
  return (
    <svg
      viewBox="0 0 18 15"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("shrink-0 overflow-visible", draw && "draw", className)}
    >
      <path pathLength={100} d="M2 8.5C4 10 5.6 11.6 7 13.5 9.6 8.6 13 4.6 16.5 1.8" />
    </svg>
  );
}

/** Auditor's red-pen ring drawn around a figure. Parent must be `relative`. */
export function PenCircle({ className, draw = false }: { className?: string; draw?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 40"
      preserveAspectRatio="none"
      aria-hidden
      className={cn(
        "pointer-events-none absolute -inset-x-[11px] -inset-y-[9px] h-[calc(100%+18px)] w-[calc(100%+22px)] overflow-visible",
        draw && "draw",
        className,
      )}
    >
      <path
        pathLength={100}
        vectorEffect="non-scaling-stroke"
        fill="none"
        stroke="var(--color-red)"
        strokeWidth={1.6}
        strokeLinecap="round"
        d="M10 24C8 10 50 3 96 7c24 3 22 23-8 28-30 5-74 3-82-9C1 18 14 9 34 6"
      />
    </svg>
  );
}

export function FlagMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 15"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <path d="M4 14V1.5M4 2h9l-2 3.2 2 3.3H4" />
    </svg>
  );
}

/** Green tick used as a list bullet. */
export function TickItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <li className={cn("flex items-start gap-2.5 leading-[1.4]", className)}>
      <Tick className="mt-[3px] h-3 w-[15px] text-green" />
      <span>{children}</span>
    </li>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return <span className={cn("inline-block size-[7px] shrink-0 animate-ping-dot rounded-full bg-green", className)} />;
}
