# Auditor Alpha — website redesign (concept)

A full redesign of [auditoralpha.ai](https://www.auditoralpha.ai), prepared by **CodeBlimp**.
Built on the same stack as the live site, so components can move straight into the existing codebase.

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** with design tokens in `src/app/globals.css`
- **Zod** for request validation, **lucide-react** for icons
- Fonts via `next/font`: Newsreader (display), Geist (UI), Geist Mono (figures)

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all marketing pages are statically prerendered)
npm run start
npm run typecheck && npm run lint && npm run format
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | Homepage: live reconciliation hero, leak types, 7-day timeline, matching engine, ROI statement, pricing + guarantee, proof, security, FAQ |
| `/pricing` | Revenue-band plan finder, monthly/annual toggle, comparison table, guarantee terms, pricing FAQ |
| `/sample-report` | The Day 7 Revenue Health Check rendered as a page |
| `/security` | Data-flow diagram, what we read / never do, honest compliance status |
| `/integrations` | HubSpot ⇄ Xero setup, field mapping, roadmap catalogue, stack request |
| `/about` | Principles, executive team, technical partner |
| `/contact` | Book a 15-minute leakage audit (validated form) |
| `/start` | Onboarding preview: account → HubSpot → Xero → baseline |
| `/api/leads` | `POST` endpoint every form uses; validated with `leadSchema` |

## On phones it runs as an app

Below `lg`, the desktop header and footer give way to an app shell:

- **Tab bar** (`components/layout/tab-bar.tsx`): Home, Report, a raised Start button, Pricing, More.
- **App bar** (`components/layout/app-bar.tsx`): brand on tab screens, Back on pushed screens, and the
  screen title fades in once the page's large title scrolls away.
- **More sheet** (`components/layout/more-sheet.tsx`): secondary screens plus "email me the link".
- **Sheets** (`components/ui/bottom-sheet.tsx`): swipe down to dismiss; centred dialogs on desktop.
  Every row in the hero reconciliation opens its detail this way.
- **Transitions** (`app/template.tsx`): tab screens fade, pushed screens slide in from the right.
- **Installable** (`app/manifest.ts`, `public/icons`, `app/apple-icon.png`): "Add to Home Screen"
  opens full-screen with no browser bar; safe areas are respected.

Checked at 390×844 (iPhone) with no horizontal overflow on any route.

## Notes

- `?static` shows the hero reconciliation in its finished state (useful for screenshots).
- `metadata.robots` is set to `noindex` in `src/app/layout.tsx` while this is a concept.

## Before going live

- **Wire leads:** `src/app/api/leads/route.ts` validates (JSON only, 10 KB limit, typed enums, per-field errors)
  and returns a reference, but stores nothing. Forward `parsed.data` to the HubSpot Forms API, and add rate
  limiting and a bot check.
- **Swap assets:** the logo mark in `components/layout/brand.tsx`, team photos in `app/about/page.tsx`,
  and partner logos in `components/home/proof.tsx`.
- **Confirm with the client:** the write-access wording (“read-only by default”), whether to list exact OAuth
  scopes, the free Health Check column in `lib/plans.ts` `COMPARISON`, and a customer (not partner) testimonial.
- All figures are illustrative and consistent across pages (hero £58,000 at risk; report findings, flag
  AA-0417 and onboarding all agree).
