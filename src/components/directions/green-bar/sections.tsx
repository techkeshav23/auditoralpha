import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { LEGAL_DOCS, SITE } from "@/lib/site";
import { ASSURANCES, HEALTH_CHECK, LEGAL_LINES } from "../data";
import { Printout } from "./printout";
import { RunStubs, StampSheet } from "./stamp-sheet";

export const gbWrap = "mx-auto w-full max-w-[1320px] px-[max(1rem,env(safe-area-inset-left))] sm:px-8";

export function Keycap({
  href,
  children,
  tone = "red",
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: "red" | "cream";
  className?: string;
}) {
  return (
    <Link href={href} className={cn("gb-keycap", tone === "cream" && "is-cream", className)}>
      {children}
    </Link>
  );
}

function Wordmark() {
  return (
    <Link href="#top" className="flex items-center gap-2.5" aria-label="Auditor Alpha, home">
      <span className="gb-holes" aria-hidden>
        <i />
        <i />
      </span>
      <span className="gb-cond text-[19px] font-bold tracking-[0.02em] uppercase">Auditor Alpha</span>
    </Link>
  );
}

const NAV = [
  { href: "#leaks", label: "What gets stamped" },
  { href: "#how", label: "How it works" },
];

export function GreenNav() {
  return (
    <header role="banner" className="gb-nav sticky top-0 z-40">
      <div className={cn(gbWrap, "flex h-14 items-center gap-10 lg:h-[72px]")}>
        <Wordmark />
        <nav
          aria-label="Primary"
          className="gb-mono ml-auto hidden gap-8 text-[12.5px] tracking-[0.08em] uppercase lg:flex"
        >
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="opacity-75 transition-opacity hover:opacity-100">
              {n.label}
            </Link>
          ))}
        </nav>
        <Keycap href="#start" tone="cream" className="gb-keycap-sm max-lg:hidden">
          Free Health Check
        </Keycap>
      </div>
    </header>
  );
}

