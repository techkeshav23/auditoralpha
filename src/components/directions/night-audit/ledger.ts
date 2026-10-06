import { LEAKS, RISK_LEAKS, SHEET, type Leak } from "../data";

export type WallRow = {
  id: string;
  won: string;
  name: string;
  hubspot: number;
  invoice: string;
  xero: number | null;
  layer: string;
  /** Index into RISK_LEAKS when this row hides a leak. */
  leak?: number;
  data?: Leak;
};

/** Customers for the matched rows. None of them appear anywhere else on the page. */
const NAMES = [
  "Ashcombe Dental",
  "Fernhill Analytics",
  "Tidewater Marine",
  "Larkspur Studio",
  "Pembroke Advisory",
  "Copperleaf Homes",
  "Saltmarsh Foods",
  "Greyfriars Legal",
  "Blackthorn Energy",
  "Albion Print Co",
  "Kingsway Motors",
  "Thistle & Co",
  "Harrow Digital",
  "Marlowe Insurance",
  "Oakridge Estates",
  "Penrose Labs",
  "Quayside Hotels",
  "Sterling Wharf",
  "Upland Outdoor",
  "Whitlock & Moss",
  "Yarrow Health",
  "Beacon Payroll",
  "Calder Systems",
  "Dunmore Retail",
  "Elmstead Care",
  "Redbrook Capital",
  "Trinity Freight",
  "Fairlight Studio",
  "Hartwell Group",
  "Linden & Rowe",
  "Mosswood Interiors",
  "Northgate Clinics",
  "Pinecrest Logistics",
  "Riverbank Media",
  "Southfield Dental",
  "Tamarind Foods",
  "Wrenfield Partners",
  "Ivybridge Analytics",
];

/** IDs the leaks and the sample sheet already use, so the ledger never repeats one. */
const TAKEN_DEALS = new Set(LEAKS.map((l) => Number(l.deal.slice(3))));
const TAKEN_INVOICES = new Set(
  [...LEAKS.map((l) => l.invoice), ...SHEET.map((r) => r.invoice ?? "")]
    .flatMap((s) => s.match(/\d{4}/g) ?? [])
    .map(Number),
);

/** Deterministic pseudo-random numbers, so server and client render the same ledger. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** “06 Oct” minus `days`. */
function dateBefore(days: number) {
  const d = new Date(Date.UTC(2026, 9, 6 - days));
  return `${String(d.getUTCDate()).padStart(2, "0")} ${MONTHS[d.getUTCMonth()]}`;
}
/** Days between a leak’s “29 Sep” and 06 Oct. */
function daysBefore(won: string) {
  const [day, mon] = won.split(" ");
  const d = Date.UTC(2026, MONTHS.indexOf(mon), Number(day));
  return Math.round((Date.UTC(2026, 9, 6) - d) / 86_400_000);
}

/**
 * Builds a date-ordered ledger of `count` rows with the three risk leaks at
 * `leakAt`. Dates run back from 06 Oct and pass through each leak’s own date;
 * deal and invoice numbers are unique and never clash with the leaks’ own.
 */
export function buildLedger(count: number, leakAt: [number, number, number], seed: number): WallRow[] {
  const rand = seeded(seed);

  // Date anchors: today, each leak on its real date, and a tail a week or so later.
  const anchors: [number, number][] = [[0, 0]];
  leakAt.forEach((row, k) => anchors.push([row, daysBefore(RISK_LEAKS[k].won)]));
  const lastLeak = anchors[anchors.length - 1];
  anchors.push([count - 1, lastLeak[1] + Math.ceil((count - 1 - lastLeak[0]) / 2)]);
  const daysAt = (i: number) => {
    const j = anchors.findIndex(([row]) => row >= i);
    const [r1, d1] = anchors[j];
    if (j === 0 || r1 === i) return d1;
    const [r0, d0] = anchors[j - 1];
    return Math.round(d0 + ((d1 - d0) * (i - r0)) / (r1 - r0));
  };

  const rows: WallRow[] = [];
  let deal = 4431;
  let inv = 2061;
  let n = 0;
  const next = (from: number, taken: Set<number>, step: number) => {
    let v = from - step;
    while (taken.has(v)) v -= 1;
    return v;
  };

  for (let i = 0; i < count; i++) {
    const which = leakAt.indexOf(i);
    if (which !== -1) {
      const l = RISK_LEAKS[which];
      rows.push({
        id: l.deal,
        won: l.won,
        name: l.party,
        hubspot: l.hubspot,
        invoice: l.xero === null ? "—" : l.invoice,
        xero: l.xero,
        layer: "",
        leak: which,
        data: l,
      });
      continue;
    }
    deal = next(deal, TAKEN_DEALS, 1 + Math.floor(rand() * 2));
    inv = next(inv, TAKEN_INVOICES, 1);
    const amount = Math.round((4 + rand() * 120) * 50) * 10;
    rows.push({
      id: `DL-${deal}`,
      won: dateBefore(daysAt(i)),
      name: NAMES[(n++ * 7 + seed) % NAMES.length],
      hubspot: amount,
      invoice: `INV-${inv}`,
      xero: amount,
      layer: rand() > 0.22 ? "L1" : "L2",
    });
  }
  return rows;
}

export const money = (n: number) => n.toLocaleString("en-GB");
