import { Hero } from "@/components/home/hero";
import { LogoStrip, Proof } from "@/components/home/proof";
import { LeakTypes } from "@/components/home/leak-types";
import { HealthCheckTimeline } from "@/components/home/health-check-timeline";
import { Engine } from "@/components/home/engine";
import { LeakageCalculator } from "@/components/home/leakage-calculator";
import { PricingPreview } from "@/components/home/pricing-preview";
import { SecurityIntegrations } from "@/components/home/security-integrations";
import { Faq } from "@/components/home/faq";
import { FinalCTA } from "@/components/home/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <LeakTypes />
      <HealthCheckTimeline />
      <Engine />
      <LeakageCalculator />
      <PricingPreview />
      <Proof />
      <SecurityIntegrations />
      <Faq />
      <FinalCTA showOnPhone />
    </>
  );
}
