import type { Metadata, Viewport } from "next";
import { greenFonts } from "@/components/directions/green-bar/fonts";
import { InkDefs } from "@/components/directions/green-bar/ink";
import {
  GreenHero,
  GreenNav,
  HowSection,
  StampSection,
  StartSection,
} from "@/components/directions/green-bar/sections";
import { ConceptTabBar } from "@/components/directions/concept-tab-bar";
import { DirectionSwitch } from "@/components/directions/direction-switch";

export const metadata: Metadata = {
  title: "03 Green Bar",
  description: "Design direction 03 for Auditor Alpha: the audit trail, printed and stamped.",
};

export const viewport: Viewport = { themeColor: "#12301f" };

export default function GreenBarPage() {
  return (
    <div className={`${greenFonts} gb-root`}>
      <InkDefs />
      <GreenNav />
      <GreenHero />
      <StampSection />
      <HowSection />
      <StartSection />
      <ConceptTabBar skin="greenbar" />
      <DirectionSwitch current="green-bar" tone="light" />
    </div>
  );
}
