import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container, Eyebrow } from "./section";

/** Top-of-page header for inner pages, on the same ledger-paper backdrop as the home hero. */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  aside,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("relative isolate overflow-hidden border-b border-rule pt-6 pb-10 md:pt-20 md:pb-20", className)}
    >
      <div aria-hidden className="ledger-lines fade-down absolute inset-0 -z-10" />
      <Container className={cn("grid items-center gap-12", aside && "lg:grid-cols-[1.1fr_.9fr] lg:gap-16")}>
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-[21ch] text-[clamp(34px,9vw,44px)] leading-[1.02] md:mt-5 md:text-[clamp(40px,5.4vw,70px)]">
            {title}
          </h1>
          {lede && <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-ink-2 md:text-[19px]">{lede}</p>}
          {children && <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">{children}</div>}
        </div>
        {aside && <div className="relative">{aside}</div>}
      </Container>
    </section>
  );
}
