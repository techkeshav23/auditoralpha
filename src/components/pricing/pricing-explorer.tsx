"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { gbp } from "@/lib/format";
import { ANNUAL_DISCOUNT, PLANS, REVENUE_BANDS, type Billing, type PlanId } from "@/lib/plans";
import { PlanCards } from "./plan-cards";

/** Revenue-band picker + billing toggle driving the plan cards. */
export function PricingExplorer() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [band, setBand] = useState<number | null>(null);
  const highlight: PlanId | null = band === null ? null : REVENUE_BANDS[band].plan;
  const enterprise = band !== null && REVENUE_BANDS[band].plan === null;
  const yearlySaving = PLANS.find((p) => p.id === "growth")!.monthly * 12 * ANNUAL_DISCOUNT;

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2.5 text-sm font-medium text-ink">Your annual revenue</p>
          <div className="rail -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
            {REVENUE_BANDS.map((b, i) => (
              <button
                key={b.label}
                type="button"
                aria-pressed={band === i}
                onClick={() => setBand(band === i ? null : i)}
                className={cn(
                  "h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition-[background-color,border-color,color,transform] active:scale-95",
                  band === i ? "border-ink bg-ink text-white" : "border-rule bg-card text-ink-2 hover:border-ink",
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div role="group" aria-label="Billing" className="inline-flex rounded-full border border-rule bg-card p-1">
            {(["monthly", "annual"] as const).map((b) => (
              <button
                key={b}
                type="button"
                aria-pressed={billing === b}
                onClick={() => setBilling(b)}
                className={cn(
                  "h-11 rounded-full px-4 text-sm font-semibold transition-colors",
                  billing === b ? "bg-ink text-white" : "text-ink-2",
                )}
              >
                {b === "monthly" ? "Monthly" : "Annually"}
                {b === "annual" && (
                  <span
                    className={cn(
                      "ml-2 rounded px-1.5 py-0.5 font-mono text-[10.5px]",
                      billing === b ? "bg-hl text-ink" : "bg-green-wash text-green",
                    )}
                  >
                    −15%
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[12.5px] text-muted">
            {billing === "annual"
              ? `Growth billed annually saves ${gbp(yearlySaving)} a year.`
              : "Switch to annual to save 15%."}
          </p>
        </div>
      </div>

      {enterprise && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-blue/40 bg-blue-wash px-5 py-4">
          <p className="text-[15px] text-ink">
            <b className="font-semibold">Above £15M?</b> We run a tailored session mapped to your ledgers, systems and
            controls.
          </p>
          <Link href="/contact" className="font-semibold text-blue-ink underline-offset-4 hover:underline">
            Book a tailored demo →
          </Link>
        </div>
      )}

      <div className="mt-10">
        <PlanCards billing={billing} highlight={highlight} />
      </div>
    </div>
  );
}
