import type { Metadata, Viewport } from "next";
import { numberFonts } from "@/components/directions/big-number/fonts";
import { Masthead, NumberFooter } from "@/components/directions/big-number/parts";
import { NumberHero } from "@/components/directions/big-number/hero";
import { Funnel, LeakTable, NumberClose } from "@/components/directions/big-number/sections";
import { ConceptTabBar } from "@/components/directions/concept-tab-bar";
import { DirectionSwitch } from "@/components/directions/direction-switch";

export const metadata: Metadata = {
  title: "02 Big Number",
  description: "Design direction 02 for Auditor Alpha: the figure is the headline.",
};

export const viewport: Viewport = { themeColor: "#f2f0ea" };

export default function BigNumberPage() {
  return (
    <div className={`${numberFonts} bn-root`}>
      <Masthead />
      <NumberHero />
      <LeakTable />
      <Funnel />
      <NumberClose />
      <NumberFooter />
      <ConceptTabBar skin="number" />
      <DirectionSwitch current="big-number" tone="light" />
    </div>
  );
}
