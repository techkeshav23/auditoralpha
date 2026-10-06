"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { gbp } from "@/lib/format";
import { buttonClasses } from "@/components/ui/button";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { FlagMark, LiveDot, PenCircle, Tick } from "@/components/ui/marks";

type Row =
  | { deal: string; won: string; value: number; xero: number; ok: true; invoice: string; layer: "L1" | "L2" }
  | {
      deal: string;
      won: string;
      value: number;
      xero: number | null;
      ok: false;
      label: string;
      risk: number;
      caught: string;
      fix: string;
    };

const ROWS: Row[] = [
  {
    deal: "Meridian Logistics",
    won: "02 Oct",
    value: 127_900,
    xero: 127_900,
    ok: true,
    invoice: "INV-2041",
    layer: "L1",
  },
  {
    deal: "Northwind Trading",
    won: "29 Sep",
    value: 48_200,
    xero: null,
    ok: false,
    label: "Not invoiced",
    risk: 48_200,
    caught: "Nothing matched on ID or meaning (L1–L2), and no heuristic rule explained it (L3).",
    fix: "Raise the invoice for this deal in Xero.",
  },
  {
    deal: "Orion Retail Group",
    won: "27 Sep",
    value: 94_750,
    xero: 94_750,
    ok: true,
    invoice: "INV-2038",
    layer: "L2",
  },
  {
    deal: "Halcyon Systems",
    won: "25 Sep",
    value: 62_450,
    xero: 58_250,
    ok: false,
    label: "Invoiced short",
    risk: 4_200,
    caught: "Paired with INV-2033 on client and date (L2); an amount rule found it £4,200 short (L3).",
    fix: "Issue a supplementary invoice for the £4,200 uplift.",
  },
  {
    deal: "Cedar & Vale",
    won: "24 Sep",
    value: 33_600,
    xero: 28_000,
    ok: false,
    label: "VAT not applied",
    risk: 5_600,
    caught: "Paired with INV-2030 (L2); a heuristic rule found 0% VAT on a standard-rated sale (L3).",
    fix: "Credit INV-2030 and re-issue it at 20% VAT.",
  },
  { deal: "Brightpath Media", won: "22 Sep", value: 18_300, xero: 18_300, ok: true, invoice: "INV-2027", layer: "L1" },
  { deal: "Vanguard Freight", won: "19 Sep", value: 71_020, xero: 71_020, ok: true, invoice: "INV-2024", layer: "L1" },
];

const LAYER_NAMES = { L1: "a direct ID match", L2: "a semantic match on client, amount and date" };

/**
 * Shows a £ figure that eases towards `value`. Writes the text straight to the
 * DOM each frame, so the animation never re-renders the sheet around it.
 */
