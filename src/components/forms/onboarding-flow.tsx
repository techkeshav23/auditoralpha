"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ChevronLeft, Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/cn";
import { gbp } from "@/lib/format";
import type { Plan } from "@/lib/plans";
import { buttonClasses } from "@/components/ui/button";
import { FlagMark, Tick } from "@/components/ui/marks";
import { useLeadSubmit } from "./use-lead";
import { Field, FormError, Input } from "./field";

const STEPS = ["Account", "HubSpot", "Xero", "Baseline"];
const HEADING_ID = "flow-heading";

const SYSTEMS = {
  hubspot: { name: "HubSpot", reads: "The closed deals Auditor Alpha reconciles" },
  xero: { name: "Xero", reads: "The invoices it reconciles them against" },
} as const;

const LOG = [
  { text: "Meridian Logistics · INV-2041", ok: true },
  { text: "Northwind Trading · not invoiced", ok: false },
  { text: "Orion Retail Group · INV-2038", ok: true },
  { text: "Halcyon Systems · invoiced £4,200 short", ok: false },
  { text: "Brightpath Media · INV-2027", ok: true },
  { text: "Cedar & Vale · VAT not applied", ok: false },
];

/** Each step's title: a focus target so keyboard and screen-reader users land on the new step. */
function StepHeading({ children }: { children: ReactNode }) {
  return (
    <h1 id={HEADING_ID} tabIndex={-1} className="text-[30px] leading-tight outline-none sm:text-[34px]">
      {children}
    </h1>
  );
}

function BackStep({ onBack }: { onBack: () => void }) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="-ml-2 flex h-11 w-fit items-center gap-0.5 rounded-full pr-3 pl-1 text-[15px] font-medium text-blue active:scale-95"
    >
      <ChevronLeft className="size-5" /> Back
    </button>
  );
}

/** Concept preview of the 2-minute connect flow. No real OAuth happens here. */
export function OnboardingFlow({ plan }: { plan: Plan | null }) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const { status, submit, fieldError, formError } = useLeadSubmit();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    document.getElementById(HEADING_ID)?.focus();
  }, [step]);

  async function onAccount(e: FormEvent) {
    e.preventDefault();
    if (await submit({ type: "health-check", email, company })) setStep(1);
  }

  const otherError = formError(["email", "company"]);

  return (
    <div className="mx-auto w-full max-w-[600px]">
      <ol className="mb-6 grid grid-cols-4 gap-2" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined}>
            <span
              className={cn(
                "block h-1.5 rounded-full transition-colors duration-500",
                i <= step ? "bg-blue" : "bg-rule",
              )}
            />
            <span
              className={cn(
                "mt-2 block font-mono text-[10.5px] tracking-[0.08em] uppercase",
                i === step ? "text-ink" : "text-muted",
              )}
            >
              {s}
            </span>
          </li>
        ))}
      </ol>

      <div
        key={step}
        className="animate-page-in rounded-[20px] border border-rule bg-card p-6 shadow-[0_40px_70px_-40px_rgb(11_21_48/0.4)] sm:p-8"
      >
        {step === 0 && (
          <form noValidate onSubmit={onAccount} className="grid grid-cols-[minmax(0,1fr)] gap-4">
            <StepHeading>
              Start your free <em>Health Check.</em>
            </StepHeading>
            <p className="text-[15px] text-muted">
              Seven days on your own data. No card required
              {plan ? `, and ${plan.name} is pencilled in for afterwards` : ""}.
            </p>
            <Field label="Work email" error={fieldError("email")}>
              <Input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field label="Company" error={fieldError("company")}>
              <Input autoComplete="organization" value={company} onChange={(e) => setCompany(e.target.value)} />
            </Field>
            {otherError && <FormError>{otherError}</FormError>}
            <button type="submit" disabled={status === "sending"} className={buttonClasses({ full: true, size: "lg" })}>
              {status === "sending" ? "Creating your workspace…" : "Continue"}
            </button>
          </form>
        )}

        {(step === 1 || step === 2) && (
          <ConnectStep
            system={step === 1 ? "hubspot" : "xero"}
            onBack={() => setStep(step - 1)}
            onDone={() => setStep(step + 1)}
          />
        )}

        {step === 3 && <BaselineStep company={company} />}
      </div>

      <p className="mt-5 text-center text-[12.5px] text-muted">
        Concept flow: no real connection is made and no data leaves this page.
      </p>
    </div>
  );
}

