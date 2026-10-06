"use client";

import { useState, type CSSProperties, type FormEvent } from "react";
import { cn } from "@/lib/cn";
import { gbp, gbpShort, pct } from "@/lib/format";
import { RECOVERY_RATE, planForRevenue } from "@/lib/plans";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { useLeadSubmit } from "@/components/forms/use-lead";

const MIN_REV = 250_000;
const MAX_REV = 20_000_000;
const DEFAULT_SLIDER = 684; // ≈ £5.0M on the log scale below

/** Log-scale slider position (0–1000) → revenue rounded to a sensible step. */
function revenueFromSlider(v: number) {
  const raw = MIN_REV * Math.pow(MAX_REV / MIN_REV, v / 1000);
  const step = raw < 1e6 ? 25_000 : raw < 5e6 ? 100_000 : 250_000;
  return Math.round(raw / step) * step;
}

function Line({
  k,
  v,
  muted,
  total,
  negative,
}: {
  k: string;
  v: string;
  muted?: boolean;
  total?: boolean;
  negative?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline gap-2 py-[9px] text-[13.5px] sm:text-[14.5px]",
        total && "mt-2.5 border-t-2 border-ink pt-4 text-[15px] font-bold sm:text-[17px]",
      )}
    >
      <span className={cn("shrink-0", muted && "text-muted")}>{k}</span>
      <span className="leader" />
      <span
        className={cn(
          "shrink-0 font-medium",
          muted && "text-muted",
          total &&
            (negative
              ? "text-[20px] font-semibold text-red sm:text-2xl"
              : "text-[20px] font-semibold text-green sm:text-2xl"),
        )}
      >
        {v}
      </span>
    </div>
  );
}

