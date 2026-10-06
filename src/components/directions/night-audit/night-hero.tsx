"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { gbp } from "@/lib/format";
import { RISK_LEAKS, AT_RISK } from "../data";
import { prefersReducedMotion, useTween } from "../hooks";
import { buildLedger, money, type WallRow } from "./ledger";

type BeamControl = { point: (clientX: number, clientY: number, holdMs: number) => void };

/** Stagger index for the load-in reveal. */
const v = (i: number) => ({ "--i": i }) as CSSProperties;

const WIDE_ROWS = buildLedger(36, [6, 13, 20], 3);
const PANEL_ROWS = buildLedger(12, [2, 6, 9], 11);

/**
 * Drives the torch: a critically damped spring that either follows the visitor
 * (pointer or tap) or searches the ledger on its own, pausing on each leak.
 * Positions are written straight to CSS variables; React only hears about finds.
 */
function useBeam(
  wallRef: RefObject<HTMLDivElement | null>,
  leakRefs: RefObject<(HTMLElement | null)[]>,
  opts: { xMin: number; onFound: (i: number) => void; controlRef?: RefObject<BeamControl | null> },
) {
  const { xMin, onFound, controlRef } = opts;

  useEffect(() => {
    const wall = wallRef.current;
    if (!wall) return;

    let w = 0;
    let h = 0;
    let rowH = 30;
    let leaks: { x: number; y: number }[] = [];
    const measure = () => {
      const box = wall.getBoundingClientRect();
      w = box.width;
      h = box.height;
      leaks = (leakRefs.current ?? []).map((el) => {
        if (!el) return { x: -999, y: -999 };
        const r = el.getBoundingClientRect();
        rowH = r.height || rowH;
        return { x: r.left - box.left + Math.min(r.width / 2, 70), y: r.top - box.top + r.height / 2 };
      });
    };
    measure();

    const set = (x: number, y: number) => {
      wall.style.setProperty("--bx", `${x.toFixed(1)}px`);
      wall.style.setProperty("--by", `${y.toFixed(1)}px`);
    };

    const found = new Set<number>();
    const check = (x: number, y: number) => {
      const reach = Math.min(170, w * 0.32);
      leaks.forEach((p, i) => {
        if (found.has(i)) return;
        if (Math.abs(y - p.y) < rowH * 0.8 && Math.abs(x - p.x) < reach) {
          found.add(i);
          onFound(i);
        }
      });
    };

    if (prefersReducedMotion()) {
      const p = leaks[0] ?? { x: w * 0.7, y: h * 0.4 };
      set(p.x, p.y);
      leaks.forEach((_, i) => onFound(i));
      return;
    }

    // Search plan: wander, find a leak, wander, find the next…
    const wander = () => ({
      x: xMin * w + 60 + Math.random() * Math.max(40, w * (1 - xMin) - 140),
      y: rowH + Math.random() * Math.max(40, h - rowH * 3),
      dwell: 120,
    });
    const plan = () => {
      const steps: { x: number; y: number; dwell: number; leak?: number }[] = [];
      leaks.forEach((p, i) => {
        steps.push(wander(), wander());
        steps.push({ x: p.x, y: p.y, dwell: 1300, leak: i });
      });
      return steps;
    };
    let steps = plan();
    let step = 0;
    let dwellUntil = 0;

    const pos = { x: xMin * w + (w * (1 - xMin)) / 2, y: h * 0.25 };
    const vel = { x: 0, y: 0 };
    let target = { x: pos.x, y: pos.y };
    let manualUntil = 0;
    let last = 0;
    let raf = 0;
    let visible = false;

    const tick = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
      last = now;

      const manual = now < manualUntil;
      if (!manual) {
        const s = steps[step];
        target = s;
        if (Math.hypot(pos.x - s.x, pos.y - s.y) < 5) {
          if (!dwellUntil) dwellUntil = now + s.dwell;
          else if (now > dwellUntil) {
            dwellUntil = 0;
            step += 1;
            if (step >= steps.length) {
              steps = plan();
              step = 0;
            }
          }
        }
      }

      // Critically damped spring: quick when steered by hand, unhurried when searching.
      const omega = manual ? 16 : 4.2;
      vel.x += (omega * omega * (target.x - pos.x) - 2 * omega * vel.x) * dt;
      vel.y += (omega * omega * (target.y - pos.y) - 2 * omega * vel.y) * dt;
      pos.x += vel.x * dt;
      pos.y += vel.y * dt;
      set(pos.x, pos.y);
      check(pos.x, pos.y);
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = 0;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(wall);

    const ro = new ResizeObserver(() => {
      measure();
      steps = plan();
      step = 0;
    });
    ro.observe(wall);

    if (controlRef) {
      controlRef.current = {
        point(clientX, clientY, holdMs) {
          const box = wall.getBoundingClientRect();
          target = { x: clientX - box.left, y: clientY - box.top };
          manualUntil = performance.now() + holdMs;
          dwellUntil = 0;
        },
      };
    }

    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      if (controlRef) controlRef.current = null;
    };
  }, [wallRef, leakRefs, xMin, onFound, controlRef]);
}