function TweenedGbp({ value, instant, className }: { value: number; instant: boolean; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (instant) {
      shown.current = value;
      el.textContent = gbp(value);
      return;
    }
    const start = performance.now();
    const from = shown.current;
    let frame = 0;
    const step = (now: number) => {
      const k = Math.min(1, (now - start) / 650);
      shown.current = from + (value - from) * (1 - Math.pow(1 - k, 3));
      el.textContent = gbp(shown.current);
      if (k < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, instant]);

  return (
    <span ref={ref} className={className}>
      {gbp(value)}
    </span>
  );
}

/**
 * Hero demo: an audit working paper that checks deals one by one and totals the
 * revenue at risk. Every row opens its detail, like drilling into a record in an app.
 */
export function ReconciliationSheet() {
  const [done, setDone] = useState(0);
  const [checking, setChecking] = useState<number | null>(null);
  const [still, setStill] = useState(false);
  // The detail row is kept after closing so the sheet can animate out with its content.
  const [detail, setDetail] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useRef(true);
  const paused = useRef(false);

  useEffect(() => {
    paused.current = detailOpen;
  }, [detailOpen]);

  useEffect(() => {
    let cancelled = false;
    const timers = new Set<number>();
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => {
          timers.delete(id);
          resolve();
        }, ms);
        timers.add(id);
      });
    const io = new IntersectionObserver(([e]) => (inView.current = e.isIntersecting), { threshold: 0.2 });
    if (rootRef.current) io.observe(rootRef.current);

    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      new URLSearchParams(window.location.search).has("static");

    (async () => {
      if (reduced) {
        await wait(0);
        setStill(true);
        setDone(ROWS.length);
        return;
      }
      while (!cancelled) {
        setDone(0);
        setChecking(null);
        await wait(900);
        for (let i = 0; i < ROWS.length && !cancelled; i++) {
          while ((!inView.current || paused.current) && !cancelled) await wait(300);
          setChecking(i);
          await wait(560);
          setChecking(null);
          setDone(i + 1);
          await wait(ROWS[i].ok ? 300 : 700);
        }
        await wait(6000);
        while (paused.current && !cancelled) await wait(300);
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, []);

  const finished = ROWS.slice(0, done);
  const risk = finished.reduce((sum, r) => sum + (r.ok ? 0 : r.risk), 0);
  const matched = finished.reduce((sum, r) => sum + (r.ok ? r.value : 0), 0);
  const flagged = finished.filter((r) => !r.ok).length;

  return (
    <>
      <div
        ref={rootRef}
        role="region"
        aria-label="Illustrative reconciliation run"
        className={cn(
          "overflow-hidden rounded-2xl border border-rule bg-card shadow-[0_1px_0_rgb(11_21_48/0.04),0_40px_70px_-36px_rgb(11_21_48/0.42)]",
          still && "[&_*]:!transition-none",
        )}
      >
        <div className="flex items-center justify-between gap-3 border-b border-rule-2 bg-linear-to-b from-[#fcfbf8] to-paper px-4 py-3.5 sm:px-5">
          <div className="flex min-w-0 items-center gap-2.5 text-sm font-semibold text-ink">
            <span className="hidden shrink-0 rounded border border-rule bg-card px-1.5 py-1 font-mono text-[10.5px] leading-none font-medium text-muted sm:inline">
              W/P R-14
            </span>
            <span className="truncate">Reconciliation · HubSpot ⇄ Xero</span>
          </div>
          <span className="flex items-center gap-2 font-mono text-[11.5px] whitespace-nowrap text-muted">
            <LiveDot />
            Run 14:00
          </span>
        </div>

        <div
          aria-hidden
          className="hidden h-[38px] grid-cols-[1.45fr_.95fr_.95fr_1.4fr] items-center gap-3.5 border-b border-rule-2 px-5 font-mono text-[10.5px] tracking-[0.08em] text-faint uppercase sm:grid"
        >
          <span>HubSpot deal</span>
          <span className="text-right">Deal value</span>
          <span className="text-right">In Xero</span>
          <span>Result</span>
        </div>

        {ROWS.map((row, i) => {
          const isDone = i < done;
          const isChecking = checking === i;
          return (
            <button
              key={row.deal}
              type="button"
              onClick={() => {
                setDetail(i);
                setDetailOpen(true);
              }}
              className={cn(
                "relative grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-x-3.5 gap-y-2 border-b border-rule-2 px-4 py-3 text-left transition-colors duration-300 active:bg-paper-2 sm:min-h-[58px] sm:grid-cols-[1.45fr_.95fr_.95fr_1.4fr] sm:px-5 sm:py-0 sm:hover:bg-paper/70",
                "before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:origin-top before:scale-y-0 before:bg-blue before:transition-transform",
                isChecking && "bg-blue-wash before:scale-y-100",
                isDone && !row.ok && "is-drawn bg-linear-to-r from-red/[0.06] to-transparent to-70%",
                isDone && row.ok && "is-drawn",
              )}
            >
              <span className="block min-w-0">
                <span className="block truncate text-sm font-semibold text-ink">{row.deal}</span>
                <span className="hidden font-mono text-[11.5px] text-faint sm:block">Won {row.won}</span>
              </span>

              <span className="col-span-2 row-start-2 flex items-center gap-2 font-mono text-[12.5px] tabular-nums sm:contents sm:text-[13.5px]">
                <span className="block text-ink sm:text-right">
                  <span className="text-faint sm:hidden">HubSpot </span>
                  {gbp(row.value)}
                </span>
                <span className="text-faint sm:hidden">→ Xero</span>
                <span className="ml-2 block sm:ml-0 sm:text-right">
                  <span
                    className={cn(
                      "relative inline-block transition-colors duration-300",
                      isDone && !row.ok ? "text-red" : "text-ink",
                    )}
                  >
                    {row.xero === null ? "none" : gbp(row.xero)}
                    {!row.ok && <PenCircle draw />}
                  </span>
                </span>
              </span>

              <span className="relative col-start-2 row-start-1 flex min-w-0 items-center justify-self-end sm:col-start-auto sm:row-start-auto sm:justify-self-stretch">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1/2 right-0 -translate-y-1/2 font-mono text-[11.5px] text-faint transition-opacity sm:right-auto sm:left-0",
                    (isDone || isChecking) && "opacity-0",
                  )}
                >
                  pending
                </span>
                {!isDone && <span className="sr-only">Not checked yet</span>}
                <span
                  aria-hidden={!isDone}
                  className={cn(
                    "flex items-center gap-2 text-[13.5px] font-semibold transition-[opacity,transform] duration-300",
                    row.ok ? "text-green" : "text-red",
                    isDone ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                  )}
                >
                  {row.ok ? <Tick draw className="h-[15px] w-[18px]" /> : <FlagMark className="h-[15px] w-[18px]" />}
                  <span>
                    {row.ok ? "Matched" : row.label}
                    <small className="hidden font-mono text-[11px] font-medium whitespace-nowrap opacity-80 sm:block">
                      {row.ok ? `${row.invoice} · ${row.layer}` : `${gbp(row.risk)} at risk`}
                    </small>
                  </span>
                </span>
                <ChevronRight
                  aria-hidden
                  className={cn("-mr-1 ml-1 size-4 text-faint transition-opacity sm:hidden", !isDone && "opacity-0")}
                />
                <span className="sr-only">. Open details</span>
              </span>
            </button>
          );
        })}

        <div className="grid grid-cols-2 items-end gap-4 bg-linear-to-b from-[#fbfaf7] to-paper p-4 sm:grid-cols-[1.3fr_1fr_1fr] sm:px-5">
          <div className="col-span-2 sm:col-span-1">
            <p className="mb-2 font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase">Revenue at risk</p>
            <p className="font-mono text-[30px] leading-none font-medium tracking-[-0.02em] text-red tabular-nums">
              <TweenedGbp value={risk} instant={still} />
            </p>
          </div>
          <div>
            <p className="mb-2 font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase">Flagged</p>
            <p className="font-mono text-[17px] leading-none font-medium text-ink tabular-nums">
              {flagged} of {ROWS.length}
            </p>
          </div>
          <div>
            <p className="mb-2 font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase">Matched</p>
            <p className="font-mono text-[17px] leading-none font-medium text-ink tabular-nums">
              <TweenedGbp value={matched} instant={still} />
            </p>
          </div>
        </div>
      </div>

      <BottomSheet open={detailOpen} onClose={() => setDetailOpen(false)} label={`${ROWS[detail].deal}: detail`}>
        <RowDetail row={ROWS[detail]} />
      </BottomSheet>
    </>
  );
}