function ConnectStep({
  system,
  onBack,
  onDone,
}: {
  system: keyof typeof SYSTEMS;
  onBack: () => void;
  onDone: () => void;
}) {
  const s = SYSTEMS[system];
  const [state, setState] = useState<"idle" | "connecting" | "connected">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function connect() {
    setState("connecting");
    timer.current = window.setTimeout(() => setState("connected"), 1300);
  }

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
      <BackStep onBack={onBack} />
      <StepHeading>
        Connect {s.name}, <em>read-only.</em>
      </StepHeading>
      <p className="text-[15px] text-muted">
        You’ll approve access on {s.name}’s own screen, which lists the exact read permissions before you agree.
      </p>
      <div className="rounded-xl border border-rule bg-paper p-4">
        <p className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
          <Lock className="size-3.5" /> What Auditor Alpha reads
        </p>
        <ul className="mt-3 grid gap-2 text-[15px] text-ink-2">
          <li className="flex items-start gap-2.5">
            <Tick className="mt-1 h-3 w-[15px] text-green" /> {s.reads}, and nothing more
          </li>
          <li className="flex items-start gap-2.5 text-muted">
            <span aria-hidden className="w-[15px] text-center text-red">
              ✕
            </span>
            No write permissions are requested
          </li>
        </ul>
      </div>
      {state === "connected" ? (
        <>
          <p className="flex items-center gap-2.5 rounded-xl bg-green-wash px-4 py-3.5 font-medium text-green">
            <Tick className="h-3.5 w-[18px]" /> {s.name} connected · read-only
          </p>
          <button type="button" onClick={onDone} className={buttonClasses({ full: true, size: "lg" })}>
            Continue
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={connect}
          disabled={state === "connecting"}
          className={buttonClasses({ variant: "ink", full: true, size: "lg" })}
        >
          {state === "connecting" ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Waiting for {s.name}…
            </>
          ) : (
            `Connect ${s.name}`
          )}
        </button>
      )}
    </div>
  );
}

/** Deal–invoice pairs in an illustrative 60-day baseline. */
const BASELINE_PAIRS = 1206;

function BaselineStep({ company }: { company: string }) {
  const [checked, setChecked] = useState(0);
  const done = checked >= BASELINE_PAIRS;
  const logShown = Math.min(LOG.length, Math.floor((checked / BASELINE_PAIRS) * (LOG.length + 1)));

  useEffect(() => {
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 4500;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const k = duration ? Math.min(1, (now - start) / duration) : 1;
      setChecked(Math.round(BASELINE_PAIRS * (1 - Math.pow(1 - k, 2))));
      if (k < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-5">
      <StepHeading>
        {done ? (
          <>
            Baseline complete for <em className="break-words">{company || "your company"}.</em>
          </>
        ) : (
          <>
            Reconciling your <em>last 60 days…</em>
          </>
        )}
      </StepHeading>
      <div>
        <div className="flex flex-wrap justify-between gap-x-3 font-mono text-[12.5px] text-muted">
          <span>Deal–invoice pairs checked</span>
          <span className="text-ink tabular-nums">
            {checked.toLocaleString("en-GB")} / {BASELINE_PAIRS.toLocaleString("en-GB")}
          </span>
        </div>
        <span className="mt-2 block h-2 overflow-hidden rounded-full bg-rule-2">
          <i
            className="block h-full rounded-full bg-blue transition-[width] duration-150"
            style={{ width: `${(checked / BASELINE_PAIRS) * 100}%` }}
          />
        </span>
      </div>
      <ul
        className="grid gap-1.5 rounded-xl border border-rule bg-paper p-4 font-mono text-[12.5px]"
        aria-live="polite"
      >
        {LOG.slice(0, logShown).map((l) => (
          <li key={l.text} className={cn("flex animate-page-in items-start gap-2", l.ok ? "text-ink-2" : "text-red")}>
            {l.ok ? (
              <Tick className="mt-0.5 h-3 w-[14px] shrink-0 text-green" />
            ) : (
              <FlagMark className="mt-0.5 h-3 w-[14px]" />
            )}
            {l.text}
          </li>
        ))}
        {logShown === 0 && <li className="text-muted">Fetching deals and invoices…</li>}
      </ul>
      {done && (
        <>
          <p className="rounded-xl bg-red-wash px-4 py-3.5 text-[15px] text-ink">
            <b className="font-semibold text-red">{gbp(58_000)} at risk</b> across 3 findings so far. Monitoring
            continues every two hours for the next seven days.
          </p>
          <Link
            href="/sample-report"
            className={buttonClasses({
              full: true,
              size: "lg",
              className: "text-center leading-snug whitespace-normal",
            })}
          >
            Preview your Day 7 report
          </Link>
        </>
      )}
    </div>
  );
}
