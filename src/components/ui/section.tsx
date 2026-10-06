import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        // Gutters grow to clear the notch when a phone is held sideways.
        "mx-auto w-full max-w-[1200px] px-[max(1rem,env(safe-area-inset-left))] sm:px-[max(1.5rem,env(safe-area-inset-left))]",
        className,
      )}
    >
      {children}
    </div>
  );
}

type Tone = "paper" | "white" | "sand" | "ink";

export function Section({
  id,
  tone = "paper",
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-14 md:py-28",
        tone === "white" && "border-y border-rule bg-card",
        tone === "sand" && "bg-paper-2",
        tone === "ink" && "on-dark isolate overflow-hidden bg-ink text-[#b9c0d2]",
        className,
      )}
    >
      {tone === "ink" && <div aria-hidden className="ledger-lines-dark absolute inset-0 -z-10" />}
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  center,
}: {
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  // "03 – How a flag is made": the section number only shows on desktop, where every section is present.
  const numbered = typeof children === "string" ? /^(\d{2}) – (.+)$/.exec(children) : null;
  return (
    <span
      className={cn(
        "flex items-center gap-2.5 font-mono text-xs font-medium tracking-[0.09em] text-muted uppercase before:h-px before:w-[22px] before:bg-current",
        center && "justify-center after:h-px after:w-[22px] after:bg-current",
        className,
      )}
    >
      {numbered ? (
        <span>
          <span className="max-lg:hidden">{numbered[1]} – </span>
          {numbered[2]}
        </span>
      ) : (
        children
      )}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  className,
  as: Tag = "h2",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-[880px]", className)}>
      {eyebrow && <Eyebrow className="[.on-dark_&]:text-[#8e97ae]">{eyebrow}</Eyebrow>}
      <Tag
        className={cn(
          "mt-[18px] leading-[1.04]",
          Tag === "h1"
            ? "text-[clamp(42px,5.4vw,72px)] leading-[1.02]"
            : "text-[clamp(28px,7.4vw,40px)] md:text-[clamp(34px,4.3vw,56px)]",
        )}
      >
        {title}
      </Tag>
      {lede && (
        <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-ink-2 md:mt-5 md:text-lg [.on-dark_&]:text-[#b9c0d2]">
          {lede}
        </p>
      )}
    </div>
  );
}
