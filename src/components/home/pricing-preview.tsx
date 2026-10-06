import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { PlanCards } from "@/components/pricing/plan-cards";
import { Guarantee } from "@/components/pricing/guarantee";

export function PricingPreview() {
  return (
    <Section id="pricing" className="max-lg:hidden">
      <Container>
        <SectionHeading
          eyebrow="05 – Pricing"
          title={
            <>
              Start free. <em>Stay because it pays.</em>
            </>
          }
          lede="Priced by Revenue Under Assurance, your closed-won revenue over the last 12 months. Unlimited report receivers on every plan."
        />
        <div className="mt-12 md:mt-14">
          <PlanCards />
        </div>
        <p className="mt-5 flex flex-wrap gap-x-[18px] gap-y-1.5 text-sm text-muted">
          <span>
            Above £15M?{" "}
            <Link href="/contact" className="border-b border-rule font-semibold text-ink">
              Book a tailored demo
            </Link>
          </span>
          <span>Annual billing saves 15%</span>
          <span>Prices exclude VAT</span>
          <Link href="/pricing" className="border-b border-rule font-semibold text-ink">
            Compare plans in detail
          </Link>
        </p>
        <Guarantee className="mt-10" />
      </Container>
    </Section>
  );
}