function RowDetail({ row }: { row: Row }) {
  return (
    <div className="px-5 pb-4">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12.5px] font-semibold",
          row.ok ? "bg-green-wash text-green" : "bg-red-wash text-red",
        )}
      >
        {row.ok ? <Tick className="h-3 w-3.5" /> : <FlagMark className="h-3 w-3.5" />}
        {row.ok ? "Matched" : row.label}
      </span>
      <h2 className="mt-3 text-[30px] leading-tight">{row.deal}</h2>
      <p className="text-sm text-muted">Deal won {row.won} · HubSpot</p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-rule bg-paper p-3.5">
          <p className="font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase">HubSpot deal</p>
          <p className="mt-1.5 font-mono text-lg text-ink">{gbp(row.value)}</p>
        </div>
        <div
          className={cn("rounded-xl border p-3.5", row.ok ? "border-rule bg-paper" : "border-red/30 bg-red-wash/60")}
        >
          <p className="font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase">Xero invoice</p>
          <p className={cn("mt-1.5 font-mono text-lg", row.ok ? "text-ink" : "text-red")}>
            {row.xero === null ? "None" : gbp(row.xero)}
          </p>
        </div>
      </div>

      {row.ok ? (
        <p className="mt-4 text-[15px] text-ink-2">
          Matched to <b className="font-semibold">{row.invoice}</b> by {LAYER_NAMES[row.layer]}. No action needed.
        </p>
      ) : (
        <dl className="mt-4 grid gap-3 text-[15px]">
          <div className="flex items-baseline justify-between rounded-xl bg-ink px-4 py-3">
            <dt className="font-mono text-[11px] tracking-[0.08em] text-[#9aa3ba] uppercase">At risk</dt>
            <dd className="font-mono text-2xl text-white">{gbp(row.risk)}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">How it was caught</dt>
            <dd className="text-ink-2">{row.caught}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Suggested fix</dt>
            <dd className="text-ink-2">{row.fix}</dd>
          </div>
        </dl>
      )}

      <Link href="/sample-report" className={cn(buttonClasses({ full: true }), "mt-5")}>
        See a full sample report
      </Link>
      <p className="mt-2.5 text-center text-[12px] text-faint">Illustrative data</p>
    </div>
  );
}
