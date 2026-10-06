export const SITE = {
  name: "Auditor Alpha",
  tagline: "From assurance to revenue recovery.",
  email: "info@auditoralpha.ai",
  phone: "+44 790 209 6666",
  phoneHref: "tel:+447902096666",
  whatsappHref: "https://wa.me/447902096666",
};

/** Statutory trading disclosure, as on the live site. */
export const COMPANY = {
  disclosure:
    "Sylara Group is a trading name of Sylara Ltd, registered in England and Wales. Company No. 16665623. VAT No. GB499138046.",
  registeredOffice: "W1 Office, 11-12 Old Bond Street, Mayfair, London W1S 4PN",
  businessHub: "Level 39, One Canada Square, Canary Wharf, London E14 5AB",
  trademarks:
    "Product names and logos belong to their respective owners and are shown only to indicate which systems Auditor Alpha connects to, or plans to. Their use does not imply endorsement, sponsorship or partnership. Integrations marked “Coming soon” are on our roadmap; timelines may change.",
};

/** The existing legal documents, which this redesign carries over unchanged. */
export const LEGAL_DOCS = [
  { label: "Privacy Policy", href: "https://www.auditoralpha.ai/privacy" },
  { label: "Cookie Policy", href: "https://www.auditoralpha.ai/cookie-policy" },
  { label: "Terms of Service", href: "https://www.auditoralpha.ai/terms" },
  { label: "Sub-processors", href: "https://www.auditoralpha.ai/subprocessors" },
];

export const NAV = [
  { href: "/#how", label: "How it works" },
  { href: "/sample-report", label: "Sample report" },
  { href: "/pricing", label: "Pricing" },
  { href: "/integrations", label: "Integrations" },
  { href: "/security", label: "Security" },
  { href: "/about", label: "About" },
] as const;

/** Screen titles shown in the phone app bar. */
export const ROUTE_TITLES: Record<string, string> = {
  "/sample-report": "Sample report",
  "/pricing": "Pricing",
  "/integrations": "Integrations",
  "/security": "Security",
  "/about": "About",
  "/contact": "Book an audit",
  "/start": "Free Health Check",
  "/legal": "Legal",
};

/** Routes reached from the phone tab bar; everything else is a pushed screen with a back button. */
export const TAB_ROUTES = ["/", "/sample-report", "/pricing"];

/** Secondary screens listed in the tab bar's "More" sheet. */
export const MORE_LINKS = [
  { href: "/integrations", label: "Integrations", hint: "HubSpot ⇄ Xero, and what’s next" },
  { href: "/security", label: "Security", hint: "Read-only by default" },
  { href: "/about", label: "About", hint: "The team and how we build" },
  { href: "/contact", label: "Book a 15-minute audit", hint: "A look at your own numbers" },
] as const;

/** Routes that light up the "More" tab. */
export const MORE_ROUTES: string[] = [...MORE_LINKS.map((l) => l.href), "/legal"];

export const FOOTER_NAV = [
  {
    title: "Product",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/sample-report", label: "Sample report" },
      { href: "/pricing", label: "Pricing" },
      { href: "/integrations", label: "Integrations" },
      { href: "/security", label: "Security" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About & team" },
      { href: "/contact", label: "Book a leakage audit" },
      { href: "/start", label: "Start free check" },
      { href: "/legal", label: "Legal" },
    ],
  },
] as const;
