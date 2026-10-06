import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { TextLink } from "@/components/ui/button";

export type FaqItem = { q: string; a: ReactNode };

const HOME_FAQ: FaqItem[] = [
  {
    q: "Will Auditor Alpha change anything in HubSpot or Xero?",
    a: "Not unless you ask it to. It connects read-only by default, so it reads deals and invoices but doesn’t create, edit or delete anything. Any write action, such as drafting an invoice, happens only when an administrator explicitly approves it. Every flag is reviewed by a person before anyone acts on it.",
  },
  {
    q: "What happens after the seven days?",
    a: "You keep the report. If you want ongoing monitoring, choose Core, Growth or Scale. If not, walk away. No card is taken for the Health Check.",
  },
  {
    q: "Is Auditor Alpha SOC 2 certified?",
    a: "Auditor Alpha is hosted on SOC 2 Type II–audited cloud infrastructure, with TLS 1.3 in transit and AES-256 at rest. Auditor Alpha’s own SOC 2 audit is not yet complete.",
  },
  {
    q: "We use Salesforce or QuickBooks. Can we still use it?",
    a: "HubSpot and Xero are live today. Salesforce, Pipedrive, Zoho, QuickBooks and Sage are on the roadmap. Tell us your stack and we’ll email you the day it goes live.",
  },
  {
    q: "How is pricing calculated?",
    a: "By Revenue Under Assurance: your closed-won revenue over the trailing 12 months. Core covers up to £1.5M, Growth up to £5M and Scale up to £15M. Annual billing saves 15%. Prices exclude VAT.",
  },
];

export function FaqList({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={cn("faq", className)}>
      {items.map((item, i) => (
        <details key={item.q} open={i === 0} className="border-t border-rule last:border-b">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-[17px] leading-snug font-semibold text-ink">
            {item.q}
            <span aria-hidden className="plus shrink-0 font-mono text-[26px] leading-none font-normal text-muted">
              +
            </span>
          </summary>
          <p className="max-w-[64ch] pb-6 text-muted md:pr-10">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Faq() {
  return (
    <Section id="faq">
      <Container className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-[72px]">
        <div>
          <SectionHeading
            eyebrow="08 – Questions"
            title={
              <>
                Straight <em>answers.</em>
              </>
            }
          />
          <p className="mt-5 text-lg text-ink-2">
            Anything else? <TextLink href="/contact">Talk to the team</TextLink>
          </p>
        </div>
        <FaqList items={HOME_FAQ} />
      </Container>
    </Section>
  );
}
