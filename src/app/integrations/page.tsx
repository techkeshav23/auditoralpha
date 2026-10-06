import type { Metadata } from "next";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { LivePair } from "@/components/integrations/live-pair";
import { CATALOGUE } from "@/lib/integrations";
import { COMPANY } from "@/lib/site";
import { StackRequestForm } from "@/components/forms/stack-request-form";
import { FinalCTA } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Integrations",
  description: "HubSpot and Xero are live today. Salesforce, QuickBooks, Sage, NetSuite and more are on the roadmap.",
};

const STEPS = [
  {
    n: "01",
    t: "Approve HubSpot",
    b: "Sign in to HubSpot and approve read-only access on its own consent screen.",
  },
  {
    n: "02",
    t: "Approve Xero",
    b: "Sign in to Xero and approve read-only access on its own consent screen.",
  },
  {
    n: "03",
    t: "Baseline runs",
    b: "Your last 60 days are reconciled straight away, then every two hours after that.",
  },
];

/** Illustrative: which HubSpot data lines up with which Xero data, and at which layer. */
const MAPPING = [
  { hubspot: "Deal ID · PO reference", xero: "Invoice reference", layer: "L1" },
  { hubspot: "Deal amount", xero: "Invoice total", layer: "L2" },
  { hubspot: "Close date", xero: "Invoice date", layer: "L2" },
  { hubspot: "Associated company", xero: "Invoice contact", layer: "L2" },
  { hubspot: "Deal name · description", xero: "Line descriptions", layer: "L2" },
  { hubspot: "Expected VAT treatment", xero: "Tax rate on the invoice", layer: "L3" },
  { hubspot: "Billing milestones", xero: "Invoice timing", layer: "L3" },
];

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title={
          <>
            HubSpot ⇄ Xero, <em>reconciled every two hours.</em>
          </>
        }
        lede="Two read-only connections, no data migration and nothing to install. More CRMs and ledgers are on the way."
        aside={
          <div className="rounded-[18px] border border-rule bg-paper p-5 sm:p-7">
            <p className="mb-4 font-mono text-[11px] font-semibold tracking-[0.09em] text-muted uppercase">
              Live today
            </p>
            <LivePair />
          </div>
        }
      >
        <ButtonLink href="/start" arrow>
          Connect in 2 minutes
        </ButtonLink>
      </PageHero>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Setup"
            title={
              <>
                Three steps, <em>two minutes.</em>
              </>
            }
          />
          <ol className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-2xl border border-rule bg-card p-6">
                <span className="font-mono text-sm text-blue">{s.n}</span>
                <h3 className="mt-3 text-xl font-semibold text-ink">{s.t}</h3>
                <p className="mt-2 text-[15px] text-muted">{s.b}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Field mapping"
            title={
              <>
                What gets compared <em>with what.</em>
              </>
            }
            lede="An illustrative view of what each layer compares. The exact fields are confirmed with you during setup."
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-rule">
            <div className="hidden grid-cols-[1fr_1fr_90px] gap-4 bg-paper px-6 py-3 font-mono text-[10.5px] tracking-[0.08em] text-muted uppercase sm:grid">
              <span>HubSpot</span>
              <span>Xero</span>
              <span className="text-right">Layer</span>
            </div>
            {MAPPING.map((m) => (
              <div
                key={m.hubspot}
                className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-t border-rule-2 px-5 py-4 sm:grid-cols-[1fr_1fr_90px] sm:items-center sm:px-6"
              >
                <span className="font-medium text-ink">{m.hubspot}</span>
                <span className="col-start-1 row-start-2 text-sm text-muted sm:col-start-auto sm:row-start-auto sm:text-[15px] sm:text-ink-2">
                  <span className="text-faint sm:hidden">⇄ </span>
                  {m.xero}
                </span>
                <span className="row-span-2 self-center justify-self-end rounded bg-blue-wash px-2 py-1 font-mono text-[11.5px] font-semibold text-blue-ink sm:row-span-1">
                  {m.layer}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Catalogue"
            title={
              <>
                Live now, <em>and next.</em>
              </>
            }
          />
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CATALOGUE.map((c) => (
              <li
                key={c.name}
                className={cn(
                  "rounded-xl border p-4",
                  c.live ? "border-green/40 bg-green-wash/50" : "border-rule bg-card",
                )}
              >
                <p className="leading-tight font-semibold text-ink">{c.name}</p>
                <p className="mt-0.5 text-[13px] text-muted">{c.kind}</p>
                <span
                  className={cn(
                    "mt-3 inline-block rounded px-1.5 py-1 font-mono text-[10px] leading-none font-bold tracking-[0.08em] uppercase",
                    c.live ? "bg-green text-white" : "bg-paper-2 text-muted",
                  )}
                >
                  {c.live ? "Live" : "Coming soon"}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl border border-rule bg-card p-5 sm:p-7">
            <p className="text-lg font-semibold text-ink">Don’t see your stack?</p>
            <p className="mt-1 mb-4 text-[15px] text-muted">The most-requested pairings get built first.</p>
            <StackRequestForm />
          </div>
          <p className="mt-6 text-[12.5px] text-muted">{COMPANY.trademarks}</p>
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