export function GreenHero() {
  return (
    <section className="gb-hero relative isolate overflow-hidden">
      <div
        className={cn(
          gbWrap,
          "grid grid-cols-[minmax(0,1fr)] gap-y-10 pt-10 pb-16 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0 lg:pt-20 lg:pb-24",
        )}
      >
        <div className="lg:col-span-6 lg:row-start-1 lg:pt-6">
          <p className="gb-mono gb-boot flex items-center gap-2 text-[11.5px] tracking-[0.12em] text-(--gb-phosphor) uppercase">
            <span className="gb-cursor" aria-hidden />
            Revenue Health Check<span className="max-sm:hidden"> · printed every two hours</span>
          </p>
          <h1 className="gb-h1 mt-6">
            <span className="block">Closed in HubSpot.</span>
            <span className="block">Missing in Xero.</span>
            <span className="block text-(--gb-phosphor)">
              Caught before <span className="whitespace-nowrap">month-end.</span>
            </span>
          </h1>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
          <Printout />
        </div>
        <div className="lg:col-span-6 lg:row-start-2">
          <p className="gb-boot max-w-[46ch] text-[17px] leading-relaxed text-(--gb-cream)/75 lg:mt-7 lg:text-[18.5px]">
            Auditor Alpha reconciles every closed deal against your Xero invoices every two hours, and stamps anything
            never billed, billed short, billed without VAT or billed twice.
          </p>
          <div className="gb-boot mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Keycap href="#start" className="max-sm:w-full">
              Start your free 7-day Health Check
            </Keycap>
            <Link href="#leaks" className="gb-link">
              See what gets stamped
            </Link>
          </div>
          <ul className="gb-mono gb-boot mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11.5px] tracking-[0.06em] text-(--gb-cream)/60 uppercase">
            {ASSURANCES.map((a) => (
              <li key={a}>
                <span className="text-(--gb-phosphor)">[✓]</span> {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function StampSection() {
  return (
    <section id="leaks" className="gb-feed relative pt-20 pb-10 lg:pt-32 lg:pb-14">
      <div className={cn(gbWrap, "max-sm:px-10")}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="gb-mono text-[11px] tracking-[0.14em] text-(--gb-red-ink) uppercase">
              Form AA-1 · Stamps in use
            </p>
            <h2 className="gb-h2 mt-5">
              Four stamps your <span className="whitespace-nowrap">month-end</span> never wants to see.
            </h2>
          </div>
          <p className="self-end text-[17px] leading-relaxed lg:col-span-4 lg:col-start-9">
            Revenue rarely disappears in one big mistake. It slips through the handover between your CRM and your
            ledger, one deal, one discount, one VAT code at a time. Each slip gets its own stamp, its evidence and its
            fix.
          </p>
        </div>
        <StampSheet />
        <p className="gb-feed-tear gb-mono" aria-hidden>
          <span>✂</span>
        </p>
      </div>
    </section>
  );
}

const STEPS = [
  {
    no: "1",
    title: "Connect",
    body: "Sign in to HubSpot and Xero with read-only OAuth. Nothing to install, nothing to export.",
    value: "2 min",
  },
  {
    no: "2",
    title: "Match",
    body: "IDs first, then amount, date and counterparty, then heuristic rules for VAT, timing and duplicates.",
    value: "L1 · L2 · L3",
  },
  {
    no: "3",
    title: "Stamp",
    body: "Anything that doesn’t add up is flagged with its source records, the rule it failed and a suggested fix.",
    value: "4 flags",
  },
];

export function HowSection() {
  return (
    <section id="how" className="gb-form-section relative py-20 lg:py-32">
      <div className={gbWrap}>
        <div className="gb-form">
          <div className="gb-form-head">
            <span>Form AA-2</span>
            <span className="max-sm:hidden">How a flag is made</span>
            <span>Revenue assurance</span>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-x-10 px-5 pt-10 pb-8 sm:px-8 lg:grid-cols-12 lg:px-12 lg:pt-14 lg:pb-12">
            <div className="lg:col-span-5">
              <h2 className="gb-h2 max-w-[18ch]">A fresh printout every two hours.</h2>
              <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed">
                Twelve runs a day, every day. Matched work is filed quietly. Only what doesn’t add up reaches your team.
              </p>
            </div>
            <div className="lg:col-span-7">
              <RunStubs />
            </div>
          </div>
          <ol className="gb-boxes">
            {STEPS.map((s) => (
              <li key={s.no} className="gb-box">
                <span className="gb-box-no">{s.no}</span>
                <span className="gb-mono text-[10.5px] tracking-[0.14em] text-(--gb-mut) uppercase">Line {s.no}</span>
                <h3 className="gb-cond mt-2 text-[28px] leading-none font-bold uppercase">{s.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed">{s.body}</p>
                <span className="gb-box-value">{s.value}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function StartSection() {
  return (
    <section id="start" className="gb-start relative">
      <div className={cn(gbWrap, "py-20 lg:py-28")}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="gb-mono text-[11.5px] tracking-[0.12em] text-(--gb-phosphor) uppercase">Seven days · free</p>
            <h2 className="gb-h1 mt-5 text-(--gb-cream)">Your first printout is on us.</h2>
          </div>
          <div className="self-end lg:col-span-5">
            <p className="text-[17px] leading-relaxed text-(--gb-cream)/75 lg:text-[18.5px]">
              Connect HubSpot and Xero read-only. {HEALTH_CHECK} Every flag comes with its evidence and a suggested fix.
            </p>
            <Keycap href="/start" className="mt-8 w-full">
              Start your free 7-day Health Check
            </Keycap>
            <a href={`mailto:${SITE.email}`} className="gb-link mt-5 inline-block normal-case">
              Or email {SITE.email}
            </a>
          </div>
        </div>
      </div>
      <footer
        role="contentinfo"
        className="border-t border-(--gb-cream)/12 pt-10 pb-10 text-[13px] text-(--gb-cream)/60 lg:pb-24"
      >
        <div className={cn(gbWrap, "grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[1fr_auto] lg:items-end")}>
          <div className="text-(--gb-cream)">
            <Wordmark />
            <div className="mt-4 max-w-[72ch] space-y-1 leading-relaxed text-(--gb-cream)/60">
              {LEGAL_LINES.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
          <ul className="gb-mono flex flex-wrap gap-x-6 text-[11px] tracking-[0.08em] uppercase">
            {LEGAL_DOCS.map((d) => (
              <li key={d.href}>
                <a href={d.href} target="_blank" rel="noreferrer" className="inline-block py-2 hover:text-(--gb-cream)">
                  {d.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </section>
  );
}
