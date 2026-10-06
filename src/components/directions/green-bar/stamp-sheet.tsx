"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { gbp } from "@/lib/format";
import { CURRENT_RUN, LEAKS, RUN_HOURS } from "../data";
import { useSeen } from "../hooks";
import { Stamp } from "./ink";

const STAMPS = [
  { kind: "rect", big: "NOT INVOICED", small: "AA-0412 · £48,200", rot: -6 },
  { kind: "pill", big: "SHORT £4,200", small: "AA-0415 · INV-2033", rot: 4 },
  { kind: "seal", big: "0%", small: "VAT NOT APPLIED · 20% DUE · AA-0417 · ", rot: -10 },
  { kind: "box", big: "DUPLICATE", small: "INV-2045 × 2 · £12,400", rot: 3 },
] as const;

export function StampSheet() {
  const [ref, seen] = useSeen<HTMLOListElement>(0.2);
  return (
    <ol ref={ref} className={cn("gb-stamps", seen && "is-seen")}>
      {LEAKS.map((l, i) => {
        const s = STAMPS[i];
        return (
          <li key={l.ref} className="gb-stamp-cell" style={{ "--i": i } as CSSProperties}>
            <div className="gb-stamp-pad">
              <Stamp
                kind={s.kind}
                big={s.big}
                small={s.small}
                id={`gb-sheet-seal-${i}`}
                className={cn("gb-sheet-stamp", s.kind === "seal" && "is-seal")}
                style={{ "--rot": `${s.rot}deg` } as CSSProperties}
              />
            </div>
            <div>
              <p className="gb-mono text-[11px] tracking-[0.12em] text-(--gb-mut) uppercase">
                Line {String(i + 1).padStart(2, "0")} · {l.ref}
              </p>
              <h3 className="gb-cond mt-2 text-[30px] leading-none font-bold uppercase lg:text-[34px]">{l.title}</h3>
              <p className="mt-3 max-w-[40ch] text-[16px] leading-relaxed">{l.body}</p>
              <dl className="gb-mono mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[12px] uppercase">
                <dt className="text-(--gb-mut)">HubSpot</dt>
                <dd>
                  {l.party} · {gbp(l.hubspot)}
                </dd>
                <dt className="text-(--gb-mut)">Xero</dt>
                <dd className="text-(--gb-red)">{l.xero === null ? "No invoice" : `${l.invoice} · ${gbp(l.xero)}`}</dd>
                <dt className="text-(--gb-mut)">Fix</dt>
                <dd>{l.fix}</dd>
              </dl>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function RunStubs() {
  const [ref, seen] = useSeen<HTMLOListElement>(0.4);
  return (
    <ol ref={ref} className={cn("gb-stubs", seen && "is-seen")} aria-label="Today’s runs">
      {RUN_HOURS.map((hour, i) => {
        const past = i < CURRENT_RUN;
        const now = i === CURRENT_RUN;
        return (
          <li
            key={hour}
            className={cn("gb-stub", past && "is-past", now && "is-now")}
            style={{ "--i": i } as CSSProperties}
          >
            <span className="gb-mono text-[11px] font-medium">{hour}</span>
            <span className="gb-mono mt-auto text-[10px] tracking-[0.06em] uppercase">
              {now ? "Printing" : past ? "Filed" : "Queued"}
            </span>
            {now && (
              <Stamp
                kind="box"
                big="4 FLAGS"
                small="£58,000"
                id="gb-stub-stamp"
                className="gb-stub-stamp"
                style={{ "--rot": "-8deg" } as CSSProperties}
              />
            )}
            <span className="sr-only">{now ? "running now, 4 flags" : past ? "complete" : "scheduled"}</span>
          </li>
        );
      })}
    </ol>
  );
}
