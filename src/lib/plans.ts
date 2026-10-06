export type PlanId = "free" | "core" | "growth" | "scale";
export type Billing = "monthly" | "annual";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  /** Monthly list price in GBP, ex. VAT. `0` for the free Health Check. */
  monthly: number;
  /** Upper bound of Revenue Under Assurance, in GBP. */
  cap: number | null;
  capLabel: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

export const ANNUAL_DISCOUNT = 0.15;
export const RECOVERY_RATE = 0.85;

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "7-day Health Check",
    tagline: "The full platform on your own data, before you commit.",
    monthly: 0,
    cap: null,
    capLabel: "No card required",
    features: [
      "5 users + unlimited receivers",
      "60-day historical baseline",
      "2-hourly reconciliation",
      "Report you keep",
    ],
    cta: "Start free",
  },
  {
    id: "core",
    name: "Core",
    tagline: "For finance teams putting continuous assurance in place.",
    monthly: 750,
    cap: 1_500_000,
    capLabel: "Up to £1.5M",
    features: [
      "3 users + unlimited receivers",
      "Direct-ID & semantic matching",
      "Audit-ready reports & exports",
      "Email support",
    ],
    cta: "Choose Core",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For scaling teams that need wider coverage.",
    monthly: 1250,
    cap: 5_000_000,
    capLabel: "Up to £5M",
    features: [
      "5 users + unlimited receivers",
      "All three matching layers",
      "Everything in Core",
      "Priority email support",
    ],
    cta: "Choose Growth",
    popular: true,
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "For high-volume, audit-critical operations.",
    monthly: 1950,
    cap: 15_000_000,
    capLabel: "Up to £15M",
    features: [
      "10 users + unlimited receivers",
      "SSO & role-based access",
      "Audit workpapers & exports",
      "Everything in Growth",
    ],
    cta: "Choose Scale",
  },
];

/** Revenue bands offered on the demo form (wider than the self-serve tiers). */
export const DEMO_BANDS = ["Under £1.5M", "£1.5M – £5M", "£5M – £15M", "£15M – £50M", "£50M+"] as const;

export function priceFor(plan: Plan, billing: Billing) {
  const perMonth = billing === "annual" ? plan.monthly * (1 - ANNUAL_DISCOUNT) : plan.monthly;
  return { perMonth, perYear: perMonth * 12, saving: plan.monthly * 12 * ANNUAL_DISCOUNT };
}

/** The paid plan a business of this size falls into, or `null` above £15M (enterprise). */
export function planForRevenue(revenue: number): Plan | null {
  return PLANS.find((p) => p.cap !== null && revenue <= p.cap) ?? null;
}

export const REVENUE_BANDS = [
  { label: "Under £1.5M", plan: "core" },
  { label: "£1.5M – £5M", plan: "growth" },
  { label: "£5M – £15M", plan: "scale" },
  { label: "£15M+", plan: null },
] as const satisfies ReadonlyArray<{ label: string; plan: PlanId | null }>;

type Cell = boolean | string;
export const COMPARISON: { group: string; rows: { label: string; values: Record<PlanId, Cell> }[] }[] = [
  {
    group: "Coverage",
    rows: [
      {
        label: "Revenue Under Assurance",
        values: { free: "Trial", core: "£1.5M", growth: "£5M", scale: "£15M" },
      },
      { label: "Authorised users", values: { free: "5", core: "3", growth: "5", scale: "10" } },
      {
        label: "Report receivers",
        values: { free: "Unlimited", core: "Unlimited", growth: "Unlimited", scale: "Unlimited" },
      },
    ],
  },
  {
    group: "Reconciliation",
    rows: [
      { label: "2-hourly runs + on-demand sync", values: { free: true, core: true, growth: true, scale: true } },
      { label: "L1 Direct-ID matching", values: { free: true, core: true, growth: true, scale: true } },
      { label: "L2 Semantic matching", values: { free: true, core: true, growth: true, scale: true } },
      { label: "L3 Heuristic rules", values: { free: true, core: false, growth: true, scale: true } },
    ],
  },
  {
    group: "Reporting & control",
    rows: [
      { label: "Audit-ready reports & exports", values: { free: true, core: true, growth: true, scale: true } },
      { label: "Audit workpapers", values: { free: false, core: false, growth: false, scale: true } },
      { label: "SSO & role-based access", values: { free: false, core: false, growth: false, scale: true } },
      { label: "Support", values: { free: "—", core: "Email", growth: "Priority email", scale: "Priority" } },
    ],
  },
];
