import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { PenCircle } from "@/components/ui/marks";

function Redact({ wide }: { wide?: boolean }) {
  return (
    <>
      <i
        aria-hidden
        className={cn("ml-0.5 inline-block h-[11px] rounded-[2px] bg-ink/85 align-[-1px]", wide ? "w-16" : "w-[26px]")}
      />
      <span className="sr-only">(redacted)</span>
    </>
  );
}

function Row({ k, children, bad }: { k: string; children: ReactNode; bad?: boolean }) {
  return (
    <div className="flex justify-between gap-2 border-t border-dashed border-rule-2 py-[5px] text-[13.5px]">
      <span className="text-muted">{k}</span>
      <span className={cn("font-mono tabular-nums", bad ? "text-red" : "text-ink")}>{children}</span>
    </div>
  );
}

const TRAIL = [
  {
    layer: "L1 Direct ID",
    text: "No shared reference between records",
    mark: "✕",
    says: "No match",
    tone: "text-faint",
  },
  {
    layer: "L2 Semantic",
    text: "Paired on client, amount and date · 98%",
    mark: "✓",
    says: "Matched",
    tone: "text-green",
  },
  {
    layer: "L3 Heuristic",
    text: "Rule: 0% VAT on a standard-rated UK sale",
    mark: "⚑",
    says: "Flagged",
    tone: "text-red",
  },
];

/** A single, internally consistent sample flag with its detection trail. */
export function FlagCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-rule bg-paper p-5 sm:p-6", className)}>
      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.05em] text-muted">
        <span>FLAG AA-0417</span>
        <span className="rounded-[5px] bg-red-wash px-2 py-[5px] text-[10.5px] leading-none font-semibold tracking-[0.06em] text-red uppercase">
          Needs review
        </span>
        <span className="rounded-[5px] border border-dashed border-rule px-2 py-[5px] text-[10.5px] leading-none font-semibold tracking-[0.06em] uppercase sm:ml-auto">
          Redacted sample
        </span>
      </div>
      <h3 className="mt-4 mb-5 font-serif text-[26px] leading-[1.15] tracking-[-0.01em] text-ink sm:text-[28px]">
        Standard-rated sale invoiced without VAT
      </h3>
      <div className="grid grid-cols-[minmax(0,1fr)] items-stretch gap-2 sm:grid-cols-[1fr_28px_1fr]">
        <div className="rounded-[10px] border border-rule-2 bg-card p-3.5">
          <p className="mb-2.5 font-mono text-[10.5px] font-semibold tracking-[0.08em] text-muted uppercase">
            HubSpot · source
          </p>
          <Row k="Deal">
            DL-4471
            <Redact />
          </Row>
          <Row k="Client">
            <Redact wide />
          </Row>
          <Row k="Won">£33,600 inc. VAT</Row>
        </div>
        <div className="grid place-items-center text-faint">
          <ArrowRight className="size-[18px] rotate-90 sm:rotate-0" />
        </div>
        <div className="rounded-[10px] border border-rule-2 bg-card p-3.5">
          <p className="mb-2.5 font-mono text-[10.5px] font-semibold tracking-[0.08em] text-muted uppercase">
            Xero · ledger
          </p>
          <Row k="Invoice">
            INV-20
            <Redact />
          </Row>
          <Row k="Net">£28,000</Row>
          <Row k="VAT" bad>
            0% · 20% due
          </Row>
        </div>
      </div>
      <ol className="mt-[18px] border-t border-rule">
        {TRAIL.map((t) => (
          <li
            key={t.layer}
            className="grid grid-cols-[80px_1fr_18px] items-center gap-3 border-b border-rule-2 py-[11px] text-[13px] sm:grid-cols-[96px_1fr_22px] sm:text-sm"
          >
            <span className="font-mono text-[11px] font-semibold tracking-[0.04em] text-muted uppercase">
              {t.layer}
            </span>
            <span>{t.text}</span>
            <span className={cn("text-center font-mono text-[13px] font-bold", t.tone)}>
              <span aria-hidden>{t.mark}</span>
              <span className="sr-only">{t.says}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-[18px] flex items-center justify-between gap-4">
        <span className="font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase">At risk</span>
        <span className="relative px-3 py-1.5 font-mono text-[28px] leading-none font-medium text-red">
          £5,600
          <PenCircle />
        </span>
      </div>
      <p className="mt-3.5 text-[12.5px] text-muted">Redacted, illustrative example. Identifiers are masked.</p>
    </div>
  );
}
