import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { gbp } from "@/lib/format";
import { AT_RISK, RISK_LEAKS, SHEET } from "../data";
import { Stamp } from "./ink";
import { PrintOnView } from "./print-on-view";

/** Print timing: each line types out in turn, then the stamps come down on the flagged rows. */
const LINE_MS = 150;
const START_MS = 700;

function Amount({ n }: { n: number | null }) {
  if (n === null) return <>—</>;
  return (
    <>
      {n.toLocaleString("en-GB")}
      <span className="max-sm:hidden">.00</span>
    </>
  );
}

function Line({ n, className, children }: { n: number; className?: string; children: ReactNode }) {
  return (
    <div className={cn("gb-line", className)} style={{ "--n": n } as CSSProperties}>
      {children}
    </div>
  );
}

export function Printout() {
  const rows = SHEET;
  const headerLines = 4;
  const lastLine = headerLines + rows.length + 1;
  const stampAt = START_MS + (lastLine + 2) * LINE_MS;

  return (
    <PrintOnView className="gb-printer-wrap" label="Sample printout from one Health Check run">
      <div className="gb-printer" aria-hidden>
        <div className="flex items-center justify-between gap-4">
          <span className="gb-plate">AA-1284 · Line printer</span>
          <span className="flex items-center gap-4">
            <span className="gb-led is-on">Online</span>
            <span className="gb-led is-on max-sm:hidden">Paper</span>
            <span className="gb-led is-alert" style={{ "--t": `${stampAt}ms` } as CSSProperties}>
              Alert
            </span>
          </span>
        </div>
        <div className="gb-vents" />
        <div className="gb-slot" />
      </div>

      <div className="gb-paper" aria-hidden>
        <div className="gb-sprocket" />
        <div className="gb-sheet">
          <Line n={0} className="gb-line-head">
            <span>
              Auditor Alpha<span className="max-sm:hidden"> · Revenue Health Check</span>
            </span>
            <span>Sample run 14:00</span>
          </Line>
          <Line n={1} className="gb-line-head">
            <span>HubSpot ⇄ Xero · 1,284 records</span>
            <span>Page 001</span>
          </Line>
          <Line n={2} className="gb-line-rule">
            <span />
          </Line>
          <Line n={3} className="gb-row gb-row-cols">
            <span>Deal</span>
            <span>HubSpot</span>
            <span>Xero</span>
            <span>Result</span>
          </Line>
          {rows.map((r, i) => {
            const flag = r.leak;
            const k = flag ? RISK_LEAKS.findIndex((l) => l.ref === flag.ref) : -1;
            return (
              <Line key={r.deal} n={headerLines + i} className={cn("gb-row", flag && "is-flag")}>
                <span className="truncate">{r.deal}</span>
                <span>
                  <Amount n={r.hubspot} />
                </span>
                <span>
                  <Amount n={r.xero} />
                </span>
                <span className="relative">
                  {flag ? (
                    <Stamp
                      kind="tag"
                      big={flag.stamp.toUpperCase()}
                      id={`gb-print-stamp-${k}`}
                      className="gb-print-stamp"
                      style={
                        {
                          "--t": `${stampAt + k * 480}ms`,
                          "--rot": `${[-3, 2.5, -2][k]}deg`,
                        } as CSSProperties
                      }
                    />
                  ) : (
                    `OK ${r.layer}`
                  )}
                </span>
              </Line>
            );
          })}
          <Line n={headerLines + rows.length} className="gb-line-rule">
            <span />
          </Line>
          <Line n={lastLine} className="gb-line-total">
            <span>Total at risk</span>
            <span className="gb-dots">{gbp(AT_RISK)}</span>
          </Line>
          <div className="gb-tear" style={{ "--n": lastLine + 1 } as CSSProperties}>
            <span>✂</span>
          </div>
        </div>
        <div className="gb-sprocket" />
      </div>
    </PrintOnView>
  );
}
