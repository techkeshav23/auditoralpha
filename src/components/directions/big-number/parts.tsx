import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { LEGAL_DOCS } from "@/lib/site";
import { LEGAL_LINES } from "../data";

export const wrap =
  "mx-auto w-full max-w-[1440px] px-[max(1rem,env(safe-area-inset-left))] sm:px-[clamp(24px,3vw,48px)]";

/** Rolls each digit into place like a mechanical counter. Pure CSS; lands on the final value without motion. */
export function Odometer({ value, className }: { value: string; className?: string }) {
  let digit = 0;
  return (
    <span aria-hidden className={cn("bn-odo", className)}>
      {[...value].map((ch, i) => {
        if (!/\d/.test(ch)) {
          return (
            <span key={i} className={ch === "£" ? "bn-odo-sym" : "bn-odo-sep"}>
              {ch}
            </span>
          );
        }
        const style = { "--d": Number(ch), "--i": digit++ } as CSSProperties;
        return (
          <span key={i} className="bn-digit" style={style}>
            <span className="bn-strip">
              {Array.from({ length: 20 }, (_, n) => (
                <span key={n}>{n % 10}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}

export function Fig({ no, children, className }: { no: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("bn-mono flex gap-4 text-[10.5px] tracking-[0.12em] uppercase", className)}>
      <span className="bn-fig-no shrink-0 whitespace-nowrap">Fig. {no}</span>
      <span>{children}</span>
    </p>
  );
}

export function BlockButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("bn-btn group", className)}>
      <span>{children}</span>
      <span className="bn-btn-arrow" aria-hidden>
        <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function Wordmark() {
  return (
    <Link href="#top" className="flex items-center gap-2.5" aria-label="Auditor Alpha, home">
      <span className="size-3.5 bg-(--bn-red)" aria-hidden />
      <span className="bn-wordmark">Auditor Alpha</span>
    </Link>
  );
}

const NAV = [
  { href: "#leaks", no: "01", label: "What it finds" },
  { href: "#how", no: "02", label: "How it works" },
];

export function Masthead() {
  return (
    <header role="banner" className="sticky top-0 z-40 border-b-2 border-(--bn-ink) bg-(--bn-paper)">
      <div className="bn-mono hidden border-b border-(--bn-rule) text-[10.5px] tracking-[0.12em] uppercase lg:block">
        <div className={cn(wrap, "flex h-9 items-center justify-between")}>
          <span>Revenue assurance for HubSpot + Xero</span>
          <span>Every closed deal · every invoice · every two hours</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 animate-pulse bg-(--bn-red)" aria-hidden />
            Live
          </span>
        </div>
      </div>
      <div className={cn(wrap, "flex h-14 items-center gap-10 lg:h-[72px]")}>
        <Wordmark />
        <nav aria-label="Primary" className="ml-auto hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="bn-navlink">
              <span className="bn-mono text-[10px] text-(--bn-red-ink)">{n.no}</span>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link href="#start" className="bn-btn bn-btn-sm max-lg:hidden">
          <span>Free Health Check</span>
        </Link>
      </div>
    </header>
  );
}

export function NumberFooter() {
  return (
    <footer role="contentinfo" className="border-t-2 border-(--bn-ink) pt-10 pb-10 lg:pb-24">
      <div className={cn(wrap, "grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12")}>
        <div className="lg:col-span-7">
          <Wordmark />
          <div className="mt-4 max-w-[72ch] space-y-1 text-[13px] leading-relaxed text-(--bn-grey)">
            {LEGAL_LINES.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
        <ul className="bn-mono flex flex-wrap content-end gap-x-6 text-[10.5px] tracking-[0.1em] uppercase lg:col-span-5 lg:justify-end">
          {LEGAL_DOCS.map((d) => (
            <li key={d.href}>
              <a href={d.href} target="_blank" rel="noreferrer" className="inline-block py-2 hover:text-(--bn-red-ink)">
                {d.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
