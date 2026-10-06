import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ink" | "outline" | "line";
type Size = "sm" | "md" | "lg";

export function buttonClasses({
  variant = "primary",
  size = "md",
  full = false,
  className,
}: { variant?: Variant; size?: Size; full?: boolean; className?: string } = {}) {
  return cn(
    "group inline-flex items-center justify-center gap-2.5 leading-none font-semibold whitespace-nowrap select-none",
    "transition-[background-color,border-color,box-shadow,transform] duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60",
    size === "sm" && "rounded-lg px-[15px] py-[11px] text-sm",
    size === "md" && "rounded-[10px] px-[22px] py-4 text-[15px]",
    size === "lg" && "rounded-xl px-6 py-[18px] text-base",
    variant === "primary" &&
      "bg-blue text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_10px_24px_-10px_rgb(36_86_245/0.7)] hover:bg-blue-ink",
    variant === "ink" && "bg-ink text-white hover:bg-[#1b2950]",
    variant === "outline" && "border border-rule bg-card text-ink hover:border-ink",
    variant === "line" && "border border-white/25 text-white hover:bg-white/10",
    full && "w-full",
    className,
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("size-4 transition-transform duration-200 group-hover:translate-x-[3px]", className)}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({ variant, size, full, arrow, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link {...props} className={buttonClasses({ variant, size, full, className })}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex items-center gap-2 border-b-[1.5px] border-rule pb-[3px] font-semibold text-ink transition-colors hover:border-ink",
        className,
      )}
    >
      {children}
    </Link>
  );
}
