import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { PageHero } from "@/components/ui/page-hero";
import { TickItem } from "@/components/ui/marks";
import { PricingExplorer } from "@/components/pricing/pricing-explorer";
import { ComparisonTable } from "@/components/pricing/comparison-table";
import { Guarantee } from "@/components/pricing/guarantee";
import { FaqList, type FaqItem } from "@/components/home/faq";
import { FinalCTA } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start with a free 7-day Revenue Health Check, then choose Core, Growth or Scale by Revenue Under Assurance. From £750/month.",
};

const PRICING_FAQ: FaqItem[] = [
  {
    q: "What is Revenue Under Assurance?",
    a: "The annual revenue flowing through the systems we reconcile for you, measured from closed-won revenue over the trailing 12 months. It decides your tier: Core up to £1.5M, Growth up to £5M, Scale up to £15M.",
  },
  {
    q: "What happens when the 7-day Health Check ends?",
    a: "You keep the report. To keep continuous monitoring running, choose a plan. If you don’t, nothing is charged; no card is taken for the Health Check.",
  },
  {
    q: "How does billing work?",
    a: "Plans are priced in GBP and billed monthly, or annually with 15% off. There’s no long-term lock-in. All prices exclude VAT; UK customers are charged VAT at the prevailing rate.",
  },
  {
    q: "Can we change plans later?",
    a: "Yes. If your revenue grows or you need more authorised users, the team moves you to the tier that fits.",
  },
  {
    q: "Who counts as a user?",
    a: "Authorised users have full platform access. Report receivers only view the reports you send them, and they’re unlimited on every plan.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Start free. <em>Stay because it pays.</em>
          </>
        }
        lede="Every plan starts with a free 7-day Revenue Health Check on your own data. After that, plans are priced by the revenue you put under assurance."
      />

      <Section>
        <Container>
          <PricingExplorer />
          <p className="mt-6 text-sm text-muted">Prices exclude VAT. Report receivers are unlimited on every plan.</p>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading
            eyebrow="Compare"
            title={
              <>
                What each plan <em>includes.</em>
              </>
            }
          />
          <div className="mt-10">
            <ComparisonTable />
          </div>
        </Container>
      </Section>

      <Section id="guarantee">
        <Container>
          <Guarantee />
          <ul className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-3 text-[15px] text-ink-2 sm:grid-cols-2">
            <TickItem>Flags raised during your free Health Check count towards it.</TickItem>
            <TickItem>You decide which flags are genuine. A false alarm is your call.</TickItem>
            <TickItem>The refund covers your first paid month in full, VAT included.</TickItem>
            <TickItem>Applies to monthly plans, once per company.</TickItem>
          </ul>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-[72px]">
          <SectionHeading
            eyebrow="Questions"
            title={
              <>
                Pricing, <em>plainly.</em>
              </>
            }
          />
          <FaqList items={PRICING_FAQ} />
        </Container>
      </Section>

      <FinalCTA
        title={
          <>
            Find your number <em>before</em> you pick a plan.
          </>
        }
      />
    </>
  );
}
