"use client";

import { useState } from "react";
import { COMPARISON, PLANS, type PlanId } from "@/lib/plans";
import { Tick } from "@/components/ui/marks";
import { cn } from "@/lib/cn";

const shortName = (id: PlanId, name: string) => (id === "free" ? "Health Check" : name);

function Value({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <>
        <Tick className="mx-auto h-3 w-[15px] text-green max-md:mx-0" />
        <span className="sr-only">Included</span>
      </>
    );
  if (v === false || v === "—")
    return (
      <>
        <span aria-hidden className="text-faint">
          —
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  return <span className="font-mono text-[13px] text-ink">{v}</span>;
}

/** Plan comparison: a full table from `md`, a one-plan-at-a-time switcher on phones. */
export function ComparisonTable() {
  const [plan, setPlan] = useState<PlanId>("growth");

  return (
    <>
      <div className="md:hidden">
        <div
          role="group"
          aria-label="Plan"
          className="grid grid-cols-4 gap-1 rounded-xl border border-rule bg-paper p-1"
        >
          {PLANS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={plan === p.id}
              onClick={() => setPlan(p.id)}
              className={cn(
                "h-11 rounded-lg px-1 text-[13px] leading-tight font-semibold transition-colors",
                plan === p.id ? "bg-ink text-white" : "text-ink-2",
              )}
            >
              {p.id === "free" ? "Free" : p.name}
            </button>
          ))}
        </div>
        {COMPARISON.map((group) => (
          <div key={group.group} className="mt-6">
            <h3 className="font-mono text-[11px] font-semibold tracking-[0.09em] text-blue uppercase">{group.group}</h3>
            <dl className="mt-2">
              {group.rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 border-b border-rule-2 py-3.5">
                  <dt className="text-[15px] text-ink-2">{row.label}</dt>
                  <dd className="shrink-0 text-right">
                    <Value v={row.values[plan]} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      <table className="hidden w-full border-collapse text-left text-[14.5px] md:table">
        <thead>
          <tr className="border-b-2 border-ink">
            <th
              scope="col"
              className="py-4 pr-4 font-mono text-[11px] font-semibold tracking-[0.08em] text-muted uppercase"
            >
              Feature
            </th>
            {PLANS.map((p) => (
              <th
                key={p.id}
                scope="col"
                className={cn(
                  "px-3 py-4 text-center text-[15px] font-semibold text-ink",
                  p.popular && "bg-blue-wash/60",
                )}
              >
                {shortName(p.id, p.name)}
              </th>
            ))}
          </tr>
        </thead>
        {COMPARISON.map((group) => (
          <tbody key={group.group}>
            <tr>
              <th
                scope="colgroup"
                colSpan={PLANS.length + 1}
                className="pt-7 pb-2 font-mono text-[11px] font-semibold tracking-[0.09em] text-blue uppercase"
              >
                {group.group}
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.label} className="border-b border-rule-2">
                <th scope="row" className="py-3.5 pr-4 font-normal text-ink-2">
                  {row.label}
                </th>
                {PLANS.map((p) => (
                  <td key={p.id} className={cn("px-3 py-3.5 text-center", p.popular && "bg-blue-wash/60")}>
                    <Value v={row.values[p.id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </>
  );
}
