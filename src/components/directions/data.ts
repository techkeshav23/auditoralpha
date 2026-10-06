/**
 * Shared, illustrative content for the three design directions. Every figure
 * matches the main site: £58,000 at risk = Northwind £48,200 + Halcyon £4,200
 * + Cedar & Vale £5,600, plus one duplicate (Kestrel, £12,400 over-billed).
 */

import { COMPANY } from "@/lib/site";

export type Direction = { slug: string; no: string; name: string; line: string };

export const DIRECTIONS: Direction[] = [
  { slug: "night-audit", no: "01", name: "Night Audit", line: "A light that finds what the ledger hides." },
  { slug: "big-number", no: "02", name: "Big Number", line: "The figure is the headline." },
  { slug: "green-bar", no: "03", name: "Green Bar", line: "The audit trail, printed and stamped." },
];

export type Leak = {
  ref: string;
  letter: string;
  title: string;
  stamp: string;
  party: string;
  deal: string;
  won: string;
  hubspot: number;
  /** How the HubSpot side reads in evidence, when the bare amount would mislead. */
  hubspotText?: string;
  /** Xero amount, or null when no invoice exists. */
  xero: number | null;
  invoice: string;
  amount: number;
  /** "risk" = revenue you are owed; "over" = billed to the client twice. */
  kind: "risk" | "over";
  check: string;
  body: string;
  fix: string;
};

export const LEAKS: Leak[] = [
  {
    ref: "AA-0412",
    letter: "A",
    title: "Never invoiced",
    stamp: "Not invoiced",
    party: "Northwind Trading",
    deal: "DL-4402",
    won: "29 Sep",
    hubspot: 48_200,
    xero: null,
    invoice: "—",
    amount: 48_200,
    kind: "risk",
    check: "No match on L1–L3",
    body: "A deal closes in HubSpot and no invoice is ever raised in Xero.",
    fix: "Raise the invoice for DL-4402",
  },
  {
    ref: "AA-0415",
    letter: "B",
    title: "Invoiced short",
    stamp: "Short £4,200",
    party: "Halcyon Systems",
    deal: "DL-4391",
    won: "25 Sep",
    hubspot: 62_450,
    xero: 58_250,
    invoice: "INV-2033",
    amount: 4_200,
    kind: "risk",
    check: "L2 pair · amount rule",
    body: "An uplift agreed in the deal never makes it onto the invoice.",
    fix: "Issue a supplementary invoice",
  },
  {
    ref: "AA-0417",
    letter: "C",
    title: "VAT not applied",
    stamp: "VAT 0%",
    party: "Cedar & Vale",
    deal: "DL-4387",
    won: "24 Sep",
    hubspot: 33_600,
    hubspotText: "£28,000 + 20% VAT",
    xero: 28_000,
    invoice: "INV-2030",
    amount: 5_600,
    kind: "risk",
    check: "L2 pair · VAT rule",
    body: "A standard-rated sale goes out at 0%, and the VAT comes out of your margin.",
    fix: "Credit and re-issue at 20% VAT",
  },
  {
    ref: "AA-0419",
    letter: "D",
    title: "Billed twice",
    stamp: "Duplicate",
    party: "Kestrel Partners",
    deal: "DL-4376",
    won: "18 Sep",
    hubspot: 12_400,
    xero: 24_800,
    invoice: "INV-2045 + 2045-B",
    amount: 12_400,
    kind: "over",
    check: "L3 duplicate rule",
    body: "The same work is invoiced twice. The cash arrives, and so does the awkward call.",
    fix: "Void INV-2045-B and tell the client",
  },
];

export const RISK_LEAKS = LEAKS.filter((l) => l.kind === "risk");
export const AT_RISK = RISK_LEAKS.reduce((sum, l) => sum + l.amount, 0);

/** The hero reconciliation table used across directions. */
export type SheetRow = {
  deal: string;
  hubspot: number;
  xero: number | null;
  invoice?: string;
  layer?: string;
  leak?: Leak;
};

const leak = (ref: string) => LEAKS.find((l) => l.ref === ref);

export const SHEET: SheetRow[] = [
  { deal: "Meridian Logistics", hubspot: 127_900, xero: 127_900, invoice: "INV-2041", layer: "L1" },
  { deal: "Northwind Trading", hubspot: 48_200, xero: null, leak: leak("AA-0412") },
  { deal: "Orion Retail Group", hubspot: 94_750, xero: 94_750, invoice: "INV-2038", layer: "L2" },
  { deal: "Halcyon Systems", hubspot: 62_450, xero: 58_250, leak: leak("AA-0415") },
  { deal: "Brightpath Media", hubspot: 18_300, xero: 18_300, invoice: "INV-2027", layer: "L1" },
  { deal: "Cedar & Vale", hubspot: 33_600, xero: 28_000, leak: leak("AA-0417") },
  { deal: "Vanguard Freight", hubspot: 71_020, xero: 71_020, invoice: "INV-2024", layer: "L1" },
];

/** The matching funnel for one illustrative run. */
export const FUNNEL = [
  {
    code: "L1",
    title: "Direct ID matching",
    body: "Invoice numbers, transaction IDs and PO references, paired one-to-one.",
    of: 1_284,
    matched: 1_196,
  },
  {
    code: "L2",
    title: "Semantic matching",
    body: "No shared ID, so records pair on amount, date, counterparty and description.",
    of: 88,
    matched: 74,
  },
  {
    code: "L3",
    title: "Heuristic rules",
    body: "Timing lags, part-payments, tax treatment and duplicates, checked on every leftover and every pair.",
    of: 14,
    matched: 12,
  },
] as const;

export const ASSURANCES = ["Read-only OAuth", "Connects in 2 minutes", "No card required"];

/** Runs happen every two hours; the 14:00 run is the "current" one in the illustrations. */
export const RUN_HOURS = Array.from({ length: 12 }, (_, i) => `${String(i * 2).padStart(2, "0")}:00`);
export const CURRENT_RUN = 7;

/** What the Health Check does, in the live site’s own terms. */
export const HEALTH_CHECK =
  "We reconcile your last 60 days of deals straight away, then re-check every two hours for seven days.";

/** Footer small print, as on the live site. Non-breaking spaces keep “Company No.” and “VAT No.” whole. */
export const LEGAL_LINES = [
  "© 2026 Auditor Alpha, a product by Sylara Group.",
  COMPANY.disclosure.replace(/No\. /g, "No.\u00a0"),
  `Registered office: ${COMPANY.registeredOffice}.`,
];
