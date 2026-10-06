import { RISK_LEAKS, type Leak } from "../data";

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

const NAMES = [
  "Meridian Logistics",
  "Orion Retail Group",
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
  "Brightpath Media",
  "Kingsway Motors",
  "Thistle & Co",
  "Harrow Digital",
  "Marlowe Insurance",
  "Oakridge Estates",
  "Penrose Labs",
  "Quayside Hotels",
  "Vanguard Freight",
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
];

/** Deterministic pseudo-random numbers, so server and client render the same ledger. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const MONTHS = ["Oct", "Sep"];

/** Builds a ledger of `count` matched rows with the three risk leaks hidden at `leakAt`. */
export function buildLedger(count: number, leakAt: [number, number, number], seed: number): WallRow[] {
  const rand = seeded(seed);
  const rows: WallRow[] = [];
  let day = 6;
  let month = 0;
  let inv = 2061;
  let deal = 4431;
  for (let i = 0; i < count; i++) {
    if (rand() > 0.45) day -= 1;
    if (day < 1) {
      month = Math.min(1, month + 1);
      day = 30;
    }
    const won = `${String(day).padStart(2, "0")} ${MONTHS[month]}`;
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
    const amount = Math.round((4 + rand() * 120) * 50) * 10;
    rows.push({
      id: `DL-${deal}`,
      won,
      name: NAMES[(i * 7 + seed) % NAMES.length],
      hubspot: amount,
      invoice: `INV-${inv}`,
      xero: amount,
      layer: rand() > 0.22 ? "L1" : "L2",
    });
    deal -= 1 + Math.floor(rand() * 2);
    inv -= 1;
  }
  return rows;
}

export const money = (n: number) => n.toLocaleString("en-GB");