function Row({
  row,
  lit,
  found,
  wide,
  leakRef,
}: {
  row: WallRow;
  lit: boolean;
  found: boolean;
  wide: boolean;
  leakRef?: (el: HTMLElement | null) => void;
}) {
  const l = row.data;
  const status = l ? (found ? l.stamp : `⚑ ${l.stamp}`) : `✓ ${row.layer}`;
  return (
    <div className={cn("na-row", l && "is-leak", found && "is-found")}>
      {wide && <span>{row.id}</span>}
      {wide && <span>{row.won}</span>}
      <span className="truncate">{row.name}</span>
      <span className="text-right">{money(row.hubspot)}</span>
      {wide && <span>{row.invoice}</span>}
      <span className={cn("text-right", l && "na-xero")}>{row.xero === null ? "——" : money(row.xero)}</span>
      <span ref={leakRef} className={cn("na-status", lit && !l && "text-(--na-green)")}>
        {l && found && <i className="na-badge not-italic">{l.letter}</i>}
        {status}
      </span>
    </div>
  );
}

function LedgerWall({
  variant,
  rows,
  found,
  onFound,
  controlRef,
  className,
}: {
  variant: "wide" | "panel";
  rows: WallRow[];
  found: boolean[];
  onFound: (i: number) => void;
  controlRef: RefObject<BeamControl | null>;
  className?: string;
}) {
  const wallRef = useRef<HTMLDivElement>(null);
  const leakRefs = useRef<(HTMLElement | null)[]>([]);
  const wide = variant === "wide";
  useBeam(wallRef, leakRefs, { xMin: wide ? 0.45 : 0, onFound, controlRef });

  const layer = (lit: boolean) => (
    <div className={cn("na-rows", lit ? "na-lit" : "na-dim")}>
      {rows.map((row, i) => (
        <Row
          key={i}
          row={row}
          lit={lit}
          wide={wide}
          found={row.leak !== undefined && found[row.leak]}
          leakRef={
            !lit && row.leak !== undefined
              ? (el) => {
                  leakRefs.current[row.leak!] = el;
                }
              : undefined
          }
        />
      ))}
    </div>
  );

  return (
    <div
      ref={wallRef}
      aria-hidden
      className={cn("na-wall", wide ? "na-wall-wide" : "na-wall-panel", className)}
      onPointerDown={wide ? undefined : (e) => controlRef.current?.point(e.clientX, e.clientY, 3200)}
    >
      {layer(false)}
      {layer(true)}
      <div className="na-glow" />
      <div className="na-ring" />
    </div>
  );
}

