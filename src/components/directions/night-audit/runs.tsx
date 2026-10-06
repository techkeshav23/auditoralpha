"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/site";
import { ASSURANCES, CURRENT_RUN, HEALTH_CHECK, RUN_HOURS } from "../data";
import { useSeen } from "../hooks";

const STATS = [
  { value: "1,284", label: "records checked in one run" },
  { value: "1,280", label: "reconciled cleanly, nothing to do" },
  { value: "4", label: "flags, each with its evidence and a fix" },
];

function RunLamps({ seen }: { seen: boolean }) {
  return (
    <ol className={cn("na-runs", seen && "is-seen")} aria-label="Today’s runs">
      {RUN_HOURS.map((hour, i) => (
        <li
          key={hour}
          className={cn("na-run", i < CURRENT_RUN && "is-past", i === CURRENT_RUN && "is-now")}
          style={{ "--i": i } as CSSProperties}
        >
          {i === CURRENT_RUN && (
            <span className="na-run-callout na-mono">
              <b>{hour} run</b> 1,284 records · 4 flags
            </span>
          )}
          <span className="na-run-lamp" aria-hidden />
          <span className="na-mono na-run-hour">
            <span className="sr-only">
              {hour} {i < CURRENT_RUN ? "complete" : i === CURRENT_RUN ? "running now" : "scheduled"}
            </span>
            <span aria-hidden>{hour.slice(0, 2)}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export function Runs() {
  const [ref, seen] = useSeen<HTMLDivElement>(0.35);
  return (
    <>
      <section id="how" className="relative isolate overflow-hidden py-20 lg:py-28">
        <div aria-hidden className="na-runs-glow" />
        <div className="mx-auto max-w-[1360px] px-[max(1rem,env(safe-area-inset-left))] text-center sm:px-8">
          <p className="na-mono text-[10.5px] tracking-[0.18em] text-(--na-amber) uppercase">How it works</p>
          <h2 className="mx-auto mt-5 max-w-[14ch] text-[clamp(40px,6.4vw,96px)] leading-[0.98]">
            Every two hours, <em>the lights come on.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[54ch] text-[16.5px] leading-relaxed lg:text-lg">
            Three matching layers run against your HubSpot and Xero twelve times a day: IDs first, then amounts and
            dates, then heuristic rules. Matched work stays dark. Anything that doesn’t add up is lit, with the trail
            that found it.
          </p>

          <div ref={ref}>
            <RunLamps seen={seen} />
            <dl className={cn("na-stats", seen && "is-seen")}>
              {STATS.map((s, i) => (
                <div key={s.label} className="na-stat" style={{ "--i": i } as CSSProperties}>
                  <dt className="na-stat-label">{s.label}</dt>
                  <dd className="na-stat-value">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="na-mono mt-8 text-[10.5px] tracking-[0.12em] text-(--na-faint) uppercase">
            Sample run · illustrative figures
          </p>
        </div>
      </section>

      <section id="start" className="na-stage relative isolate overflow-hidden py-20 lg:py-28">
        <div className="mx-auto max-w-[1360px] px-[max(1rem,env(safe-area-inset-left))] text-center sm:px-8">
          <p className="na-mono text-[10.5px] tracking-[0.18em] text-(--na-amber) uppercase">Seven days · free</p>
          <h2 className="mx-auto mt-5 max-w-[16ch] text-[clamp(38px,5.4vw,80px)] leading-[1]">
            Turn the lights on <em>in your own ledger.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-[50ch] text-[16.5px] leading-relaxed lg:text-lg">
            {HEALTH_CHECK} Every flag comes with its evidence and a suggested fix.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <Link href="/start" className="na-cta max-sm:w-full">
              Start your free 7-day Health Check
              <ArrowRight className="size-[18px]" aria-hidden />
            </Link>
            <a href={`mailto:${SITE.email}`} className="na-link">
              Or email {SITE.email}
            </a>
          </div>
          <ul className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-2 text-[14px]">
            {ASSURANCES.map((a) => (
              <li key={a} className="flex items-center gap-2">
                <span aria-hidden className="na-lamp na-lamp-sm" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
