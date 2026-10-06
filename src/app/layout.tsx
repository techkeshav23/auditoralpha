import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { ToastProvider } from "@/components/ui/toast";
import { SiteHeader } from "@/components/layout/site-header";
import { AppBar } from "@/components/layout/app-bar";
import { TabBar } from "@/components/layout/tab-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Auditor Alpha — Catch revenue that never got invoiced",
    template: "%s · Auditor Alpha",
  },
  description:
    "Auditor Alpha reconciles every closed HubSpot deal against your Xero invoices every two hours, and flags what was never billed, billed short or billed without VAT.",
  applicationName: "Auditor Alpha",
  appleWebApp: { capable: true, title: "Auditor Alpha", statusBarStyle: "default" },
  formatDetection: { telephone: false },
  // Concept build for review — keep it out of search indexes.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f5f0",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      // Keeps our smooth in-page scrolling from animating Next’s scroll-to-top on navigation.
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable} ${newsreader.variable}`}
    >
      <body className="min-h-dvh">
        <ToastProvider>
          <a
            href="#top"
            className="sr-only z-[200] rounded-lg bg-ink px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <SiteHeader />
          <AppBar />
          <main id="top" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <TabBar />
        </ToastProvider>
      </body>
    </html>
  );
}
