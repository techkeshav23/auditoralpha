"use client";

import { useId, useState, type CSSProperties } from "react";
import { gbp, gbpShort } from "@/lib/format";
import { RECOVERY_RATE, planForRevenue } from "@/lib/plans";
import { useTween } from "../hooks";

const MIN_REV = 250_000;
const MAX_REV = 20_000_000;

/** Log-scale slider position (0–1000) → revenue rounded to a sensible step. */
function revenueFromSlider(v: number) {
  const raw = MIN_REV * Math.pow(MAX_REV / MIN_REV, v / 1000);
  const step = raw < 1e6 ? 25_000 : raw < 5e6 ? 100_000 : 250_000;
  return Math.round(raw / step) * step;
}

function Slider({
  label,
  value,
  display,
  min,
  max,
  onChange,
  valueText,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  onChange: (v: number) => void;
  valueText: string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] text-(--na-bone)">
          {label}
        </label>
        <span className="na-mono text-[15px] text-(--na-amber)">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        aria-valuetext={valueText}
        onChange={(e) => onChange(Number(e.target.value))}
        className="na-range mt-3"
        style={{ "--p": `${((value - min) / (max - min)) * 100}%` } as CSSProperties}
      />
    </div>
  );
}

/** “How much is in the dark?” — the leakage estimate, lit like everything else on the page. */
export function DarkCalculator() {
  const [slider, setSlider] = useState(684);
  const [rateTenths, setRateTenths] = useState(15);
  const revenue = revenueFromSlider(slider);
  const rate = rateTenths / 1000;
  const leakage = revenue * rate;
  const recoverable = leakage * RECOVERY_RATE;
  const plan = planForRevenue(revenue);
  const cost = plan ? plan.monthly * 12 : null;
  const shown = useTween(leakage, 500);
  // The lamp burns brighter the more revenue sits in the dark.
  const glow = 0.35 + (rateTenths / 50) * 0.65;

  return (
    <section className="relative isolate overflow-hidden py-20 lg:py-28">
      <div className="mx-auto grid max-w-[1360px] grid-cols-[minmax(0,1fr)] items-center gap-12 px-[max(1rem,env(safe-area-inset-left))] sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p className="na-mono text-[10.5px] tracking-[0.18em] text-(--na-amber) uppercase">Your numbers</p>
          <h2 className="mt-5 text-[clamp(36px,5vw,72px)] leading-[1.02]">
            How much revenue is <em>in the dark?</em>
          </h2>
          <p className="mt-5 max-w-[46ch] text-[16.5px] leading-relaxed lg:text-lg">
            Move the sliders to your revenue and an estimated leakage rate. Then turn the lights on in your own ledger.
          </p>
          <div className="mt-10 grid gap-8">
            <Slider
              label="Annual revenue"
              value={slider}
              min={0}
              max={1000}
              onChange={setSlider}
              display={gbpShort(revenue)}
              valueText={gbp(revenue)}
            />
            <Slider
              label="Estimated leakage rate"
              value={rateTenths}
              min={5}
              max={50}
              onChange={setRateTenths}
              display={`${(rateTenths / 10).toFixed(1)}%`}
              valueText={`${(rateTenths / 10).toFixed(1)} percent`}
            />
          </div>
        </div>

        <div className="na-lamp-card" style={{ "--glow": glow } as CSSProperties}>
          <p className="na-mono text-[10.5px] tracking-[0.16em] text-(--na-faint) uppercase">
            Billed by nobody, every year
          </p>
          <p className="na-lamp-figure" aria-hidden>
            {gbp(shown)}
          </p>
          <p className="sr-only" aria-live="polite">
            {gbp(leakage)} a year
          </p>
          <dl className="na-lamp-lines na-mono">
            <div>
              <dt>Recoverable with Auditor Alpha ({Math.round(RECOVERY_RATE * 100)}%)</dt>
              <dd className="text-(--na-bone)">{gbp(recoverable)}</dd>
            </div>
            <div>
              <dt>{plan ? `${plan.name} plan, a year` : "Plan"}</dt>
              <dd>{cost === null ? "Tailored above £15M" : gbp(cost)}</dd>
            </div>
            <div className="is-total">
              <dt>Net back in the business</dt>
              <dd>{cost === null ? gbp(recoverable) : gbp(recoverable - cost)}</dd>
            </div>
          </dl>
          <p className="mt-5 text-[12.5px] leading-relaxed text-(--na-faint)">
            Indicative estimate. 2–5% leakage is a common industry benchmark, not a guaranteed outcome.
          </p>
        </div>
      </div>
    </section>
  );
}
