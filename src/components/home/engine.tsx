import { Container, Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { FlagCard } from "./flag-card";

const LAYERS = [
  {
    key: "L1",
    title: "Direct ID matching",
    body: "Invoice numbers, transaction IDs and PO references are matched one-to-one.",
    meter: "1,196 of 1,284 matched",
    w: "93%",
  },
  {
    key: "L2",
    title: "Semantic matching",
    body: "With no shared ID, records are paired on amount, date, counterparty and description.",
    meter: "74 of 88 matched",
    w: "84%",
  },
  {
    key: "L3",
    title: "Heuristic rules",
    body: "Rules then check every pair and every leftover: timing lags, part-payments, tax treatment and duplicates.",
    meter: "12 of 14 leftovers explained",
    w: "86%",
  },
  {
    key: "⚑",
    title: "4 flags for your team",
    body: "Two records nothing could match, and two matched pairs that broke a rule. Each comes with its source records, the check it failed and a suggested fix, and a person reviews it before anyone acts.",
    meter: "illustrative run",
    w: "100%",
    out: true,
  },
];

export function MatchingLayers() {
  return (
    <ol>
      {LAYERS.map((l) => (
        <li
          key={l.key}
          className="grid grid-cols-[44px_1fr] gap-x-[18px] gap-y-1 border-t border-rule py-[22px] last:border-b"
        >
          <span
            className={cn(
              "grid size-11 place-items-center rounded-[10px] border font-mono text-[13px] font-semibold",
              l.out ? "border-red bg-red text-white" : "border-rule bg-paper text-ink",
            )}
          >
            {l.key}
          </span>
          <div>
            <h3 className="text-lg leading-snug font-semibold text-ink">{l.title}</h3>
            <p className="mt-1 text-[15px] text-muted">{l.body}</p>
          </div>
          <div className="col-start-2 mt-3 flex items-center gap-3 font-mono text-xs text-muted">
            <span className="relative h-2 max-w-[220px] flex-1 overflow-hidden rounded bg-rule-2">
              <i
                className={cn("absolute inset-y-0 left-0 rounded", l.out ? "bg-red" : "bg-ink")}
                style={{ width: l.w }}
              />
            </span>
            {l.meter}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Engine() {
  return (
    <Section tone="white" id="engine" className="max-lg:hidden">
      <Container>
        <SectionHeading
          eyebrow="03 – How a flag is made"
          title={
            <>
              Every flag shows <em>which check it failed.</em>
            </>
          }
          lede="Three matching layers run in order: IDs, then meaning, then heuristic rules. A matched pair can still be flagged if a rule fails, such as missing VAT, and every flag carries the trail that produced it."
        />
        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:mt-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <FlagCard />
          <MatchingLayers />
        </div>
      </Container>
    </Section>
  );
}
