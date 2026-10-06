import type { Metadata, Viewport } from "next";
import { nightFonts } from "@/components/directions/night-audit/fonts";
import { NightFooter, NightNav } from "@/components/directions/night-audit/chrome";
import { NightHero } from "@/components/directions/night-audit/night-hero";
import { Exhibits } from "@/components/directions/night-audit/exhibits";
import { Runs } from "@/components/directions/night-audit/runs";
import { ConceptTabBar } from "@/components/directions/concept-tab-bar";
import { DirectionSwitch } from "@/components/directions/direction-switch";

export const metadata: Metadata = {
  title: "01 Night Audit",
  description: "Design direction 01 for Auditor Alpha: a light that finds what the ledger hides.",
};

export const viewport: Viewport = { themeColor: "#07080a" };

export default function NightAuditPage() {
  return (
    <div className={`${nightFonts} na-root`}>
      <NightNav />
      <NightHero />
      <Exhibits />
      <Runs />
      <NightFooter />
      <ConceptTabBar skin="night" />
      <DirectionSwitch current="night-audit" tone="dark" />
    </div>
  );
}
