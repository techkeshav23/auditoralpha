"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { gbp } from "@/lib/format";
import { SITE } from "@/lib/site";
import { ASSURANCES, FUNNEL, HEALTH_CHECK, LEAKS } from "../data";
import { useSeen } from "../hooks";
import { BlockButton, Fig, wrap } from "./parts";

export function LeakTable() {
  return (
    <section id="leaks" className="py-16 lg:py-28">
      <div className={wrap}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-x-[var(--gap)] gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Fig no="3">What it finds</Fig>
            <h2 className="bn-h2 mt-5">Four ways billing drifts from what you sold.</h2>
          </div>
          <p className="self-end text-[17px] leading-relaxed lg:col-span-4 lg:col-start-9">
            Revenue rarely disappears in one big mistake. It slips through the handover between your CRM and your
            ledger, one deal, one discount, one VAT code at a time.
          </p>
        </div>

        <ol className="mt-12 border-t-2 border-(--bn-ink) lg:mt-16">
          {LEAKS.map((l, i) => (
            <li key={l.ref} className="bn-row">
              <span className="bn-mono bn-row-no">0{i + 1}</span>
              <div className="bn-row-main">
                <h3 className="bn-row-title">{l.title}</h3>
                <p className="bn-row-body">{l.body}</p>
              </div>
              <p className="bn-mono bn-row-ev">
                <span>
                  HubSpot <b>{l.hubspotText ?? gbp(l.hubspot)}</b>
                </span>
                <span>
                  Xero{" "}
                  <b className="bn-red-on">
                    {l.xero === null
                      ? "no invoice"
                      : l.kind === "over"
                        ? `${gbp(l.amount)} ×2`
                        : `${gbp(l.xero)}${l.hubspotText ? " · 0% VAT" : ""}`}
                  </b>
                </span>
                <span className="bn-row-party">
                  {l.party} · {l.ref}
                </span>
              </p>
              <p className="bn-row-amt">
                <span className="bn-mono">{l.kind === "over" ? "Over-billed" : "At risk"}</span>
                <span className={cn("bn-num", l.kind === "risk" && "bn-red-on")}>{gbp(l.amount)}</span>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Funnel() {
  const [ref, seen] = useSeen<HTMLOListElement>(0.2);
  return (
    <section
      id="how"
      className="border-t-2 border-(--bn-ink) bg-(--bn-ink) pt-16 pb-10 text-(--bn-paper) lg:pt-28 lg:pb-14"
    >
      <div className={wrap}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-x-[var(--gap)] gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Fig no="4" className="text-[#b9b4aa]">
              How a flag is made
            </Fig>
            <h2 className="bn-h2 bn-h2-xl mt-5 text-(--bn-paper)">
              1,284 records in.
              <br />
              <span className="text-(--bn-red)">4 flags out.</span>
            </h2>
          </div>
          <p className="self-end text-[17px] leading-relaxed text-[#cfcabf] lg:col-span-4">
            Three matching layers run in order, every two hours. Whatever survives all three becomes a flag, with its
            evidence attached, ready for your team to review.
          </p>
        </div>

        <ol ref={ref} className={cn("bn-funnel mt-12 lg:mt-16", seen && "is-seen")}>
          {FUNNEL.map((f, i) => {
            const left = f.of - f.matched;
            return (
              <li key={f.code} className="bn-step" style={{ "--i": i } as CSSProperties}>
                <span className="bn-step-code bn-num">{f.code}</span>
                <div>
                  <h3 className="text-[22px] font-bold tracking-[-0.01em]">{f.title}</h3>
                  <p className="mt-1 max-w-[46ch] text-[15px] text-[#b9b4aa]">{f.body}</p>
                </div>
                <div className="bn-step-meter">
                  <span className="bn-meter" style={{ "--m": f.matched / f.of } as CSSProperties}>
                    <i />
                  </span>
                  <span className="bn-mono mt-2 flex justify-between text-[10.5px] tracking-[0.08em] text-[#b9b4aa] uppercase">
                    <span>
                      {f.matched.toLocaleString("en-GB")} of {f.of.toLocaleString("en-GB")}{" "}
                      {i === 2 ? "explained" : "matched"}
                    </span>
                    <span className="text-(--bn-red)">{left} left</span>
                  </span>
                </div>
                <span className="bn-step-left bn-num">{left}</span>
              </li>
            );
          })}
          <li className="bn-step is-out" style={{ "--i": 3 } as CSSProperties}>
            <span className="bn-step-code bn-num">⚑</span>
            <div>
              <h3 className="text-[22px] font-bold tracking-[-0.01em]">Flags for your team</h3>
              <p className="mt-1 max-w-[46ch] text-[15px] text-[#b9b4aa]">
                One deal with no invoice, one invoice raised twice, and two matched pairs that broke a rule on amount or
                VAT. Each arrives with its source records, the check it failed and a suggested fix.
              </p>
            </div>
            <div className="bn-step-meter">
              <span className="bn-flags" aria-hidden>
                {LEAKS.map((l, k) => (
                  <i key={l.ref} style={{ "--k": k } as CSSProperties}>
                    <b>{l.letter}</b>
                    {gbp(l.amount)}
                  </i>
                ))}
              </span>
            </div>
            <span className="bn-step-left bn-num text-(--bn-red)">4</span>
          </li>
        </ol>
      </div>
    </section>
  );
}

export function NumberClose() {
  return (
    <section id="start" className="bn-close">
      <div className={wrap}>
        <Fig no="5" className="text-(--bn-ink)">
          Seven days · free
        </Fig>
        <h2 className="bn-close-title">What’s your number?</h2>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-x-[var(--gap)] gap-y-8 border-t-2 border-(--bn-ink) pt-6 lg:grid-cols-12">
          <p className="text-[19px] leading-snug font-medium text-(--bn-ink) lg:col-span-6 lg:text-[24px]">
            Connect HubSpot and Xero read-only. {HEALTH_CHECK} Every flag comes with its evidence and a suggested fix.
          </p>
          <div className="lg:col-span-4 lg:col-start-9">
            <BlockButton href="/start" className="w-full">
              Start your free 7-day Health Check
            </BlockButton>
            <a href={`mailto:${SITE.email}`} className="bn-textlink mt-4 inline-block">
              Or email {SITE.email}
            </a>
            <ul className="bn-mono mt-6 grid gap-1.5 text-[11px] tracking-[0.08em] text-(--bn-ink) uppercase">
              {ASSURANCES.map((a) => (
                <li key={a} className="flex items-center gap-2.5">
                  <span className="h-px w-5 bg-(--bn-ink)" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