function EvidenceTray({ found }: { found: boolean[] }) {
  const count = found.filter(Boolean).length;
  const total = RISK_LEAKS.reduce((sum, l, i) => sum + (found[i] ? l.amount : 0), 0);
  const shown = useTween(total, 1100);
  const all = count === RISK_LEAKS.length;

  return (
    <div className="na-tray" aria-hidden>
      <div className="na-tray-intro">
        <p className="na-mono text-[10.5px] tracking-[0.16em] text-(--na-amber) uppercase">
          Sample ledger · {all ? "Case closed" : `${count} of 3 found`}
        </p>
        <p className="mt-2 text-[15px] leading-snug text-(--na-bone)">
          {all ? "Three leaks, found before month-end." : "Three leaks are hiding in this ledger."}
        </p>
        <p className="mt-1 text-[13px] text-(--na-faint)">
          <span className="hidden pointer-fine:inline">Move your cursor to steer the light.</span>
          <span className="pointer-fine:hidden">Tap the ledger to steer the light.</span>
        </p>
      </div>
      <ol className="na-tray-slots">
        {RISK_LEAKS.map((l, i) => (
          <li key={l.ref} className={cn("na-slot", found[i] && "is-found")}>
            <span className="na-slot-letter">{l.letter}</span>
            <span className="min-w-0">
              <span className="na-slot-title">{found[i] ? l.title : "Not yet found"}</span>
              <span className="na-slot-amt na-mono">{found[i] ? gbp(l.amount) : "£ — —"}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="na-tray-total">
        <p className="na-mono text-[10.5px] tracking-[0.16em] text-(--na-faint) uppercase">Revenue at risk</p>
        <p className={cn("na-total na-mono", all && "is-all")}>{gbp(shown)}</p>
      </div>
    </div>
  );
}

export function NightHero() {
  const [found, setFound] = useState([false, false, false]);
  const onFound = useCallback((i: number) => setFound((f) => (f[i] ? f : f.map((v, j) => (j === i ? true : v)))), []);
  const wideCtl = useRef<BeamControl | null>(null);
  const panelCtl = useRef<BeamControl | null>(null);

  return (
    <section
      className="na-hero relative isolate overflow-hidden"
      onPointerMove={(e) => {
        if (e.pointerType === "mouse") wideCtl.current?.point(e.clientX, e.clientY, 2400);
      }}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") wideCtl.current?.point(e.clientX, e.clientY, 3200);
      }}
    >
      <LedgerWall
        variant="wide"
        rows={WIDE_ROWS}
        found={found}
        onFound={onFound}
        controlRef={wideCtl}
        className="absolute inset-y-0 right-0 hidden w-[min(1040px,74%)] lg:block"
      />
      <div aria-hidden className="na-hero-shade" />

      <div className="relative mx-auto flex min-h-[inherit] max-w-[1360px] flex-col px-[max(1rem,env(safe-area-inset-left))] pt-8 sm:px-8 lg:pt-[clamp(56px,10vh,120px)]">
        <p className="na-mono na-rise flex items-center gap-2.5 text-[10.5px] tracking-[0.18em] text-(--na-amber) uppercase">
          <span className="na-lamp" aria-hidden />
          Live for HubSpot + Xero<span className="max-sm:hidden"> · every two hours</span>
        </p>
        <h1 className="mt-6 text-[clamp(40px,6.3vw,98px)] leading-[0.98] lg:mt-8">
          <span className="na-rise block" style={v(1)}>
            Closed in HubSpot.
          </span>
          <span className="na-rise block" style={v(2)}>
            Missing in Xero.
          </span>
          <em className="na-rise block" style={v(3)}>
            Caught before month-end.
          </em>
        </h1>
        <p
          className="na-rise mt-6 max-w-[44ch] text-[16.5px] leading-relaxed text-(--na-dim) max-lg:order-2 lg:mt-8 lg:text-[19px]"
          style={v(4)}
        >
          Auditor Alpha checks every closed deal against your Xero invoices{" "}
          <span className="text-(--na-bone)">every two hours</span>, and shines a light on anything never billed, billed
          short, billed without VAT or billed twice.
        </p>
        <div
          className="na-rise mt-8 flex flex-wrap items-center gap-x-7 gap-y-4 max-lg:order-3 max-lg:pb-12"
          style={v(5)}
        >
          <Link href="#start" className="na-cta max-sm:w-full">
            Start your free 7-day Health Check
            <ArrowRight className="size-[18px]" aria-hidden />
          </Link>
          <Link href="#leaks" className="na-link">
            See what it finds
          </Link>
        </div>

        <LedgerWall
          variant="panel"
          rows={PANEL_ROWS}
          found={found}
          onFound={onFound}
          controlRef={panelCtl}
          className="relative -mx-[max(1rem,env(safe-area-inset-left))] mt-8 h-[336px] max-lg:order-1 sm:-mx-8 lg:hidden"
        />

        <div className="mt-auto pt-4 max-lg:order-1 lg:pt-14 lg:pb-[84px]">
          <EvidenceTray found={found} />
          <p className="sr-only">
            Illustrative ledger: three of its deals hide leaks worth {gbp(AT_RISK)} in total:{" "}
            {RISK_LEAKS.map((l) => `${l.party}, ${l.title.toLowerCase()}, ${gbp(l.amount)}`).join("; ")}.
          </p>
        </div>
      </div>
    </section>
  );
}
