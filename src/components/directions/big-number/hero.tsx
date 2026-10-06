import Link from "next/link";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { gbp } from "@/lib/format";
import { AT_RISK, ASSURANCES, RISK_LEAKS } from "../data";
import { BlockButton, Fig, Odometer, wrap } from "./parts";
import { Ticker } from "./ticker";

const SEGMENTS = RISK_LEAKS.map((l, i) => ({
  ...l,
  share: l.amount / AT_RISK,
  tone: ["bn-seg-ink", "bn-seg-red", "bn-seg-hatch"][i],
}));

const TICKER = [
  "14:00 run complete",
  "1,284 records checked",
  "1,280 reconciled automatically",
  "4 flags raised",
  `${gbp(AT_RISK)} at risk`,
  "Next run 16:00",
];

export function NumberHero() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden className={cn(wrap, "bn-guides")}>
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} />
          ))}
        </div>

        <div className={wrap}>
          <div className="flex items-center justify-between border-b border-(--bn-rule) py-3">
            <Fig no="1">Revenue at risk, one 7-day Health Check</Fig>
            <span className="bn-mono text-[10.5px] tracking-[0.12em] uppercase max-sm:hidden">Illustrative</span>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)] gap-x-[var(--gap)] lg:grid-cols-12">
            <h1 className="bn-h1 lg:col-span-8">
              <span className="sr-only">{gbp(AT_RISK)} </span>
              <Odometer value={gbp(AT_RISK)} className="bn-giant" />
              <span className="bn-h1-text">
                <span className="block">closed in HubSpot, missing in Xero.</span>
                <span className="block text-(--bn-red-ink)">
                  Caught before <span className="whitespace-nowrap">month-end.</span>
                </span>
              </span>
            </h1>
            <div className="bn-aside pb-12 lg:col-span-4 lg:self-end lg:pb-10">
              <p className="text-[17px] leading-relaxed text-(--bn-ink) lg:text-[18px]">
                Auditor Alpha checks every closed HubSpot deal against your Xero invoices every two hours, and flags
                anything never billed, billed short, billed without VAT or billed twice.
              </p>
              <BlockButton href="#start" className="mt-7 w-full">
                Start your free 7-day Health Check
              </BlockButton>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <Link href="#leaks" className="bn-textlink">
                  See what it finds
                </Link>
                <ul className="bn-mono flex flex-wrap gap-x-4 gap-y-1 text-[10px] tracking-[0.08em] text-(--bn-grey) uppercase">
                  {ASSURANCES.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <figure className="border-t-2 border-(--bn-ink) pt-4 pb-14 lg:pb-20">
            <figcaption className="flex items-center justify-between">
              <Fig no="2">Where the {gbp(AT_RISK)} sits</Fig>
              <span className="bn-mono text-[10.5px] tracking-[0.12em] uppercase max-sm:hidden">
                3 of 1,284 records
              </span>
            </figcaption>
            <div className="bn-bar mt-5" role="img" aria-label="Revenue at risk by deal">
              {SEGMENTS.map((s, i) => (
                <span
                  key={s.ref}
                  className={cn("bn-seg", s.tone)}
                  style={{ "--w": s.share, "--i": i } as CSSProperties}
                >
                  <span className="bn-mono">{Math.round(s.share * 100)}%</span>
                </span>
              ))}
            </div>
            <ol className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-x-[var(--gap)] gap-y-4 sm:grid-cols-3">
              {SEGMENTS.map((s) => (
                <li key={s.ref} className="flex items-start gap-3 border-t border-(--bn-rule) pt-3">
                  <span className={cn("bn-swatch mt-1", s.tone)} aria-hidden />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-(--bn-ink)">{s.party}</span>
                    <span className="block text-[14px] text-(--bn-grey)">{s.title}</span>
                  </span>
                  <span className="bn-num text-[30px] leading-none text-(--bn-ink)">{gbp(s.amount)}</span>
                </li>
              ))}
            </ol>
          </figure>
        </div>
      </section>

      <Ticker items={TICKER} />
    </>
  );
}