export function LeakageCalculator() {
  const [slider, setSlider] = useState(DEFAULT_SLIDER);
  const [rateTenths, setRateTenths] = useState(15); // 1.5%
  const revenue = revenueFromSlider(slider);
  const rate = rateTenths / 1000;
  const leakage = revenue * rate;
  const recoverable = leakage * RECOVERY_RATE;
  const plan = planForRevenue(revenue);
  const cost = plan ? plan.monthly * 12 : null;
  const net = cost === null ? recoverable : recoverable - cost;

  let verdict: { text: string; tone: "green" | "blue" | "red" }[];
  if (cost === null) {
    verdict = [
      { text: "Above £15M · tailored demo", tone: "blue" },
      { text: `${gbp(recoverable)} recoverable`, tone: "green" },
    ];
  } else if (recoverable < cost) {
    verdict = [
      { text: "Below break-even at this size", tone: "red" },
      { text: "Start with the free Health Check", tone: "blue" },
    ];
  } else {
    const payback = cost / (recoverable / 12);
    verdict = [
      { text: `${(recoverable / cost).toFixed(1)}× return`, tone: "green" },
      { text: `Pays back in ${payback < 1 ? "under a month" : `${payback.toFixed(1)} months`}`, tone: "blue" },
    ];
  }

  return (
    <Section tone="ink" id="calculator">
      <Container className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-2 lg:gap-[72px]">
        <div>
          <SectionHeading
            eyebrow="04 – What it’s costing you"
            title={
              <>
                Your leakage, <em>on one statement.</em>
              </>
            }
            lede="Move the sliders. We’ll pick the plan your revenue falls into and show the return, including when it doesn’t pay."
          />
          <div className="mt-10">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="rev" className="text-[15px] text-[#c9cfdf]">
                Annual revenue
              </label>
              <output
                htmlFor="rev"
                className="font-mono text-[30px] leading-none font-medium tracking-[-0.02em] text-white"
              >
                {gbpShort(revenue)}
              </output>
            </div>
            <input
              id="rev"
              type="range"
              min={0}
              max={1000}
              value={slider}
              onChange={(e) => setSlider(Number(e.target.value))}
              aria-valuetext={gbpShort(revenue)}
              className="range mt-3"
              style={{ "--p": `${slider / 10}%` } as CSSProperties}
            />
            <div className="mt-1.5 flex justify-between font-mono text-[11px] text-[#8b93aa]">
              <span>£250k</span>
              <span>£20M</span>
            </div>
          </div>
          <div className="mt-10">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="rate" className="text-[15px] text-[#c9cfdf]">
                Estimated leakage rate
              </label>
              <output
                htmlFor="rate"
                className="font-mono text-[30px] leading-none font-medium tracking-[-0.02em] text-white"
              >
                {pct(rate)}
              </output>
            </div>
            <input
              id="rate"
              type="range"
              min={5}
              max={50}
              value={rateTenths}
              onChange={(e) => setRateTenths(Number(e.target.value))}
              aria-valuetext={pct(rate)}
              className="range mt-3"
              style={{ "--p": `${((rateTenths - 5) / 45) * 100}%` } as CSSProperties}
            />
            <div className="mt-1.5 flex justify-between font-mono text-[11px] text-[#8b93aa]">
              <span>0.5%</span>
              <span>5%</span>
            </div>
          </div>
          <p className="mt-10 rounded-xl border border-white/10 px-5 py-[18px] text-sm text-[#9aa3ba]">
            <b className="font-semibold text-white">Not sure of your rate?</b> That’s what the Health Check is for. It
            replaces this estimate with your real number in seven days.
          </p>
        </div>

        <div>
          <div className="relative drop-shadow-[0_34px_40px_rgb(0_0_0/0.5)]">
            <div className="receipt-edge rounded-t-md bg-[#fbfaf5] px-5 pt-6 pb-10 font-mono text-ink tabular-nums sm:px-[30px] sm:pt-[30px]">
              <div className="flex items-start justify-between gap-3 border-b-[1.5px] border-dashed border-[#c9c4b5] pb-4">
                <div>
                  <p className="text-sm font-bold tracking-[0.1em]">LEAKAGE STATEMENT</p>
                  <p className="text-[11.5px] text-muted">Prepared for you · illustrative</p>
                </div>
                <span className="rounded-[5px] bg-paper-2 px-2 py-[5px] text-[10.5px] leading-none font-semibold tracking-[0.06em] text-muted uppercase">
                  Estimate
                </span>
              </div>
              <Line k="Annual revenue" v={gbp(revenue)} />
              <Line k={`Leakage at ${pct(rate)}`} v={gbp(leakage)} />
              <Line k="Recoverable (≈85%)" v={gbp(recoverable)} />
              <Line
                k={plan ? `${plan.name} plan × 12 months` : "Above £15M: tailored demo"}
                v={cost === null ? "—" : gbp(-cost)}
                muted
              />
              <Line
                k={cost === null ? "Recoverable, year one" : "Net, year one"}
                v={gbp(net)}
                total
                negative={net < 0}
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {verdict.map((c) => (
                  <span
                    key={c.text}
                    className={cn(
                      "rounded-md px-2.5 py-2 text-[12.5px] leading-none font-semibold",
                      c.tone === "green" && "bg-green-wash text-green",
                      c.tone === "blue" && "bg-blue-wash text-blue-ink",
                      c.tone === "red" && "bg-red-wash text-red",
                    )}
                  >
                    {c.text}
                  </span>
                ))}
              </div>
              <p className="mt-[18px] text-[11px] leading-normal text-muted">
                Estimate based on your inputs. Plan chosen by Revenue Under Assurance, billed monthly, excluding VAT.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <ButtonLink href="/start" arrow className="max-sm:w-full">
              Get my real number, free
            </ButtonLink>
            <EmailStatement revenue={revenue} rate={rate} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function EmailStatement({ revenue, rate }: { revenue: number; rate: number }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { status, submit, fieldError, formError } = useLeadSubmit();
  const error = fieldError("email") ?? formError(["email"]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await submit({ type: "statement", email, revenue, rate });
  }

  if (status === "sent") return <p className="text-sm font-medium text-[#9fe0c2]">Statement sent to {email}.</p>;

  if (!open)
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(buttonClasses({ variant: "line" }), "max-sm:w-full")}
      >
        Email me this statement
      </button>
    );

  return (
    <form noValidate onSubmit={onSubmit} className="flex w-full flex-wrap gap-2 sm:w-auto">
      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        autoFocus
        aria-label="Work email"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "statement-error" : undefined}
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 min-w-0 flex-1 rounded-[10px] border border-white/20 bg-white/5 px-3.5 text-[15px] text-white placeholder:text-[#8b93aa] focus:outline-2 focus:outline-blue-soft sm:w-60"
      />
      <button type="submit" disabled={status === "sending"} className={buttonClasses({ variant: "line" })}>
        {status === "sending" ? "Sending…" : "Send"}
      </button>
      {error && (
        <p id="statement-error" className="w-full text-sm text-[#ffb4ab]">
          {error}
        </p>
      )}
    </form>
  );
}
