import type { Metadata } from "next";
import { Ban, Database, FileCheck2, Lock, Users } from "lucide-react";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { Tick } from "@/components/ui/marks";
import { FaqList, type FaqItem } from "@/components/home/faq";
import { FinalCTA } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Read-only OAuth, TLS 1.3 and AES-256 encryption, database-level tenant isolation and a person reviewing every flag.",
};

const READS = [
  "The closed deals in HubSpot that Auditor Alpha reconciles",
  "The Xero invoices it reconciles them against",
  "Nothing more: HubSpot and Xero show the exact read permissions on their own consent screens",
];

const NEVER = [
  "Write to HubSpot or Xero without an administrator’s explicit approval",
  "Send invoices, chase payments or move money",
  "Share your data with any other customer’s workspace",
  "Act on a flag without a person reviewing it first",
];

const STATUS = [
  { control: "Access scopes", status: "In place", detail: "Read-only OAuth for HubSpot and Xero", ok: true },
  { control: "Encryption in transit", status: "In place", detail: "TLS 1.3 on every connection", ok: true },
  { control: "Encryption at rest", status: "In place", detail: "AES-256", ok: true },
  {
    control: "Tenant isolation",
    status: "In place",
    detail: "Row-level security enforced at the database layer",
    ok: true,
  },
  { control: "Hosting", status: "In place", detail: "SOC 2 Type II–audited cloud infrastructure", ok: true },
  { control: "Penetration testing", status: "In place", detail: "Independent, external testing", ok: true },
  {
    control: "Auditor Alpha SOC 2 audit",
    status: "Not yet complete",
    detail: "Listed separately from our hosting provider’s audit",
    ok: false,
  },
];

const SECURITY_FAQ: FaqItem[] = [
  {
    q: "Can Auditor Alpha change our books?",
    a: "Not unless you ask it to. Access is read-only by default. Any write action, such as drafting an invoice into Xero, happens only when an administrator explicitly approves it; otherwise fixes are made by your team, in your own systems.",
  },
  {
    q: "How do we disconnect?",
    a: "Revoke access from HubSpot or Xero at any time, or ask us to. Monitoring stops immediately.",
  },
  {
    q: "Can we review your security before connecting?",
    a: "Talk to the team before you connect anything. Our sub-processor list is published alongside our other legal documents.",
  },
];

function FlowNode({
  icon: Icon,
  title,
  body,
  dark,
}: {
  icon: typeof Lock;
  title: string;
  body: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("rounded-2xl border p-5", dark ? "border-ink bg-ink text-[#b9c0d2]" : "border-rule bg-card")}>
      <Icon className={cn("size-5", dark ? "text-blue-soft" : "text-blue")} />
      <p className={cn("mt-3 font-semibold", dark ? "text-white" : "text-ink")}>{title}</p>
      <p className={cn("mt-1 text-sm", dark ? "text-[#9aa3ba]" : "text-muted")}>{body}</p>
    </div>
  );
}

function FlowLink({ label, crossed }: { label: string; crossed?: boolean }) {
  return (
    <div className="flex items-center justify-center py-2 lg:flex-col lg:py-0">
      <span
        className={cn(
          "rounded-full border px-2.5 py-1 font-mono text-[10.5px] font-semibold tracking-[0.06em] whitespace-nowrap uppercase",
          crossed ? "border-red/40 bg-red-wash text-red" : "border-rule bg-paper text-ink",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        title={
          <>
            Read-only <em>by default.</em>
          </>
        }
        lede="Auditor Alpha reads your deals and invoices, and writes nothing back unless an administrator explicitly approves it. Here is what we read, what we never do, and where our certifications stand."
      >
        <ButtonLink href="/contact" variant="outline">
          Talk to us about security
        </ButtonLink>
      </PageHero>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Data flow"
            title={
              <>
                What goes where, <em>and what stays put.</em>
              </>
            }
          />
          <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-center gap-2 lg:grid-cols-[1fr_auto_1.1fr_auto_1fr] lg:gap-4">
            <FlowNode icon={Database} title="HubSpot + Xero" body="Your CRM and ledger. Records stay where they are." />
            <FlowLink label="Read-only · TLS 1.3" />
            <FlowNode
              dark
              icon={Lock}
              title="Your isolated workspace"
              body="Reconciled every two hours. AES-256 at rest, isolated by row-level security."
            />
            <FlowLink label="Flags + evidence" />
            <FlowNode
              icon={Users}
              title="Your finance team"
              body="Reviews each flag and fixes it in your own systems."
            />
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-red lg:justify-start">
            <Ban className="size-4" /> Nothing is written back to HubSpot or Xero without an administrator’s approval.
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-[34px] leading-tight md:text-[40px]">What we read</h2>
            <ul className="mt-6 grid gap-3.5 text-[15.5px] text-ink-2">
              {READS.map((r) => (
                <li key={r} className="flex gap-3 border-t border-rule pt-3.5">
                  <Tick className="mt-1 h-3 w-[15px] text-green" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-[34px] leading-tight md:text-[40px]">What we never do</h2>
            <ul className="mt-6 grid gap-3.5 text-[15.5px] text-ink-2">
              {NEVER.map((r) => (
                <li key={r} className="flex gap-3 border-t border-rule pt-3.5">
                  <Ban className="mt-0.5 size-4 shrink-0 text-red" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Status"
            title={
              <>
                Where we stand, <em>honestly.</em>
              </>
            }
          />
          <div className="mt-10 overflow-hidden rounded-2xl border border-rule bg-card">
            {STATUS.map((s, i) => (
              <div
                key={s.control}
                className={cn(
                  "grid grid-cols-[minmax(0,1fr)] gap-1 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center md:grid-cols-[1.1fr_.6fr_1.6fr] md:gap-6 md:px-7",
                  i > 0 && "border-t border-rule-2",
                )}
              >
                <p className="font-semibold text-ink">{s.control}</p>
                <p
                  className={cn(
                    "inline-flex items-center gap-2 font-mono text-[12.5px] font-semibold",
                    s.ok ? "text-green" : "text-[#9a5b00]",
                  )}
                >
                  {s.ok ? <Tick className="h-3 w-[15px]" /> : <FileCheck2 className="size-4" />}
                  {s.status}
                </p>
                <p className="text-sm text-muted sm:col-span-2 md:col-span-1">{s.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-[72px]">
          <SectionHeading
            eyebrow="Questions"
            title={
              <>
                Security <em>reviews.</em>
              </>
            }
          />
          <FaqList items={SECURITY_FAQ} />
        </Container>
      </Section>

      <FinalCTA />
    </>
  );
}
