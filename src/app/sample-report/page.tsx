import type { Metadata } from "next";
import { Download } from "lucide-react";
import { cn } from "@/lib/cn";
import { gbp } from "@/lib/format";
import { ButtonLink, buttonClasses } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { DemoButton } from "@/components/ui/toast";
import { FlagCard } from "@/components/home/flag-card";
import { MatchingLayers } from "@/components/home/engine";
import { FinalCTA } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Sample report",
  description:
    "A redacted Revenue Health Check report: every mismatch between HubSpot and Xero, the revenue at risk and a suggested fix for each.",
};

const FINDINGS = [
  {
    ref: "AA-0412",
    type: "Not invoiced",
    party: "Northwind Trading",
    amount: 48_200,
    caughtBy: "No match (L1–L3)",
    fix: "Raise the invoice for deal DL-4402",
    risk: true,
  },
  {
    ref: "AA-0415",
    type: "Invoiced short",
    party: "Halcyon Systems",
    amount: 4_200,
    caughtBy: "L2 pair · amount rule",
    fix: "Issue a supplementary invoice for the Q3 uplift",
    risk: true,
  },
  {
    ref: "AA-0417",
    type: "VAT not applied",
    party: "██████████",
    amount: 5_600,
    caughtBy: "L2 pair · VAT rule",
    fix: "Credit INV-20██ and re-issue at 20% VAT",
    risk: true,
  },
  {
    ref: "AA-0419",
    type: "Duplicate invoice",
    party: "Kestrel Partners",
    amount: 12_400,
    caughtBy: "L3 duplicate rule",
    fix: "Void INV-2045-B and tell the client",
    risk: false,
  },
];

const atRisk = FINDINGS.filter((f) => f.risk).reduce((s, f) => s + f.amount, 0);
const overBilled = FINDINGS.filter((f) => !f.risk).reduce((s, f) => s + f.amount, 0);

const KPIS = [
  { label: "Deal–invoice pairs checked", value: "1,284" },
  { label: "Matched automatically", value: "99.7%" },
  { label: "Findings raised", value: String(FINDINGS.length) },
  { label: "Revenue at risk", value: gbp(atRisk), red: true },
];

const BREAKDOWN = FINDINGS.filter((f) => f.risk).map((f) => ({
  label: f.type,
  amount: f.amount,
  share: f.amount / atRisk,
}));

