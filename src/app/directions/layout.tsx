import type { Metadata } from "next";
import "./night-audit.css";
import "./big-number.css";
import "./green-bar.css";
import "./index.css";

export const metadata: Metadata = {
  title: { default: "Design directions", template: "%s · Auditor Alpha" },
};

export default function DirectionsLayout({ children }: LayoutProps<"/directions">) {
  return children;
}
