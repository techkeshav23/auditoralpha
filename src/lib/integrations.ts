export interface Integration {
  name: string;
  kind: "CRM" | "Accounting" | "ERP" | "Billing";
  live?: boolean;
}

/** Live and roadmap integrations, matching the live site. */
export const CATALOGUE: Integration[] = [
  { name: "HubSpot", kind: "CRM", live: true },
  { name: "Xero", kind: "Accounting", live: true },
  { name: "Salesforce", kind: "CRM" },
  { name: "Microsoft Dynamics 365", kind: "CRM" },
  { name: "Pipedrive", kind: "CRM" },
  { name: "Zoho", kind: "CRM" },
  { name: "Freshsales", kind: "CRM" },
  { name: "QuickBooks", kind: "Accounting" },
  { name: "Sage", kind: "Accounting" },
  { name: "Sage Intacct", kind: "ERP" },
  { name: "NetSuite", kind: "ERP" },
  { name: "Business Central", kind: "ERP" },
  { name: "Stripe", kind: "Billing" },
  { name: "Chargebee", kind: "Billing" },
];

export const ROADMAP_NAMES = CATALOGUE.filter((c) => !c.live).map((c) => c.name);

export const PRIMARY_STACK = "HubSpot + Xero";

/** CRM + ledger pairings offered in the "tell us your stack" forms. */
export const STACK_OPTIONS = [
  "Salesforce + Xero",
  "HubSpot + QuickBooks",
  "Pipedrive + Xero",
  "Salesforce + NetSuite",
  "HubSpot + Sage",
  "Zoho + Xero",
  "Something else",
] as const;