export default function SampleReportPage() {
  return (
    <>
      <PageHero
        eyebrow="Sample report"
        title={
          <>
            This is what Day 7 <em>looks like.</em>
          </>
        }
        lede="A redacted Revenue Health Check for an illustrative UK services business. Yours is built from your own HubSpot and Xero data, and it’s yours to keep."
      >
        <ButtonLink href="/start" arrow>
          Get this on your data
        </ButtonLink>
        <DemoButton label="Download PDF" className={buttonClasses({ variant: "outline" })}>
          <Download className="size-4" /> Download PDF
        </DemoButton>
      </PageHero>

      <Section className="md:py-20">
        <Container>
          <article className="relative mx-auto max-w-[1040px] rounded-[18px] border border-rule bg-card shadow-[0_40px_80px_-50px_rgb(11_21_48/0.45)]">
            <header className="flex flex-col gap-5 border-b border-rule px-5 py-6 sm:px-8 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-mono text-[11px] tracking-[0.09em] text-muted uppercase">
                  Revenue Health Check · RHC-2026-0417
                </p>
                <h2 className="mt-2 text-[30px] leading-tight md:text-[36px]">Harbourline Services Ltd</h2>
                <p className="mt-1 text-sm text-muted">Illustrative company · all figures are sample data</p>
              </div>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-[12.5px] text-ink-2">
                <dt className="text-faint">Period</dt>
                <dd>60-day baseline + 7 days</dd>
                <dt className="text-faint">Systems</dt>
                <dd>HubSpot ⇄ Xero</dd>
                <dt className="text-faint">Runs</dt>
                <dd>84 · every 2 hours</dd>
                <dt className="text-faint">Generated</dt>
                <dd>06 Oct 2026, 14:00</dd>
              </dl>
            </header>

            <div className="grid grid-cols-2 border-b border-rule md:grid-cols-4">
              {KPIS.map((k, i) => (
                <div
                  key={k.label}
                  className={cn(
                    "px-5 py-5 sm:px-8",
                    i % 2 === 1 && "border-l border-rule",
                    i >= 2 && "border-t border-rule md:border-t-0",
                    i === 2 && "md:border-l",
                  )}
                >
                  <p className="font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase">{k.label}</p>
                  <p
                    className={cn(
                      "mt-2 font-mono text-[26px] leading-none font-medium tracking-[-0.02em] md:text-[30px]",
                      k.red ? "text-red" : "text-ink",
                    )}
                  >
                    {k.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)] gap-10 px-5 py-8 sm:px-8 lg:grid-cols-[1.25fr_.75fr]">
              <div>
                <h3 className="font-mono text-[11px] font-semibold tracking-[0.09em] text-blue uppercase">Summary</h3>
                <p className="mt-3 text-[17px] leading-relaxed text-ink-2">
                  Of 1,284 closed deals and their invoices, 1,280 reconciled automatically. Four findings need action:
                  three put <b className="font-semibold text-red">{gbp(atRisk)}</b> of earned revenue at risk, and one
                  duplicate has over-billed a client by <b className="font-semibold text-ink">{gbp(overBilled)}</b>. The
                  largest single item is a deal that was never invoiced.
                </p>
              </div>
              <div>
                <h3 className="font-mono text-[11px] font-semibold tracking-[0.09em] text-blue uppercase">
                  At risk by type
                </h3>
                <ul className="mt-4 grid gap-3.5">
                  {BREAKDOWN.map((b) => (
                    <li key={b.label}>
                      <div className="flex justify-between text-sm">
                        <span className="text-ink-2">{b.label}</span>
                        <span className="font-mono text-ink">{gbp(b.amount)}</span>
                      </div>
                      <span className="mt-1.5 block h-2 overflow-hidden rounded bg-rule-2">
                        <i
                          className="block h-full rounded bg-red"
                          style={{ width: `${Math.max(4, b.share * 100)}%` }}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative border-t border-rule px-5 py-8 sm:px-8">
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.09em] text-blue uppercase">Findings</h3>
              <div className="mt-4 hidden overflow-hidden rounded-xl border border-rule md:block">
                <table className="w-full border-collapse text-left text-sm">
                  <thead className="bg-paper font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase">
                    <tr>
                      {["Ref", "Finding", "Counterparty", "Amount", "Caught by", "Suggested fix"].map((h) => (
                        <th key={h} className={cn("px-4 py-3 font-medium", h === "Amount" && "text-right")}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {FINDINGS.map((f) => (
                      <tr key={f.ref} className="border-t border-rule-2 align-top">
                        <td className="px-4 py-4 font-mono text-[12.5px] text-muted">{f.ref}</td>
                        <td className="px-4 py-4 font-semibold text-ink">
                          {f.type}
                          {!f.risk && (
                            <span className="ml-2 rounded bg-blue-wash px-1.5 py-0.5 font-mono text-[10px] font-semibold text-blue-ink uppercase">
                              Over-billed
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-ink-2">{f.party}</td>
                        <td className={cn("px-4 py-4 text-right font-mono", f.risk ? "text-red" : "text-ink")}>
                          {gbp(f.amount)}
                        </td>
                        <td className="px-4 py-4 font-mono text-[12.5px] text-ink-2">{f.caughtBy}</td>
                        <td className="px-4 py-4 text-ink-2">{f.fix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="mt-4 grid gap-3 md:hidden">
                {FINDINGS.map((f) => (
                  <li key={f.ref} className="rounded-xl border border-rule p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[11.5px] text-muted">
                          {f.ref} · {f.caughtBy}
                        </p>
                        <p className="mt-1 font-semibold text-ink">{f.type}</p>
                        <p className="text-sm text-ink-2">{f.party}</p>
                      </div>
                      <p className={cn("font-mono text-lg", f.risk ? "text-red" : "text-ink")}>{gbp(f.amount)}</p>
                    </div>
                    <p className="mt-3 border-t border-dashed border-rule-2 pt-3 text-sm text-ink-2">
                      <span className="font-mono text-[11px] tracking-[0.06em] text-faint uppercase">Fix · </span>
                      {f.fix}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)] gap-10 border-t border-rule px-5 py-8 sm:px-8 lg:grid-cols-2">
              <div>
                <h3 className="mb-4 font-mono text-[11px] font-semibold tracking-[0.09em] text-blue uppercase">
                  Finding detail · AA-0417
                </h3>
                <FlagCard />
              </div>
              <div>
                <h3 className="mb-1 font-mono text-[11px] font-semibold tracking-[0.09em] text-blue uppercase">
                  How the findings were reached
                </h3>
                <MatchingLayers />
              </div>
            </div>
          </article>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="After the report"
            title={
              <>
                Recover, then <em>stay covered.</em>
              </>
            }
          />
          <ol className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Recover",
                b: "Assign each finding to an owner. Most fixes are a single invoice or credit note in Xero.",
              },
              {
                n: "02",
                t: "Monitor",
                b: "Keep two-hourly reconciliation running so new gaps are caught within hours, not at year-end.",
              },
              {
                n: "03",
                t: "Share",
                b: "Send the report to your FD, auditors or board. Report receivers are unlimited on every plan.",
              },
            ].map((s) => (
              <li key={s.n} className="rounded-2xl border border-rule bg-paper p-6">
                <span className="font-mono text-sm text-blue">{s.n}</span>
                <h3 className="mt-3 text-xl font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-[15px] text-muted">{s.b}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <FinalCTA
        title={
          <>
            Get this report on <em>your own data.</em>
          </>
        }
      />
    </>
  );
}
