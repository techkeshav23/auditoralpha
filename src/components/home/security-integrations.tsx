import { Container, Section, SectionHeading } from "@/components/ui/section";
import { TextLink } from "@/components/ui/button";
import { StackRequestForm } from "@/components/forms/stack-request-form";
import { LivePair } from "@/components/integrations/live-pair";
import { ROADMAP_NAMES } from "@/lib/integrations";
import { SecurityGrid } from "./security-grid";

/** Desktop only: on phones, Security and Integrations are their own screens under More. */
export function SecurityIntegrations() {
  return (
    <Section tone="white" id="security" className="max-lg:hidden">
      <Container className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-[72px]">
        <div>
          <SectionHeading
            eyebrow="07 – Security & integrations"
            title={
              <>
                Read-only <em>by default.</em>
              </>
            }
            lede="Auditor Alpha reads your deals and invoices. It never writes to HubSpot or Xero unless an administrator explicitly approves an action."
          />
          <SecurityGrid className="mt-11" />
          <TextLink href="/security" className="mt-6">
            Security in detail
          </TextLink>
        </div>
        <div className="rounded-[18px] border border-rule bg-paper p-5 sm:p-7">
          <p className="font-mono text-[11px] font-semibold tracking-[0.09em] text-muted uppercase">Live today</p>
          <div className="mt-4 mb-[30px]">
            <LivePair />
          </div>
          <p className="font-mono text-[11px] font-semibold tracking-[0.09em] text-muted uppercase">On the roadmap</p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {ROADMAP_NAMES.map((r) => (
              <span key={r} className="rounded-full border border-rule bg-card px-2.5 py-1.5 text-[13px] text-ink-2">
                {r}
              </span>
            ))}
          </div>
          <div className="mt-[26px] border-t border-rule pt-6">
            <p className="mb-3 text-[15px] font-semibold text-ink">Running something else?</p>
            <StackRequestForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
